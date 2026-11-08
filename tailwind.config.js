/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btp: {
          midnight: "#0F172A",     // Deep navy slate for high contrast typography
          deepblue: "#1E293B",     // Secondary slate
          navySurface: "#F8FAFC",  // Light architectural surface
          navyBorder: "rgba(15, 23, 42, 0.08)", // Clean hairline border
          orange: "#D97706",       // Cadmium bronze / warm amber (prestige BTP)
          orangeHover: "#B45309",  // Deep amber
          orangeMuted: "rgba(217, 119, 6, 0.12)", // Subtle amber tint
          cyan: "#0284C7",         // Precision laser cyan
          cyanMuted: "rgba(2, 132, 199, 0.12)",
          cream: "#FFFFFF",        // Pure white
          concrete: "#64748B",     // Medium slate concrete
          anthracite: "#0F172A",   // Dark charcoal slate
          cardDark: "#FFFFFF",     // Card surface in light mode
          cardBorder: "rgba(226, 232, 240, 0.9)",
        }
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-amber': '0 0 30px -5px rgba(217, 119, 6, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(2, 132, 199, 0.3)',
        'glow-subtle': '0 10px 40px -10px rgba(0, 0, 0, 0.6)',
        'elevation-3d': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        'spotlight': '0 0 50px rgba(217, 119, 6, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'architectural-grid': "radial-gradient(circle, rgba(148, 163, 184, 0.1) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      }
    },
  },
  plugins: [],
}


