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
        card: "rgba(var(--card))",
        surface: "rgba(var(--surface))",
        border: "rgba(var(--border))",
        main: "rgba(var(--accent))",
        accent: {
          DEFAULT: "rgba(var(--accent))",
          hover: "rgba(var(--accent-hover))",
        },
        highlighter: "rgba(var(--highlighter))",
        primary: {
          DEFAULT: "rgba(var(--primary))",
          foreground: "rgba(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary))",
          background: "rgba(var(--card))",
          foreground: "rgba(var(--secondary-foreground))",
        },
        muted: "rgba(var(--muted))",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        heading: "var(--font-heading)",
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
        panel: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
