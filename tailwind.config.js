/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep purples from the background
        'brand-purple': {
          900: '#050505', // Near black for corners
          800: '#1a0b2e', // Deep indigo center
          700: '#2d1b4e',
          600: '#4a2c79',
          500: '#6b3fa0',
        },
        // Neon purple (lips color)
        'neon-purple': {
          500: '#a855f7',
          400: '#c026d3',
          300: '#d946ef',
        },
        // Red-pink glow (like the glow in image 1)
        'neon-pink': {
          500: '#ff1493', // Deep pink
          400: '#ff69b4', // Hot pink
          300: '#ff85c1',
        },
        // Keep green for checkmark only
        'neon-green': {
          500: '#39ff14',
          400: '#5fff3d',
          300: '#85ff66',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Montserrat', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.5), 0 0 90px rgba(168, 85, 247, 0.3)',
          },
        },
        breathe: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 20, 147, 0.8), 0 0 80px rgba(168, 85, 247, 0.6), 0 0 120px rgba(168, 85, 247, 0.4)',
            transform: 'scale(1.02)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-radial-dark': 'radial-gradient(circle at center, #1a0b2e 0%, #0a0512 70%, #050505 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(255, 20, 147, 0.4)',
        'neon-pink-strong': '0 0 30px rgba(255, 20, 147, 0.8), 0 0 60px rgba(255, 20, 147, 0.5)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5), 0 0 40px rgba(57, 255, 20, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
