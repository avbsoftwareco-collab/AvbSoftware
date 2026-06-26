"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function GalleryPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rsv-show");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroImage =
    (client as any).gallery_hero_image ||
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80";

  // ═══ Gallery Images (Dynamic or default) ═══
  const images: GalleryImage[] =
    (client as any).gallery_images_detailed &&
    (client as any).gallery_images_detailed.length > 0
      ? (client as any).gallery_images_detailed
      : [
          { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", alt: "Resort View", category: "Resort" },
          { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80", alt: "Luxury Room", category: "Rooms" },
          { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80", alt: "Pool", category: "Pool" },
          { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", alt: "Villa", category: "Rooms" },
          { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Spa", category: "Spa" },
          { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", alt: "Beach", category: "Beach" },
          { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining", category: "Dining" },
          { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", alt: "Suite", category: "Rooms" },
          { src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80", alt: "Sunset", category: "Resort" },
          { src: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80", alt: "Pool Side", category: "Pool" },
          { src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", alt: "Garden", category: "Resort" },
          { src: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80", alt: "Restaurant", category: "Dining" },
        ];

  const uniqueCategories = Array.from(new Set(images.map((img) => img.category)));
  const categories: string[] = ["All", ...uniqueCategories];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  // Lightbox navigation
  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO BANNER - Mosaic Reveal
      ═══════════════════════════════════ */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: pageLoaded ? "blur(0) brightness(0.7)" : "blur(20px) brightness(0.5)",
            transition: "filter 2s ease",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative z-[4] h-full flex items-center justify-center text-center px-6">
          <div className="max-w-[1000px]">
            <div
              className="inline-flex items-center gap-3 mb-6 px-5 sm:px-6 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
              }}
            >
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "var(--theme-primary)",
                  fontWeight: 600,
                }}
              >
                ✦ Visual Journey ✦
              </span>
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 7vw, 96px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-2px",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                lineHeight: 1.05,
                marginBottom: "20px",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 1.4s ease 1.4s, transform 1.4s ease 1.4s",
              }}
            >
              Our{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Gallery
              </em>
            </h1>

            <p
              className="max-w-2xl mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                color: "#fff",
                textShadow: "0 2px 15px rgba(0,0,0,0.6)",
                opacity: pageLoaded ? 1 : 0,
                transition: "opacity 1s ease 1.6s",
              }}
            >
              A glimpse into the paradise that awaits you
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FILTER + MASONRY GRID
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-[1500px] mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 rsv-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              const count = cat === "All" ? images.length : images.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-5 sm:px-7 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[2px] transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: isActive ? "var(--theme-primary)" : "transparent",
                    color: isActive ? "var(--theme-bg)" : "var(--theme-text)",
                    border: `1.5px solid ${isActive ? "var(--theme-primary)" : "var(--theme-border)"}`,
                    boxShadow: isActive ? "0 15px 40px rgba(0,0,0,0.25)" : "none",
                  }}
                >
                  {cat}
                  <span
                    className="ml-2 px-1.5 py-0.5 rounded-full text-[8px]"
                    style={{
                      background: isActive ? "rgba(0,0,0,0.2)" : "rgba(212,175,55,0.2)",
                      color: isActive ? "var(--theme-bg)" : "var(--theme-primary)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group rsv-hide ${
                  i % 7 === 0 ? "row-span-2" : ""
                }`}
                style={{
                  aspectRatio: i % 7 === 0 ? "1/2" : "1/1",
                  transitionDelay: `${(i % 8) * 0.08}s`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-125"
                />
                {/* Gold tint on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
                    mixBlendMode: "overlay",
                  }}
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                />
                {/* Category label */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "var(--theme-primary)",
                  }}
                >
                  {img.category}
                </div>
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--theme-primary)",
                      color: "var(--theme-bg)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    }}
                  >
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(10px)" }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(10px)" }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(10px)" }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {/* Caption */}
            <div className="text-center mt-4">
              <p style={{ color: "var(--theme-primary)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600 }}>
                {filteredImages[lightboxIndex].category}
              </p>
              <p style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "16px", marginTop: "4px" }}>
                {filteredImages[lightboxIndex].alt}
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "8px" }}>
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}