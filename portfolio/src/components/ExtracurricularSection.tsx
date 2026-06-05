"use client";
import { useState } from "react";
import extracurriculars from "@/data/extracurriculars";

const typeConfig: Record<string, { label: string; color: string; glow: string; border: string; borderHover: string; dot: string; gradient: string }> = {
  extracurricular: {
    label: "Leadership",
    color: "#60A5FA",
    glow: "rgba(79, 140, 255, 0.15)",
    border: "rgba(79, 140, 255, 0.35)",
    borderHover: "rgba(79, 140, 255, 0.65)",
    dot: "#4F8CFF",
    gradient: "linear-gradient(135deg, rgba(79,140,255,0.15), rgba(99,102,241,0.08))",
  },
  technical: {
    label: "Technical",
    color: "#A78BFA",
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.35)",
    borderHover: "rgba(139,92,246,0.65)",
    dot: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08))",
  },
  volunteer: {
    label: "Volunteer",
    color: "#34D399",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.35)",
    borderHover: "rgba(16,185,129,0.65)",
    dot: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.08))",
  },
  mentorship: {
    label: "Mentorship",
    color: "#FCD34D",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.35)",
    borderHover: "rgba(245,158,11,0.65)",
    dot: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.08))",
  },
  achievement: {
    label: "Achievement",
    color: "#FB7185",
    glow: "rgba(244,63,94,0.15)",
    border: "rgba(244,63,94,0.35)",
    borderHover: "rgba(244,63,94,0.65)",
    dot: "#F43F5E",
    gradient: "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(139,92,246,0.08))",
  },
};

const iconMap: Record<string, string> = {
  extracurricular: "🏛️",
  technical: "⚙️",
  volunteer: "🤝",
  mentorship: "🎓",
  achievement: "🏆",
};

export default function ExtracurricularSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="extracurriculars"
      className="relative z-10 py-16 px-4"
      style={{ borderBottom: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.97)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="section-label mb-2">Extracurricular Activities</p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              background: "linear-gradient(135deg, #F0F4FF 20%, #A0B8FF 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Campus Involvement
          </h2>
          <p
            style={{
              color: "rgba(240,244,255,0.45)",
              fontSize: "0.75rem",
              lineHeight: 1.6,
              marginTop: "0.75rem",
            }}
          >
            Clubs, communities, and leadership roles beyond academics.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {extracurriculars.map((item) => {
            const config = typeConfig[item.type ?? "extracurricular"] ?? typeConfig.extracurricular;
            const isExpanded = expanded === item.id;
            const isHovered = hovered === item.id;
            const isActive = isExpanded || isHovered;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setExpanded(isExpanded ? null : item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-[16px] p-5 text-left"
                style={{
                  background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
                  border: `1px solid ${isActive ? config.borderHover : "rgba(79, 124, 255, 0.18)"}`,
                  boxShadow: isActive
                    ? `0 0 48px ${config.glow}, 0 0 24px ${config.glow}, 0 16px 40px rgba(0,0,0,0.3)`
                    : "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
                }}
              >
                {/* Glow orb */}
                <div
                  className="absolute right-4 top-4 h-20 w-20 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${config.glow}, transparent)`,
                    opacity: isActive ? 0.6 : 0.2,
                    transition: "opacity 0.3s ease",
                  }}
                />

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-lg flex-shrink-0"
                    style={{
                      background: config.gradient,
                      border: `1px solid ${config.border}`,
                      boxShadow: isActive ? `0 0 16px ${config.glow}` : "none",
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    {iconMap[item.type ?? "extracurricular"]}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Role + badge stacked vertically to fix alignment */}
                    <h3
                      className="text-sm font-bold leading-tight mb-1"
                      style={{
                        color: "#F0F4FF",
                        textShadow: "0 0 10px rgba(240,244,255,0.08)",
                      }}
                    >
                      {item.role}
                    </h3>

                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold mb-1.5"
                      style={{
                        color: isExpanded ? "white" : config.color,
                        background: isExpanded ? config.dot : config.gradient,
                        border: `1px solid ${config.border}`,
                        boxShadow: isActive ? `0 0 10px ${config.glow}` : "none",
                        transition: "box-shadow 0.3s ease",
                        textShadow: isExpanded ? "0 0 8px rgba(255,255,255,0.2)" : "none",
                      }}
                    >
                      {config.label}
                    </span>

                    <p
                      className="mt-0.5 text-xs font-medium"
                      style={{
                        color: "rgba(240,244,255,0.50)",
                        textShadow: "0 0 4px rgba(240,244,255,0.03)",
                      }}
                    >
                      {item.organization}
                    </p>
                  </div>
                </div>

                {isExpanded && item.responsibilities && (
                  <div
                    className="mt-3.5 border-t pt-3.5"
                    style={{ borderColor: "rgba(28, 37, 72, 0.8)" }}
                  >
                    <ul className="space-y-2 text-xs">
                      {item.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className="mt-1 inline-flex h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: config.dot,
                              boxShadow: `0 0 6px ${config.glow}`,
                            }}
                          />
                          <span
                            className="leading-relaxed"
                            style={{
                              color: "rgba(240,244,255,0.65)",
                              textShadow: "0 0 4px rgba(240,244,255,0.03)",
                            }}
                          >
                            {responsibility}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {item.skills && (
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold"
                            style={{
                              borderColor: config.border,
                              color: config.color,
                              background: config.gradient,
                              textShadow: `0 0 6px ${config.glow}`,
                            }}
                          >
                            {skill.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}