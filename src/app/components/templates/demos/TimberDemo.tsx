"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Award, Shield, Truck, Star } from "lucide-react";

const WHATSAPP_NUMBER = "918103558368";

export default function TimberDemo() {
  return (
    <>
      {/* ⭐ HIDE AVB NAVBAR/FOOTER ⭐ */}
      <style jsx global>{`
        body > header,
        body > nav,
        body > footer {
          display: none !important;
        }
        /* Hide WhatsApp button */
        body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
        /* Reset body padding */
        body {
          padding-top: 0 !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#F5EFE6]">
        {/* Template Banner */}
        <div className="bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
            <Link
              href="/templates"
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Templates
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden sm:inline">📋 You&apos;re viewing: <strong>Timber Pro Template Demo</strong></span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want this Timber Pro template for my business")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#8B6F47] px-4 py-1.5 rounded-full font-bold text-xs hover:bg-[#FAF5EA] transition-all"
              >
                💬 Get This Template
              </a>
            </div>
          </div>
        </div>

        {/* ===== NAVBAR ===== */}
        <nav className="bg-[#3D2817] text-white sticky top-12 z-40 shadow-xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] rounded-lg flex items-center justify-center text-2xl">
                🪵
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Krishna Timber
                </div>
                <div className="text-[10px] text-[#C9A45C] uppercase tracking-wider">Premium Wood Solutions</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {["Home", "About", "Products", "Gallery", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-[#C9A45C] transition-colors">
                  {item}
                </a>
              ))}
              <a
                href={`tel:+918103558368`}
                className="bg-[#C9A45C] hover:bg-[#A88848] px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </nav>

        {/* ===== HERO SECTION ===== */}
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D2817] via-[#6B4423] to-[#8B6F47]"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23C9A45C\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }}
          ></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-[#C9A45C]/20 backdrop-blur-sm border border-[#C9A45C]/30 px-4 py-2 rounded-full text-[#C9A45C] text-xs font-bold uppercase tracking-wider mb-6">
                  <Award className="w-4 h-4" />
                  Bhopal&apos;s Premium Timber Supplier
                </div>

                <h1
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Premium Quality
                  <br />
                  <span className="text-[#C9A45C] italic">Timber & Wood</span> Solutions
                </h1>

                <p className="text-lg text-[#E8D5B5] mb-8 leading-relaxed">
                  Bhopal&apos;s most trusted source for premium plywood, hardwood, doors, and custom furniture. 
                  Serving builders, contractors & homeowners for over 15 years.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:+918103558368`}
                    className="bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-2 shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Call: +91 8103558368
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all flex items-center gap-2 shadow-xl"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Order
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  {[
                    { value: "15+", label: "Years Experience" },
                    { value: "5000+", label: "Happy Customers" },
                    { value: "100%", label: "Quality Assured" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-[#C9A45C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#E8D5B5] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side Image */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#C9A45C]/20 to-[#8B6F47]/20 rounded-3xl border-2 border-[#C9A45C]/30 flex items-center justify-center text-9xl backdrop-blur-sm">
                  🪵
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white text-[#3D2817] px-4 py-2 rounded-full shadow-2xl font-bold text-sm">
                  ⭐ 4.9/5 Rating
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#C9A45C] text-white px-4 py-2 rounded-full shadow-2xl font-bold text-sm">
                  🏆 Best in Bhopal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-20 bg-[#FAF5EA]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Choose <span className="italic text-[#8B6F47]">Krishna Timber?</span>
              </h2>
              <p className="text-[#6B5D4A]">Quality, trust, and reliability for over 15 years</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Award, title: "Premium Quality", desc: "Only the finest wood from trusted sources" },
                { icon: Truck, title: "Free Delivery", desc: "Free delivery within Bhopal city" },
                { icon: Shield, title: "Quality Guarantee", desc: "100% quality guarantee on all products" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-8 rounded-2xl border border-[#E8DEC8] hover:border-[#8B6F47] hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[#3D2817] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[#6B5D4A] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRODUCTS ===== */}
        <section id="products" className="py-20 bg-[#F5EFE6]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our <span className="italic text-[#8B6F47]">Products</span>
              </h2>
              <p className="text-[#6B5D4A]">Premium wood solutions for every need</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: "🚪", name: "Wooden Doors", desc: "Premium quality doors in various designs" },
                { emoji: "🪟", name: "Plywood Sheets", desc: "All sizes & thickness available" },
                { emoji: "🪵", name: "Hardwood", desc: "Teak, Sheesham, Sal wood" },
                { emoji: "🛏️", name: "Custom Furniture", desc: "Made-to-order furniture" },
                { emoji: "🏠", name: "Flooring", desc: "Wooden flooring solutions" },
                { emoji: "🎨", name: "Veneer & Laminates", desc: "Premium veneers and laminates" },
              ].map((product) => (
                <div
                  key={product.name}
                  className="bg-white p-6 rounded-2xl border border-[#E8DEC8] hover:border-[#8B6F47] hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer"
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{product.emoji}</div>
                  <h3 className="font-bold text-xl text-[#3D2817] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {product.name}
                  </h3>
                  <p className="text-[#6B5D4A] text-sm mb-4">{product.desc}</p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to enquire about ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B6F47] font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    Enquire Now <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-20 bg-[#FAF5EA]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#3D2817] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Happy <span className="italic text-[#8B6F47]">Customers</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Rajesh Kumar", role: "Contractor", text: "Best timber quality in Bhopal! Have been buying from them for 5 years." },
                { name: "Priya Sharma", role: "Homeowner", text: "Got custom furniture made. Excellent quality and timely delivery." },
                { name: "Amit Patel", role: "Builder", text: "Reliable supplier with premium quality. Highly recommended!" },
              ].map((review) => (
                <div key={review.name} className="bg-white p-7 rounded-2xl border border-[#E8DEC8] shadow-md">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                    ))}
                  </div>
                  <p className="text-[#6B5D4A] italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E8DEC8]">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-[#3D2817]">{review.name}</div>
                      <div className="text-xs text-[#8B6F47]">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-20 bg-gradient-to-br from-[#3D2817] to-[#6B4423] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get in <span className="italic text-[#C9A45C]">Touch</span>
              </h2>
              <p className="text-[#E8D5B5]">Visit our showroom or contact us today</p>
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
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-[#C9A45C]/30 hover:bg-white/20 transition-all text-center"
                >
                  <div className="w-14 h-14 bg-[#C9A45C] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-bold mb-1">{item.title}</div>
                  <div className="text-[#E8D5B5] text-sm">{item.value}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-[#1F1208] text-[#E8D5B5] py-8 text-center">
          <div className="container mx-auto px-4">
            <div className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              🪵 Krishna Timber
            </div>
            <p className="text-sm">© 2025 Krishna Timber. All rights reserved.</p>
            <p className="text-xs mt-2 text-[#C9A45C]">Demo by AVB Software - Get this template at ₹799/month</p>
          </div>
        </footer>
      </div>
    </>
  );
}