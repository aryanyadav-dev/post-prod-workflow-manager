/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dotted-size': '20px 20px',
      },
    },
  },
  plugins: [],
};
