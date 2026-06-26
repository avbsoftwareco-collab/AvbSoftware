"use client";

import { Check } from "lucide-react";

export interface ResortTheme {
  id: string;
  name: string;
  description: string;
  category: string;
  mode: "dark" | "light";
  colors: {
    bg: string;
    bgSecondary: string;
    primary: string;
    accent: string;
    text: string;
    textMuted: string;
  };
  preview: string;
}

export const RESORT_THEMES: ResortTheme[] = [
  // ═══ 5 DARK THEMES ═══
  {
    id: "royal_onyx",
    name: "Royal Onyx",
    description: "Pure black & royal gold",
    category: "Dark",
    mode: "dark",
    colors: {
      bg: "#000000",
      bgSecondary: "#0a0a0a",
      primary: "#D4AF37",
      accent: "#1a1a1a",
      text: "#ffffff",
      textMuted: "rgba(255,255,255,0.6)",
    },
    preview: "👑✨",
  },
  {
    id: "ocean_sapphire",
    name: "Ocean Sapphire",
    description: "Deep navy & champagne",
    category: "Dark",
    mode: "dark",
    colors: {
      bg: "#050a18",
      bgSecondary: "#081124",
      primary: "#E8C9A0",
      accent: "#14264d",
      text: "#f0f4ff",
      textMuted: "rgba(240,244,255,0.65)",
    },
    preview: "🌊💎",
  },
  {
    id: "emerald_forest",
    name: "Emerald Forest",
    description: "Dark green & bronze",
    category: "Dark",
    mode: "dark",
    colors: {
      bg: "#06120e",
      bgSecondary: "#0a1a14",
      primary: "#C9A87C",
      accent: "#1a3329",
      text: "#f0fff5",
      textMuted: "rgba(240,255,245,0.6)",
    },
    preview: "🌿🍂",
  },
  {
    id: "midnight_burgundy",
    name: "Midnight Burgundy",
    description: "Wine & rose",
    category: "Dark",
    mode: "dark",
    colors: {
      bg: "#150508",
      bgSecondary: "#1f070d",
      primary: "#E8B4B8",
      accent: "#3d1018",
      text: "#fff5f0",
      textMuted: "rgba(255,245,240,0.65)",
    },
    preview: "🍷🌹",
  },
  {
    id: "desert_obsidian",
    name: "Desert Obsidian",
    description: "Black & amber",
    category: "Dark",
    mode: "dark",
    colors: {
      bg: "#0a0808",
      bgSecondary: "#120d0a",
      primary: "#E8B563",
      accent: "#2d1f15",
      text: "#fff4e8",
      textMuted: "rgba(255,244,232,0.65)",
    },
    preview: "🏜️🔥",
  },
  // ═══ 5 LIGHT THEMES ═══
  {
    id: "ivory_pearl",
    name: "Ivory Pearl",
    description: "Cream & gold",
    category: "Light",
    mode: "light",
    colors: {
      bg: "#faf7f2",
      bgSecondary: "#f3ede2",
      primary: "#B8924A",
      accent: "#f8f0dd",
      text: "#1a1a1a",
      textMuted: "rgba(26,26,26,0.65)",
    },
    preview: "☁️✨",
  },
  {
    id: "champagne_rose",
    name: "Champagne Rose",
    description: "Soft pink & rose gold",
    category: "Light",
    mode: "light",
    colors: {
      bg: "#fdf6f0",
      bgSecondary: "#f9ebe0",
      primary: "#B76E79",
      accent: "#fce8ec",
      text: "#2a1a1f",
      textMuted: "rgba(42,26,31,0.65)",
    },
    preview: "🌸💕",
  },
  {
    id: "coastal_mint",
    name: "Coastal Mint",
    description: "White & teal",
    category: "Light",
    mode: "light",
    colors: {
      bg: "#f4f9f7",
      bgSecondary: "#e8f1ee",
      primary: "#2C7A6B",
      accent: "#d9ebe5",
      text: "#0d2620",
      textMuted: "rgba(13,38,32,0.65)",
    },
    preview: "🌴🌊",
  },
  {
    id: "sandstone_luxe",
    name: "Sandstone Luxe",
    description: "Beige & bronze",
    category: "Light",
    mode: "light",
    colors: {
      bg: "#f7f3ec",
      bgSecondary: "#ede4d3",
      primary: "#A67843",
      accent: "#f0e4d0",
      text: "#2a1f15",
      textMuted: "rgba(42,31,21,0.65)",
    },
    preview: "🏖️🥂",
  },
  {
    id: "azure_sky",
    name: "Azure Sky",
    description: "White & deep blue",
    category: "Light",
    mode: "light",
    colors: {
      bg: "#f3f8fc",
      bgSecondary: "#e4eff8",
      primary: "#1E5B8C",
      accent: "#d4e6f4",
      text: "#0a1f30",
      textMuted: "rgba(10,31,48,0.65)",
    },
    preview: "☀️🌤️",
  },
];

export function getResortTheme(themeId: string): ResortTheme {
  return RESORT_THEMES.find((t) => t.id === themeId) || RESORT_THEMES[0];
}

interface Props {
  selected: string;
  onSelect: (themeId: string) => void;
}

export default function ResortThemePicker({ selected, onSelect }: Props) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#2B2419] mb-1 flex items-center gap-2">
          🏝️ Resort Theme
          <span className="text-xs font-normal px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
            10 Luxury Themes
          </span>
        </h2>
        <p className="text-sm text-[#6B5D4A]">
          Choose your resort&apos;s signature palette — 5 Dark + 5 Light
        </p>
      </div>

      {/* DARK Themes */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] mb-3">
          🌙 Dark Themes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {RESORT_THEMES.filter((t) => t.mode === "dark").map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={selected === theme.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      {/* LIGHT Themes */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6F47] mb-3">
          ☀️ Light Themes
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {RESORT_THEMES.filter((t) => t.mode === "light").map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={selected === theme.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800">
          💡 <strong>Pro Tip:</strong> Theme applies to navbar, hero, buttons, cards & all luxury elements throughout the website.
        </p>
      </div>
    </div>
  );
}

function ThemeCard({
  theme,
  isSelected,
  onSelect,
}: {
  theme: ResortTheme;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(theme.id)}
      className={`relative p-3 rounded-2xl border-2 transition-all text-left hover:-translate-y-1 hover:shadow-xl ${
        isSelected
          ? "border-[#C9A45C] ring-2 ring-[#C9A45C] shadow-lg"
          : "border-[#E8DEC8] hover:border-[#D4C29E]"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md z-10">
          <Check className="w-3.5 h-3.5" />
        </div>
      )}

      {/* Preview Box */}
      <div
        className="w-full h-24 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: theme.colors.bg }}
      >
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

        <div className="text-center">
          <div className="text-2xl mb-1" style={{ color: theme.colors.primary }}>
            {theme.preview}
          </div>
          <div
            className="text-[8px] font-bold tracking-[2px] uppercase"
            style={{ color: theme.colors.text }}
          >
            RESORT
          </div>
        </div>

        <div className="absolute bottom-1.5 right-1.5 flex gap-1">
          <div
            className="w-2.5 h-2.5 rounded-full border border-white/20"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full border border-white/20"
            style={{ backgroundColor: theme.colors.accent }}
          />
        </div>
      </div>

      <h3 className="font-bold text-[#2B2419] text-xs mb-0.5 truncate">
        {theme.name}
      </h3>
      <p className="text-[9px] text-[#6B5D4A] leading-tight line-clamp-2">
        {theme.description}
      </p>
    </button>
  );
}