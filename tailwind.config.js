/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./util/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      sans: ["var(--spartan-font)", 'sans-serif'],
    },
    extend: {
      colors: {
        'purple-slate': '#7c5dfa',
        'purple-mimosa': '#9278fe',
        'blue-dark': '#1f213a',
        'blue-clay': '#252945',
        'faded-blue': '#7e88c3',
        'onyx': '#0c0e15',
        'link-water': '#dee3f9',
        'regent-grey': '#888eb0',
        'valentine-red': '#ed5758',
        'light-salmon-pink': '#ff9796',
        'white-lilac': '#f8f7fb',
        'mirage': '#131625',
        'orange': '#ff8e00',
        'black': '#0b0e15',
        'bright-grey': '#373b54',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
