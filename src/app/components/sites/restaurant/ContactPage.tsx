"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Client } from "@/lib/supabase";
import { useRestaurantTheme } from "./useTheme";

const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div initial={{ opacity: 0, ...d[direction] }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3C/svg%3E";

export default function ContactPage({ client }: { client: Client }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", guests: "2", occasion: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // 🎨 Get theme
  const theme = useRestaurantTheme(client);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "2", occasion: "", message: "" });
  };

  const restaurantName = client.business_name || "Restaurant";
  const address = client.address || "";
  const city = client.city || "";
  const phone = client.phone || "";
  const email = client.email || "";
  const openingHours = client.opening_hours || [];
  const occasions = ["Birthday", "Anniversary", "Business", "Date Night", "Other"];
  const timeSlots = ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"];
  const maxGuests = 8;

  const contactHeroImage = client.contact_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const mapEmbedUrl = (client as any).map_embed_url || client.maps_link || "";

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text }} className="font-serif overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] flex items-center justify-center overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${contactHeroImage})`, filter: "brightness(0.2)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${theme.primary}12, transparent)` }} />

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6">
            <div className="h-px w-8 sm:w-12 md:w-[60px]" style={{ background: `linear-gradient(to right, transparent, ${theme.primary})` }} />
            <span className="text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans" style={{ color: theme.primary }}>Get In Touch</span>
            <div className="h-px w-8 sm:w-12 md:w-[60px]" style={{ background: `linear-gradient(to left, transparent, ${theme.primary})` }} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold tracking-[6px] sm:tracking-[8px] md:tracking-[12px] m-0 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.text}, ${theme.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            CONTACT
          </h1>
        </motion.div>
      </section>

      {/* INFO + FORM */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-0 lg:min-h-[80vh]">
        <FadeIn direction="left">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] py-10 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: theme.bgSecondary, borderRight: `1px solid ${theme.primary}1a` }}>
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-bold m-0 mb-8 sm:mb-10 md:mb-12 leading-[1.15]" style={{ color: theme.text }}>
              Visit Us At<br /><span style={{ color: theme.primary }}>{restaurantName}</span>
            </h2>

            {[
              { icon: "📍", label: "Location", value: address, sub: city },
              { icon: "📞", label: "Reservations", value: phone, sub: "Call us anytime", href: phone ? `tel:${phone}` : undefined },
              { icon: "✉️", label: "Email", value: email, sub: "We respond within 2 hours", href: email ? `mailto:${email}` : undefined },
            ].filter((info) => info.value).map((info, i) => (
              <FadeIn key={i} delay={i * 0.12} direction="left">
                <div className="flex gap-3 sm:gap-4 md:gap-5 py-4 sm:py-5 md:py-6" style={{ borderBottom: `1px solid ${theme.primary}1a` }}>
                  <span className="text-lg sm:text-xl shrink-0">{info.icon}</span>
                  <div className="min-w-0">
                    <span className="font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-1 sm:mb-1.5" style={{ color: theme.primary }}>{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className="font-sans text-sm sm:text-[15px] m-0 mb-0.5 font-medium block no-underline transition-colors break-all" style={{ color: theme.text }} onMouseEnter={(e) => e.currentTarget.style.color = theme.primary} onMouseLeave={(e) => e.currentTarget.style.color = theme.text}>{info.value}</a>
                    ) : (
                      <p className="font-sans text-sm sm:text-[15px] m-0 mb-0.5 font-medium break-words" style={{ color: theme.text }}>{info.value}</p>
                    )}
                    <p className="font-sans text-[10px] sm:text-xs m-0 font-light" style={{ color: theme.textMuted }}>{info.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}

            {openingHours.length > 0 && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-4 sm:mb-5" style={{ color: theme.primary }}>Opening Hours</span>
                {openingHours.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between py-2.5 sm:py-3 last:border-0" style={{ borderBottom: `1px solid ${theme.primary}14` }}>
                    <span className="font-sans text-[11px] sm:text-xs md:text-[13px] font-light" style={{ color: theme.textMuted }}>{item.days}</span>
                    <span className="font-sans text-[11px] sm:text-xs md:text-[13px] font-medium" style={{ color: theme.text }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            )}

            {(client.instagram || client.facebook) && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-4 sm:mb-5" style={{ color: theme.primary }}>Follow Us</span>
                <div className="flex gap-2 sm:gap-3">
                  {client.instagram && (
                    <motion.a href={client.instagram} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-sm no-underline transition-all font-bold" style={{ border: `1px solid ${theme.primary}4d`, color: theme.primary }}>IG</motion.a>
                  )}
                  {client.facebook && (
                    <motion.a href={client.facebook} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-sm no-underline transition-all font-bold" style={{ border: `1px solid ${theme.primary}4d`, color: theme.primary }}>FB</motion.a>
                  )}
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn direction="right">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-10 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: theme.bgCard }}>
            <div className="mb-8 sm:mb-10 md:mb-12">
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[3px] sm:tracking-[5px] uppercase block mb-3 sm:mb-4 md:mb-5" style={{ color: theme.primary }}>Reserve Your Experience</span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] font-bold m-0 leading-[1.15]" style={{ color: theme.text }}>Make A<br />Reservation</h2>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -20, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="p-4 sm:p-5 mb-6 sm:mb-8 flex items-start sm:items-center gap-2.5 sm:gap-3" style={{ backgroundColor: `${theme.primary}1a`, border: `1px solid ${theme.primary}66` }}>
                  <span className="text-base sm:text-xl shrink-0" style={{ color: theme.primary }}>✦</span>
                  <div>
                    <p className="font-sans text-xs sm:text-sm font-semibold m-0 mb-0.5" style={{ color: theme.primary }}>Reservation Request Sent!</p>
                    <p className="font-sans text-[10px] sm:text-xs m-0 font-light" style={{ color: theme.primary, opacity: 0.7 }}>We&apos;ll confirm within 2 hours. Thank you!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
                {[
                  { label: "Full Name *", name: "name", type: "text", placeholder: "Your name", required: true },
                  { label: "Email *", name: "email", type: "email", placeholder: "your@email.com", required: true },
                  { label: "Phone", name: "phone", type: "tel", placeholder: phone || "+91 00000 00000", required: false },
                ].map((field) => (
                  <div key={field.name} className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                    <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2" style={{ color: theme.primary }}>{field.label}</label>
                    <input
                      type={field.type} required={field.required}
                      value={(formData as any)[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      className="w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-xs sm:text-sm font-sans outline-none transition-colors"
                      style={{ color: theme.text, borderBottomColor: focused === field.name ? theme.primary : `${theme.primary}33` }}
                    />
                  </div>
                ))}

                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2" style={{ color: theme.primary }}>Guests *</label>
                  <select value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })} onFocus={() => setFocused("guests")} onBlur={() => setFocused(null)} className="w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-xs sm:text-sm font-sans outline-none cursor-pointer" style={{ color: theme.text, borderBottomColor: focused === "guests" ? theme.primary : `${theme.primary}33` }}>
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n.toString()} style={{ backgroundColor: theme.bgCard }}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                    <option value={`${maxGuests}+`} style={{ backgroundColor: theme.bgCard }}>{maxGuests}+ Guests</option>
                  </select>
                </div>

                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2" style={{ color: theme.primary }}>Date *</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} className="w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-xs sm:text-sm font-sans outline-none [color-scheme:dark]" style={{ color: theme.text, borderBottomColor: focused === "date" ? theme.primary : `${theme.primary}33` }} />
                </div>

                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2" style={{ color: theme.primary }}>Preferred Time *</label>
                  <select value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} onFocus={() => setFocused("time")} onBlur={() => setFocused(null)} className="w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-xs sm:text-sm font-sans outline-none cursor-pointer" style={{ color: theme.text, borderBottomColor: focused === "time" ? theme.primary : `${theme.primary}33` }}>
                    <option value="" style={{ backgroundColor: theme.bgCard }}>Select time</option>
                    {timeSlots.map((t: string) => (
                      <option key={t} value={t} style={{ backgroundColor: theme.bgCard }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-2 sm:mb-3" style={{ color: theme.primary }}>Special Occasion</label>
                <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 flex-wrap">
                  {occasions.map((occ: string) => (
                    <motion.button key={occ} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFormData({ ...formData, occasion: formData.occasion === occ ? "" : occ })} className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] tracking-[1px] sm:tracking-[2px] uppercase font-sans cursor-pointer transition-all" style={{
                      border: `1px solid ${formData.occasion === occ ? theme.primary : `${theme.primary}40`}`,
                      backgroundColor: formData.occasion === occ ? `${theme.primary}1f` : "transparent",
                      color: formData.occasion === occ ? theme.primary : theme.textMuted,
                    }}>
                      {occ}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-8 sm:mb-10 md:mb-12">
                <label className="block font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2" style={{ color: theme.primary }}>Special Requests</label>
                <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Dietary requirements, seating preferences..." className="w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-xs sm:text-sm font-sans outline-none transition-colors resize-none pt-3" style={{ color: theme.text, borderBottomColor: focused === "message" ? theme.primary : `${theme.primary}33` }} />
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 sm:py-[18px] md:py-5 border-none text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-sans font-bold cursor-pointer" style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.accent})`, color: theme.bg }}>
                Confirm Reservation ✦
              </motion.button>
            </form>
          </div>
        </FadeIn>
      </section>

      {/* MAP */}
      {mapEmbedUrl && (
        <section className="relative">
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
            <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) grayscale(0.3)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${restaurantName} Location`} />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="absolute left-3 sm:left-6 md:left-10 lg:left-[60px] top-1/2 -translate-y-1/2 p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-[10px] max-w-[200px] sm:max-w-[240px] md:max-w-[260px]" style={{ backgroundColor: `${theme.bg}eb`, border: `1px solid ${theme.primary}4d` }}>
              <div className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4" style={{ color: theme.primary }}>✦</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold m-0 mb-1 sm:mb-2" style={{ color: theme.text }}>{restaurantName}</h3>
              <p className="font-sans text-[10px] sm:text-[11px] md:text-[13px] leading-[1.5] m-0 mb-3 sm:mb-4 md:mb-5" style={{ color: theme.textMuted }}>
                {address}{address && city ? <br /> : ""}{city}
              </p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(`${address}, ${city}`)}`} target="_blank" rel="noreferrer" className="font-sans text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase no-underline flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity" style={{ color: theme.primary }}>Get Directions →</a>
            </motion.div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="px-4 sm:px-6 md:px-[5%] py-10 sm:py-12 md:py-14 lg:py-[60px] text-center" style={{ backgroundColor: theme.bg, borderTop: `1px solid ${theme.primary}26` }}>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6" style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.text}, ${theme.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {restaurantName}
        </div>
        <p className="font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] m-0" style={{ color: theme.textMuted }}>
          © {new Date().getFullYear()} {restaurantName} · All Rights Reserved · Powered by{" "}
          <a href="https://avbsoftware.com" target="_blank" rel="noreferrer" className="no-underline hover:opacity-80" style={{ color: theme.primary }}>AVB Software</a>
        </p>
      </footer>
    </div>
  );
}