import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo background gray — navbar matches this exactly
        stone: {
          DEFAULT: "#939393",
        },
        gold: {
          50: "#faf6ee",
          100: "#f3e9d2",
          200: "#e6d2a3",
          300: "#d4b574",
          400: "#c19a4e",
          500: "#a87f33", // antique gold
          600: "#8a6526",
          700: "#6b4e20",
          800: "#523c1d",
          900: "#3f2f19",
        },
        walnut: {
          50: "#f6f1ec",
          100: "#e8dccf",
          200: "#cdb39a",
          300: "#b08c6a",
          400: "#946d49",
          500: "#7a5536", // walnut brown
          600: "#5f3f28",
          700: "#4a311f",
          800: "#3a271a",
          900: "#2d1f15",
        },
        sand: {
          50: "#fbf8f3",
          100: "#f3ece0",
          200: "#e8dcc8",
          300: "#dcc9ab",
          400: "#cbb188", // sand beige
          500: "#b89a6a",
        },
        warmgray: {
          100: "#eceae6",
          200: "#d8d4cd",
          300: "#bdb7ac",
          400: "#9c958a",
          500: "#7c766c", // warm stone gray
        },
        rust: {
          DEFAULT: "#9a2e15", // logo calligraphy
          dark: "#7a2410",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
