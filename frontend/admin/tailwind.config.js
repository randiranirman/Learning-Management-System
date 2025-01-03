/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#7865F1",
        secondary:"#F4F4F9",
        green:"#65F178",
        red:"#F16567",
      },
      transitionDuration:{
        time:'200ms',
      }
    },
  },
  plugins: [],
}