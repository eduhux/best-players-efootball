import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta oficial do BEST PLAYERS IN EFOOTBALL
        base: {
          900: "#05060a",
          800: "#0a0c14",
          700: "#10131f",
          600: "#161a2b",
        },
        gold: {
          DEFAULT: "#f5c542",
          soft: "#ffe08a",
          deep: "#c9962a",
        },
        neon: {
          DEFAULT: "#22d3ee",
          blue: "#3b82f6",
          deep: "#0ea5e9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 25px rgba(245, 197, 66, 0.35)",
        neon: "0 0 25px rgba(34, 211, 238, 0.35)",
        glass: "0 8px 40px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.10), transparent 45%), radial-gradient(circle at 80% 80%, rgba(245,197,66,0.08), transparent 40%)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
