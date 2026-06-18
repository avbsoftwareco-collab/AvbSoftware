"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

// ===== ICONS =====
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

export default function BlogPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden">
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
              OUR JOURNAL
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>

            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Insights & <span className="italic gradient-text">Resources</span>
            </h1>
            <p className="text-lg text-[#6B5D4A] max-w-2xl mx-auto">
              Expert articles on <strong className="text-[#2B2419]">web development, mobile apps, SEO, and
              technology</strong> to help your business grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG GRID ===== */}
      <section className="section-padding bg-[#FAF5EA]">
        <div className="container-custom">
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p 
                className="text-[#6B5D4A] text-lg italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Articles coming soon! Stay tuned for amazing insights.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-3xl border border-[#E8DEC8] bg-white overflow-hidden hover:shadow-2xl hover:shadow-[#8B6F47]/15 hover:border-[#D4C29E] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Thumbnail */}
                  <div className="h-52 bg-gradient-to-br from-[#E8DCC4] via-[#D4C29E] to-[#C9A45C] relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, #FAF5EA 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Big emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl opacity-30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        {post.category === "Web Development"
                          ? "🌐"
                          : post.category === "Mobile Development"
                          ? "📱"
                          : post.category === "SEO"
                          ? "🔍"
                          : post.category === "Design"
                          ? "🎨"
                          : "💻"}
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#8B6F47] text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md">
                        <TagIcon />
                        {post.category}
                      </span>
                    </div>

                    {/* Reading time badge */}
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1.5 bg-[#2B2419]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1.5">
                        <ClockIcon />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-[#8B6F47] font-semibold mb-3 uppercase tracking-wider">
                      <CalendarIcon />
                      {post.date}
                    </div>

                    {/* Title */}
                    <h2 
                      className="font-bold text-xl text-[#2B2419] mb-3 group-hover:text-[#8B6F47] transition-colors line-clamp-2 leading-snug"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#6B5D4A] text-sm leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author + Read more */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-9 h-9 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {post.author
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#2B2419]">{post.author}</p>
                          <p className="text-[10px] text-[#8B6F47] uppercase tracking-wider font-semibold">Author</p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-[#8B6F47] text-sm font-bold hover:gap-2.5 transition-all group/link"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Read
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="section-padding bg-[#F5F0E6] border-y border-[#D4C29E]/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              EXPLORE TOPICS
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Browse by <span className="italic gradient-text">Category</span>
            </h2>
            <p className="text-[#6B5D4A]">
              Find articles relevant to your interests and business needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🌐", name: "Web Development", count: "12+" },
              { icon: "📱", name: "Mobile Apps", count: "8+" },
              { icon: "🔍", name: "SEO Tips", count: "10+" },
              { icon: "🎨", name: "UI/UX Design", count: "6+" },
              { icon: "💼", name: "Business", count: "5+" },
            ].map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white rounded-2xl border border-[#E8DEC8] text-center hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 
                  className="font-bold text-[#2B2419] text-sm mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cat.name}
                </h3>
                <p className="text-xs text-[#8B6F47] font-semibold">{cat.count} articles</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section-padding bg-[#FAF5EA]">
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

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#C9A45C] mb-6">
                <span className="w-8 h-px bg-[#C9A45C]"></span>
                STAY UPDATED
                <span className="w-8 h-px bg-[#C9A45C]"></span>
              </div>

              <h2 
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Want More <span className="italic" style={{ color: '#C9A45C' }}>Insights?</span>
              </h2>

              <p className="text-[#E8DCC4] text-lg mb-10">
                Follow us on LinkedIn and Instagram for weekly tips on web
                development, mobile apps, and digital growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://linkedin.com/company/avbsoftware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Follow on LinkedIn
                  <ArrowRightIcon />
                </a>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  💬 Ask Us Anything
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}