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
    extend: {},
  },
  plugins: [],
} satisfies Config