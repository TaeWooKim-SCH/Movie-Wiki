/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
    },
  },
  plugins: [
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
