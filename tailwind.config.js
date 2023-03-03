/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './constants/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'blue-facebook': '#4C69BA',
                'primary': '#D2412B',
                'secondary': '#F7F5F5',
                'disabled': '#e3e3e3',
                'neutral': '#b0b0b0',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
