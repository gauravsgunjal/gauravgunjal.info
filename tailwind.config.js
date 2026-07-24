/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b9d0ff',
          300: '#8bb0ff',
          400: '#5a87ff',
          500: '#3763f7',
          600: '#2445eb',
          700: '#1d34d1',
          800: '#1e2fa8',
          900: '#1e2c84',
          950: '#151a4d'
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        },
        surface: {
          light: '#ffffff',
          dark: '#0b1020'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        glow: '0 0 24px 0 rgba(55, 99, 247, 0.35)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out both',
        blink: 'blink 1s step-start infinite',
        'gradient-shift': 'gradientShift 8s ease infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
