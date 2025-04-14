/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{blade.php,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { opacity: 0, transform: "scaleY(0)" },
          to: { opacity: 1, transform: "scaleY(1)" },
        },
        "accordion-up": {
          from: { opacity: 1, transform: "scaleY(1)" },
          to: { opacity: 0, transform: "scaleY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
