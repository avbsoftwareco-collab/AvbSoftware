"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Client } from "@/lib/supabase";

export default function Footer({ client, setPage }: { client: Client; setPage: (p: string) => void }) {
  return (
    <footer className="relative bg-[#0A1515] text-[#F0F5F0] py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparentvia-[var(--theme-primary)] to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }} />

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
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[#D4AF37] text-3xl"
              >
                ✦
              </motion.span>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
            </div>

            {/* Brand Name - HUGE */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal bg-gradient-to-r from-[#F0F5F0]via-[var(--theme-primary)] to-[#F0F5F0] bg-clip-text text-transparent leading-none"
              style={{ fontFamily: "'Italiana', serif", letterSpacing: '2px' }}
            >
              {client.business_name}
            </h2>

            <p
              className="text-[#D4AF37] text-xs sm:text-sm tracking-[6px] uppercase mt-4"
              style={{ fontFamily: "'Cinzel', serif" }}
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
              className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              — Navigation —
            </h4>
            <div className="space-y-3">
              {["home", "heritage", "collection", "gallery", "contact"].map((page) => (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className="block w-full md:text-left text-center text-[#F0F5F0]/60 hover:text-[#D4AF37] text-sm capitalize transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}
                >
                  {page === "contact" ? "Reserve" : page}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4
              className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              — Contact —
            </h4>
            <div className="space-y-3">
              {client.phone && (
                <a href={`tel:${client.phone}`} className="flex items-center justify-center gap-2 text-[#F0F5F0]/60 hover:text-[#D4AF37] transition-colors text-sm no-underline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}>
                  <Phone className="w-3.5 h-3.5" /> {client.phone}
                </a>
              )}
              {client.email && (
                <a href={`mailto:${client.email}`} className="flex items-center justify-center gap-2 text-[#F0F5F0]/60 hover:text-[#D4AF37] transition-colors text-sm no-underline" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}>
                  <Mail className="w-3.5 h-3.5" /> {client.email}
                </a>
              )}
              {client.working_hours && (
                <div className="flex items-center justify-center gap-2 text-[#F0F5F0]/60 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}>
                  <Clock className="w-3.5 h-3.5" /> {client.working_hours}
                </div>
              )}
            </div>
          </div>

          {/* Visit */}
          <div className="text-center md:text-right">
            <h4
              className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase mb-5 font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              — Visit Us —
            </h4>
            {client.address && (
              <div className="flex items-start md:justify-end justify-center gap-2 text-[#F0F5F0]/60 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}>
                <MapPin className="w-4 h-4 mt-1 shrink-0text-[var(--theme-primary)]" />
                <span>{client.address}<br />{client.city}</span>
              </div>
            )}
            
            {/* Socials */}
         {/* Socials */}
{(client.instagram || client.facebook) && (
  <div className="flex md:justify-end justify-center gap-3 mt-4">
    {client.instagram && (
      <a 
        href={client.instagram} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 border border-[var(--theme-primary)]/30bg-[var(--theme-primary)]/5 flex items-center justify-centertext-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-all text-xs font-bold"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        IG
      </a>
    )}
    {client.facebook && (
      <a 
        href={client.facebook} 
        target="_blank" 
        rel="noreferrer" 
        className="w-10 h-10 border border-[var(--theme-primary)]/30bg-[var(--theme-primary)]/5 flex items-center justify-centertext-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-all text-xs font-bold"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        FB
      </a>
    )}
  </div>
)}
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-[var(--theme-primary)]/15 pt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12bg-[var(--theme-primary)]/30" />
            <span className="text-[#D4AF37] text-sm">✦</span>
            <div className="h-px w-12bg-[var(--theme-primary)]/30" />
          </div>
          <p className="text-[#F0F5F0]/40 text-xs sm:text-sm tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            © {new Date().getFullYear()} {client.business_name}. All rights reserved.
          </p>
          <p className="text-[#D4AF37]/60 text-[10px] tracking-[3px] uppercase mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            Crafted by <a href="https://avbsoftware.com" className="hover:text-[#D4AF37]" target="_blank" rel="noreferrer">AVB Software</a>
          </p>
        </div>
      </div>
    </footer>
  );
}