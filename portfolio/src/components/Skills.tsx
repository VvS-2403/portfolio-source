"use client";
import { useState } from "react";

const skillGroups = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "C++", "Java", "JavaScript", "MATLAB"],
    accent: "#4F8CFF",
    gradient: "linear-gradient(135deg, #1A3A8F, #2B4FBB)",
    glow: "rgba(79, 140, 255, 0.35)",
    border: "rgba(79, 140, 255, 0.5)",
    badgeBorder: "rgba(79, 140, 255, 0.25)",
    badgeGlow: "rgba(79, 140, 255, 0.08)",
    badgeHoverGlow: "rgba(79, 140, 255, 0.12)",
  },
  {
    category: "ML / Data Science",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "XGBoost", "Hugging Face"],
    accent: "#818CF8",
    gradient: "linear-gradient(135deg, #3B3F8F, #5B5FC7)",
    glow: "rgba(129, 140, 248, 0.35)",
    border: "rgba(129, 140, 248, 0.5)",
    badgeBorder: "rgba(129, 140, 248, 0.25)",
    badgeGlow: "rgba(129, 140, 248, 0.08)",
    badgeHoverGlow: "rgba(129, 140, 248, 0.12)",
  },
  {
    category: "Web / Backend",
    skills: ["React", "Next.js", "Node.js", "FastAPI"],
    accent: "#06B6D4",
    gradient: "linear-gradient(135deg, #0E5A6F, #0D7A96)",
    glow: "rgba(6, 182, 212, 0.30)",
    border: "rgba(6, 182, 212, 0.5)",
    badgeBorder: "rgba(6, 182, 212, 0.22)",
    badgeGlow: "rgba(6, 182, 212, 0.06)",
    badgeHoverGlow: "rgba(6, 182, 212, 0.10)",
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "W&B", "VS Code", "Colab"],
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, #7A4F06, #A16B0A)",
    glow: "rgba(245, 158, 11, 0.28)",
    border: "rgba(245, 158, 11, 0.45)",
    badgeBorder: "rgba(245, 158, 11, 0.20)",
    badgeGlow: "rgba(245, 158, 11, 0.06)",
    badgeHoverGlow: "rgba(245, 158, 11, 0.10)",
  },
  {
    category: "Cloud / Deployment",
    skills: ["Vercel", "Hugging Face Spaces"],
    accent: "#34D399",
    gradient: "linear-gradient(135deg, #0F5E3F, #167A53)",
    glow: "rgba(52, 211, 153, 0.28)",
    border: "rgba(52, 211, 153, 0.45)",
    badgeBorder: "rgba(52, 211, 153, 0.22)",
    badgeGlow: "rgba(52, 211, 153, 0.06)",
    badgeHoverGlow: "rgba(52, 211, 153, 0.10)",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  const active = skillGroups[activeTab];

  return (
    <section id="skills" className="relative z-10 py-16 px-4"
      style={{ borderBottom: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.97)" }}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-2">Skills</p>
        <h2
          className="font-display mb-2"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            background: "linear-gradient(135deg, #F0F4FF 20%, #A0B8FF 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Technical Stack
        </h2>
        <p
          className="mb-7"
          style={{
            color: "rgba(240,244,255,0.45)",
            fontSize: "0.75rem",
            lineHeight: 1.6,
          }}
        >
          Languages, frameworks, and tools I work with regularly.
        </p>

        {/* Card container */}
        <div
          className="relative overflow-hidden rounded-[16px] p-5"
          style={{
            background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
            border: "1px solid rgba(79, 124, 255, 0.18)",
            boxShadow: "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Internal glow orbs */}
          <div className="absolute pointer-events-none" style={{ bottom: "-40px", left: "-30px", width: "180px", height: "180px", background: "radial-gradient(ellipse, rgba(108,63,217,0.22) 0%, rgba(79,124,255,0.10) 40%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute pointer-events-none" style={{ top: "-30px", right: "-30px", width: "130px", height: "130px", background: "radial-gradient(ellipse, rgba(79,124,255,0.08) 0%, transparent 65%)", filter: "blur(30px)" }} />

          <div className="relative z-10">
            {/* Tab buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
              {skillGroups.map((group, index) => (
                <button
                  key={group.category}
                  onClick={() => setActiveTab(index)}
                  className="rounded-full px-4 py-2 text-xs font-bold transition-all duration-200"
                  style={
                    activeTab === index
                      ? {
                          background: group.gradient,
                          color: "white",
                          border: `1px solid ${group.border}`,
                          boxShadow: `0 0 20px ${group.glow}`,
                          textShadow: `0 0 10px rgba(255,255,255,0.15)`,
                        }
                      : {
                          background: "rgba(8, 12, 32, 0.9)",
                          color: "rgba(240,244,255,0.45)",
                          border: "1px solid rgba(79, 124, 255, 0.18)",
                        }
                  }
                  onMouseEnter={e => {
                    if (activeTab !== index) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = group.border;
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,244,255,0.72)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== index) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(79, 124, 255, 0.18)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,244,255,0.45)";
                    }
                  }}
                >
                  {group.category}
                </button>
              ))}
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2">
              {active.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-3.5 py-2 text-xs font-semibold cursor-default transition-all"
                  style={{
                    background: "rgba(8, 12, 32, 0.9)",
                    border: `1px solid ${active.badgeBorder}`,
                    color: "rgba(240, 244, 255, 0.78)",
                    textShadow: "0 0 8px rgba(240, 244, 255, 0.12)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = active.border;
                    (e.currentTarget as HTMLElement).style.color = "#F0F4FF";
                    (e.currentTarget as HTMLElement).style.textShadow = `0 0 12px rgba(240, 244, 255, 0.25)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${active.badgeHoverGlow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = active.badgeBorder;
                    (e.currentTarget as HTMLElement).style.color = "rgba(240, 244, 255, 0.78)";
                    (e.currentTarget as HTMLElement).style.textShadow = "0 0 8px rgba(240, 244, 255, 0.12)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}