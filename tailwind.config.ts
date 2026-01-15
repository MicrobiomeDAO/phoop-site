import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sage green and cream palette with orange accents
        'sage-green': {
          50: '#f5f7f3',
          100: '#e9ede5',
          200: '#d3dccb',
          300: '#bdcab1',
          400: '#a7b997',
          500: '#97a87a',
          600: '#798762',
          700: '#5b6549',
          800: '#3d4431',
          900: '#1f2218',
          950: '#0f110c',
          DEFAULT: '#97a87a',
        },
        'light-sage': {
          50: '#f6f8f5',
          100: '#ecf1eb',
          200: '#d9e3d7',
          300: '#c6d5c3',
          400: '#b7c7b3',
          500: '#a8bba3',
          600: '#869682',
          700: '#657162',
          800: '#434b41',
          900: '#222621',
          950: '#111310',
          DEFAULT: '#a8bba3',
        },
        'cream': {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fefefd',
          300: '#fdfcfb',
          400: '#fdfbf3',
          500: '#fcf9ea',
          600: '#cac7bb',
          700: '#97958c',
          800: '#65645e',
          900: '#32322f',
          950: '#191917',
          DEFAULT: '#fcf9ea',
        },
        'orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#ffd9aa',
          300: '#ffbc6e',
          400: '#ffa239',
          500: '#ff8c0a',
          600: '#e67100',
          700: '#be5700',
          800: '#974508',
          900: '#7a3a0b',
          950: '#461c03',
          DEFAULT: '#ffa239',
        },
        // Aliases for compatibility
        gold: {
          DEFAULT: '#ffa239',
          light: '#ffbc6e',
          dark: '#e67100',
        },
        green: {
          DEFAULT: '#97a87a',
          light: '#a8bba3',
          dark: '#798762',
        },
        background: {
          DEFAULT: '#97a87a',
          light: '#a7b997',
          dark: '#798762',
        },
        surface: {
          DEFAULT: 'rgba(168, 187, 163, 0.3)',
          light: 'rgba(245, 235, 224, 0.08)',
          dark: 'rgba(213, 189, 175, 0.03)',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
