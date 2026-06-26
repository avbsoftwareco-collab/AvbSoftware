"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Search, Tag, User, FileText } from "lucide-react";
import { Client, BlogPost, getClientBlogPosts } from "@/lib/supabase";

// ═══════════════════════════════════════════════════
// ANIMATION COMPONENTS
// ═══════════════════════════════════════════════════
const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EBlog Post%3C/text%3E%3C/svg%3E";

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
interface BlogPageProps {
  client: Client;
  setPage?: (page: string, postSlug?: string) => void;
}

export default function BlogPage({ client, setPage }: BlogPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!client.id) return;
      setLoading(true);
      const data = await getClientBlogPosts(client.id);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [client.id]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Data
  const heroImage = client.hero_image || client.hero_image_url || PLACEHOLDER;
  const restaurantName = client.business_name || "Restaurant";

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean) as string[]))];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured post (first one)
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="bg-[#0a0a0a] text-[var(--theme-text)] font-serif overflow-x-hidden min-h-screen">

      {/* ════════════════════════════════════════════════════ */}
      {/*  1. HERO                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: isMobile ? 0 : heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.25)" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent -translate-y-[60px]" />
        <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent translate-y-[60px]" />

        <motion.div style={{ opacity: isMobile ? 1 : heroOpacity }} className="relative z-10 w-full">
          <div className="text-center px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="h-px w-10 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] md:text-[11px] tracking-[4px] sm:tracking-[6px] uppercase font-sans font-light">
                Stories & Insights
              </span>
              <div className="h-px w-10 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[4px] sm:tracking-[6px] md:tracking-[8px] mb-4 leading-none bg-gradient-to-br from-[#f5f0e8]via-[var(--theme-primary)] to-[#f5f0e8] bg-clip-text text-transparent"
            >
              Our Journal
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base tracking-[2px] sm:tracking-[3px] md:tracking-[4px] text-[rgba(245,240,232,0.7)] uppercase font-sans font-light mt-4 sm:mt-5 md:mt-6 max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4"
            >
              Tales from the kitchen of {restaurantName}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. SEARCH & FILTERS                                */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] border-y border-[rgba(212,175,55,0.1)] py-6 sm:py-8 sticky top-16 sm:top-20 z-30 backdrop-blur-xl">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4text-[var(--theme-primary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, recipes, news..."
                className="w-full pl-12 pr-4 py-3 sm:py-3.5bg-[var(--theme-bg)] border border-[rgba(212,175,55,0.2)] text-[var(--theme-text)] placeholder-[rgba(245,240,232,0.3)] font-sans text-sm focus:outline-none focus:border-[var(--theme-primary)] transition-colors"
              />
            </div>

            {/* Categories */}
            {categories.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-[10px] sm:text-[11px] tracking-[2px] uppercase font-sans font-semibold whitespace-nowrap transition-all border ${
                      selectedCategory === cat
                        ? "bg-[#D4AF37] text-[#0a0a0a] border-[var(--theme-primary)]"
                        : "bg-transparent text-[rgba(245,240,232,0.7)] border-[rgba(212,175,55,0.2)] hover:border-[var(--theme-primary)] hover:text-[#D4AF37]"
                    }`}
                  >
                    {cat === "all" ? "All Posts" : cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. BLOG POSTS                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px]bg-[var(--theme-bg)]">
        <div className="max-w-[1400px] mx-auto">

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-[var(--theme-primary)]/20 border-t-[#D4AF37] rounded-full mb-4"
              />
              <p className="text-[rgba(245,240,232,0.5)] text-sm tracking-[2px] uppercase font-sans">
                Loading Stories...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredPosts.length === 0 && (
            <FadeIn className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)] mb-6">
                <FileText className="w-8 h-8text-[var(--theme-primary)]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text)] mb-3">
                {searchQuery || selectedCategory !== "all" ? "No Posts Found" : "Stories Coming Soon"}
              </h3>
              <p className="text-[rgba(245,240,232,0.5)] font-sans text-sm sm:text-base max-w-md mx-auto">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "We're crafting amazing stories for you. Check back soon!"}
              </p>
            </FadeIn>
          )}

          {/* Posts Grid */}
          {!loading && filteredPosts.length > 0 && (
            <>
              {/* ═══ FEATURED POST (First Post) ═══ */}
              {featuredPost && (
                <FadeIn>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setPage?.("blog-post", featuredPost.slug)}
                    className="group cursor-pointer mb-16 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-0bg-[var(--theme-bg-secondary)] border border-[rgba(212,175,55,0.15)] overflow-hidden"
                  >
                    {/* Featured Image */}
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[500px] overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${featuredPost.cover_image || PLACEHOLDER})`,
                          filter: "brightness(0.7)"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent lg:bg-gradient-to-r" />

                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5bg-[var(--theme-primary)] text-[#0a0a0a] text-[9px] sm:text-[10px] tracking-[3px] uppercase font-sans font-bold">
                          ✦ Featured Story
                        </span>
                      </div>

                      {/* Category */}
                      {featuredPost.category && (
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                          <span className="inline-block px-3 py-1.5 bg-[rgba(10,10,10,0.7)] backdrop-blur-mdtext-[var(--theme-primary)] text-[9px] sm:text-[10px] tracking-[2px] uppercase font-sans font-semibold border border-[rgba(212,175,55,0.3)]">
                            {featuredPost.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Featured Content */}
                    <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-[10px] sm:text-[11px] text-[rgba(245,240,232,0.5)] uppercase tracking-[2px] font-sans">
                        {featuredPost.published_at && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(featuredPost.published_at).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                        )}
                        {featuredPost.author_name && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-3 h-3" />
                            {featuredPost.author_name}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[var(--theme-text)] leading-[1.15] mb-4 sm:mb-5 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {featuredPost.title}
                      </h2>

                      {/* Excerpt */}
                      {featuredPost.excerpt && (
                        <p className="text-[rgba(245,240,232,0.65)] font-sans text-sm sm:text-base leading-[1.8] mb-6 sm:mb-8 font-light">
                          {featuredPost.excerpt}
                        </p>
                      )}

                      {/* Tags */}
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                          {featuredPost.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.15)]text-[var(--theme-primary)] text-[10px] sm:text-[11px] font-sans"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <motion.div
                        whileHover={{ x: 8 }}
                        className="inline-flex items-center gap-3text-[var(--theme-primary)] text-[11px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase font-sans font-semibold"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </FadeIn>
              )}

              {/* ═══ POSTS GRID ═══ */}
              {remainingPosts.length > 0 && (
                <>
                  <FadeIn className="mb-10 sm:mb-12 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.3)]" />
                    <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans">
                      More Stories
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.3)]" />
                  </FadeIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {remainingPosts.map((post, i) => (
                      <FadeIn key={post.id} delay={i * 0.1}>
                        <motion.article
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.4 }}
                          onClick={() => setPage?.("blog-post", post.slug)}
                          className="group cursor-pointerbg-[var(--theme-bg-secondary)] border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.3)] overflow-hidden h-full flex flex-col transition-all"
                        >
                          {/* Image */}
                          <div className="relative h-52 sm:h-56 overflow-hidden">
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.6 }}
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${post.cover_image || PLACEHOLDER})`,
                                filter: "brightness(0.75)"
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                            {/* Category Badge */}
                            {post.category && (
                              <div className="absolute top-3 left-3">
                                <span className="inline-block px-2.5 py-1 bg-[rgba(10,10,10,0.85)] backdrop-blur-mdtext-[var(--theme-primary)] text-[9px] tracking-[2px] uppercase font-sans font-semibold border border-[rgba(212,175,55,0.3)]">
                                  {post.category}
                                </span>
                              </div>
                            )}

                            {/* Number */}
                            <div className="absolute bottom-3 right-3 text-3xl sm:text-4xl font-bold text-[rgba(212,175,55,0.3)] leading-none font-sans">
                              0{i + 1}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 sm:p-6 flex-1 flex flex-col">

                            {/* Meta */}
                            <div className="flex items-center gap-3 mb-3 text-[9px] sm:text-[10px] text-[rgba(245,240,232,0.4)] uppercase tracking-[1.5px] font-sans">
                              {post.published_at && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-2.5 h-2.5" />
                                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                                    day: "numeric", month: "short"
                                  })}
                                </span>
                              )}
                              {post.author_name && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-[rgba(212,175,55,0.3)]" />
                                  <span>{post.author_name}</span>
                                </>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text)] leading-[1.3] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            {post.excerpt && (
                              <p className="text-[rgba(245,240,232,0.55)] font-sans text-[13px] sm:text-sm leading-[1.7] mb-4 font-light line-clamp-3 flex-1">
                                {post.excerpt}
                              </p>
                            )}

                            {/* Footer */}
                            <div className="pt-4 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between">
                              <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[2px] uppercase font-sans font-semibold">
                                Read More
                              </span>
                              <motion.div
                                whileHover={{ x: 4 }}
                                className="text-[#D4AF37]"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.article>
                      </FadeIn>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  4. CTA SECTION                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.15)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.85)] to-[rgba(0,0,0,0.6)]" />

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
              <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[4px] uppercase font-sans">
                Visit Us
              </span>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--theme-text)] mb-4 sm:mb-5">
              Experience It <span className="text-[#D4AF37]">Yourself</span>
            </h2>
            <p className="text-[rgba(245,240,232,0.6)] font-sans text-sm sm:text-base mb-8 sm:mb-10 font-light">
              Reading about our food is one thing. Tasting it is unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {client.phone && (
                <motion.a
                  href={`tel:${client.phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-[var(--theme-primary)] to-[#c9a227] text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer no-underline text-center"
                >
                  Reserve A Table
                </motion.a>
              )}
              <motion.button
                onClick={() => setPage?.("menu")}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-transparenttext-[var(--theme-primary)] border border-[rgba(212,175,55,0.5)] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer text-center"
              >
                View Menu
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}