import type { Config } from 'tailwindcss';
import { mtConfig } from '@material-tailwind/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#fece19',
        customGreen: '#67ca66',
        customLightGreen: '#9ed772',
        customOrange: '#fd8446',
        customRed: '#fe565f',
      },
    },
  },
  plugins: [mtConfig],
};

export default config;
