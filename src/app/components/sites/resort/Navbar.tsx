"use client";

import { Client } from "@/lib/supabase";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getThemeMode } from "./useTheme";

interface Props {
  client: Client;
  currentPage: string;
  setPage: (page: string) => void;
}

export default function Navbar({ client, currentPage, setPage }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mode = getThemeMode(client);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

 const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "rooms", label: "Rooms" },
//   { id: "amenities", label: "Experiences" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  // Show Blog only for Professional plan
  ...(client.plan_type === "professional" ? [{ id: "blog", label: "Journal" }] : []),
  { id: "contact", label: "Contact" },
];

  return (
    <>
      {/* ═══════════════════════════════════
          NAVBAR
      ═══════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          padding: scrolled ? "14px 24px" : "22px 24px",
          background: scrolled
            ? mode === "dark"
              ? "rgba(0,0,0,0.7)"
              : "rgba(255,255,255,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? `1px solid var(--theme-border)` : "none",
          boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.15)" : "none",
        }}
      >
        <div className="flex justify-between items-center max-w-[1600px] mx-auto">
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="text-left flex items-center gap-3"
          >
            {client.logo_url && (
              <img
                src={client.logo_url}
                alt=""
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full"
              />
            )}
            <div>
              <div
                className="font-bold leading-none uppercase"
                style={{
                  color: "var(--theme-primary)",
                  fontFamily: "'Italiana', serif",
                  fontSize: "clamp(14px, 1.5vw, 22px)",
                  letterSpacing: "3px",
                }}
              >
                {client.business_name?.split(" ").slice(0, 2).join(" ") ||
                  "Resort"}
              </div>
              {client.business_name &&
                client.business_name.split(" ").length > 2 && (
                  <div
                    className="mt-1 uppercase"
                    style={{
                      fontSize: "7px",
                      letterSpacing: "3px",
                      color: scrolled
                        ? mode === "dark"
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(0,0,0,0.6)"
                        : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {client.business_name.split(" ").slice(2).join(" ")}
                  </div>
                )}
            </div>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-9 items-center list-none">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setPage(item.id)}
                  className="text-[11px] tracking-[2px] uppercase font-medium relative group transition-colors duration-500"
                  style={{
                    color:
                      currentPage === item.id
                        ? "var(--theme-primary)"
                        : scrolled
                          ? mode === "dark"
                            ? "#fff"
                            : "#1a1a1a"
                          : "#fff",
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                    style={{
                      background: "var(--theme-primary)",
                      width: currentPage === item.id ? "100%" : "0",
                    }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop Book Now Button */}
          <button
            onClick={() => setPage("contact")}
            className="hidden lg:block px-7 py-3 rounded-full text-[11px] font-bold tracking-[2.5px] uppercase transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{
              background: "var(--theme-primary)",
              color: "var(--theme-bg)",
            }}
          >
            Book Now
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{
              background: scrolled
                ? mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: `1px solid var(--theme-border)`,
              color: "var(--theme-primary)",
              zIndex: 102,
              position: "relative",
            }}
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ═══════════════════════════════════ */}
      <div
        className="lg:hidden fixed inset-0 z-[101] transition-all duration-700"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background:
              mode === "dark"
                ? "rgba(0,0,0,0.95)"
                : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
          }}
          onClick={() => setIsOpen(false)}
        />

        {/* Decorative gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-all duration-700"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--theme-primary), transparent)",
            opacity: isOpen ? 1 : 0,
          }}
        />

        {/* Decorative gold blur */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--theme-primary)" }}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-8">
          {/* Logo on top */}
          <div
            className="mb-12 text-center transition-all duration-700"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-30px)",
              transitionDelay: isOpen ? "0.2s" : "0s",
            }}
          >
            <div
              className="uppercase font-bold mb-2"
              style={{
                color: "var(--theme-primary)",
                fontFamily: "'Italiana', serif",
                fontSize: "28px",
                letterSpacing: "5px",
              }}
            >
              {client.business_name?.split(" ").slice(0, 2).join(" ") ||
                "Resort"}
            </div>
            {client.business_name &&
              client.business_name.split(" ").length > 2 && (
                <div
                  className="uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "4px",
                    color: "var(--theme-text-muted)",
                  }}
                >
                  {client.business_name.split(" ").slice(2).join(" ")}
                </div>
              )}
            <div
              className="h-px w-16 mx-auto mt-4"
              style={{ background: "var(--theme-primary)" }}
            />
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col gap-1 items-center w-full max-w-sm">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                className="w-full transition-all duration-700"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: isOpen ? `${0.3 + i * 0.08}s` : "0s",
                }}
              >
                <button
                  onClick={() => {
                    setPage(item.id);
                    setIsOpen(false);
                  }}
                  className="w-full py-4 text-center uppercase font-bold transition-all hover:tracking-[5px] group relative"
                  style={{
                    color:
                      currentPage === item.id
                        ? "var(--theme-primary)"
                        : mode === "dark"
                          ? "#fff"
                          : "#1a1a1a",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    letterSpacing: "3px",
                  }}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0 h-0.5 w-8"
                      style={{ background: "var(--theme-primary)" }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Book Now Button */}
          <div
            className="mt-12 transition-all duration-700"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(30px)",
              transitionDelay: isOpen ? "0.85s" : "0s",
            }}
          >
            <button
              onClick={() => {
                setPage("contact");
                setIsOpen(false);
              }}
              className="px-10 py-4 rounded-full font-bold uppercase tracking-[3px] text-xs transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "var(--theme-primary)",
                color: "var(--theme-bg)",
                boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
              }}
            >
              Book Your Escape
            </button>
          </div>

          {/* Contact info at bottom */}
          <div
            className="absolute bottom-10 left-0 right-0 text-center transition-all duration-700"
            style={{
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "1s" : "0s",
            }}
          >
            {client.phone && (
              <a
                href={`tel:${client.phone}`}
                className="block text-sm mb-2"
                style={{ color: "var(--theme-primary)", fontWeight: 600 }}
              >
                📞 {client.phone}
              </a>
            )}
            {client.city && (
              <p
                className="uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "var(--theme-text-muted)",
                }}
              >
                📍 {client.city} · India
              </p>
            )}
          </div>

          {/* Decorative bottom line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--theme-primary), transparent)",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          />
        </div>
      </div>
    </>
  );
}