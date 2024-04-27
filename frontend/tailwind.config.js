/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        avatar: "0 0 5px rgba(242, 240, 246, 0.9)",
      },
    },
  },
  plugins: [],
}

