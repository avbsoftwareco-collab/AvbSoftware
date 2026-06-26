"use client";

import { CAKE_THEMES } from "@/app/components/sites/cake/themes";
import { Check } from "lucide-react";

interface Props {
  selected: string;
  onSelect: (themeId: string) => void;
}

export default function CakeThemePicker({ selected, onSelect }: Props) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          🎨 Cake Template Theme
        </h3>
        <p className="text-sm text-[#6B5D4A]">
          Choose a premium theme for your cake website. You can change it anytime!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(CAKE_THEMES).map((theme) => {
          const isSelected = selected === theme.id;
          
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onSelect(theme.id)}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                isSelected
                  ? "border-[#8B6F47] shadow-lg ring-4 ring-[#8B6F47]/30"
                  : "border-[#E8DEC8] hover:border-[#D4C29E]"
              }`}
            >
              {/* Theme Preview */}
              <div
                className="aspect-video flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.bg} 0%, ${theme.colors.bgSecondary} 100%)`,
                }}
              >
                {/* Decorative ornament */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-center gap-2">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent)` }} />
                </div>

                {/* Center text preview */}
                <div className="text-center px-2">
                  <div className="text-3xl mb-1">{theme.preview}</div>
                  <div
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "'Italiana', serif",
                      background: `linear-gradient(135deg, ${theme.colors.text} 0%, ${theme.colors.primary} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Aa Bb
                  </div>
                </div>

                {/* Color dots at bottom */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border border-white/30" style={{ background: theme.colors.primary }} />
                  <div className="w-3 h-3 rounded-full border border-white/30" style={{ background: theme.colors.accent }} />
                  <div className="w-3 h-3 rounded-full border border-white/30" style={{ background: theme.colors.text }} />
                </div>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Theme info */}
              <div className="p-3 bg-white text-left">
                <div className="font-bold text-sm text-[#2B2419]">{theme.name}</div>
                <div className="text-xs text-[#6B5D4A] mt-0.5 line-clamp-1">{theme.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info box */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Theme automatically applies to all pages. You can change theme anytime from this panel and see the changes immediately on the live site.
        </p>
      </div>
    </div>
  );
}