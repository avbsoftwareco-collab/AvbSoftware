export interface CakeTheme {
  id: string;
  name: string;
  description: string;
  preview: string; // emoji
  colors: {
    bg: string;
    bgSecondary: string;
    bgCard: string;
    primary: string;
    accent: string;
    text: string;
    textLight: string;
    border: string;
    shadow: string;
  };
}

export const CAKE_THEMES: Record<string, CakeTheme> = {
  emerald_noir: {
    id: "emerald_noir",
    name: "Emerald Noir",
    description: "Tiffany-style luxury with deep green & gold",
    preview: "💚",
    colors: {
      bg: "#0F1F1F",
      bgSecondary: "#162929",
      bgCard: "#1E3333",
      primary: "#D4AF37",
      accent: "#B89030",
      text: "#F0F5F0",
      textLight: "rgba(240, 245, 240, 0.6)",
      border: "rgba(212, 175, 55, 0.2)",
      shadow: "rgba(212, 175, 55, 0.15)",
    },
  },
  midnight_gold: {
    id: "midnight_gold",
    name: "Midnight Gold",
    description: "Classic dark with rich gold accents",
    preview: "🖤",
    colors: {
      bg: "#0A0A0F",
      bgSecondary: "#14141F",
      bgCard: "#1A1A28",
      primary: "#D4AF37",
      accent: "#B8860B",
      text: "#FFFFFF",
      textLight: "rgba(160, 160, 176, 1)",
      border: "rgba(212, 175, 55, 0.2)",
      shadow: "rgba(212, 175, 55, 0.15)",
    },
  },
  royal_velvet: {
    id: "royal_velvet",
    name: "Royal Velvet",
    description: "Deep purple with golden royalty",
    preview: "👑",
    colors: {
      bg: "#1A0F1F",
      bgSecondary: "#241729",
      bgCard: "#2E1E36",
      primary: "#C9A227",
      accent: "#8B6F1F",
      text: "#F5E6FF",
      textLight: "rgba(184, 160, 201, 1)",
      border: "rgba(201, 162, 39, 0.25)",
      shadow: "rgba(201, 162, 39, 0.2)",
    },
  },
  white_marble: {
    id: "white_marble",
    name: "White Marble",
    description: "Premium light with bronze elegance",
    preview: "🤍",
    colors: {
      bg: "#FFFFFF",
      bgSecondary: "#F8F6F2",
      bgCard: "#FAFAF7",
      primary: "#B8860B",
      accent: "#8B6914",
      text: "#1A1A1A",
      textLight: "rgba(107, 107, 107, 1)",
      border: "rgba(184, 134, 11, 0.2)",
      shadow: "rgba(184, 134, 11, 0.1)",
    },
  },
  onyx_champagne: {
    id: "onyx_champagne",
    name: "Onyx Champagne",
    description: "Black sophistication with warm champagne",
    preview: "🥂",
    colors: {
      bg: "#1C1C1C",
      bgSecondary: "#252525",
      bgCard: "#2E2E2E",
      primary: "#E5C07B",
      accent: "#C9A55B",
      text: "#FAFAFA",
      textLight: "rgba(168, 168, 168, 1)",
      border: "rgba(229, 192, 123, 0.2)",
      shadow: "rgba(229, 192, 123, 0.15)",
    },
  },
  cocoa_luxe: {
    id: "cocoa_luxe",
    name: "Cocoa Luxe",
    description: "Rich chocolate with caramel touches",
    preview: "🍫",
    colors: {
      bg: "#2C1810",
      bgSecondary: "#3D241A",
      bgCard: "#4A2D20",
      primary: "#D4A574",
      accent: "#A88454",
      text: "#FFF8F0",
      textLight: "rgba(201, 181, 160, 1)",
      border: "rgba(212, 165, 116, 0.25)",
      shadow: "rgba(212, 165, 116, 0.2)",
    },
  },
  plum_pearl: {
    id: "plum_pearl",
    name: "Plum Pearl",
    description: "Soft purple with luxurious pearl",
    preview: "💜",
    colors: {
      bg: "#1A0F2E",
      bgSecondary: "#251945",
      bgCard: "#2E2055",
      primary: "#E0B0FF",
      accent: "#B888D9",
      text: "#FAF5FF",
      textLight: "rgba(184, 168, 212, 1)",
      border: "rgba(224, 176, 255, 0.25)",
      shadow: "rgba(224, 176, 255, 0.2)",
    },
  },
  sapphire_sun: {
    id: "sapphire_sun",
    name: "Sapphire Sun",
    description: "Navy blue with golden sunshine",
    preview: "💎",
    colors: {
      bg: "#0D1B2A",
      bgSecondary: "#152740",
      bgCard: "#1B3155",
      primary: "#F4C430",
      accent: "#D4A41E",
      text: "#F0F4F8",
      textLight: "rgba(160, 176, 192, 1)",
      border: "rgba(244, 196, 48, 0.25)",
      shadow: "rgba(244, 196, 48, 0.2)",
    },
  },
};

// Helper function - get theme by ID with fallback
export function getTheme(themeId?: string, customColors?: Partial<CakeTheme['colors']>): CakeTheme {
  const theme = CAKE_THEMES[themeId || 'emerald_noir'] || CAKE_THEMES.emerald_noir;
  
  // If client has custom colors, override
  if (customColors && Object.keys(customColors).length > 0) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...customColors,
      },
    };
  }
  
  return theme;
}