"use client";
import { useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/portfolio";

const statusStyles: Record<string, { color: string; bg: string; border: string }> = {
  Completed: { color: "#34D399", bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.35)" },
  Ongoing: { color: "#818CF8", bg: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.35)" },
  Paused: { color: "#94A3B8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.2)" },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const status = statusStyles[project.status] ?? statusStyles.Paused;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#1E2D4A] shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        style={{ background: "linear-gradient(145deg, #0D1829, #071021)" }}
      >
        <div className="border-b border-[#1E2D4A] bg-[#030712] px-7 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ color: status.color, background: status.bg, border: `1px solid ${status.border}` }}
                >
                  {project.status}
                </span>
                <span className="rounded-full border border-[#1E2D4A] bg-[#0B1220] px-4 py-1.5 text-sm font-bold text-[#94A3B8]">
                  {project.type}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F9] leading-tight">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1220] border border-[#1E2D4A] text-[#94A3B8] transition hover:bg-[#0F1A2E] hover:text-white"
              aria-label="Close project details"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-8 px-7 py-7">
          <p className="text-base leading-8 text-[#94A3B8]">{project.fullDescription}</p>

          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#60A5FA]">Technologies</p>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[#1E2D4A] px-5 py-2.5 text-base font-semibold text-[#60A5FA]"
                  style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.08))" }}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {project.concepts.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A78BFA]">Key Concepts</p>
              <div className="flex flex-wrap gap-3">
                {project.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full border px-5 py-2.5 text-base font-semibold text-[#A78BFA]"
                    style={{
                      borderColor: "rgba(139,92,246,0.3)",
                      background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.08))"
                    }}
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.outcomes.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#34D399]">Outcomes</p>
              <ul className="space-y-4">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-base text-[#94A3B8]">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-[#34D399] text-sm font-bold flex-shrink-0"
                      style={{ borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.1)" }}>✓</span>
                    <span className="leading-7">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)", boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
              >
                <Github size={18} />
                View on GitHub
                <ExternalLink size={15} />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1E2D4A] bg-[#071021] px-6 py-3.5 text-base font-semibold text-[#94A3B8]">
                <Github size={18} />
                Repository private / not linked
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}