"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Award, Shield, Truck, Heart, CheckCircle, Users, Calendar, 
  Package, Star, BadgeCheck, Zap, ArrowRight, Phone, MessageCircle,
  Target, Eye, ThumbsUp, Clock
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

interface Props {
  client: Client;
}

export default function AboutPage({ client }: Props) {
  const whatsappUrl = client.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` : '#';

  // Product images ko about page me use karo (different images)
  const productImages = client.products?.map(p => p.image_url).filter(Boolean) || [];
  const aboutImage = productImages[0] || client.hero_image_url;
  const secondImage = productImages[1] || productImages[0] || client.hero_image_url;

  return (
    <div>
      
      {/* ═══════════════════════════════════════════════
          PAGE HEADER - Cinematic
          ═══════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          {client.hero_image_url ? (
            <>
              <img src={client.hero_image_url} alt={client.business_name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0a0502]/80"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0502] to-[#3D2817]"></div>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— About Us</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our <span className="italic text-[#C9A45C]">Story</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Get to know the people and passion behind {client.business_name}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHO WE ARE - Full Story
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
            
            {/* Left - Text */}
            <FadeIn>
              <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Who We Are</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a0502] mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome to<br />
                <span className="italic text-[#8B6F47]">{client.business_name}</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#C9A45C] mb-8"></div>
              
              <div className="space-y-6 text-lg text-[#6B5D4A] leading-[1.9]">
                <p>{client.about || `Welcome to ${client.business_name}, your trusted partner for premium quality products and services.`}</p>
                <p>
                  {client.specialty || `With over ${client.years_experience || '15'} years of experience, we have built a reputation for excellence, quality, and customer satisfaction in ${client.city}. Our commitment to providing the best products at competitive prices has made us the preferred choice for thousands of customers.`}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { label: "Established", value: client.established_year || "2010", icon: Calendar },
                  { label: "Experience", value: `${client.years_experience || '15'}+ Years`, icon: Clock },
                  { label: "Customers", value: `${client.happy_customers || '5000'}+`, icon: Users },
                  { label: "Quality", value: "100% Assured", icon: BadgeCheck },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 border-l-2 border-[#C9A45C] pl-5">
                    <item.icon className="w-6 h-6 text-[#C9A45C] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-[#C9A45C] uppercase tracking-[2px] font-semibold mb-1">{item.label}</div>
                      <div className="text-xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Right - Images */}
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10">
                  {aboutImage ? (
                    <img 
                      src={aboutImage} 
                      alt={client.business_name} 
                      className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/5] max-h-[600px]" 
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] max-h-[600px] bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] rounded-3xl flex items-center justify-center text-9xl">
                      🪵
                    </div>
                  )}
                </div>

                {/* Second Image - Overlapping */}
                {secondImage && secondImage !== aboutImage && (
                  <motion.div 
                    className="absolute -bottom-10 -left-10 z-20 w-48 h-48 md:w-64 md:h-64"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src={secondImage} 
                      alt="Products" 
                      className="w-full h-full rounded-2xl shadow-2xl object-cover border-4 border-[#FEFCF8]" 
                    />
                  </motion.div>
                )}

                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-6 -right-6 z-20 bg-[#0a0502] text-white p-6 rounded-2xl shadow-2xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-4xl font-bold text-[#C9A45C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {client.years_experience || '15'}+
                  </div>
                  <div className="text-sm text-white/60 mt-1">Years of Trust</div>
                </motion.div>

                {/* Decorative */}
                <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-[#C9A45C]/20 rounded-3xl"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OUR MISSION & VISION
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f5f0e8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Our Purpose</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mission & <span className="italic text-[#8B6F47]">Vision</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <ScaleIn delay={0}>
              <div className="bg-white p-10 rounded-3xl border border-[#E8DEC8]/50 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-[#0a0502] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C9A45C] transition-colors">
                  <Target className="w-8 h-8 text-[#C9A45C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-[#0a0502] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Mission
                </h3>
                <p className="text-[#6B5D4A] leading-relaxed text-lg">
                  To provide the highest quality products at competitive prices, ensuring complete customer satisfaction with every purchase. We strive to be the most trusted name in {client.city}.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.1}>
              <div className="bg-white p-10 rounded-3xl border border-[#E8DEC8]/50 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-[#0a0502] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C9A45C] transition-colors">
                  <Eye className="w-8 h-8 text-[#C9A45C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-[#0a0502] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our Vision
                </h3>
                <p className="text-[#6B5D4A] leading-relaxed text-lg">
                  To become the leading provider of premium products in the region, known for our unwavering commitment to quality, innovation, and exceptional customer service.
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OUR VALUES
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Our Values</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What We <span className="italic text-[#8B6F47]">Stand For</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Quality", desc: "Only the finest products that meet our strict standards", color: "from-[#C9A45C] to-[#A88848]" },
              { icon: Heart, title: "Trust", desc: "Building lasting relationships through honesty and reliability", color: "from-pink-500 to-rose-500" },
              { icon: Zap, title: "Innovation", desc: "Constantly evolving to serve you better with modern solutions", color: "from-purple-500 to-indigo-500" },
              { icon: ThumbsUp, title: "Service", desc: "Going above and beyond to exceed your expectations", color: "from-green-500 to-emerald-500" },
            ].map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0502] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#6B5D4A] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY CHOOSE US - Detailed
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0a0502] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A45C 1px, transparent 0)`, backgroundSize: "48px 48px" }} />
        
        {client.hero_image_url && (
          <div className="absolute inset-0 opacity-10">
            <img src={client.hero_image_url} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Why Choose Us</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why <span className="italic text-[#C9A45C]">{client.business_name}?</span>
            </h2>
            <p className="text-xl text-white/40">What makes us the preferred choice</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Premium Quality", desc: "Every product is carefully selected to ensure the highest quality standards.", num: "01" },
              { icon: Truck, title: "Free Delivery", desc: `Quick and free delivery within ${client.city}. Your orders reach you safely.`, num: "02" },
              { icon: Shield, title: "Quality Guarantee", desc: "100% satisfaction guaranteed. If you're not happy, we make it right.", num: "03" },
              { icon: Users, title: `${client.happy_customers || '5000'}+ Customers`, desc: "Trusted by thousands of happy customers across the region.", num: "04" },
              { icon: Clock, title: `${client.years_experience || '15'}+ Years`, desc: "Decades of experience serving businesses and homeowners.", num: "05" },
              { icon: Star, title: "Best Prices", desc: "Competitive pricing without ever compromising on quality.", num: "06" },
            ].map((item, i) => (
              <ScaleIn key={item.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#C9A45C]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#C9A45C] transition-colors">
                      <item.icon className="w-7 h-7 text-[#C9A45C] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-5xl font-bold text-white/5" style={{ fontFamily: "'Playfair Display', serif" }}>{item.num}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ACHIEVEMENTS / NUMBERS
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f5f0e8]">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Our Achievements</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Numbers That <span className="italic text-[#8B6F47]">Speak</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: client.years_experience || "15", suffix: "+", label: "Years in Business", icon: Calendar },
              { value: client.happy_customers || "5000", suffix: "+", label: "Satisfied Customers", icon: Users },
              { value: "500", suffix: "+", label: "Products Available", icon: Package },
              { value: "10", suffix: "+", label: "Cities Served", icon: Star },
            ].map((item, i) => (
              <ScaleIn key={item.label} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="text-center bg-white p-8 rounded-3xl border border-[#E8DEC8]/50 hover:shadow-xl transition-all">
                  <item.icon className="w-10 h-10 text-[#C9A45C] mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-bold text-[#0a0502] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.value}{item.suffix}
                  </div>
                  <div className="text-sm text-[#6B5D4A] font-medium">{item.label}</div>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA - Contact Us
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-4xl mx-auto bg-gradient-to-br from-[#0a0502] to-[#3D2817] rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A45C 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
            
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Get In Touch</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Want to Work <span className="italic text-[#C9A45C]">With Us?</span>
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                We would love to hear from you. Contact us today for the best products and services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {client.phone && (
                  <motion.a href={`tel:${client.phone}`} className="bg-[#C9A45C] text-[#0a0502] font-bold px-8 py-4 rounded-full text-lg flex items-center gap-3 shadow-2xl" whileHover={{ scale: 1.05 }}>
                    <Phone className="w-5 h-5" /> Call Now
                  </motion.a>
                )}
                {client.whatsapp && (
                  <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold px-8 py-4 rounded-full text-lg flex items-center gap-3 shadow-2xl" whileHover={{ scale: 1.05 }}>
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </motion.a>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}