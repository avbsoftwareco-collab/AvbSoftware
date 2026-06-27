"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Client } from "@/lib/supabase";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "heritage", label: "Heritage" },
  { id: "collection", label: "Collection" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Reserve" },
];

interface Props {
  client: Client;
  currentPage: string;
  setPage: (page: string) => void;
  theme?: any;
}

export default function Navbar({ client, currentPage, setPage, theme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Theme colors with safe fallback
  const colors = theme?.colors || {
    bg: "#0F1F1F",
    primary: "#D4AF37",
    accent: "#B89030",
    text: "#F0F5F0",
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (pageId: string) => {
    setPage(pageId);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
        }`}
        style={{
          fontFamily: "'Inter', sans-serif",
          background: scrolled ? `${colors.bg}F2` : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(20px) saturate(180%)"
            : "none",
          boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
          }}
        />

        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* ✅ Desktop: 3-column grid | Mobile: flex with logo left + menu right */}
          <div className="flex lg:grid lg:grid-cols-3 items-center justify-between">
            {/* ═══ LEFT: Logo + Text ═══ */}
            <motion.button
              onClick={() => handleNavClick("home")}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 sm:gap-3 group lg:justify-self-start min-w-0 flex-1 lg:flex-initial"
            >
              <div className="relative flex-shrink-0">
                {client.logo_url ? (
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${colors.primary}, transparent)`,
                        WebkitMask:
                          "radial-gradient(circle, transparent 60%, black 62%)",
                        mask: "radial-gradient(circle, transparent 60%, black 62%)",
                      }}
                    />
                    <img
                      src={client.logo_url}
                      alt={client.business_name}
                      className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                      style={{ border: `1px solid ${colors.primary}66` }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                    style={{ border: `1px solid ${colors.primary}` }}
                  >
                    🎂
                  </div>
                )}
              </div>

              <div className="text-center min-w-0">
                <div
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-tight whitespace-nowrap truncate"
                  style={{
                    fontFamily: "'Italiana', serif",
                    letterSpacing: "1px",
                    background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.primary} 50%, ${colors.text} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {client.business_name}
                </div>
                <div
                  className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] uppercase tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] mt-0.5 sm:mt-1 font-semibold whitespace-nowrap truncate"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: colors.primary,
                  }}
                >
                  ✦ {client.tagline || "Atelier de Pâtisserie"} ✦
                </div>
              </div>
            </motion.button>

            {/* ═══ CENTER: Nav Links (Desktop Only) ═══ */}
            <div className="hidden lg:flex items-center justify-center gap-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-4 xl:px-5 py-3 group"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span
                    className="text-[11px] xl:text-xs font-medium tracking-[3px] uppercase transition-colors duration-300"
                    style={{
                      color:
                        currentPage === item.id
                          ? colors.primary
                          : `${colors.text}B3`,
                    }}
                  >
                    {item.label}
                  </span>

                  {currentPage === item.id && (
                    <motion.div
                      layoutId="cakeActiveNav"
                      className="absolute -bottom-0.5 left-4 right-4 h-px"
                      style={{
                        background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* ═══ RIGHT: Reserve Button + Mobile Toggle ═══ */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
              {/* Reserve Button - Desktop only */}
              {client.phone && (
                <motion.a
                  href={`tel:${client.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 text-[10px] lg:text-[11px] font-bold tracking-[2px] lg:tracking-[3px] uppercase relative overflow-hidden group"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: colors.bg,
                  }}
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5 relative z-10" />
                  <span className="relative z-10">Reserve</span>
                </motion.a>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  border: `1px solid ${colors.primary}66`,
                  background: `${colors.primary}1A`,
                  color: colors.primary,
                }}
                aria-label="Menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="m"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.primary}4D, transparent)`,
            }}
          />
        )}
      </motion.nav>

      {/* ═══ MOBILE FULL SCREEN MENU ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden backdrop-blur-xl"
            style={{ background: `${colors.bg}F9` }}
          >
            {/* Floating gold particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    background: colors.primary,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative h-full flex flex-col pt-20 sm:pt-24 px-6 sm:px-8 overflow-y-auto"
            >
              {/* Header Ornament */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div
                    className="h-px w-10 sm:w-12"
                    style={{
                      background: `linear-gradient(to right, transparent, ${colors.primary})`,
                    }}
                  />
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-xl sm:text-2xl"
                    style={{ color: colors.primary }}
                  >
                    ✦
                  </motion.span>
                  <div
                    className="h-px w-10 sm:w-12"
                    style={{
                      background: `linear-gradient(to left, transparent, ${colors.primary})`,
                    }}
                  />
                </div>
                <p
                  className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: colors.primary,
                  }}
                >
                  Navigation
                </p>
              </div>

              {/* Nav Items */}
              <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-3 max-w-sm mx-auto w-full">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    onClick={() => handleNavClick(item.id)}
                    className="text-center py-4 sm:py-5 px-6 rounded-lg transition-all"
                    style={{
                      border:
                        currentPage === item.id
                          ? `1px solid ${colors.primary}`
                          : `1px solid ${colors.primary}33`,
                      background:
                        currentPage === item.id
                          ? `${colors.primary}1A`
                          : "transparent",
                    }}
                  >
                    <span
                      className="text-2xl sm:text-3xl md:text-4xl tracking-wide block"
                      style={{
                        fontFamily: "'Italiana', serif",
                        color:
                          currentPage === item.id ? colors.primary : colors.text,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom CTA */}
              <div
                className="pb-6 sm:pb-8 pt-5 sm:pt-6 border-t"
                style={{ borderColor: `${colors.primary}33` }}
              >
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    className="block text-center py-3 sm:py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-bold no-underline rounded-lg"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
                      color: colors.bg,
                    }}
                  >
                    ✦ Call {client.phone}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={scrolled ? "h-[60px] sm:h-[68px]" : "h-[72px] sm:h-[88px] md:h-[96px]"} />
    </>
  );
}