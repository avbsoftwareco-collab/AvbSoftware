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
  demoComponent: string; // Component name for demo
}

export const templates: Template[] = [
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
      "Product Showcase",
      "About Us Story",
      "Gallery with Lightbox",
      "Customer Testimonials",
      "Contact Form",
      "WhatsApp Integration",
      "Google Maps",
      "Mobile Responsive",
      "SEO Optimized",
    ],
    sections: [
      "Hero with Background Image",
      "About Us",
      "Our Products",
      "Why Choose Us",
      "Gallery",
      "Testimonials",
      "Contact + Map",
      "Footer",
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
  {
    id: "cake-shop",
    slug: "cake-shop",
    name: "Sweet Bites",
    category: "Bakery & Cake",
    shortDescription: "Sweet & elegant template for bakeries and cake shops",
    description: "A delicious template for cake shops, bakeries, and dessert businesses. Beautiful menu display, online ordering, and custom cake designs showcase.",
    emoji: "🎂",
    isNew: true,
    features: [
      "Sweet Hero Section",
      "Cake Menu Display",
      "Custom Cake Designer",
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
      "Custom Orders",
      "Photo Gallery",
      "Customer Love",
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
  // NAYA TEMPLATE ADD KARNE KE LIYE:
  // Bas yaha ek aur object add karo!
  // Example:
  // ============================================
  /*
  {
    id: "restaurant-pro",
    slug: "restaurant-pro",
    name: "Restaurant Pro",
    category: "Food & Restaurant",
    ...
  },
  */
];

// Helper functions
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