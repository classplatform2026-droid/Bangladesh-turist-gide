/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jungle: '#0B3D2E',
        bay: '#0077BE',
        terracotta: '#CC4E31',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
