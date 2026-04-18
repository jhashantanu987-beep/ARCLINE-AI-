import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "float-3d": "float3d 6s ease-in-out infinite",
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'incoming-call': 'incoming-call 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'typing': 'typing 1s infinite alternate',
        'wave-1': 'wave 0.5s ease-in-out infinite alternate',
        'wave-2': 'wave 0.6s ease-in-out infinite alternate',
        'wave-3': 'wave 0.7s ease-in-out infinite alternate',
        'wave-4': 'wave 0.8s ease-in-out infinite alternate',
        'wave-5': 'wave 0.9s ease-in-out infinite alternate',
      },
      keyframes: {
        float3d: {
          "0%, 100%": { transform: "translateY(0) rotateY(-15deg) rotateX(5deg)" },
          "50%": { transform: "translateY(-20px) rotateY(-10deg) rotateX(10deg)" },
        },
        'pulse-slow': {
            '0%, 100%': { opacity: "1" },
            '50%': { opacity: "0.5" }
        },
        'incoming-call': {
            '0%': { transform: 'scale(0.9)', opacity: '0.7' },
            '50%': { transform: 'scale(1)', opacity: '1' },
            '100%': { transform: 'scale(0.9)', opacity: '0.7' }
        },
        'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'typing': {
            '0%': { opacity: '0.3' },
            '100%': { opacity: '1' }
        },
        'wave': {
            '0%': { height: '8px' },
            '100%': { height: '24px' }
        }
      },
      colors: {
        arcline: {
          blue: "#0066cc",
          dark: "#151515",
          light: "#f5f5f7",
          white: "#ffffff",
        },
        primary: "#0066cc",
        "on-primary": "#ffffff",
        surface: "#ffffff",
        "surface-container": "#f5f5f7",
        "on-surface": "#151515",
        "on-surface-variant": "#4a4a4a",
        outline: "#e5e5ea",
      },
      fontFamily: {
        headline: ["var(--font-noto-serif)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
    },
  },
  plugins: [],
};
export default config;
