const CUSTOM_COLORS = {
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
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      jura: "Jura, system-ui",
      inter: "Inter, system-ui",
    },
    extend: {
      colors: CUSTOM_COLORS,
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
      typography: ({ theme }) => ({
        markdown: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": CUSTOM_COLORS.foam.DEFAULT,
            "--tw-prose-lead": theme("colors.gray[700]"),
            "--tw-prose-links": theme("colors.gray[300]"),
            "--tw-prose-bold": theme("colors.gray[300]"),
            "--tw-prose-counters": theme("colors.gray[600]"),
            "--tw-prose-bullets": theme("colors.gray[400]"),
            "--tw-prose-hr": theme("colors.gray[300]"),
            "--tw-prose-quotes": theme("colors.gray[900]"),
            "--tw-prose-quote-borders": theme("colors.gray[300]"),
            "--tw-prose-captions": theme("colors.gray[700]"),
            "--tw-prose-code": theme("colors.gray[900]"),
            "--tw-prose-pre-code": theme("colors.gray[100]"),
            "--tw-prose-pre-bg": theme("colors.gray[900]"),
            "--tw-prose-th-borders": theme("colors.gray[300]"),
            "--tw-prose-td-borders": theme("colors.gray[200]"),
            "--tw-prose-invert-body": theme("colors.gray[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.gray[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.gray[400]"),
            "--tw-prose-invert-bullets": theme("colors.gray[600]"),
            "--tw-prose-invert-hr": theme("colors.gray[700]"),
            "--tw-prose-invert-quotes": theme("colors.gray[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.gray[700]"),
            "--tw-prose-invert-captions": theme("colors.gray[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.gray[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.gray[600]"),
            "--tw-prose-invert-td-borders": theme("colors.gray[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
