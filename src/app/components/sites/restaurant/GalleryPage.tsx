"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Client } from "@/lib/supabase";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EUpload Image%3C/text%3E%3C/svg%3E";

export default function GalleryPage({ client }: { client: Client }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const restaurantName = client.business_name || "Restaurant";

  const galleryHeroImage =
    client.gallery_hero_image ||
    client.hero_image ||
    client.hero_image_url ||
    PLACEHOLDER;

  const images: any[] = (() => {
    if (
      client.gallery_images_detailed &&
      client.gallery_images_detailed.length > 0
    ) {
      return client.gallery_images_detailed;
    }
    if (client.gallery_images && client.gallery_images.length > 0) {
      return client.gallery_images.map((src: string, i: number) => ({
        src,
        alt: `${restaurantName} Gallery ${i + 1}`,
        category: "All",
      }));
    }
    if (client.products && client.products.length > 0) {
      return client.products
        .filter((p: any) => p.image_url)
        .map((p: any, i: number) => ({
          src: p.image_url,
          alt: p.name || `${restaurantName} ${i + 1}`,
          category: "Food",
        }));
    }
    return [];
  })();

  const allCategories: string[] = (() => {
    if (client.gallery_categories && client.gallery_categories.length > 0) {
      return client.gallery_categories;
    }
    const cats = new Set(images.map((img) => img.category).filter(Boolean));
    return cats.size > 1 ? ["All", ...Array.from(cats)] : ["All"];
  })();

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const openLightbox = useCallback((image: any, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (dir: "prev" | "next") => {
      if (!filteredImages.length) return;
      const n =
        dir === "next"
          ? (lightboxIndex + 1) % filteredImages.length
          : (lightboxIndex - 1 + filteredImages.length) %
            filteredImages.length;
      setLightboxIndex(n);
      setLightboxImage(filteredImages[n]);
    },
    [lightboxIndex, filteredImages]
  );

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxImage, navigateLightbox, closeLightbox]);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? "next" : "prev");
    setTouchStart(null);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-serif overflow-x-hidden">

      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM HERO - FIXED HEIGHT                        */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-16 sm:py-20">
        
        {/* Background Image with parallax */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galleryHeroImage})`, filter: "brightness(0.2)" }}
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />

        {/* Animated gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
              style={{
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 5) * 18}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Content - PROPERLY CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full"
        >
          {/* Top ornament */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-7"
          >
            <div className="h-px w-12 sm:w-20 md:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl"
            >
              ✦
            </motion.span>
            <div className="h-px w-12 sm:w-20 md:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </motion.div>

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-[#D4AF37] text-[10px] sm:text-[11px] md:text-xs tracking-[5px] sm:tracking-[7px] uppercase font-sans block mb-4 sm:mb-5"
          >
            Visual Journey
          </motion.span>

          {/* Main Title - Responsive sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[6px] sm:tracking-[10px] md:tracking-[14px] lg:tracking-[18px] m-0 leading-[0.95] bg-gradient-to-br from-[#f5f0e8] via-[#D4AF37] to-[#f5f0e8] bg-clip-text text-transparent"
          >
            GALLERY
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-[rgba(245,240,232,0.6)] font-sans text-xs sm:text-sm md:text-base mt-6 sm:mt-8 md:mt-10 max-w-xl mx-auto font-light tracking-wide leading-relaxed italic px-4"
          >
            Step inside our world — every moment, every dish, every memory captured beautifully
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 mt-8 sm:mt-10 md:mt-12"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37] leading-none mb-1.5 sm:mb-2">
                {images.length}+
              </div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase text-[rgba(245,240,232,0.5)] font-sans">
                Photos
              </div>
            </div>
            <div className="h-10 sm:h-12 w-px bg-[rgba(212,175,55,0.3)]" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37] leading-none mb-1.5 sm:mb-2">
                {allCategories.length}
              </div>
              <div className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase text-[rgba(245,240,232,0.5)] font-sans">
                Categories
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM FILTER + VIEW TOGGLE (NOT STICKY)          */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="bg-[#0f0f0f] border-y border-[rgba(212,175,55,0.15)]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6">
          
          {/* Category Filter */}
          {allCategories.length > 1 ? (
            <div className="overflow-x-auto scrollbar-none flex-1">
              <div className="flex items-center min-w-max">
                {allCategories.map((cat, idx) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    whileHover={{ y: -2 }}
                    className={`relative px-3 sm:px-4 md:px-6 lg:px-8 py-3.5 sm:py-4 md:py-5 bg-none border-none cursor-pointer whitespace-nowrap text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] uppercase font-sans flex items-center gap-1.5 sm:gap-2 transition-colors ${
                      activeFilter === cat
                        ? "text-[#D4AF37] font-semibold"
                        : "text-[rgba(245,240,232,0.5)] font-light hover:text-[rgba(245,240,232,0.8)]"
                    }`}
                  >
                    <span className={`text-[8px] hidden sm:inline ${activeFilter === cat ? "text-[#D4AF37]" : "text-[rgba(212,175,55,0.3)]"}`}>
                      0{idx + 1}
                    </span>
                    <span>{cat}</span>
                    <span className={`text-[8px] sm:text-[9px] ${activeFilter === cat ? "text-[#D4AF37]" : "text-[rgba(245,240,232,0.3)]"}`}>
                      ({cat === "All" ? images.length : images.filter(img => img.category === cat).length})
                    </span>
                    {activeFilter === cat && (
                      <motion.div
                        layoutId="galleryTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 py-4 px-2 sm:px-4">
              <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[3px] uppercase font-sans">
                {images.length} Photos
              </span>
            </div>
          )}

          {/* View Toggle Buttons */}
          <div className="hidden sm:flex items-center gap-1 border-l border-[rgba(212,175,55,0.15)] pl-2 sm:pl-4 shrink-0">
            <button
              onClick={() => setViewMode("masonry")}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all ${
                viewMode === "masonry"
                  ? "text-[#D4AF37] bg-[rgba(212,175,55,0.1)]"
                  : "text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)]"
              }`}
              title="Masonry View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="9" />
                <rect x="9" y="0" width="7" height="5" />
                <rect x="9" y="7" width="7" height="9" />
                <rect x="0" y="11" width="7" height="5" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all ${
                viewMode === "grid"
                  ? "text-[#D4AF37] bg-[rgba(212,175,55,0.1)]"
                  : "text-[rgba(245,240,232,0.4)] hover:text-[rgba(245,240,232,0.7)]"
              }`}
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" />
                <rect x="9" y="0" width="7" height="7" />
                <rect x="0" y="9" width="7" height="7" />
                <rect x="9" y="9" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/*  GALLERY CONTENT                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-3 sm:px-4 md:px-5 lg:px-6 py-8 sm:py-10 md:py-12 lg:py-16 relative">
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`max-w-[1400px] mx-auto relative z-10 ${
              viewMode === "masonry"
                ? "columns-2 md:columns-3 xl:columns-4 gap-2 sm:gap-3"
                : "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3"
            }`}
          >
            {filteredImages.map((image: any, i: number) => (
              <FadeIn key={`${activeFilter}-${i}`} delay={Math.min(i * 0.04, 0.5)}>
                <motion.div
                  onClick={() => openLightbox(image, i)}
                  whileHover={{ scale: isMobile ? 1 : 0.98 }}
                  className={`${
                    viewMode === "masonry" ? "break-inside-avoid mb-2 sm:mb-3" : "aspect-square"
                  } relative cursor-pointer overflow-hidden block group`}
                >
                  <div className="relative w-full h-full overflow-hidden bg-[#0f0f0f]">
                    
                    {/* Loading placeholder */}
                    {!loadedImages.has(i) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] animate-pulse flex items-center justify-center">
                        <span className="text-[#D4AF37] text-2xl opacity-30">✦</span>
                      </div>
                    )}

                    {/* Image */}
                    <motion.img
                      src={image.src || image}
                      alt={image.alt || `${restaurantName} Gallery`}
                      onLoad={() => handleImageLoad(i)}
                      className={`w-full ${
                        viewMode === "grid" ? "h-full object-cover" : "block"
                      } transition-all duration-700 group-hover:scale-110`}
                      style={{
                        filter: "brightness(0.85)",
                      }}
                      loading="lazy"
                    />

                    {/* Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.95)] via-[rgba(0,0,0,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-sm:opacity-100">
                      
                      {/* Top right - Number & Expand */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2">
                        <span className="text-[#D4AF37] text-[10px] sm:text-xs font-bold font-sans tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {String(i + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                        </span>
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border border-[#D4AF37] bg-[rgba(212,175,55,0.1)] backdrop-blur-sm flex items-center justify-center text-[#D4AF37] text-sm sm:text-base hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
                        >
                          ⤢
                        </motion.div>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                        <motion.div
                          className="h-px bg-gradient-to-r from-[#D4AF37] to-transparent mb-2 sm:mb-3"
                          initial={{ width: "20px" }}
                          whileHover={{ width: "60px" }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {image.category && image.category !== "All" && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase font-semibold inline-block mb-1.5 sm:mb-2 px-2 py-0.5 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)]"
                          >
                            {image.category}
                          </motion.span>
                        )}
                        
                        <h3 className="text-[#f5f0e8] font-serif text-sm sm:text-base md:text-lg font-bold leading-tight m-0 group-hover:text-[#D4AF37] transition-colors duration-300">
                          {image.alt || `Photo ${i + 1}`}
                        </h3>
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-[rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-[rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Subtle border on hover */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(212,175,55,0.3)] transition-colors duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 sm:py-24 md:py-32"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl sm:text-6xl mb-5 opacity-30"
            >
              🖼
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f5f0e8] mb-2 sm:mb-3">
              Gallery Coming Soon
            </h3>
            <p className="text-[rgba(245,240,232,0.5)] font-sans text-sm">
              We&apos;re curating beautiful moments to share with you
            </p>
          </motion.div>
        )}

        {/* Bottom Decorative Element */}
        {filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 pt-8 border-t border-[rgba(212,175,55,0.1)] max-w-md mx-auto"
          >
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="text-[#D4AF37] text-lg sm:text-xl"
            >
              ✦
            </motion.span>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </motion.div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM LIGHTBOX                                   */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 bg-[rgba(0,0,0,0.98)] backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl"
                style={{ backgroundImage: `url(${lightboxImage.src || lightboxImage})` }}
              />
            </div>

            {/* Top Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-[#D4AF37] text-2xl">✦</span>
                <div>
                  <div className="text-[#f5f0e8] font-serif text-sm sm:text-base md:text-lg font-bold">
                    {lightboxImage.alt || `Photo ${lightboxIndex + 1}`}
                  </div>
                  {lightboxImage.category && lightboxImage.category !== "All" && (
                    <div className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[2px] uppercase font-sans">
                      {lightboxImage.category}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden sm:inline-block text-[rgba(245,240,232,0.7)] font-sans text-xs sm:text-sm tracking-[2px]">
                  {String(lightboxIndex + 1).padStart(2, '0')} <span className="text-[#D4AF37]">/</span> {String(filteredImages.length).padStart(2, '0')}
                </span>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 sm:w-11 sm:h-11 border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.05)] backdrop-blur-sm text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>
            </motion.div>

            {/* Prev Button */}
            <motion.button
              whileHover={{ x: -4, scale: 1.05 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="hidden sm:flex absolute left-3 sm:left-6 md:left-8 z-20 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.3)] backdrop-blur-sm text-[#D4AF37] text-xl cursor-pointer w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 items-center justify-center hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
            >
              ←
            </motion.button>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw] max-h-[85vh] z-10"
            >
              {/* Gold frame */}
              <div className="absolute inset-0 -m-2 sm:-m-3 border border-[rgba(212,175,55,0.3)] pointer-events-none" />
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

              <img
                src={lightboxImage.src || lightboxImage}
                alt={lightboxImage.alt || `${restaurantName} Gallery`}
                className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain block mx-auto"
              />
            </motion.div>

            {/* Next Button */}
            <motion.button
              whileHover={{ x: 4, scale: 1.05 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="hidden sm:flex absolute right-3 sm:right-6 md:right-8 z-20 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.3)] backdrop-blur-sm text-[#D4AF37] text-xl cursor-pointer w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 items-center justify-center hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
            >
              →
            </motion.button>

            {/* Bottom Info Bar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent"
            >
              {/* Mobile counter */}
              <div className="sm:hidden text-center mb-3">
                <span className="text-[rgba(245,240,232,0.7)] font-sans text-xs tracking-[2px]">
                  {String(lightboxIndex + 1).padStart(2, '0')} <span className="text-[#D4AF37]">/</span> {String(filteredImages.length).padStart(2, '0')}
                </span>
              </div>

              {/* Thumbnail strip - desktop */}
              <div className="hidden md:flex items-center justify-center gap-2 overflow-x-auto max-w-3xl mx-auto">
                {filteredImages.slice(Math.max(0, lightboxIndex - 4), lightboxIndex + 5).map((img: any, idx: number) => {
                  const actualIdx = Math.max(0, lightboxIndex - 4) + idx;
                  return (
                    <button
                      key={actualIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(actualIdx);
                        setLightboxImage(filteredImages[actualIdx]);
                      }}
                      className={`shrink-0 transition-all ${
                        actualIdx === lightboxIndex
                          ? "w-16 h-16 border-2 border-[#D4AF37]"
                          : "w-12 h-12 border border-[rgba(212,175,55,0.3)] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img.src || img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Mobile swipe hint */}
              <div className="md:hidden text-center mt-2">
                <span className="text-[rgba(212,175,55,0.5)] font-sans text-[9px] tracking-[2px] uppercase">
                  ← Swipe to navigate →
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}