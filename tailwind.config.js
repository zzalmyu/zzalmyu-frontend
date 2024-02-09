/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
        "copy-primary": "rgba(var(--copy-primary))",
        "copy-secondary": "rgba(var(--copy-secondary))",
        "copy-cta": "rgba(var(--copy-cta))",
        "toggle-bg": "rgba(var(--toggle-bg))",
        "toggle-center": "rgba(var(--toggle-center))",
        "toggle-border": "rgba(var(--toggle-border))",
        background: "rgba(var(--background))",
        border: "rgba(var(--border))",
        card: "rgba(var(--card))",
        tooltip: "rgba(var(--tooltip))",
        toolbar: "rgba(var(--toolbar))",
        delete: "rgba(var(--delete))",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
};
