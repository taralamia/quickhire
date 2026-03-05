/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4640DE',
        secondary: '#CCCCF5',
        tertiary: '#E9EBFD',
        background: '#F8F8FD',
        neutral: {
          900: '#25324B',
          700: '#515B6F',
          600: '#7C8493',
          500: '#A8ADB7',
          300: '#D6DDEB',
        },
        accent: {
          blue: '#26A4FF',
          green: '#56CDAD',
          yellow: '#FFB836',
          red: '#FF6550',
          purple: '#7B61FF',
        },
      },
      fontFamily: {
        heading: ['Clash Display', 'sans-serif'],
        body: ['Epilogue', 'sans-serif'],
        logo: ['Red Hat Display', 'sans-serif'],
      },
      fontSize: {
        h1: ['72px', { lineHeight: '110%' }],
        h2: ['48px', { lineHeight: '120%' }],
        'body-lg': ['18px', { lineHeight: '160%' }],
        body: ['16px', { lineHeight: '160%' }],
        'body-sm': ['14px', { lineHeight: '160%' }],
      },
    },
  },
  plugins: [],
};
