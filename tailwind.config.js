/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
        'neon-blue': '#00bfff',
        'dark-bg': '#0a0a0b',
        'dark-card': '#1a1a1b',
        'dark-border': '#2a2a2b',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(45deg, #00ff88, #00bfff)',
      },
    },
  },
  plugins: [],
};
