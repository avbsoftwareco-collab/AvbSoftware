"use client";

import { Check } from "lucide-react";

export interface RestaurantTheme {
  id: string;
  name: string;
  description: string;
  category: string;
  colors: {
    bg: string;           // Main background (darkest)
    bgSecondary: string;  // Secondary bg (slightly lighter)
    bgCard: string;       // Cards/sections
    primary: string;      // Gold/accent color
    primaryDark: string;  // Darker shade of primary
    accent: string;       // Secondary accent
    text: string;         // Main text (light)
    textMuted: string;    // Muted text (60% opacity)
    border: string;       // Borders (subtle)
  };
  preview: string;
  font: string;
}

export const RESTAURANT_THEMES: RestaurantTheme[] = [
  {
    id: "dark_gold",
    name: "Dark Gold",
    description: "Classic luxury — Black & Gold elegance",
    category: "Classic",
    colors: {
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
    preview: "✨🌟",
    font: "Playfair Display",
  },
  {
    id: "wine_burgundy",
    name: "Wine Burgundy",
    description: "Sophisticated wine bar — Deep wine & Champagne",
    category: "Romantic",
    colors: {
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
    preview: "🍷🥂",
    font: "Playfair Display",
  },
  {
    id: "emerald_noir",
    name: "Emerald Noir",
    description: "Forest luxury — Dark green & Royal gold",
    category: "Nature",
    colors: {
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
    preview: "🌿✨",
    font: "Cormorant Garamond",
  },
  {
    id: "midnight_sapphire",
    name: "Midnight Sapphire",
    description: "Modern elegance — Deep navy & Platinum",
    category: "Modern",
    colors: {
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
    preview: "🌙💎",
    font: "Cinzel",
  },
  {
    id: "royal_onyx",
    name: "Royal Onyx",
    description: "Premium luxury — Pure black & Royal gold",
    category: "Premium",
    colors: {
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
    preview: "👑✨",
    font: "Cinzel",
  },
  {
    id: "velvet_rose",
    name: "Velvet Rose",
    description: "Romantic boutique — Charcoal & Rose gold",
    category: "Romantic",
    colors: {
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
    preview: "🌹💖",
    font: "Italiana",
  },
  {
    id: "cognac_brown",
    name: "Cognac Brown",
    description: "Whisky lounge — Rich brown & Copper",
    category: "Warm",
    colors: {
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
    preview: "🥃🔥",
    font: "Playfair Display",
  },
  {
    id: "platinum_ice",
    name: "Platinum Ice",
    description: "Contemporary chic — Cool grey & Silver",
    category: "Modern",
    colors: {
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
    preview: "❄️💎",
    font: "Cinzel",
  },
  {
    id: "aubergine_luxe",
    name: "Aubergine Luxe",
    description: "Royal opulence — Deep purple & Gold",
    category: "Royal",
    colors: {
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
    preview: "🍇👑",
    font: "Cinzel",
  },
  {
    id: "crimson_noir",
    name: "Crimson Noir",
    description: "Bold steakhouse — Black & Crimson red",
    category: "Bold",
    colors: {
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
    preview: "🔥❤️",
    font: "Cinzel",
  },
];

// ─── Helper Function ──────────────────────────────────
export function getRestaurantTheme(themeId: string): RestaurantTheme {
  return (
    RESTAURANT_THEMES.find((t) => t.id === themeId) || RESTAURANT_THEMES[0]
  );
}

// ─── Component Props ──────────────────────────────────
interface RestaurantThemePickerProps {
  selected: string;
  onSelect: (themeId: string) => void;
}

// ─── Main Component ──────────────────────────────────
export default function RestaurantThemePicker({
  selected,
  onSelect,
}: RestaurantThemePickerProps) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#2B2419] mb-1 flex items-center gap-2">
          🎨 Restaurant Theme
          <span className="text-xs font-normal px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
            10 Premium Themes
          </span>
        </h2>
        <p className="text-sm text-[#6B5D4A]">
          Choose your restaurant's signature color palette
        </p>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {RESTAURANT_THEMES.map((theme) => {
          const isSelected = selected === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelect(theme.id)}
              className={`relative p-3 rounded-2xl border-2 transition-all text-left hover:-translate-y-1 hover:shadow-xl ${
                isSelected
                  ? "border-[#C9A45C] ring-2 ring-[#C9A45C] shadow-lg"
                  : "border-[#E8DEC8] hover:border-[#D4C29E]"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Category Tag */}
              <div className="absolute top-2 left-2 z-10">
                <span
                  className="text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded backdrop-blur-md"
                  style={{
                    backgroundColor: `${theme.colors.primary}33`,
                    color: theme.colors.primary,
                    border: `1px solid ${theme.colors.primary}44`,
                  }}
                >
                  {theme.category}
                </span>
              </div>

              {/* Preview Box */}
              <div
                className="w-full h-28 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: theme.colors.bg }}
              >
                {/* Decorative gold lines */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)`,
                  }}
                />

                {/* Brand Preview */}
                <div className="text-center">
                  <div
                    className="text-3xl mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    {theme.preview}
                  </div>
                  <div
                    className="text-[9px] font-bold tracking-[2px] uppercase"
                    style={{ color: theme.colors.text }}
                  >
                    LUXURY
                  </div>
                  <div
                    className="h-px w-12 mx-auto my-1"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="text-[8px] tracking-[1.5px] uppercase"
                    style={{ color: theme.colors.textMuted }}
                  >
                    Est. 2024
                  </div>
                </div>

                {/* Color dots */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.text }}
                  />
                </div>
              </div>

              {/* Theme Info */}
              <h3 className="font-bold text-[#2B2419] text-sm mb-0.5 truncate">
                {theme.name}
              </h3>
              <p className="text-[10px] text-[#6B5D4A] leading-tight line-clamp-2">
                {theme.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-800">
          💡 <strong>Pro Tip:</strong> Theme applies to navbar, hero section, buttons, accents, and all key elements. Save & preview to see live changes.
        </p>
      </div>
    </div>
  );
}