/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Manrope'", "Inter", "system-ui", "sans-serif"],
        body: ["'Manrope'", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f5f6f7",
          100: "#e5e7eb",
          200: "#cfd2d9",
          300: "#a8afb9",
          400: "#7d8594",
          500: "#5c6673",
          600: "#49505c",
          700: "#3a4049",
          800: "#292d35",
          900: "#1a1f26",
          950: "#0d1016",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          soft: "#e5e7eb",
          glow: "#f8fafc",
        },
        carbon: {
          900: "#0a0c10",
          800: "#0f1218",
          700: "#131824",
          600: "#161c29",
        },
      },
      boxShadow: {
        "elevated": "0 20px 60px rgba(0,0,0,0.55)",
        "card": "0 16px 45px rgba(0,0,0,0.35)",
        "bordered": "0 0 0 1px rgba(255,255,255,0.04)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "24px",
      },
      backdropBlur: {
        xs: "6px",
      },
      transitionTimingFunction: {
        "soft": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      backgroundImage: {
        "lux-gradient":
          "radial-gradient(circle at 20% 20%, rgba(159,135,255,0.12), transparent 30%), radial-gradient(circle at 80% 0%, rgba(116,196,255,0.12), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.04), transparent 40%)",
      },
    },
  },
  plugins: [],
};

