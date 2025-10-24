/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chalkboard: '#1B1B1B',
        pastel: {
          yellow: '#F7EED6',
          pink: '#FCD6D8',
          mint: '#C9E4DE',
          lavender: '#EAD1DC',
          teal: '#BEE3DB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'chalk-dust': 'chalk-dust 0.8s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        'chalk-dust': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
      },
    },
  },
  plugins: [],
}
