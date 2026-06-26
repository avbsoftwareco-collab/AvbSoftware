"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { getThemeMode } from "./useTheme";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function HomePage({ client, setPage }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);
  const mode = getThemeMode(client);

  // ═══ Dynamic Hero Slides (from admin) ═══
  const heroSlides: string[] =
    (client as any).hero_slides && (client as any).hero_slides.length > 0
      ? (client as any).hero_slides
      : [
          client.hero_image_url || (client as any).hero_image,
          (client as any).about_image,
          (client as any).gallery_hero_image,
          (client as any).menu_hero_image,
        ].filter(Boolean);

  const finalSlides =
    heroSlides.length > 0
      ? heroSlides
      : [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80",
          "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80",
        ];

  const heroVideo = (client as any).hero_video_url;

  // ═══ Stats ═══
  const stats = [
    {
      num: (client as any).stat_1_number || "150",
      suffix: "+",
      label: (client as any).stat_1_label || "Luxury Rooms",
    },
    {
      num: (client as any).stat_2_number || "25",
      suffix: "+",
      label: (client as any).stat_2_label || "Years Heritage",
    },
    {
      num: (client as any).stat_3_number || "50K",
      suffix: "+",
      label: (client as any).stat_3_label || "Happy Guests",
    },
    {
      num: (client as any).stat_4_number || "4.9★",
      suffix: "",
      label: (client as any).stat_4_label || "Guest Rating",
    },
  ];

  // ═══ Page Load Trigger ═══
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ═══ Auto slideshow ═══
  useEffect(() => {
    if (finalSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % finalSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [finalSlides.length]);

  // ═══ Scroll reveal ═══
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rsv-show");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Split name for hero
  const nameParts = (client.business_name || "Whispering Palms").split(" ");
  const mainName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const accentName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const subTitle = (client as any).hero_subtitle || "";

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO — Cinematic with Video/Image
      ═══════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: "kenburns 20s ease-in-out infinite" }}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            finalSlides.map((slide, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-[2000ms]"
                style={{
                  backgroundImage: `url(${slide})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: i === currentSlide ? 1 : 0,
                  animation:
                    i === currentSlide
                      ? "kenburns 12s ease-in-out infinite"
                      : "none",
                }}
              />
            ))
          )}
        </div>

        {/* Initial Curtain Reveal */}
       <div
  className="absolute top-0 bottom-0 left-0 z-[5] pointer-events-none transition-all duration-[1800ms]"
  style={{
    width: "50%",
    background: "var(--theme-bg)",
    transform: pageLoaded ? "translateX(-100%)" : "translateX(0)",
    transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
  }}
/>

{/* Right Curtain */}
<div
  className="absolute top-0 bottom-0 right-0 z-[5] pointer-events-none transition-all duration-[1800ms]"
  style={{
    width: "50%",
    background: "var(--theme-bg)",
    transform: pageLoaded ? "translateX(100%)" : "translateX(0)",
    transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
  }}
/>

        {/* Layer 1 - Smooth gradient (top to bottom) */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `linear-gradient(180deg, 
              rgba(0,0,0,0.4) 0%, 
              rgba(0,0,0,0.15) 35%, 
              rgba(0,0,0,0.25) 65%, 
              rgba(0,0,0,0.55) 100%)`,
          }}
        />

        {/* Layer 2 - Center vignette for text readability */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(0,0,0,0.45) 0%, 
              rgba(0,0,0,0.25) 40%, 
              transparent 80%)`,
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: "var(--theme-primary)",
                left: `${Math.random() * 100}%`,
                bottom: "-10px",
                opacity: 0.6,
                animation: `floatUp ${10 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 15}s`,
              }}
            />
          ))}
        </div>

        {/* Slide Indicators */}
        {finalSlides.length > 1 && !heroVideo && (
          <div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[4] flex gap-3"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transition: "opacity 1s ease 1.8s",
            }}
          >
            {finalSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === currentSlide ? "40px" : "20px",
                  background:
                    i === currentSlide
                      ? "var(--theme-primary)"
                      : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-[4] h-full flex items-center justify-center text-center px-6 sm:px-8">
          <div className="max-w-[1100px] w-full">
            {/* Top Tag */}
            <div
              className="inline-flex items-center gap-2 sm:gap-4 mb-5 sm:mb-7 px-4 sm:px-6 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 1.6s, transform 1s ease 1.6s",
              }}
            >
              {/* <div
                className="hidden sm:block h-px w-8 sm:w-16"
                style={{ background: "var(--theme-primary)" }}
              /> */}
                {/* <span
                className="text-[9px] sm:text-[11px]"
                style={{
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--theme-primary)",
                  fontWeight: 600,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                 ✦ {(client as any).hero_tag || "Tropical Luxury · Since 1999"} ✦ 
              </span>  */}
              <div
                className="hidden sm:block h-px w-8 sm:w-16"
                style={{ background: "var(--theme-primary)" }}
              />
            </div>

          
            {/* Main Title - White + Gold Mix */}
<h1
  className="leading-[1.05] mb-4 sm:mb-6"
  style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(32px, 6vw, 88px)",
    fontWeight: 700,
    letterSpacing: "-1.5px",
    color: "#ffffff",
    textShadow: `
      0 2px 20px rgba(0,0,0,0.8),
      0 4px 40px rgba(0,0,0,0.6),
      0 8px 80px rgba(0,0,0,0.4)
    `,
    opacity: pageLoaded ? 1 : 0,
    transform: pageLoaded ? "translateY(0)" : "translateY(60px)",
    transition: "opacity 1.4s ease 1.8s, transform 1.4s ease 1.8s",
  }}
>
  {mainName}
  {accentName && (
    <span
      className="block"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 500,
        color: "var(--theme-primary)",
        fontSize: "0.7em",
        marginTop: "8px",
        letterSpacing: "1px",
        textShadow: `
          0 2px 20px rgba(0,0,0,0.7),
          0 4px 40px rgba(0,0,0,0.5),
          0 0 40px rgba(0,0,0,0.3)
        `,
      }}
    >
      {accentName}
    </span>
  )}
  {subTitle && (
    <span
      className="block"
      style={{
        fontSize: "clamp(10px, 0.28em, 14px)",
        fontWeight: 400,
        letterSpacing: "5px",
        textTransform: "uppercase",
        marginTop: "14px",
        fontFamily: "'Inter', sans-serif",
        color: "rgba(255,255,255,0.75)",
        textShadow: "0 2px 15px rgba(0,0,0,0.6)",
      }}
    >
      {subTitle}
    </span>
  )}
</h1>

            {/* Tagline */}
            <p
              className="mb-3 px-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(15px, 2.2vw, 26px)",
                fontWeight: 400,
                letterSpacing: "0.5px",
                color: "#ffffff",
                textShadow:
                  "0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.5)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 2.2s, transform 1s ease 2.2s",
              }}
            >
              {client.tagline || "Where Nature Whispers and Luxury Listens"}
            </p>

            {/* Location - GOLD! */}
            {client.city && (
              <p
                className="mb-8 sm:mb-12"
                style={{
                  fontSize: "clamp(10px, 1.2vw, 12px)",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "var(--theme-primary)",
                  fontWeight: 600,
                  textShadow: "0 2px 15px rgba(0,0,0,0.6)",
                  opacity: pageLoaded ? 1 : 0,
                  transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 1s ease 2.4s, transform 1s ease 2.4s",
                }}
              >
                📍 {client.city} · India
              </p>
            )}

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center px-4 sm:px-0"
              style={{
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 2.6s, transform 1s ease 2.6s",
              }}
            >
              <button
                onClick={() => setPage("rooms")}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold uppercase text-[10px] sm:text-xs transition-all hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group"
                style={{
                  background: "var(--theme-primary)",
                  color: "var(--theme-bg)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  letterSpacing: "2.5px",
                }}
              >
                <span className="relative z-10">Explore Rooms</span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, white, transparent)",
                  }}
                />
              </button>
              <button
                onClick={() => setPage("contact")}
                className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold uppercase text-[10px] sm:text-xs transition-all hover:-translate-y-1 text-white backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  letterSpacing: "2.5px",
                }}
              >
                Book Your Escape
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[5]"
          style={{
            color: "var(--theme-primary)",
            fontSize: "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: 600,
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            animation: "bounce 2s infinite",
            opacity: pageLoaded ? 1 : 0,
            transition: "opacity 1s ease 3s",
          }}
        >
          ↓ Scroll to Discover
        </div>
      </section>

      {/* ═══════════════════════════════════
          STATS WITH PARALLAX BG
      ═══════════════════════════════════ */}
      <section
        className="relative py-20 sm:py-24 px-5"
        style={{
          backgroundImage: `url(${
            (client as any).stats_bg_image ||
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80"
          })`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              mode === "dark" ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rsv-hide px-3 sm:px-5"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(36px, 6vw, 80px)",
                  fontWeight: 700,
                  color: "var(--theme-primary)",
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                {stat.num}
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--theme-text-muted)",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          ABOUT — Image Collage (UPGRADED)
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5 relative overflow-hidden">
        {/* Decorative bg blur */}
        <div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--theme-primary)" }}
        />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-center relative">
          {/* Images Collage */}
          <div className="relative h-[500px] sm:h-[600px] rsv-hide">
            {/* Main Image */}
            <div
              className="absolute top-0 left-0 w-[70%] rounded-lg overflow-hidden group"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={
                  (client as any).about_image ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                }
                alt=""
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, var(--theme-primary) 200%)`,
                  mixBlendMode: "overlay",
                }}
              />
            </div>

            {/* Secondary Image */}
            <div
              className="absolute bottom-0 right-0 w-[55%] rounded-lg overflow-hidden group"
              style={{
                aspectRatio: "4/3",
                border: `8px solid var(--theme-bg)`,
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={
                  (client as any).featured_image_1 ||
                  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"
                }
                alt=""
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            {/* Rotating Badge */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-center shadow-2xl z-10"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-bg)",
                animation: "spin 25s linear infinite",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {(client as any).year_established || "25+"}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginTop: "4px",
                  fontWeight: 700,
                }}
              >
                Years of Heritage
              </div>
            </div>

            {/* Decorative line */}
            <div
              className="absolute -bottom-4 left-8 h-px w-32"
              style={{ background: "var(--theme-primary)" }}
            />
          </div>

          {/* Text */}
          <div className="rsv-hide" style={{ transitionDelay: "0.2s" }}>
            <div
              className="inline-flex items-center gap-3 mb-5"
              style={{ color: "var(--theme-primary)" }}
            >
              <div
                className="h-px w-8"
                style={{ background: "var(--theme-primary)" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Welcome
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 4vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                color: "var(--theme-text)",
              }}
            >
              A Sanctuary of{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--theme-primary)",
                }}
              >
                Whispers
              </em>{" "}
              &amp; Wonder
            </h2>
            <p
              className="mt-6 sm:mt-7 mb-6 sm:mb-7"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 1.5vw, 19px)",
                lineHeight: 1.8,
                color: "var(--theme-text-muted)",
              }}
            >
              {(client as any).about_short ||
                client.about ||
                `Nestled among swaying palms and lush tropical gardens, ${client.business_name} offers an enchanting escape where nature dances with luxury. Every leaf, every breeze, every sunset whispers a story of timeless elegance.`}
            </p>
            <button
              onClick={() => setPage("about")}
              className="inline-flex items-center gap-3 pb-1.5 transition-all hover:gap-6"
              style={{
                color: "var(--theme-primary)",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                borderBottom: "1px solid var(--theme-primary)",
              }}
            >
              Discover Our Story →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          EXPERIENCES — Premium Image Grid
      ═══════════════════════════════════ */}
      <section
        className="py-24 sm:py-32 px-5"
        style={{ background: "var(--theme-bg-2)" }}
      >
        <div className="text-center mb-12 sm:mb-20 rsv-hide">
          <div className="inline-flex items-center gap-3 mb-5">
            <div
              className="h-px w-10"
              style={{ background: "var(--theme-primary)" }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "var(--theme-primary)",
                fontWeight: 600,
              }}
            >
              Curated Experiences
            </span>
            <div
              className="h-px w-10"
              style={{ background: "var(--theme-primary)" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5.5vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            Moments of{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Pure Bliss
            </em>
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {[
    {
      num: "01",
      title:
        (client as any).exp_title_1 || "Infinity Pool",
      img:
        (client as any).exp_image_1 ||
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
      desc:
        (client as any).exp_desc_1 ||
        "Swim where the sky meets the sea.",
    },
    {
      num: "02",
      title:
        (client as any).exp_title_2 || "Garden Spa",
      img:
        (client as any).exp_image_2 ||
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      desc:
        (client as any).exp_desc_2 ||
        "Rejuvenate amid tropical blooms.",
    },
    {
      num: "03",
      title:
        (client as any).exp_title_3 || "Fine Dining",
      img:
        (client as any).exp_image_3 ||
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      desc:
        (client as any).exp_desc_3 ||
        "Culinary masterpieces in candlelit elegance.",
    },
    {
      num: "04",
      title:
        (client as any).exp_title_4 || "Private Beach",
      img:
        (client as any).exp_image_4 ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      desc:
        (client as any).exp_desc_4 ||
        "Pristine sands with personal cabanas.",
    },
  ].map((exp, i) => (
            <div
              key={i}
              className="relative cursor-pointer overflow-hidden group rsv-hide rounded-2xl"
              style={{
                aspectRatio: "3/4",
                transitionDelay: `${i * 0.12}s`,
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              {/* Image */}
              <img
                src={exp.img}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-125"
                style={{ filter: "brightness(0.85) saturate(1.1)" }}
              />

              {/* Strong dark gradient (always visible) */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)",
                }}
              />

              {/* Gold tint on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Gold border on hover */}
              <div
                className="absolute inset-3 border-2 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl pointer-events-none"
                style={{ borderColor: "var(--theme-primary)" }}
              />

              {/* Content - Always Visible */}
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                {/* Number */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    color: "var(--theme-primary)",
                    marginBottom: "12px",
                    letterSpacing: "3px",
                    fontWeight: 600,
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  — {exp.num}
                </div>

                {/* Title - Strong White */}
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "26px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    lineHeight: 1.1,
                    color: "#ffffff",
                    textShadow: `
                      0 2px 15px rgba(0,0,0,0.8),
                      0 4px 30px rgba(0,0,0,0.6)
                    `,
                  }}
                >
                  {exp.title}
                </h4>

                {/* Description - Always visible */}
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: "14px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                  }}
                >
                  {exp.desc}
                </p>

                {/* Explore arrow (always visible) */}
                <div
                  className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "var(--theme-primary)",
                    fontWeight: 700,
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  Explore →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          ROOMS PREVIEW (UPGRADED)
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5 relative overflow-hidden">
        {/* Decorative blur */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--theme-primary)" }}
        />

        <div className="text-center mb-12 sm:mb-20 rsv-hide relative">
          <div className="inline-flex items-center gap-3 mb-5">
            <div
              className="h-px w-10"
              style={{ background: "var(--theme-primary)" }}
            />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "var(--theme-primary)",
                fontWeight: 600,
              }}
            >
              Stay With Us
            </span>
            <div
              className="h-px w-10"
              style={{ background: "var(--theme-primary)" }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5.5vw, 72px)",
              fontWeight: 700,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            Sanctuaries of{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Serenity
            </em>
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {[
            {
              name: "Garden View Suite",
              sub: "Tranquil & Elegant",
              price: "₹12,000",
              img:
                "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
              features: ["King Bed", "45 m²", "Garden View"],
            },
            {
              name: "Palm Beach Villa",
              sub: "Beachfront Luxury",
              price: "₹25,000",
              img:
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
              features: ["2 Beds", "80 m²", "Private Pool"],
            },
            {
              name: "Royal Penthouse",
              sub: "Ultimate Indulgence",
              price: "₹45,000",
              img:
                "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
              features: ["3 Beds", "150 m²", "Jacuzzi"],
            },
          ].map((room, i) => (
            <div
              key={i}
              onClick={() => setPage("rooms")}
              className="relative cursor-pointer rounded-3xl overflow-hidden group rsv-hide transition-all duration-700 hover:-translate-y-4"
              style={{
                height: "500px",
                transitionDelay: `${i * 0.15}s`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={room.img}
                alt={room.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-125"
              />
              {/* Gold border on hover */}
              <div
                className="absolute inset-4 border-2 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl pointer-events-none"
                style={{ borderColor: "var(--theme-primary)" }}
              />
              {/* Dark gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)",
                }}
              />
              {/* Gold tint on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
                  mixBlendMode: "overlay",
                }}
              />

              {/* Price Tag */}
              <div
                className="absolute top-5 right-5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider z-10 backdrop-blur-md"
                style={{
                  background: "var(--theme-primary)",
                  color: "var(--theme-bg)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                {room.price}/night
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9 text-white">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(22px, 2vw, 28px)",
                    fontWeight: 700,
                    marginBottom: "8px",
                    textShadow: "0 2px 15px rgba(0,0,0,0.8)",
                  }}
                >
                  {room.name}
                </h3>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "var(--theme-primary)",
                    fontSize: "16px",
                    marginBottom: "18px",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  }}
                >
                  {room.sub}
                </div>
                {/* Features as chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.features.map((f, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest backdrop-blur-md"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div
                  className="inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4"
                  style={{
                    color: "var(--theme-primary)",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  View Details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <section
        className="relative py-24 sm:py-40 px-5 text-center"
        style={{
          backgroundImage: `url(${
            (client as any).cta_bg_image ||
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80"
          })`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6))",
          }}
        />
        <div className="relative rsv-hide">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 80px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "24px",
              lineHeight: 1.1,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            Begin Your{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "var(--theme-primary)",
                fontWeight: 400,
              }}
            >
              Whispered
            </em>{" "}
            Story
          </h2>
          <p
            className="max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 1.8vw, 22px)",
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Reserve your sanctuary among the palms. Best rate guaranteed when
            you book directly.
          </p>
          <button
            onClick={() => setPage("contact")}
            className="px-10 sm:px-12 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-[3px] text-[10px] sm:text-xs transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: "var(--theme-primary)",
              color: "var(--theme-bg)",
              boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
            }}
          >
            Reserve Your Escape
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════
          GLOBAL ANIMATIONS
      ═══════════════════════════════════ */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          50% {
            transform: scale(1.2) translate(-2%, -1%);
          }
          100% {
            transform: scale(1.1) translate(0, 0);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        @keyframes spin {
          from {
            transform: translateY(-50%) rotate(0deg);
          }
          to {
            transform: translateY(-50%) rotate(360deg);
          }
        }
        .rsv-hide {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rsv-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}