export interface LLMProvider {
  streamChat(
    systemPrompt: string,
    history: ChatMessage[],
    message: string,
  ): Promise<ReadableStream>;
  generateJson<T>(
    systemPrompt: string,
    history: ChatMessage[],
    message: string,
  ): Promise<T>;
}

import type { ChatMessage } from '@/app/api/chat/route';

// ─── Constants ────────────────────────────────────────────────────────────────

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';

const MODELS = [
  process.env.OPENROUTER_PRIMARY_MODEL  ?? 'google/gemini-2.5-flash',
  process.env.OPENROUTER_BACKUP_MODEL   ?? 'meta-llama/llama-4-scout',
  process.env.OPENROUTER_FALLBACK_MODEL ?? 'openai/gpt-oss-120b',
] as const;

const TIMEOUT_MS = 28_000; // 28 s — safely under Vercel's 30 s function limit

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractJson(raw: string): string {
  return raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
}

function buildMessages(
  systemPrompt: string,
  history: ChatMessage[],
  message: string,
) {
  return [
    { role: 'system' as const, content: systemPrompt },
    ...history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.text })),
    { role: 'user' as const, content: message },
  ];
}

function getHeaders(): HeadersInit {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error('[provider] OPENROUTER_API_KEY is not set');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${key}`,
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000',
    'X-Title': 'AI Portfolio Copilot',
  };
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ─── OpenRouter provider with automatic model fallback ───────────────────────

export class OpenRouterProvider implements LLMProvider {
  async streamChat(
    systemPrompt: string,
    history: ChatMessage[],
    message: string,
  ): Promise<ReadableStream> {
    const messages = buildMessages(systemPrompt, history, message);
    const headers = getHeaders();

    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const res = await fetchWithTimeout(
          OPENROUTER_BASE,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({ model, messages, stream: true }),
          },
          TIMEOUT_MS,
        );

        if (!res.ok || !res.body) {
          const errorText = await res.text().catch(() => res.statusText);
          throw new Error(`[${model}] HTTP ${res.status}: ${errorText}`);
        }

        // Pipe SSE → plain text ReadableStream
        const body = res.body;
        return new ReadableStream({
          async start(controller) {
            const reader = body.getReader();
            const decoder = new TextDecoder();
            const encoder = new TextEncoder();
            let buffer = '';

            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed.startsWith('data:')) continue;
                  const payload = trimmed.slice(5).trim();
                  if (payload === '[DONE]') continue;
                  try {
                    const json = JSON.parse(payload);
                    const text: string = json.choices?.[0]?.delta?.content ?? '';
                    if (text) controller.enqueue(encoder.encode(text));
                  } catch {
                    // malformed SSE chunk — skip
                  }
                }
              }
            } finally {
              controller.close();
            }
          },
        });

      } catch (err) {
        lastError = err;
        // Continue to next model in the fallback chain
      }
    }

    throw lastError ?? new Error('[provider] All OpenRouter models failed');
  }

  async generateJson<T>(
    systemPrompt: string,
    history: ChatMessage[],
    message: string,
  ): Promise<T> {
    const messages = buildMessages(systemPrompt, history, message);
    const headers = getHeaders();

    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const res = await fetchWithTimeout(
          OPENROUTER_BASE,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model,
              messages,
              stream: false,
              response_format: { type: 'json_object' },
            }),
          },
          TIMEOUT_MS,
        );

        if (!res.ok) {
          const errorText = await res.text().catch(() => res.statusText);
          throw new Error(`[${model}] HTTP ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        const raw: string = data.choices?.[0]?.message?.content ?? '{}';
        return JSON.parse(extractJson(raw)) as T;

      } catch (err) {
        lastError = err;
        // Continue to next model
      }
    }

    throw lastError ?? new Error('[provider] All OpenRouter models failed (generateJson)');
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function getProvider(): LLMProvider {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      '[provider] OPENROUTER_API_KEY is not set. Add it to .env.local',
    );
  }
  return new OpenRouterProvider();
}