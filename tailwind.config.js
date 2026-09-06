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
        mono: ['SF Mono', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        kairo: {
          bg: '#F8F9FA',
          subtle: '#F3F4F6',
          surface: '#FFFFFF',
          border: 'rgba(0, 0, 0, 0.07)',
          'border-hover': 'rgba(0, 0, 0, 0.12)',
          'border-strong': 'rgba(0, 0, 0, 0.18)',
          text: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#64748B',
            faint: '#94A3B8',
          },
          primary: {
            DEFAULT: '#2547D0',
            hover: '#1D3BB5',
            light: '#EEF2FF',
            border: '#C7D2FE',
          },
          ai: {
            DEFAULT: '#6366F1',
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
        'card': '14px',
        'panel': '20px',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 16px -2px rgba(0, 0, 0, 0.03)',
        'float': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'command': '0 16px 40px -8px rgba(37, 71, 208, 0.08), 0 6px 20px -2px rgba(15, 23, 42, 0.04)',
        'glow-ai': '0 0 0 1px rgba(99, 102, 241, 0.2), 0 8px 24px -4px rgba(99, 102, 241, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
