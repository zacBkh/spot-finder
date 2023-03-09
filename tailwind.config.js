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
                'primary': '#EF5E4E',
                'secondary': '#007ea8',
                'secondary-light': '#e8f4f6',
                'secondary-hov': '#d2e7ed',
                'tertiary': '#F7F5F5',
                'tertiary-hov': '#efebea',
                'disabled': '#e3e3e3',
                'neutral': '#b0b0b0',
                'form-color': '#403b45',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
