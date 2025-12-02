/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <-- Vite scans all React components
  ],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
    darkMode: 'class', // enables manual dark mode toggle
};