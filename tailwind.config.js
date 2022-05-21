module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grey: '#D1D5DB',
      red: '#ff2a6a',
      blue: {
        light: '#59c3ff',
        DEFAULT: '#5468ff',
      },
      white: '#ffffff',
    },
    fontFamily: {
      sans: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    },
    container: {
      padding: '1rem',
      center: true,
    },
  },
  plugins: [],
}
