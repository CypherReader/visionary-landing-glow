import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cosmic: {
          purple: "hsl(var(--cosmic-purple))",
          blue: "hsl(var(--cosmic-blue))",
          gold: "hsl(var(--cosmic-gold))",
          deep: "hsl(var(--cosmic-deep))",
          glow: "hsl(var(--cosmic-glow))",
        },
        cel: {
          bg: "hsl(var(--cel-bg))",
          "bg-mid": "hsl(var(--cel-bg-mid))",
          surface: "hsl(var(--cel-surface))",
          gold: "hsl(var(--cel-gold))",
          "gold-hover": "hsl(var(--cel-gold-hover))",
          bronze: "hsl(var(--cel-bronze))",
          "text-primary": "hsl(var(--cel-text-primary))",
          "text-secondary": "hsl(var(--cel-text-secondary))",
          "text-tertiary": "hsl(var(--cel-text-tertiary))",
          "cosmic-surge": "hsl(var(--cel-cosmic-surge))",
          "rising-tide": "hsl(var(--cel-rising-tide))",
          "controlled-burn": "hsl(var(--cel-controlled-burn))",
          "still-waters": "hsl(var(--cel-still-waters))",
          "fog-of-war": "hsl(var(--cel-fog-of-war))",
          "clash-day": "hsl(var(--cel-clash-day))",
        },
      },
      backgroundImage: {
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-mystical': 'var(--gradient-mystical)',
        'gradient-ethereal': 'var(--gradient-ethereal)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'ambient': 'var(--shadow-ambient)',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan": {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        "celestial-light-a": {
          "0%":   { transform: "translate(0%, 0%)    scale(1)",   opacity: "0.7" },
          "30%":  { transform: "translate(15%, 8%)   scale(1.1)", opacity: "1" },
          "60%":  { transform: "translate(-10%, 5%)  scale(0.95)", opacity: "0.6" },
          "100%": { transform: "translate(0%, 0%)    scale(1)",   opacity: "0.7" },
        },
        "celestial-light-b": {
          "0%":   { transform: "translate(0%, 0%)    scale(1)",   opacity: "0.6" },
          "40%":  { transform: "translate(-12%, -6%) scale(1.05)", opacity: "1" },
          "70%":  { transform: "translate(8%, -3%)   scale(1.1)", opacity: "0.5" },
          "100%": { transform: "translate(0%, 0%)    scale(1)",   opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "fade-in-slow": "fade-in-slow 1.5s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "scan": "scan 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
