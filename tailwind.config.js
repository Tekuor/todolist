const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
