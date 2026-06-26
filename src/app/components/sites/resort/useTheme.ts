import { Client } from "@/lib/supabase";

export interface ResortThemeColors {
  bg: string;
  bg2: string;
  bgCard: string;
  primary: string;
  primaryDark: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  mode: "dark" | "light";
}

const THEMES: Record<string, ResortThemeColors> = {
  // ═══ 5 DARK THEMES ═══
  royal_onyx: {
    bg: "#000000", bg2: "#0a0a0a", bgCard: "#141414",
    primary: "#D4AF37", primaryDark: "#8B6914", accent: "#1a1a1a",
    text: "#ffffff", textMuted: "rgba(255,255,255,0.6)",
    border: "rgba(212,175,55,0.18)", mode: "dark",
  },
  ocean_sapphire: {
    bg: "#050a18", bg2: "#081124", bgCard: "#0d1a35",
    primary: "#E8C9A0", primaryDark: "#A88958", accent: "#14264d",
    text: "#f0f4ff", textMuted: "rgba(240,244,255,0.65)",
    border: "rgba(232,201,160,0.18)", mode: "dark",
  },
  emerald_forest: {
    bg: "#06120e", bg2: "#0a1a14", bgCard: "#102620",
    primary: "#C9A87C", primaryDark: "#8B6F4F", accent: "#1a3329",
    text: "#f0fff5", textMuted: "rgba(240,255,245,0.6)",
    border: "rgba(201,168,124,0.18)", mode: "dark",
  },
  midnight_burgundy: {
    bg: "#150508", bg2: "#1f070d", bgCard: "#2a0d13",
    primary: "#E8B4B8", primaryDark: "#B76E79", accent: "#3d1018",
    text: "#fff5f0", textMuted: "rgba(255,245,240,0.65)",
    border: "rgba(232,180,184,0.18)", mode: "dark",
  },
  desert_obsidian: {
    bg: "#0a0808", bg2: "#120d0a", bgCard: "#1c1410",
    primary: "#E8B563", primaryDark: "#A67C36", accent: "#2d1f15",
    text: "#fff4e8", textMuted: "rgba(255,244,232,0.65)",
    border: "rgba(232,181,99,0.18)", mode: "dark",
  },

  // ═══ 5 LIGHT THEMES ═══
  ivory_pearl: {
    bg: "#faf7f2", bg2: "#f3ede2", bgCard: "#ffffff",
    primary: "#B8924A", primaryDark: "#8B6914", accent: "#f8f0dd",
    text: "#1a1a1a", textMuted: "rgba(26,26,26,0.65)",
    border: "rgba(184,146,74,0.25)", mode: "light",
  },
  champagne_rose: {
    bg: "#fdf6f0", bg2: "#f9ebe0", bgCard: "#ffffff",
    primary: "#B76E79", primaryDark: "#8B4A5A", accent: "#fce8ec",
    text: "#2a1a1f", textMuted: "rgba(42,26,31,0.65)",
    border: "rgba(183,110,121,0.25)", mode: "light",
  },
  coastal_mint: {
    bg: "#f4f9f7", bg2: "#e8f1ee", bgCard: "#ffffff",
    primary: "#2C7A6B", primaryDark: "#1a5246", accent: "#d9ebe5",
    text: "#0d2620", textMuted: "rgba(13,38,32,0.65)",
    border: "rgba(44,122,107,0.25)", mode: "light",
  },
  sandstone_luxe: {
    bg: "#f7f3ec", bg2: "#ede4d3", bgCard: "#ffffff",
    primary: "#A67843", primaryDark: "#7A5530", accent: "#f0e4d0",
    text: "#2a1f15", textMuted: "rgba(42,31,21,0.65)",
    border: "rgba(166,120,67,0.25)", mode: "light",
  },
  azure_sky: {
    bg: "#f3f8fc", bg2: "#e4eff8", bgCard: "#ffffff",
    primary: "#1E5B8C", primaryDark: "#0F3D60", accent: "#d4e6f4",
    text: "#0a1f30", textMuted: "rgba(10,31,48,0.65)",
    border: "rgba(30,91,140,0.25)", mode: "light",
  },
};

export function useResortTheme(client: Client): ResortThemeColors {
  const themeId = (client as any).resort_theme || "royal_onyx";
  return THEMES[themeId] || THEMES.royal_onyx;
}

export function getThemeCSSVars(client: Client): React.CSSProperties {
  const theme = useResortTheme(client);
  return {
    "--theme-bg": theme.bg,
    "--theme-bg-2": theme.bg2,
    "--theme-bg-card": theme.bgCard,
    "--theme-primary": theme.primary,
    "--theme-primary-dark": theme.primaryDark,
    "--theme-accent": theme.accent,
    "--theme-text": theme.text,
    "--theme-text-muted": theme.textMuted,
    "--theme-border": theme.border,
  } as React.CSSProperties;
}

export function getThemeMode(client: Client): "dark" | "light" {
  return useResortTheme(client).mode;
}