"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, ArrowRight } from "lucide-react";
import { Client } from "@/lib/supabase";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

interface Props {
  client: Client;
}

export default function GalleryPage({ client }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Collect all images
  const allImages = [
    ...(client.hero_image_url ? [client.hero_image_url] : []),
    ...(client.logo_url ? [client.logo_url] : []),
    ...(client.products?.map(p => p.image_url).filter(Boolean) as string[] || []),
    ...(client.gallery_images || []),
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setLightboxIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div>

      {/* ═══════════════════════════════════════════════
          PAGE HEADER
          ═══════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          {client.hero_image_url ? (
            <>
              <img src={client.hero_image_url} alt={client.business_name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0a0502]/80"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0502] to-[#3D2817]"></div>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Gallery</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Photo <span className="italic text-[#C9A45C]">Gallery</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              A glimpse into our world of premium products and craftsmanship
            </p>
            <div className="flex items-center justify-center gap-2 mt-8 text-white/50 text-sm">
              <Camera className="w-4 h-4 text-[#C9A45C]" />
              {allImages.length} Photos
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY GRID
          ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          {allImages.length === 0 ? (
            <FadeIn className="text-center py-20">
              <div className="text-8xl mb-6">📸</div>
              <h3 className="text-3xl font-bold text-[#0a0502] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Coming Soon
              </h3>
              <p className="text-[#6B5D4A]">Photos will be added shortly</p>
            </FadeIn>
          ) : (
            <>
              {/* Featured Image (First Image - Large) */}
              {allImages.length > 0 && (
                <FadeIn className="mb-8">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-3xl cursor-pointer group aspect-[21/9] max-h-[500px]"
                    onClick={() => openLightbox(0)}
                  >
                    <img
                      src={allImages[0]}
                      alt="Featured"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Photo</p>
                        <p className="text-sm text-white/60">Click to view</p>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </FadeIn>
              )}

              {/* Grid of remaining images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allImages.slice(1).map((img, i) => (
                  <ScaleIn key={i} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="relative overflow-hidden rounded-2xl cursor-pointer group aspect-square"
                      onClick={() => openLightbox(i + 1)}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${i + 2}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#0a0502]/0 group-hover:bg-[#0a0502]/40 transition-all duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                          <ArrowRight className="w-6 h-6 text-[#0a0502]" />
                        </div>
                      </div>

                      {/* Image Number */}
                      <div className="absolute bottom-3 right-3 bg-[#0a0502]/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        {i + 2} / {allImages.length}
                      </div>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>

              {/* Image Count */}
              <FadeIn className="text-center mt-12">
                <p className="text-[#C9A45C] text-sm font-semibold">
                  {allImages.length} photos in our gallery
                </p>
              </FadeIn>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LIGHTBOX
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0502]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[lightboxIndex]}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-medium z-20">
              {lightboxIndex + 1} / {allImages.length}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      i === lightboxIndex ? "border-[#C9A45C] scale-110" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}