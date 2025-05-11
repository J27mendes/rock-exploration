/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    borderRadius: {
      DEFAULT: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      lg: "calc(var(--radius) + 2px)",
    },
    backgroundImage: {
      "hero-image": "var(--image)",
    },
    extends: {
      colors: {
        destructive: "hsl(var(--destructive))",
      },
    },
    keyframes: {
      flash: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.2" },
      },
      pulseStrong: {
        "0%, 100%": { transform: "scale(1)", opacity: "1" },
        "50%": { transform: "scale(1.1)", opacity: "0.7" },
      },
      scrollStarWars: {
        "0%": {
          transform: "rotateX(25deg) translateY(100%)",
        },
        "100%": {
          transform: "rotateX(25deg) translateY(-300%)",
        },
      },
    },
    animation: {
      flash: "flash 2s infinite",
      pulseStrong: "pulseStrong 3s ease-in-out infinite",
      scrollStarWars: "scrollStarWars 90s linear infinite",
    },
  },
  plugins: [],
}
