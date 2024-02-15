/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

const getPxrSystem = () => {
  return range(1, 1400).reduce((accumulate, px) => {
    accumulate[`${px}pxr`] = pxToRem(px);
    return accumulate;
  }, {});
};

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  safelist: [
    { pattern: /rounded-/ },
    { pattern: /w-/ },
    {
      pattern:
        /bg-(primary|secondary|background|surface1|surface2|card|tooltip|toolbar|delete|tag)/,
    },
    { pattern: /text-(text-primary|text-secondary|white|black|neutral)/ },
  ],
  theme: {
    extend: {
      spacing: {
        ...getPxrSystem(),
      },
      borderRadius: {
        ...getPxrSystem(),
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        neutral: "#535353",
        primary: "#246FFF",
        secondary: "var(--secondary)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "var(--text-secondary)",
        surface1: "var(--surface1)",
        surface2: "var(--surface2)",
        background: "var(--background)",
        border: "var(--border)",
        card: "var(--card)",
        tooltip: "var(--tooltip)",
        toolbar: "var(--toolbar)",
        delete: "#ED0000",
        tag: "#570DF8",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--secondary": "#E2F4FF",
          "--text-primary": "0 0 0",
          "--text-secondary": "#535353",
          "--surface1": "#78C6FF",
          "--surface2": "#FFB015",
          "--background": "#FFFFFF",
          "--border": "#000000",
          "--card": "#D9D9D9",
          "--tooltip": "#535353",
          "--toolbar": "#858383",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--secondary": "#2600BD",
          "--text-primary": "255 255 255",
          "--text-secondary": "#8EB4FF",
          "--surface1": "#552AFF",
          "--surface2": "#B2B9FF",
          "--background": "#000D27",
          "--border": "#FFFFFF",
          "--card": "#00194A",
          "--tooltip": "#11419E",
          "--toolbar": "#002873",
        },
      },
    ],
  },
};
