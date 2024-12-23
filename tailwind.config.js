/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/theme";

export default {
  content: {
    files: [
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#002e62",
              foreground: "#000000",
            },
          },
        },
      },
    }),
  ],
};
