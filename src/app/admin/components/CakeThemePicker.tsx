"use client";

import { Check } from "lucide-react";

interface CakeTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    bg: string;
    primary: string;
    accent: string;
    text: string;
  };
  preview: string;
}

const CAKE_THEMES: CakeTheme[] = [
  {
    id: "emerald_noir",
    name: "Emerald Noir",
    description: "Dark green + Gold luxury",
    colors: {
      bg: "#0a1f1a",
      primary: "#D4AF37",
      accent: "#2d5446",
      text: "#f5f0e8",
    },
    preview: "🌿✨",
  },
  {
    id: "rose_gold",
    name: "Rose Gold",
    description: "Pink + Rose gold elegance",
    colors: {
      bg: "#1a0a14",
      primary: "#E8B4B8",
      accent: "#B76E79",
      text: "#fff5f0",
    },
    preview: "🌸✨",
  },
  {
    id: "midnight_blue",
    name: "Midnight Blue",
    description: "Navy + Silver sophistication",
    colors: {
      bg: "#0a1428",
      primary: "#C0C0C0",
      accent: "#1e3a5f",
      text: "#f0f4ff",
    },
    preview: "🌙✨",
  },
  {
    id: "vintage_cream",
    name: "Vintage Cream",
    description: "Cream + Caramel warmth",
    colors: {
      bg: "#f5ede0",
      primary: "#8B6F47",
      accent: "#C9A45C",
      text: "#2B2419",
    },
    preview: "🍯✨",
  },
];

interface CakeThemePickerProps {
  selected: string;
  onSelect: (themeId: string) => void;
}

export default function CakeThemePicker({ selected, onSelect }: CakeThemePickerProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#2B2419] mb-1">🎨 Cake Theme</h2>
      <p className="text-sm text-[#6B5D4A] mb-5">Choose your cake site theme</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CAKE_THEMES.map((theme) => {
          const isSelected = selected === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelect(theme.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all text-left hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? "border-[var(--theme-primary)] ring-2 ring-[#D4AF37] shadow-md"
                  : "border-[#E8DEC8] hover:border-[#D4C29E]"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1.5 shadow-md">
                  <Check className="w-4 h-4" />
                </div>
              )}

              {/* Color Preview */}
              <div
                className="w-full h-24 rounded-xl mb-3 flex items-center justify-center text-4xl relative overflow-hidden"
                style={{ backgroundColor: theme.colors.bg }}
              >
                <span style={{ color: theme.colors.primary }}>{theme.preview}</span>
                {/* Color dots */}
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: theme.colors.text }}
                  />
                </div>
              </div>

              {/* Theme Info */}
              <h3 className="font-bold text-[#2B2419] text-sm mb-1">{theme.name}</h3>
              <p className="text-xs text-[#6B5D4A]">{theme.description}</p>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-700">
          💡 <strong>Tip:</strong> Theme change after saving will reflect on the live site.
        </p>
      </div>
    </div>
  );
}