"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Phone, MessageCircle, Award, Shield, Truck, Star, 
  CheckCircle, Heart, Zap, BadgeCheck, Users, Calendar, 
  Package, ArrowRight, ThumbsUp, Clock, MapPin, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { Client } from "@/lib/supabase";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/[^0-9]/g, '')) || 0;
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = num / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function HomePage({ client, setPage }: Props) {
  const whatsappUrl = client.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` : '#';
  const [activeReview, setActiveReview] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!client.reviews || client.reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % (client.reviews?.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [client.reviews]);

  const allImages = [
    ...(client.hero_image_url ? [client.hero_image_url] : []),
    ...(client.products?.map(p => p.image_url).filter(Boolean) as string[] || []),
    ...(client.gallery_images || []),
  ];

  return (
    <div>

      {/* ═══════════════════════════════════════════════════
          HERO - FULL WIDTH CINEMATIC
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          {client.hero_image_url ? (
            <>
              <motion.img src={client.hero_image_url} alt={client.business_name} className="w-full h-full object-cover" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: "easeOut" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/95 via-[#0a0502]/40 to-[#0a0502]/10"></div>
<div className="absolute inset-0 bg-gradient-to-r from-[#0a0502]/80 via-[#0a0502]/40 to-transparent"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0502] via-[#2a1a0e] to-[#4a2c15]"></div>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="inline-flex items-center gap-2 bg-[#C9A45C]/10 backdrop-blur-xl border border-[#C9A45C]/20 px-6 py-3 rounded-full text-[#C9A45C] text-[11px] font-bold uppercase tracking-[4px]">
                <Award className="w-4 h-4" />
                {client.city}&apos;s Premium Supplier
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-6xl md:text-7xl lg:text-[100px] font-bold text-white leading-[0.9] mt-8 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {client.business_name}
            </motion.h1>

            <motion.div initial={{ width: 0 }} animate={{ width: 100 }} transition={{ delay: 0.8, duration: 1 }} className="h-[3px] bg-gradient-to-r from-[#C9A45C] to-transparent mb-6" />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-2xl md:text-3xl text-[#C9A45C]/90 italic mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              {client.tagline || 'Premium Wood Solutions'}
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-base md:text-lg text-white/50 mb-10 leading-relaxed max-w-xl">
              {client.about?.substring(0, 160) || `Premium quality products and services in ${client.city}.`}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-4">
              {client.phone && (
                <motion.a href={`tel:${client.phone}`} className="bg-[#C9A45C] text-[#0a0502] font-bold px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-2xl shadow-[#C9A45C]/20 relative overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Phone className="w-5 h-5" /> {client.phone}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                </motion.a>
              )}
              {client.whatsapp && (
                <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-2xl shadow-green-500/20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </motion.a>
              )}
              <motion.button onClick={() => setPage("products")} className="bg-white/5 backdrop-blur-xl text-white border border-white/10 font-semibold px-8 py-4 rounded-full flex items-center gap-3 text-lg hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }}>
                View Products <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
            <motion.div className="w-1 h-2 bg-[#C9A45C] rounded-full" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════════════ */}
      <section className="bg-[#0a0502] py-14 border-t border-[#C9A45C]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { value: client.years_experience || "15", suffix: "+", label: "Years Experience", icon: Calendar },
              { value: client.happy_customers || "5000", suffix: "+", label: "Happy Customers", icon: Users },
              { value: "500", suffix: "+", label: "Products", icon: Package },
              { value: "100", suffix: "%", label: "Quality Assured", icon: BadgeCheck },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <stat.icon className="w-8 h-8 text-[#C9A45C] mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-[2px] font-medium">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT PREVIEW - Minimal & Aesthetic
          ═══════════════════════════════════════════════════ */}
      {client.about && (
        <section className="py-28 bg-[#FEFCF8]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
              <FadeIn>
                <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Our Story</div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#0a0502] mb-8 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  About<br /><span className="italic text-[#8B6F47]">{client.business_name}</span>
                </h2>
                <div className="w-16 h-[2px] bg-[#C9A45C] mb-8"></div>
                <p className="text-lg text-[#6B5D4A] leading-[1.9] mb-10">
                  {client.about.substring(0, 350)}
                  {client.about.length > 350 && "..."}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { label: "Established", value: client.established_year || "2010" },
                    { label: "Experience", value: `${client.years_experience || '15'}+ Years` },
                    { label: "Customers", value: `${client.happy_customers || '5000'}+` },
                    { label: "Quality", value: "100% Assured" },
                  ].map((item) => (
                    <div key={item.label} className="border-l-2 border-[#C9A45C] pl-4">
                      <div className="text-xs text-[#C9A45C] uppercase tracking-[2px] font-semibold mb-1">{item.label}</div>
                      <div className="text-lg font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setPage("about")} className="group flex items-center gap-3 text-[#8B6F47] font-semibold text-lg hover:gap-5 transition-all">
                  Read Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative">
                  {client.hero_image_url ? (
                    <div className="relative">
                      <img src={client.hero_image_url} alt={client.business_name} className="w-full rounded-[2rem] shadow-2xl object-cover aspect-[3/4] max-h-[600px]" />
                      <div className="absolute -bottom-8 -right-8 bg-[#0a0502] text-white p-8 rounded-2xl shadow-2xl">
                        <div className="text-5xl font-bold text-[#C9A45C]" style={{ fontFamily: "'Playfair Display', serif" }}>{client.years_experience || '15'}+</div>
                        <div className="text-sm text-white/60 mt-1">Years of Trust</div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[3/4] max-h-[600px] bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] rounded-[2rem] flex items-center justify-center text-9xl">🪵</div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          WHY CHOOSE US - Minimal Cards
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f5f0e8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Why Us</div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0a0502] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose <span className="italic text-[#8B6F47]">Us?</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Premium Quality", desc: "Only the finest materials from trusted sources." },
              { icon: Truck, title: "Free Delivery", desc: `Fast delivery within ${client.city}.` },
              { icon: Shield, title: "Guaranteed", desc: "100% quality guarantee on everything." },
              { icon: Zap, title: "Best Prices", desc: "Competitive pricing in the market." },
              { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority." },
              { icon: BadgeCheck, title: "Trusted Brand", desc: `${client.happy_customers || '5000'}+ happy customers.` },
            ].map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} className="bg-white p-10 rounded-3xl border border-[#E8DEC8]/50 hover:border-[#C9A45C]/30 hover:shadow-2xl hover:shadow-[#C9A45C]/5 transition-all duration-500 group">
                  <div className="w-14 h-14 bg-[#0a0502] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C9A45C] transition-colors duration-500">
                    <item.icon className="w-7 h-7 text-[#C9A45C] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0502] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <p className="text-[#6B5D4A] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCTS PREVIEW - Aesthetic Grid
          ═══════════════════════════════════════════════════ */}
      {client.products && client.products.length > 0 && (
        <section className="py-28 bg-[#FEFCF8]">
          <div className="container mx-auto px-4">
            <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Products</div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our <span className="italic text-[#8B6F47]">Products</span>
                </h2>
              </div>
              <button onClick={() => setPage("products")} className="mt-6 md:mt-0 group flex items-center gap-3 text-[#8B6F47] font-semibold text-lg hover:gap-5 transition-all">
                View All <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {client.products.slice(0, 6).map((product, i) => (
                <ScaleIn key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden border border-[#E8DEC8]/50 hover:shadow-2xl hover:shadow-[#C9A45C]/10 transition-all duration-500">
                    <div className="relative overflow-hidden h-72">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#f5f0e8] to-[#E8DCC4] flex items-center justify-center text-8xl">🪵</div>
                      )}
                      <div className="absolute top-5 right-5 bg-[#0a0502] text-[#C9A45C] px-5 py-2 rounded-full text-sm font-bold tracking-wider">{product.price}</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        {client.whatsapp && (
                          <a href={`${whatsappUrl}?text=${encodeURIComponent(`Hi! Interested in ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#C9A45C] text-[#0a0502] px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" /> Enquire
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-[#0a0502] mb-2 group-hover:text-[#8B6F47] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                      {product.description && <p className="text-[#6B5D4A] text-sm leading-relaxed">{product.description}</p>}
                    </div>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          GALLERY PREVIEW
          ═══════════════════════════════════════════════════ */}
      {allImages.length > 0 && (
        <section className="py-28 bg-[#f5f0e8]">
          <div className="container mx-auto px-4">
            <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Gallery</div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Photo <span className="italic text-[#8B6F47]">Gallery</span>
                </h2>
              </div>
              <button onClick={() => setPage("gallery")} className="mt-6 md:mt-0 group flex items-center gap-3 text-[#8B6F47] font-semibold text-lg hover:gap-5 transition-all">
                View All <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allImages.slice(0, 8).map((img, i) => (
                <ScaleIn key={i} delay={i * 0.05}>
                  <motion.div whileHover={{ scale: 1.03 }} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#0a0502]/0 group-hover:bg-[#0a0502]/40 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100">
                        <ArrowRight className="w-5 h-5 text-[#0a0502]" />
                      </div>
                    </div>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
                <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 backdrop-blur-sm z-10"><X className="w-6 h-6" /></button>
                {allImages.length > 1 && <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length); }} className="absolute left-4 text-white p-3 rounded-full bg-white/10 backdrop-blur-sm z-10"><ChevronLeft className="w-6 h-6" /></button>}
                <img src={allImages[lightboxIndex]} alt="Gallery" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
                {allImages.length > 1 && <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % allImages.length); }} className="absolute right-4 text-white p-3 rounded-full bg-white/10 backdrop-blur-sm z-10"><ChevronRight className="w-6 h-6" /></button>}
                <div className="absolute bottom-6 text-white/50 text-sm">{lightboxIndex + 1} / {allImages.length}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          REVIEWS - Minimal Slider
          ═══════════════════════════════════════════════════ */}
      {client.reviews && client.reviews.length > 0 && (
        <section className="py-28 bg-[#FEFCF8]">
          <div className="container mx-auto px-4">
            <FadeIn className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Testimonials</div>
                <h2 className="text-4xl md:text-6xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Customer <span className="italic text-[#8B6F47]">Love</span>
                </h2>
              </div>

              <div className="relative bg-[#f5f0e8] rounded-[2rem] p-10 md:p-16">
                <div className="absolute top-8 left-10 text-[#C9A45C]/20 text-[120px] leading-none" style={{ fontFamily: "serif" }}>&ldquo;</div>
                
                <AnimatePresence mode="wait">
                  <motion.div key={activeReview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                    <div className="flex gap-1 mb-6">
                      {[...Array(client.reviews[activeReview]?.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#C9A45C] text-[#C9A45C]" />
                      ))}
                    </div>
                    <p className="text-2xl md:text-3xl text-[#0a0502] italic leading-relaxed mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {client.reviews[activeReview]?.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#0a0502] rounded-full flex items-center justify-center text-[#C9A45C] font-bold text-xl">
                        {client.reviews[activeReview]?.name?.[0]}
                      </div>
                      <div>
                        <div className="font-bold text-[#0a0502] text-lg">{client.reviews[activeReview]?.name}</div>
                        {client.reviews[activeReview]?.role && <div className="text-sm text-[#C9A45C]">{client.reviews[activeReview]?.role}</div>}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {client.reviews.length > 1 && (
                  <div className="flex gap-2 mt-10">
                    {client.reviews.map((_, i) => (
                      <button key={i} onClick={() => setActiveReview(i)} className={`h-1 rounded-full transition-all duration-500 ${i === activeReview ? "bg-[#C9A45C] w-10" : "bg-[#C9A45C]/20 w-4"}`} />
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          CTA SECTION - Cinematic
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0a0502] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A45C 1px, transparent 0)`, backgroundSize: "48px 48px" }} />
        
        {client.hero_image_url && (
          <div className="absolute inset-0 opacity-10">
            <img src={client.hero_image_url} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Get In Touch</div>
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to <span className="italic text-[#C9A45C]">Start?</span>
            </h2>
            <p className="text-xl text-white/40 mb-14 max-w-2xl mx-auto leading-relaxed">
              Contact us today for premium quality products at the best prices in {client.city}.
            </p>

            <div className="flex flex-wrap gap-5 justify-center">
              {client.phone && (
                <motion.a href={`tel:${client.phone}`} className="bg-[#C9A45C] text-[#0a0502] font-bold px-10 py-5 rounded-full text-lg shadow-2xl shadow-[#C9A45C]/20 flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  <Phone className="w-6 h-6" /> Call Now
                </motion.a>
              )}
              {client.whatsapp && (
                <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold px-10 py-5 rounded-full text-lg shadow-2xl shadow-green-500/20 flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  <MessageCircle className="w-6 h-6" /> WhatsApp
                </motion.a>
              )}
              <motion.button onClick={() => setPage("contact")} className="bg-white/5 text-white border border-white/10 font-semibold px-10 py-5 rounded-full text-lg flex items-center gap-3 hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }}>
                Contact Us <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-10 justify-center mt-14">
              {client.phone && <div className="flex items-center gap-2 text-white/30 text-sm"><Phone className="w-4 h-4 text-[#C9A45C]" /> {client.phone}</div>}
              {client.address && <div className="flex items-center gap-2 text-white/30 text-sm"><MapPin className="w-4 h-4 text-[#C9A45C]" /> {client.address}</div>}
              <div className="flex items-center gap-2 text-white/30 text-sm"><Clock className="w-4 h-4 text-[#C9A45C]" /> {client.working_hours || 'Mon-Sat: 9 AM - 8 PM'}</div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}