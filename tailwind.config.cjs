/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#eef1f8",
        priBg: "#F5E6FE",
        priText: "#35AF8A",
        darkBg: "#1E1E2E",
        darkBgSec: "#27293D",
        main: "#644AE2",
        priBlack: "#2A3538",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      fontSize: {
        nl: ["56px", "64px"],
      },
      backgroundSize: {
        bgMobile: "250px",
      },
      boxShadow: {
        shadow: "0 50px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        "2xs": "200px",
        "1xs": "350px",
        "1xl": "1400px",
        "3xl": "2000px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
