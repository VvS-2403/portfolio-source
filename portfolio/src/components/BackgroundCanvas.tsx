"use client";

export default function BackgroundCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep navy base */}
      <div className="absolute inset-0" style={{ background: "#05071A" }} />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(79, 140, 255, 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.35,
        }}
      />

      {/* Very subtle horizontal lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(0deg, rgba(79, 140, 255, 0.06) 1px, transparent 1px)",
          backgroundSize: "100% 96px",
        }}
      />

      {/* BIG blue-indigo orb — bottom left (like reference image) */}
      <div
        className="absolute rounded-full animate-orb-drift"
        style={{
          width: 900,
          height: 900,
          bottom: -200,
          left: -200,
          background:
            "radial-gradient(circle at 40% 60%, rgba(109, 40, 217, 0.35) 0%, rgba(79, 140, 255, 0.18) 35%, rgba(37, 99, 235, 0.08) 60%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* Indigo orb — top-left */}
      <div
        className="absolute rounded-full animate-orb-drift"
        style={{
          width: 700,
          height: 700,
          top: -180,
          left: -150,
          background:
            "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, rgba(79, 140, 255, 0.1) 45%, transparent 70%)",
          filter: "blur(70px)",
          animationDelay: "2s",
        }}
      />

      {/* Purple/violet orb — top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: -150,
          right: -100,
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 72%)",
          filter: "blur(65px)",
        }}
      />

      {/* Cyan-blue accent — mid-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: "35%",
          right: -80,
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(79, 140, 255, 0.07) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Subtle violet sweep bottom-center */}
      <div
        className="absolute rounded-full animate-orb-drift"
        style={{
          width: 800,
          height: 500,
          bottom: -200,
          left: "30%",
          background:
            "radial-gradient(ellipse, rgba(79, 140, 255, 0.1) 0%, rgba(109, 40, 217, 0.06) 50%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "5s",
          animationDirection: "reverse",
        }}
      />

      {/* Noise grain for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
          opacity: 0.18,
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 85% 70% at 50% 20%, transparent 0%, rgba(5, 7, 26, 0.55) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(5, 7, 26, 0.85))",
        }}
      />
    </div>
  );
}