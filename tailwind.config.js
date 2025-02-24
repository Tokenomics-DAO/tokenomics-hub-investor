module.exports = {
  content: [
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
  ],  
  theme: {
    extend: {
      fontFamily: {
        oswald: ['"Oswald"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif']
      },
      colors: {
        'dao-red': '#FF6666',
        'dao-green': '#008090',
        'dark-tdao': '#101623',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        
      },
      spacing: {
        28: '7rem',
      },
      gridTemplateRows: {
        '7' : 'repeat(7, minmax(0, 1fr))',
        '8' : 'repeat(8, minmax(0, 1fr))',
        '9' : 'repeat(9, minmax(0, 1fr))'
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      height: {
        '3.5': '3.5rem',
        '4.5': '4.5rem',
        '128': '32rem',
        '140': '40rem',
      },
      width: {
        '3.5': '3.5rem',
        '4.5': '4.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
