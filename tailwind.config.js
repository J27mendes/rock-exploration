/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      foreground: "hsl(var(--foreground))",
      background: "hsl(var(--background))",
      card: "hsl(var(--card))",
      "card-foreground": "hsl(var(--card-foreground))",
      popover: "hsl(var(--popover))",
      "popover-foreground": "hsl(var(--popover-foreground))",
      primary: "hsl(var(--primary))",
      "primary-blue": "hsl(var(--primary-blue))",
      "primary-green": "hsl(var(--primary-green))",
      "primary-red": "hsl(var(--primary-red))",
      "primary-foreground": "hsl(var(--primary-foreground))",
      secondary: "hsl(var(--secondary))",
      "secondary-foreground": "hsl(var(--secondary-foreground))",
      muted: "hsl(var(--muted))",
      "muted-foreground": "hsl(var(--muted-foreground))",
      accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))",
      destructive: "hsl(var(--destructive))",
      "destructive-foreground": "hsl(var(--destructive-foreground))",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      // Charts (opcional)
      "chart-1": "hsl(var(--chart-1))",
      "chart-2": "hsl(var(--chart-2))",
      "chart-3": "hsl(var(--chart-3))",
      "chart-4": "hsl(var(--chart-4))",
      "chart-5": "hsl(var(--chart-5))",
    },
    borderRadius: {
      DEFAULT: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      lg: "calc(var(--radius) + 2px)",
    },
    backgroundImage: {
      "hero-image": "var(--image)",
    },
  },

  plugins: [],
}
