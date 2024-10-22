/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Extend other theme properties if needed
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.bg-admin-color1': {
          backgroundColor: 'var(--admin-color1, #ffffff)',
        },
        '.admin-main-text': {
          color: 'var(--admin-color1, #ffffff)',
        },
        '.bg-admin-color2': {
          backgroundColor: 'var(--admin-color2, #ffffff)',
        },
        '.admin-inner-body1': {
          backgroundColor: 'var(--admin-inner-body1, #60cc82)', // Corrected syntax
        },
        '.admin-inner-body2': {
          backgroundColor: 'var(--admin-inner-body2, #60cc82)', // Corrected syntax
        },
        '.text-table-text': {
          color: 'var(--admin-table-text, #000000)',
        },
      });
    }
  ],
};
