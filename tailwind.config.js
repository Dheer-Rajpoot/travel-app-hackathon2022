module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}','./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require("daisyui")],
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
}