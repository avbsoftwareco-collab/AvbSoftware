"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  BedDouble,
  Maximize,
  Users,
  Wifi,
  Coffee,
  Waves,
  Wind,
  Tv,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

interface Room {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  price: string;
  image: string;
  gallery: string[];
  size: string;
  beds: string;
  guests: string;
  view: string;
  description: string;
  amenities: string[];
  featured: boolean;
}

export default function RoomsPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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
    (client as any).rooms_hero_image ||
    (client as any).menu_hero_image ||
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80";

  // ═══ Rooms data (Dynamic from admin or default) ═══
  const rooms: Room[] =
    (client as any).rooms && (client as any).rooms.length > 0
      ? (client as any).rooms
      : [
          {
            id: 1,
            name: "Garden View Suite",
            category: "Suites",
            subtitle: "Tranquil & Elegant",
            price: "12000",
            image:
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
            gallery: [
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
              "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
            ],
            size: "45",
            beds: "1 King",
            guests: "2",
            view: "Garden",
            description:
              "A serene haven overlooking lush tropical gardens, perfect for couples seeking tranquility.",
            amenities: [
              "Free WiFi",
              "Mini Bar",
              "AC",
              "Smart TV",
              "Coffee Maker",
              "Garden View",
            ],
            featured: false,
          },
          {
            id: 2,
            name: "Palm Beach Villa",
            category: "Villas",
            subtitle: "Beachfront Luxury",
            price: "25000",
            image:
              "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            gallery: [
              "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
            ],
            size: "80",
            beds: "2 King",
            guests: "4",
            view: "Beach",
            description:
              "Private beachfront villa with stunning ocean views and direct beach access.",
            amenities: [
              "Private Pool",
              "Beach Access",
              "Free WiFi",
              "Butler Service",
              "Jacuzzi",
              "Ocean View",
            ],
            featured: true,
          },
          {
            id: 3,
            name: "Royal Penthouse",
            category: "Penthouses",
            subtitle: "Ultimate Indulgence",
            price: "45000",
            image:
              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
            gallery: [
              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
            ],
            size: "150",
            beds: "3 Beds",
            guests: "6",
            view: "Panoramic",
            description:
              "The pinnacle of luxury — a sprawling penthouse with panoramic views and exclusive amenities.",
            amenities: [
              "Private Jacuzzi",
              "Butler Service",
              "Panoramic View",
              "Private Terrace",
              "Fine Dining",
              "Spa",
            ],
            featured: false,
          },
          {
            id: 4,
            name: "Tropical Deluxe Room",
            category: "Suites",
            subtitle: "Modern & Comfortable",
            price: "8000",
            image:
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
            gallery: [],
            size: "35",
            beds: "1 Queen",
            guests: "2",
            view: "Tropical",
            description:
              "Spacious deluxe room with modern amenities and a touch of tropical charm.",
            amenities: [
              "Free WiFi",
              "AC",
              "Smart TV",
              "Coffee Maker",
              "Work Desk",
              "Balcony",
            ],
            featured: false,
          },
          {
            id: 5,
            name: "Sunset Pool Villa",
            category: "Villas",
            subtitle: "Romance & Privacy",
            price: "32000",
            image:
              "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
            gallery: [],
            size: "100",
            beds: "1 King",
            guests: "2",
            view: "Sunset",
            description:
              "Romantic villa with private infinity pool and breathtaking sunset views.",
            amenities: [
              "Infinity Pool",
              "Private Garden",
              "Butler Service",
              "Outdoor Shower",
              "Sunset View",
              "Free WiFi",
            ],
            featured: false,
          },
          {
            id: 6,
            name: "Family Garden Suite",
            category: "Suites",
            subtitle: "Spacious & Welcoming",
            price: "18000",
            image:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            gallery: [],
            size: "60",
            beds: "2 Queen",
            guests: "4",
            view: "Garden",
            description:
              "Perfect for families — spacious suite with two bedrooms and garden access.",
            amenities: [
              "Free WiFi",
              "Kids Pool Access",
              "AC",
              "Smart TV",
              "Mini Kitchen",
              "Garden View",
            ],
            featured: false,
          },
        ];

  // ═══ Get all categories (FIXED TypeScript) ═══
  const uniqueCategories = Array.from(
    new Set(rooms.map((r) => r.category))
  ) as string[];
  const categories: string[] = ["All", ...uniqueCategories];

  // Filter rooms
  const filteredRooms: Room[] =
    activeFilter === "All"
      ? rooms
      : rooms.filter((r) => r.category === activeFilter);

  // Find featured room
  const featuredRoom: Room = rooms.find((r) => r.featured) || rooms[0];

  // Amenity icon mapping
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("wifi")) return Wifi;
    if (lower.includes("coffee") || lower.includes("bar")) return Coffee;
    if (
      lower.includes("pool") ||
      lower.includes("beach") ||
      lower.includes("jacuzzi")
    )
      return Waves;
    if (lower.includes("ac") || lower.includes("air")) return Wind;
    if (lower.includes("tv")) return Tv;
    return Star;
  };

  // Get room count per category
  const getCategoryCount = (cat: string): number => {
    if (cat === "All") return rooms.length;
    return rooms.filter((r) => r.category === cat).length;
  };

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO BANNER - Unique Motion (Split)
      ═══════════════════════════════════ */}
      <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
        {/* Split Image - Top half */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden"
          style={{
            transform: pageLoaded ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              height: "200%",
            }}
          />
        </div>

        {/* Split Image - Bottom half */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden"
          style={{
            transform: pageLoaded ? "translateY(0)" : "translateY(100%)",
            transition: "transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              top: "-100%",
              height: "200%",
            }}
          />
        </div>

        {/* Gold center line that fades */}
        <div
          className="absolute left-0 right-0 top-1/2 h-0.5 z-[3]"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-primary), transparent)`,
            opacity: pageLoaded ? 0 : 1,
            transition: "opacity 1.5s ease 1s",
          }}
        />

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
                transition: "opacity 1s ease 1.6s, transform 1s ease 1.6s",
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
                ✦ Luxurious Accommodations ✦
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
                transition: "opacity 1.4s ease 1.8s, transform 1.4s ease 1.8s",
              }}
            >
              Rooms &amp;{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Villas
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
                transition: "opacity 1s ease 2s, transform 1s ease 2s",
              }}
            >
              Each room is a sanctuary, designed to embrace you in comfort and
              elegance
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          QUICK STATS BAR
      ═══════════════════════════════════ */}
      <section
        className="py-10 px-5 border-b"
        style={{
          background: "var(--theme-bg-2)",
          borderColor: "var(--theme-border)",
        }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: `${rooms.length}`, label: "Room Types" },
            { num: `${categories.length - 1}`, label: "Categories" },
            { num: "24/7", label: "Concierge" },
            { num: "4.9★", label: "Guest Rating" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rsv-hide"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 700,
                  color: "var(--theme-primary)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: "10px",
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
          FILTER TABS + ROOMS GRID
      ═══════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 rsv-hide">
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
                Choose Your Sanctuary
              </span>
              <div
                className="h-px w-10"
                style={{ background: "var(--theme-primary)" }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 5vw, 56px)",
                fontWeight: 700,
                color: "var(--theme-text)",
                letterSpacing: "-2px",
              }}
            >
              Find Your Perfect{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--theme-primary)",
                }}
              >
                Stay
              </em>
            </h2>
          </div>

          {/* ═══ Premium Filter Tabs ═══ */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 rsv-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="relative px-5 sm:px-7 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[2px] transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
                  style={{
                    background: isActive
                      ? "var(--theme-primary)"
                      : "transparent",
                    color: isActive
                      ? "var(--theme-bg)"
                      : "var(--theme-text)",
                    border: `1.5px solid ${
                      isActive ? "var(--theme-primary)" : "var(--theme-border)"
                    }`,
                    boxShadow: isActive
                      ? "0 15px 40px rgba(0,0,0,0.25)"
                      : "none",
                  }}
                >
                  {/* Hover shimmer */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)`,
                      }}
                    />
                  )}

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                      style={{
                        background: "var(--theme-bg)",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    />
                  )}

                  <span className="relative z-10">{cat}</span>

                  {/* Count badge */}
                  <span
                    className="ml-2 px-1.5 py-0.5 rounded-full text-[8px] font-bold align-middle relative z-10"
                    style={{
                      background: isActive
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(212,175,55,0.2)",
                      color: isActive ? "var(--theme-bg)" : "var(--theme-primary)",
                    }}
                  >
                    {getCategoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ═══ ROOMS GRID ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRooms.map((room, i) => (
              <div
                key={room.id || i}
                className="group rsv-hide rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-3"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  transitionDelay: `${i * 0.1}s`,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />

                  {/* Gold tint on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-primary), transparent)`,
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Featured Badge */}
                  {room.featured && (
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1"
                      style={{
                        background: "var(--theme-primary)",
                        color: "var(--theme-bg)",
                      }}
                    >
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </div>
                  )}

                  {/* Price Tag */}
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold tracking-wider backdrop-blur-md"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      color: "var(--theme-primary)",
                      border: `1px solid var(--theme-primary)`,
                    }}
                  >
                    ₹{Number(room.price).toLocaleString()}
                    <span className="text-[10px] opacity-70">/night</span>
                  </div>

                  {/* Category */}
                  <div
                    className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {room.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "var(--theme-text)",
                      marginBottom: "6px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {room.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "15px",
                      color: "var(--theme-primary)",
                      marginBottom: "20px",
                    }}
                  >
                    {room.subtitle}
                  </p>

                  {/* Room Details */}
                  <div
                    className="grid grid-cols-3 gap-3 py-4 mb-5"
                    style={{
                      borderTop: "1px solid var(--theme-border)",
                      borderBottom: "1px solid var(--theme-border)",
                    }}
                  >
                    <div className="text-center">
                      <Maximize
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--theme-text)",
                          fontWeight: 600,
                        }}
                      >
                        {room.size} m²
                      </div>
                    </div>
                    <div className="text-center">
                      <BedDouble
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--theme-text)",
                          fontWeight: 600,
                        }}
                      >
                        {room.beds}
                      </div>
                    </div>
                    <div className="text-center">
                      <Users
                        className="w-4 h-4 mx-auto mb-1"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--theme-text)",
                          fontWeight: 600,
                        }}
                      >
                        {room.guests} Guests
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="mb-5"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "var(--theme-text-muted)",
                    }}
                  >
                    {room.description}
                  </p>

                  {/* Amenities chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider"
                        style={{
                          background: "var(--theme-bg-2)",
                          border: "1px solid var(--theme-border)",
                          color: "var(--theme-text-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider"
                        style={{
                          background: "rgba(212,175,55,0.2)",
                          border: "1px solid var(--theme-primary)",
                          color: "var(--theme-primary)",
                          fontWeight: 600,
                        }}
                      >
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="flex-1 py-3 rounded-full text-[11px] font-bold uppercase tracking-[2px] transition-all hover:-translate-y-0.5"
                      style={{
                        background: "transparent",
                        color: "var(--theme-primary)",
                        border: "1.5px solid var(--theme-primary)",
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        const phone = client.whatsapp || client.phone || "";
                        const msg = `Hi! I'd like to book the ${room.name} at ${client.business_name}. Please share availability.`;
                        window.open(
                          `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`,
                          "_blank"
                        );
                      }}
                      className="flex-1 py-3 rounded-full text-[11px] font-bold uppercase tracking-[2px] transition-all hover:-translate-y-0.5"
                      style={{
                        background: "var(--theme-primary)",
                        color: "var(--theme-bg)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-20">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "var(--theme-text-muted)",
                }}
              >
                No rooms available in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURED ROOM - Big Showcase
      ═══════════════════════════════════ */}
      {featuredRoom && (
        <section
          className="py-24 sm:py-32 px-5"
          style={{ background: "var(--theme-bg-2)" }}
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 rsv-hide">
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
                  Signature Experience
                </span>
                <div
                  className="h-px w-10"
                  style={{ background: "var(--theme-primary)" }}
                />
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
                Our{" "}
                <em
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--theme-primary)",
                  }}
                >
                  Crown Jewel
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative rsv-hide">
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: "4/5",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={featuredRoom.image}
                    alt={featuredRoom.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating price card */}
                <div
                  className="absolute -bottom-6 -right-6 p-6 rounded-2xl hidden sm:block"
                  style={{
                    background: "var(--theme-primary)",
                    color: "var(--theme-bg)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    Starting From
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    ₹{Number(featuredRoom.price).toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.8,
                      marginTop: "2px",
                    }}
                  >
                    per night
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="rsv-hide" style={{ transitionDelay: "0.2s" }}>
                <div
                  className="inline-block px-4 py-1 rounded-full mb-4"
                  style={{
                    background: "rgba(212,175,55,0.2)",
                    border: "1px solid var(--theme-primary)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "var(--theme-primary)",
                      fontWeight: 700,
                    }}
                  >
                    ⭐ Most Loved
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                    letterSpacing: "-1px",
                  }}
                >
                  {featuredRoom.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "20px",
                    color: "var(--theme-primary)",
                    marginBottom: "24px",
                  }}
                >
                  {featuredRoom.subtitle}
                </p>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "var(--theme-text-muted)",
                    marginBottom: "30px",
                  }}
                >
                  {featuredRoom.description}
                </p>

                {/* Room specs */}
                <div
                  className="grid grid-cols-3 gap-4 mb-8 py-6"
                  style={{
                    borderTop: "1px solid var(--theme-border)",
                    borderBottom: "1px solid var(--theme-border)",
                  }}
                >
                  {[
                    {
                      icon: Maximize,
                      label: `${featuredRoom.size} m²`,
                      sub: "Area",
                    },
                    { icon: BedDouble, label: featuredRoom.beds, sub: "Beds" },
                    {
                      icon: Users,
                      label: `${featuredRoom.guests} Guests`,
                      sub: "Max",
                    },
                  ].map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className="text-center">
                        <Icon
                          className="w-6 h-6 mx-auto mb-2"
                          style={{ color: "var(--theme-primary)" }}
                        />
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "var(--theme-text)",
                            marginBottom: "2px",
                          }}
                        >
                          {spec.label}
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: "var(--theme-text-muted)",
                          }}
                        >
                          {spec.sub}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* All Amenities */}
                <div className="mb-8">
                  <div
                    className="mb-4"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "var(--theme-primary)",
                      fontWeight: 700,
                    }}
                  >
                    Featured Amenities
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {featuredRoom.amenities.map((amenity, i) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Icon
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: "var(--theme-primary)" }}
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--theme-text)",
                            }}
                          >
                            {amenity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    const phone = client.whatsapp || client.phone || "";
                    const msg = `Hi! I'd like to book the ${featuredRoom.name} at ${client.business_name}.`;
                    window.open(
                      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`,
                      "_blank"
                    );
                  }}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold uppercase tracking-[3px] text-xs transition-all hover:-translate-y-1 hover:gap-5"
                  style={{
                    background: "var(--theme-primary)",
                    color: "var(--theme-bg)",
                    boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  Reserve This Suite <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════
          WHY STAY WITH US
      ═══════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-5">
        <div className="text-center mb-16 rsv-hide">
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
              The Promise
            </span>
            <div
              className="h-px w-10"
              style={{ background: "var(--theme-primary)" }}
            />
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
            Every Stay,{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--theme-primary)",
              }}
            >
              Extraordinary
            </em>
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🛏️",
              title: "Plush Bedding",
              desc: "Egyptian cotton sheets and premium pillows",
            },
            {
              icon: "🛁",
              title: "Marble Bathrooms",
              desc: "Luxury toiletries and rainfall showers",
            },
            {
              icon: "🍷",
              title: "Welcome Drinks",
              desc: "Complimentary beverages on arrival",
            },
            {
              icon: "🌅",
              title: "Daily Housekeeping",
              desc: "Pristine rooms maintained twice daily",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl rsv-hide transition-all hover:-translate-y-2 group"
              style={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--theme-text)",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  color: "var(--theme-text-muted)",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
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
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80"
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
            Your{" "}
            <em
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "var(--theme-primary)",
                fontWeight: 400,
              }}
            >
              Sanctuary
            </em>{" "}
            Awaits
          </h2>
          <p
            className="max-w-2xl mx-auto mb-10 px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Book directly for exclusive benefits, complimentary upgrades, and
            our best rate guarantee.
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
            Reserve Your Room
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ROOM DETAILS MODAL
      ═══════════════════════════════════ */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(20px)",
          }}
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden my-8"
            style={{
              background: "var(--theme-bg-card)",
              border: "1px solid var(--theme-border)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative h-80">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {selectedRoom.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "18px",
                    color: "var(--theme-primary)",
                  }}
                >
                  {selectedRoom.subtitle}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: "var(--theme-text-muted)",
                  marginBottom: "24px",
                }}
              >
                {selectedRoom.description}
              </p>

              {/* Specs */}
              <div
                className="grid grid-cols-3 gap-4 py-5 mb-6"
                style={{
                  borderTop: "1px solid var(--theme-border)",
                  borderBottom: "1px solid var(--theme-border)",
                }}
              >
                {[
                  { icon: Maximize, label: `${selectedRoom.size} m²` },
                  { icon: BedDouble, label: selectedRoom.beds },
                  { icon: Users, label: `${selectedRoom.guests} Guests` },
                ].map((spec, i) => {
                  const Icon = spec.icon;
                  return (
                    <div key={i} className="text-center">
                      <Icon
                        className="w-5 h-5 mx-auto mb-1"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      <div
                        style={{
                          fontSize: "14px",
                          color: "var(--theme-text)",
                          fontWeight: 600,
                        }}
                      >
                        {spec.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* All Amenities */}
              <div className="mb-6">
                <h4
                  style={{
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "var(--theme-primary)",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  All Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRoom.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check
                        className="w-4 h-4"
                        style={{ color: "var(--theme-primary)" }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "var(--theme-text)",
                        }}
                      >
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price + Book */}
              <div
                className="flex items-center justify-between gap-4 pt-6"
                style={{ borderTop: "1px solid var(--theme-border)" }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--theme-text-muted)",
                      marginBottom: "2px",
                    }}
                  >
                    Starting from
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "var(--theme-primary)",
                    }}
                  >
                    ₹{Number(selectedRoom.price).toLocaleString()}
                    <span style={{ fontSize: "13px", opacity: 0.7 }}>
                      /night
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const phone = client.whatsapp || client.phone || "";
                    const msg = `Hi! I'd like to book the ${selectedRoom.name} at ${client.business_name}.`;
                    window.open(
                      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`,
                      "_blank"
                    );
                  }}
                  className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[2px] transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--theme-primary)",
                    color: "var(--theme-bg)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════
          ANIMATIONS
      ═══════════════════════════════════ */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}