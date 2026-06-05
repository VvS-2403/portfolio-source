"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function ContactSection() {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <section
      id="contact"
      className="relative z-10 py-16 px-4"
      style={{ borderBottom: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.97)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="section-label mb-2">Get in Touch</p>
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
            Contact
          </h2>
          <p
            style={{
              color: "rgba(240,244,255,0.45)",
              fontSize: "0.75rem",
              lineHeight: 1.6,
            }}
          >
            Let&apos;s connect — I&apos;m always open to new conversations and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3">
          {/* Contact links */}
          <div className="grid grid-cols-1 gap-2">
            {[
              {
                href: "mailto:f20240876@goa.bits-pilani.ac.in",
                label: "Email",
                value: "Get in touch",
                Icon: Mail,
                color: "#00D4FF",
                iconBg: "rgba(0,212,255,0.14)",
                iconBorder: "rgba(0,212,255,0.3)",
                cardBorder: "rgba(0,212,255,0.2)",
              },
              {
                href: "https://www.linkedin.com/in/vismay-shanbhag-494157313/",
                label: "LinkedIn",
                value: "Connect",
                Icon: Linkedin,
                color: "#4F7CFF",
                iconBg: "rgba(79,124,255,0.14)",
                iconBorder: "rgba(79,124,255,0.3)",
                cardBorder: "rgba(79,124,255,0.2)",
                external: true,
              },
              {
                href: "https://github.com/VvS-2403",
                label: "GitHub",
                value: "See code",
                Icon: Github,
                color: "#8B5CF6",
                iconBg: "rgba(139,92,246,0.14)",
                iconBorder: "rgba(139,92,246,0.3)",
                cardBorder: "rgba(139,92,246,0.2)",
                external: true,
              },
            ].map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-[16px] p-4 transition-all duration-200"
                style={{
                  background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
                  border: `1px solid ${contact.cardBorder}`,
                  boxShadow: "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = contact.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px rgba(79,124,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = contact.cardBorder;
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: contact.iconBg,
                    border: `1px solid ${contact.iconBorder}`,
                  }}
                >
                  <contact.Icon size={14} style={{ color: contact.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight" style={{ color: contact.color, textShadow: `0 0 10px ${contact.iconBg}` }}>{contact.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(240,244,255,0.50)" }}>{contact.value}</p>
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>↗</span>
              </a>
            ))}
          </div>

          {/* Open to opportunities */}
          <div
            className="relative overflow-hidden rounded-[16px] p-5"
            style={{
              background: "linear-gradient(160deg, #0A1245 0%, #060820 45%, #080420 100%)",
              border: `1px solid ${cardHovered ? "rgba(79, 124, 255, 0.45)" : "rgba(79, 124, 255, 0.18)"}`,
              boxShadow: cardHovered
                ? "0 0 60px rgba(79,124,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 0 30px rgba(79,124,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
          >
            {/* Internal glow orbs */}
            <div className="absolute pointer-events-none" style={{ bottom: "-40px", left: "-30px", width: "180px", height: "180px", background: "radial-gradient(ellipse, rgba(108,63,217,0.22) 0%, rgba(79,124,255,0.10) 40%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute pointer-events-none" style={{ top: "-30px", right: "-30px", width: "130px", height: "130px", background: "radial-gradient(ellipse, rgba(79,124,255,0.08) 0%, transparent 65%)", filter: "blur(30px)" }} />

            <div className="relative z-10">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl mb-4"
                style={{
                  background: "linear-gradient(135deg, #4F7CFF, #8B5CF6)",
                  border: "1px solid rgba(99,102,241,0.4)",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                }}
              >
                <Send size={17} className="text-white" />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#F0F4FF", textShadow: "0 0 10px rgba(240,244,255,0.08)" }}
              >
                Open to Opportunities
              </h3>
              <p
                className="text-xs leading-6 mb-4"
                style={{ color: "rgba(240,244,255,0.55)" }}
              >
                Currently looking for internships and research roles in machine learning,
                data science, and AI systems — especially involving RAG, causal inference,
                or full-stack AI applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Internships", "Research Collaborations", "ML Projects", "AI Systems"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: "rgba(79, 124, 255, 0.22)",
                      color: "rgba(240,244,255,0.65)",
                      background: "rgba(8,12,32,0.9)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}