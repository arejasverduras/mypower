import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue
        secondary: '#22C55E', // Green
        background: '#F9FAFB', // Light gray
        text: '#1F2937', // Dark gray
        accent: '#EAB308', // Yellow
          // background: "var(--background)",
          foreground: "var(--foreground)",
          "primary-color": "var(--primary-color)",
          "secondary-color": "var(--secondary-color)",
          midnightblue: "#191970", // Custom dark blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
