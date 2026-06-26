"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Clock,
  Share2,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { Client, BlogPost, getBlogPostBySlug, getClientBlogPosts } from "@/lib/supabase";

// ═══════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════
const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) => {
  const d = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' fill='%23111'%3E%3Crect width='1200' height='800'/%3E%3Ctext x='50%25' y='50%25' font-size='32' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EBlog Post%3C/text%3E%3C/svg%3E";

// ═══════════════════════════════════════════════════
// READING TIME CALCULATOR
// ═══════════════════════════════════════════════════
function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, ""); // Strip HTML
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // Avg 200 words/min
  return Math.max(1, minutes);
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
interface BlogPostPageProps {
  client: Client;
  postSlug: string;
  setPage?: (page: string, postSlug?: string) => void;
}

export default function BlogPostPage({ client, postSlug, setPage }: BlogPostPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!client.id || !postSlug) return;
      setLoading(true);
      setNotFound(false);

      const data = await getBlogPostBySlug(client.id, postSlug);

      if (!data || data.status !== "published") {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(data);

      // Fetch related posts (other posts from same client)
      const allPosts = await getClientBlogPosts(client.id);
      const related = allPosts
        .filter((p) => p.id !== data.id)
        .filter(
          (p) =>
            p.category === data.category ||
            p.tags?.some((t) => data.tags?.includes(t))
        )
        .slice(0, 3);

      // If not enough related, add recent posts
      if (related.length < 3) {
        const recent = allPosts
          .filter((p) => p.id !== data.id && !related.find((r) => r.id === p.id))
          .slice(0, 3 - related.length);
        related.push(...recent);
      }

      setRelatedPosts(related);
      setLoading(false);

      // Scroll to top when post loads
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    fetchPost();
  }, [client.id, postSlug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const element = contentRef.current;
      const totalHeight = element.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY - element.offsetTop;
      const progress = Math.min(Math.max((scrollTop / totalHeight) * 100, 0), 100);
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // ── Share Handlers ──
  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = post?.title || "";

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-[var(--theme-primary)]/20 border-t-[#D4AF37] rounded-full mb-4"
        />
        <p className="text-[rgba(245,240,232,0.5)] text-sm tracking-[2px] uppercase font-sans">
          Loading Story...
        </p>
      </div>
    );
  }

  // ── Not Found State ──
  if (notFound || !post) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl sm:text-8xl mb-6 text-[rgba(212,175,55,0.3)] font-bold">
            404
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text)] mb-4">
            Story Not Found
          </h2>
          <p className="text-[rgba(245,240,232,0.5)] font-sans text-sm sm:text-base mb-8">
            The story you&apos;re looking for has wandered off. Let&apos;s get
            you back to the journal.
          </p>
          <motion.button
            onClick={() => setPage?.("blog")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-gradient-to-br from-[var(--theme-primary)] to-[#c9a227] text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </motion.button>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="bg-[#0a0a0a] text-[var(--theme-text)] font-serif overflow-x-hidden min-h-screen">

      {/* ════════════════════════════════════════════════════ */}
      {/*  READING PROGRESS BAR                               */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-[rgba(212,175,55,0.1)]">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--theme-primary)] via-[#f5c842] to-[var(--theme-primary)]"
          style={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/*  1. HERO SECTION                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-end overflow-hidden"
      >
        <motion.div
          style={{ y: isMobile ? 0 : heroY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.cover_image || PLACEHOLDER})`,
              filter: "brightness(0.4)",
            }}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[rgba(10,10,10,0.4)] to-transparent" />

        {/* Decorative gold lines */}
        <div className="hidden md:block absolute top-[20%] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.2)] to-transparent" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setPage?.("blog")}
          whileHover={{ x: -4 }}
          className="absolute top-24 sm:top-28 left-4 sm:left-6 md:left-8 z-10 inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[rgba(10,10,10,0.6)] backdrop-blur-md border border-[rgba(212,175,55,0.3)]text-[var(--theme-primary)] text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase font-sans hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Journal</span>
          <span className="sm:hidden">Back</span>
        </motion.button>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Category & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6"
            >
              {post.category && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5bg-[var(--theme-primary)] text-[#0a0a0a] text-[9px] sm:text-[10px] tracking-[3px] uppercase font-sans font-bold">
                  {post.category}
                </span>
              )}
              {post.published_at && (
                <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[rgba(245,240,232,0.7)] uppercase tracking-[2px] font-sans">
                  <Calendar className="w-3 h-3text-[var(--theme-primary)]" />
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[rgba(245,240,232,0.7)] uppercase tracking-[2px] font-sans">
                <Clock className="w-3 h-3text-[var(--theme-primary)]" />
                {readingTime} min read
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-5 sm:mb-6 bg-gradient-to-br from-[#f5f0e8] via-[#f5f0e8] to-[var(--theme-primary)] bg-clip-text text-transparent"
            >
              {post.title}
            </motion.h1>

            {/* Author */}
            {post.author_name && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                {post.author_image ? (
                  <img
                    src={post.author_image}
                    alt={post.author_name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[var(--theme-primary)]"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[#8B6914] flex items-center justify-center border-2 border-[var(--theme-primary)]">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a0a0a]" />
                  </div>
                )}
                <div>
                  <div className="text-[10px] sm:text-[11px]text-[var(--theme-primary)] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-semibold mb-0.5">
                    Written by
                  </div>
                  <div className="text-sm sm:text-base text-[var(--theme-text)] font-bold">
                    {post.author_name}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. ARTICLE CONTENT                                 */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={contentRef}
        className="relative px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20bg-[var(--theme-bg)]"
      >
        <div className="max-w-3xl mx-auto">

          {/* Excerpt (Lead Paragraph) */}
          {post.excerpt && (
            <FadeIn>
              <div className="mb-10 sm:mb-12 pl-6 sm:pl-8 border-l-2 border-[var(--theme-primary)] relative">
                <span className="absolute -left-1.5 top-0 w-3 h-3bg-[var(--theme-primary)] rounded-full" />
                <p className="text-lg sm:text-xl md:text-2xl text-[var(--theme-text)] font-light italic leading-[1.6] font-serif">
                  {post.excerpt}
                </p>
              </div>
            </FadeIn>
          )}

          {/* Share Bar - Top */}
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between gap-4 mb-10 sm:mb-12 pb-6 border-b border-[rgba(212,175,55,0.15)]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Share2 className="w-4 h-4text-[var(--theme-primary)]" />
                <span className="text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-[rgba(245,240,232,0.6)] font-sans font-semibold">
                  Share
                </span>
              </div>
              <div className="flex items-center gap-2">
               {[
  { label: "FB", action: () => handleShare("facebook"), title: "Facebook" },
  { label: "TW", action: () => handleShare("twitter"), title: "Twitter" },
  { label: "IN", action: () => handleShare("linkedin"), title: "LinkedIn" },
].map((btn, i) => (
  <motion.button
    key={i}
    onClick={btn.action}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    title={`Share on ${btn.title}`}
    className="w-9 h-9 sm:w-10 sm:h-10 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-wider"
  >
    {btn.label}
  </motion.button>
))}
                <motion.button
                  onClick={() => handleShare("copy")}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title="Copy Link"
                  className={`w-9 h-9 sm:w-10 sm:h-10 border transition-all flex items-center justify-center ${
                    copied
                      ? "bg-[#D4AF37] text-[#0a0a0a] border-[var(--theme-primary)]"
                      : "border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0a0a0a]"
                  }`}
                >
                  {copied ? (
                    <span className="text-[9px] font-bold">✓</span>
                  ) : (
                    <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </FadeIn>

          {/* Main Content */}
          <FadeIn delay={0.3}>
            <article
              className="
                prose-restaurant text-[rgba(245,240,232,0.85)] font-sans text-base sm:text-[17px] leading-[1.85] font-light
                [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-[var(--theme-text)] [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:font-serif [&_h1]:leading-tight
                [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[var(--theme-text)] [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:leading-tight
                [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#D4AF37] [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:font-serif
                [&_p]:mb-6 [&_p]:leading-[1.85]
                [&_a]:text-[#D4AF37] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-[rgba(212,175,55,0.4)] hover:[&_a]:decoration-[#D4AF37] [&_a]:transition-all
                [&_strong]:text-[var(--theme-text)] [&_strong]:font-bold
                [&_em]:italic [&_em]:text-[#D4AF37]
                [&_ul]:list-none [&_ul]:pl-0 [&_ul]:my-6 [&_ul]:space-y-3
                [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:content-['✦'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-[#D4AF37] [&_ul>li]:before:text-sm
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-3 [&_ol]:marker:text-[#D4AF37] [&_ol]:marker:font-bold
                [&_blockquote]:relative [&_blockquote]:my-10 [&_blockquote]:pl-6 sm:[&_blockquote]:pl-8 [&_blockquote]:py-2 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--theme-primary)] [&_blockquote]:italic [&_blockquote]:text-[var(--theme-text)] [&_blockquote]:text-lg sm:[&_blockquote]:text-xl [&_blockquote]:font-serif [&_blockquote]:font-light
                [&_pre]:bg-[#0f0f0f] [&_pre]:border [&_pre]:border-[rgba(212,175,55,0.15)] [&_pre]:p-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:text-[#D4AF37] [&_pre]:font-mono
                [&_code]:bg-[rgba(212,175,55,0.1)] [&_code]:text-[#D4AF37] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono
                [&_hr]:my-12 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-[#D4AF37] [&_hr]:to-transparent
                [&_img]:my-8 [&_img]:w-full [&_img]:border [&_img]:border-[rgba(212,175,55,0.15)]
                [&_u]:decoration-[#D4AF37] [&_u]:decoration-2
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="mt-12 sm:mt-16 pt-8 border-t border-[rgba(212,175,55,0.15)]">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-4 h-4text-[var(--theme-primary)]" />
                  <span className="text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase text-[rgba(245,240,232,0.6)] font-sans font-semibold">
                    Tagged In
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)]text-[var(--theme-primary)] text-xs sm:text-sm font-sans cursor-default hover:bg-[rgba(212,175,55,0.15)] hover:border-[var(--theme-primary)] transition-all"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Author Card */}
          {post.author_name && (
            <FadeIn delay={0.5}>
              <div className="mt-12 sm:mt-16 p-6 sm:p-8bg-[var(--theme-bg-secondary)] border border-[rgba(212,175,55,0.15)] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                {post.author_image ? (
                  <img
                    src={post.author_image}
                    alt={post.author_name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[var(--theme-primary)] flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[#8B6914] flex items-center justify-center border-2 border-[var(--theme-primary)] flex-shrink-0">
                    <User className="w-8 h-8 text-[#0a0a0a]" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-[10px]text-[var(--theme-primary)] tracking-[3px] uppercase font-sans font-semibold mb-1">
                    Written by
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[var(--theme-text)] mb-2">
                    {post.author_name}
                  </h4>
                  <p className="text-[rgba(245,240,232,0.6)] text-sm sm:text-[15px] font-sans font-light leading-relaxed">
                    Sharing stories from the heart of {client.business_name}.
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Share Bar - Bottom */}
          <FadeIn delay={0.6}>
            <div className="mt-10 sm:mt-12 pt-8 border-t border-[rgba(212,175,55,0.15)] text-center">
              <p className="text-[10px] sm:text-[11px] tracking-[3px] uppercase text-[rgba(245,240,232,0.5)] font-sans mb-4">
                Enjoyed this story?
              </p>
              <div className="flex items-center justify-center gap-3">
               {[
  { label: "FB", action: () => handleShare("facebook"), title: "Facebook" },
  { label: "TW", action: () => handleShare("twitter"), title: "Twitter" },
  { label: "IN", action: () => handleShare("linkedin"), title: "LinkedIn" },
].map((btn, i) => (
  <motion.button
    key={i}
    onClick={btn.action}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    title={`Share on ${btn.title}`}
    className="w-9 h-9 sm:w-10 sm:h-10 border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.05)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-wider"
  >
    {btn.label}
  </motion.button>
))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. RELATED POSTS                                   */}
      {/* ════════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 bg-[var(--theme-bg-secondary)] border-t border-[rgba(212,175,55,0.1)]">
          <div className="max-w-[1200px] mx-auto">

            <FadeIn className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
                <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans">
                  Continue Reading
                </span>
                <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--theme-text)]">
                More Stories
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((relatedPost, i) => (
                <FadeIn key={relatedPost.id} delay={i * 0.1}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setPage?.("blog-post", relatedPost.slug)}
                    className="group cursor-pointerbg-[var(--theme-bg-secondary)] border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.3)] overflow-hidden h-full flex flex-col transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${relatedPost.cover_image || PLACEHOLDER})`,
                          filter: "brightness(0.75)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                      {relatedPost.category && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 bg-[rgba(10,10,10,0.85)] backdrop-blur-mdtext-[var(--theme-primary)] text-[9px] tracking-[2px] uppercase font-sans font-semibold border border-[rgba(212,175,55,0.3)]">
                            {relatedPost.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      {/* Date */}
                      {relatedPost.published_at && (
                        <div className="text-[9px] sm:text-[10px] text-[rgba(245,240,232,0.4)] uppercase tracking-[1.5px] font-sans mb-2 flex items-center gap-1.5">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(relatedPost.published_at).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--theme-text)] leading-[1.3] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      {/* Excerpt */}
                      {relatedPost.excerpt && (
                        <p className="text-[rgba(245,240,232,0.55)] font-sans text-[13px] sm:text-sm leading-[1.7] mb-4 font-light line-clamp-2 flex-1">
                          {relatedPost.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="pt-3 border-t border-[rgba(212,175,55,0.1)] flex items-center justify-between">
                        <span className="text-[#D4AF37] text-[10px] tracking-[2px] uppercase font-sans font-semibold">
                          Read Story
                        </span>
                        <motion.div whileHover={{ x: 4 }} className="text-[#D4AF37]">
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                </FadeIn>
              ))}
            </div>

            {/* Back to Blog Button */}
            <FadeIn delay={0.4} className="text-center mt-12 sm:mt-16">
              <motion.button
                onClick={() => setPage?.("blog")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-transparenttext-[var(--theme-primary)] border border-[rgba(212,175,55,0.5)] hover:bg-[rgba(212,175,55,0.1)] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                View All Stories
              </motion.button>
            </FadeIn>
          </div>
        </section>
      )}

    </div>
  );
}