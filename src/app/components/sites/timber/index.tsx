"use client";

import { useState } from "react";
import { Client } from "@/lib/supabase";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Direct imports (not default)
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ProductsPage from "./ProductsPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";

export default function TimberTemplate({ client }: { client: Client }) {
  const [currentPage, setCurrentPage] = useState("home");

  const changePage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        body > header, body > nav, body > footer, 
        body > div.fixed.bottom-6.right-6 {
          display: none !important;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-[#FEFCF8]">
        <Navbar client={client} currentPage={currentPage} setPage={changePage} />
        
        {/* Page Rendering */}
        {currentPage === "home" && <HomePage client={client} setPage={changePage} />}
        {currentPage === "about" && <AboutPage client={client} />}
        {currentPage === "products" && <ProductsPage client={client} />}
        {currentPage === "gallery" && <GalleryPage client={client} />}
        {currentPage === "contact" && <ContactPage client={client} />}
        
        <Footer client={client} setPage={changePage} />

        {/* Floating WhatsApp */}
        {client.whatsapp && (
          <a
            href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
          </a>
        )}
      </div>
    </>
  );
}