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
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#030712',
          mid: '#071021',
          card: '#0B1220',
          elevated: '#0F1A2E',
        },
        border: {
          DEFAULT: '#1A2540',
          bright: '#2A3F66',
          active: '#3B82F6',
        },
        accent: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          emerald: '#10B981',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#4A5568',
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        'blue-glow': 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        'purple-glow': 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(59,130,246,0.18)',
        'glow-purple': '0 0 40px rgba(139,92,246,0.14)',
        card: '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 32px rgba(59,130,246,0.12), 0 2px 8px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'orb-drift': 'orbDrift 22s ease-in-out infinite',
        'modal-in': 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        orbDrift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(24px,-32px) scale(1.04)' },
          '66%': { transform: 'translate(-18px,18px) scale(0.97)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
