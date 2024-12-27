import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1336px',
      xxl: '1620px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: '#3FB249',
        // primary: '#1CD74A',
        secondary: '#FACC15',
        primaryBg: '#EBF6FE',
        hoverText: '#dcbb87',
      },
    },
  },
  plugins: [],
};
export default config;
