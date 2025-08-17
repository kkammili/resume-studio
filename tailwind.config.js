/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          gray: '#f9fafb',
          blue: '#ebf8ff',
        },
        text: {
          dark: '#1a202c',
          black: '#000000',
        },
        accent: {
          blue: '#3182ce',
          border: '#d1d5db',
          ring: '#bee3f8',
        },
      },
    },
  },
  plugins: [],
}

