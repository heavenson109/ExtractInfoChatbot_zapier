/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "playfair": ['Playfair Display SC']
      },
      height: {
        "bodyHeight": "calc(100vh - 94px)"
      }
    },
  },
  plugins: [],
}

