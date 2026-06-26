import { Client } from "@/lib/supabase";

export interface RestaurantThemeColors {
  bg: string;
  bgSecondary: string;
  bgCard: string;
  primary: string;
  primaryDark: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
}

const THEMES: Record<string, RestaurantThemeColors> = {
  dark_gold: {
    bg: "#0a0a0a",
    bgSecondary: "#0f0f0f",
    bgCard: "#111111",
    primary: "#D4AF37",
    primaryDark: "#8B6914",
    accent: "#c9a227",
    text: "#f5f0e8",
    textMuted: "rgba(245,240,232,0.7)",
    border: "rgba(212,175,55,0.15)",
  },
  wine_burgundy: {
    bg: "#1a0510",
    bgSecondary: "#220815",
    bgCard: "#2a0a18",
    primary: "#E8C39E",
    primaryDark: "#A67C52",
    accent: "#722F37",
    text: "#fff5f0",
    textMuted: "rgba(255,245,240,0.7)",
    border: "rgba(232,195,158,0.15)",
  },
  emerald_noir: {
    bg: "#0a1f1a",
    bgSecondary: "#0d2620",
    bgCard: "#102d26",
    primary: "#D4AF37",
    primaryDark: "#8B6914",
    accent: "#2d5446",
    text: "#f5f0e8",
    textMuted: "rgba(245,240,232,0.7)",
    border: "rgba(212,175,55,0.15)",
  },
  midnight_sapphire: {
    bg: "#0a1428",
    bgSecondary: "#0d1830",
    bgCard: "#101e3a",
    primary: "#E5E4E2",
    primaryDark: "#A8A9AD",
    accent: "#1e3a5f",
    text: "#f0f4ff",
    textMuted: "rgba(240,244,255,0.7)",
    border: "rgba(229,228,226,0.15)",
  },
  royal_onyx: {
    bg: "#000000",
    bgSecondary: "#0a0a0a",
    bgCard: "#141414",
    primary: "#FFD700",
    primaryDark: "#B8860B",
    accent: "#FFA500",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.7)",
    border: "rgba(255,215,0,0.15)",
  },
  velvet_rose: {
    bg: "#1a1418",
    bgSecondary: "#211a1f",
    bgCard: "#2a2026",
    primary: "#E8B4B8",
    primaryDark: "#B76E79",
    accent: "#3d3036",
    text: "#fff5f0",
    textMuted: "rgba(255,245,240,0.7)",
    border: "rgba(232,180,184,0.15)",
  },
  cognac_brown: {
    bg: "#1f1410",
    bgSecondary: "#251812",
    bgCard: "#2e1d16",
    primary: "#B87333",
    primaryDark: "#8B5A2B",
    accent: "#704214",
    text: "#fff0e0",
    textMuted: "rgba(255,240,224,0.7)",
    border: "rgba(184,115,51,0.15)",
  },
  platinum_ice: {
    bg: "#1a1a1d",
    bgSecondary: "#202024",
    bgCard: "#26262b",
    primary: "#C0C0C0",
    primaryDark: "#808080",
    accent: "#4a4a52",
    text: "#f5f5f7",
    textMuted: "rgba(245,245,247,0.7)",
    border: "rgba(192,192,192,0.15)",
  },
  aubergine_luxe: {
    bg: "#1a0a1f",
    bgSecondary: "#220d28",
    bgCard: "#2a1031",
    primary: "#FFD700",
    primaryDark: "#B8860B",
    accent: "#4B0082",
    text: "#fff5f0",
    textMuted: "rgba(255,245,240,0.7)",
    border: "rgba(255,215,0,0.15)",
  },
  crimson_noir: {
    bg: "#0a0a0a",
    bgSecondary: "#100808",
    bgCard: "#1a0a0a",
    primary: "#DC143C",
    primaryDark: "#8B0000",
    accent: "#B22222",
    text: "#fff0f0",
    textMuted: "rgba(255,240,240,0.7)",
    border: "rgba(220,20,60,0.15)",
  },
};

/**
 * Get theme colors for restaurant
 * @param client - Client object from database
 * @returns RestaurantThemeColors
 */
export function useRestaurantTheme(client: Client): RestaurantThemeColors {
  const themeId = client.restaurant_theme || "dark_gold";
  return THEMES[themeId] || THEMES.dark_gold;
}

/**
 * Get CSS variables for theme
 * Use in style prop for dynamic theming
 */
export function getThemeCSSVars(client: Client): React.CSSProperties {
  const theme = useRestaurantTheme(client);
  return {
    "--theme-bg": theme.bg,
    "--theme-bg-secondary": theme.bgSecondary,
    "--theme-bg-card": theme.bgCard,
    "--theme-primary": theme.primary,
    "--theme-primary-dark": theme.primaryDark,
    "--theme-accent": theme.accent,
    "--theme-text": theme.text,
    "--theme-text-muted": theme.textMuted,
    "--theme-border": theme.border,
  } as React.CSSProperties;
}