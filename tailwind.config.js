// import { Container } from "postcss";

export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            heading: "Rubik",
            body: "Poppins"
         },
         container: {
            center: true,
            padding: {
               DEFAULT: '1rem',
            }
         },
         screens: {
            '2xl': '1430px',
            '3xl': '1600px'
         },
         fontSize: {
            xs: '14px',
            sm: '16px',
            lg: '18px'
         },
         colors: {
            dark: ({ opacityValue }) => {
               return `rgba(45, 45, 45, ${opacityValue})`
            },
            bright: "#e3e3e3"
         }
      },
   },
   plugins: [],
}

