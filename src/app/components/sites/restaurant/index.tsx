"use client";

import { useState } from "react";
import { Client } from "@/lib/supabase";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import MenuPage from "./MenuPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import BlogPage from "./BlogPage";
import BlogPostPage from "./BlogPostPage";
import { getThemeCSSVars } from "./useTheme";

interface Props {
  client: Client;
}

export default function RestaurantTemplate({ client }: Props) {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string>("");

  // 🎨 Get theme CSS variables based on client's selected theme
  const themeStyle = getThemeCSSVars(client);

  // 🔥 Enhanced setPage function — supports blog post navigation
  const handleSetPage = (page: string, postSlug?: string) => {
    // If navigating to a blog post, save the slug
    if (page === "blog-post" && postSlug) {
      setCurrentBlogSlug(postSlug);
    }

    // Block blog access for Starter plan users
    if (
      (page === "blog" || page === "blog-post") &&
      client.plan_type !== "professional"
    ) {
      console.warn("Blog is only available for Professional plan");
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render Current Page ──
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage client={client} setPage={handleSetPage as any} />;

      case "about":
        return <AboutPage client={client} setPage={handleSetPage as any} />;

      case "menu":
        return <MenuPage client={client} setPage={handleSetPage as any} />;

      case "gallery":
        return <GalleryPage client={client} setPage={handleSetPage as any} />;

      case "contact":
        return <ContactPage client={client} setPage={handleSetPage as any} />;

      // 🔥 BLOG PAGES (Professional Plan Only)
      case "blog":
        return <BlogPage client={client} setPage={handleSetPage} />;

      case "blog-post":
        return (
          <BlogPostPage
            client={client}
            postSlug={currentBlogSlug}
            setPage={handleSetPage}
          />
        );

      default:
        return <HomePage client={client} setPage={handleSetPage as any} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[var(--theme-bg)]"
      style={themeStyle}
    >
      {/* Navbar */}
      <Navbar
        client={client}
        currentPage={currentPage === "blog-post" ? "blog" : currentPage}
        setPage={handleSetPage as any}
      />

      {/* Page Content */}
      {renderPage()}

      {/* Footer - Hide on blog post page for cleaner reading experience */}
      {currentPage !== "blog-post" && (
        <Footer client={client} setPage={handleSetPage as any} />
      )}
    </div>
  );
}