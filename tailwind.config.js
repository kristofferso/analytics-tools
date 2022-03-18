module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /^shadow-.*-200/ },
    { pattern: /^border-.*-200/ },
    { pattern: /^bg-.*-100/ },
    { pattern: /^bg-.*-50/, variants: ["hover"] },
  ],
  theme: {
    extend: {
      fontSize: {
        "4xl": "2.5rem",
        "5xl": "3.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["light"] },
};
