"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

// Custom SVG Icons
function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="19" x2="5" y1="12" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

interface Props {
  post: BlogPost;
}

export default function BlogPostPage({ post }: Props) {
  const renderContent = (content: string) => {
    return content
      .trim()
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className="text-3xl md:text-4xl font-extrabold text-navy mb-6 mt-8 font-jakarta">
              {line.replace("# ", "")}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-bold text-navy mb-4 mt-8 font-jakarta">
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xl font-bold text-navy mb-3 mt-6 font-jakarta">
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={i} className="text-slate-700 mb-2 ml-4 list-disc">
              {line.replace("- ", "")}
            </li>
          );
        }
        if (line.trim() === "") {
          return <div key={i} className="mb-3" />;
        }
        if (line.startsWith("|")) {
          return (
            <div key={i} className="font-mono text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded">
              {line}
            </div>
          );
        }
        return (
          <p
            key={i}
            className="text-slate-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        );
      });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-10 bg-surface border-b border-slate-100">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm mb-8 transition-colors"
            >
              <ArrowLeftIcon />
              Back to Blog
            </Link>

            {/* Category */}
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full block w-fit">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy mt-4 mb-4 font-jakarta leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <UserIcon />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Article content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              {renderContent(post.content)}
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* CTA Card */}
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <h3 className="font-jakarta font-bold text-navy mb-3">
                  Need Help With This?
                </h3>
                <p className="text-muted text-sm mb-4">
                  Get a free consultation from our experts. We&apos;ll answer
                  all your questions.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Get Free Consultation
                </Link>
              </div>

              {/* Author Card */}
              <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                <h3 className="font-jakarta font-bold text-navy mb-3 text-sm">
                  About the Author
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {post.author
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">
                      {post.author}
                    </p>
                    <p className="text-muted text-xs">AVB Software</p>
                  </div>
                </div>
              </div>

              {/* Related posts */}
              <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                <h3 className="font-jakarta font-bold text-navy mb-3 text-sm">
                  More Articles
                </h3>
                <Link
                  href="/blog"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View all articles →
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}