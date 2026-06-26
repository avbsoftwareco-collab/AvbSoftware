"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Star, Heart } from "lucide-react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23FFF5F8'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

export default function MenuPage({ client }: { client: Client }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const menuHeroImage = client.menu_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const restaurantName = client.business_name || "Sweet Bites";
  const currency = client.currency_symbol || "₹";

  const categories: any[] = (() => {
    if (client.menu_categories && client.menu_categories.length > 0) {
      return client.menu_categories;
    }
    if (client.products && client.products.length > 0) {
      return [
        {
          id: "all",
          name: "All Cakes",
          subtitle: "Our complete collection",
          items: client.products.map((p: any) => ({
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image_url,
            tags: [],
          })),
        },
      ];
    }
    return [];
  })();

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0].name);
    }
  }, [categories, activeCategory]);

  const currentCategory = categories.find((c: any) => (c.id || c.name) === activeCategory);
  const filteredItems = (currentCategory?.items || []).filter((item: any) =>
    !searchQuery || item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FFF5F8] text-[#5C2837]">
      {/* HERO */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={menuHeroImage} alt="Menu" className="w-full h-full object-cover" style={{ filter: "brightness(0.5)" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-4">
          <span className="text-[#FFD0DC] text-xs tracking-[3px] uppercase font-bold block mb-3">— {restaurantName} —</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our <span className="italic text-[#FFD0DC]">Menu</span>
          </h1>
        </motion.div>
      </section>

      {/* TABS */}
      {categories.length > 0 && (
        <div className="bg-white border-b border-[#FFD0DC]">
          <div className="container mx-auto px-4 overflow-x-auto">
            <div className="flex justify-start md:justify-center min-w-max gap-1">
              {categories.map((cat: any) => {
                const catId = cat.id || cat.name;
                return (
                  <button
                    key={catId}
                    onClick={() => setActiveCategory(catId)}
                    className={`px-6 py-5 text-sm font-bold transition-all relative ${
                      activeCategory === catId
                        ? "text-[#E91E63]"
                        : "text-[#7A4B5C] hover:text-[#E91E63]"
                    }`}
                  >
                    {cat.name}
                    {activeCategory === catId && (
                      <motion.div layoutId="cakeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E91E63] to-[#C9A45C] rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E91E63]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cakes..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#FFD0DC] rounded-full focus:border-[#E91E63] outline-none text-sm"
          />
        </div>
      </div>

      {/* ITEMS */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              {currentCategory?.subtitle && (
                <p className="text-center text-[#E91E63] italic mb-10 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentCategory.subtitle}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#FFD0DC] hover:border-[#E91E63] hover:shadow-2xl hover:shadow-pink-100 transition-all group"
                  >
                    {(item.image || item.image_url) && (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={item.image || item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {item.featured && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#E91E63] to-[#C9A45C] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white" /> Bestseller
                          </div>
                        )}
                        {item.price && (
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-sm text-[#E91E63] shadow-lg">
                            {String(item.price).includes(currency) ? item.price : `${currency}${item.price}`}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-[#7A4B5C] leading-relaxed mb-3">{item.description}</p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag: string, j: number) => (
                            <span key={j} className="text-[10px] bg-[#FFF5F8] text-[#E91E63] px-2 py-1 rounded-full font-semibold uppercase tracking-wider border border-[#FFD0DC]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-50">🎂</div>
                  <p className="text-[#7A4B5C]">No cakes found</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}