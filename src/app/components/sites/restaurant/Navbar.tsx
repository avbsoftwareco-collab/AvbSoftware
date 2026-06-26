"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Client } from "@/lib/supabase";
import { useRestaurantTheme } from "./useTheme";

const NAV_ITEMS = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "menu", label: "Menu", num: "03" },
  { id: "gallery", label: "Gallery", num: "04" },
  { id: "blog", label: "Blog", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];

interface Props {
  client: Client;
  currentPage: string;
  setPage: (page: string, postSlug?: string) => void;
}

export default function Navbar({ client, currentPage, setPage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 🎨 Get theme colors based on client selection
  const theme = useRestaurantTheme(client);

  // 🔥 Filter nav items based on plan
  // Blog only visible for Professional plan
  const navItems = NAV_ITEMS.filter((item) => {
    if (item.id === "blog") {
      return client.plan_type === "professional";
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM NAVBAR                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? `${theme.bg}e6` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(4px)",
          boxShadow: scrolled ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "none",
          background: scrolled
            ? `${theme.bg}e6`
            : `linear-gradient(to bottom, ${theme.bg}b3, transparent)`,
        }}
      >
        {/* Top gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`,
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16 sm:h-18 md:h-20" : "h-20 sm:h-22 md:h-24"
            }`}
          >
            {/* ═══ LOGO + BRAND ═══ */}
            <motion.button
              onClick={() => handleNavClick("home")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              {/* Logo Image / Icon */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                {client.logo_url ? (
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center"
                  >
                    {/* Animated gold ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `1px solid ${theme.primary}4d`,
                        background: `conic-gradient(from 0deg, transparent, ${theme.primary}, transparent)`,
                        WebkitMask:
                          "radial-gradient(circle, transparent 60%, black 62%)",
                        mask: "radial-gradient(circle, transparent 60%, black 62%)",
                      }}
                    />
                    <img
                      src={client.logo_url}
                      alt={client.business_name}
                      className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                      style={{ border: `1px solid ${theme.primary}80` }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, ${theme.primary}, transparent)`,
                        WebkitMask:
                          "radial-gradient(circle, transparent 60%, black 62%)",
                        mask: "radial-gradient(circle, transparent 60%, black 62%)",
                      }}
                    />
                    <div
                      className="absolute inset-1 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.primaryDark})`,
                      }}
                    >
                      🍽️
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Brand Name - Vertically Centered with Logo */}
              <div className="flex flex-col items-start justify-center h-12 sm:h-14 md:h-16">
                {/* Business Name */}
                <div
                  className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold leading-none bg-clip-text text-transparent whitespace-nowrap"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    backgroundImage: `linear-gradient(to right, ${theme.text}, ${theme.primary}, ${theme.text})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {client.business_name}
                </div>

                {/* Tagline with decorative lines */}
                <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                  <div
                    className="h-px w-3 sm:w-4"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span
                    className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[2px] sm:tracking-[3px] font-semibold font-sans whitespace-nowrap"
                    style={{ color: theme.primary }}
                  >
                    {client.tagline || "Fine Dining"}
                  </span>
                  <div
                    className="h-px w-3 sm:w-4"
                    style={{ backgroundColor: theme.primary }}
                  />
                </div>
              </div>
            </motion.button>

            {/* ═══ DESKTOP NAV ═══ */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 xl:px-5 py-3 group"
                >
                  <div className="flex items-center gap-2">
                    {/* Number */}
                    <span
                      className="text-[9px] xl:text-[10px] font-bold tracking-wider transition-colors duration-300"
                      style={{
                        color:
                          currentPage === item.id || hoveredItem === item.id
                            ? theme.primary
                            : `${theme.primary}4d`,
                      }}
                    >
                      {item.num}
                    </span>
                    {/* Label */}
                    <span
                      className="text-xs xl:text-sm font-semibold tracking-[1.5px] xl:tracking-[2px] uppercase font-sans transition-all duration-300"
                      style={{
                        color:
                          currentPage === item.id
                            ? theme.primary
                            : theme.textMuted,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Active indicator - gold underline */}
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-3 right-3 h-[2px]"
                      style={{
                        background: `linear-gradient(to right, transparent, ${theme.primary}, transparent)`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover glow */}
                  {hoveredItem === item.id && currentPage !== item.id && (
                    <motion.div
                      layoutId="hoverNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-2 inset-y-1 rounded-sm"
                      style={{ backgroundColor: `${theme.primary}14` }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* ═══ CTA + MOBILE TOGGLE ═══ */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Reserve Button - Desktop */}
              {client.phone && (
                <motion.a
                  href={`tel:${client.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 text-[10px] lg:text-[11px] font-bold tracking-[2px] lg:tracking-[3px] uppercase font-sans relative overflow-hidden group shadow-lg"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent}, ${theme.primaryDark})`,
                    color: theme.bg,
                    boxShadow: `0 10px 25px ${theme.primary}33`,
                  }}
                >
                  {/* Shine animation */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4 relative z-10" />
                  <span className="relative z-10 hidden lg:inline">Reserve</span>
                  <span className="relative z-10 lg:hidden">Book</span>
                </motion.a>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 backdrop-blur-sm flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${theme.primary}66`,
                  backgroundColor: `${theme.primary}0d`,
                  color: theme.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                  e.currentTarget.style.color = theme.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.primary}0d`;
                  e.currentTarget.style.color = theme.primary;
                }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom subtle border line when scrolled */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.primary}33, transparent)`,
            }}
          />
        )}
      </motion.nav>

      {/* ════════════════════════════════════════════════════ */}
      {/*  PREMIUM MOBILE MENU - FULL SCREEN                  */}
      {/* ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 backdrop-blur-xl"
              style={{ backgroundColor: `${theme.bg}f2` }}
            />

            {/* Background image (subtle) */}
            {(client.hero_image || client.hero_image_url) && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 blur-2xl"
                  style={{
                    backgroundImage: `url(${client.hero_image || client.hero_image_url})`,
                  }}
                />
              </div>
            )}

            {/* Floating gold particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: theme.primary,
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative h-full flex flex-col pt-24 sm:pt-28 px-6 sm:px-8 overflow-y-auto"
            >
              {/* Decorative top ornament */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-8 sm:mb-12"
              >
                <div
                  className="h-px w-12"
                  style={{
                    background: `linear-gradient(to right, transparent, ${theme.primary})`,
                  }}
                />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-2xl"
                  style={{ color: theme.primary }}
                >
                  ✦
                </motion.span>
                <div
                  className="h-px w-12"
                  style={{
                    background: `linear-gradient(to left, transparent, ${theme.primary})`,
                  }}
                />
              </motion.div>

              {/* Nav Items */}
              <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.08 + 0.2, duration: 0.5 }}
                    onClick={() => handleNavClick(item.id)}
                    className="relative group text-left py-4 sm:py-5 px-4 sm:px-6 border-l-2 transition-all"
                    style={{
                      borderLeftColor:
                        currentPage === item.id
                          ? theme.primary
                          : `${theme.primary}26`,
                      background:
                        currentPage === item.id
                          ? `linear-gradient(to right, ${theme.primary}26, transparent)`
                          : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <span
                          className="text-xs sm:text-sm font-bold tracking-wider transition-colors"
                          style={{
                            color:
                              currentPage === item.id
                                ? theme.primary
                                : `${theme.primary}66`,
                          }}
                        >
                          {item.num}
                        </span>
                        <div>
                          <span
                            className="block text-xl sm:text-2xl md:text-3xl font-bold transition-colors"
                            style={{
                              color:
                                currentPage === item.id
                                  ? theme.primary
                                  : theme.text,
                              fontFamily: "'Playfair Display', serif",
                            }}
                          >
                            {item.label}
                          </span>
                          {currentPage === item.id && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[9px] sm:text-[10px] tracking-[2px] uppercase font-sans"
                              style={{ color: `${theme.primary}99` }}
                            >
                              — Currently Viewing
                            </motion.span>
                          )}
                        </div>
                      </div>
                      <motion.span
                        animate={{
                          x: currentPage === item.id ? 0 : -8,
                          opacity: currentPage === item.id ? 1 : 0,
                        }}
                        className="text-xl sm:text-2xl"
                        style={{ color: theme.primary }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pb-8 sm:pb-10 pt-6 sm:pt-8"
                style={{ borderTop: `1px solid ${theme.primary}26` }}
              >
                {/* Quick info */}
                <div className="text-center mb-6">
                  <p
                    className="text-[9px] sm:text-[10px] tracking-[3px] uppercase font-sans mb-2 font-semibold"
                    style={{ color: theme.primary }}
                  >
                    Get in Touch
                  </p>
                  {client.phone && (
                    <a
                      href={`tel:${client.phone}`}
                      className="text-base sm:text-lg font-bold tracking-wider transition-colors no-underline"
                      style={{ color: theme.text }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = theme.primary)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = theme.text)
                      }
                    >
                      {client.phone}
                    </a>
                  )}
                </div>

                {/* CTA Button */}
                {client.phone && (
                  <motion.a
                    href={`tel:${client.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center py-4 text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold no-underline relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent}, ${theme.primaryDark})`,
                      color: theme.bg,
                    }}
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                    <span className="relative z-10">📞 Reserve A Table</span>
                  </motion.a>
                )}

                {/* Social Links */}
                {(client.instagram || client.facebook) && (
                  <div className="flex items-center justify-center gap-3 mt-6">
                    {client.instagram && (
                      <motion.a
                        href={client.instagram}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          border: `1px solid ${theme.primary}4d`,
                          backgroundColor: `${theme.primary}0d`,
                          color: theme.primary,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.primary;
                          e.currentTarget.style.color = theme.bg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${theme.primary}0d`;
                          e.currentTarget.style.color = theme.primary;
                        }}
                      >
                        IG
                      </motion.a>
                    )}
                    {client.facebook && (
                      <motion.a
                        href={client.facebook}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          border: `1px solid ${theme.primary}4d`,
                          backgroundColor: `${theme.primary}0d`,
                          color: theme.primary,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = theme.primary;
                          e.currentTarget.style.color = theme.bg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${theme.primary}0d`;
                          e.currentTarget.style.color = theme.primary;
                        }}
                      >
                        FB
                      </motion.a>
                    )}
                  </div>
                )}

                {/* Bottom tagline */}
                <p
                  className="text-center text-[9px] sm:text-[10px] tracking-[2px] uppercase font-sans mt-6 sm:mt-8"
                  style={{ color: `${theme.text}4d` }}
                >
                  © {new Date().getFullYear()} {client.business_name}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? "h-16 sm:h-18 md:h-20" : "h-20 sm:h-22 md:h-24"
        }`}
      />
    </>
  );
}