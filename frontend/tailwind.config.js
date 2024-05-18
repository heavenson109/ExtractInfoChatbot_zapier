/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "playfair": ['Playfair Display SC']
      },
      height: {
        "bodyHeight": "calc(100vh - 114px)"
      },
      scrollbar: {
        thin: 'thin', // custom scrollbar thin
      }
    },
  },
  variants: {
    scrollbar: ['rounded', 'dark'], // add dark variant
  },
  plugins: [],
}

