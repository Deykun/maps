import { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    /*
      Great example of web developers who don't understand the basics of CSS.
      https://github.com/tailwindlabs/tailwindcss/discussions/1739
    */
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'ui': '#937979',
      'ui-contrast': '#ffdada',
      'ui-dark': '#4b4b4b',
      'ui-dark-contrast': '#e8b7b7',
      'white': '#fff',
      'black': '#000',
      'marker': '#ff8080',
    },
  },
  plugins: [],
} satisfies Config