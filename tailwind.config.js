/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fest: {
          dark: '#080c14',
          card: 'rgba(17, 24, 39, 0.75)',
          border: 'rgba(99, 102, 241, 0.2)',
          accent: '#6366f1',
          cyan: '#38bdf8',
          violet: '#8b5cf6',
          purple: '#a855f7',
          pink: '#ec4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'fest-radial': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.12) 35%, transparent 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

