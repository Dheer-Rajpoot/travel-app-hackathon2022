const defaults = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}','./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("daisyui")],
  themes: false,
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  theme: {
    fontFamily: {
      sans: ['"Poppins"', ...defaults.fontFamily.sans],
      mono: defaults.fontFamily.mono,
      serif: ['Unbounded', ...defaults.fontFamily.serif],
    },
  }
}