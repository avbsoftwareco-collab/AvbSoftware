import { Client } from "@/lib/supabase";

export interface GymThemeColors {
  bg: string;
  bgGradient: string;
  bgSecondary: string;
  bgCard: string;
  bgGlass: string;
  primary: string;
  primaryDark: string;
  accent: string;
  accent2: string;
  text: string;
  textMuted: string;
  border: string;
  glow: string;
  cardGradient: string;
}

const THEMES: Record<string, GymThemeColors> = {
  neo_luxury: {
    bg: "#0a0a0f",
    bgGradient: "linear-gradient(135deg, #0a0a0f 0%, #1a1530 50%, #0a0a0f 100%)",
    bgSecondary: "#12121f",
    bgCard: "rgba(255,255,255,0.03)",
    bgGlass: "rgba(255,255,255,0.05)",
    primary: "#A855F7",
    primaryDark: "#7E22CE",
    accent: "#FFD700",
    accent2: "#EC4899",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(168,85,247,0.2)",
    glow: "rgba(168,85,247,0.5)",
    cardGradient: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.05))",
  },
  emerald_lux: {
    bg: "#0a1410",
    bgGradient: "linear-gradient(135deg, #0a1410 0%, #142820 50%, #0a1410 100%)",
    bgSecondary: "#0f1a14",
    bgCard: "rgba(255,255,255,0.03)",
    bgGlass: "rgba(255,255,255,0.05)",
    primary: "#10B981",
    primaryDark: "#047857",
    accent: "#FFD700",
    accent2: "#22D3EE",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(16,185,129,0.2)",
    glow: "rgba(16,185,129,0.5)",
    cardGradient: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(34,211,238,0.05))",
  },
  rose_premium: {
    bg: "#140a10",
    bgGradient: "linear-gradient(135deg, #140a10 0%, #2a1020 50%, #140a10 100%)",
    bgSecondary: "#1a0e14",
    bgCard: "rgba(255,255,255,0.03)",
    bgGlass: "rgba(255,255,255,0.05)",
    primary: "#F43F5E",
    primaryDark: "#BE123C",
    accent: "#FFD700",
    accent2: "#FB923C",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(244,63,94,0.2)",
    glow: "rgba(244,63,94,0.5)",
    cardGradient: "linear-gradient(135deg, rgba(244,63,94,0.1), rgba(251,146,60,0.05))",
  },
  cyan_dream: {
    bg: "#050a14",
    bgGradient: "linear-gradient(135deg, #050a14 0%, #0a1428 50%, #050a14 100%)",
    bgSecondary: "#0a0e1a",
    bgCard: "rgba(255,255,255,0.03)",
    bgGlass: "rgba(255,255,255,0.05)",
    primary: "#06B6D4",
    primaryDark: "#0E7490",
    accent: "#FACC15",
    accent2: "#A855F7",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(6,182,212,0.2)",
    glow: "rgba(6,182,212,0.5)",
    cardGradient: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(168,85,247,0.05))",
  },
  sunset_gold: {
    bg: "#140a05",
    bgGradient: "linear-gradient(135deg, #140a05 0%, #2a1a0a 50%, #140a05 100%)",
    bgSecondary: "#1a0e08",
    bgCard: "rgba(255,255,255,0.03)",
    bgGlass: "rgba(255,255,255,0.05)",
    primary: "#F97316",
    primaryDark: "#C2410C",
    accent: "#FACC15",
    accent2: "#EF4444",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(249,115,22,0.2)",
    glow: "rgba(249,115,22,0.5)",
    cardGradient: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(250,204,21,0.05))",
  },
};

export function useGymTheme(client: Client): GymThemeColors {
  const themeId = (client as any).gym_theme || "neo_luxury";
  return THEMES[themeId] || THEMES.neo_luxury;
}