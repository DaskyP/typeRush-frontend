export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coolvetica: ['Coolvetica Regular', 'sans-serif'],
        coolveticaItalic: ['Coolvetica Italic', 'sans-serif'],
        coolveticaBold: ['Coolvetica Bold', 'sans-serif'],
      },
      colors: {
        whiteTransparent: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
