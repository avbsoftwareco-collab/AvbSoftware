"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  Waves,
  Coffee,
  Sparkles,
  Dumbbell,
  Wifi,
  Car,
  Utensils,
  Heart,
  Music,
  Sun,
  Wine,
  TreePalm,
} from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

interface Amenity {
  icon: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export default function AmenitiesPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);

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
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroImage =
    (client as any).amenities_hero_image ||
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80";

  // ═══ Main Amenities (Dynamic or default) ═══
  const amenities: Amenity[] =
    (client as any).amenities && (client as any).amenities.length > 0
      ? (client as any).amenities
      : [
          {
            icon: "Waves",
            title: "Infinity Pool",
            description:
              "Swim in our breathtaking infinity pool overlooking the ocean. A surreal experience where the water seems to merge with the horizon.",
            image:
              "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
            features: ["Heated Pool", "Pool Bar", "Loungers", "Towel Service"],
          },
          {
            icon: "Sparkles",
            title: "Luxury Spa",
            description:
              "Indulge in ancient therapies and modern wellness rituals. Our spa offers a sanctuary for body, mind, and soul.",
            image:
              "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            features: ["Massage Therapies", "Aromatherapy", "Sauna", "Steam Room"],
          },
          {
            icon: "Utensils",
            title: "Fine Dining",
            description:
              "Savor culinary masterpieces crafted by our award-winning chefs. From local delicacies to international cuisine.",
            image:
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            features: ["3 Restaurants", "Private Dining", "Wine Cellar", "24/7 Room Service"],
          },
          {
            icon: "TreePalm",
            title: "Private Beach",
            description:
              "Enjoy exclusive access to our pristine private beach. Personal cabanas, water sports, and crystal clear waters await.",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            features: [
              "Private Cabanas",
              "Beach Service",
              "Water Sports",
              "Sunset Views",
            ],
          },
        ];

  // ═══ Additional Services ═══
  const services = [
    { icon: Dumbbell, title: "Fitness Center", desc: "State-of-the-art equipment" },
    { icon: Wifi, title: "High-Speed WiFi", desc: "Complimentary throughout resort" },
    { icon: Car, title: "Airport Transfer", desc: "Luxury chauffeur service" },
    { icon: Heart, title: "Wedding Planning", desc: "Dream destination weddings" },
    { icon: Music, title: "Live Entertainment", desc: "Cultural shows & music" },
    { icon: Sun, title: "Yoga Sessions", desc: "Sunrise & sunset classes" },
    { icon: Wine, title: "Wine Tasting", desc: "Curated wine experiences" },
    { icon: Coffee, title: "Cafe & Lounge", desc: "Artisan coffee & snacks" },
  ];

  // Icon mapping
  const iconMap: Record<string, any> = {
    Waves,
    Coffee,
    Sparkles,
    Dumbbell,
    Wifi,
    Car,
    Utensils,
    Heart,
    Music,
    Sun,
    Wine,
    TreePalm,
  };

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO BANNER - Unique Motion (Diagonal Wipe)
      ═══════════════════════════════════ */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pageLoaded ? "scale(1)" : "scale(1.3)",
            transition: "transform 2.5s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        />

        {/* Diagonal stripes */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: 0,
                left: `${i * 18}%`,
                width: "2px",
                height: "150%",
                background: `linear-gradient(180deg, transparent, var(--theme-primary), transparent)`,
                opacity: 0.15,
                transform: pageLoaded
                  ? "rotate(15deg) translateY(0)"
                  : "rotate(15deg) translateY(-100%)",
                transition: `transform 1.5s ease ${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Dark overlay */}
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
                ✦ Resort Amenities ✦
              </span>
              <div
                className="hidden sm:block h-px w-12"
                style={{ background: "var(--theme-primary)" }}
              />
            </div>

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
              World-Class{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Experiences
              </em>
            </h1>

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
                transition: "opacity 1s ease 1.8s, transform 1s ease 1.8s",
              }}
            >
              Indulge in luxury amenities crafted to elevate every moment of
              your stay
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MAIN AMENITIES — Alternating Layout
      ═══════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5">
        <div className="max-w-[1400px] mx-auto">
          {amenities.map((amenity, i) => {
            const Icon = iconMap[amenity.icon] || Sparkles;
            const isReverse = i % 2 === 1;

            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 sm:mb-32 last:mb-0 rsv-hide`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className={`relative ${isReverse ? "lg:order-2" : ""}`}>
                  <div
                    className="rounded-3xl overflow-hidden group"
                    style={{
                      aspectRatio: "4/3",
                      boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  {/* Number badge */}
                  <div
                    className={`absolute -top-6 ${isReverse ? "-right-6" : "-left-6"} w-20 h-20 rounded-full flex items-center justify-center hidden sm:flex`}
                    style={{
                      background: "var(--theme-primary)",
                      color: "var(--theme-bg)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "28px",
                        fontWeight: 700,
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Decorative line */}
                  <div
                    className={`absolute -bottom-4 ${isReverse ? "right-8" : "left-8"} h-px w-32`}
                    style={{ background: "var(--theme-primary)" }}
                  />
                </div>

                {/* Content */}
                <div className={isReverse ? "lg:order-1" : ""}>
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(212,175,55,0.15)",
                      border: "1.5px solid var(--theme-primary)",
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "var(--theme-primary)" }} />
                  </div>

                  <div
                    className="inline-flex items-center gap-3 mb-4"
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
                      Experience #{i + 1}
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
                      letterSpacing: "-1px",
                    }}
                  >
                    {amenity.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(16px, 1.5vw, 19px)",
                      lineHeight: 1.8,
                      color: "var(--theme-text-muted)",
                      marginBottom: "30px",
                    }}
                  >
                    {amenity.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {amenity.features.map((f, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          background: "var(--theme-bg-card)",
                          border: "1px solid var(--theme-border)",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "var(--theme-primary)" }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--theme-text)",
                            fontWeight: 500,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════
          ADDITIONAL SERVICES GRID
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5" style={{ background: "var(--theme-bg-2)" }}>
        <div className="text-center mb-16 rsv-hide">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                color: "var(--theme-primary)",
                fontWeight: 600,
              }}
            >
              Additional Services
            </span>
            <div className="h-px w-10" style={{ background: "var(--theme-primary)" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 60px)",
              fontWeight: 700,
              color: "var(--theme-text)",
              letterSpacing: "-2px",
            }}
          >
            More to{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Discover
            </em>
          </h2>
        </div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="text-center p-6 rounded-2xl rsv-hide transition-all hover:-translate-y-2 group"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1.5px solid var(--theme-primary)",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: "var(--theme-primary)" }} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    marginBottom: "6px",
                  }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "var(--theme-text-muted)",
                  }}
                >
                  {service.desc}
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
          backgroundImage: `url(https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1920&q=80)`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.6))",
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
            Experience It{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "var(--theme-primary)",
                fontWeight: 400,
              }}
            >
              All
            </em>
          </h2>
          <p
            className="max-w-2xl mx-auto mb-10 px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Reserve your stay and enjoy unlimited access to all our world-class
            amenities.
          </p>
          <button
            onClick={() => setPage("contact")}
            className="px-12 py-4 rounded-full font-bold uppercase tracking-[3px] text-xs transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: "var(--theme-primary)",
              color: "var(--theme-bg)",
              boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
            }}
          >
            Book Your Stay
          </button>
        </div>
      </section>
    </div>
  );
}