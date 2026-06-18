"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "₹799 Plan", href: "/website-plan", highlight: true },
  { label: "Portfolio", href: "/portfolio" },
  // ↓ YAHA ADD KARO
  { label: "Templates", href: "/templates" },
  // ↑ YAHA ADD KIYA
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F5F0E6]/85 backdrop-blur-2xl border-b border-[#D4C29E]/30 shadow-lg shadow-[#8B6F47]/5"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo */}
            <Link href="/" className="block group">
              <Image
                src="/Avb.png"
                alt="AVB Software"
                width={120}
                height={50}
                className="h-16 md:h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#FAF5EA]/60 backdrop-blur-md border border-[#E8DEC8] rounded-full p-1.5 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    pathname === link.href
                      ? "text-white bg-gradient-to-r from-[#8B6F47] to-[#6B5535] shadow-md shadow-[#8B6F47]/25"
                      : link.highlight
                      ? "text-[#8B6F47] hover:bg-[#E8DCC4]"
                      : "text-[#6B5D4A] hover:text-[#2B2419] hover:bg-white/60"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact" className="btn-primary text-sm py-3 px-6">
                Get a Quote →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[#2B2419] p-2 rounded-lg hover:bg-[#E8DCC4] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#2B2419]/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#FAF5EA] z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8DEC8]">
          <Link href="/" className="block" onClick={() => setIsOpen(false)}>
            <Image
              src="/Avb.png"
              alt="AVB Software"
              width={100}
              height={50}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-[#E8DCC4]"
          >
            <svg className="w-5 h-5 text-[#6B5D4A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white shadow-md"
                  : "text-[#6B5D4A] hover:bg-[#E8DCC4] hover:text-[#8B6F47]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-4 right-4">
          <Link href="/contact" className="btn-primary w-full justify-center">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}