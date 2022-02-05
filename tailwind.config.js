const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    safelist: ["bg-rose-50", "bg-rose-100", "bg-rose-200"],
  },
  // purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: "#6c7ccc",
      login: "#f3f4fc",
      white: colors.white,
      gray: "#e4e4ec",
      icon: "#4b4e60",
      menuItemColor: "#535d9d",
      secondary: "#f4f4fc",
      teal: "#8bc8d4",
      progress: "#c4caec",
      success: "#f7fff4",
      rose: {
        50: "#fcecea",
        100: "#f7cfca",
        200: "#ce9795",
      },
      lightOrange: {
        50: "#f3e9e0",
        100: "#f7d7bc",
        200: "#f2bc8c",
      },
      platinum: {
        50: "#e8e9da",
        100: "#e6e1bf",
        200: "#cccf9d",
      },
      lavender: {
        50: "#e4e1f7",
        100: "#d3cdfa",
        200: "#bbb2f7",
      },
      coolGreen: {
        50: "#e4f5ef",
        100: "#cae8dd",
        200: "#64a68e",
      },
      clearDay: {
        50: "#ede0f3",
        100: "#e7c9f5",
        200: "#caa9d9",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
