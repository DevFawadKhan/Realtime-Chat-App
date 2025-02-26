import daisyui from "daisyui"
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme:{
   extend:{
    colors:{
      customdark: "black",
    }
   }
  },
  plugins: [daisyui,],
  daisyui:{
    themes:["light","dark","cupcake","retro"]
  }
};