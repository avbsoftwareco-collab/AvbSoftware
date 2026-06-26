"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CakeTemplate from "@/app/components/sites/cake";
import { Client } from "@/lib/supabase";

const WHATSAPP_NUMBER = "918103558368";

const DEMO_CLIENT: Client = {
  id: "demo-cake",
  business_name: "Sweet Bites",
  template: "Cake Shop",
  subdomain: "sweet-bites-demo",
  tagline: "Atelier de Pâtisserie",
  about: "Sweet Bites is Bhopal's premier luxury bakery, crafting bespoke cakes and pastries with the finest ingredients sourced from around the world.",
  about_short: "Where tradition meets artistry. Premium cakes for the discerning palate.",
  phone: "+91 8103558368",
  whatsapp: "918103558368",
  email: "hello@sweetbites.com",
  address: "MP Nagar Zone 1, Bhopal, MP",
  city: "Bhopal",
  working_hours: "Mon-Sun: 9 AM - 9 PM",
  established_year: "2010",
  year_established: "2010",
  happy_customers: "10K+",

  // Images
  hero_image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80",
  hero_image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80",
  about_hero_image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1600&q=80",
  menu_hero_image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1600&q=80",
  gallery_hero_image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=1600&q=80",
  contact_hero_image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=1600&q=80",
  about_image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
  chef_image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80",

  // Stats
  stat_1_number: "10000",
  stat_1_label: "Patrons",
  stat_2_number: "500",
  stat_2_label: "Bespoke",
  stat_3_number: "50",
  stat_3_label: "Flavors",
  stat_4_number: "4.9",
  stat_4_label: "Rating",

  // Products
  products: [
    {
      name: "Belgian Truffle",
      price: "₹1,250",
      description: "Premium Belgian chocolate with hand-crafted ganache",
      image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    },
    {
      name: "Velvet Royale",
      price: "₹1,450",
      description: "Classic red velvet crowned with mascarpone",
      image_url: "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=600&q=80",
    },
    {
      name: "Saffron Pistachio",
      price: "₹1,650",
      description: "Kashmiri saffron infused with imported pistachios",
      image_url: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80",
    },
  ],

  // Reviews
  reviews: [
    { name: "Aisha Mehta", text: "Sweet Bites transformed our wedding into a fairytale. The cake was a masterpiece.", rating: 5, role: "Bride" },
    { name: "Rohit Sharma", text: "Every order from Sweet Bites is an experience. Pure luxury in every bite.", rating: 5, role: "Patron" },
    { name: "Priya Verma", text: "The attention to detail is unmatched. Truly an atelier in the heart of Bhopal.", rating: 5, role: "Connoisseur" },
  ],

  // Gallery
  gallery_images: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    "https://images.unsplash.com/photo-1623246123320-0d6636755796?w=800&q=80",
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
    "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80",
    "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=800&q=80",
  ],

  // Opening hours
  opening_hours: [
    { days: "Monday - Friday", hours: "9:00 AM - 9:00 PM" },
    { days: "Saturday", hours: "9:00 AM - 10:00 PM" },
    { days: "Sunday", hours: "10:00 AM - 8:00 PM" },
  ],

  primary_color: "#D4AF37",
  secondary_color: "#0F1F1F",
  status: "live",
  plan_type: "starter",
  plan_price: 799,
  instagram: "https://instagram.com/sweetbites",
  facebook: "https://facebook.com/sweetbites",
};

export default function CakeDemo() {
  return (
    <>
      <style jsx global>{`
        body > header,
        body > nav,
        body > footer,
        body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
      `}</style>

      <div className="bg-gradient-to-r from-[#0F1F1F] to-[#162929] text-white py-3 px-4 sticky top-0 z-[60] shadow-lg border-b border-[var(--theme-primary)]/20">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <Link href="/templates" className="flex items-center gap-2 text-sm hover:underlinetext-[var(--theme-primary)]">
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-[#F0F5F0]/80">
              ✦ Viewing: <strong className="text-[#D4AF37]">Sweet Bites Premium</strong>
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want this Sweet Bites premium cake template")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[var(--theme-primary)] to-[#B89030] text-[#0F1F1F] px-4 py-1.5 rounded-full font-bold text-xs hover:scale-105 transition-all"
            >
              💬 Get This Template
            </a>
          </div>
        </div>
      </div>

      <CakeTemplate client={DEMO_CLIENT} />
    </>
  );
}