"use client";

import { Client } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowLeft, User, Share2 } from "lucide-react";

interface Props {
  client: Client;
  postSlug: string;
  setPage: (page: string, slug?: string) => void;
}

export default function BlogPostPage({ client, postSlug, setPage }: Props) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Find post from blog_posts
  const allPosts = (client as any).blog_posts || [
    {
      slug: "top-5-things-to-do",
      title: "Top 5 Things to Do at Our Resort",
      excerpt: "Discover the must-try experiences.",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      category: "Experiences",
      author: "Resort Team",
      date: "2024-12-15",
      readTime: "5 min read",
      content: `<p>Welcome to our paradise! Here are the top 5 experiences you absolutely must try during your stay.</p>
      <h2>1. Sunset Beach Yoga</h2>
      <p>Start your day with rejuvenating yoga sessions on our private beach.</p>
      <h2>2. Spa Therapy</h2>
      <p>Indulge in ancient healing therapies at our world-class spa.</p>
      <h2>3. Culinary Journey</h2>
      <p>Taste the finest local and international cuisines.</p>
      <h2>4. Adventure Activities</h2>
      <p>From snorkeling to kayaking, adventure awaits.</p>
      <h2>5. Stargazing Nights</h2>
      <p>Experience the magic of crystal-clear night skies.</p>`,
    },
  ];

  const post = allPosts.find((p: any) => p.slug === postSlug) || allPosts[0];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>
          Article not found
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--theme-bg)", color: "var(--theme-text)" }}>
      {/* HERO */}
      <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: pageLoaded ? "scale(1)" : "scale(1.1)",
            transition: "transform 2s ease",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        <div className="relative z-[4] h-full flex items-end justify-center text-center px-6 pb-20">
          <div className="max-w-[900px]">
            <button
              onClick={() => setPage("blog")}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 backdrop-blur-md transition-all hover:-translate-y-1"
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid var(--theme-border)",
                color: "#fff",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </button>

            <div
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ background: "var(--theme-primary)", color: "var(--theme-bg)" }}
            >
              <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700 }}>
                {post.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 5vw, 60px)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-1px",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                lineHeight: 1.1,
                marginBottom: "20px",
                opacity: pageLoaded ? 1 : 0,
                transform: pageLoaded ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 1.4s ease 1.4s, transform 1.4s ease 1.4s",
              }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span style={{ fontSize: "13px" }}>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: "13px" }}>
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span style={{ fontSize: "13px" }}>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="py-16 sm:py-24 px-5 max-w-[800px] mx-auto">
        <div
          className="prose prose-lg"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "19px",
            lineHeight: 1.9,
            color: "var(--theme-text-muted)",
          }}
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
        />

        {/* Share */}
        <div className="mt-16 pt-8 border-t flex items-center justify-between" style={{ borderColor: "var(--theme-border)" }}>
          <button
            onClick={() => setPage("blog")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[2px] transition-all hover:-translate-y-1"
            style={{
              background: "transparent",
              color: "var(--theme-primary)",
              border: "1.5px solid var(--theme-primary)",
            }}
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[2px] transition-all hover:-translate-y-1"
            style={{
              background: "var(--theme-primary)",
              color: "var(--theme-bg)",
            }}
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* CTA */}
        <div
          className="mt-12 p-8 rounded-3xl text-center"
          style={{
            background: "var(--theme-bg-card)",
            border: "1px solid var(--theme-border)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "var(--theme-text)",
              marginBottom: "10px",
            }}
          >
            Inspired to Visit?
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "17px",
              color: "var(--theme-text-muted)",
            }}
          >
            Experience the magic yourself. Book your stay with us today.
          </p>
          <button
            onClick={() => setPage("contact")}
            className="px-10 py-3.5 rounded-full text-xs font-bold uppercase tracking-[3px] transition-all hover:-translate-y-1"
            style={{
              background: "var(--theme-primary)",
              color: "var(--theme-bg)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
            }}
          >
            Reserve Your Stay
          </button>
        </div>
      </article>

      <style jsx global>{`
        .prose h2 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--theme-text);
          margin-top: 40px;
          margin-bottom: 16px;
        }
        .prose h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--theme-text);
          margin-top: 30px;
          margin-bottom: 12px;
        }
        .prose p {
          margin-bottom: 24px;
        }
        .prose strong {
          color: var(--theme-primary);
        }
      `}</style>
    </div>
  );
}