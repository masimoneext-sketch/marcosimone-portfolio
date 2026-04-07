/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f0e1a',
          800: '#151322',
          700: '#1a1830',
          600: '#26215C',
        },
        purple: {
          900: '#26215C',
          700: '#3C3489',
          500: '#534AB7',
          400: '#7F77DD',
          300: '#AFA9EC',
          100: '#EEEDFE',
        },
        teal: {
          600: '#1D9E75',
          400: '#5DCAA5',
          200: '#A8EDD8',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Inter', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
