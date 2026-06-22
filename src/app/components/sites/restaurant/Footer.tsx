"use client";

import { Phone, MapPin, Mail, MessageCircle, Clock } from "lucide-react";
import { Client } from "@/lib/supabase";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function Footer({ client, setPage }: Props) {
  return (
    <footer className="bg-[#050505] text-white/60 border-t border-[#D4AF37]/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {client.logo_url ? (
                <img src={client.logo_url} alt={client.business_name} className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]" />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#8B6914] rounded-full flex items-center justify-center text-2xl">🍽️</div>
              )}
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{client.business_name}</div>
                <div className="text-xs text-[#D4AF37] uppercase tracking-[3px]">{client.tagline || 'Restaurant & Bar'}</div>
              </div>
            </div>
            <p className="text-sm text-white/40 max-w-md leading-relaxed mb-6">
              {client.about?.substring(0, 150) || 'Experience the finest dining and drinks.'}...
            </p>
            {(client.facebook || client.instagram) && (
              <div className="flex gap-3">
                {client.facebook && <a href={client.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-[#D4AF37] hover:text-[#0a0a0a] rounded-full flex items-center justify-center transition-all text-sm font-bold">FB</a>}
                {client.instagram && <a href={client.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-[#D4AF37] hover:text-[#0a0a0a] rounded-full flex items-center justify-center transition-all text-sm font-bold">IG</a>}
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-4 text-sm uppercase tracking-[3px]">Explore</h3>
            <div className="space-y-3">
              {["home", "about", "menu", "gallery", "contact"].map((page) => (
                <button key={page} onClick={() => { setPage(page); window.scrollTo({ top: 0 }); }} className="block text-white/40 hover:text-[#D4AF37] transition-colors text-sm capitalize">
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D4AF37] font-bold mb-4 text-sm uppercase tracking-[3px]">Contact</h3>
            <div className="space-y-3 text-sm">
              {client.phone && <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-white/40 hover:text-[#D4AF37]"><Phone className="w-4 h-4" /> {client.phone}</a>}
              {client.email && <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-white/40 hover:text-[#D4AF37]"><Mail className="w-4 h-4" /> {client.email}</a>}
              {client.address && <div className="flex items-start gap-2 text-white/40"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {client.address}</div>}
              <div className="flex items-center gap-2 text-white/40"><Clock className="w-4 h-4" /> {client.working_hours || 'Mon-Sun: 11 AM - 11 PM'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">© {new Date().getFullYear()} {client.business_name}. All rights reserved.</p>
          <p className="text-xs text-[#D4AF37]/50">Powered by <a href="https://avbsoftware.com" className="hover:text-[#D4AF37] font-semibold" target="_blank" rel="noopener noreferrer">AVB Software</a></p>
        </div>
      </div>
    </footer>
  );
}