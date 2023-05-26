/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      opacity: {
        728: '.728',
        45: '.45',
      },
      brightness: {
        40: '.40',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      colors: {
        backgroundNormal: '#141414',
        blueWhite: '#7AA7FF',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      width: {
        1280: '1280px',
        1216: '1216px',
        400: '400px',
      },
      screens: {
        lg: '1360px',
        md: '1280px',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require, import/no-unresolved
    require('tailwind-scrollbar-hide'),
    ({ addUtilities }) => {
      const newUtilities = {
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
