import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAF6',
        text: '#0F172A',
        primary: '#1E40AF',
        success: '#166534',
      },
      fontSize: {
        base: ['1.125rem', { lineHeight: '1.75rem' }], // 18px starting size for better legibility (50+ users)
        lg: ['1.25rem', { lineHeight: '1.75rem' }],
        xl: ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      fontWeight: {
        semibold: '600', // ensuring semibold is clearly defined for usage
      },
    },
  },
  plugins: [],
};
export default config;
