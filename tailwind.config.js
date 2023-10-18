/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],


}

//exports = { theme: { colors: { primary: '#5c6ac4', secondary: '#ecc94b', } } }