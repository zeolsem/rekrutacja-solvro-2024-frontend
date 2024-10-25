import colors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.rose,
        primary_350: "#ED949F",
        secondary: colors.red,
        background: colors.gray,
        disabled: '#99435d',
      }
    },
  },
  plugins: [],
}

