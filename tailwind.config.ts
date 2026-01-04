import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        main: "rgba(var(--main))",
        typewriter: "rgba(var(--typewriter))",
        "neon-green": "#28b414", /* Muted green */
        "neon-purple": "#8a2be2", /* Muted purple */
        "dark-bg": "#080808",
        "scanline": "rgba(0, 0, 0, 0.5)",

        primary: {
          background: "rgba(var(--primary-background))",
          foreground: "rgba(var(--primary-foreground))",
        },
        secondary: {
          background: "rgba(var(--secondary-background))",
          foreground: "rgba(var(--secondary-foreground))",
        },

        border: "rgba(var(--border))",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        heading: "var(--font-heading)",
        mono: ["var(--font-vt323)", "monospace"],
        tech: ["var(--font-share-tech)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-pattern": "40px 40px",
      },
      animation: {
        "glitch-1": "glitch-1 2.5s infinite linear alternate-reverse",
        "glitch-2": "glitch-2 3s infinite linear alternate-reverse",
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        "glitch-1": {
          "0%": { clipPath: "inset(20% 0 80% 0)" },
          "20%": { clipPath: "inset(60% 0 10% 0)" },
          "40%": { clipPath: "inset(40% 0 50% 0)" },
          "60%": { clipPath: "inset(80% 0 5% 0)" },
          "80%": { clipPath: "inset(10% 0 60% 0)" },
          "100%": { clipPath: "inset(30% 0 50% 0)" },
        },
        "glitch-2": {
          "0%": { clipPath: "inset(10% 0 60% 0)" },
          "20%": { clipPath: "inset(80% 0 5% 0)" },
          "40%": { clipPath: "inset(30% 0 10% 0)" },
          "60%": { clipPath: "inset(50% 0 80% 0)" },
          "80%": { clipPath: "inset(20% 0 40% 0)" },
          "100%": { clipPath: "inset(70% 0 10% 0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
