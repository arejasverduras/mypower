/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        midnightblue: "#191970", // Custom dark blue  
        primary: '#3B82F6', // Blue
          secondary: '#22C55E', // Green
          background: "midnightblue", //'#F9FAFB', // Light gray
          text: '#1F2937', // Dark gray
          headertext: '#F9FAFB',
          accent: '#EAB308', // Yellow
          error: '#EF4444', // Red
          foreground: "var(--foreground)",
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
}