"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight, Send, CheckCircle } from "lucide-react";
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

interface Props {
  client: Client;
}

export default function ContactPage({ client }: Props) {
  const whatsappUrl = client.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` : '#';
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send via WhatsApp
    const msg = encodeURIComponent(
      `📋 New Enquiry!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    );
    
    if (client.whatsapp) {
      window.open(`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=${msg}`, '_blank');
    }
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div>

      {/* ═══════════════════════════════════════════════
          PAGE HEADER
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Contact Us</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get In <span className="italic text-[#C9A45C]">Touch</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              We would love to hear from you. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT CARDS
          ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
            {[
              ...(client.phone ? [{
                icon: Phone,
                title: "Call Us",
                value: client.phone,
                href: `tel:${client.phone}`,
                color: "from-[#C9A45C] to-[#A88848]"
              }] : []),
              ...(client.whatsapp ? [{
                icon: MessageCircle,
                title: "WhatsApp",
                value: "Chat with us",
                href: whatsappUrl,
                color: "from-green-500 to-green-600"
              }] : []),
              ...(client.email ? [{
                icon: Mail,
                title: "Email",
                value: client.email,
                href: `mailto:${client.email}`,
                color: "from-blue-500 to-blue-600"
              }] : []),
              ...(client.address ? [{
                icon: MapPin,
                title: "Address",
                value: client.address,
                href: client.maps_link || "#",
                color: "from-purple-500 to-purple-600"
              }] : []),
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <motion.a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="block bg-white p-8 rounded-3xl border border-[#E8DEC8]/50 hover:shadow-2xl hover:shadow-[#C9A45C]/10 hover:border-[#C9A45C]/30 transition-all duration-500 text-center group"
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a0502] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#6B5D4A] text-sm">{item.value}</p>
                </motion.a>
              </FadeIn>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════
              FORM + MAP
              ═══════════════════════════════════════════════ */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <FadeIn>
              <div className="bg-white p-10 rounded-3xl border border-[#E8DEC8]/50 shadow-xl">
                <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-4">— Send Message</div>
                <h2 className="text-3xl font-bold text-[#0a0502] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Quick <span className="italic text-[#8B6F47]">Enquiry</span>
                </h2>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0a0502] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-[#6B5D4A]">We will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0a0502] mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name"
                        className="w-full px-5 py-4 bg-[#f5f0e8] border border-[#E8DEC8] rounded-2xl outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 transition-all text-[#0a0502]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0a0502] mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Your phone number"
                        className="w-full px-5 py-4 bg-[#f5f0e8] border border-[#E8DEC8] rounded-2xl outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 transition-all text-[#0a0502]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#0a0502] mb-2">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full px-5 py-4 bg-[#f5f0e8] border border-[#E8DEC8] rounded-2xl outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 transition-all resize-none text-[#0a0502]"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-[#C9A45C] text-[#0a0502] font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-[#A88848] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" /> Send via WhatsApp
                    </motion.button>

                    <p className="text-center text-xs text-[#6B5D4A]">
                      Your message will be sent via WhatsApp for instant response
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map + Working Hours */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                {/* Working Hours */}
                <div className="bg-white p-10 rounded-3xl border border-[#E8DEC8]/50 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#0a0502] rounded-2xl flex items-center justify-center">
                      <Clock className="w-7 h-7 text-[#C9A45C]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C]">Working Hours</div>
                      <h3 className="text-xl font-bold text-[#0a0502]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Business Hours
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {client.working_hours_detail && Object.keys(client.working_hours_detail).length > 0 ? (
                      Object.entries(client.working_hours_detail).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between py-3 border-b border-[#E8DEC8]/50 last:border-0">
                          <span className="font-semibold text-[#0a0502] capitalize text-sm">{day}</span>
                          <span className={`font-medium text-sm ${hours === 'Closed' ? 'text-red-500' : 'text-[#C9A45C]'}`}>
                            {hours || 'N/A'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between py-3 border-b border-[#E8DEC8]/50">
                          <span className="font-semibold text-[#0a0502] text-sm">Monday - Saturday</span>
                          <span className="text-[#C9A45C] font-medium text-sm">{client.working_hours || '9:00 AM - 8:00 PM'}</span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="font-semibold text-[#0a0502] text-sm">Sunday</span>
                          <span className="text-red-500 font-medium text-sm">Closed</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map */}
                {client.maps_link ? (
                  <div className="bg-white rounded-3xl border border-[#E8DEC8]/50 overflow-hidden shadow-xl h-72">
                    <iframe
                      src={client.maps_link}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={`${client.business_name} Location`}
                    />
                  </div>
                ) : client.address ? (
                  <div className="bg-[#0a0502] rounded-3xl p-10 text-center">
                    <MapPin className="w-12 h-12 text-[#C9A45C] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Visit Us
                    </h3>
                    <p className="text-white/60 mb-6">{client.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address + ', ' + client.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C9A45C] text-[#0a0502] px-6 py-3 rounded-full font-bold text-sm"
                    >
                      Get Directions <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ) : null}

                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-[#0a0502] to-[#3D2817] rounded-3xl p-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Need Instant <span className="italic text-[#C9A45C]">Help?</span>
                  </h3>
                  <p className="text-white/50 mb-6">Get in touch with us right away</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {client.phone && (
                      <a href={`tel:${client.phone}`} className="bg-[#C9A45C] text-[#0a0502] font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-[#A88848] transition-colors">
                        <Phone className="w-4 h-4" /> Call Now
                      </a>
                    )}
                    {client.whatsapp && (
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 text-sm hover:bg-green-600 transition-colors">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}