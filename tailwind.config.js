/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./assets/css/**/*.css", "./app.html"],
  safelist: ["c-page-header", "c-investment-container"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "Inter", "sans-serif"]
      },
      colors: {
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#020817",
        background: "#ffffff",
        foreground: "#020817",
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a"
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc"
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b"
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a"
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#020817"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#020817"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.625rem",
        sm: "0.5rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
