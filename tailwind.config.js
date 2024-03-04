/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,vue,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-rainbow': {
          backgroundImage: `linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)`,
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

