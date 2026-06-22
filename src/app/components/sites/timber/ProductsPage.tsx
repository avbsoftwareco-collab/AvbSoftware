"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MessageCircle, Phone, Search, Package, ArrowRight, 
  Star, Shield, Truck, X
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

export default function ProductsPage({ client }: Props) {
  const whatsappUrl = client.whatsapp ? `https://wa.me/${client.whatsapp.replace(/\D/g, '')}` : '#';
  const [searchQuery, setSearchQuery] = useState("");

  const products = client.products || [];
  
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Our Products</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our <span className="italic text-[#C9A45C]">Products</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Premium quality products for every need. Browse our complete collection.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Package className="w-4 h-4 text-[#C9A45C]" />
                {products.length} Products
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Shield className="w-4 h-4 text-[#C9A45C]" />
                Quality Assured
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Truck className="w-4 h-4 text-[#C9A45C]" />
                Free Delivery
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SEARCH BAR
          ═══════════════════════════════════════════════ */}
      <section className="py-8 bg-[#FEFCF8] border-b border-[#E8DEC8]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A45C]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 bg-white border border-[#E8DEC8] rounded-2xl text-[#0a0502] placeholder:text-[#C9A45C]/50 outline-none focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 transition-all text-lg"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C9A45C] hover:text-[#8B6F47]">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="text-center mt-4 text-sm text-[#C9A45C]">
            {filteredProducts.length === 0 ? "No products found" : `Showing ${filteredProducts.length} of ${products.length} products`}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTS GRID
          ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FEFCF8]">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <FadeIn className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-[#0a0502] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                No Products Found
              </h3>
              <p className="text-[#6B5D4A] mb-6">Try a different search term</p>
              <button onClick={() => setSearchQuery("")} className="bg-[#C9A45C] text-[#0a0502] px-6 py-3 rounded-full font-bold hover:bg-[#A88848] transition-colors">
                Clear Search
              </button>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ScaleIn key={index} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-[#E8DEC8]/50 hover:shadow-2xl hover:shadow-[#C9A45C]/10 hover:border-[#C9A45C]/30 transition-all duration-500"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden h-72">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#f5f0e8] to-[#E8DCC4] flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-700">
                          🪵
                        </div>
                      )}

                      {/* Price Badge */}
                      <div className="absolute top-5 right-5">
                        <div className="bg-[#0a0502] text-[#C9A45C] px-5 py-2.5 rounded-full font-bold text-sm tracking-wider shadow-xl">
                          {product.price}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-[#0a0502]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-start justify-end p-8">
                        <div className="flex gap-3">
                          {client.whatsapp && (
                            <motion.a
                              href={`${whatsappUrl}?text=${encodeURIComponent(`Hi! I'm interested in ${product.name}. Please share details.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl hover:bg-green-600 transition-colors"
                              whileTap={{ scale: 0.95 }}
                            >
                              <MessageCircle className="w-4 h-4" /> Enquire
                            </motion.a>
                          )}
                          {client.phone && (
                            <a
                              href={`tel:${client.phone}`}
                              className="bg-[#C9A45C] text-[#0a0502] px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl hover:bg-[#A88848] transition-colors"
                            >
                              <Phone className="w-4 h-4" /> Call
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-8">
                      <h3
                        className="text-xl font-bold text-[#0a0502] mb-3 group-hover:text-[#8B6F47] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {product.name}
                      </h3>
                      
                      {product.description && (
                        <p className="text-[#6B5D4A] text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>
                      )}

                      {/* Bottom Bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]/50">
                        <span className="text-[#C9A45C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {product.price}
                        </span>
                        {client.whatsapp && (
                          <a
                            href={`${whatsappUrl}?text=${encodeURIComponent(`Hi! I want to know about ${product.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#8B6F47] font-semibold text-sm hover:text-[#C9A45C] transition-colors group/link"
                          >
                            Get Quote <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Quality Guarantee", desc: "100% quality assured on every product" },
              { icon: Truck, title: "Free Delivery", desc: `Free delivery within ${client.city}` },
              { icon: Star, title: "Best Prices", desc: "Competitive prices in the market" },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#0a0502] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-[#C9A45C]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0a0502] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                  <p className="text-sm text-[#6B5D4A]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA - Custom Order
          ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0a0502] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A45C 1px, transparent 0)`, backgroundSize: "48px 48px" }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <div className="text-[11px] font-bold uppercase tracking-[4px] text-[#C9A45C] mb-6">— Custom Orders</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Need Something <span className="italic text-[#C9A45C]">Custom?</span>
            </h2>
            <p className="text-xl text-white/40 mb-10 max-w-2xl mx-auto">
              Can&apos;t find what you need? We offer custom solutions tailored to your requirements.
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              {client.phone && (
                <motion.a href={`tel:${client.phone}`} className="bg-[#C9A45C] text-[#0a0502] font-bold px-10 py-5 rounded-full text-lg flex items-center gap-3 shadow-2xl" whileHover={{ scale: 1.05 }}>
                  <Phone className="w-6 h-6" /> Call Us
                </motion.a>
              )}
              {client.whatsapp && (
                <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold px-10 py-5 rounded-full text-lg flex items-center gap-3 shadow-2xl" whileHover={{ scale: 1.05 }}>
                  <MessageCircle className="w-6 h-6" /> WhatsApp
                </motion.a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}