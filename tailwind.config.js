/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          100: '#e95867',
          200: '#e7283c',
          300: '#e2081e',
          400: '#c21527',
          500: '#8c131f',
        },
        secondary: {
          100: '#dad6d3',
          200: '#c8c2be',
          300: '#b5b0ad',
          400: '#9b928d',
          500: '#867d77',
          600: '#68605B',
        },
        neutral: {
          100: '#fbfbfb',
          200: '#eeeeee',
          300: '#d3d3d3',
          400: '#929292',
          500: '#777777',
          600: '#5f5f5f',
        },
        'icon-gray': '#676767',
        'black-1': '#333',
        'white-1': '#fefefe',
      },
      height: {
        navbar: '26px',
      },
      margin: {
        navbar: '26px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
