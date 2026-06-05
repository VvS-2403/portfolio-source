"use client";
import { Mail, Linkedin, Github, Download, Briefcase, MessageCircle } from "lucide-react";
import { useAIModal } from "@/contexts/AIModalContext";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const { openModal } = useAIModal();

  // Refs for measuring desktop column heights
  const leftCardRef = useRef<HTMLDivElement>(null);
  const aiCardRef   = useRef<HTMLDivElement>(null);

  // photoHeight: derived so right column matches left column height exactly.
  // null = use CSS fallback aspect-ratio until JS measurement is ready.
  const [photoHeight, setPhotoHeight] = useState<number | null>(null);

  useEffect(() => {
    const GAP = 12; // gap-3 = 12px between photo card and AI card

    function recalc() {
      const leftH = leftCardRef.current?.getBoundingClientRect().height ?? 0;
      const aiH   = aiCardRef.current?.getBoundingClientRect().height ?? 0;
      if (leftH > 0 && aiH > 0) {
        setPhotoHeight(Math.max(leftH - aiH - GAP, 160));
      }
    }

    // Run once after first paint
    recalc();

    // Re-run on any resize
    const ro = new ResizeObserver(recalc);
    if (leftCardRef.current) ro.observe(leftCardRef.current);
    if (aiCardRef.current)   ro.observe(aiCardRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <section id="intro" className="relative z-10 px-5 pt-4 pb-0 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── MOBILE ── */}
        <div className="block lg:hidden space-y-3 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1C3060]/80 bg-[#080C20]/80 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Open to Opportunities • 2028</span>
          </div>
          <div>
            <h1 className="font-display leading-tight" style={{ fontSize:"clamp(2rem,7vw,2.8rem)", fontWeight:500, color:"#ffffff", textShadow:"0 0 20px rgba(255,255,255,0.1)", letterSpacing:"-0.01em" }}>
              Vismay Vinayak<br />Shanbhag
            </h1>
            <p className="mt-1.5 text-sm font-semibold" style={{ color:"#00D4FF", textShadow:"0 0 12px rgba(0,212,255,0.4)" }}>
              B.E. Mathematics & Computing • BITS Pilani Goa
            </p>
            <p className="mt-2 text-sm leading-6 max-w-sm" style={{ color:"rgba(255,255,255,0.82)" }}>
              I build practical AI systems with an emphasis on machine learning, retrieval-augmented generation, and data-driven software deployed end to end.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[16px]" style={{ border:"1px solid rgba(79,124,255,0.35)" }}>
            <img src="/photo.jpg" alt="Vismay Vinayak Shanbhag" className="w-full object-cover" style={{ aspectRatio:"16/9", objectPosition:"top" }} />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })} className="hero-btn-primary text-sm">
              <Briefcase size={13} /> View Projects →
            </button>
            <a href="/resume.pdf" className="hero-btn-primary text-sm"><Download size={13} /> Resume</a>
          </div>
          <div className="rounded-[16px] p-4" style={{ border:"1px solid rgba(99,102,241,0.3)", background:"linear-gradient(145deg,#0D1035,#080C28)" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base text-white" style={{ background:"linear-gradient(135deg,#4F7CFF,#8B5CF6)", boxShadow:"0 4px 16px rgba(99,102,241,0.5)" }}>✦</div>
              <div>
                <p className="text-sm font-bold" style={{ color:"#ffffff", textShadow:"0 0 10px rgba(255,255,255,0.15)" }}>AI Career Copilot</p>
                <p className="text-xs" style={{ color:"rgba(255,255,255,0.55)" }}>Explore my work through conversation</p>
              </div>
            </div>
            <p className="text-xs leading-5 mb-3" style={{ color:"rgba(255,255,255,0.55)" }}>Ask anything about my projects, experience, or goals — powered by AI.</p>
            <button onClick={() => openModal()} className="hero-btn-conversation w-full text-sm"><MessageCircle size={13} /> Start a conversation →</button>
          </div>
          <div className="rounded-[16px] p-4" style={{ background:"linear-gradient(145deg,#080C20,#05071A)", border:"1px solid rgba(79,124,255,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={12} style={{ color:"#00D4FF" }} />
              <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color:"#00D4FF", textShadow:"0 0 10px rgba(0,212,255,0.4)" }}>Contact</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { href:"mailto:f20240876@goa.bits-pilani.ac.in", Icon:Mail, label:"Email", color:"#00D4FF", border:"rgba(0,212,255,0.3)" },
                { href:"https://www.linkedin.com/in/vismay-shanbhag-494157313/", Icon:Linkedin, label:"LinkedIn", color:"#4F7CFF", border:"rgba(79,124,255,0.3)" },
                { href:"https://github.com/VvS-2403", Icon:Github, label:"GitHub", color:"#8B5CF6", border:"rgba(139,92,246,0.3)" },
              ].map(({ href, Icon, label, color, border }) => (
                <a key={label} href={href} className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-semibold transition" style={{ border:`1px solid ${border}`, background:"rgba(255,255,255,0.03)", color }}>
                  <Icon size={13} style={{ color }} />{label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:grid gap-4" style={{ gridTemplateColumns:"1.55fr 1fr", alignItems:"start" }}>

          {/* LEFT HERO CARD — ~30% reduced padding */}
          <div ref={leftCardRef} className="relative overflow-hidden rounded-[22px] flex flex-col" style={{ background:"linear-gradient(160deg,#0A1245 0%,#060820 45%,#080420 100%)", border:"1px solid rgba(79,124,255,0.35)", boxShadow:"0 0 60px rgba(79,124,255,0.08),inset 0 1px 0 rgba(255,255,255,0.04)", padding:"28px 32px 26px 32px" }}>
            <div className="absolute pointer-events-none" style={{ bottom:"-80px", left:"-60px", width:"380px", height:"380px", background:"radial-gradient(ellipse,rgba(108,63,217,0.28) 0%,rgba(79,124,255,0.13) 40%,transparent 70%)", filter:"blur(45px)" }} />
            <div className="absolute pointer-events-none" style={{ top:"-50px", right:"-50px", width:"250px", height:"250px", background:"radial-gradient(ellipse,rgba(79,124,255,0.1) 0%,transparent 65%)", filter:"blur(35px)" }} />

            <div className="relative z-10 flex flex-col gap-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1C3060]/80 bg-[#080C20]/60 px-3.5 py-1 backdrop-blur-sm w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.18em] text-cyan-400 uppercase">Open to Opportunities • 2028</span>
              </div>

              {/* Name — lighter weight, elegant serif */}
              <div>
                <h1 className="font-display leading-[1.08]" style={{ fontSize:"clamp(2.4rem,4vw,4.2rem)", fontWeight:500, color:"#ffffff", textShadow:"0 0 20px rgba(255,255,255,0.1)", letterSpacing:"-0.01em" }}>
                  Vismay Vinayak<br />Shanbhag
                </h1>
                <p className="mt-2.5 text-base font-semibold tracking-tight" style={{ color:"#00D4FF", textShadow:"0 0 14px rgba(0,212,255,0.45)" }}>
                  B.E. Mathematics & Computing • BITS Pilani Goa
                </p>
                <p className="mt-3 max-w-[480px] text-sm leading-7" style={{ color:"rgba(255,255,255,0.82)" }}>
                  I build practical AI systems with an emphasis on machine learning, retrieval-augmented generation, and data-driven software deployed end to end.
                </p>
              </div>

              {/* Buttons — Resume same as View Projects */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })} className="hero-btn-primary">
                  <Briefcase size={14} /> View Projects →
                </button>
                <a href="/resume.pdf" className="hero-btn-primary">
                  <Download size={14} /> Resume
                </a>
              </div>

              {/* CONTACT — glowing colors, larger text */}
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"18px", marginTop:"2px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Mail size={12} style={{ color:"#00D4FF" }} />
                  <span className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color:"#00D4FF", textShadow:"0 0 10px rgba(0,212,255,0.5)" }}>Contact</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { href:"mailto:f20240876@goa.bits-pilani.ac.in", Icon:Mail, label:"Email", sub:"Get in touch", color:"#00D4FF", iconBg:"rgba(0,212,255,0.14)", iconBorder:"rgba(0,212,255,0.3)", cardBorder:"rgba(0,212,255,0.2)" },
                    { href:"https://www.linkedin.com/in/vismay-shanbhag-494157313/", Icon:Linkedin, label:"LinkedIn", sub:"Connect", color:"#4F7CFF", iconBg:"rgba(79,124,255,0.14)", iconBorder:"rgba(79,124,255,0.3)", cardBorder:"rgba(79,124,255,0.2)", external:true },
                    { href:"https://github.com/VvS-2403", Icon:Github, label:"GitHub", sub:"See code", color:"#8B5CF6", iconBg:"rgba(139,92,246,0.14)", iconBorder:"rgba(139,92,246,0.3)", cardBorder:"rgba(139,92,246,0.2)", external:true },
                  ].map(({ href, Icon, label, sub, color, iconBg, iconBorder, cardBorder, external }) => (
                    <a key={label} href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}
                      className="group flex items-center gap-2.5 rounded-[13px] transition-all duration-200"
                      style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${cardBorder}`, padding:"11px 13px" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.borderColor=color; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.borderColor=cardBorder; }}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px]" style={{ background:iconBg, border:`1px solid ${iconBorder}` }}>
                        <Icon size={14} style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-tight" style={{ color, textShadow:`0 0 10px ${iconBg}` }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.5)" }}>{sub}</p>
                      </div>
                      <span className="ml-auto text-xs" style={{ color:"rgba(255,255,255,0.3)" }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-3">
            {/* Photo Card — height driven by ResizeObserver so it matches left column */}
            <div
              className="relative overflow-hidden rounded-[20px]"
              style={{
                border: "1px solid rgba(79,124,255,0.35)",
                background: "#080C20",
                boxShadow: "0 0 28px rgba(79,124,255,0.10)",
                // Fallback: ~17% shorter than the old 4/3.5 ratio. Replaced once JS fires.
                ...(photoHeight !== null
                  ? { height: `${photoHeight}px` }
                  : { aspectRatio: "4/2.9" }),
              }}
            >
              <img
                src="/photo.jpg"
                alt="Vismay Vinayak Shanbhag"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 25%", display: "block" }}
              />
            </div>

            {/* AI Career Copilot Card */}
            <div ref={aiCardRef} className="rounded-[20px] p-5" style={{ border:"1px solid rgba(79,124,255,0.35)", background:"linear-gradient(145deg,#0D1245 0%,#090A30 100%)", boxShadow:"0 0 28px rgba(79,124,255,0.08)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] text-xl text-white" style={{ background:"linear-gradient(135deg,#4F7CFF,#8B5CF6)", boxShadow:"0 4px 18px rgba(99,102,241,0.5)", border:"1px solid rgba(99,102,241,0.4)" }}>✦</div>
                <div>
                  <p className="text-sm font-bold" style={{ color:"#ffffff", textShadow:"0 0 10px rgba(255,255,255,0.15)" }}>AI Career Copilot</p>
                  <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.5)" }}>Explore my work through conversation</p>
                </div>
              </div>
              <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(79,124,255,0.45),transparent)", marginBottom:"12px" }} />
              <p className="text-sm leading-6 mb-4" style={{ color:"rgba(255,255,255,0.65)" }}>
                Ask anything about my projects, experience, skills, and goals — get grounded answers instantly.
              </p>
              <button onClick={() => openModal()} className="hero-btn-conversation w-full">
                <MessageCircle size={16} /> Start a conversation →
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .hero-btn-primary {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 11px 22px; border-radius: 12px;
            border: 1px solid rgba(79,124,255,0.5);
            background: linear-gradient(135deg,#4F7CFF,#8B5CF6);
            color: #ffffff; font-size: 0.875rem; font-weight: 700;
            cursor: pointer; transition: all 0.2s ease; text-decoration: none;
            box-shadow: 0 0 28px rgba(108,99,255,0.28);
          }
          .hero-btn-primary:hover {
            background: linear-gradient(135deg,#6B93FF,#9B6DFF);
            box-shadow: 0 0 40px rgba(108,99,255,0.45);
            transform: translateY(-1px);
          }
          .hero-btn-conversation {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            padding: 14px 24px; border-radius: 12px; border: none;
            background: linear-gradient(135deg,#4F7CFF 0%,#6C63FF 50%,#8B5CF6 100%);
            color: #ffffff; font-size: 0.925rem; font-weight: 700;
            cursor: pointer; transition: all 0.25s ease; text-decoration: none;
            box-shadow: 0 4px 20px rgba(108,99,255,0.4),0 0 32px rgba(108,99,255,0.2);
            width: 100%;
          }
          .hero-btn-conversation:hover {
            background: linear-gradient(135deg,#6B93FF 0%,#7C73FF 50%,#9B6DFF 100%);
            box-shadow: 0 4px 28px rgba(108,99,255,0.55),0 0 45px rgba(108,99,255,0.28);
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    </section>
  );
}