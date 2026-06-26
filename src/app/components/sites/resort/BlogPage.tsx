"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

interface Props {
  client: Client;
  setPage: (page: string, slug?: string) => void;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content?: string;
}

export default function BlogPage({ client, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

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

  // ═══ Blog Posts (Dynamic or default) ═══
  const posts: BlogPost[] =
    (client as any).blog_posts && (client as any).blog_posts.length > 0
      ? (client as any).blog_posts
      : [
          {
            slug: "top-5-things-to-do",
            title: "Top 5 Things to Do at Our Resort",
            excerpt: "Discover the must-try experiences that make your stay unforgettable.",
            image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
            category: "Experiences",
            author: "Resort Team",
            date: "2024-12-15",
            readTime: "5 min read",
          },
          {
            slug: "luxury-spa-guide",
            title: "A Complete Guide to Our Luxury Spa",
            excerpt: "Explore the rejuvenating treatments and therapies at our world-class spa.",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
            category: "Wellness",
            author: "Spa Manager",
            date: "2024-12-10",
            readTime: "7 min read",
          },
          {
            slug: "tropical-cuisine",
            title: "Tropical Cuisine: Flavors of Paradise",
            excerpt: "A culinary journey through our exquisite tropical menu.",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            category: "Dining",
            author: "Executive Chef",
            date: "2024-12-05",
            readTime: "6 min read",
          },
          {
            slug: "honeymoon-paradise",
            title: "Why We're a Honeymoon Paradise",
            excerpt: "Romantic experiences crafted for newlyweds.",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            category: "Romance",
            author: "Wedding Planner",
            date: "2024-11-28",
            readTime: "4 min read",
          },
          {
            slug: "eco-friendly-stay",
            title: "Our Commitment to Sustainable Tourism",
            excerpt: "Learn how we're preserving paradise for future generations.",
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
            category: "Sustainability",
            author: "Resort Director",
            date: "2024-11-20",
            readTime: "8 min read",
          },
          {
            slug: "best-beaches-nearby",
            title: "Best Beaches Near Our Resort",
            excerpt: "Explore the pristine beaches just a short drive away.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
            category: "Travel",
            author: "Local Guide",
            date: "2024-11-15",
            readTime: "5 min read",
          },
        ];

  const uniqueCategories = Array.from(new Set(posts.map((p) => p.category)));
  const categories: string[] = ["All", ...uniqueCategories];

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  const heroImage =
    (client as any).blog_hero_image ||
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1920&q=80";

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pageLoaded ? "scale(1) translateY(0)" : "scale(1.2) translateY(-50px)",
            transition: "transform 2s ease",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
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
                ✦ Stories & Insights ✦
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
              Our{" "}
              <em
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--theme-primary)",
                }}
              >
                Journal
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
              Stories, tips, and inspiration from our paradise
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {posts.length > 0 && (
        <section className="py-20 px-5 -mt-16 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden cursor-pointer group rsv-hide"
              onClick={() => setPage("blog-post", posts[0].slug)}
              style={{
                background: "var(--theme-bg-card)",
                border: "1px solid var(--theme-border)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
              }}
            >
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
                  style={{ background: "var(--theme-primary)", color: "var(--theme-bg)" }}
                >
                  ⭐ Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold"
                    style={{ background: "rgba(212,175,55,0.15)", color: "var(--theme-primary)" }}
                  >
                    {posts[0].category}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--theme-text-muted)" }}>
                    {posts[0].readTime}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 700,
                    color: "var(--theme-text)",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                  }}
                >
                  {posts[0].title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontSize: "18px",
                    lineHeight: 1.7,
                    color: "var(--theme-text-muted)",
                    marginBottom: "20px",
                  }}
                >
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-3" style={{ color: "var(--theme-primary)" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
                    Read More
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTER + POSTS GRID */}
      <section className="py-16 px-5">
        <div className="max-w-[1400px] mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 rsv-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-5 sm:px-7 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[2px] transition-all hover:-translate-y-1"
                  style={{
                    background: isActive ? "var(--theme-primary)" : "transparent",
                    color: isActive ? "var(--theme-bg)" : "var(--theme-text)",
                    border: `1.5px solid ${isActive ? "var(--theme-primary)" : "var(--theme-border)"}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, i) => (
              <article
                key={post.slug}
                onClick={() => setPage("blog-post", post.slug)}
                className="group cursor-pointer rounded-3xl overflow-hidden rsv-hide transition-all hover:-translate-y-3"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-border)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  transitionDelay: `${(i % 6) * 0.1}s`,
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      color: "var(--theme-primary)",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "var(--theme-text-muted)" }}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--theme-text)",
                      marginBottom: "10px",
                      lineHeight: 1.2,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "var(--theme-text-muted)",
                      marginBottom: "16px",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 transition-all group-hover:gap-4" style={{ color: "var(--theme-primary)" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
                      Read Article
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--theme-primary)", opacity: 0.5 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "20px", color: "var(--theme-text-muted)" }}>
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}