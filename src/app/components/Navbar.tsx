
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services" },
//   { label: "Portfolio", href: "/portfolio" },
//   { label: "About", href: "/about" },
//   { label: "Blog", href: "/blog" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <header
//         className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-lg shadow-indigo-500/5"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="container-custom">
//           <div className="flex items-center justify-between h-16 md:h-20">
            
//             {/* ✨ LOGO WITH IMAGE */}
//             <Link href="/" className="flex items-center gap-2.5 group">
//               {/* Logo Image with glow effect */}
//               <div className="relative">
//                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform border-2 border-white">
//                   <Image
//                     src="/Avb.png"
//                     alt="AVB Software Logo"
//                     width={48}
//                     height={48}
//                     className="w-full h-full object-contain p-1"
//                     priority
//                   />
//                 </div>
//                 {/* Glow effect behind logo */}
//                 <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity -z-10" />
//               </div>
              
//               {/* Company Name */}
//               <span className="font-bold text-xl text-slate-900 tracking-tight">
//                 AVB <span className="gradient-text">Software</span>
//               </span>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-md border border-slate-100 rounded-full p-1 shadow-sm">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
//                     pathname === link.href
//                       ? "text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md shadow-indigo-500/25"
//                       : "text-slate-600 hover:text-slate-900 hover:bg-white"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* CTA */}
//             <div className="hidden lg:flex items-center gap-3">
//               <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
//                 Get a Quote →
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="lg:hidden text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
//               aria-label="Toggle menu"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Drawer */}
//       <div
//         className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b border-slate-100">
//           <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
//             {/* Mobile Logo */}
//             <div className="w-9 h-9 rounded-lg overflow-hidden bg-white shadow-md border border-slate-100">
//               <Image
//                 src="/logo.png"
//                 alt="AVB Software Logo"
//                 width={36}
//                 height={36}
//                 className="w-full h-full object-contain p-0.5"
//               />
//             </div>
//             <span className="font-bold text-slate-900">
//               AVB <span className="gradient-text">Software</span>
//             </span>
//           </Link>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-2 rounded-lg hover:bg-slate-100"
//           >
//             <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <nav className="p-4 space-y-1">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                 pathname === link.href
//                   ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md shadow-indigo-500/25"
//                   : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="absolute bottom-8 left-4 right-4">
//           <Link href="/contact" className="btn-primary w-full justify-center">
//             Get a Free Quote
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
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
            ? "bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-lg shadow-indigo-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-25 md:h-24">
            
            {/* ✨ DIRECT LOGO — No Box, No Border */}
            <Link href="/" className="block group">
              <Image
                src="/Avb.png"
                alt="AVB Software"
                width={120}
                height={50}
                className="h-25 md:h-25 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-md border border-slate-100 rounded-full p-1 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    pathname === link.href
                      ? "text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md shadow-indigo-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
                Get a Quote →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 shadow-2xl lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          {/* Mobile Logo — Also direct */}
          <Link href="/" className="block" onClick={() => setIsOpen(false)}>
            <Image
              src="/Avb.png"
              alt="AVB Software"
              width={100}
              height={50}
              className="h-15 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md shadow-indigo-500/25"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
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