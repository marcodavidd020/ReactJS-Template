/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        // Colores personalizados basados en el logo CDS
        'cds-blue': {
          400: '#3B82F6',
          500: '#2563EB'
        },
        'cds-cyan': {
          300: '#67E8F9',
          400: '#22D3EE'
        },
        'cds-purple': {
          500: '#A855F7',
          600: '#9333EA'
        },
        'cds-pink': {
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777'
        }
      }
    },
  },
  plugins: [],
}
