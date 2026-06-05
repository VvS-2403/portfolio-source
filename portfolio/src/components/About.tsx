"use client";
import { useState } from "react";
import { MapPin, Calendar, Sparkles } from "lucide-react";

export default function About() {
  const [imageHovered, setImageHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [stripHovered, setStripHovered] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative z-10 py-16 px-4"
      style={{
        borderBottom: "1px solid rgba(28, 37, 72, 0.6)",
        background: "rgba(5, 7, 26, 0.97)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section Heading ── */}
        <p className="section-label mb-2">About Me</p>
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
          Background &amp; Interests
        </h2>
        <p
          className="mb-7"
          style={{
            color: "rgba(240,244,255,0.45)",
            fontSize: "0.75rem",
            lineHeight: 1.6,
          }}
        >
          A glimpse into my academic journey and the things I enjoy beyond code.
        </p>

        {/* ── Two-column layout ── */}
        <div className="grid gap-3 lg:grid-cols-2 mb-4">

          {/* LEFT — Dome Image */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "16px",
              border: `1px solid ${imageHovered ? "rgba(79, 124, 255, 0.45)" : "rgba(79, 124, 255, 0.18)"}`,
              boxShadow: imageHovered
                ? "0 0 60px rgba(79,124,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              minHeight: "180px",
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <img
              src="/dome.jpg"
              alt="BITS Pilani K.K. Birla Goa Campus"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                position: "absolute",
                inset: 0,
                transition: "transform 0.5s ease",
                transform: imageHovered ? "scale(1.015)" : "scale(1)",
              }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(5, 7, 26, 0.78) 0%, rgba(5, 7, 26, 0.12) 50%, transparent 100%)",
              }}
            />

            {/* Caption */}
            <div className="absolute bottom-4 left-4" style={{ zIndex: 2 }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "rgba(240, 244, 255, 0.85)",
                  lineHeight: 1.3,
                  textShadow: "0 0 12px rgba(0,0,0,0.5)",
                }}
              >
                BITS Pilani
              </p>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: "rgba(240, 244, 255, 0.45)",
                  marginTop: "1px",
                  textShadow: "0 0 10px rgba(0,0,0,0.4)",
                }}
              >
                K.K. Birla Goa Campus
              </p>
            </div>
          </div>

          {/* RIGHT — Single cohesive card */}
          <div
            className="relative overflow-hidden rounded-[16px]"
            style={{
              background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
              border: `1px solid ${cardHovered ? "rgba(79, 124, 255, 0.45)" : "rgba(79, 124, 255, 0.18)"}`,
              boxShadow: cardHovered
                ? "0 0 60px rgba(79,124,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              padding: "16px 16px",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
            }}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            {/* Internal glow orbs — matching hero card */}
            <div className="absolute pointer-events-none" style={{ bottom: "-40px", left: "-30px", width: "180px", height: "180px", background: "radial-gradient(ellipse, rgba(108,63,217,0.22) 0%, rgba(79,124,255,0.10) 40%, transparent 70%)", filter: "blur(30px)" }} />
            <div className="absolute pointer-events-none" style={{ top: "-30px", right: "-30px", width: "130px", height: "130px", background: "radial-gradient(ellipse, rgba(79,124,255,0.08) 0%, transparent 65%)", filter: "blur(20px)" }} />
            {/* Card content — above glow orbs */}
            <div className="relative z-10 flex flex-col" style={{ justifyContent: "center", flex: 1 }}>
            {/* Introduction paragraph */}
            <p
              style={{
                color: "rgba(240,244,255,0.72)",
                fontSize: "0.75rem",
                lineHeight: 1.8,
                marginBottom: "12px",
              }}
            >
              B.E. Mathematics &amp; Computing student at BITS Pilani, Goa. I enjoy
              building end-to-end projects, experimenting with ideas across different
              domains, and learning by doing — whether it&apos;s working through a new
              concept or turning a problem into something deployable.
            </p>

            {/* Academics subsection */}
            <div style={{ marginBottom: "12px" }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: "0.85rem" }}>🎓</span>
                <p
                  style={{
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.2em",
                    color: "#4F8CFF",
                  }}
                >
                  Academics
                </p>
              </div>

              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#E0ECFF", lineHeight: 1.4, marginBottom: "2px" }}>
                B.E. Mathematics &amp; Computing
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  marginBottom: "2px",
                  background: "linear-gradient(135deg, #60A5FA, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                BITS Pilani Goa
              </p>
              <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "rgba(240,244,255,0.38)", lineHeight: 1.4 }}>
                Expected Graduation: 2028
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.18), transparent)", marginBottom: "12px" }} />

            {/* Interests subsection */}
            <div style={{ marginBottom: "12px" }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: "0.85rem" }}>✦</span>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.2em", color: "#818CF8" }}>
                  Interests
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {[
                  { icon: "🏏", label: "Cricket" },
                  { icon: "📖", label: "Philosophy" },
                  { icon: "🎵", label: "Music" },
                ].map((interest) => (
                  <span
                    key={interest.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold"
                    style={{
                      border: "1px solid rgba(129,140,248,0.22)",
                      background: "rgba(8,12,32,0.9)",
                      color: "rgba(240,244,255,0.65)",
                    }}
                  >
                    <span style={{ fontSize: "0.6rem" }}>{interest.icon}</span>
                    {interest.label}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "0.7rem", lineHeight: 1.6, color: "rgba(240,244,255,0.45)" }}>
                I enjoy cricket for the energy and teamwork, philosophy for
                perspective and clarity, and music for focus and inspiration.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(79,140,255,0.18), transparent)", marginBottom: "12px" }} />

            {/* Languages subsection */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: "0.85rem" }}>🌐</span>
                <p style={{ fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.2em", color: "#06B6D4" }}>
                  Languages
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {["English", "Hindi", "Kannada", "Konkani"].map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold"
                    style={{
                      border: "1px solid rgba(6,182,212,0.22)",
                      background: "rgba(8,12,32,0.9)",
                      color: "rgba(240,244,255,0.65)",
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            </div>{/* close z-10 wrapper */}
          </div>
        </div>

        {/* ── Bottom info strip ── */}
        <div
          className="rounded-[16px] grid grid-cols-1 sm:grid-cols-3 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
            border: "1px solid rgba(79, 124, 255, 0.18)",
            boxShadow: "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {[
            {
              icon: <MapPin size={12} style={{ color: "#818CF8" }} />,
              label: "Current Residence",
              value: "Udupi, Karnataka",
              glow: "rgba(129,140,248,0.08)",
            },
            {
              icon: <Sparkles size={12} style={{ color: "#06B6D4" }} />,
              label: "Open to Opportunities",
              value: "Projects • Research • Internships",
              glow: "rgba(6,182,212,0.08)",
            },
            {
              icon: <Calendar size={12} style={{ color: "#4F8CFF" }} />,
              label: "Batch",
              value: "2028",
              glow: "rgba(79,140,255,0.08)",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-3.5 py-3"
              style={{
                borderRight: i < 2 ? "1px solid rgba(28, 37, 72, 0.6)" : "none",
                background: stripHovered === i ? "linear-gradient(135deg, rgba(13,18,48,1), rgba(10,14,40,1))" : "transparent",
                boxShadow: stripHovered === i ? `inset 0 0 24px ${item.glow}` : "none",
                transition: "background 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={() => setStripHovered(i)}
              onMouseLeave={() => setStripHovered(null)}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(79,140,255,0.10), rgba(129,140,248,0.06))",
                  border: "1px solid rgba(28,37,72,0.8)",
                }}
              >
                {item.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.18em",
                    color: "rgba(240,244,255,0.32)",
                    marginBottom: "1px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "rgba(240,244,255,0.75)",
                    textShadow: "0 0 8px rgba(240,244,255,0.05)",
                  }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive border fix for mobile strip */}
        <style>{`
          @media (max-width: 639px) {
            #about .sm\\:grid-cols-3 > div {
              border-right: none !important;
              border-bottom: 1px solid rgba(28, 37, 72, 0.6) !important;
            }
            #about .sm\\:grid-cols-3 > div:last-child {
              border-bottom: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
