/** @type {import('tailwindcss').Config} */
//const colors = require('tailwindcss/colors');
module.exports = {
  important: true,
  corePlugins: {
    preflight: true,
  },
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   slate: colors.slate,
    //   white: colors.white,
    //   gray: colors.gray,
    //   emerald: colors.emerald,
    //   indigo: colors.indigo,
    //   yellow: colors.yellow,
    //   blue:colors.blue,
    //   red:colors.red,
    //   primary: '#632222'
    // },

    extend:{
      colors:{
        primary:'#632222'
      }
    }
 },


  plugins: [
    require('@tailwindcss/forms'),
  ],
}