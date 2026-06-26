"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Award, Heart, Sparkles, Leaf, Shield, Star } from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function AboutPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rsv-show");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroImage =
    (client as any).about_hero_image ||
    (client as any).about_image ||
    client.hero_image_url ||
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80";

  // Timeline milestones
  const milestones = (client as any).timeline || [
    { year: "1999", title: "The Beginning", desc: "Founded with a dream to redefine tropical luxury hospitality." },
    { year: "2008", title: "First Award", desc: "Recognized as 'Best Boutique Resort' by Travel + Leisure." },
    { year: "2015", title: "Garden Expansion", desc: "Added 5-acre botanical garden with rare tropical species." },
    { year: "2020", title: "Eco Certification", desc: "Achieved Green Globe sustainability certification." },
    { year: "2024", title: "Five-Star Status", desc: "Officially rated 5-star luxury resort by the Ministry of Tourism." },
  ];

  // Awards
  const awards = (client as any).awards || [
    { icon: "🏆", title: "Best Luxury Resort", year: "2024", org: "Travel + Leisure" },
    { icon: "🌿", title: "Sustainability Award", year: "2023", org: "Green Globe" },
    { icon: "⭐", title: "5-Star Rating", year: "2024", org: "Ministry of Tourism" },
    { icon: "💎", title: "Excellence in Service", year: "2023", org: "Hospitality Awards" },
  ];

  // Why Choose Us features
  const features = [
    {
      icon: Heart,
      title: "Personalized Service",
      desc: "Every guest treated like royalty with bespoke experiences.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious",
      desc: "Committed to sustainability and preserving natural beauty.",
    },
    {
      icon: Sparkles,
      title: "Luxury Amenities",
      desc: "World-class facilities crafted for ultimate indulgence.",
    },
    {
      icon: Shield,
      title: "Trusted Heritage",
      desc: "25+ years of excellence in hospitality.",
    },
  ];

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════ */}
     <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
  {/* Background with slow zoom out + subtle pan */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "slowReveal 25s ease-out infinite alternate",
    }}
  />

  {/* Animated decorative grid pattern overlay */}
  <div
    className="absolute inset-0 z-[1] opacity-20"
    style={{
      backgroundImage: `
        linear-gradient(var(--theme-primary) 1px, transparent 1px),
        linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      animation: "gridFloat 30s linear infinite",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
    }}
  />

  {/* Floating golden orbs */}
  <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${30 + Math.random() * 60}px`,
          height: `${30 + Math.random() * 60}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)`,
          opacity: 0.3,
          animation: `orbFloat ${15 + Math.random() * 10}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
          filter: "blur(20px)",
        }}
      />
    ))}
  </div>

  {/* Left Curtain */}
<div className="absolute inset-0 z-[5] pointer-events-none flex">
  {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className="flex-1 transition-all duration-[1500ms]"
      style={{
        background: "var(--theme-bg)",
        transform: pageLoaded ? "translateY(-100%)" : "translateY(0)",
        transitionDelay: `${i * 0.08}s`,
        transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    />
  ))}
</div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-[4] h-full flex items-center justify-center text-center px-6">
          <div className="max-w-[1000px]">
            {/* Tag */}
            <div
              className="inline-flex items-center gap-3 sm:gap-4 mb-6 px-5 sm:px-6 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 1.4s, transform 1s ease 1.4s",
              }}
            >
              <div
                className="hidden sm:block h-px w-12"
                style={{ background: "var(--theme-primary)" }}
              />
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "var(--theme-primary)",
                  fontWeight: 600,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                ✦ Our Heritage ✦
              </span>
              <div
                className="hidden sm:block h-px w-12"
                style={{ background: "var(--theme-primary)" }}
              />
            </div>

            {/* Title */}
            <h1
              className="leading-[1.05] mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 7vw, 96px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-2px",
                textShadow:
                  "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 1.4s ease 1.6s, transform 1.4s ease 1.6s",
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
                Story
              </em>
            </h1>

            {/* Subtitle */}
            <p
              className="max-w-2xl mx-auto px-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                color: "#fff",
                textShadow: "0 2px 15px rgba(0,0,0,0.6)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 2s, transform 1s ease 2s",
              }}
            >
              A journey of passion, dedication, and timeless luxury that began
              over two decades ago
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          WELCOME SECTION (with two images)
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5 relative overflow-hidden">
        <div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--theme-primary)" }}
        />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-center">
          {/* Left: Content */}
          <div className="rsv-hide">
            <div className="inline-flex items-center gap-3 mb-5">
              <div
                className="h-px w-8"
                style={{ background: "var(--theme-primary)" }}
              />
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "var(--theme-primary)",
                  fontWeight: 600,
                }}
              >
                Welcome to {client.business_name?.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--theme-text)",
                letterSpacing: "-1px",
              }}
            >
              Where Every Stay{" "}
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
              a Story
            </h2>
            <p
              className="mt-6 mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.9,
                color: "var(--theme-text-muted)",
              }}
            >
              {client.about ||
                `Welcome to ${client.business_name}, where time slows down and luxury embraces you in its finest form. Nestled among swaying palms and lush tropical gardens, we have been crafting extraordinary experiences for over two decades.`}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.9,
                color: "var(--theme-text-muted)",
              }}
            >
              From the moment you arrive, you're not just a guest — you're family.
              Every corner of our resort tells a story of passion, every detail
              speaks of dedication, and every experience is designed to create
              memories that last forever.
            </p>

            {/* Stats inline */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t" style={{ borderColor: "var(--theme-border)" }}>
              {[
                { num: (client as any).year_established || "25+", label: "Years" },
                { num: (client as any).stat_3_number || "50K+", label: "Guests" },
                { num: (client as any).stat_4_number || "4.9★", label: "Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 3vw, 42px)",
                      fontWeight: 700,
                      color: "var(--theme-primary)",
                      lineHeight: 1,
                      marginBottom: "6px",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--theme-text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative h-[500px] sm:h-[600px] rsv-hide" style={{ transitionDelay: "0.2s" }}>
            <div
              className="absolute top-0 right-0 w-[70%] rounded-lg overflow-hidden group"
              style={{
                aspectRatio: "3/4",
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={
                  (client as any).about_image ||
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                }
                alt=""
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 w-[55%] rounded-lg overflow-hidden group"
              style={{
                aspectRatio: "4/3",
                border: `8px solid var(--theme-bg)`,
                boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={
                  (client as any).featured_image_2 ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                }
                alt=""
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            {/* Floating gold badge */}
            <div
              className="absolute top-8 left-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-center shadow-2xl z-10"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-bg)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <Award className="w-6 h-6 sm:w-8 sm:h-8 mb-1" />
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(11px, 1vw, 14px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Award<br />Winning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TIMELINE / HERITAGE
      ═══════════════════════════════════ */}
      {/* ═══════════════════════════════════
    OUR HERITAGE — Image Gallery Showcase
═══════════════════════════════════ */}
<section
  className="py-24 sm:py-32 px-5 relative overflow-hidden"
  style={{ background: "var(--theme-bg-2)" }}
>
  {/* Decorative gold blur */}
  <div
    className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
    style={{ background: "var(--theme-primary)" }}
  />
  <div
    className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
    style={{ background: "var(--theme-primary)" }}
  />

  <div className="text-center mb-16 sm:mb-20 rsv-hide">
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
        Discover Paradise
      </span>
      <div
        className="h-px w-10"
        style={{ background: "var(--theme-primary)" }}
      />
    </div>
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(30px, 5vw, 64px)",
        fontWeight: 700,
        color: "var(--theme-text)",
        letterSpacing: "-2px",
      }}
    >
      Where{" "}
      <em
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--theme-primary)",
        }}
      >
        Memories
      </em>{" "}
      Are Made
    </h2>
    <p
      className="max-w-2xl mx-auto mt-5 px-4"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: "clamp(15px, 1.5vw, 19px)",
        color: "var(--theme-text-muted)",
        lineHeight: 1.7,
      }}
    >
      Step into a world where every corner tells a story, every sunrise
      paints a dream, and every moment becomes a treasured memory.
    </p>
  </div>

  {/* ═══ HORIZONTAL SLIDING IMAGE STRIP ═══ */}
  <div className="relative overflow-hidden mb-16">
    {/* Top fade gradient */}
    <div
      className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
      style={{
        background: `linear-gradient(90deg, var(--theme-bg-2), transparent)`,
      }}
    />
    <div
      className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
      style={{
        background: `linear-gradient(-90deg, var(--theme-bg-2), transparent)`,
      }}
    />

    {/* Sliding row 1 - Left to Right */}
    <div className="flex gap-6 mb-6" style={{ animation: "slideLeft 40s linear infinite" }}>
      {[
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
        // Duplicate for seamless loop
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
      ].map((img, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer relative"
          style={{
            width: "320px",
            height: "240px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>
      ))}
    </div>

    {/* Sliding row 2 - Right to Left */}
    <div className="flex gap-6" style={{ animation: "slideRight 45s linear infinite" }}>
      {[
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
        // Duplicate
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      ].map((img, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer relative"
          style={{
            width: "320px",
            height: "240px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
              mixBlendMode: "overlay",
            }}
          />
        </div>
      ))}
    </div>
  </div>

  {/* ═══ Story Pillars ═══ */}
  <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
    {[
      {
        num: "01",
        title: "Crafted with Love",
        desc: "Every detail thoughtfully designed to create moments of pure joy and lasting memories.",
      },
      {
        num: "02",
        title: "Rooted in Nature",
        desc: "Embraced by lush gardens and swaying palms, we celebrate the beauty of the natural world.",
      },
      {
        num: "03",
        title: "Inspired by You",
        desc: "Your dreams, your comfort, your story — everything we do is inspired by our beloved guests.",
      },
    ].map((pillar, i) => (
      <div
        key={i}
        className="text-center rsv-hide group"
        style={{ transitionDelay: `${i * 0.15}s` }}
      >
        {/* Number circle */}
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
          style={{
            background: "var(--theme-bg-card)",
            border: `1.5px solid var(--theme-primary)`,
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--theme-primary)",
            }}
          >
            {pillar.num}
          </span>
        </div>

        {/* Decorative line */}
        <div
          className="h-px w-16 mx-auto mb-5"
          style={{ background: "var(--theme-primary)" }}
        />

        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 700,
            color: "var(--theme-text)",
            marginBottom: "14px",
            letterSpacing: "-0.5px",
          }}
        >
          {pillar.title}
        </h3>
        <p
          className="max-w-xs mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--theme-text-muted)",
          }}
        >
          {pillar.desc}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* ═══════════════════════════════════
          FOUNDER / OWNER SECTION
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--theme-primary)" }}
        />

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-20 items-center relative">
          {/* Image */}
          <div className="relative rsv-hide">
            <div
              className="rounded-2xl overflow-hidden mx-auto"
              style={{
                maxWidth: "500px",
                aspectRatio: "4/5",
                boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={
                  (client as any).chef_image ||
                  (client as any).founder_image ||
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                }
                alt="Founder"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gold accent */}
            <div
              className="absolute -top-4 -left-4 w-32 h-32 rounded-full hidden sm:block"
              style={{
                border: `2px solid var(--theme-primary)`,
                opacity: 0.3,
              }}
            />
          </div>

          {/* Content */}
          <div className="rsv-hide" style={{ transitionDelay: "0.2s" }}>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "var(--theme-primary)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
                A Message From Our Founder
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--theme-text)",
                marginBottom: "20px",
              }}
            >
              {(client as any).chef_name || (client as any).founder_name || "Mr. Rajesh Kumar"}
            </h2>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "16px",
                color: "var(--theme-primary)",
                marginBottom: "30px",
                letterSpacing: "1px",
              }}
            >
              {(client as any).chef_role || (client as any).founder_role || "Founder & Chairman"}
            </div>

            {/* Quote */}
            <div className="relative pl-6 sm:pl-8" style={{ borderLeft: "3px solid var(--theme-primary)" }}>
              <div
                className="absolute -top-4 -left-2 text-6xl leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--theme-primary)",
                  opacity: 0.3,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 1.8vw, 24px)",
                  lineHeight: 1.7,
                  color: "var(--theme-text)",
                }}
              >
                {(client as any).chef_quote ||
                  (client as any).founder_quote ||
                  `When we started ${client.business_name} over two decades ago, we had one dream — to create a sanctuary where luxury meets nature, where every guest feels at home, and where memories are crafted with love. That dream continues to guide us every single day.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MISSION & VISION
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5" style={{ background: "var(--theme-bg-2)" }}>
        <div className="text-center mb-12 sm:mb-16 rsv-hide">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
              Our Purpose
            </span>
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 64px)",
              fontWeight: 700,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            Mission &amp;{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Vision
            </em>
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Star,
              title: "Our Mission",
              text:
                (client as any).mission ||
                `To create extraordinary experiences that nurture the soul, where every detail is crafted with passion and every guest is treated like family.`,
            },
            {
              icon: Sparkles,
              title: "Our Vision",
              text:
                (client as any).vision ||
                `To be the world's most loved luxury resort, setting new standards in hospitality while preserving the natural beauty that surrounds us.`,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-3xl rsv-hide transition-all hover:-translate-y-2"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: `${"var(--theme-primary)"}20`,
                    border: `1.5px solid var(--theme-primary)`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: "var(--theme-primary)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    marginBottom: "16px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "var(--theme-text-muted)",
                  }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════
          AWARDS SECTION
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5">
        <div className="text-center mb-16 rsv-hide">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
              Recognition
            </span>
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 64px)",
              fontWeight: 700,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            Awards &amp;{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Accolades
            </em>
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {awards.map((award: any, i: number) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-2xl text-center rsv-hide transition-all hover:-translate-y-2 group"
              style={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="text-4xl sm:text-5xl mb-4 transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "grayscale(0)" }}
              >
                {award.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  fontWeight: 700,
                  color: "var(--theme-text)",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {award.title}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "var(--theme-primary)",
                  marginBottom: "4px",
                }}
              >
                {award.org}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "2px",
                  color: "var(--theme-text-muted)",
                  fontWeight: 600,
                }}
              >
                {award.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5" style={{ background: "var(--theme-bg-2)" }}>
        <div className="text-center mb-16 rsv-hide">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
            <span style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
              The Difference
            </span>
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 64px)",
              fontWeight: 700,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            Why Choose{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Us
            </em>
          </h2>
        </div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="text-center p-6 sm:p-8 rounded-2xl rsv-hide transition-all hover:-translate-y-2 group"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${"var(--theme-primary)"}15`,
                    border: `1.5px solid var(--theme-primary)`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: "var(--theme-primary)" }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    marginBottom: "12px",
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--theme-text-muted)",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════ */}
      <section
        className="relative py-24 sm:py-32 px-5 text-center"
        style={{
          backgroundImage: `url(${
            (client as any).cta_bg_image ||
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
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
        <div className="relative rsv-hide max-w-[900px] mx-auto">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.1,
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            Experience the{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "var(--theme-primary)",
                fontWeight: 400,
              }}
            >
              Legacy
            </em>{" "}
            Yourself
          </h2>
          <p
            className="max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Step into our world and become part of our story. Your luxury escape
            awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center px-4 sm:px-0">
            <button
              onClick={() => setPage("rooms")}
              className="px-10 py-4 rounded-full font-bold uppercase tracking-[3px] text-[10px] sm:text-xs transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-bg)",
                boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
              }}
            >
              Explore Rooms
            </button>
            <button
              onClick={() => setPage("contact")}
              className="px-10 py-4 rounded-full font-bold uppercase tracking-[3px] text-[10px] sm:text-xs transition-all hover:-translate-y-1 text-white backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.5)",
              }}
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>

     <style jsx global>{`
  @keyframes slowReveal {
    0% {
      transform: scale(1.3);
      filter: brightness(0.7) saturate(0.8);
    }
    50% {
      transform: scale(1.15);
      filter: brightness(1) saturate(1.1);
    }
    100% {
      transform: scale(1.05);
      filter: brightness(0.9) saturate(1);
    }
  }
  @keyframes gridFloat {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(80px, 80px);
    }
  }
  @keyframes orbFloat {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(30px, -40px) scale(1.2);
      opacity: 0.5;
    }
    50% {
      transform: translate(-20px, -60px) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translate(-40px, -20px) scale(1.1);
      opacity: 0.5;
    }
  }
  @keyframes slideLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  @keyframes slideRight {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }
`}</style>
    </div>
  );
}