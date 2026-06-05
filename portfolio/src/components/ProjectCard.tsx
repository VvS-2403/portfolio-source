"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Github, MessageCircle, ExternalLink } from "lucide-react";
import { Project } from "@/types/portfolio";
import { useAIModal } from "@/contexts/AIModalContext";

const statusStyles: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  Completed: { color: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.35)", glow: "0 0 10px rgba(52,211,153,0.20)" },
  Ongoing: { color: "#818CF8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.35)", glow: "0 0 10px rgba(129,140,248,0.20)" },
  Paused: { color: "#94A3B8", bg: "rgba(148,163,184,0.10)", border: "rgba(148,163,184,0.2)", glow: "none" },
};

const accentPalette = [
  {
    border: "rgba(6,182,212,0.45)",
    borderIdle: "rgba(6,182,212,0.18)",
    glow: "rgba(6,182,212,0.10)",
    glowHover: "rgba(6,182,212,0.18)",
    text: "#22D3EE",
    dot: "#06B6D4",
    orbColor: "rgba(6,182,212,0.12)",
  },
  {
    border: "rgba(168,85,247,0.45)",
    borderIdle: "rgba(168,85,247,0.18)",
    glow: "rgba(168,85,247,0.10)",
    glowHover: "rgba(168,85,247,0.18)",
    text: "#C084FC",
    dot: "#A855F7",
    orbColor: "rgba(168,85,247,0.12)",
  },
  {
    border: "rgba(244,114,182,0.45)",
    borderIdle: "rgba(244,114,182,0.18)",
    glow: "rgba(244,114,182,0.10)",
    glowHover: "rgba(244,114,182,0.18)",
    text: "#F9A8D4",
    dot: "#F472B6",
    orbColor: "rgba(244,114,182,0.12)",
  },
  {
    border: "rgba(251,191,36,0.45)",
    borderIdle: "rgba(251,191,36,0.18)",
    glow: "rgba(251,191,36,0.08)",
    glowHover: "rgba(251,191,36,0.14)",
    text: "#FCD34D",
    dot: "#FBBF24",
    orbColor: "rgba(251,191,36,0.10)",
  },
];

let cardIndex = 0;
const cardAccentMap: Record<string, (typeof accentPalette)[0]> = {};

function getAccent(id: string) {
  if (!cardAccentMap[id]) {
    cardAccentMap[id] = accentPalette[cardIndex % accentPalette.length];
    cardIndex += 1;
  }
  return cardAccentMap[id];
}

export default function ProjectCard({
  project,
  expandable = false,
}: {
  project: Project;
  expandable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { openModal } = useAIModal();
  const accent = getAccent(project.id);
  const status = statusStyles[project.status] ?? statusStyles.Paused;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
        border: `1px solid ${hovered || open ? accent.border : accent.borderIdle}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 50px ${accent.glowHover}, 0 0 40px ${accent.glow}, 0 0 0 1px ${accent.borderIdle}`
          : `0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)`,
        position: "relative",
      }}
    >
      {/* Accent glow orb */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "100px", height: "100px", borderRadius: "50%",
        background: `radial-gradient(circle, ${accent.orbColor}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Bottom-left subtle glow */}
      <div style={{
        position: "absolute", bottom: "-20px", left: "-20px",
        width: "70px", height: "70px", borderRadius: "50%",
        background: `radial-gradient(circle, ${accent.glow}, transparent)`,
        opacity: hovered ? 0.8 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      <div className="px-5 py-5 relative z-10">
        <div className="mb-3.5 flex items-start justify-between gap-2">
          <h3
            className="text-base font-bold leading-snug"
            style={{
              color: "#F0F4FF",
              textShadow: "0 0 12px rgba(240,244,255,0.10)",
            }}
          >
            {project.title}
          </h3>
          <span
            className="flex-shrink-0 rounded-full border px-3 py-1 text-xs font-bold"
            style={{
              color: status.color,
              background: status.bg,
              border: `1px solid ${status.border}`,
              boxShadow: status.glow,
            }}
          >
            {project.status}
          </span>
        </div>

        <p
          className="mb-4 text-sm leading-7"
          style={{
            color: "rgba(240,244,255,0.68)",
            textShadow: "0 0 6px rgba(240,244,255,0.04)",
          }}
        >
          {project.shortDescription}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                border: `1px solid ${accent.borderIdle}`,
                background: "rgba(8,12,32,0.9)",
                color: "rgba(240,244,255,0.72)",
                textShadow: "0 0 6px rgba(240,244,255,0.08)",
              }}
            >
              {technology}
            </span>
          ))}
        </div>

        {expandable && (
          <button
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200"
            style={{
              color: accent.text,
              textShadow: `0 0 10px ${accent.glow}`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#F0F4FF";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = accent.text;
            }}
          >
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {open ? "Less" : "Details"}
          </button>
        )}
      </div>

      {expandable && open && (
        <div
          className="relative z-10"
          style={{
            background: "linear-gradient(135deg, #080C20, #0A0E28)",
            borderTop: `1px solid ${accent.borderIdle}`,
            padding: "16px 20px",
          }}
        >
          {project.concepts.length > 0 && (
            <div className="mb-4">
              <p
                className="text-xs font-bold uppercase tracking-[0.22em] mb-2"
                style={{ color: accent.text, textShadow: `0 0 8px ${accent.glow}` }}
              >
                Concepts
              </p>
              <div className="flex flex-wrap gap-2">
                {project.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      border: `1px solid ${accent.borderIdle}`,
                      background: "rgba(8,12,32,0.9)",
                      color: "rgba(240,244,255,0.72)",
                      textShadow: "0 0 6px rgba(240,244,255,0.08)",
                    }}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.outcomes.length > 0 && (
            <div className="mb-4">
              <p
                className="text-xs font-bold uppercase tracking-[0.22em] mb-2"
                style={{ color: accent.text, textShadow: `0 0 8px ${accent.glow}` }}
              >
                Outcomes
              </p>
              <ul className="space-y-2">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 inline-flex h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: accent.dot,
                        boxShadow: `0 0 8px ${accent.glow}`,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(240,244,255,0.72)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        textShadow: "0 0 6px rgba(240,244,255,0.04)",
                      }}
                    >
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links row: GitHub + AI Chat */}
          <div
            className="flex flex-wrap items-center gap-3 pt-2"
            style={{ borderTop: `1px solid ${accent.borderIdle}`, paddingTop: "16px" }}
          >
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200"
                style={{
                  border: `1px solid ${accent.borderIdle}`,
                  background: "rgba(8,12,32,0.9)",
                  color: "rgba(240,244,255,0.78)",
                  textShadow: "0 0 8px rgba(240,244,255,0.10)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = accent.border;
                  (e.currentTarget as HTMLElement).style.color = "#F0F4FF";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accent.glow}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = accent.borderIdle;
                  (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.78)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Github size={13} />
                View Repository
                <ExternalLink size={11} />
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  border: "1px solid rgba(28,37,72,0.6)",
                  background: "rgba(8,12,32,0.9)",
                  color: "rgba(240,244,255,0.35)",
                }}
              >
                <Github size={13} />
                Repository coming soon
              </span>
            )}

            <button
              onClick={() => openModal(`Tell me more about the project: ${project.title}`)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200"
              style={{
                border: `1px solid rgba(99,102,241,0.3)`,
                background: "linear-gradient(135deg, rgba(79,124,255,0.12), rgba(139,92,246,0.08))",
                color: "rgba(240,244,255,0.78)",
                textShadow: "0 0 8px rgba(240,244,255,0.10)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.6)";
                (e.currentTarget as HTMLElement).style.color = "#F0F4FF";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.18)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.78)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <MessageCircle size={13} />
              Ask AI about this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}