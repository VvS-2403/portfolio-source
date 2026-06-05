"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{ borderTop: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.98)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="font-display text-xl"
            style={{
              background: "linear-gradient(135deg, #F0F4FF 20%, #A0B8FF 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vismay Vinayak Shanbhag
          </p>
          <p className="mt-1.5 text-xs font-medium" style={{ color: "rgba(240,244,255,0.38)" }}>
            B.E. Mathematics and Computing · BITS Pilani Goa · 2028
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { href: "mailto:f20240876@goa.bits-pilani.ac.in", Icon: Mail, label: "Email", color: "#00D4FF" },
            { href: "https://www.linkedin.com/in/vismay-shanbhag-494157313/", Icon: Linkedin, label: "LinkedIn", color: "#4F7CFF" },
            { href: "https://github.com/VvS-2403", Icon: Github, label: "GitHub", color: "#8B5CF6" },
          ].map(({ href, Icon, label, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-all hover:scale-110"
              style={{ color: "rgba(240,244,255,0.32)" }}
              aria-label={label}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.32)"; }}
            >
              <Icon size={16} />
            </a>
          ))}
          <Link
            href="#contact"
            className="text-xs font-semibold transition"
            style={{ color: "rgba(240,244,255,0.32)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.55)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.32)"; }}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}