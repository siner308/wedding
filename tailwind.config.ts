import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    "screens": {
      "xsm": "400px", // 2
      "sm": "550px", // 3
      "md": "700px", // 4
      "lg": "850px", // 5
    },
  },
  plugins: [],
};
export default config;
