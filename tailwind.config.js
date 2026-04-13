export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7a5900',
        'primary-container': '#ebb94d',
        surface: '#f9f9f9',
        'surface-low': '#f3f3f3',
        'surface-high': '#e8e8e8',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4f4636',
        outline: '#807664',
        'outline-variant': '#d2c5b0',
        'on-primary-fixed': '#261900',
        'primary-fixed': '#ffdea2',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
