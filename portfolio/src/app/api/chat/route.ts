import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { buildSectionRegistry, readSection } from '@/lib/context/builder';
import { getProvider } from '@/lib/ai/provider';
import { inferCategory, getSuggestions } from '@/lib/suggestions';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

// ─── Documented resources (only real, confirmed links) ────────────────────────

const PORTFOLIO_RESOURCES = {
  github: 'https://github.com/VvS-2403',
  githubPortfolioSource: 'https://github.com/VvS-2403/portfolio-source',
  linkedin: 'https://www.linkedin.com/in/vismay-shanbhag-494157313/',
  email: 'f20240876@goa.bits-pilani.ac.in',
  resume: null,
  portfolio: null,
};

const SECTION_ANCHORS: Record<string, string> = {
  projects: '#projects',
  skills: '#skills',
  experience: '#experience',
  about: '#about',
  contact: '#contact',
  extracurriculars: '#extracurriculars',
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type ResponseMode = 'fact' | 'explanation' | 'comparison' | 'career' | 'out_of_scope';

export interface NavigationResource {
  label: string;
  href: string;
  type: 'section' | 'github' | 'external' | 'contact';
  icon: 'anchor' | 'github' | 'link' | 'mail';
}

export interface AIResponse {
  message: {
    role: 'assistant';
    content: string;
  };
  experience: {
    suggestions: string[];
    related_topics: string[];
    navigation: NavigationResource[];
    mode: ResponseMode;
    confidence: 'high' | 'medium' | 'low';
  };
}

// ─── Mode classifier ──────────────────────────────────────────────────────────

async function classifyQuery(
  message: string,
  provider: ReturnType<typeof getProvider>
): Promise<{ mode: ResponseMode; isOutOfScope: boolean }> {
  const prompt = `You are a query classifier for a personal portfolio AI assistant.

Classify the user's question into exactly one mode:

- "fact": direct factual lookup (CGPA, graduation year, contact info, skills list, dates)
- "explanation": asking about a project, experience, skill, or concept in depth
- "comparison": asking to compare, rank, or recommend
- "career": career goals, future plans, research interests, aspirations
- "out_of_scope": anything completely unrelated to the person's professional portfolio

Flag "isOutOfScope": true only if the question has absolutely nothing to do with the portfolio.

Return ONLY JSON: { "mode": string, "isOutOfScope": boolean }`;

  try {
    const result = await provider.generateJson<{ mode: ResponseMode; isOutOfScope: boolean }>(
      prompt,
      [],
      message
    );
    return {
      mode: result.mode || 'explanation',
      isOutOfScope: result.isOutOfScope || false,
    };
  } catch {
    return { mode: 'explanation', isOutOfScope: false };
  }
}

// ─── Section planner ──────────────────────────────────────────────────────────

async function planSections(
  message: string,
  history: ChatMessage[],
  sectionIndex: string,
  provider: ReturnType<typeof getProvider>
): Promise<string[]> {
  const prompt = `You are a retrieval planner for a personal portfolio AI assistant.

Given the user's question, return ONLY the keys of sections needed to answer well.
Be generous — include related sections too.
Return ONLY JSON: { "keys": string[] }

Available sections:
${sectionIndex}`;

  try {
    const result = await provider.generateJson<{ keys: string[] }>(
      prompt,
      history.slice(-4),
      `Question: "${message}"`
    );
    return Array.isArray(result.keys) ? result.keys : [];
  } catch {
    return [];
  }
}

// ─── Navigation resource builder ──────────────────────────────────────────────

async function buildNavigationResources(
  message: string,
  answer: string,
  provider: ReturnType<typeof getProvider>
): Promise<NavigationResource[]> {
  const availableSections = Object.entries(SECTION_ANCHORS)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  const availableLinks = Object.entries(PORTFOLIO_RESOURCES)
    .filter(([, v]) => v !== null)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  const prompt = `You are a navigation assistant for a personal portfolio.

Given the user's question and the AI's answer, decide which portfolio sections and external links are most relevant to surface.

Available portfolio sections: ${availableSections}
Available external links: ${availableLinks || 'none currently'}

Rules:
- Only suggest sections/links that are genuinely relevant
- Be selective (max 3 resources)
- If discussing a project, suggest #projects
- If discussing skills, suggest #skills
- If discussing experience, suggest #experience
- If discussing contact info, suggest #contact
- If discussing GitHub or code, suggest the GitHub link
- Never invent links that don't exist

Return ONLY JSON:
{
  "resources": [
    { "label": "View Projects", "href": "#projects", "type": "section", "icon": "anchor" },
    { "label": "GitHub Profile", "href": "https://github.com/VvS-2403", "type": "github", "icon": "github" }
  ]
}

If no resources are relevant, return { "resources": [] }`;

  try {
    const result = await provider.generateJson<{ resources: NavigationResource[] }>(
      prompt,
      [],
      `Question: "${message}"\n\nAnswer summary: "${answer.slice(0, 300)}"`
    );
    return Array.isArray(result.resources) ? result.resources.slice(0, 3) : [];
  } catch {
    return [];
  }
}

// ─── Confidence scorer ────────────────────────────────────────────────────────

function scoreConfidence(
  neededKeys: string[],
  answer: string
): 'high' | 'medium' | 'low' {
  const noInfoPhrases = [
    "couldn't find",
    "not documented",
    "don't have that information",
    "not available",
    "no information",
    "not currently",
    "no documented",
  ];

  const partialPhrases = [
    "based on the available",
    "partially documented",
    "some documentation",
    "limited information",
  ];

  const lower = answer.toLowerCase();

  if (noInfoPhrases.some(p => lower.includes(p))) return 'low';
  if (partialPhrases.some(p => lower.includes(p))) return 'medium';
  if (neededKeys.length === 0) return 'medium';
  return 'high';
}

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(mode: ResponseMode, context: string): string {
  const outOfScopeBlock = `The user's question is outside the scope of this portfolio.

Respond with exactly this:

> This question is outside the scope of my portfolio.
>
> I can help with topics like projects, skills, experience, education, and career goals. Try asking about one of those.`;

  const coreRules = `## Who you are
You are an AI Career Copilot for Vismay Vinayak Shanbhag's portfolio.
You speak directly as Vismay — in first person ("I", "my", "me").
You sound like a confident, thoughtful person explaining their own work — not a chatbot or documentation viewer.

## Absolute rules

1. **Documentation only.** Every answer must come from the provided context below. Never use general knowledge, industry knowledge, or anything not explicitly documented. Not even for background context.

2. **No hallucination.** If information is not in the context, say so clearly. Do not fill gaps. Do not infer. Do not guess.

3. **When information is missing**, respond like this:
   - "I couldn't find any documented information about [topic]."
   - "The documentation doesn't cover that level of detail."
   - Then surface the GitHub repository or relevant section link.
   Never explain the concept using general knowledge.

4. **When information is partially documented**, say:
   - "Based on the available documentation, [answer partial info]."
   - Then acknowledge what's missing and point to GitHub/docs.

5. **No internal mechanics.** Never mention "retrieval", "context", "documents", "markdown", "database", "chunks", "embeddings", or "documentation" as if explaining the system. Speak from memory as if it's your own knowledge.

6. **No filler.** Never say "Great question!", "Certainly!", "Of course!", "Absolutely!", or similar openers.

7. **No excessive formatting.** Do not use heavy section headers like OVERVIEW / KEY DETAILS / OUTCOME. Write in short paragraphs with occasional bullets. Keep it conversational and scannable.

8. **No corporate structure.** Responses should feel like a person talking, not a generated report.

## Tone and format
- Short paragraphs, not walls of text
- Bullets only when listing multiple items (3+)
- Occasional bold for emphasis on key terms only
- Natural transitions between ideas
- Confident and direct — no hedging unless confidence is genuinely low

## Confidence language
- High confidence: answer normally
- Medium confidence: start with "Based on the available documentation..."
- Low confidence: "I couldn't find documented information about that. The closest related information I have is..."

## Out-of-scope redirect
${mode === 'out_of_scope' ? outOfScopeBlock : '(Not applicable for this query.)'}

--- CONTEXT ---
${context}
--- END CONTEXT ---`;

  return coreRules;
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      message: string;
      history?: ChatMessage[];
    };

    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const countStr = cookieStore.get('chat_count_v2')?.value || '0';
    const count = parseInt(countStr, 10);

    if (count >= 1000) {
      return NextResponse.json({
        message: {
          role: 'assistant',
          content: "Since credits are limited, I can only respond up to 1000 times per user in a day. You've reached your limit! For further conversations, please contact the owner directly.",
        },
        experience: {
          suggestions: [],
          related_topics: [],
          navigation: [
            { label: "Email", href: PORTFOLIO_RESOURCES.email ?? "mailto:f20240876@goa.bits-pilani.ac.in", type: "contact", icon: "mail" },
            { label: "LinkedIn", href: PORTFOLIO_RESOURCES.linkedin ?? "https://www.linkedin.com/in/vismay-shanbhag-494157313/", type: "external", icon: "link" }
          ],
          mode: 'out_of_scope',
          confidence: 'high'
        }
      });
    }

    const provider = getProvider();

    // Step 1: Build section registry + classify query in parallel
    const registry = buildSectionRegistry();
    const sectionIndex = registry
      .map(s => `${s.key} → ${s.label}: ${s.preview}`)
      .join('\n');

    const [classification, neededKeys] = await Promise.all([
      classifyQuery(message, provider),
      planSections(message, history, sectionIndex, provider),
    ]);

    const { mode, isOutOfScope } = classification;

    // Step 2: Build context from retrieved sections
    let context = '';
    if (!isOutOfScope) {
      const sectionsToUse = neededKeys.length > 0
        ? registry.filter(s => neededKeys.includes(s.key))
        : registry;

      context = sectionsToUse
        .map(s => `## ${s.label}\n${readSection(s)}`)
        .join('\n\n---\n\n');
    }

    // Step 3: Generate answer
    const systemPrompt = buildSystemPrompt(
      isOutOfScope ? 'out_of_scope' : mode,
      context
    );

    const stream = await provider.streamChat(systemPrompt, history.slice(-8), message);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let answer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
    }
    answer += decoder.decode();

    // Step 4: Score confidence
    const confidence = scoreConfidence(neededKeys, answer);

    // Step 5: Build navigation resources
    const navigationResources = await buildNavigationResources(message, answer, provider);

    // Step 6: Curated suggestions (no LLM call — instant, human-friendly)
    const category = inferCategory(message, answer);
    const suggestions = getSuggestions(category);

    // Step 7: Related topics from retrieved section keys
    const topicMap: Record<string, string> = {
      'about': 'Background & Education',
      'projects-index': 'All Projects',
      'experience-index': 'Work Experience',
      'extracurriculars': 'Campus Activities',
      'profile': 'Profile Overview',
    };
    const relatedTopics = neededKeys
      .filter(k => topicMap[k])
      .map(k => topicMap[k])
      .slice(0, 3);

    const response: AIResponse = {
      message: {
        role: 'assistant',
        content: answer,
      },
      experience: {
        suggestions,
        related_topics: relatedTopics,
        navigation: navigationResources,
        mode: isOutOfScope ? 'out_of_scope' : mode,
        confidence,
      },
    };

    // Increment chat count
    cookieStore.set('chat_count_v2', String(count + 1), {
      maxAge: 86400, // 24 hours
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('[chat/route] error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate response.' },
      { status: 500 }
    );
  }
}