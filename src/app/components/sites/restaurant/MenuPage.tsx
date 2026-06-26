"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Client } from "@/lib/supabase";
import { useRestaurantTheme } from "./useTheme";

const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div initial={{ opacity: 0, ...d[direction] }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23111'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EFood Photo%3C/text%3E%3C/svg%3E";

export default function MenuPage({ client }: { client: Client }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🎨 Get theme
  const theme = useRestaurantTheme(client);

  const restaurantName = client.business_name || "Restaurant";
  const currency = client.currency_symbol || "₹";

  const menuHeroImage = client.menu_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;

  const categories: any[] = (() => {
    if (client.menu_categories && client.menu_categories.length > 0) return client.menu_categories;
    if (client.products && client.products.length > 0) {
      return [{
        id: "menu",
        name: "Our Menu",
        subtitle: "Handcrafted with love",
        items: client.products.map((p: any) => ({
          name: p.name || "", description: p.description || "", price: p.price || "",
          image: p.image_url || "", tags: [], featured: false,
        })),
      }];
    }
    return [];
  })();

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0].name || "0");
    }
  }, [categories, activeCategory]);

  const currentCategory = categories.find((c: any) => (c.id || c.name) === activeCategory);
  const filteredItems = (currentCategory?.items || []).filter((item: any) =>
    searchQuery === "" ? true : item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allergenNote = client.allergen_note || "Please inform your server of any dietary requirements or allergies. All prices inclusive of taxes.";

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text }} className="font-serif overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${menuHeroImage})`, filter: "brightness(0.25) saturate(0.5)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${theme.primary}10, transparent)` }} />

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center px-4">
          <span className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5" style={{ color: theme.primary }}>{restaurantName}</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] m-0 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.text}, ${theme.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            MENU
          </h1>
        </motion.div>
      </section>

      {/* CATEGORY TABS */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-[100] backdrop-blur-md" style={{ backgroundColor: `${theme.bgSecondary}f2`, borderBottom: `1px solid ${theme.primary}26` }}>
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex justify-start md:justify-center min-w-max px-2 sm:px-4 md:px-0">
              {categories.map((cat: any, idx: number) => {
                const catId = cat.id || cat.name;
                return (
                  <motion.button key={catId} onClick={() => setActiveCategory(catId)} whileHover={{ y: -2 }} className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 bg-none border-none cursor-pointer relative whitespace-nowrap transition-all duration-300 text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-sans flex items-center gap-2" style={{ color: activeCategory === catId ? theme.primary : theme.textMuted, fontWeight: activeCategory === catId ? 600 : 300 }}>
                    <span className="hidden sm:inline-block text-[8px]" style={{ color: activeCategory === catId ? theme.primary : `${theme.primary}4d` }}>0{idx + 1}</span>
                    {cat.name}
                    {activeCategory === catId && (
                      <motion.div layoutId="menuTab" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)` }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="px-4 sm:px-6 md:px-[5%] pt-8 sm:pt-10 md:pt-12" style={{ backgroundColor: theme.bg }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-[500px] mx-auto relative">
          <div className="relative group">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search dishes, ingredients..." className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 font-sans text-xs sm:text-sm outline-none transition-all tracking-wider" style={{ backgroundColor: theme.bgSecondary, border: `1px solid ${theme.primary}33`, color: theme.text }} />
            <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-base sm:text-lg" style={{ color: theme.primary }}>⌕</span>
            {searchQuery && (
              <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} onClick={() => setSearchQuery("")} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-sm transition-colors" style={{ color: theme.textMuted }}>✕</motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* MENU ITEMS */}
      <section className="px-4 sm:px-6 md:px-[5%] py-10 sm:py-14 md:py-16 lg:py-20 min-h-[60vh] relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, ${theme.primary} 1px, transparent 1px)`, backgroundSize: "30px 30px" }} />

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="relative z-10">
            <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 relative">
              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-7">
                <div className="h-px w-16 sm:w-20 md:w-28 lg:w-32" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}66, ${theme.primary})` }} />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative">
                  <span className="text-2xl sm:text-3xl md:text-4xl" style={{ color: theme.primary }}>✦</span>
                </motion.div>
                <div className="h-px w-16 sm:w-20 md:w-28 lg:w-32" style={{ background: `linear-gradient(to left, transparent, ${theme.primary}66, ${theme.primary})` }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: `${theme.primary}14`, border: `1px solid ${theme.primary}33` }}>
                <span className="text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-semibold" style={{ color: theme.primary }}>
                  Chapter {categories.findIndex((c: any) => (c.id || c.name) === activeCategory) + 1}
                </span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold m-0 mb-3 sm:mb-4 leading-[1.05] tracking-tight">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.text}, ${theme.primary}, ${theme.text})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {currentCategory?.name || "Menu"}
                </span>
              </motion.h2>

              {currentCategory?.subtitle && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="flex items-center justify-center gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm" style={{ color: `${theme.primary}66` }}>—</span>
                  <p className="font-serif italic text-base sm:text-lg md:text-xl font-light m-0 tracking-wide" style={{ color: theme.primary }}>{currentCategory.subtitle}</p>
                  <span className="text-xs sm:text-sm" style={{ color: `${theme.primary}66` }}>—</span>
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-5 sm:mt-6 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans" style={{ color: theme.textMuted }}>
                {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"} {searchQuery && ` matching "${searchQuery}"`}
              </motion.div>
            </div>

            {filteredItems.length === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 sm:py-20 md:py-24">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl sm:text-6xl mb-4 sm:mb-6 opacity-30">🍽</motion.div>
                <p className="font-sans text-sm sm:text-base mb-2" style={{ color: theme.textMuted }}>
                  {searchQuery ? `No items found for "${searchQuery}"` : "No items in this category yet"}
                </p>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-xs sm:text-sm tracking-wider uppercase hover:underline mt-2" style={{ color: theme.primary }}>Clear Search</button>
                )}
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-[1300px] mx-auto">
              {filteredItems.map((item: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.6 }} onMouseEnter={() => setHoveredItem(i)} onMouseLeave={() => setHoveredItem(null)} whileHover={{ y: -4 }} className="relative group cursor-pointer">
                  <motion.div animate={{ opacity: hoveredItem === i ? 1 : 0 }} className="absolute -inset-px opacity-0 blur-xl" style={{ background: `linear-gradient(to bottom right, ${theme.primary}, transparent, ${theme.primary})` }} />

                  <div className="relative overflow-hidden transition-all duration-500" style={{ background: `linear-gradient(to bottom right, ${theme.bgCard}, ${theme.bgSecondary}, ${theme.bg})`, border: `1px solid ${hoveredItem === i ? `${theme.primary}66` : `${theme.primary}26`}` }}>
                    <motion.div className="absolute top-0 left-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)` }} initial={{ width: "0%" }} animate={{ width: hoveredItem === i ? "100%" : "0%" }} transition={{ duration: 0.5 }} />

                    <div className="flex flex-col sm:flex-row">
                      {(item.image || item.image_url) && (
                        <div className="relative overflow-hidden w-full sm:w-40 md:w-44 lg:w-[200px] h-52 sm:h-auto shrink-0">
                          <motion.div animate={{ scale: hoveredItem === i ? 1.15 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full h-full sm:h-[220px] bg-cover bg-center" style={{ backgroundImage: `url(${item.image || item.image_url})`, filter: "brightness(0.85)" }} />
                          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${theme.bgCard}4d)` }} />
                          {item.featured && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-3 sm:top-4 left-3 sm:left-4">
                              <div className="text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[2.5px] uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 font-sans font-bold shadow-lg flex items-center gap-1" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.accent})`, color: theme.bg }}>
                                <span>★</span><span>Chef&apos;s Special</span>
                              </div>
                            </motion.div>
                          )}
                          <div className="absolute bottom-3 right-3 text-3xl sm:text-4xl font-bold font-sans leading-none" style={{ color: `${theme.text}33` }}>
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      )}

                      <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-3 sm:mb-4">
                            <h3 className="text-lg sm:text-xl md:text-[22px] font-bold m-0 leading-tight font-serif tracking-wide transition-colors duration-300" style={{ color: theme.text }}>{item.name}</h3>
                            {item.price && (
                              <div className="flex flex-col items-end shrink-0">
                                <span className="text-xl sm:text-2xl md:text-[26px] font-bold font-sans leading-none whitespace-nowrap" style={{ color: theme.primary }}>
                                  {String(item.price).includes(currency) ? item.price : `${currency}${item.price}`}
                                </span>
                              </div>
                            )}
                          </div>

                          <motion.div className="h-px mb-3 sm:mb-4" style={{ background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}66, transparent)` }} initial={{ width: "30px" }} animate={{ width: hoveredItem === i ? "100%" : "30px" }} transition={{ duration: 0.5 }} />

                          {item.description && (
                            <p className="font-sans text-xs sm:text-[13px] md:text-sm leading-[1.7] sm:leading-[1.8] m-0 mb-4 sm:mb-5 font-light" style={{ color: theme.textMuted }}>{item.description}</p>
                          )}
                        </div>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                            {item.tags.map((tag: string, j: number) => (
                              <motion.span key={j} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.05 }} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[8px] sm:text-[9px] md:text-[10px] tracking-[1.5px] sm:tracking-[2px] uppercase font-sans font-medium" style={{ backgroundColor: `${theme.primary}14`, border: `1px solid ${theme.primary}40`, color: theme.primary }}>
                                <span className="text-[6px] sm:text-[7px]">●</span>{tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderTop: `1px solid ${theme.primary}33`, borderRight: `1px solid ${theme.primary}33` }} />
                    <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderBottom: `1px solid ${theme.primary}33`, borderLeft: `1px solid ${theme.primary}33` }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredItems.length > 0 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1 }} className="flex items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20">
                <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${theme.primary}4d)` }} />
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-xl sm:text-2xl" style={{ color: theme.primary }}>✦</motion.span>
                <div className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${theme.primary}4d)` }} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ALLERGEN NOTE */}
      <section className="px-4 sm:px-6 md:px-[5%] py-10 sm:py-12 md:py-14 lg:py-16" style={{ backgroundColor: theme.bgSecondary, borderTop: `1px solid ${theme.primary}1f` }}>
        <FadeIn className="max-w-[700px] mx-auto text-center">
          <div className="text-xl sm:text-2xl mb-3 sm:mb-4" style={{ color: theme.primary }}>ℹ</div>
          <p className="font-sans text-[11px] sm:text-xs md:text-[13px] tracking-[0.5px] sm:tracking-[1px] leading-[1.7] sm:leading-[1.8] italic" style={{ color: theme.textMuted }}>
            {allergenNote}
          </p>
        </FadeIn>
      </section>
    </div>
  );
}