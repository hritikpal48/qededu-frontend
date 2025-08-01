// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['"Manrope"', 'sans-serif'],
        serifdisplay: ['"DM Serif Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
