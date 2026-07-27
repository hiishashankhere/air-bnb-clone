import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF385C',
          dark: '#E00B41',
          light: '#FF6685',
        },
        airbnb: {
          dark: '#222222',
          muted: '#717171',
          light: '#F7F7F7',
          border: '#DDDDDD',
          divider: '#EBEBEB',
        },
      },
      boxShadow: {
        airbnb: '0 6px 16px rgba(0, 0, 0, 0.12)',
        'airbnb-card': '0 2px 4px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.08)',
        'airbnb-modal': '0 8px 28px rgba(0, 0, 0, 0.28)',
        'airbnb-search': '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;

