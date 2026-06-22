"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Client } from "@/lib/supabase";

const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23111'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EFood Photo%3C/text%3E%3C/svg%3E";

export default function MenuPage({ client }: { client: Client }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const restaurantName = client.business_name || "Restaurant";
  const currency = client.currency_symbol || "₹";

  const menuHeroImage =
    client.menu_hero_image ||
    client.hero_image ||
    client.hero_image_url ||
    PLACEHOLDER;

  // Menu categories with fallback to products
  const categories: any[] = (() => {
    if (client.menu_categories && client.menu_categories.length > 0) {
      return client.menu_categories;
    }
    if (client.products && client.products.length > 0) {
      return [
        {
          id: "menu",
          name: "Our Menu",
          subtitle: "Handcrafted with love",
          items: client.products.map((p: any) => ({
            name: p.name || "",
            description: p.description || "",
            price: p.price || "",
            image: p.image_url || "",
            tags: [],
            featured: false,
          })),
        },
      ];
    }
    return [];
  })();

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0].name || "0");
    }
  }, [categories, activeCategory]);

  const currentCategory = categories.find(
    (c: any) => (c.id || c.name) === activeCategory
  );

  const filteredItems = (currentCategory?.items || []).filter((item: any) =>
    searchQuery === ""
      ? true
      : item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allergenNote =
    client.allergen_note ||
    "Please inform your server of any dietary requirements or allergies. All prices inclusive of taxes.";

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-serif overflow-x-hidden">
      
      {/* ════════════════════════════════════════════════════ */}
      {/*  HERO                                               */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${menuHeroImage})`,
            filter: "brightness(0.25) saturate(0.5)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">
            {restaurantName}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] m-0 bg-gradient-to-br from-[#f5f0e8] to-[#D4AF37] bg-clip-text text-transparent">
            MENU
          </h1>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM CATEGORY TABS                              */}
      {/* ════════════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <div className="bg-[#0f0f0f] border-b border-[rgba(212,175,55,0.15)] sticky top-0 z-[100] backdrop-blur-md">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex justify-start md:justify-center min-w-max px-2 sm:px-4 md:px-0">
              {categories.map((cat: any, idx: number) => {
                const catId = cat.id || cat.name;
                return (
                  <motion.button
                    key={catId}
                    onClick={() => setActiveCategory(catId)}
                    whileHover={{ y: -2 }}
                    className={`px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 bg-none border-none cursor-pointer relative whitespace-nowrap transition-all duration-300 text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-sans flex items-center gap-2 ${
                      activeCategory === catId
                        ? "text-[#D4AF37] font-semibold"
                        : "text-[rgba(245,240,232,0.5)] font-light hover:text-[rgba(245,240,232,0.8)]"
                    }`}
                  >
                    <span className={`hidden sm:inline-block text-[8px] ${activeCategory === catId ? "text-[#D4AF37]" : "text-[rgba(212,175,55,0.3)]"}`}>
                      0{idx + 1}
                    </span>
                    {cat.name}
                    {activeCategory === catId && (
                      <motion.div
                        layoutId="menuTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  SEARCH BAR - PREMIUM                               */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="px-4 sm:px-6 md:px-[5%] pt-8 sm:pt-10 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[500px] mx-auto relative"
        >
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full bg-[#0f0f0f] border border-[rgba(212,175,55,0.2)] text-[#f5f0e8] pl-12 sm:pl-14 pr-4 sm:pr-5 py-3.5 sm:py-4 font-sans text-xs sm:text-sm outline-none focus:border-[#D4AF37] transition-all placeholder:text-[rgba(245,240,232,0.3)] tracking-wider"
            />
            <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#D4AF37] text-base sm:text-lg">
              ⌕
            </span>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[rgba(245,240,232,0.5)] hover:text-[#D4AF37] text-sm transition-colors"
              >
                ✕
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/*  MENU ITEMS - PREMIUM DISPLAY                       */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-10 sm:py-14 md:py-16 lg:py-20 min-h-[60vh] relative overflow-hidden">
        
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* ═══════════════════════════════════════════════ */}
            {/*  PREMIUM CATEGORY HEADER                       */}
            {/* ═══════════════════════════════════════════════ */}
            <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 relative">
              
              {/* Animated decorative ornament */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-7"
              >
                <div className="h-px w-16 sm:w-20 md:w-28 lg:w-32 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-[#D4AF37]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <span className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl">✦</span>
                </motion.div>
                <div className="h-px w-16 sm:w-20 md:w-28 lg:w-32 bg-gradient-to-l from-transparent via-[rgba(212,175,55,0.4)] to-[#D4AF37]" />
              </motion.div>

              {/* Category Number Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 py-1.5 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)] rounded-full"
              >
                <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-semibold">
                  Chapter {categories.findIndex((c: any) => (c.id || c.name) === activeCategory) + 1}
                </span>
              </motion.div>

              {/* Main Title with Gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold m-0 mb-3 sm:mb-4 leading-[1.05] tracking-tight"
              >
                <span className="bg-gradient-to-br from-[#f5f0e8] via-[#D4AF37] to-[#f5f0e8] bg-clip-text text-transparent">
                  {currentCategory?.name || "Menu"}
                </span>
              </motion.h2>

              {/* Subtitle with style */}
              {currentCategory?.subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  className="flex items-center justify-center gap-3 sm:gap-4"
                >
                  <span className="text-[rgba(212,175,55,0.4)] text-xs sm:text-sm">—</span>
                  <p className="text-[#D4AF37] font-serif italic text-base sm:text-lg md:text-xl font-light m-0 tracking-wide">
                    {currentCategory.subtitle}
                  </p>
                  <span className="text-[rgba(212,175,55,0.4)] text-xs sm:text-sm">—</span>
                </motion.div>
              )}

              {/* Items count badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-5 sm:mt-6 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase text-[rgba(245,240,232,0.4)] font-sans"
              >
                {filteredItems.length} {filteredItems.length === 1 ? "Item" : "Items"} 
                {searchQuery && ` matching "${searchQuery}"`}
              </motion.div>
            </div>

            {/* ═══════════════════════════════════════════════ */}
            {/*  EMPTY STATE - Premium                         */}
            {/* ═══════════════════════════════════════════════ */}
            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 sm:py-20 md:py-24"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl sm:text-6xl mb-4 sm:mb-6 opacity-30"
                >
                  🍽
                </motion.div>
                <p className="text-[rgba(245,240,232,0.5)] font-sans text-sm sm:text-base mb-2">
                  {searchQuery
                    ? `No items found for "${searchQuery}"`
                    : "No items in this category yet"}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#D4AF37] text-xs sm:text-sm tracking-wider uppercase hover:underline mt-2"
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════════ */}
            {/*  PREMIUM ITEMS GRID                            */}
            {/* ═══════════════════════════════════════════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-[1300px] mx-auto">
              {filteredItems.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ y: -4 }}
                  className="relative group cursor-pointer"
                >
                  {/* Gold glow on hover */}
                  <motion.div
                    animate={{ opacity: hoveredItem === i ? 1 : 0 }}
                    className="absolute -inset-px bg-gradient-to-br from-[#D4AF37] via-transparent to-[#D4AF37] opacity-0 blur-xl"
                  />

                  <div className="relative bg-gradient-to-br from-[#0f0f0f] via-[#0d0d0d] to-[#0a0a0a] border border-[rgba(212,175,55,0.15)] overflow-hidden group-hover:border-[rgba(212,175,55,0.4)] transition-all duration-500">
                    
                    {/* Top gold accent line on hover */}
                    <motion.div
                      className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                      initial={{ width: "0%" }}
                      animate={{ width: hoveredItem === i ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex flex-col sm:flex-row">
                      
                      {/* ═══ FOOD PHOTO ═══ */}
                      {(item.image || item.image_url) && (
                        <div className="relative overflow-hidden w-full sm:w-40 md:w-44 lg:w-[200px] h-52 sm:h-auto shrink-0">
                          <motion.div
                            animate={{ scale: hoveredItem === i ? 1.15 : 1 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full sm:h-[220px] bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${item.image || item.image_url})`,
                              filter: "brightness(0.85)",
                            }}
                          />
                          
                          {/* Dark gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(15,15,15,0.3)]" />
                          
                          {/* Featured Badge */}
                          {item.featured && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-3 sm:top-4 left-3 sm:left-4"
                            >
                              <div className="bg-gradient-to-r from-[#D4AF37] to-[#f5c842] text-[#0a0a0a] text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[2.5px] uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 font-sans font-bold shadow-lg flex items-center gap-1">
                                <span>★</span>
                                <span>Chef's Special</span>
                              </div>
                            </motion.div>
                          )}

                          {/* Item Number */}
                          <div className="absolute bottom-3 right-3 text-3xl sm:text-4xl font-bold text-white/20 font-sans leading-none">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      )}

                      {/* ═══ DETAILS ═══ */}
                      <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                        
                        <div>
                          {/* Name + Price Row */}
                          <div className="flex justify-between items-start gap-4 mb-3 sm:mb-4">
                            <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-[#f5f0e8] m-0 leading-tight font-serif tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300">
                              {item.name}
                            </h3>
                            {item.price && (
                              <div className="flex flex-col items-end shrink-0">
                                <span className="text-[#D4AF37] text-xl sm:text-2xl md:text-[26px] font-bold font-sans leading-none whitespace-nowrap">
                                  {String(item.price).includes(currency)
                                    ? item.price
                                    : `${currency}${item.price}`}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Animated Gold Divider */}
                          <motion.div
                            className="h-px bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.4)] to-transparent mb-3 sm:mb-4"
                            initial={{ width: "30px" }}
                            animate={{ width: hoveredItem === i ? "100%" : "30px" }}
                            transition={{ duration: 0.5 }}
                          />

                          {/* Description */}
                          {item.description && (
                            <p className="text-[rgba(245,240,232,0.65)] font-sans text-xs sm:text-[13px] md:text-sm leading-[1.7] sm:leading-[1.8] m-0 mb-4 sm:mb-5 font-light">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                            {item.tags.map((tag: string, j: number) => (
                              <motion.span
                                key={j}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: j * 0.05 }}
                                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.25)] text-[#D4AF37] text-[8px] sm:text-[9px] md:text-[10px] tracking-[1.5px] sm:tracking-[2px] uppercase font-sans font-medium"
                              >
                                <span className="text-[6px] sm:text-[7px]">●</span>
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 border-t border-r border-[rgba(212,175,55,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-10 sm:h-10 border-b border-l border-[rgba(212,175,55,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Decorative Element */}
            {filteredItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1 }}
                className="flex items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20"
              >
                <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.3)]" />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-[#D4AF37] text-xl sm:text-2xl"
                >
                  ✦
                </motion.span>
                <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.3)]" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  ALLERGEN NOTE - PREMIUM                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-10 sm:py-12 md:py-14 lg:py-16 bg-[#0f0f0f] border-t border-[rgba(212,175,55,0.12)]">
        <FadeIn className="max-w-[700px] mx-auto text-center">
          <div className="text-[#D4AF37] text-xl sm:text-2xl mb-3 sm:mb-4">ℹ</div>
          <p className="text-[rgba(245,240,232,0.5)] font-sans text-[11px] sm:text-xs md:text-[13px] tracking-[0.5px] sm:tracking-[1px] leading-[1.7] sm:leading-[1.8] italic">
            {allergenNote}
          </p>
        </FadeIn>
      </section>
    </div>
  );
}