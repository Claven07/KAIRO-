/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        kairo: {
          bg: '#FAF9F7',          // Warm off-white foundation
          surface: '#FFFFFF',     // Clean white surface
          subtle: '#F4F3F0',      // Secondary neutral surface
          muted: '#EFEFEA',       // Subtle separator / hover tint
          border: 'rgba(0, 0, 0, 0.06)',
          'border-hover': 'rgba(0, 0, 0, 0.12)',
          'border-strong': 'rgba(0, 0, 0, 0.18)',
          text: {
            primary: '#18181B',   // Deep charcoal
            secondary: '#52525B', // Cool neutral gray
            muted: '#71717A',     // Muted gray
            faint: '#A1A1AA',     // Faint guide text
          },
          primary: {
            DEFAULT: '#2D44D8',   // Refined deep blue/indigo
            hover: '#2236B8',
            light: '#F0F3FF',
            border: '#D3DCFF',
          },
          ai: {
            DEFAULT: '#6366F1',   // AI violet-indigo
            soft: '#F5F3FF',
            border: '#DDD6FE',
            text: '#4F46E5',
          },
          status: {
            active: '#059669',
            'active-bg': '#ECFDF5',
            'active-border': '#A7F3D0',
            paused: '#D97706',
            'paused-bg': '#FFFBEB',
            'paused-border': '#FDE68A',
            error: '#DC2626',
            'error-bg': '#FEF2F2',
            'error-border': '#FECACA',
          }
        }
      },
      borderRadius: {
        'control': '8px',
        'card': '12px',
        'surface': '12px',
        'panel': '14px',
        'command': '16px',
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(0, 0, 0, 0.02)',
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.03), 0 4px 12px -2px rgba(0, 0, 0, 0.02)',
        'command': '0 12px 32px -4px rgba(0, 0, 0, 0.05), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'float': '0 16px 36px -6px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'focus-brand': '0 0 0 3px rgba(45, 68, 216, 0.12)',
        'focus-ai': '0 0 0 3px rgba(99, 102, 241, 0.14)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
