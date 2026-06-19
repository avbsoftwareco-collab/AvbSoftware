"use client";

import { Phone, Mail, MapPin, MessageCircle, Heart, Star, Gift, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Client } from "@/lib/supabase";

export default function DynamicCakeSite({ client }: { client: Client }) {
  const whatsappUrl = client.whatsapp 
    ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` 
    : '#';

  return (
    <>
      <style jsx global>{`
        body > header,
        body > nav,
        body > footer,
        body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#FFF5F7]">
        {/* Preview Banner */}
        <div className="bg-gradient-to-r from-[#D4647C] to-[#B84960] text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden sm:inline">
                🌐 <strong>{client.subdomain}.avbsoftware.com</strong>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                client.status === 'live' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 text-white'
              }`}>
                {client.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
              </span>
            </div>
          </div>
        </div>

        {/* ===== NAVBAR WITH LOGO ===== */}
        <nav className="bg-white sticky top-12 z-40 shadow-lg border-b border-[#F8D8E0]">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* LOGO */}
              {client.logo_url ? (
                <img 
                  src={client.logo_url}
                  alt={client.business_name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#D4647C]"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center text-2xl">
                  🎂
                </div>
              )}
              <div>
                <div className="text-xl font-bold text-[#5C2837]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {client.business_name}
                </div>
                <div className="text-[10px] text-[#D4647C] uppercase tracking-wider">
                  {client.tagline || 'Bakery & Cake Studio'}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {["Home", "Menu", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#5C2837] hover:text-[#D4647C] transition-colors font-medium">
                  {item}
                </a>
              ))}
              {client.phone && (
                <a
                  href={`tel:${client.phone}`}
                  className="bg-gradient-to-r from-[#D4647C] to-[#B84960] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md"
                >
                  📞 Order Now
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* ===== HERO WITH IMAGE ===== */}
        <section id="home" className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] via-[#FFE5EC] to-[#FFD0DC]"></div>
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#D4647C]/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#D4647C]/10 border border-[#D4647C]/20 px-4 py-2 rounded-full text-[#D4647C] text-xs font-bold uppercase tracking-wider mb-6">
                  <Heart className="w-4 h-4 fill-[#D4647C]" />
                  {client.city}&apos;s Most Loved Bakery
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#5C2837]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {client.business_name}
                  <br />
                  <span className="italic text-[#D4647C] text-3xl md:text-4xl">
                    {client.tagline || 'Made with Love'}
                  </span>
                </h1>

                <p className="text-lg text-[#7A4B5C] mb-8 leading-relaxed">
                  {client.about || `${client.city}'s favorite bakery for fresh cakes and treats.`}
                </p>

                <div className="flex flex-wrap gap-4">
                  {client.whatsapp && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#D4647C] to-[#B84960] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Order on WhatsApp
                    </a>
                  )}
                  {client.phone && (
                    <a
                      href={`tel:${client.phone}`}
                      className="bg-white text-[#D4647C] border-2 border-[#D4647C] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1"
                    >
                      <Phone className="w-5 h-5" />
                      {client.phone}
                    </a>
                  )}
                </div>
              </div>

              {/* HERO IMAGE */}
              <div className="relative">
                {client.hero_image_url ? (
                  <img 
                    src={client.hero_image_url}
                    alt={client.business_name}
                    className="aspect-square w-full object-cover rounded-3xl border-4 border-[#F8D8E0] shadow-2xl"
                  />
                ) : (
                  <div className="aspect-square bg-white rounded-3xl border-4 border-[#F8D8E0] flex items-center justify-center text-9xl shadow-2xl">
                    🎂
                  </div>
                )}
                <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-2xl font-bold text-sm border-2 border-[#F8D8E0]">
                  🍰 Fresh Daily
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#D4647C] text-white px-4 py-2 rounded-full shadow-2xl font-bold text-sm">
                  💝 Made with Love
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MENU WITH PRODUCT IMAGES ===== */}
        {client.products && client.products.length > 0 && (
          <section id="menu" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-[#D4647C] text-sm font-bold uppercase tracking-[2px] mb-3">— Our Menu</div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C2837] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sweet <span className="italic text-[#D4647C]">Delights</span>
                </h2>
                <p className="text-[#7A4B5C]">Freshly baked daily with premium ingredients</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {client.products.map((product, index) => (
                  <div key={index} className="bg-[#FFF5F7] rounded-3xl border border-[#F8D8E0] hover:border-[#D4647C] hover:shadow-xl hover:-translate-y-2 transition-all overflow-hidden">
                    {/* PRODUCT IMAGE */}
                    {product.image_url ? (
                      <img 
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-[#FFE5EC] to-[#F8D8E0] flex items-center justify-center text-6xl">
                        🎂
                      </div>
                    )}
                    
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-[#5C2837] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {product.name}
                      </h3>
                      <div className="text-[#D4647C] font-bold text-lg mb-2">{product.price}</div>
                      {product.description && (
                        <p className="text-[#7A4B5C] text-xs">{product.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== REVIEWS ===== */}
        {client.reviews && client.reviews.length > 0 && (
          <section className="py-20 bg-[#FFF5F7]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C2837] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sweet <span className="italic text-[#D4647C]">Reviews</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {client.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-7 rounded-3xl border border-[#F8D8E0]">
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4647C] text-[#D4647C]" />
                      ))}
                    </div>
                    <p className="text-[#7A4B5C] italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      &quot;{review.text}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#F8D8E0]">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-full flex items-center justify-center text-white font-bold">
                        {review.name?.[0] || 'C'}
                      </div>
                      <div>
                        <div className="font-bold text-[#5C2837]">{review.name}</div>
                        {review.role && <div className="text-xs text-[#D4647C]">{review.role}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-20 bg-gradient-to-br from-[#FFE5EC] to-[#FFD0DC]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#5C2837] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Order <span className="italic text-[#D4647C]">Today!</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {client.phone && (
                <a href={`tel:${client.phone}`} className="bg-white p-6 rounded-3xl border border-[#F8D8E0] hover:border-[#D4647C] hover:shadow-xl transition-all text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-[#5C2837] mb-1">Call Us</div>
                  <div className="text-[#7A4B5C] text-sm">{client.phone}</div>
                </a>
              )}
              {client.whatsapp && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-3xl border border-[#F8D8E0] hover:border-[#D4647C] hover:shadow-xl transition-all text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-[#5C2837] mb-1">WhatsApp</div>
                  <div className="text-[#7A4B5C] text-sm">Chat Now</div>
                </a>
              )}
              {client.address && (
                <div className="bg-white p-6 rounded-3xl border border-[#F8D8E0] text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold text-[#5C2837] mb-1">Visit Us</div>
                  <div className="text-[#7A4B5C] text-sm">{client.address}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== FOOTER WITH LOGO ===== */}
        <footer className="bg-[#5C2837] text-[#FFD0DC] py-8 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              {client.logo_url ? (
                <img 
                  src={client.logo_url}
                  alt={client.business_name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <span className="text-2xl">🎂</span>
              )}
              <div className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {client.business_name}
              </div>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} {client.business_name}. Made with 💝</p>
            <p className="text-xs mt-2 text-[#D4647C]">
              Powered by{" "}
              <a href="https://avbsoftware.com" className="hover:underline">
                AVB Software
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}