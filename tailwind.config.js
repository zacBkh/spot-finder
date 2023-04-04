/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './constants/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'blue-facebook': '#4C69BA',

                'primary': '#EF5E4E',
                'primary-hov': '#d2412b',

                'secondary': '#3b97ba',
                'secondary-light': '#e8f4f6',
                'secondary-hov': '#d2e7ed',
                'tertiary': '#F7F5F5',
                'tertiary-hov': '#efebea',
                'disabled': '#e3e3e3',
                'success': '#39a76d',

                'neutral': '#b0b0b0',
                'form-color': '#403b45',
                'dark-color': '#2d383f',
            },
        },
    },
}
