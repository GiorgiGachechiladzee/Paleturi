/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#854D0E',
          dark: '#78350F',
          light: '#ffdcc0',
        },
        secondary: {
          DEFAULT: '#3F6212',
          light: '#c2ed8d',
        },
        tertiary: {
          DEFAULT: '#25D366',
          dark: '#00692d',
        },
        surface: {
          DEFAULT: '#fff8f5',
          linen: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E6DFD5',
        },
        timber: {
          charcoal: '#1C1917',
          umber: '#44403C',
          stone: '#78716C',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Georgian"', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 4px 12px -2px rgba(28, 25, 23, 0.04)',
        'warm-lg': '0 8px 30px -4px rgba(120, 53, 15, 0.06), 0 4px 12px -2px rgba(28, 25, 23, 0.04)',
        'warm-hover': '0 14px 34px -4px rgba(120, 53, 15, 0.10)',
        'whatsapp': '0 4px 16px rgba(37, 211, 102, 0.25)',
      }
    },
  },
  plugins: [],
}