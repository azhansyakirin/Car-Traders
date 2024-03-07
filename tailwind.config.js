/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    extend: {
      colors: {
        gold: '#FFC800',
        black: '#191817'
      },
      fontFamily: {
      }
    },
  },
  plugins: [],
}

