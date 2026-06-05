"use client";
import { useEffect, useState, useCallback } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useAIModal } from "@/contexts/AIModalContext";

const NAV_LINKS = [
  { href: "#intro", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#extracurriculars", label: "Activities" },
  { href: "#contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const { openModal } = useAIModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: "68px",
          background: scrolled ? "rgba(5,7,26,0.96)" : "rgba(5,7,26,0.78)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(79,124,255,0.12)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(79,124,255,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#intro")}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs font-mono text-white"
              style={{
                background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
                border: "1px solid rgba(99,102,241,0.4)",
                boxShadow: "0 2px 10px rgba(99,102,241,0.3)",
              }}
            >
              VS
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none" style={{ color: "#ffffff", textShadow: "0 0 12px rgba(255,255,255,0.15)" }}>
                Vismay Shanbhag
              </p>
              <p className="text-[11px] mt-0.5 leading-none tracking-wide" style={{ color: "rgba(255,255,255,0.38)" }}>
                BITS Pilani · 2028
              </p>
            </div>
          </button>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 tracking-wide"
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(79,124,255,0.12)" : "transparent",
                    textShadow: isActive ? "0 0 12px rgba(255,255,255,0.3)" : "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                      (e.currentTarget as HTMLElement).style.textShadow = "0 0 10px rgba(255,255,255,0.2)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLElement).style.textShadow = "none";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: "linear-gradient(90deg,#4F7CFF,#8B5CF6)", boxShadow: "0 0 6px rgba(79,124,255,0.8)" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Talk to AI + mobile toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => openModal()}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
                border: "1px solid rgba(99,102,241,0.5)",
                boxShadow: "0 2px 14px rgba(99,102,241,0.35)",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 22px rgba(99,102,241,0.55)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(99,102,241,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Sparkles size={13} />
              Talk to AI
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition md:hidden"
              style={{
                border: "1px solid rgba(79,124,255,0.25)",
                background: "rgba(8,12,32,0.9)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-x-4 bottom-4 z-50 rounded-[22px] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.7)] md:hidden"
          style={{
            border: "1px solid rgba(79,124,255,0.2)",
            background: "rgba(8,12,32,0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-left transition-all"
                  style={{
                    background: isActive ? "rgba(79,124,255,0.12)" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                    border: isActive ? "1px solid rgba(79,124,255,0.25)" : "1px solid transparent",
                    textShadow: isActive ? "0 0 12px rgba(255,255,255,0.25)" : "none",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => { setMenuOpen(false); openModal(); }}
              className="mt-1 w-full justify-center inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white"
              style={{
                background: "linear-gradient(135deg,#4F7CFF,#8B5CF6)",
                border: "1px solid rgba(99,102,241,0.5)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                cursor: "pointer",
              }}
            >
              <Sparkles size={13} /> Talk to AI
            </button>
          </div>
        </div>
      )}
    </>
  );
}