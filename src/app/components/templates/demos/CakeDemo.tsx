"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Heart, Cake, Star, Gift } from "lucide-react";

const WHATSAPP_NUMBER = "918103558368";

export default function CakeDemo() {
  return (
    <div className="min-h-screen bg-[#FFF5F7]">
      {/* Template Banner */}
      <div className="bg-gradient-to-r from-[#D4647C] to-[#B84960] text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <Link href="/templates" className="flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline">📋 You&apos;re viewing: <strong>Sweet Bites Template Demo</strong></span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want this Sweet Bites template for my bakery")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#D4647C] px-4 py-1.5 rounded-full font-bold text-xs hover:bg-[#FFF5F7] transition-all"
            >
              💬 Get This Template
            </a>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="bg-white sticky top-12 z-40 shadow-lg border-b border-[#F8D8E0]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center text-2xl">
              🎂
            </div>
            <div>
              <div className="text-xl font-bold text-[#5C2837]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sweet Bites
              </div>
              <div className="text-[10px] text-[#D4647C] uppercase tracking-wider">Bakery & Cake Studio</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Menu", "Custom", "Gallery", "Order"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#5C2837] hover:text-[#D4647C] transition-colors font-medium">
                {item}
              </a>
            ))}
            <a
              href={`tel:+918103558368`}
              className="bg-gradient-to-r from-[#D4647C] to-[#B84960] hover:from-[#B84960] hover:to-[#D4647C] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md"
            >
              📞 Order Now
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7] via-[#FFE5EC] to-[#FFD0DC]"></div>
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#D4647C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#F8D8E0]/40 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4647C]/10 border border-[#D4647C]/20 px-4 py-2 rounded-full text-[#D4647C] text-xs font-bold uppercase tracking-wider mb-6">
                <Heart className="w-4 h-4 fill-[#D4647C]" />
                Bhopal&apos;s Most Loved Bakery
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#5C2837]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Made with{" "}
                <span className="italic text-[#D4647C]">Love</span>,
                <br />
                Baked to <span className="italic text-[#D4647C]">Perfection</span>
              </h1>

              <p className="text-lg text-[#7A4B5C] mb-8 leading-relaxed">
                Freshly baked cakes, pastries, and treats made with the finest ingredients. 
                Custom designs for birthdays, weddings & special occasions.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#D4647C] to-[#B84960] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order on WhatsApp
                </a>
                <a
                  href={`tel:+918103558368`}
                  className="bg-white text-[#D4647C] border-2 border-[#D4647C] font-bold px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5" />
                  Call to Order
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {[
                  { value: "10K+", label: "Happy Customers" },
                  { value: "500+", label: "Custom Cakes" },
                  { value: "4.9★", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-[#D4647C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#7A4B5C] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl border-4 border-[#F8D8E0] flex items-center justify-center text-9xl shadow-2xl">
                🎂
              </div>
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

      {/* ===== MENU ===== */}
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
            {[
              { emoji: "🎂", name: "Birthday Cakes", price: "₹500+", desc: "Custom designs" },
              { emoji: "🧁", name: "Cupcakes", price: "₹50/pc", desc: "Various flavors" },
              { emoji: "🍰", name: "Pastries", price: "₹80+", desc: "Fresh daily" },
              { emoji: "🍪", name: "Cookies", price: "₹200/box", desc: "Crispy & soft" },
              { emoji: "🥧", name: "Pies & Tarts", price: "₹400+", desc: "Seasonal fruits" },
              { emoji: "🍩", name: "Donuts", price: "₹40/pc", desc: "Glazed perfection" },
              { emoji: "🥐", name: "Croissants", price: "₹60/pc", desc: "Buttery flaky" },
              { emoji: "🎁", name: "Gift Boxes", price: "₹999+", desc: "Perfect gifts" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-[#FFF5F7] p-6 rounded-3xl border border-[#F8D8E0] hover:border-[#D4647C] hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer text-center"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <h3 className="font-bold text-[#5C2837] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.name}
                </h3>
                <div className="text-[#D4647C] font-bold text-lg mb-2">{item.price}</div>
                <p className="text-[#7A4B5C] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CUSTOM ORDER ===== */}
      <section id="custom" className="py-20 bg-[#FFF5F7]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
            <Gift className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Custom <span className="italic">Cake Designs</span>
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
              Tell us your idea and we&apos;ll bring it to life! Perfect for birthdays, weddings, anniversaries, and special occasions.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to order a custom cake")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#D4647C] font-bold px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Order Custom Cake
            </a>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C2837] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sweet <span className="italic text-[#D4647C]">Reviews</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Riya Sharma", text: "Best cakes in Bhopal! Made my daughter's birthday special." },
              { name: "Amit Verma", text: "Custom wedding cake was beyond expectations. Highly recommended!" },
              { name: "Priya Patel", text: "Fresh, delicious, and beautiful. My family loves Sweet Bites!" },
            ].map((review) => (
              <div key={review.name} className="bg-[#FFF5F7] p-7 rounded-3xl border border-[#F8D8E0]">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4647C] text-[#D4647C]" />
                  ))}
                </div>
                <p className="text-[#7A4B5C] italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#F8D8E0]">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-full flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div className="font-bold text-[#5C2837]">{review.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="order" className="py-20 bg-gradient-to-br from-[#FFE5EC] to-[#FFD0DC]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C2837] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order <span className="italic text-[#D4647C]">Today!</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Phone, title: "Call Us", value: "+91 8103558368", href: "tel:+918103558368" },
              { icon: MessageCircle, title: "WhatsApp", value: "Chat Now", href: `https://wa.me/${WHATSAPP_NUMBER}` },
              { icon: MapPin, title: "Visit Us", value: "Bhopal, MP", href: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-3xl border border-[#F8D8E0] hover:border-[#D4647C] hover:shadow-xl transition-all text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4647C] to-[#B84960] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="font-bold text-[#5C2837] mb-1">{item.title}</div>
                <div className="text-[#7A4B5C] text-sm">{item.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#5C2837] text-[#FFD0DC] py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            🎂 Sweet Bites
          </div>
          <p className="text-sm">© 2025 Sweet Bites Bakery. Made with 💝</p>
          <p className="text-xs mt-2 text-[#D4647C]">Demo by AVB Software - Get this template at ₹799/month</p>
        </div>
      </footer>
    </div>
  );
}