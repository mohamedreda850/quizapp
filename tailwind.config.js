/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors:{
      primary: "#0D1321",
      secondary: "#FFEDDF",
      text: "#C5D86D",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

