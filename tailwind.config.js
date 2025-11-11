/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFA333",
        "primary-dark": "#E27B00",
        "primary-light": "#FFE5C1",
        blue: "#4A90E2",
        green: "#6BCB77",
        red: "#E85A5A",
        purple: "#8E6CEF",
        black: "#1E1E1E",
        "gray-dark": "#3C3C3C",
        "gray-light": "#EAEAEA",
      },
      fontFamily: {
        baloo: ["Baloo 2", "sans-serif"],
      },
    },
  },
  plugins: [],
};
