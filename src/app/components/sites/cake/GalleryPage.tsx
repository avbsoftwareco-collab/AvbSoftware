"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function GalleryPage({ client, theme }: { client: Client; theme?: any }) {
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const colors = theme?.colors || {
    bg: "#0F1F1F",
    bgSecondary: "#162929",
    bgCard: "#1E3333",
    primary: "#D4AF37",
    accent: "#B89030",
    text: "#F0F5F0",
    textLight: "rgba(240, 245, 240, 0.6)",
    border: "rgba(212, 175, 55, 0.2)",
  };

  const heroImage = client.gallery_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const restaurantName = client.business_name || "Sweet Bites";

  // Build images list
  const images: any[] = (() => {
    if (client.gallery_images_detailed && client.gallery_images_detailed.length > 0) {
      return client.gallery_images_detailed;
    }
    if (client.gallery_images && client.gallery_images.length > 0) {
      return client.gallery_images.map((src: string, i: number) => ({
        src,
        alt: `Creation ${i + 1}`,
        category: "All",
      }));
    }
    if (client.products && client.products.length > 0) {
      return client.products
        .filter((p: any) => p.image_url)
        .map((p: any, i: number) => ({
          src: p.image_url,
          alt: p.name || `Creation ${i + 1}`,
          category: "Signature",
        }));
    }
    return [];
  })();

  // Categories
  const allCategories = ["All", ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))];

  const filteredImages = activeFilter === "all" || activeFilter === "All"
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
      const n = dir === "next"
        ? (lightboxIndex + 1) % filteredImages.length
        : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
      setLightboxIndex(n);
      setLightboxImage(filteredImages[n]);
    },
    [lightboxIndex, filteredImages]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxImage, navigateLightbox, closeLightbox]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? "next" : "prev");
    setTouchStart(null);
  };

  return (
    <div 
      className="relative overflow-x-hidden"
      style={{ 
        background: colors.bg, 
        color: colors.text, 
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO - CINEMATIC GALLERY OPENING               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
        
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4)' }}
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.bg}DD 100%)`,
        }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
          background: `linear-gradient(to top, ${colors.bg} 0%, transparent 100%)`,
        }} />

        {/* Decorative side lines */}
        <div className="absolute top-1/2 left-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />
        <div className="absolute top-1/2 right-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />

        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Top ornament */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="text-3xl sm:text-4xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <div 
                className="text-xs sm:text-sm tracking-[8px] sm:tracking-[10px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                — La Galerie —
              </div>
            </motion.div>

            {/* Huge Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-10"
              style={{ 
                fontFamily: "'Italiana', serif", 
                color: '#FFFFFF',
                letterSpacing: '-2px',
              }}
            >
              <span style={{ color: '#FFFFFF', display: 'block' }}>Visual</span>
              <span 
                className="italic"
                style={{
                  display: 'block',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Symphony
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl italic font-light max-w-2xl mx-auto mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
            >
              Where every frame tells a story of artistry, passion, and pure delight.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm tracking-[3px] uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                <span>{images.length} Captures</span>
              </div>
              <div className="w-px h-4" style={{ background: colors.primary }} />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                <span>{allCategories.length} Collections</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
        >
          <span
            className="text-[10px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
          >
            Discover
          </span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CATEGORY FILTER                                 */}
      {/* ═══════════════════════════════════════════════ */}
      {allCategories.length > 1 && (
        <section className="relative py-10 sm:py-12 border-y" style={{ background: colors.bgSecondary, borderColor: colors.border }}>
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            <FadeIn>
              <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
                {allCategories.map((cat: any, i: number) => {
                  const catId = cat;
                  const isActive = activeFilter === catId || (activeFilter === "all" && cat === "All");
                  return (
                    <motion.button
                      key={catId}
                      onClick={() => setActiveFilter(catId)}
                      whileHover={{ scale: 1.02 }}
                      className="relative px-4 sm:px-6 py-2 sm:py-3 transition-all flex items-center gap-2 sm:gap-3 group"
                    >
                      <span 
                        className="text-[10px] sm:text-xs"
                        style={{ 
                          fontFamily: "'Cinzel', serif", 
                          color: isActive ? colors.primary : colors.textLight,
                        }}
                      >
                        0{i + 1}
                      </span>

                      <span 
                        className="whitespace-nowrap transition-all"
                        style={{ 
                          fontFamily: isActive ? "'Italiana', serif" : "'Cormorant Garamond', serif",
                          fontSize: isActive ? '16px' : '14px',
                          fontStyle: isActive ? 'normal' : 'italic',
                          color: isActive ? '#FFFFFF' : colors.textLight,
                        }}
                      >
                        {cat}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="galleryFilterUnderline"
                          className="absolute bottom-0 left-1/4 right-1/4 h-px"
                          style={{ background: colors.primary }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* MASONRY GALLERY - LUXURY GRID                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-20" style={{ background: colors.bg }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Header */}
          <FadeIn className="mb-12 sm:mb-16">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                {activeFilter === "all" ? "All Captures" : activeFilter}
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                {filteredImages.length} <span className="italic" style={{ color: colors.primary }}>moments</span>
              </h2>
            </div>
          </FadeIn>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 max-w-7xl mx-auto"
            >
              {filteredImages.map((image: any, i: number) => {
                // Varied aspect ratios for masonry effect
                const aspectRatios = ["aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]"];
                const aspectClass = aspectRatios[i % aspectRatios.length];

                return (
                  <motion.div
                    key={`${activeFilter}-${i}`}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: Math.min(i * 0.05, 0.4) }}
                    onClick={() => openLightbox(image, i)}
                    className="break-inside-avoid mb-4 sm:mb-6 cursor-pointer group relative overflow-hidden"
                  >
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className={`relative ${aspectClass} overflow-hidden`}
                    >
                      {/* Image */}
                      <motion.img
                        src={image.src || image}
                        alt={image.alt || `Gallery ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        style={{ filter: 'brightness(0.85)' }}
                        loading="lazy"
                      />

                      {/* Number badge */}
                      <div 
                        className="absolute top-4 left-4 z-10 px-2 py-1 backdrop-blur-md transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                        style={{ 
                          background: `${colors.bg}99`,
                        }}
                      >
                        <span className="text-[10px] tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                          No. {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: `linear-gradient(to top, ${colors.bg}EE 0%, ${colors.bg}66 50%, ${colors.bg}33 100%)`,
                        }}
                      >
                        {/* Expand icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          className="mb-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
                          style={{ 
                            borderColor: colors.primary,
                            background: `${colors.bg}66`,
                          }}
                        >
                          <Maximize2 className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: colors.primary }} />
                        </motion.div>

                        {/* Category & Title */}
                        <div className="text-center px-4">
                          {image.category && image.category !== "All" && (
                            <div className="text-[10px] sm:text-xs tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                              {image.category}
                            </div>
                          )}
                          <div className="text-lg sm:text-xl italic" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                            {image.alt || `Capture ${i + 1}`}
                          </div>
                        </div>
                      </div>

                      {/* Gold corners on hover */}
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: colors.primary }} />
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: colors.primary }} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <FadeIn className="text-center py-16">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: colors.primary }} />
              <h3 className="text-2xl sm:text-3xl italic mb-3" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                Gallery Coming Soon
              </h3>
              <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                Beautiful moments are being captured
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* QUOTE SECTION                                   */}
      {/* ═══════════════════════════════════════════════ */}
      {filteredImages.length > 0 && (
        <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: colors.bgSecondary }}>
          
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(120px)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(120px)' }} />

          <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
            <FadeIn className="max-w-3xl mx-auto text-center">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
                className="text-[120px] sm:text-[160px] leading-[0.3] mb-8"
                style={{ fontFamily: "'Italiana', serif", color: colors.primary, opacity: 0.6 }}
              >
                &ldquo;
              </motion.div>

              <p
                className="text-2xl sm:text-3xl md:text-4xl italic font-light leading-relaxed mb-10"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                A photograph captures more than a moment—<br />
                it preserves a feeling, a flavor, a memory worth savoring.
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px" style={{ background: colors.primary }} />
                <span 
                  className="text-xs sm:text-sm tracking-[6px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  Atelier de Pâtisserie
                </span>
                <div className="w-16 h-px" style={{ background: colors.primary }} />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* SIGNATURE FOOTER                                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center max-w-2xl">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl sm:text-3xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </div>

            <p
              className="text-2xl sm:text-3xl italic font-light leading-relaxed mb-4"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>Every frame,</span>{' '}
              <span style={{ color: colors.primary }}>a masterpiece.</span>
            </p>

            <div className="mt-6">
              <div 
                className="text-2xl sm:text-3xl mb-1"
                style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
              >
                — {restaurantName}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* LIGHTBOX - LUXURY GALLERY VIEWER               */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8"
            style={{ background: `${colors.bg}F5`, backdropFilter: 'blur(30px)' }}
          >
            {/* Top bar */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between"
            >
              {/* Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xl sm:text-2xl" style={{ color: colors.primary }}>✦</span>
                <div>
                  <div className="text-base sm:text-lg italic" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {lightboxImage.alt || `Capture ${lightboxIndex + 1}`}
                  </div>
                  {lightboxImage.category && lightboxImage.category !== "All" && (
                    <div className="text-[10px] sm:text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                      {lightboxImage.category}
                    </div>
                  )}
                </div>
              </div>

              {/* Counter + Close */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span 
                  className="hidden sm:inline-block text-sm tracking-[3px]"
                  style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                >
                  {String(lightboxIndex + 1).padStart(2, '0')} <span style={{ color: colors.primary }}>/</span> {String(filteredImages.length).padStart(2, '0')}
                </span>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 sm:w-11 sm:h-11 border flex items-center justify-center backdrop-blur-md hover:bg-white hover:bg-opacity-10 transition-all"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Prev */}
            <motion.button
              whileHover={{ x: -5, scale: 1.05 }}
              onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
              className="hidden sm:flex absolute left-4 sm:left-8 z-20 w-12 h-12 sm:w-14 sm:h-14 border items-center justify-center backdrop-blur-md hover:bg-white hover:bg-opacity-10 transition-all"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Image with frame */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] max-h-[80vh]"
            >
              {/* Gold corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 z-10" style={{ borderColor: colors.primary }} />
              <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 z-10" style={{ borderColor: colors.primary }} />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 z-10" style={{ borderColor: colors.primary }} />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 z-10" style={{ borderColor: colors.primary }} />

              <img
                src={lightboxImage.src || lightboxImage}
                alt={lightboxImage.alt || `Gallery ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain block mx-auto"
              />
            </motion.div>

            {/* Next */}
            <motion.button
              whileHover={{ x: 5, scale: 1.05 }}
              onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
              className="hidden sm:flex absolute right-4 sm:right-8 z-20 w-12 h-12 sm:w-14 sm:h-14 border items-center justify-center backdrop-blur-md hover:bg-white hover:bg-opacity-10 transition-all"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            {/* Bottom counter (mobile) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="sm:hidden absolute bottom-6 left-0 right-0 z-20 text-center"
            >
              <span 
                className="text-sm tracking-[3px]"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                {String(lightboxIndex + 1).padStart(2, '0')} <span style={{ color: colors.primary }}>/</span> {String(filteredImages.length).padStart(2, '0')}
              </span>
              <div className="text-[10px] tracking-[3px] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                ← Swipe to navigate →
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}