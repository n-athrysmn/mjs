/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
        safelist: [
          {
            pattern: /(from|via|to)-(indigo|purple|pink|sky|emerald|slate|gray|neutral|amber|yellow|blue|cyan)-(500|600|700|800|900|950)/,
          },
        ],
  theme: {
    extend: {
      colors: {
        deepForest: '#172621',
      },
      animation: {
        twinkle: 'twinkle .5s ease-in-out infinite',
        gradient: 'gradient 8s linear infinite',
        tick: 'tick 30s steps(30) infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        tick: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
    },
  },
   plugins: [require('tailwindcss-motion')], 
};
