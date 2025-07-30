/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,vue,js,ts,tsx,jsx}', './index.html'],
    theme: {
        extend: {
            // Custom utilities can now be defined directly in theme.extend
            backgroundImage: {
                rainbow:
                    'linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)',
            },
        },
    },
    // In Tailwind CSS 4.x, plugins are defined differently
    plugins: [
        // Custom plugin for rainbow background
        function ({ addUtilities, theme }) {
            const newUtilities = {
                '.bg-rainbow': {
                    backgroundImage: theme('backgroundImage.rainbow'),
                },
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        },
    ],
};
