/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#e71d36',
          dark: '#1e2019',
          green: '#20bf55',
          white: '#fcfcfc',
          darkGreen: '#09814a',
        }
      }
    },
  },
  plugins: [],
}