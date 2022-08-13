/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#EE786B',
        secondary : '#2F7889',
        lightGray: '#F8FAFC',
      },
      fontFamily : {
        open : [ 'Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}