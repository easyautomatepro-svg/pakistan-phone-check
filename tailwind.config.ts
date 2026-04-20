import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:       '#00A651',
          primaryDark:   '#007A3D',
          primaryLight:  '#E8F5EE',
          primaryGlow:   '#00A65115',
          bg:            '#F4F6F4',
          surface:       '#FFFFFF',
          surfaceAlt:    '#F0F4F1',
          border:        '#E2EBE5',
          borderMid:     '#C8D9CE',
          textPrimary:   '#0D1F15',
          textSecondary: '#3D6B50',
          textMuted:     '#7A9E8A',
        },
        status: {
          yes:           '#00A651',
          yesBg:         '#E8F5EE',
          yesBorder:     '#A8D5BC',
          yesText:       '#005C2E',
          partial:       '#C47D00',
          partialBg:     '#FEF6E4',
          partialBorder: '#F4C96A',
          partialText:   '#7A4E00',
          no:            '#C0392B',
          noBg:          '#FDECEA',
          noBorder:      '#F5A89E',
          noText:        '#7A1A12',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.04)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.35s ease forwards',
        'fade-in':    'fade-in 0.25s ease forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'slide-down': 'slide-down 0.2s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
