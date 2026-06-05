"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  X,
  Send,
  Github,
  ExternalLink,
  Anchor,
  Mail,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useAIModal } from "@/contexts/AIModalContext";
import type { NavigationResource, ResponseMode } from "@/app/api/chat/route";

// ─── Types ────────────────────────────────────────────────────────────────────

type ExperienceData = {
  suggestions: string[];
  related_topics: string[];
  navigation: NavigationResource[];
  mode: ResponseMode;
  confidence: "high" | "medium" | "low";
};

type Message = {
  role: "user" | "assistant";
  text: string;
  experience?: ExperienceData;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_SUGGESTIONS = [
  "Introduce yourself",
  "Give your background",
  "Describe your college activities",
  "Describe the skills you have used",
  "Describe your projects",
  "Do you have work experience",
];
const LOADING_PHRASES = ["Thinking…", "Retrieving context…", "Composing answer…"];

const NAV_ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  link: ExternalLink,
  anchor: Anchor,
  mail: Mail,
};

// ─── Markdown renderer ────────────────────────────────────────────────────────

function inlineFormat(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) parts.push(<strong key={k++} style={{ fontWeight: 600, color: "#F0F4FF" }}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={k++} style={{ fontStyle: "italic", color: "rgba(240,244,255,0.75)" }}>{match[3]}</em>);
    else if (match[4]) parts.push(
      <code key={k++} style={{ fontFamily: "monospace", fontSize: "0.8rem", background: "rgba(79,124,255,0.12)", border: "1px solid rgba(79,124,255,0.2)", borderRadius: "4px", padding: "1px 5px", color: "#60A5FA" }}>{match[4]}</code>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      out.push(
        <p key={k++} style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#4F8CFF", marginTop: out.length > 0 ? "20px" : "0", marginBottom: "6px" }}>
          {line.slice(3)}
        </p>
      );
      i++; continue;
    }

    if (line.startsWith("### ")) {
      out.push(
        <p key={k++} style={{ fontSize: "0.82rem", fontWeight: 700, color: "#F0F4FF", marginTop: "14px", marginBottom: "4px" }}>
          {line.slice(4)}
        </p>
      );
      i++; continue;
    }

    if (line.startsWith("---")) {
      out.push(<div key={k++} style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(79,124,255,0.2),transparent)", margin: "12px 0" }} />);
      i++; continue;
    }

    if (line.startsWith("> ")) {
      const qLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) { qLines.push(lines[i].slice(2)); i++; }
      out.push(
        <div key={k++} style={{ borderLeft: "2px solid rgba(79,124,255,0.35)", paddingLeft: "12px", margin: "8px 0" }}>
          {qLines.map((ql, qi) => ql.trim() === "" ? <br key={qi} /> : (
            <p key={qi} style={{ fontSize: "0.875rem", color: "rgba(240,244,255,0.65)", lineHeight: 1.7, margin: "2px 0" }}>{inlineFormat(ql)}</p>
          ))}
        </div>
      );
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("• ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("• "))) {
        items.push(lines[i].slice(2)); i++;
      }
      out.push(
        <ul key={k++} style={{ listStyle: "none", padding: 0, margin: "6px 0 10px" }}>
          {items.map((item, bi) => (
            <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "5px" }}>
              <span style={{ marginTop: "8px", flexShrink: 0, width: "4px", height: "4px", borderRadius: "50%", background: "#4F8CFF", display: "inline-block" }} />
              <span style={{ fontSize: "0.9rem", color: "rgba(240,244,255,0.82)", lineHeight: 1.7 }}>{inlineFormat(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      out.push(
        <ol key={k++} style={{ listStyle: "none", padding: 0, margin: "6px 0 10px" }}>
          {items.map((item, ni) => (
            <li key={ni} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
              <span style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: "rgba(79,124,255,0.14)", border: "1px solid rgba(79,124,255,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: "#4F8CFF", marginTop: "2px" }}>{ni + 1}</span>
              <span style={{ fontSize: "0.9rem", color: "rgba(240,244,255,0.82)", lineHeight: 1.7 }}>{inlineFormat(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.trim() === "") {
      if (out.length > 0) out.push(<div key={k++} style={{ height: "5px" }} />);
      i++; continue;
    }

    out.push(
      <p key={k++} style={{ fontSize: "0.9rem", color: "rgba(240,244,255,0.85)", lineHeight: 1.75, marginBottom: "2px" }}>
        {inlineFormat(line)}
      </p>
    );
    i++;
  }

  return out;
}

// ─── Streaming text reveal ────────────────────────────────────────────────────

function StreamingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const completeCalled = useRef(false);
  const prevText = useRef("");

  useEffect(() => {
    if (text === prevText.current) return;
    prevText.current = text;
    completeCalled.current = false;
    setDone(false);
    setDisplayed("");

    let idx = 0;
    const CHUNK = 4;
    const iv = setInterval(() => {
      idx = Math.min(idx + CHUNK, text.length);
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(iv);
        setDone(true);
        if (!completeCalled.current && onComplete) {
          completeCalled.current = true;
          onComplete();
        }
      }
    }, 10);

    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      {renderMarkdown(displayed)}
      {!done && (
        <span style={{ opacity: 0.4, animation: "cursorBlink 1s ease-in-out infinite", display: "inline-block", marginLeft: "1px" }}>▋</span>
      )}
    </>
  );
}

// ─── Confidence badge ─────────────────────────────────────────────────────────

function ConfidenceBadge({ confidence }: { confidence: "high" | "medium" | "low" }) {
  if (confidence === "high") return null;
  const cfg = confidence === "medium"
    ? { label: "Partial info", color: "#FBBF24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.22)" }
    : { label: "Limited info", color: "#94A3B8", bg: "rgba(148,163,184,0.07)", border: "rgba(148,163,184,0.18)" };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 7px", borderRadius: "999px", fontSize: "0.62rem", fontWeight: 600, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      {cfg.label}
    </span>
  );
}

// ─── Nav resource card ────────────────────────────────────────────────────────

function NavCard({ resource }: { resource: NavigationResource }) {
  const Icon = NAV_ICON_MAP[resource.icon] ?? ExternalLink;
  const isExternal = resource.type === "github" || resource.type === "external";

  const handleClick = () => {
    if (resource.type === "section") {
      document.dispatchEvent(new CustomEvent("ai-modal-nav", { detail: resource.href }));
    } else {
      window.open(resource.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px",
        borderRadius: "8px", border: "1px solid rgba(79,124,255,0.18)", background: "rgba(79,124,255,0.05)",
        color: "rgba(240,244,255,0.65)", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
        transition: "all 0.15s ease", whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(79,124,255,0.45)";
        el.style.color = "#F0F4FF";
        el.style.background = "rgba(79,124,255,0.1)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(79,124,255,0.18)";
        el.style.color = "rgba(240,244,255,0.65)";
        el.style.background = "rgba(79,124,255,0.05)";
      }}
    >
      <Icon size={12} style={{ flexShrink: 0, opacity: 0.6 }} />
      {resource.label}
      {isExternal && <ExternalLink size={10} style={{ opacity: 0.35, flexShrink: 0 }} />}
    </button>
  );
}

// ─── Experience panel ─────────────────────────────────────────────────────────

function ExperiencePanel({
  experience,
  showSuggestions,
  onSuggestion,
}: {
  experience: ExperienceData;
  showSuggestions: boolean;
  onSuggestion: (s: string) => void;
}) {
  const hasNav = experience.navigation?.length > 0;
  const hasSugg = showSuggestions && experience.suggestions?.length > 0;
  if (!hasNav && !hasSugg) return null;

  return (
    <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: "1px solid rgba(28,37,72,0.6)" }}>
      {hasNav && (
        <div style={{ marginBottom: hasSugg ? "16px" : "0" }}>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(240,244,255,0.25)", marginBottom: "8px" }}>
            Explore
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {experience.navigation.map((r, i) => <NavCard key={i} resource={r} />)}
          </div>
        </div>
      )}

      {hasSugg && (
        <div>
          <p style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(240,244,255,0.25)", marginBottom: "6px" }}>
            Ask next
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {experience.suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onSuggestion(s)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "7px 8px",
                  borderRadius: "8px", border: "1px solid transparent", background: "transparent",
                  color: "rgba(240,244,255,0.45)", fontSize: "0.82rem", textAlign: "left",
                  cursor: "pointer", transition: "all 0.12s ease", width: "100%",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(79,124,255,0.06)";
                  el.style.borderColor = "rgba(79,124,255,0.14)";
                  el.style.color = "rgba(240,244,255,0.8)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "transparent";
                  el.style.color = "rgba(240,244,255,0.45)";
                }}
              >
                <ChevronRight size={12} style={{ flexShrink: 0, opacity: 0.4 }} />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Assistant message ────────────────────────────────────────────────────────

function AssistantMessage({
  msg,
  isStreaming,
  onStreamComplete,
  onSuggestion,
}: {
  msg: Message;
  isStreaming: boolean;
  onStreamComplete: () => void;
  onSuggestion: (s: string) => void;
}) {
  const [streamDone, setStreamDone] = useState(!isStreaming);

  useEffect(() => {
    if (!isStreaming) setStreamDone(true);
  }, [isStreaming]);

  const handleStreamComplete = () => {
    setStreamDone(true);
    onStreamComplete();
  };

  return (
    <div style={{ width: "100%", animation: "slideUp 0.18s ease" }}>
      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{
          width: "22px", height: "22px", borderRadius: "6px",
          background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.48rem", fontWeight: 700, color: "#fff", flexShrink: 0, letterSpacing: "0.02em",
        }}>VS</div>
        <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(240,244,255,0.35)" }}>
          Vismay · AI Copilot
        </span>
        {msg.experience?.confidence && <ConfidenceBadge confidence={msg.experience.confidence} />}
      </div>

      {/* Content */}
      <div style={{ paddingLeft: "30px" }}>
        {isStreaming
          ? <StreamingText text={msg.text} onComplete={handleStreamComplete} />
          : renderMarkdown(msg.text)
        }

        {streamDone && msg.experience && (
          <ExperiencePanel
            experience={msg.experience}
            showSuggestions={true}
            onSuggestion={onSuggestion}
          />
        )}
      </div>
    </div>
  );
}

// ─── Loading indicator ────────────────────────────────────────────────────────

function LoadingDots({ phrase }: { phrase: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", animation: "slideUp 0.18s ease" }}>
      <div style={{
        width: "22px", height: "22px", borderRadius: "6px",
        background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.48rem", fontWeight: 700, color: "#fff", flexShrink: 0,
      }}>VS</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "flex", gap: "3px" }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: "5px", height: "5px", borderRadius: "50%", background: "#4F8CFF",
              display: "inline-block",
              animation: `dotBounce 1.2s ease-in-out infinite`,
              animationDelay: `${i * 150}ms`,
            }} />
          ))}
        </div>
        <span style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.3)", fontStyle: "italic" }}>
          {phrase}
        </span>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onSuggestion }: { onSuggestion: (s: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "32px 24px" }}>
      <div style={{
        width: "42px", height: "42px", borderRadius: "13px",
        background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "16px", boxShadow: "0 8px 24px rgba(99,102,241,0.28)",
      }}>
        <Sparkles size={18} color="#fff" />
      </div>
      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(240,244,255,0.65)", marginBottom: "4px", textAlign: "center" }}>
        AI Career Copilot
      </p>
      <p style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.3)", marginBottom: "28px", textAlign: "center", maxWidth: "280px", lineHeight: 1.65 }}>
        Ask about projects, skills, experience, research, or career goals.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", width: "100%", maxWidth: "460px" }}>
        {INITIAL_SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            style={{
              padding: "9px 14px", borderRadius: "10px",
              border: "1px solid rgba(79,124,255,0.14)", background: "rgba(79,124,255,0.04)",
              color: "rgba(240,244,255,0.55)", fontSize: "0.78rem", textAlign: "left",
              cursor: "pointer", transition: "all 0.15s ease", lineHeight: 1.4,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(79,124,255,0.32)";
              el.style.color = "rgba(240,244,255,0.85)";
              el.style.background = "rgba(79,124,255,0.08)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(79,124,255,0.14)";
              el.style.color = "rgba(240,244,255,0.55)";
              el.style.background = "rgba(79,124,255,0.04)";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export default function AICopilotModal() {
  const { isOpen, initialQuery, closeModal } = useAIModal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [autoSent, setAutoSent] = useState(false);
  const [streamingMsgIdx, setStreamingMsgIdx] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Section navigation from nav cards
  useEffect(() => {
    const handler = (e: Event) => {
      const anchor = (e as CustomEvent<string>).detail;
      closeModal();
      setTimeout(() => {
        const id = anchor.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };
    document.addEventListener("ai-modal-nav", handler);
    return () => document.removeEventListener("ai-modal-nav", handler);
  }, [closeModal]);

  // Modal lifecycle
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setPhraseIdx(0);
      setAutoSent(false);
      setStreamingMsgIdx(null);
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen, closeModal]);

  // Phrase rotation while loading
  useEffect(() => {
    if (!loading) return;
    const iv = setInterval(() => setPhraseIdx(p => p + 1), 1900);
    return () => clearInterval(iv);
  }, [loading]);

  // Auto-scroll
  useEffect(() => {
    if (!threadRef.current) return;
    threadRef.current.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = useCallback(
    async (text?: string, historyOverride?: Message[]) => {
      const query = (text ?? input).trim();
      if (!query || loading) return;

      const userMsg: Message = { role: "user", text: query };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setPhraseIdx(0);

      try {
        const history = (historyOverride ?? messages)
          .slice(-10)
          .map(m => ({ role: m.role, text: m.text }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query, history }),
        });

        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || `Server error ${res.status}`);

        const assistantMsg: Message = {
          role: "assistant",
          text: data.message?.content ?? "I had trouble generating a response. Please try again.",
          experience: data.experience,
        };

        setMessages(prev => {
          const next = [...prev, assistantMsg];
          setStreamingMsgIdx(next.length - 1);
          return next;
        });

      } catch (err) {
        console.error("[AICopilotModal]", err);
        setMessages(prev => [...prev, {
          role: "assistant",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        }]);
        setStreamingMsgIdx(null);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  useEffect(() => {
    if (!isOpen || !initialQuery || autoSent) return;
    setAutoSent(true);
    setMessages([]);
    handleSend(initialQuery, []);
  }, [isOpen, initialQuery, autoSent, handleSend]);

  const resetConversation = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setStreamingMsgIdx(null);
    setAutoSent(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ai-thread::-webkit-scrollbar { width: 3px; }
        .ai-thread::-webkit-scrollbar-track { background: transparent; }
        .ai-thread::-webkit-scrollbar-thumb { background: rgba(28,37,72,0.8); border-radius: 99px; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={closeModal}
        style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(3,7,18,0.80)", backdropFilter: "blur(7px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
        }}
      >
        {/* Modal shell */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: "relative", zIndex: 10, width: "100%", maxWidth: "720px",
            height: "88vh", maxHeight: "780px",
            display: "flex", flexDirection: "column",
            borderRadius: "20px", border: "1px solid rgba(28,37,74,0.9)",
            background: "#080C20",
            boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(79,124,255,0.05)",
            overflow: "hidden",
            animation: "modalIn 0.22s cubic-bezier(0.34,1.3,0.64,1)",
          }}
        >
          {/* ── Header ── */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "13px 18px", borderBottom: "1px solid rgba(28,37,72,0.8)",
            background: "rgba(5,7,26,0.65)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
              }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F0F4FF", lineHeight: 1 }}>
                  AI Career Copilot
                </p>
                <p style={{ fontSize: "0.63rem", color: "rgba(240,244,255,0.3)", marginTop: "2px" }}>
                  Vismay Vinayak Shanbhag · BITS Pilani Goa · 2028
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <button
                onClick={resetConversation}
                style={{
                  display: "flex", alignItems: "center", gap: "5px", padding: "5px 10px",
                  borderRadius: "7px", border: "1px solid rgba(79,124,255,0.14)", background: "transparent",
                  color: "rgba(240,244,255,0.3)", fontSize: "0.7rem", cursor: "pointer",
                  transition: "all 0.12s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(240,244,255,0.6)"; el.style.borderColor = "rgba(79,124,255,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(240,244,255,0.3)"; el.style.borderColor = "rgba(79,124,255,0.14)"; }}
              >
                <RotateCcw size={11} /> Reset
              </button>

              <button
                onClick={closeModal}
                aria-label="Close"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "30px", height: "30px", borderRadius: "7px",
                  border: "1px solid rgba(79,124,255,0.14)", background: "transparent",
                  color: "rgba(240,244,255,0.3)", cursor: "pointer", transition: "all 0.12s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(240,244,255,0.7)"; el.style.borderColor = "rgba(79,124,255,0.35)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(240,244,255,0.3)"; el.style.borderColor = "rgba(79,124,255,0.14)"; }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ── Thread ── */}
          <div
            ref={threadRef}
            className="ai-thread"
            style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
          >
            {messages.length === 0 && !loading ? (
              <EmptyState onSuggestion={s => handleSend(s)} />
            ) : (
              <div style={{ padding: "24px 22px 12px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    {msg.role === "user" ? (
                      <div style={{
                        maxWidth: "72%", padding: "10px 14px",
                        borderRadius: "12px 12px 3px 12px",
                        background: "rgba(79,124,255,0.1)", border: "1px solid rgba(79,124,255,0.18)",
                        color: "rgba(240,244,255,0.88)", fontSize: "0.875rem", lineHeight: 1.65,
                        animation: "slideUp 0.15s ease",
                      }}>
                        {msg.text}
                      </div>
                    ) : (
                      <AssistantMessage
                        msg={msg}
                        isStreaming={idx === streamingMsgIdx}
                        onStreamComplete={() => { if (idx === streamingMsgIdx) setStreamingMsgIdx(null); }}
                        onSuggestion={s => handleSend(s)}
                      />
                    )}
                  </div>
                ))}

                {loading && (
                  <LoadingDots phrase={LOADING_PHRASES[phraseIdx % LOADING_PHRASES.length]} />
                )}
              </div>
            )}
          </div>

          {/* ── Input ── */}
          <div style={{
            borderTop: "1px solid rgba(28,37,72,0.8)", padding: "13px 18px",
            background: "rgba(5,7,26,0.5)", flexShrink: 0,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(8,12,32,0.95)", border: "1px solid rgba(79,124,255,0.16)",
              borderRadius: "11px", padding: "4px 4px 4px 13px",
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about projects, skills, experience, or goals…"
                disabled={loading}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "rgba(240,244,255,0.9)", fontSize: "0.875rem", padding: "8px 0", lineHeight: 1.5,
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "34px", height: "34px", borderRadius: "8px", border: "none",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg,#4F7CFF,#8B5CF6)"
                    : "rgba(79,124,255,0.08)",
                  color: input.trim() && !loading ? "#fff" : "rgba(240,244,255,0.2)",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  transition: "all 0.15s ease", flexShrink: 0,
                  boxShadow: input.trim() && !loading ? "0 2px 10px rgba(99,102,241,0.3)" : "none",
                }}
              >
                <Send size={14} />
              </button>
            </div>
            <p style={{ fontSize: "0.6rem", color: "rgba(240,244,255,0.18)", textAlign: "center", marginTop: "8px" }}>
              Answers are grounded in documented portfolio information only
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
