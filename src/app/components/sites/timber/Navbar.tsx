"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Client } from "@/lib/supabase";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
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

  const handleNavClick = (pageId: string) => {
    setPage(pageId);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-[#E8DEC8]"
          : "bg-white shadow-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => handleNavClick("home")} className="flex items-center gap-3 group">
            {client.logo_url ? (
              <img src={client.logo_url} alt={client.business_name} className="w-14 h-14 rounded-xl object-cover border-2 border-[#C9A45C] shadow-md group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
                🪵
              </div>
            )}
            <div>
              <div className="text-xl font-bold text-[#3D2817]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {client.business_name}
              </div>
              <div className="text-[10px] text-[#C9A45C] uppercase tracking-[2px] font-semibold">
                {client.tagline || 'Premium Solutions'}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-md"
                    : "text-[#6B5D4A] hover:text-[#3D2817] hover:bg-[#FAF5EA]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            {client.phone && (
              <a
                href={`tel:${client.phone}`}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#C9A45C] to-[#A88848] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-[#FAF5EA]">
              {mobileOpen ? <X className="w-6 h-6 text-[#3D2817]" /> : <Menu className="w-6 h-6 text-[#3D2817]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-white border-t border-[#E8DEC8] py-4 px-4"
        >
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white"
                    : "text-[#6B5D4A] hover:bg-[#FAF5EA]"
                }`}
              >
                {item.label}
              </button>
            ))}
            {client.phone && (
              <a href={`tel:${client.phone}`} className="block w-full text-center bg-gradient-to-r from-[#C9A45C] to-[#A88848] text-white px-4 py-3 rounded-xl text-sm font-bold mt-4">
                📞 {client.phone}
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}