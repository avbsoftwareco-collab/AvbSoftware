"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Eye, MessageCircle, ArrowRight, Sparkles, Crown, X } from "lucide-react";
import { templates, getAllCategories } from "../../../lib/templates-data";

const WHATSAPP_NUMBER = "918103558368";

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getAllCategories();

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = activeCategory === "All" || template.category === activeCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ═══════════════════════════════════════════════
          COMPACT HERO + SEARCH + FILTER (All in One!)
          ═══════════════════════════════════════════════ */}
      <section className="pt-28 pb-6 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden">
        {/* Decorative blobs - chhote */}
        <div className="absolute top-10 -left-20 w-[300px] h-[300px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-20 w-[300px] h-[300px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-3">
              <span className="w-6 h-px bg-[#8B6F47]"></span>
              READY TEMPLATES
              <span className="w-6 h-px bg-[#8B6F47]"></span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B2419] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose Your <span className="italic gradient-text">Perfect</span> Template
            </h1>
            
            <p className="text-sm md:text-base text-[#6B5D4A] max-w-2xl mx-auto mb-4">
              Premium designs <strong className="text-[#2B2419]">Live in 3-5 days</strong> at <strong className="text-[#8B6F47]">₹799/month</strong>
            </p>

            {/* Quick Stats - Inline */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-[#6B5D4A]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <strong className="text-[#2B2419]">{templates.length}+</strong> Templates
              </span>
              <span className="text-[#D4C29E]">•</span>
              <span className="flex items-center gap-1.5 text-[#6B5D4A]">
                <span className="w-2 h-2 bg-[#C9A45C] rounded-full"></span>
                <strong className="text-[#2B2419]">₹799</strong> Starting
              </span>
              <span className="text-[#D4C29E]">•</span>
              <span className="flex items-center gap-1.5 text-[#6B5D4A]">
                <span className="w-2 h-2 bg-[#8B6F47] rounded-full"></span>
                <strong className="text-[#2B2419]">3-5 Days</strong> Delivery
              </span>
            </div>
          </motion.div>

          {/* COMBINED Search + Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-[#E8DEC8] p-3 flex flex-col md:flex-row gap-3 items-stretch">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl text-[#2B2419] placeholder:text-[#8B7E6A] outline-none focus:border-[#8B6F47] focus:bg-white transition-all text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B6F47] hover:text-[#2B2419] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter - Dropdown for Mobile, Buttons for Desktop */}
              <div className="hidden md:flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-md"
                        : "bg-[#FAF5EA] text-[#6B5D4A] border border-[#E8DEC8] hover:border-[#D4C29E] hover:text-[#8B6F47]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile Category Dropdown */}
              <div className="md:hidden">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl text-[#2B2419] font-semibold text-sm outline-none focus:border-[#8B6F47]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-center mt-3 text-xs text-[#8B6F47] font-semibold">
              {filteredTemplates.length === 0 
                ? "No templates found" 
                : `Showing ${filteredTemplates.length} ${filteredTemplates.length === 1 ? 'template' : 'templates'}`
              }
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TEMPLATES GRID - IMMEDIATE DISPLAY!
          ═══════════════════════════════════════════════ */}
      <section className="py-10 bg-[#FAF5EA] min-h-screen">
        <div className="container-custom">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p
                className="text-[#6B5D4A] text-lg italic mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                No templates found
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-6 py-2 bg-[#8B6F47] text-white rounded-xl font-semibold hover:bg-[#6B5535] transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredTemplates.map((template, index) => (
                  <motion.article
                    key={template.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group rounded-2xl border border-[#E8DEC8] bg-white overflow-hidden hover:shadow-xl hover:shadow-[#8B6F47]/15 hover:border-[#D4C29E] transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Preview - Compact */}
                    <div
                      className="relative h-48 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.accent}, ${template.colors.secondary})`,
                      }}
                    >
                      {/* Big Emoji Background */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl opacity-25 group-hover:scale-110 transition-transform duration-500">
                          {template.emoji}
                        </div>
                      </div>

                      {/* Mini Browser Mockup */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white rounded-lg shadow-xl overflow-hidden border border-white/20">
                        <div className="flex items-center gap-1 px-2 py-1.5 bg-[#F5F0E6] border-b border-[#E8DEC8]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD93D]"></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6BCB77]"></span>
                          <div className="ml-1 flex-1 h-2 bg-white rounded border border-[#E8DEC8]"></div>
                        </div>
                        <div className="p-2 space-y-1.5">
                          <div
                            className="h-4 rounded"
                            style={{ background: template.colors.primary, opacity: 0.6 }}
                          ></div>
                          <div className="flex gap-1">
                            <div className="h-1.5 w-1/3 bg-[#E8DEC8] rounded-full"></div>
                            <div className="h-1.5 w-1/4 bg-[#F0E8D4] rounded-full"></div>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="h-5 bg-[#F5F0E6] rounded"></div>
                            <div className="h-5 bg-[#F5F0E6] rounded"></div>
                            <div className="h-5 bg-[#F5F0E6] rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {template.bestseller && (
                          <span className="px-2.5 py-1 bg-[#C9A45C] text-white text-[10px] font-bold rounded-full shadow-md flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            BESTSELLER
                          </span>
                        )}
                        {template.isNew && (
                          <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#2B2419] text-[10px] font-bold rounded-full shadow-md">
                          {template.category}
                        </span>
                      </div>
                    </div>

                    {/* Content - Compact */}
                    <div className="p-5">
                      <h3
                        className="font-bold text-xl text-[#2B2419] mb-1.5 group-hover:text-[#8B6F47] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {template.name}
                      </h3>
                      <p className="text-[#6B5D4A] text-sm mb-3 leading-relaxed line-clamp-2">
                        {template.shortDescription}
                      </p>

                      {/* Features - Compact */}
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-1.5">
                          {template.features.slice(0, 4).map((feature) => (
                            <span
                              key={feature}
                              className="text-xs text-[#6B5D4A] flex items-center gap-1 truncate"
                            >
                              <span className="text-[#8B6F47] flex-shrink-0">✓</span>
                              <span className="truncate">{feature}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing - Compact */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E8DEC8]">
                        <div className="flex items-baseline gap-1">
                          <span
                            className="text-2xl font-bold gradient-text"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            ₹{template.pricing.monthly}
                          </span>
                          <span className="text-xs text-[#6B5D4A]">/mo</span>
                        </div>
                        <span className="text-xs text-[#8B6F47] font-semibold flex items-center gap-1">
                          ⏱️ {template.deliveryTime}
                        </span>
                      </div>

                      {/* CTA Buttons - Compact */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                           href={`/templates/${template.slug}`}
                          className="flex items-center justify-center gap-1.5 py-2.5 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-lg border border-[#E8DEC8] hover:bg-[#8B6F47] hover:text-white hover:border-[#8B6F47] transition-all text-sm"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          <Eye className="w-4 h-4" />
                          Demo
                        </Link>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi AVB Software! I'm interested in the "${template.name}" template. Please share details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Get This
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS - At Bottom
          ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F5F0E6] border-y border-[#D4C29E]/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-3">
              <span className="w-6 h-px bg-[#8B6F47]"></span>
              HOW IT WORKS
              <span className="w-6 h-px bg-[#8B6F47]"></span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#2B2419]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get Your Website in <span className="italic gradient-text">3 Easy Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: "👁️",
                title: "Choose Template",
                desc: "Browse and pick the perfect one for your business",
              },
              {
                step: "02",
                icon: "💬",
                title: "WhatsApp Us",
                desc: "Share your business details and content",
              },
              {
                step: "03",
                icon: "🚀",
                title: "Go Live!",
                desc: "Your website goes live in 3-5 business days",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative text-center p-6 bg-white rounded-2xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-lg transition-all"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className="px-3 py-1 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full text-white text-[10px] font-bold shadow-md"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    STEP {item.step}
                  </div>
                </div>

                <div className="text-4xl mb-3 mt-2">{item.icon}</div>
                <h3
                  className="font-bold text-[#2B2419] text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#6B5D4A] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA - Compact
          ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-[#FAF5EA]">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10">
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Don&apos;t See Your <span className="italic" style={{ color: "#C9A45C" }}>Business?</span>
              </h2>

              <p className="text-[#E8DCC4] text-base mb-6 max-w-xl mx-auto">
                We build custom templates too! Tell us about your business.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi AVB Software! I need a custom template for my business. Please help!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" />
                Request Custom Template
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}