"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Client } from "@/lib/supabase";

interface Props {
  client: Client;
  setPage: (page: string) => void;
  theme?: any;
}

export default function Footer({ client, setPage, theme }: Props) {
  // ✅ Theme colors with safe fallback
  const colors = theme?.colors || {
    bg: "#0F1F1F",
    primary: "#D4AF37",
    accent: "#B89030",
    text: "#F0F5F0",
    border: "rgba(212, 175, 55, 0.15)",
  };

  return (
    <footer
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
      style={{
        background: "#0A1515",
        color: colors.text,
      }}
    >
      {/* Decorative top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
        }}
      />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top - Brand Center */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {/* Ornament */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="h-px w-16 sm:w-24"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.primary})`,
                }}
              />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-3xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.span>
              <div
                className="h-px w-16 sm:w-24"
                style={{
                  background: `linear-gradient(to left, transparent, ${colors.primary})`,
                }}
              />
            </div>

            {/* Brand Name */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-none bg-clip-text text-transparent"
              style={{
                fontFamily: "'Italiana', serif",
                letterSpacing: "2px",
                backgroundImage: `linear-gradient(to right, ${colors.text}, ${colors.primary}, ${colors.text})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {client.business_name}
            </h2>

            <p
              className="text-xs sm:text-sm tracking-[6px] uppercase mt-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: colors.primary,
              }}
            >
              {client.tagline || "Atelier de Pâtisserie"}
            </p>
          </motion.div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4
              className="text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{
                fontFamily: "'Cinzel', serif",
                color: colors.primary,
              }}
            >
              — Navigation —
            </h4>
            <div className="space-y-3">
              {["home", "heritage", "collection", "gallery", "contact"].map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setPage(page)}
                    className="block w-full md:text-left text-center text-sm capitalize transition-colors hover:opacity-100"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "16px",
                      color: `${colors.text}99`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = `${colors.text}99`)
                    }
                  >
                    {page === "contact" ? "Reserve" : page}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4
              className="text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{
                fontFamily: "'Cinzel', serif",
                color: colors.primary,
              }}
            >
              — Contact —
            </h4>
            <div className="space-y-3">
              {client.phone && (
                <a
                  href={`tel:${client.phone}`}
                  className="flex items-center justify-center gap-2 transition-colors text-sm no-underline"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                    color: `${colors.text}99`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.primary)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = `${colors.text}99`)
                  }
                >
                  <Phone className="w-3.5 h-3.5" /> {client.phone}
                </a>
              )}
              {client.email && (
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center justify-center gap-2 transition-colors text-sm no-underline"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                    color: `${colors.text}99`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.primary)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = `${colors.text}99`)
                  }
                >
                  <Mail className="w-3.5 h-3.5" /> {client.email}
                </a>
              )}
              {client.working_hours && (
                <div
                  className="flex items-center justify-center gap-2 text-sm"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "16px",
                    color: `${colors.text}99`,
                  }}
                >
                  <Clock className="w-3.5 h-3.5" /> {client.working_hours}
                </div>
              )}
            </div>
          </div>

          {/* Visit */}
          <div className="text-center md:text-right">
            <h4
              className="text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{
                fontFamily: "'Cinzel', serif",
                color: colors.primary,
              }}
            >
              — Visit Us —
            </h4>
            {client.address && (
              <div
                className="flex items-start md:justify-end justify-center gap-2 mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  color: `${colors.text}99`,
                }}
              >
                <MapPin
                  className="w-4 h-4 mt-1 shrink-0"
                  style={{ color: colors.primary }}
                />
                <span>
                  {client.address}
                  <br />
                  {client.city}
                </span>
              </div>
            )}

            {/* Socials */}
            {(client.instagram || client.facebook) && (
              <div className="flex md:justify-end justify-center gap-3 mt-4">
                {client.instagram && (
                  <a
                    href={client.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-all text-xs font-bold"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      border: `1px solid ${colors.primary}4D`,
                      background: `${colors.primary}0D`,
                      color: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${colors.primary}0D`;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    IG
                  </a>
                )}
                {client.facebook && (
                  <a
                    href={client.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center transition-all text-xs font-bold"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      border: `1px solid ${colors.primary}4D`,
                      background: `${colors.primary}0D`,
                      color: colors.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.primary;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${colors.primary}0D`;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    FB
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Border */}
        <div
          className="pt-8 text-center"
          style={{ borderTop: `1px solid ${colors.primary}26` }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: `${colors.primary}4D` }}
            />
            <span className="text-sm" style={{ color: colors.primary }}>
              ✦
            </span>
            <div
              className="h-px w-12"
              style={{ background: `${colors.primary}4D` }}
            />
          </div>
          <p
            className="text-xs sm:text-sm tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: `${colors.text}66`,
            }}
          >
            © {new Date().getFullYear()} {client.business_name}. All rights
            reserved.
          </p>
          <p
            className="text-[10px] tracking-[3px] uppercase mt-2"
            style={{
              fontFamily: "'Cinzel', serif",
              color: `${colors.primary}99`,
            }}
          >
            Crafted by{" "}
            <a
              href="https://avbsoftware.com"
              className="hover:opacity-100"
              target="_blank"
              rel="noreferrer"
              style={{ color: colors.primary }}
            >
              AVB Software
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}