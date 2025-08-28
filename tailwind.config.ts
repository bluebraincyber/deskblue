import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        blue: {
          600: "#2563EB",
          700: "#1E40AF",
          400: "#60A5FA",
          100: "#DBEAFE",
          900: "#1E3A8A",
        },
        purple: {
          400: "#7C3AED",
          500: "#9333EA",
        },
        yellow: {
          400: "#FACC15",
          500: "#FBBF24",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;


