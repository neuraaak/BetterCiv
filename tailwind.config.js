/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,vue,js,ts,tsx,jsx}', './index.html'],
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
};
