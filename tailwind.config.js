/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#4A0E17',    // Deep Royal Maroon
          'maroon-dark': '#33080E',
          gold: '#D4AF37',      // Rich Metallic Zari Gold
          'gold-light': '#F4E091',
          'gold-dark': '#AA8417',
          emerald: '#0F382C',   // Traditional Peacock Emerald Green
          ruby: '#900C3F',      // Traditional Ruby Red
          cream: '#FAF6EF',     // Soft Luxury Silk Cream Background
          dark: '#1C1917',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(74, 14, 23, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}
