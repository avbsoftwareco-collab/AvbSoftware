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
}

export default function Navbar({ client, currentPage, setPage }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
          scrolled
            ? "bg-[#0F1F1F]/95 backdrop-blur-xl shadow-2xl shadow-emerald-950/50 py-3"
            : "bg-transparent py-5"
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparentvia-[var(--theme-primary)] to-transparent opacity-60" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick("home")}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                {client.logo_url ? (
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                    {/* Rotating gold ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, transparent, #D4AF37, transparent)`,
                        WebkitMask: 'radial-gradient(circle, transparent 60%, black 62%)',
                        mask: 'radial-gradient(circle, transparent 60%, black 62%)',
                      }}
                    />
                    <img
                      src={client.logo_url}
                      alt={client.business_name}
                      className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover border border-[var(--theme-primary)]/40"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[var(--theme-primary)] rounded-full flex items-center justify-center text-xl sm:text-2xl">
                    🎂
                  </div>
                )}
              </div>

              <div>
                <div
                  className="text-lg sm:text-xl md:text-2xl font-normal leading-none bg-gradient-to-r from-[#F0F5F0]via-[var(--theme-primary)] to-[#F0F5F0] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Italiana', serif", letterSpacing: '1px' }}
                >
                  {client.business_name}
                </div>
                <div
                  className="text-[8px] sm:text-[9px]text-[var(--theme-primary)] uppercase tracking-[3px] sm:tracking-[4px] mt-1 font-semibold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  ✦ {client.tagline || "Atelier de Pâtisserie"} ✦
                </div>
              </div>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-5 xl:px-6 py-3 group"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span className={`text-[11px] xl:text-xs font-medium tracking-[3px] uppercase transition-colors duration-300 ${
                    currentPage === item.id
                      ? "text-[#D4AF37]"
                      : "text-[#F0F5F0]/70 group-hover:text-[#D4AF37]"
                  }`}>
                    {item.label}
                  </span>
                  
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="cakeActiveNav"
                      className="absolute -bottom-0.5 left-4 right-4 h-px bg-gradient-to-r from-transparentvia-[var(--theme-primary)] to-transparent"
                    />
                  )}

                  {currentPage !== item.id && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-pxbg-[var(--theme-primary)] group-hover:w-1/2 transition-all duration-300" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA + Mobile */}
            <div className="flex items-center gap-3">
              {client.phone && (
                <motion.a
                  href={`tel:${client.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-5 lg:px-7 py-2.5 lg:py-3 bg-gradient-to-br from-[var(--theme-primary)] via-[#C9A227] to-[#B89030] text-[#0F1F1F] text-[10px] lg:text-[11px] font-bold tracking-[3px] uppercase relative overflow-hidden group"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {/* Shine animation */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5 relative z-10" />
                  <span className="relative z-10 hidden lg:inline">Reserve</span>
                  <span className="relative z-10 lg:hidden">Call</span>
                </motion.a>
              )}

              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 border border-[var(--theme-primary)]/40bg-[var(--theme-primary)]/5 flex items-center justify-centertext-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-all"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom subtle line on scroll */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparentvia-[var(--theme-primary)]/30 to-transparent"
          />
        )}
      </motion.nav>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0F1F1F]/98 backdrop-blur-xl"
          >
            {/* Floating gold particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1bg-[var(--theme-primary)] rounded-full"
                  style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
                  animate={{ y: [-20, 20, -20], opacity: [0.3, 0.7, 0.3], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative h-full flex flex-col pt-24 px-8 overflow-y-auto"
            >
              {/* Ornament */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="text-[#D4AF37] text-2xl">✦</motion.span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
                </div>
                <p className="text-[#D4AF37] text-[10px] tracking-[5px] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Navigation</p>
              </div>

              {/* Nav Items */}
              <div className="flex-1 flex flex-col justify-center space-y-3">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-center py-5 px-6 border transition-all ${
                      currentPage === item.id
                        ? "border-[var(--theme-primary)]bg-[var(--theme-primary)]/10"
                        : "border-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)]/50"
                    }`}
                  >
                    <span
                      className={`text-3xl sm:text-4xl tracking-wide block ${
                        currentPage === item.id ? "text-[#D4AF37]" : "text-[#F0F5F0]"
                      }`}
                      style={{ fontFamily: "'Italiana', serif" }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="pb-8 pt-6 border-t border-[var(--theme-primary)]/20">
                {client.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    className="block text-center py-4 bg-gradient-to-r from-[var(--theme-primary)] to-[#B89030] text-[#0F1F1F] text-[11px] tracking-[4px] uppercase font-bold no-underline"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    ✦ Reserve {client.phone}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className={scrolled ? "h-[68px]" : "h-[88px] sm:h-[96px]"} />
    </>
  );
}