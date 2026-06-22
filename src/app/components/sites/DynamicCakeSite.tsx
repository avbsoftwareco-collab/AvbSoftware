"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Phone, MapPin, MessageCircle, Award, Shield, Truck, Star, 
  ArrowLeft, Clock, ChevronLeft, ChevronRight, X, 
  CheckCircle, Heart, Package, Users, Calendar, ArrowRight,
  Zap, ThumbsUp, BadgeCheck
} from "lucide-react";
import Link from "next/link";
import { Client } from "@/lib/supabase";

// ============================================
// ANIMATION COMPONENTS (No variants needed!)
// ============================================

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, className = "", direction = "left", delay = 0 }: { children: React.ReactNode; className?: string; direction?: "left" | "right"; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const x = direction === "left" ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// COUNTER COMPONENT
// ============================================
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(target.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (!inView) return;
    
    let current = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, numericValue]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================
// LIGHTBOX COMPONENT
// ============================================
function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: { 
  images: string[]; currentIndex: number; onClose: () => void; onNext: () => void; onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 z-10">
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <img
        src={images[currentIndex]}
        alt="Gallery"
        className="max-w-full max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 z-10">
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="absolute bottom-6 text-white/70 text-sm">{currentIndex + 1} / {images.length}</div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function DynamicTimberSite({ client }: { client: Client }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl = client.whatsapp 
    ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` 
    : '#';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!client.reviews || client.reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % (client.reviews?.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [client.reviews]);

  const allImages = [
    ...(client.hero_image_url ? [client.hero_image_url] : []),
    ...(client.logo_url ? [client.logo_url] : []),
    ...(client.products?.map(p => p.image_url).filter(Boolean) as string[] || []),
    ...(client.gallery_images || []),
  ];

  return (
    <>
      <style jsx global>{`
        body > header, body > nav, body > footer, body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-[#FEFCF8]">
        
        {/* ===== ADMIN BANNER ===== */}
        <div className="bg-gradient-to-r from-[#3D2817] to-[#6B4423] text-white py-2.5 px-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden sm:inline font-semibold">🌐 {client.subdomain}.avbsoftware.com</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${client.status === 'live' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                {client.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
              </span>
            </div>
          </div>
        </div>

        {/* ===== NAVBAR ===== */}
        <motion.nav 
          className={`sticky top-10 z-40 transition-all duration-500 ${
            scrolled ? 'bg-[#3D2817]/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-[#3D2817] py-4'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                {client.logo_url ? (
                  <img src={client.logo_url} alt={client.business_name} className="w-12 h-12 rounded-xl object-cover border-2 border-[#C9A45C] shadow-lg" />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] rounded-xl flex items-center justify-center text-2xl shadow-lg">🪵</div>
                )}
              </motion.div>
              <div>
                <div className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{client.business_name}</div>
                <div className="text-[#C9A45C] text-[10px] uppercase tracking-[2px] font-semibold">{client.tagline || 'Premium Wood Solutions'}</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {["Home", "About", "Products", "Gallery", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/80 text-sm font-medium hover:text-[#C9A45C] transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A45C] group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              {client.phone && (
                <motion.a href={`tel:${client.phone}`} className="bg-gradient-to-r from-[#C9A45C] to-[#A88848] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  📞 Call Now
                </motion.a>
              )}
            </div>
          </div>
        </motion.nav>

        {/* ===== HERO SECTION ===== */}
        <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            {client.hero_image_url ? (
              <>
                <motion.img src={client.hero_image_url} alt={client.business_name} className="w-full h-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3D2817]/95 via-[#3D2817]/70 to-[#3D2817]/40"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#3D2817] via-[#6B4423] to-[#8B6F47]"></div>
            )}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23C9A45C' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
                  <span className="inline-flex items-center gap-2 bg-[#C9A45C]/20 backdrop-blur-md border border-[#C9A45C]/40 px-5 py-2.5 rounded-full text-[#C9A45C] text-xs font-bold uppercase tracking-[2px]">
                    <Award className="w-4 h-4" />
                    {client.city}&apos;s Premium Supplier
                  </span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {client.business_name}
                  <br />
                  <span className="text-[#C9A45C] italic text-3xl md:text-4xl lg:text-5xl">
                    {client.tagline || 'Premium Wood Solutions'}
                  </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg text-[#E8D5B5] mb-8 leading-relaxed max-w-xl">
                  {client.about?.substring(0, 200) || `${client.city}'s most trusted source for premium wood and timber.`}
                  {(client.about?.length || 0) > 200 && "..."}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4 mb-10">
                  {client.phone && (
                    <motion.a href={`tel:${client.phone}`} className="group bg-gradient-to-r from-[#C9A45C] to-[#A88848] text-white font-bold px-8 py-4 rounded-xl shadow-2xl shadow-[#C9A45C]/30 flex items-center gap-3 relative overflow-hidden" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Phone className="w-5 h-5" />
                      <span>{client.phone}</span>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                    </motion.a>
                  )}
                  {client.whatsapp && (
                    <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </motion.a>
                  )}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap gap-3">
                  {[
                    { icon: Shield, text: "Quality Assured" },
                    { icon: Truck, text: "Free Delivery" },
                    { icon: ThumbsUp, text: "Best Price" },
                  ].map((badge) => (
                    <span key={badge.text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-xs font-medium border border-white/10">
                      <badge.icon className="w-3.5 h-3.5 text-[#C9A45C]" /> {badge.text}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right - Stats */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { value: client.years_experience || "15", suffix: "+", label: "Years Experience", icon: Calendar, color: "from-[#C9A45C] to-[#A88848]" },
                  { value: client.happy_customers || "5000", suffix: "+", label: "Happy Customers", icon: Users, color: "from-green-500 to-green-600" },
                  { value: "500", suffix: "+", label: "Products", icon: Package, color: "from-blue-500 to-blue-600" },
                  { value: "100", suffix: "%", label: "Quality", icon: BadgeCheck, color: "from-purple-500 to-purple-600" },
                ].map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + index * 0.2 }} whileHover={{ scale: 1.05, y: -5 }} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-[#E8D5B5] mt-1 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div className="w-1.5 h-3 bg-[#C9A45C] rounded-full" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
          </motion.div>
        </section>

        {/* ===== MOBILE STATS ===== */}
        <div className="lg:hidden py-8 bg-gradient-to-r from-[#3D2817] to-[#6B4423]">
          <div className="container mx-auto px-4 grid grid-cols-2 gap-4">
            {[
              { value: client.years_experience || "15", suffix: "+", label: "Years" },
              { value: client.happy_customers || "5000", suffix: "+", label: "Customers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-[#C9A45C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== WHY CHOOSE US ===== */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                <span className="w-8 h-px bg-[#8B6F47]"></span>
                WHY CHOOSE US
                <span className="w-8 h-px bg-[#8B6F47]"></span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Choose <span className="italic text-[#8B6F47]">{client.business_name}?</span>
              </h2>
              <p className="text-[#6B5D4A]">Quality, trust, and reliability you can count on</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Award, title: "Premium Quality", desc: "Only the finest materials from trusted sources.", gradient: "from-[#C9A45C] to-[#A88848]" },
                { icon: Truck, title: "Free Delivery", desc: `Fast and free delivery within ${client.city}.`, gradient: "from-green-500 to-green-600" },
                { icon: Shield, title: "Quality Guarantee", desc: "100% quality guarantee on all products.", gradient: "from-blue-500 to-blue-600" },
                { icon: Zap, title: "Best Prices", desc: "Competitive pricing without compromising quality.", gradient: "from-purple-500 to-purple-600" },
                { icon: Heart, title: "Customer First", desc: "Your satisfaction is our top priority.", gradient: "from-pink-500 to-pink-600" },
                { icon: BadgeCheck, title: "Trusted Brand", desc: `Trusted by ${client.happy_customers || '5000'}+ customers.`, gradient: "from-[#8B6F47] to-[#6B5535]" },
              ].map((item, index) => (
                <ScaleIn key={item.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -10, scale: 1.02 }} className="group bg-[#FEFCF8] p-8 rounded-3xl border border-[#E8DEC8] hover:border-[#C9A45C] hover:shadow-2xl hover:shadow-[#C9A45C]/15 transition-all duration-500 text-center">
                    <motion.div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`} whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-xl text-[#3D2817] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-[#6B5D4A] text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        {client.about && (
          <section className="py-20 bg-[#FAF5EA]">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <SlideIn direction="left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                    <span className="w-8 h-px bg-[#8B6F47]"></span> OUR STORY
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    About <span className="italic text-[#8B6F47]">{client.business_name}</span>
                  </h2>
                  <p className="text-[#6B5D4A] leading-relaxed text-lg mb-6">{client.about}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      `Since ${client.established_year || '2010'}`,
                      `${client.years_experience || '15'}+ Years`,
                      `${client.happy_customers || '5000'}+ Customers`,
                      "100% Quality",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#3D2817] font-medium">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </SlideIn>

                <SlideIn direction="right">
                  <div className="relative">
                    {client.hero_image_url ? (
                      <motion.img src={client.hero_image_url} alt={client.business_name} className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]" whileHover={{ scale: 1.02 }} />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#C9A45C]/20 to-[#8B6F47]/20 rounded-3xl flex items-center justify-center text-8xl">🪵</div>
                    )}
                    
                    <motion.div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#C9A45C] to-[#A88848] text-white p-5 rounded-2xl shadow-2xl" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{client.years_experience || '15'}+</div>
                      <div className="text-xs font-semibold opacity-90">Years of Trust</div>
                    </motion.div>
                  </div>
                </SlideIn>
              </div>
            </div>
          </section>
        )}

        {/* ===== PRODUCTS ===== */}
        {client.products && client.products.length > 0 && (
          <section id="products" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <FadeIn className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                  <span className="w-8 h-px bg-[#8B6F47]"></span> OUR PRODUCTS <span className="w-8 h-px bg-[#8B6F47]"></span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our <span className="italic text-[#8B6F47]">Products</span>
                </h2>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {client.products.map((product, index) => (
                  <ScaleIn key={index} delay={index * 0.1}>
                    <motion.div whileHover={{ y: -10 }} className="group bg-[#FEFCF8] rounded-3xl border border-[#E8DEC8] overflow-hidden hover:shadow-2xl hover:shadow-[#C9A45C]/20 hover:border-[#C9A45C] transition-all duration-500">
                      <div className="relative overflow-hidden h-56">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700">🪵</div>
                        )}
                        <div className="absolute top-4 right-4 bg-[#C9A45C] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">{product.price}</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2817] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                          {client.whatsapp && (
                            <a href={`${whatsappUrl}?text=${encodeURIComponent(`Hi! I'm interested in ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl hover:bg-green-600">
                              <MessageCircle className="w-4 h-4" /> Enquire Now
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-[#3D2817] mb-2 group-hover:text-[#8B6F47] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                        {product.description && <p className="text-[#6B5D4A] text-sm leading-relaxed">{product.description}</p>}
                      </div>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== GALLERY ===== */}
        {allImages.length > 0 && (
          <section id="gallery" className="py-20 bg-[#FAF5EA]">
            <div className="container mx-auto px-4">
              <FadeIn className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                  <span className="w-8 h-px bg-[#8B6F47]"></span> GALLERY <span className="w-8 h-px bg-[#8B6F47]"></span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Photo <span className="italic text-[#8B6F47]">Gallery</span>
                </h2>
              </FadeIn>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allImages.map((img, index) => (
                  <ScaleIn key={index} delay={index * 0.05}>
                    <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer group relative overflow-hidden rounded-2xl aspect-square" onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}>
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-[#3D2817]/0 group-hover:bg-[#3D2817]/50 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white/90 text-[#3D2817] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                      </div>
                    </motion.div>
                  </ScaleIn>
                ))}
              </div>
            </div>

            {lightboxOpen && (
              <Lightbox
                images={allImages}
                currentIndex={lightboxIndex}
                onClose={() => setLightboxOpen(false)}
                onNext={() => setLightboxIndex(prev => (prev + 1) % allImages.length)}
                onPrev={() => setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length)}
              />
            )}
          </section>
        )}

        {/* ===== REVIEWS ===== */}
        {client.reviews && client.reviews.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <FadeIn className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#8B6F47] mb-4">
                  <span className="w-8 h-px bg-[#8B6F47]"></span> TESTIMONIALS <span className="w-8 h-px bg-[#8B6F47]"></span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#3D2817] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Happy <span className="italic text-[#8B6F47]">Customers</span>
                </h2>
              </FadeIn>

              <FadeIn className="max-w-3xl mx-auto">
                <div className="relative bg-[#FEFCF8] rounded-3xl p-8 md:p-12 border border-[#E8DEC8] shadow-xl">
                  <div className="absolute top-6 right-8 text-[#E8DCC4] text-8xl opacity-30" style={{ fontFamily: "serif" }}>&ldquo;</div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activeReview} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                      <div className="flex gap-1 mb-4">
                        {[...Array(client.reviews[activeReview]?.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#C9A45C] text-[#C9A45C]" />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-[#3D2817] italic leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                        &ldquo;{client.reviews[activeReview]?.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {client.reviews[activeReview]?.name?.[0] || 'C'}
                        </div>
                        <div>
                          <div className="font-bold text-[#3D2817] text-lg">{client.reviews[activeReview]?.name}</div>
                          {client.reviews[activeReview]?.role && <div className="text-sm text-[#8B6F47] font-semibold">{client.reviews[activeReview]?.role}</div>}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {client.reviews.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      {client.reviews.map((_, i) => (
                        <button key={i} onClick={() => setActiveReview(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeReview ? "bg-[#C9A45C] w-8" : "bg-[#E8DCC4] w-2 hover:bg-[#D4C29E]"}`} />
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ===== WORKING HOURS ===== */}
        <section className="py-16 bg-[#FAF5EA]">
          <div className="container mx-auto px-4">
            <FadeIn className="max-w-lg mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-[#E8DEC8] shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3D2817]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Working <span className="italic text-[#8B6F47]">Hours</span>
                  </h3>
                </div>
                <div className="text-center py-4">
                  <p className="text-[#8B6F47] font-bold text-lg">{client.working_hours || 'Mon-Sat: 9 AM - 8 PM'}</p>
                  <p className="text-[#6B5D4A] text-sm mt-1">Sunday: Closed</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-20 bg-gradient-to-br from-[#3D2817] via-[#6B4423] to-[#8B6F47] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)`, backgroundSize: "32px 32px" }} />

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-[#C9A45C] mb-4">
                <span className="w-8 h-px bg-[#C9A45C]"></span> GET IN TOUCH <span className="w-8 h-px bg-[#C9A45C]"></span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact <span className="italic text-[#C9A45C]">Us</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {client.phone && (
                <ScaleIn delay={0}>
                  <motion.a href={`tel:${client.phone}`} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-[#C9A45C]/30 hover:bg-white/20 transition-all text-center block" whileHover={{ y: -5, scale: 1.02 }}>
                    <div className="w-16 h-16 bg-[#C9A45C] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div className="font-bold text-lg mb-1">Call Us</div>
                    <div className="text-[#E8D5B5]">{client.phone}</div>
                  </motion.a>
                </ScaleIn>
              )}
              
              {client.whatsapp && (
                <ScaleIn delay={0.1}>
                  <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-[#C9A45C]/30 hover:bg-white/20 transition-all text-center block" whileHover={{ y: -5, scale: 1.02 }}>
                    <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="font-bold text-lg mb-1">WhatsApp</div>
                    <div className="text-[#E8D5B5]">Chat Now</div>
                  </motion.a>
                </ScaleIn>
              )}
              
              {client.address && (
                <ScaleIn delay={0.2}>
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-[#C9A45C]/30 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div className="font-bold text-lg mb-1">Visit Us</div>
                    <div className="text-[#E8D5B5]">{client.address}</div>
                  </div>
                </ScaleIn>
              )}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-[#1F1208] text-[#E8D5B5] py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {client.logo_url ? (
                <img src={client.logo_url} alt={client.business_name} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <span className="text-3xl">🪵</span>
              )}
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{client.business_name}</div>
            </div>

            <p className="text-sm text-[#E8D5B5]/70 mb-6">{client.tagline || 'Premium Wood Solutions'}</p>

            {(client.facebook || client.instagram) && (
              <div className="flex justify-center gap-3 mb-8">
                {client.facebook && (
                  <a href={client.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#C9A45C] rounded-xl flex items-center justify-center transition-all text-sm font-bold">FB</a>
                )}
                {client.instagram && (
                  <a href={client.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-[#C9A45C] rounded-xl flex items-center justify-center transition-all text-sm font-bold">IG</a>
                )}
              </div>
            )}

            <div className="border-t border-white/10 pt-6">
              <p className="text-sm">© {new Date().getFullYear()} {client.business_name}. All rights reserved.</p>
              <p className="text-xs mt-2 text-[#C9A45C]">
                Powered by <a href="https://avbsoftware.com" className="hover:underline font-semibold" target="_blank" rel="noopener noreferrer">AVB Software</a>
              </p>
            </div>
          </div>
        </footer>

        {/* ===== FLOATING WHATSAPP ===== */}
        {client.whatsapp && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
          </motion.a>
        )}
      </div>
    </>
  );
}