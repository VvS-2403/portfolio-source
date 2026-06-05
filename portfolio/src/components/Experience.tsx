"use client";
import { Briefcase, Clock } from "lucide-react";

const experience = [
  {
    role: "Practice School I Intern",
    org: "Caarya Innovative",
    duration: "Ongoing",
    status: "active",
    context: "BITS Pilani Practice School-I Program",
    bullets: [
      "Industry mentorship on AI applications and product development",
      "Part of BITS Pilani PS-I program · responsibilities being finalised",
      "Contributing to AI applications, product development, and software engineering",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-16 px-4"
      style={{ borderBottom: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.97)" }}>
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-2">Experience</p>
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
          Work
        </h2>
        <p
          style={{
            color: "rgba(240,244,255,0.45)",
            fontSize: "0.75rem",
            lineHeight: 1.6,
            marginBottom: "1.75rem",
          }}
        >
          Professional experience and industry engagement.
        </p>

        <div className="flex flex-col gap-4">
          {experience.map((item) => (
            <div
              key={item.role}
              className="relative overflow-hidden rounded-[16px] p-5 transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
                border: "1px solid rgba(79, 124, 255, 0.18)",
                boxShadow: "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(79, 124, 255, 0.45)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(79,124,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(79, 124, 255, 0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)";
              }}
            >
              {/* Internal glow orbs */}
              <div className="absolute pointer-events-none" style={{ bottom: "-40px", left: "-30px", width: "180px", height: "180px", background: "radial-gradient(ellipse, rgba(108,63,217,0.22) 0%, rgba(79,124,255,0.10) 40%, transparent 70%)", filter: "blur(40px)" }} />
              <div className="absolute pointer-events-none" style={{ top: "-30px", right: "-30px", width: "130px", height: "130px", background: "radial-gradient(ellipse, rgba(79,124,255,0.08) 0%, transparent 65%)", filter: "blur(30px)" }} />

              <div className="relative z-10 flex flex-col gap-3.5 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_0_24px_rgba(59,130,246,0.45)] flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}>
                  <Briefcase size={18} />
                </div>
                <div className="flex-1">
                  {/* Role title */}
                  <p
                    className="text-lg font-bold mb-1"
                    style={{
                      color: "#F0F4FF",
                      textShadow: "0 0 12px rgba(240,244,255,0.10)",
                    }}
                  >
                    {item.role}
                  </p>

                  {/* Org name — separate line */}
                  <p
                    className="text-base font-bold mb-1.5"
                    style={{
                      color: "#60A5FA",
                      textShadow: "0 0 10px rgba(96,165,250,0.25)",
                    }}
                  >
                    {item.org}
                  </p>

                  {/* Ongoing + Active badges — separate line */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold"
                      style={{
                        color: "rgba(240,244,255,0.65)",
                        textShadow: "0 0 6px rgba(240,244,255,0.06)",
                      }}
                    >
                      <Clock size={12} /> {item.duration}
                    </span>
                    {item.status === "active" && (
                      <span className="rounded-full border px-3 py-1 text-xs font-bold text-[#34D399]"
                        style={{ borderColor: "rgba(52,211,153,0.35)", background: "rgba(52,211,153,0.12)", boxShadow: "0 0 10px rgba(52,211,153,0.15)" }}>
                        Active
                      </span>
                    )}
                  </div>

                  {/* Context */}
                  <p
                    className="text-sm mb-3.5 font-medium"
                    style={{
                      color: "rgba(240,244,255,0.60)",
                      textShadow: "0 0 6px rgba(240,244,255,0.04)",
                    }}
                  >
                    {item.context}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 text-sm">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 items-start">
                        <span className="mt-1.5 inline-flex h-2 w-2 rounded-full bg-[#3B82F6] flex-shrink-0"
                          style={{ boxShadow: "0 0 8px rgba(59,130,246,0.30)" }} />
                        <span
                          className="leading-6"
                          style={{
                            color: "rgba(240,244,255,0.70)",
                            textShadow: "0 0 6px rgba(240,244,255,0.04)",
                          }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}