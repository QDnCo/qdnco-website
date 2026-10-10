/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        pixel: ['basis33', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#08090A',
        panel: '#0B0D0C',
        chalk: '#E9EEEB',
        live: '#5EE9A0',
      },
    },
  },
  plugins: [],
}
