/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'ivory': {
          DEFAULT: '#F7F5F2',
          light: '#FFFFFF',
        },
        'crem': {
          DEFAULT: '#EBE6DD',
          taupe: '#E0D7C8',
        },
        'taupe': {
          DEFAULT: '#C4B5A0',
          light: '#918679',
          medium: '#6B6254',
          dark: '#A89885',
        },
        'olive': {
          DEFAULT: '#9CA986',
          soft: '#A8B498',
          deep: '#8B9474',
          light: '#B8C4A8',
        },
        'bronze': {
          DEFAULT: '#B8A081',
          warm: '#C4AE8E',
          gold: '#C9A961',
          bright: '#D9B971',
        },
        'dark': {
          primary: '#2A2622',
          secondary: '#3A3530',
          elevated: '#443F38',
          border: '#5A534C',
          'border-subtle': '#4A4540',
        },
        'text': {
          'primary-light': '#3D3932',
          'primary-dark': '#F0EBE3',
          'secondary-light': '#6B6254',
          'secondary-dark': '#D4CABE',
          'tertiary-light': '#918679',
          'tertiary-dark': '#B5A895',
        },
      },
    },
  },
  plugins: [],
}
