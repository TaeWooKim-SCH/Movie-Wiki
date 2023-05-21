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
        spacing: {
          1216: '1216px',
          400: '400px',
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
  }
}
