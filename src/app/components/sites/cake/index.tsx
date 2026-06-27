"use client";

import { useState, useEffect } from "react";
import { Client } from "@/lib/supabase";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CollectionPage from "./CollectionPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import { getTheme } from "./themes";

const VALID_PAGES = ["home", "heritage", "collection", "gallery", "contact"];

export default function CakeTemplate({ client }: { client: Client }) {
  const [currentPage, setCurrentPage] = useState("home");

  // ✅ Get theme based on client preference (with safe access)
  const c = client as any;
  const theme = getTheme(c.cake_theme || "emerald_noir", {
    ...(c.custom_theme_bg && { bg: c.custom_theme_bg }),
    ...(c.custom_theme_secondary && { bgSecondary: c.custom_theme_secondary }),
    ...(c.custom_theme_card && { bgCard: c.custom_theme_card }),
    ...(c.custom_theme_primary && { primary: c.custom_theme_primary }),
    ...(c.custom_theme_accent && { accent: c.custom_theme_accent }),
    ...(c.custom_theme_text && { text: c.custom_theme_text }),
    ...(c.custom_theme_text_light && { textLight: c.custom_theme_text_light }),
  });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && VALID_PAGES.includes(hash)) {
      setCurrentPage(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && VALID_PAGES.includes(newHash)) {
        setCurrentPage(newHash);
      } else if (!newHash) {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const changePage = (page: string) => {
    if (!VALID_PAGES.includes(page)) return;
    setCurrentPage(page);

    if (page === "home") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", `#${page}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        body {
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
        }

        ::selection {
          background: ${theme.colors.primary};
          color: ${theme.colors.bg};
        }

        :root {
          --cake-bg: ${theme.colors.bg};
          --cake-bg-secondary: ${theme.colors.bgSecondary};
          --cake-bg-card: ${theme.colors.bgCard};
          --cake-primary: ${theme.colors.primary};
          --cake-accent: ${theme.colors.accent};
          --cake-text: ${theme.colors.text};
          --cake-text-light: ${theme.colors.textLight};
          --cake-border: ${theme.colors.border};
          --cake-shadow: ${theme.colors.shadow};
        }
      `}</style>

      <div
        style={{
          background: theme.colors.bg,
          color: theme.colors.text,
          minHeight: "100vh",
        }}
      >
        <Navbar
          client={client}
          currentPage={currentPage}
          setPage={changePage}
          theme={theme}
        />

        {currentPage === "home" && (
          <HomePage client={client} setPage={changePage} theme={theme} />
        )}
        {currentPage === "heritage" && (
          <AboutPage client={client} theme={theme} />
        )}
        {currentPage === "collection" && (
          <CollectionPage client={client} theme={theme} />
        )}
        {currentPage === "gallery" && (
          <GalleryPage client={client} theme={theme} />
        )}
        {currentPage === "contact" && (
          <ContactPage client={client} theme={theme} />
        )}

        <Footer client={client} setPage={changePage} theme={theme} />

        {/* Floating WhatsApp */}
        {client.whatsapp && (
          <a
            href={`https://wa.me/${client.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
              boxShadow: `0 0 30px ${theme.colors.shadow}`,
            }}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill={theme.colors.bg}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: theme.colors.primary }}
            ></span>
          </a>
        )}
      </div>
    </>
  );
}