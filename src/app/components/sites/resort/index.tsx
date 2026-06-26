"use client";

import { useState } from "react";
import { Client } from "@/lib/supabase";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import RoomsPage from "./RoomsPage";
import AmenitiesPage from "./AmenitiesPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import ReviewsPage from "./ReviewsPage";
import BlogPage from "./BlogPage";
import BlogPostPage from "./BlogPostPage";
import { getThemeCSSVars, useResortTheme } from "./useTheme";

interface Props {
  client: Client;
}

export default function ResortTemplate({ client }: Props) {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string>("");
  const themeStyle = getThemeCSSVars(client);
  const theme = useResortTheme(client);

  const handleSetPage = (page: string, slug?: string) => {
    if (page === "blog-post" && slug) {
      setCurrentBlogSlug(slug);
    }

    // Block blog for non-pro
    if ((page === "blog" || page === "blog-post") && client.plan_type !== "professional") {
      console.warn("Blog is only available for Professional plan");
      setCurrentPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage client={client} setPage={handleSetPage as any} />;
      case "about":
        return <AboutPage client={client} setPage={handleSetPage as any} />;
      case "rooms":
        return <RoomsPage client={client} setPage={handleSetPage as any} />;
      case "amenities":
        return <AmenitiesPage client={client} setPage={handleSetPage as any} />;
      case "gallery":
        return <GalleryPage client={client} setPage={handleSetPage as any} />;
      case "contact":
        return <ContactPage client={client} setPage={handleSetPage as any} />;
      case "reviews":
        return <ReviewsPage client={client} setPage={handleSetPage as any} />;
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
      className="min-h-screen"
      style={{
        ...themeStyle,
        background: theme.bg,
        color: theme.text,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=Italiana&display=swap"
        rel="stylesheet"
      />
      <Navbar
        client={client}
        currentPage={currentPage === "blog-post" ? "blog" : currentPage}
        setPage={handleSetPage as any}
      />
      {renderPage()}
      {currentPage !== "blog-post" && (
        <Footer client={client} setPage={handleSetPage as any} />
      )}

      <style jsx global>{`
        .rsv-hide {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rsv-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}