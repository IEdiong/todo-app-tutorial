/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/index.html', './src/scripts/*.js'],
  theme: {
    extend: {
      colors: {
        // light mode
        'bright-blue': 'hsl(220, 98%, 61%)',
        'check-start': 'hsl(192, 100%, 67%)',
        'check-end': 'hsl(280, 87%, 65%)',
        'check-gray': 'hsl(236, 33%, 92%)',

        'light-gray': 'hsl(0, 0%, 98%)',
        'dark-gray': 'hsl(233, 11%, 84%)',
        'dark-gray-50': 'hsl(236, 9%, 61%)',
        'dark-gray-100': 'hsl(235, 19%, 35%)',

        // dark mode
        'v-dark-blue': 'hsl(235, 21%, 11%)',
        'desat-blue': 'hsl(235, 24%, 19%)',
        'light-grayish-blue': 'hsl(234, 39%, 85%)',
        'hv-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'dark-grayish-blue': 'hsl(234, 11%, 52%)',
      },
    },
    backgroundImage: {
      'mobile-lg': "url('/images/bg-mobile-light.jpg')",
      'mobile-dark': "url('/images/bg-mobile-dark.jpg')",
      'desktop-lg': "url('/images/bg-desktop-light.jpg')",
      'desktop-dark': "url('/images/bg-desktop-dark.jpg')",
      'icon-check': "url('/images/icon-check.svg')",
      'icon-moon': "url('/images/icon-moon.svg')",
      'icon-sun': "url('/images/icon-sun.svg')",
    },
    fontFamily: {
      sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
    },
    boxShadow: {
      '3xl': '0px 5px 30px 1px rgba(0,0,0,0.1)',
    },
  },
  plugins: [],
};
