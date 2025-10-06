import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1200px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {},
  },
  plugins: [],
};
export default config;
