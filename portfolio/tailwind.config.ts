import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["monospace"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        surface: {
          DEFAULT: "#05071A",
          mid: "#080C20",
          card: "#0A0E24",
          elevated: "#0D1230",
        },
        border: {
          DEFAULT: "#1C2548",
          mid: "#263060",
          bright: "#3B4A80",
          active: "#4F6FFF",
        },
        accent: {
          blue: "#4F8CFF",
          indigo: "#6366F1",
          violet: "#7C3AED",
          purple: "#9333EA",
          cyan: "#06B6D4",
          emerald: "#10B981",
        },
        text: {
          primary: "#F0F4FF",
          secondary: "#94A3C8",
          muted: "#4A5680",
          dim: "#2E3A60",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fadeIn 0.35s ease-out forwards",
        "orb-drift": "orbDrift 24s ease-in-out infinite",
        "modal-in": "modalIn 0.22s cubic-bezier(0.34,1.4,0.64,1)",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        orbDrift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20px,-28px) scale(1.03)" },
          "66%": { transform: "translate(-14px,16px) scale(0.98)" },
        },
        modalIn: {
          "0%": { opacity: "0", transform: "scale(0.97) translateY(6px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;