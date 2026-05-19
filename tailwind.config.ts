// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         jakarta: ["var(--font-jakarta)", "sans-serif"],
//         inter: ["var(--font-inter)", "sans-serif"],
//       },
//       colors: {
//         primary: {
//           DEFAULT: "#3B82F6",
//           dark: "#2563EB",
//           light: "#60A5FA",
//         },
//         navy: "#0F172A",
//         muted: "#64748B",
//         surface: "#F8FAFC",
//       },
//       animation: {
//         "fade-in": "fadeIn 0.6s ease-out forwards",
//         "pulse-slow": "pulseSlow 6s ease-in-out infinite",
//         "bounce-slow": "bounceSlow 1.5s ease-in-out infinite",
//       },
//       keyframes: {
//         fadeIn: {
//           "0%": { opacity: "0", transform: "translateY(20px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         pulseSlow: {
//           "0%, 100%": { opacity: "0.5" },
//           "50%": { opacity: "0.8" },
//         },
//         bounceSlow: {
//           "0%, 100%": { transform: "translateY(0)" },
//           "50%": { transform: "translateY(6px)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;


import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      
      colors: {
        // 🤍 Backgrounds
        bg: {
          DEFAULT: "#FFFFFF",
          subtle: "#FAFAFA",
          muted: "#F8FAFC",
        },
        // 💜 Primary — Vibrant Indigo
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#818CF8",
        },
        // 🩷 Pink Secondary
        secondary: {
          DEFAULT: "#EC4899",
          dark: "#DB2777",
        },
        // 🔥 Orange Accent
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        // 💎 Teal
        teal: {
          DEFAULT: "#14B8A6",
        },
        // 📝 Text
        text: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#94A3B8",
        },
        border: {
          DEFAULT: "#E2E8F0",
          subtle: "#F1F5F9",
        },
      },
    },
  },
  plugins: [],
};

export default config;