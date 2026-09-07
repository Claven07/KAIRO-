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
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        kairo: {
          bg: '#FAF9F7',          // Industrial warm off-white foundation
          surface: '#FFFFFF',     // Crisp white surface
          subtle: '#F4F3F0',      // Secondary neutral surface
          muted: '#EAE9E4',       // Hairline dividers & muted fills
          border: 'rgba(0, 0, 0, 0.07)',
          'border-hover': 'rgba(0, 0, 0, 0.14)',
          'border-strong': 'rgba(0, 0, 0, 0.22)',
          graphite: '#121316',    // Deep Tokyo graphite text
          text: {
            primary: '#121316',   // Deep graphite near-black
            secondary: '#52525B', // Cool neutral slate
            muted: '#71717A',     // Precision technical gray
            faint: '#A1A1AA',     // Faint guide/label text
          },
          primary: {
            DEFAULT: '#18181B',   // Primary command graphite
            hover: '#09090B',
            light: '#F4F4F5',
            border: '#E4E4E7',
          },
          accent: {
            DEFAULT: '#1D4ED8',   // Electric cobalt accent
            hover: '#1E40AF',
            subtle: '#EFF6FF',
            border: '#BFDBFE',
          },
          cyber: {
            DEFAULT: '#2547D0',   // Technical indigo
            soft: '#EEF2FF',
            border: '#C7D2FE',
            text: '#3730A3',
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
        'xs': '4px',
        'control': '6px',
        'card': '10px',
        'surface': '10px',
        'panel': '12px',
        'command': '14px',
      },
      transitionTimingFunction: {
        'kairo': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'kairo-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(0, 0, 0, 0.03)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 3px 8px -2px rgba(0, 0, 0, 0.02)',
        'command': '0 10px 28px -4px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'float': '0 16px 36px -6px rgba(18, 19, 22, 0.08), 0 4px 12px -2px rgba(18, 19, 22, 0.03)',
        'focus-brand': '0 0 0 2px #FAF9F7, 0 0 0 4px rgba(29, 78, 216, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
