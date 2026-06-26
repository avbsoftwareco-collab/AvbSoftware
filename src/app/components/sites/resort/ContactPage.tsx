"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string) => void;
}

export default function ContactPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rsv-show");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rsv-hide").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroImage =
    (client as any).contact_hero_image ||
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const phone = client.whatsapp || client.phone || "";
    const msg = `🏝️ *New Booking Inquiry - ${client.business_name}*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
📅 *Check-in:* ${formData.checkIn}
📅 *Check-out:* ${formData.checkOut}
👥 *Guests:* ${formData.guests}

💬 *Message:*
${formData.message}`;

    window.open(
      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        message: "",
      });
    }, 1000);
  };

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pageLoaded ? "scale(1) rotate(0deg)" : "scale(1.2) rotate(2deg)",
            transition: "transform 2s ease",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        <div className="relative z-[4] h-full flex items-center justify-center text-center px-6">
          <div className="max-w-[1000px]">
            <div
              className="inline-flex items-center gap-3 mb-6 px-5 sm:px-6 py-2 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
              }}
            >
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
                ✦ Get in Touch ✦
              </span>
              <div className="hidden sm:block h-px w-12" style={{ background: "var(--theme-primary)" }} />
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 7vw, 96px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-2px",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                lineHeight: 1.05,
                marginBottom: "20px",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 1.4s ease 1.4s, transform 1.4s ease 1.4s",
              }}
            >
              Reserve Your{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Escape
              </em>
            </h1>

            <p
              className="max-w-2xl mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(16px, 1.8vw, 22px)",
                color: "#fff",
                opacity: pageLoaded ? 1 : 0,
                transition: "opacity 1s ease 1.6s",
              }}
            >
              We're here to help you create unforgettable memories
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CONTACT INFO CARDS
      ═══════════════════════════════════ */}
      <section className="py-20 px-5 -mt-20 relative z-10">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Phone, label: "Call Us", value: client.phone || "+91 9876543210", href: `tel:${client.phone}` },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${(client.whatsapp || "").replace(/[^0-9]/g, "")}` },
            { icon: Mail, label: "Email Us", value: client.email || "info@resort.com", href: `mailto:${client.email}` },
            { icon: MapPin, label: "Visit Us", value: client.city || "Goa, India", href: client.maps_link || "#" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                target={item.label === "WhatsApp" || item.label === "Visit Us" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block p-7 rounded-2xl text-center rsv-hide transition-all hover:-translate-y-2 group"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1.5px solid var(--theme-primary)",
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: "var(--theme-primary)" }} />
                </div>
                <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 700, marginBottom: "6px" }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "var(--theme-text)", fontStyle: "italic" }}>
                  {item.value}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════
          BOOKING FORM + INFO
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div className="rsv-hide">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "var(--theme-primary)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600 }}>
                Book Your Stay
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: "var(--theme-text)",
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              Make a{" "}
              <em style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, color: "var(--theme-primary)" }}>
                Reservation
              </em>
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--theme-text-muted)",
                fontStyle: "italic",
              }}
            >
              Fill out the form below and our concierge will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl outline-none transition-all focus:scale-[1.02]"
                  style={{
                    background: "var(--theme-bg-card)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text)",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl outline-none transition-all focus:scale-[1.02]"
                  style={{
                    background: "var(--theme-bg-card)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text)",
                    fontSize: "14px",
                  }}
                />
              </div>
              <input
                type="tel"
                required
                placeholder="Phone *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl outline-none transition-all focus:scale-[1.02]"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text)",
                  fontSize: "14px",
                }}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                    Check-In
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl outline-none"
                    style={{
                      background: "var(--theme-bg-card)",
                      border: "1px solid var(--theme-border)",
                      color: "var(--theme-text)",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                    Check-Out
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl outline-none"
                    style={{
                      background: "var(--theme-bg-card)",
                      border: "1px solid var(--theme-border)",
                      color: "var(--theme-text)",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--theme-primary)", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl outline-none"
                  style={{
                    background: "var(--theme-bg-card)",
                    border: "1px solid var(--theme-border)",
                    color: "var(--theme-text)",
                    fontSize: "14px",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Special Requests (Optional)"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl outline-none resize-none"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  color: "var(--theme-text)",
                  fontSize: "14px",
                }}
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full font-bold uppercase tracking-[3px] text-xs transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2"
                style={{
                  background: "var(--theme-primary)",
                  color: "var(--theme-bg)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4" /> Send Inquiry via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Map + Info */}
          <div className="rsv-hide" style={{ transitionDelay: "0.2s" }}>
            {/* Map */}
            <div
              className="rounded-3xl overflow-hidden mb-8"
              style={{ aspectRatio: "4/3", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}
            >
              <iframe
                src={
                  client.maps_link?.includes("embed")
                    ? client.maps_link
                    : `https://maps.google.com/maps?q=${encodeURIComponent(client.city || "Goa")}&output=embed`
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Hours */}
            <div
              className="p-7 rounded-2xl"
              style={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-6 h-6" style={{ color: "var(--theme-primary)" }} />
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                  }}
                >
                  Reception Hours
                </h3>
              </div>
              {client.opening_hours && client.opening_hours.length > 0 ? (
                client.opening_hours.map((h: any, i: number) => (
                  <div key={i} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--theme-border)" }}>
                    <span style={{ color: "var(--theme-text)", fontWeight: 600 }}>{h.days}</span>
                    <span style={{ color: "var(--theme-primary)" }}>{h.hours}</span>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--theme-text-muted)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                  24/7 Reception & Concierge Service
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}