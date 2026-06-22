"use client";

import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { Client } from "@/lib/supabase";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function Footer({ client, setPage }: Props) {
  return (
    <footer className="bg-[#1F1208] text-[#E8D5B5]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {client.logo_url ? (
                <img src={client.logo_url} alt={client.business_name} className="w-14 h-14 rounded-xl object-cover border-2 border-[#C9A45C]" />
              ) : (
                <div className="w-14 h-14 bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] rounded-xl flex items-center justify-center text-2xl">🪵</div>
              )}
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{client.business_name}</div>
                <div className="text-xs text-[#C9A45C] uppercase tracking-[2px]">{client.tagline}</div>
              </div>
            </div>
            <p className="text-sm text-[#E8D5B5]/70 max-w-md leading-relaxed mb-6">
              {client.about?.substring(0, 150) || 'Premium quality products and services.'}...
            </p>
            {(client.facebook || client.instagram) && (
              <div className="flex gap-3">
                {client.facebook && <a href={client.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#C9A45C] rounded-xl flex items-center justify-center transition-all text-sm font-bold">FB</a>}
                {client.instagram && <a href={client.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#C9A45C] rounded-xl flex items-center justify-center transition-all text-sm font-bold">IG</a>}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-[2px]">Quick Links</h3>
            <div className="space-y-3">
              {["home", "about", "products", "gallery", "contact"].map((page) => (
                <button key={page} onClick={() => { setPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="block text-[#E8D5B5]/70 hover:text-[#C9A45C] transition-colors text-sm capitalize">
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-[2px]">Contact</h3>
            <div className="space-y-3 text-sm">
              {client.phone && <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-[#E8D5B5]/70 hover:text-[#C9A45C]"><Phone className="w-4 h-4" /> {client.phone}</a>}
              {client.email && <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-[#E8D5B5]/70 hover:text-[#C9A45C]"><Mail className="w-4 h-4" /> {client.email}</a>}
              {client.address && <div className="flex items-start gap-2 text-[#E8D5B5]/70"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {client.address}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#E8D5B5]/50">© {new Date().getFullYear()} {client.business_name}. All rights reserved.</p>
          <p className="text-xs text-[#C9A45C]">Powered by <a href="https://avbsoftware.com" className="hover:underline font-semibold" target="_blank" rel="noopener noreferrer">AVB Software</a></p>
        </div>
      </div>
    </footer>
  );
}