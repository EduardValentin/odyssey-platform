/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      jura: "Jura, system-ui",
      inter: "Inter, system-ui",
    },
    extend: {
      colors: {
        success: {
          DEFAULT: "#009700",
        },
        rose: {
          DEFAULT: "#EBBCBA",
          moon: "#EA9A97",
        },
        base: {
          DEFAULT: "#232136",
        },
        foam: {
          DEFAULT: "#9CCFD8",
        },
      },
      keyframes: {
        "float-from-zero": {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "float-from-full": {
          "0%": {
            transform: "translateY(100%)",
          },
          "50%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      animation: {
        float:
          "float-from-zero 15s ease-in-out infinite, pulse 5s ease infinite",

        "float-reversed":
          "float-from-full 15s ease-in-out infinite, pulse 5s ease infinite",
      },
    },
  },
  plugins: [],
};
