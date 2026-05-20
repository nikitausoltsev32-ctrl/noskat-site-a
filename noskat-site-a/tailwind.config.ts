import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0b',
        'bg-card': '#111113',
        'bg-elevated': '#1a1a1d',
        border: '#222225',
        acc: '#e53935',
        'acc-hover': '#c62828',
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#555555',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
export default config
