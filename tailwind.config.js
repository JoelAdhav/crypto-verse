/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: { nunito: 'Nunito' },
        },
        colors: {
            gray: { 100: '#8899a6', 200: '#192734', 300: '#15202b' },
            white: '#ffffff',
            blue: '#1d9bf0',
            red: '#d6436e',
            green: '#25da72',
        },
        fontSize: {
            sm: '14px',
            md: '18px',
            lg: '24px',
            xl: '32px',
            base: '16px',
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
