export interface Template {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  emoji: string;
  bestseller?: boolean;
  isNew?: boolean;
  features: string[];
  sections: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  pricing: {
    monthly: number;
    yearly: number;
  };
  deliveryTime: string;
  demoBusinessName: string;
  demoComponent: string;
}

export const templates: Template[] = [
  // ============================================
  // TIMBER PRO - Wood & Hardware
  // ============================================
  {
    id: "timber-pro",
    slug: "timber-pro",
    name: "Timber Pro",
    category: "Wood & Furniture",
    shortDescription: "Premium template for timber, plywood & furniture businesses",
    description: "A beautifully crafted template for timber, plywood, doors, and furniture businesses. Showcase your products, build trust with customers, and grow your business online.",
    emoji: "🪵",
    bestseller: true,
    features: [
      "Premium Hero Section",
      "Multi-Page Website (5 Pages)",
      "Product Showcase with Images",
      "About Us Story",
      "Photo Gallery with Lightbox",
      "Customer Testimonials",
      "WhatsApp Integration",
      "Google Maps",
      "Mobile Responsive",
      "SEO Optimized",
    ],
    sections: [
      "Home Page",
      "About Us Page",
      "Products Page",
      "Photo Gallery Page",
      "Contact Page",
    ],
    colors: {
      primary: "#6B4423",
      secondary: "#8B6F47",
      accent: "#C9A45C",
    },
    pricing: {
      monthly: 799,
      yearly: 7999,
    },
    deliveryTime: "3-5 Days",
    demoBusinessName: "Krishna Timber",
    demoComponent: "TimberDemo",
  },

  // ============================================
  // SWEET BITES - Bakery & Cake
  // ============================================
  {
    id: "cake-shop",
    slug: "cake-shop",
    name: "Sweet Bites",
    category: "Bakery & Cake",
    shortDescription: "Sweet & elegant template for bakeries and cake shops",
    description: "A delicious template for cake shops, bakeries, and dessert businesses. Beautiful menu display, online ordering, and custom cake designs showcase.",
    emoji: "🎂",
    features: [
      "Sweet Hero Section",
      "Cake Menu Display",
      "Custom Cake Orders",
      "Photo Gallery",
      "Customer Reviews",
      "Online Order via WhatsApp",
      "Contact + Map",
      "Special Offers Section",
      "Mobile Responsive",
      "SEO Optimized",
    ],
    sections: [
      "Hero with Cake Imagery",
      "About Bakery",
      "Cake Menu",
      "Photo Gallery",
      "Customer Reviews",
      "Contact + Order",
      "Footer",
    ],
    colors: {
      primary: "#D4647C",
      secondary: "#E8A4B4",
      accent: "#F8D8E0",
    },
    pricing: {
      monthly: 799,
      yearly: 7999,
    },
    deliveryTime: "3-5 Days",
    demoBusinessName: "Sweet Bites Bakery",
    demoComponent: "CakeDemo",
  },

  // ============================================
  // RESTAURANT PRO - Restaurant, Bar, Cafe, Pub
  // ============================================
  {
    id: "restaurant-pro",
    slug: "restaurant-pro",
    name: "Restaurant Pro",
    category: "Food & Restaurant",
    shortDescription: "Dark luxury template for restaurants, bars, cafes and pubs",
    description: "A premium dark-themed template perfect for restaurants, bars, cafes, lounges and pubs. Features elegant gold accents, menu display, reservation system, and stunning food photography showcase.",
    emoji: "🍽️",
    isNew: true,
    features: [
      "Dark Luxury Design",
      "Multi-Page Website (5 Pages)",
      "Menu with Categories & Prices",
      "Food Photo Gallery",
      "Reservation via WhatsApp",
      "Customer Reviews",
      "Special Offers Section",
      "WhatsApp Integration",
      "Google Maps",
      "Mobile Responsive",
    ],
    sections: [
      "Home Page",
      "About Page",
      "Menu Page",
      "Photo Gallery Page",
      "Contact & Reservation Page",
    ],
    colors: {
      primary: "#D4AF37",
      secondary: "#8B0000",
      accent: "#1a1a2e",
    },
    pricing: {
      monthly: 799,
      yearly: 7999,
    },
    deliveryTime: "3-5 Days",
    demoBusinessName: "The Golden Fork",
    demoComponent: "RestaurantDemo",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === "All") return templates;
  return templates.filter((t) => t.category === category);
}

export function getAllCategories(): string[] {
  const categories = templates.map((t) => t.category);
  return ["All", ...Array.from(new Set(categories))];
}