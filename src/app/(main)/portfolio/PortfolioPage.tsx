"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Code2, Smartphone, Palette, Globe, ShoppingCart, X } from "lucide-react";

type Category = "All" | "Web" | "Mobile" | "Design" | "E-Commerce";

const projects = [
  {
    id: 1,
    title: "E-Commerce Website for Indore Textile Business",
    slug: "ecommerce-textile-indore",
    category: "E-Commerce",
    client: "Textile Retailer, Indore",
    clientLocation: "Indore, MP",
    description:
      "A modern e-commerce website built for a leading textile retailer in Indore with integrated payment gateway (Razorpay), inventory management, and GST-compliant invoicing. Mobile-first design with 100+ products.",
    shortDescription: "Modern e-commerce platform for Indore textile business",
    technologies: ["Next.js", "Tailwind CSS", "Razorpay", "MongoDB", "Node.js"],
    image: "/images/portfolio/ecommerce-indore.jpg",
    status: "Live",
    placeholder: true,
    industry: "Textile & Retail",
    year: "2024",
    results: [
      "60% increase in online sales",
      "Mobile-optimized checkout",
      "Integrated Razorpay payment",
      "GST-compliant invoicing",
    ],
  },
  {
    id: 2,
    title: "Service Booking Mobile App for Bhopal Salon Chain",
    slug: "mobile-app-salon-bhopal",
    category: "Mobile",
    client: "Salon Chain, Bhopal",
    clientLocation: "Bhopal, MP",
    description:
      "Cross-platform mobile application for a popular salon chain in Bhopal with real-time appointment booking, push notifications, and loyalty program. Available on Android & iOS.",
    shortDescription: "Cross-platform salon booking app for Bhopal",
    technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Stripe"],
    image: "/images/portfolio/salon-app-bhopal.jpg",
    status: "Live",
    placeholder: true,
    industry: "Beauty & Wellness",
    year: "2024",
    results: [
      "5000+ app downloads",
      "Real-time appointment booking",
      "Loyalty rewards integration",
      "Available on both stores",
    ],
  },
  {
    id: 3,
    title: "Brand Identity & UI/UX for Indore Startup",
    slug: "branding-design-indore",
    category: "Design",
    client: "Tech Startup, Indore",
    clientLocation: "Indore, MP",
    description:
      "Complete brand identity and UI/UX design for an Indore-based startup, including logo design, design system, marketing materials, and mobile app screens. Modern, conversion-focused design.",
    shortDescription: "Complete branding & UI/UX for Indore startup",
    technologies: ["Figma", "Adobe Illustrator", "Adobe XD", "Photoshop"],
    image: "/images/portfolio/branding-indore.jpg",
    status: "Completed",
    placeholder: true,
    industry: "Technology",
    year: "2024",
    results: [
      "Complete brand identity",
      "50+ UI screens designed",
      "Design system created",
      "Marketing collateral",
    ],
  },
  {
    id: 4,
    title: "Custom ERP for Bhopal Manufacturing Business",
    slug: "erp-system-bhopal",
    category: "Web",
    client: "Manufacturing Company, Bhopal",
    clientLocation: "Bhopal, MP",
    description:
      "Custom ERP system for a mid-sized manufacturing business in Bhopal managing inventory, production planning, invoicing, GST billing, and staff management. Improved efficiency by 40%.",
    shortDescription: "Custom ERP system for Bhopal manufacturer",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "Redux"],
    image: "/images/portfolio/erp-bhopal.jpg",
    status: "Live",
    placeholder: true,
    industry: "Manufacturing",
    year: "2024",
    results: [
      "40% efficiency improvement",
      "Real-time inventory tracking",
      "GST-compliant invoicing",
      "Multi-user role management",
    ],
  },
];

const categories: Category[] = ["All", "Web", "Mobile", "Design", "E-Commerce"];

const categoryIcons = {
  Web: Globe,
  Mobile: Smartphone,
  Design: Palette,
  "E-Commerce": ShoppingCart,
  All: Code2,
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section 
        className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="portfolio-hero-heading"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-6">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              OUR WORK
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>

            <h1 
              id="portfolio-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafted Projects for
              <br />
              <span className="italic gradient-text">Ambitious Businesses</span>
            </h1>
            <p className="text-lg text-[#6B5D4A] max-w-2xl mx-auto">
              Real <strong className="text-[#2B2419]">web development, mobile app, and software solutions</strong> built for 
              businesses in <strong className="text-[#2B2419]">Indore, Bhopal, and across India</strong>. 
              Here&apos;s a selection of our recent work.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "15+", label: "Industries Served" },
                { value: "5★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div 
                    className="text-4xl font-bold gradient-text"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6B5D4A] mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PORTFOLIO CONTENT ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-label="Portfolio projects gallery"
      >
        <div className="container-custom">
          {/* Filter Tabs */}
          <div 
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
            role="tablist"
          >
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-lg shadow-[#8B6F47]/30"
                      : "bg-white text-[#6B5D4A] border border-[#E8DEC8] hover:border-[#D4C29E] hover:text-[#8B6F47]"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filtered.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group rounded-3xl border border-[#E8DEC8] bg-white overflow-hidden hover:shadow-2xl hover:shadow-[#8B6F47]/15 hover:border-[#D4C29E] transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Project image / placeholder */}
                  <div className="relative h-56 bg-gradient-to-br from-[#E8DCC4] via-[#D4C29E] to-[#C9A45C] overflow-hidden">
                    {project.placeholder ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                          <Code2 className="w-10 h-10 text-[#8B6F47]" aria-hidden="true" />
                        </div>
                        <p 
                          className="text-[#6B5535] text-sm font-semibold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Screenshot Coming Soon
                        </p>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#8B6F47]/20 to-[#C9A45C]/20" />
                    )}

                    {/* Decorative pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, #FAF5EA 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#8B6F47] text-xs font-bold rounded-full shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-md ${
                          project.status === "Live"
                            ? "bg-[#C9A45C] text-white"
                            : "bg-[#6B5D4A] text-white"
                        }`}
                      >
                        {project.status === "Live" && (
                          <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                        )}
                        {project.status}
                      </span>
                    </div>

                    {/* Location badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 bg-[#2B2419]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        📍 {project.clientLocation}
                      </span>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6">
                    <h2 
                      className="font-bold text-xl text-[#2B2419] mb-2 leading-snug group-hover:text-[#8B6F47] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-xs text-[#8B6F47] font-semibold mb-3 uppercase tracking-wider">
                      🏢 {project.client} · {project.industry} · {project.year}
                    </p>
                    <p className="text-[#6B5D4A] text-sm leading-relaxed mb-5">
                      {project.shortDescription}
                    </p>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#FAF5EA] text-[#6B5D4A] text-xs rounded-md font-semibold border border-[#E8DEC8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-[#8B6F47] font-bold text-sm hover:gap-3 transition-all group/btn"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Coming Soon Message */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p 
                className="text-[#6B5D4A] text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                More projects coming soon in this category!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== PROJECT MODAL ===== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2B2419]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF5EA] rounded-3xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#D4C29E]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1.5 bg-[#8B6F47] text-white text-xs font-bold rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className="px-3 py-1.5 bg-[#E8DCC4] text-[#6B5535] text-xs font-bold rounded-full">
                      📍 {selectedProject.clientLocation}
                    </span>
                    <span className="px-3 py-1.5 bg-[#E8DCC4] text-[#6B5535] text-xs font-bold rounded-full">
                      {selectedProject.year}
                    </span>
                  </div>
                  <h3 
                    className="text-2xl font-bold text-[#2B2419] leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-[#8B6F47] font-semibold mt-2 uppercase tracking-wider">
                    🏢 {selectedProject.client} · {selectedProject.industry}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[#8B6F47] hover:text-[#2B2419] hover:bg-[#E8DCC4] w-10 h-10 rounded-full flex items-center justify-center transition-colors ml-4"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[#6B5D4A] leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Results Section */}
              <div className="mb-6 p-5 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl">
                <p 
                  className="font-bold text-white text-sm mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ✨ Project Results
                </p>
                <ul className="space-y-2">
                  {selectedProject.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#FAF5EA]">
                      <span className="text-[#C9A45C] mt-0.5 font-bold">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <p 
                  className="font-bold text-[#2B2419] text-sm mb-3 uppercase tracking-wider"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 bg-white border border-[#E8DEC8] text-[#8B6F47] text-xs font-bold rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="btn-primary w-full justify-center"
                onClick={() => setSelectedProject(null)}
              >
                Start a Similar Project →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section 
        className="section-padding bg-[#F5F0E6] border-t border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="industries-heading"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              INDUSTRIES SERVED
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="industries-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Diverse Industries, <span className="italic gradient-text">One Vision</span>
            </h2>
            <p className="text-[#6B5D4A]">
              From textile in Indore to healthcare in Bhopal, we&apos;ve built solutions for diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🧵", name: "Textile", count: "5+ projects" },
              { icon: "🛍️", name: "Retail & E-commerce", count: "8+ projects" },
              { icon: "🏥", name: "Healthcare", count: "4+ projects" },
              { icon: "🏭", name: "Manufacturing", count: "6+ projects" },
              { icon: "🎓", name: "Education", count: "5+ projects" },
              { icon: "🏘️", name: "Real Estate", count: "3+ projects" },
              { icon: "🍽️", name: "Restaurants", count: "4+ projects" },
              { icon: "💇", name: "Beauty & Wellness", count: "3+ projects" },
            ].map((industry) => (
              <div
                key={industry.name}
                className="p-5 bg-white rounded-2xl border border-[#E8DEC8] text-center hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{industry.icon}</div>
                <h3 
                  className="font-bold text-[#2B2419] text-sm mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {industry.name}
                </h3>
                <p className="text-xs text-[#8B6F47] font-semibold">{industry.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-labelledby="process-heading"
      >
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              OUR PROCESS
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="process-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How We Deliver <span className="italic gradient-text">Excellence</span>
            </h2>
            <p className="text-[#6B5D4A]">
              Our proven approach ensures every project for our clients exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", icon: "💬", title: "Discovery Call", desc: "Understanding your business needs" },
              { step: "02", icon: "🎨", title: "Design & Plan", desc: "Wireframes & detailed proposal" },
              { step: "03", icon: "⚡", title: "Development", desc: "Agile sprints with weekly updates" },
              { step: "04", icon: "🚀", title: "Launch & Support", desc: "Deployment + 3-month support" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative text-center p-7 bg-white rounded-3xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div 
                    className="w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.step}
                  </div>
                </div>

                <div className="text-4xl mb-3 mt-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 
                  className="font-bold text-[#2B2419] mb-2 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B5D4A] leading-relaxed">{item.desc}</p>

                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-[#D4C29E]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section 
        className="section-padding bg-[#F5F0E6]"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419]">
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A45C]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#C9A45C] mb-6">
                <span className="w-8 h-px bg-[#C9A45C]"></span>
                LET&apos;S COLLABORATE
                <span className="w-8 h-px bg-[#C9A45C]"></span>
              </div>

              <h2 
                id="cta-heading"
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Want to See Your Project <span className="italic" style={{ color: '#C9A45C' }}>Here?</span>
              </h2>

              <p className="text-[#E8DCC4] text-lg mb-10 max-w-xl mx-auto">
                Let&apos;s build something amazing together. Join the growing list of 
                <strong className="text-white"> happy clients across India</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Start Your Project →
                </Link>
                <a
                  href="https://wa.me/918103558368?text=Hi%20AVB%20Software!%20I%20saw%20your%20portfolio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}