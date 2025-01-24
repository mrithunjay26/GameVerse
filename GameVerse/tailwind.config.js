import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1c1c2e',
        'background-light': '#2a2a3d',
        primary: '#5b5bf7',
        secondary: '#1e5bb6',
      },
    },
  },
  plugins: [],
}
export default config