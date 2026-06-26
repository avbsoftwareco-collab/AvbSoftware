"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Calendar, User, Heart } from "lucide-react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: any) => {
  const d: any = { up: { y: 60 }, down: { y: -60 }, left: { x: 60 }, right: { x: -60 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPage({ client, theme }: { client: Client; theme?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cakeType: "Birthday Cake",
    date: "",
    occasion: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const colors = theme?.colors || {
    bg: "#0F1F1F",
    bgSecondary: "#162929",
    bgCard: "#1E3333",
    primary: "#D4AF37",
    accent: "#B89030",
    text: "#F0F5F0",
    textLight: "rgba(240, 245, 240, 0.6)",
    border: "rgba(212, 175, 55, 0.2)",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to WhatsApp
    if (client.whatsapp) {
      const text = `🎂 *NEW CAKE ORDER*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Cake Type:* ${formData.cakeType}
*Occasion:* ${formData.occasion}
*Required Date:* ${formData.date}

*Special Requests:*
${formData.message}`;
      
      window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        cakeType: "Birthday Cake",
        date: "",
        occasion: "",
        message: "",
      });
    }, 5000);
  };

  const heroImage = client.contact_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const restaurantName = client.business_name || "Sweet Bites";
  const mapEmbedUrl = client.map_embed_url || client.maps_link || "";

  const cakeTypes = [
    "Birthday Cake",
    "Wedding Cake",
    "Anniversary Cake",
    "Custom Design",
    "Cupcakes",
    "Pastries",
    "Other",
  ];

  return (
    <div 
      className="relative overflow-x-hidden"
      style={{ 
        background: colors.bg, 
        color: colors.text, 
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          />
        </motion.div>

        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${colors.bg}DD 100%)`,
        }} />

        <div className="absolute top-1/2 left-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />
        <div className="absolute top-1/2 right-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />

        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="text-3xl sm:text-4xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <div 
                className="text-xs sm:text-sm tracking-[8px] sm:tracking-[10px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                — Réservation —
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-10"
              style={{ 
                fontFamily: "'Italiana', serif", 
                color: '#FFFFFF',
                letterSpacing: '-2px',
              }}
            >
              <span style={{ color: '#FFFFFF', display: 'block' }}>Begin Your</span>
              <span 
                className="italic"
                style={{
                  display: 'block',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Journey
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl italic font-light max-w-2xl mx-auto"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
            >
              Where your celebration becomes our canvas, and every detail is crafted with love.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CONTACT CARDS - 3 PILLARS                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 border-b" style={{ background: colors.bgSecondary, borderColor: colors.border }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            
            {[
              {
                icon: Phone,
                label: "Speak With Us",
                value: client.phone,
                sub: "Available daily 9 AM - 9 PM",
                href: client.phone ? `tel:${client.phone}` : undefined,
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: client.whatsapp || client.phone,
                sub: "Quick responses guaranteed",
                href: client.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` : undefined,
              },
              {
                icon: Mail,
                label: "Write to Us",
                value: client.email,
                sub: "Reply within 2 hours",
                href: client.email ? `mailto:${client.email}` : undefined,
              },
            ].filter((item) => item.value).map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.a
                  href={item.href}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={{ y: -8 }}
                  className="relative block p-8 sm:p-10 border-2 group overflow-hidden no-underline transition-all duration-500"
                  style={{ 
                    background: colors.bg, 
                    borderColor: colors.border,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = colors.border}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: colors.primary }} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: colors.primary }} />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-full border-2 flex items-center justify-center transition-all"
                    style={{ borderColor: colors.primary, background: `${colors.primary}10` }}
                  >
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.primary }} />
                  </motion.div>

                  {/* Label */}
                  <div 
                    className="text-xs sm:text-sm tracking-[4px] uppercase mb-3"
                    style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                  >
                    {item.label}
                  </div>

                  {/* Value */}
                  <div 
                    className="text-xl sm:text-2xl md:text-3xl mb-2 leading-tight"
                    style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                  >
                    {item.value}
                  </div>

                  {/* Sub */}
                  <p 
                    className="text-sm italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
                  >
                    {item.sub}
                  </p>
                </motion.a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* RESERVATION FORM - LUXURY                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden" style={{ background: colors.bg }}>
        
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(120px)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(120px)' }} />

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <FadeIn className="text-center mb-12 sm:mb-16">
              <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                — Place Your Order —
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>Order Your</span>{' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Masterpiece
                </span>
              </h2>
              <p
                className="text-lg italic max-w-2xl mx-auto"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
              >
                Share your vision with us and let&apos;s create something extraordinary together
              </p>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2}>
              <div 
                className="relative border-2 p-8 sm:p-10 md:p-12"
                style={{ background: colors.bgCard, borderColor: colors.border }}
              >
                {/* Gold corner decorations */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2" style={{ borderColor: colors.primary }} />
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2" style={{ borderColor: colors.primary }} />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2" style={{ borderColor: colors.primary }} />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2" style={{ borderColor: colors.primary }} />

                {/* Success Message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 p-6 border-2 flex items-start gap-4"
                      style={{ background: `${colors.primary}15`, borderColor: colors.primary }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: 2 }}
                        className="text-3xl shrink-0"
                        style={{ color: colors.primary }}
                      >
                        ✦
                      </motion.div>
                      <div>
                        <div 
                          className="text-lg sm:text-xl mb-2"
                          style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                        >
                          Reservation Sent!
                        </div>
                        <p 
                          className="text-sm italic"
                          style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
                        >
                          We&apos;ll connect with you on WhatsApp shortly to confirm your order.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  
                  {/* Row 1: Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <User className="w-3 h-3 inline mr-2" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Enter your full name"
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg transition-colors"
                        style={{
                          borderColor: focused === 'name' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <Phone className="w-3 h-3 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg transition-colors"
                        style={{
                          borderColor: focused === 'phone' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Cake Type */}
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <Mail className="w-3 h-3 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg transition-colors"
                        style={{
                          borderColor: focused === 'email' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <Heart className="w-3 h-3 inline mr-2" />
                        Cake Type *
                      </label>
                      <select
                        value={formData.cakeType}
                        onChange={(e) => setFormData({ ...formData, cakeType: e.target.value })}
                        onFocus={() => setFocused('cakeType')}
                        onBlur={() => setFocused(null)}
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg cursor-pointer transition-colors"
                        style={{
                          borderColor: focused === 'cakeType' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      >
                        {cakeTypes.map((type) => (
                          <option key={type} value={type} style={{ background: colors.bgCard }}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Date + Occasion */}
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <Calendar className="w-3 h-3 inline mr-2" />
                        Required Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        onFocus={() => setFocused('date')}
                        onBlur={() => setFocused(null)}
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg transition-colors"
                        style={{
                          borderColor: focused === 'date' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                          colorScheme: 'dark',
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-xs tracking-[3px] uppercase mb-3"
                        style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      >
                        <Heart className="w-3 h-3 inline mr-2" />
                        Special Occasion
                      </label>
                      <input
                        type="text"
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        onFocus={() => setFocused('occasion')}
                        onBlur={() => setFocused(null)}
                        placeholder="Birthday, Anniversary, etc."
                        className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-lg transition-colors"
                        style={{
                          borderColor: focused === 'occasion' ? colors.primary : colors.border,
                          color: '#FFFFFF',
                          fontFamily: "'Cormorant Garamond', serif",
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label 
                      className="block text-xs tracking-[3px] uppercase mb-3"
                      style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                    >
                      Tell Us Your Vision
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Describe your dream cake — flavors, design, size, theme, dietary requirements..."
                      className="w-full px-0 py-3 bg-transparent border-b-2 outline-none text-base italic resize-none transition-colors"
                      style={{
                        borderColor: focused === 'message' ? colors.primary : colors.border,
                        color: '#FFFFFF',
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-12 py-5 text-xs sm:text-sm tracking-[4px] uppercase font-bold flex items-center justify-center gap-3 group mx-auto"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      color: colors.bg,
                    }}
                  >
                    <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                    <span>Send Reservation</span>
                  </motion.button>

                  <p 
                    className="text-center text-xs italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
                  >
                    * Your order will open in WhatsApp for instant confirmation
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* VISIT US SECTION                                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: colors.bgSecondary }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            <FadeIn className="text-center mb-12">
              <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                — Visit Our Atelier —
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>Come Say</span>{' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Hello
                </span>
              </h2>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left - Info */}
              <FadeIn direction="left">
                <div className="space-y-8">
                  
                  {/* Address */}
                  {client.address && (
                    <div className="flex items-start gap-4">
                      <div 
                        className="shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: colors.primary, background: `${colors.primary}10` }}
                      >
                        <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <div className="text-xs tracking-[3px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                          Location
                        </div>
                        <p className="text-lg italic mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFFFFF' }}>
                          {client.address}
                        </p>
                        {client.city && (
                          <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                            {client.city}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hours */}
                  {client.working_hours && (
                    <div className="flex items-start gap-4">
                      <div 
                        className="shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: colors.primary, background: `${colors.primary}10` }}
                      >
                        <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <div className="text-xs tracking-[3px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                          Opening Hours
                        </div>
                        <p className="text-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFFFFF' }}>
                          {client.working_hours}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {(client.instagram || client.facebook) && (
                    <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
                      <div className="text-xs tracking-[3px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                        Follow Our Journey
                      </div>
                      <div className="flex gap-3">
                        {client.instagram && (
                          <motion.a
                            href={client.instagram}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.1, y: -3 }}
                            className="w-12 h-12 border-2 flex items-center justify-center transition-all"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = colors.primary;
                              e.currentTarget.style.color = colors.bg;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = colors.primary;
                            }}
                          >
                            <span className="text-xs font-bold tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>IG</span>
                          </motion.a>
                        )}
                        {client.facebook && (
                          <motion.a
                            href={client.facebook}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.1, y: -3 }}
                            className="w-12 h-12 border-2 flex items-center justify-center transition-all"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            <span className="text-xs font-bold tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>FB</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Right - Map */}
              <FadeIn direction="right">
                <div className="relative">
                  <div className="absolute -inset-4 border-2 z-0" style={{ borderColor: colors.primary, opacity: 0.3 }} />
                  
                  <div className="relative z-10 aspect-square overflow-hidden border-2" style={{ borderColor: colors.primary }}>
                    {mapEmbedUrl ? (
                      <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(85%) hue-rotate(180deg) brightness(0.85) grayscale(0.4)' }}
                        loading="lazy"
                        title="Location Map"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: colors.bgCard }}>
                        <MapPin className="w-16 h-16 mb-4 opacity-30" style={{ color: colors.primary }} />
                        <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                          Map not available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FINAL CTA                                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center max-w-3xl">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl sm:text-3xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </div>

            <p
              className="text-3xl sm:text-4xl md:text-5xl italic font-light leading-relaxed mb-6"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>Your story,</span>{' '}
              <span style={{ color: colors.primary }}>our craft.</span>
            </p>

            <div className="mt-8">
              <div 
                className="text-2xl sm:text-3xl mb-1"
                style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
              >
                — {restaurantName}
              </div>
              <div className="text-xs sm:text-sm tracking-[4px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                Atelier de Pâtisserie
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}