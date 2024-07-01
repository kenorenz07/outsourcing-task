/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#D03024',
        dark: '#1D1D1D',
        secondary: '#FA9007',
        tertiary: '#F02F14',
        neutral: '#F4F4F4',
        neutral2: '#BFBFBF',
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};
