/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6366F1',
        'brand-secondary': '#8B5CF6',
        'brand-accent': '#EC4899',
        'brand-surface': '#1E293B',
        'brand-background': '#0F172A',
        'brand-success': '#10B981',
        'brand-warning': '#F59E0B',
        'brand-error': '#EF4444',
        'brand-info': '#3B82F6',
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typewriter': 'typewriter 3s steps(40) infinite',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
    },
  },
  plugins: [],
}