// "use client";

// import Link from "next/link";
// import { useEffect, useState, useMemo } from "react";

// /* ─── Tech Stack ─── */
// const techStack = [
//   { name: "Next.js", emoji: "⚡" },
//   { name: "React.js", emoji: "⚛️" },
//   { name: "React Native", emoji: "📱" },
//   { name: "Flutter", emoji: "🦋" },
//   { name: "Node.js", emoji: "🟢" },
//   { name: "TypeScript", emoji: "🔷" },
//   { name: "JavaScript", emoji: "🟨" },
//   { name: "Python", emoji: "🐍" },
//   { name: "MongoDB", emoji: "🍃" },
//   { name: "PostgreSQL", emoji: "🐘" },
//   { name: "Firebase", emoji: "🔥" },
//   { name: "AWS", emoji: "☁️" },
//   { name: "Figma", emoji: "🎨" },
//   { name: "Tailwind CSS", emoji: "💨" },
//   { name: "WordPress", emoji: "📝" },
// ];

// /* ─── Industries ─── */
// const industries = [
//   { name: "Retail & Shops", emoji: "🏪" },
//   { name: "Restaurants & Cafes", emoji: "☕" },
//   { name: "Gyms & Fitness", emoji: "🏋️" },
//   { name: "Clinics & Doctors", emoji: "🩺" },
//   { name: "Salons & Spa", emoji: "💇" },
//   { name: "Schools & Coaching", emoji: "🎓" },
//   { name: "Logistics & Transport", emoji: "🚚" },
//   { name: "E-Commerce", emoji: "🛒" },
//   { name: "Billing & POS", emoji: "🧾" },
//   { name: "Inventory Management", emoji: "📦" },
// ];

// /* ─── Hero Stats ─── */
// const heroStats = [
//   { value: "50+", label: "Businesses Served", emoji: "🏢" },
//   { value: "100%", label: "Client Satisfaction", emoji: "⭐" },
//   { value: "3-5 Days", label: "Go Live", emoji: "⏱️" },
//   { value: "24/7", label: "Support", emoji: "🎧" },
// ];

// const WHATSAPP_NUMBER = "918103558368";
// const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
//   "Hi AVB Software! I'm interested in getting a professional website / custom software for my business. Please share details."
// )}`;

// /* ═══════════════════════════════════════════════
//    ICONS
//    ═══════════════════════════════════════════════ */
// function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
//   return (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//     </svg>
//   );
// }

// function WhatsAppIcon() {
//   return (
//     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//     </svg>
//   );
// }

// function PhoneIcon() {
//   return (
//     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    MAIN HERO SECTION
//    ═══════════════════════════════════════════════════════════ */

// export default function HeroSection() {
//   const [displayText, setDisplayText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(150);

//   const headlines = useMemo(
//     () => [
//       "Grows Your Business",
//       "Ranks on Google",
//       "Scales With You",
//       "Wins Customers",
//     ],
//     []
//   );

//   useEffect(() => {
//     const currentWord = headlines[wordIndex];

//     const timeout = setTimeout(() => {
//       if (!isDeleting) {
//         if (displayText.length < currentWord.length) {
//           setDisplayText(currentWord.slice(0, displayText.length + 1));
//           setTypingSpeed(120);
//         } else {
//           setTypingSpeed(2000);
//           setIsDeleting(true);
//         }
//       } else {
//         if (displayText.length > 0) {
//           setDisplayText(currentWord.slice(0, displayText.length - 1));
//           setTypingSpeed(80);
//         } else {
//           setIsDeleting(false);
//           setWordIndex((prev) => (prev + 1) % headlines.length);
//           setTypingSpeed(150);
//         }
//       }
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, wordIndex, headlines, typingSpeed]);

//   return (
//     <section className="relative overflow-hidden bg-[#F5F0E6] pt-24 lg:pt-28 pb-12">
      
//       {/* ─── Decorative Background Blobs ─── */}
//       <div className="absolute top-20 -left-48 w-96 h-96 bg-[#E8DCC4] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
//       <div className="absolute top-40 -right-48 w-96 h-96 bg-[#D4C29E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
//       <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#C9A45C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

//       {/* ─── Grid Pattern ─── */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `linear-gradient(rgba(139,111,71,0.5) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(139,111,71,0.5) 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }}
//       />

//       {/* ═══════════════════════════════════════════════
//           MAIN HERO CONTENT - 2 COLUMNS
//           ═══════════════════════════════════════════════ */}
//       <div className="relative z-10 container-custom">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
//           {/* ═══════ LEFT SIDE - TEXT CONTENT ═══════ */}
//           <div className="text-center lg:text-left">
            
//             {/* Premium Badge */}
//             <div className="mb-6 animate-fade-in">
//               <span 
//                 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47]"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="w-8 h-px bg-[#8B6F47]"></span>
//                 PROFESSIONAL WEB STUDIO
//               </span>
//             </div>

//             {/* H1 - Luxury Serif */}
//             <h1 
//               className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2B2419] leading-[1.05] mb-6 tracking-tight animate-slide-left"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               Crafting{" "}
//               <span className="italic gradient-text">Digital</span>
//               <br />
//               Experiences That{" "}
//               <span className="relative inline-block min-w-[200px]">
//                 <span 
//                   className="italic gradient-text"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   {displayText}
//                 </span>
//                 <span className="animate-blink inline-block w-[2px] h-[0.8em] bg-[#8B6F47] ml-1 align-middle" />
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p 
//               className="text-base lg:text-lg text-[#6B5D4A] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               <strong className="text-[#2B2419]">AVB Software</strong> creates premium websites, 
//               billing systems, and custom business applications for ambitious brands across India.
//               <span className="block mt-2 text-[#8B6F47] font-semibold">
//                 Starting at just ₹799/month — Premium quality, affordable price.
//               </span>
//             </p>

//             {/* Trust Feature Pills */}
//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 animate-fade-in-up">
//               {[
//                 { text: "Free Domain", emoji: "🌐" },
//                 { text: "Free Hosting", emoji: "🖥️" },
//                 { text: "SSL Secured", emoji: "🔒" },
//                 { text: "GST Ready", emoji: "🧾" },
//               ].map((item) => (
//                 <span
//                   key={item.text}
//                   className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF5EA] rounded-full border border-[#E8DEC8] text-xs text-[#6B5D4A] font-medium shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   <span aria-hidden="true">{item.emoji}</span>
//                   {item.text}
//                 </span>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up">
//               <a
//                 href={WHATSAPP_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative px-8 py-4 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-semibold rounded-2xl shadow-lg shadow-[#8B6F47]/25 hover:shadow-[#8B6F47]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <WhatsAppIcon />
//                   Free Consultation
//                   <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </a>

//               <a
//                 href="tel:+918103558368"
//                 className="group px-8 py-4 bg-transparent text-[#8B6F47] font-semibold rounded-2xl border-2 border-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 hover:-translate-y-1"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="flex items-center gap-2">
//                   <PhoneIcon />
//                   Call Us Now
//                 </span>
//               </a>
//             </div>

//             {/* Trust Bar - Client Avatars */}
//             <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up">
//               <div className="flex -space-x-3">
//                 {['K', 'R', 'P', 'A', 'S'].map((letter, i) => (
//                   <div
//                     key={i}
//                     className="w-10 h-10 rounded-full border-2 border-[#FAF5EA] bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-xs font-bold shadow-md"
//                   >
//                     {letter}
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <div className="flex items-center gap-1 mb-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-4 h-4 text-[#C9A45C] fill-[#C9A45C]" viewBox="0 0 24 24">
//                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                     </svg>
//                   ))}
//                 </div>
//                 <p className="text-xs text-[#6B5D4A]">
//                   <span className="font-bold text-[#2B2419]">50+</span> Happy Clients
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ═══════ RIGHT SIDE - LAPTOP MOCKUP ═══════ */}
//           <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            
//             {/* Decorative Floating Elements */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#C9A45C]/20 rounded-full blur-2xl"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#8B6F47]/20 rounded-full blur-2xl"></div>
            
//             {/* Floating Badge - Top Right */}
//             <div className="absolute -top-6 -right-6 z-20 animate-float">
//               <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-lg">
//                   ⚡
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>Fast Delivery</div>
//                   <div className="text-[10px] text-[#6B5D4A]">3-5 Days</div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Badge - Bottom Left */}
//             <div className="absolute -bottom-4 -left-6 z-20 animate-float" style={{ animationDelay: "1s" }}>
//               <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] flex items-center justify-center text-white text-lg">
//                   ⭐
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>4.9 Rating</div>
//                   <div className="text-[10px] text-[#6B5D4A]">From 50+ clients</div>
//                 </div>
//               </div>
//             </div>

//             {/* LAPTOP MOCKUP */}
//             <div className="relative">
//               {/* Laptop Body */}
//               <div className="laptop-frame relative">
//                 {/* Camera Notch */}
//                 <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1611] rounded-full z-10"></div>
                
//                 {/* Screen */}
//                 <div className="laptop-screen relative">
//                   {/* Browser Bar */}
//                   <div className="bg-[#F5F0E6] border-b border-[#E8DEC8] px-3 py-2 flex items-center gap-1.5">
//                     <div className="flex gap-1">
//                       <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
//                       <div className="w-2 h-2 rounded-full bg-[#FFD93D]"></div>
//                       <div className="w-2 h-2 rounded-full bg-[#6BCB77]"></div>
//                     </div>
//                     <div className="flex-1 mx-3 px-3 py-0.5 bg-[#FAF5EA] rounded-md border border-[#E8DEC8] flex items-center gap-1.5">
//                       <svg className="w-2.5 h-2.5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                       <span className="text-[9px] text-[#6B5D4A] truncate">avbsoftware.com</span>
//                     </div>
//                   </div>

//                   {/* Website Preview Inside Laptop */}
//                   <div className="p-4 bg-gradient-to-br from-[#FAF5EA] to-[#F0E8D4] h-full">
//                     {/* Mini Hero */}
//                     <div className="mb-4">
//                       <div className="text-[8px] text-[#8B6F47] font-bold tracking-wider mb-1.5">— PREMIUM WEB STUDIO</div>
//                       <div className="text-sm font-bold text-[#2B2419] mb-1.5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
//                         Beautiful Websites for Your Business
//                       </div>
//                       <div className="text-[7px] text-[#6B5D4A] mb-2">Professional designs starting at ₹799</div>
//                       <div className="flex gap-1">
//                         <div className="px-2 py-1 bg-[#8B6F47] text-white text-[7px] rounded-md font-semibold">Get Started</div>
//                         <div className="px-2 py-1 border border-[#8B6F47] text-[#8B6F47] text-[7px] rounded-md font-semibold">Templates</div>
//                       </div>
//                     </div>

//                     {/* Mini Cards Grid */}
//                     <div className="grid grid-cols-3 gap-1.5">
//                       {[
//                         { icon: "🏪", label: "Business" },
//                         { icon: "🍕", label: "Restaurant" },
//                         { icon: "💼", label: "Portfolio" },
//                       ].map((item) => (
//                         <div key={item.label} className="bg-white rounded-md p-2 border border-[#E8DEC8] text-center">
//                           <div className="text-base mb-0.5">{item.icon}</div>
//                           <div className="text-[6px] font-semibold text-[#2B2419]">{item.label}</div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Mini Stats */}
//                     <div className="grid grid-cols-3 gap-1.5 mt-2">
//                       <div className="bg-white rounded-md p-1.5 border border-[#E8DEC8] text-center">
//                         <div className="text-[10px] font-bold text-[#8B6F47]">50+</div>
//                         <div className="text-[5px] text-[#6B5D4A]">Clients</div>
//                       </div>
//                       <div className="bg-white rounded-md p-1.5 border border-[#E8DEC8] text-center">
//                         <div className="text-[10px] font-bold text-[#8B6F47]">4.9★</div>
//                         <div className="text-[5px] text-[#6B5D4A]">Rating</div>
//                       </div>
//                       <div className="bg-white rounded-md p-1.5 border border-[#E8DEC8] text-center">
//                         <div className="text-[10px] font-bold text-[#8B6F47]">3-5d</div>
//                         <div className="text-[5px] text-[#6B5D4A]">Delivery</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Laptop Base */}
//                 <div className="laptop-base"></div>
//               </div>

//               {/* Mobile Phone Overlay - Bottom Right */}
//               <div className="absolute -bottom-8 -right-2 lg:-right-4 z-10 hidden md:block">
//                 <div className="w-28 lg:w-32 bg-[#2B2419] rounded-[20px] p-1.5 shadow-2xl">
//                   <div className="bg-[#FAF5EA] rounded-[14px] overflow-hidden aspect-[9/16]">
//                     {/* Phone Status Bar */}
//                     <div className="bg-[#F5F0E6] px-2 py-1 flex justify-between items-center">
//                       <span className="text-[5px] font-bold text-[#2B2419]">9:41</span>
//                       <div className="flex gap-0.5">
//                         <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
//                         <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
//                       </div>
//                     </div>
//                     {/* Phone Content */}
//                     <div className="p-2">
//                       <div className="text-[6px] font-bold text-[#2B2419] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
//                         AVB
//                       </div>
//                       <div className="text-[5px] text-[#8B6F47] font-semibold mb-1.5">— STUDIO</div>
//                       <div className="bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded p-1.5 mb-1">
//                         <div className="text-[5px] text-white font-bold">Premium Web</div>
//                         <div className="text-[4px] text-white/80">₹799/month</div>
//                       </div>
//                       <div className="space-y-1">
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-full"></div>
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-3/4"></div>
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-1/2"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ═══════ STATS BAR ═══════ */}
//         <div className="mt-20 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {heroStats.map((stat) => (
//               <div
//                 key={stat.label}
//                 className="flex items-center gap-3 p-4 bg-[#FAF5EA] backdrop-blur-sm rounded-2xl border border-[#E8DEC8] shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-1 transition-all duration-300"
//               >
//                 <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl shadow-md text-xl">
//                   {stat.emoji}
//                 </span>
//                 <div>
//                   <div 
//                     className="text-xl font-bold text-[#2B2419] leading-tight"
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     {stat.value}
//                   </div>
//                   <div className="text-xs text-[#6B5D4A] font-medium leading-tight">
//                     {stat.label}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ═══════ INDUSTRIES MARQUEE ═══════ */}
//         <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
//           <p className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
//             — TRUSTED BY BUSINESSES ACROSS INDIA
//           </p>
//           <div className="industries-marquee">
//             <div className="industries-marquee-content">
//               {industries.map((ind) => (
//                 <span key={`a-${ind.name}`} className="industry-pill">
//                   <span aria-hidden="true">{ind.emoji}</span>
//                   {ind.name}
//                 </span>
//               ))}
//             </div>
//             <div className="industries-marquee-content" aria-hidden="true">
//               {industries.map((ind) => (
//                 <span key={`b-${ind.name}`} className="industry-pill">
//                   <span>{ind.emoji}</span>
//                   {ind.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════ TECH STACK MARQUEE ═══════ */}
//       <div className="relative z-10 pt-4">
//         <h2 className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
//           — TECHNOLOGIES WE MASTER
//         </h2>
//         <div className="marquee">
//           <div className="marquee-content">
//             {techStack.map((tech) => (
//               <span key={`a-${tech.name}`} className="skill-pill">
//                 <span aria-hidden="true">{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//           <div className="marquee-content" aria-hidden="true">
//             {techStack.map((tech) => (
//               <span key={`b-${tech.name}`} className="skill-pill">
//                 <span>{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ═══════ STYLES ═══════ */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob { animation: blob 7s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }

//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fade-in { animation: fade-in 1.2s ease-out; }

//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
//         }

//         @keyframes slide-left {
//           from { opacity: 0; transform: translateX(-40px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-left {
//           animation: slide-left 1s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
//         }

//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink { animation: blink 0.8s step-end infinite; }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }

//         /* Industries Marquee */
//         .industries-marquee {
//           display: flex;
//           overflow: hidden;
//           user-select: none;
//           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
//         }
//         .industries-marquee-content {
//           display: flex;
//           gap: 1rem;
//           animation: industriesScroll 30s linear infinite;
//           flex-shrink: 0;
//           padding: 0 0.5rem;
//         }
//         .industries-marquee:hover .industries-marquee-content {
//           animation-play-state: paused;
//         }
//         @keyframes industriesScroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .industry-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.6rem 1.25rem;
//           background: #FAF5EA;
//           backdrop-filter: blur(10px);
//           border-radius: 50px;
//           font-size: 0.8rem;
//           font-weight: 500;
//           color: #6B5D4A;
//           border: 1px solid #E8DEC8;
//           white-space: nowrap;
//           transition: all 0.3s ease;
//         }
//         .industry-pill:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 15px rgba(139, 111, 71, 0.15);
//           border-color: #8B6F47;
//           color: #8B6F47;
//         }
//       `}</style>
//     </section>
//   );
// }





// "use client";

// import Link from "next/link";
// import { useEffect, useState, useMemo } from "react";

// /* ─── Tech Stack ─── */
// const techStack = [
//   { name: "Next.js", emoji: "⚡" },
//   { name: "React.js", emoji: "⚛️" },
//   { name: "React Native", emoji: "📱" },
//   { name: "Flutter", emoji: "🦋" },
//   { name: "Node.js", emoji: "🟢" },
//   { name: "TypeScript", emoji: "🔷" },
//   { name: "JavaScript", emoji: "🟨" },
//   { name: "Python", emoji: "🐍" },
//   { name: "MongoDB", emoji: "🍃" },
//   { name: "PostgreSQL", emoji: "🐘" },
//   { name: "Firebase", emoji: "🔥" },
//   { name: "AWS", emoji: "☁️" },
//   { name: "Figma", emoji: "🎨" },
//   { name: "Tailwind CSS", emoji: "💨" },
//   { name: "WordPress", emoji: "📝" },
// ];

// /* ─── Industries ─── */
// const industries = [
//   { name: "Retail & Shops", emoji: "🏪" },
//   { name: "Restaurants & Cafes", emoji: "☕" },
//   { name: "Gyms & Fitness", emoji: "🏋️" },
//   { name: "Clinics & Doctors", emoji: "🩺" },
//   { name: "Salons & Spa", emoji: "💇" },
//   { name: "Schools & Coaching", emoji: "🎓" },
//   { name: "Logistics & Transport", emoji: "🚚" },
//   { name: "E-Commerce", emoji: "🛒" },
//   { name: "Billing & POS", emoji: "🧾" },
//   { name: "Inventory Management", emoji: "📦" },
// ];

// /* ─── Hero Stats ─── */
// const heroStats = [
//   { value: "50+", label: "Businesses Served", emoji: "🏢" },
//   { value: "100%", label: "Client Satisfaction", emoji: "⭐" },
//   { value: "3-5 Days", label: "Go Live", emoji: "⏱️" },
//   { value: "24/7", label: "Support", emoji: "🎧" },
// ];

// const WHATSAPP_NUMBER = "918103558368";
// const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
//   "Hi AVB Software! I'm interested in getting a professional website / custom software for my business. Please share details."
// )}`;

// /* ═══════════════════════════════════════════════
//    ICONS
//    ═══════════════════════════════════════════════ */
// function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
//   return (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//     </svg>
//   );
// }

// function WhatsAppIcon() {
//   return (
//     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
//     </svg>
//   );
// }

// function PhoneIcon() {
//   return (
//     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    MAIN HERO SECTION
//    ═══════════════════════════════════════════════════════════ */

// export default function HeroSection() {
//   const [displayText, setDisplayText] = useState("");
//   const [wordIndex, setWordIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [typingSpeed, setTypingSpeed] = useState(150);

//   const headlines = useMemo(
//     () => [
//       "Grows Your Business",
//       "Ranks on Google",
//       "Scales With You",
//       "Wins Customers",
//     ],
//     []
//   );

//   useEffect(() => {
//     const currentWord = headlines[wordIndex];

//     const timeout = setTimeout(() => {
//       if (!isDeleting) {
//         if (displayText.length < currentWord.length) {
//           setDisplayText(currentWord.slice(0, displayText.length + 1));
//           setTypingSpeed(120);
//         } else {
//           setTypingSpeed(2000);
//           setIsDeleting(true);
//         }
//       } else {
//         if (displayText.length > 0) {
//           setDisplayText(currentWord.slice(0, displayText.length - 1));
//           setTypingSpeed(80);
//         } else {
//           setIsDeleting(false);
//           setWordIndex((prev) => (prev + 1) % headlines.length);
//           setTypingSpeed(150);
//         }
//       }
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, wordIndex, headlines, typingSpeed]);

//   return (
//     <section className="relative overflow-hidden bg-[#F5F0E6] pt-24 lg:pt-28 pb-12">
      
//       {/* ─── Decorative Background Blobs ─── */}
//       <div className="absolute top-20 -left-48 w-96 h-96 bg-[#E8DCC4] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
//       <div className="absolute top-40 -right-48 w-96 h-96 bg-[#D4C29E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
//       <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#C9A45C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

//       {/* ─── Grid Pattern ─── */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `linear-gradient(rgba(139,111,71,0.5) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(139,111,71,0.5) 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }}
//       />

//       {/* ═══════════════════════════════════════════════
//           MAIN HERO CONTENT - 2 COLUMNS
//           ═══════════════════════════════════════════════ */}
//       <div className="relative z-10 container-custom">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
//           {/* ═══════ LEFT SIDE - TEXT CONTENT ═══════ */}
//           <div className="text-center lg:text-left">
            
//             {/* Premium Badge */}
//             <div className="mb-6 animate-fade-in">
//               <span 
//                 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47]"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="w-8 h-px bg-[#8B6F47]"></span>
//                 PROFESSIONAL WEB STUDIO
//               </span>
//             </div>

//             {/* H1 - Luxury Serif */}
//             <h1 
//               className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2B2419] leading-[1.05] mb-6 tracking-tight animate-slide-left"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               Crafting{" "}
//               <span className="italic gradient-text">Digital</span>
//               <br />
//               Experiences That{" "}
//               <span className="relative inline-block min-w-[200px]">
//                 <span 
//                   className="italic gradient-text"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   {displayText}
//                 </span>
//                 <span className="animate-blink inline-block w-[2px] h-[0.8em] bg-[#8B6F47] ml-1 align-middle" />
//               </span>
//             </h1>

//             {/* Subheadline */}
//             <p 
//               className="text-base lg:text-lg text-[#6B5D4A] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
//               style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               <strong className="text-[#2B2419]">AVB Software</strong> creates premium websites, 
//               billing systems, and custom business applications for ambitious brands across India.
//               <span className="block mt-2 text-[#8B6F47] font-semibold">
//                 Starting at just ₹799/month — Premium quality, affordable price.
//               </span>
//             </p>

//             {/* Trust Feature Pills */}
//             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 animate-fade-in-up">
//               {[
//                 { text: "Free Domain", emoji: "🌐" },
//                 { text: "Free Hosting", emoji: "🖥️" },
//                 { text: "SSL Secured", emoji: "🔒" },
//                 { text: "GST Ready", emoji: "🧾" },
//               ].map((item) => (
//                 <span
//                   key={item.text}
//                   className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF5EA] rounded-full border border-[#E8DEC8] text-xs text-[#6B5D4A] font-medium shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   <span aria-hidden="true">{item.emoji}</span>
//                   {item.text}
//                 </span>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up">
//               <a
//                 href={WHATSAPP_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative px-8 py-4 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-semibold rounded-2xl shadow-lg shadow-[#8B6F47]/25 hover:shadow-[#8B6F47]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <WhatsAppIcon />
//                   Free Consultation
//                   <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </a>

//               <a
//                 href="tel:+918103558368"
//                 className="group px-8 py-4 bg-transparent text-[#8B6F47] font-semibold rounded-2xl border-2 border-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 hover:-translate-y-1"
//                 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//               >
//                 <span className="flex items-center gap-2">
//                   <PhoneIcon />
//                   Call Us Now
//                 </span>
//               </a>
//             </div>

//             {/* Trust Bar - Client Avatars */}
//             <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up">
//               <div className="flex -space-x-3">
//                 {['K', 'R', 'P', 'A', 'S'].map((letter, i) => (
//                   <div
//                     key={i}
//                     className="w-10 h-10 rounded-full border-2 border-[#FAF5EA] bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-xs font-bold shadow-md"
//                   >
//                     {letter}
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <div className="flex items-center gap-1 mb-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} className="w-4 h-4 text-[#C9A45C] fill-[#C9A45C]" viewBox="0 0 24 24">
//                       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                     </svg>
//                   ))}
//                 </div>
//                 <p className="text-xs text-[#6B5D4A]">
//                   <span className="font-bold text-[#2B2419]">50+</span> Happy Clients
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ═══════ RIGHT SIDE - LAPTOP MOCKUP ═══════ */}
//           <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            
//             {/* Decorative Floating Elements */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#C9A45C]/20 rounded-full blur-2xl"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#8B6F47]/20 rounded-full blur-2xl"></div>
            
//             {/* Floating Badge - Top Right */}
//             <div className="absolute -top-6 -right-6 z-20 animate-float">
//               <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-lg">
//                   ⚡
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>Fast Delivery</div>
//                   <div className="text-[10px] text-[#6B5D4A]">3-5 Days</div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Badge - Bottom Left */}
//             <div className="absolute -bottom-4 -left-6 z-20 animate-float" style={{ animationDelay: "1s" }}>
//               <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] flex items-center justify-center text-white text-lg">
//                   ⭐
//                 </div>
//                 <div>
//                   <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>4.9 Rating</div>
//                   <div className="text-[10px] text-[#6B5D4A]">From 50+ clients</div>
//                 </div>
//               </div>
//             </div>

//             {/* LAPTOP MOCKUP */}
//             <div className="relative">
//               {/* Laptop Body */}
//               <div className="laptop-frame relative">
//                 {/* Camera Notch */}
//                 <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1611] rounded-full z-10"></div>
                
//                 {/* Screen */}
//                 <div className="laptop-screen relative flex flex-col">
//                   {/* Browser Bar */}
//                   <div className="bg-[#F5F0E6] border-b border-[#E8DEC8] px-3 py-2 flex items-center gap-1.5 shrink-0">
//                     <div className="flex gap-1">
//                       <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
//                       <div className="w-2 h-2 rounded-full bg-[#FFD93D]"></div>
//                       <div className="w-2 h-2 rounded-full bg-[#6BCB77]"></div>
//                     </div>
//                     <div className="flex-1 mx-3 px-3 py-0.5 bg-[#FAF5EA] rounded-md border border-[#E8DEC8] flex items-center gap-1.5">
//                       <svg className="w-2.5 h-2.5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                       <span className="text-[9px] text-[#6B5D4A] truncate">avbsoftware.com</span>
//                     </div>
//                   </div>

//                   {/* Video Preview Inside Laptop (below browser bar) */}
//                   <div className="relative flex-1 bg-black overflow-hidden">
//                     <video
//                       src="videos/hero-video.mp4"
//                       autoPlay
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>

//                 {/* Laptop Base */}
//                 <div className="laptop-base"></div>
//               </div>

//               {/* Mobile Phone Overlay - Bottom Right */}
//               <div className="absolute -bottom-8 -right-2 lg:-right-4 z-10 hidden md:block">
//                 <div className="w-28 lg:w-32 bg-[#2B2419] rounded-[20px] p-1.5 shadow-2xl">
//                   <div className="bg-[#FAF5EA] rounded-[14px] overflow-hidden aspect-[9/16]">
//                     {/* Phone Status Bar */}
//                     <div className="bg-[#F5F0E6] px-2 py-1 flex justify-between items-center">
//                       <span className="text-[5px] font-bold text-[#2B2419]">9:41</span>
//                       <div className="flex gap-0.5">
//                         <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
//                         <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
//                       </div>
//                     </div>
//                     {/* Phone Content */}
//                     <div className="p-2">
//                       <div className="text-[6px] font-bold text-[#2B2419] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
//                         AVB
//                       </div>
//                       <div className="text-[5px] text-[#8B6F47] font-semibold mb-1.5">— STUDIO</div>
//                       <div className="bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded p-1.5 mb-1">
//                         <div className="text-[5px] text-white font-bold">Premium Web</div>
//                         <div className="text-[4px] text-white/80">₹799/month</div>
//                       </div>
//                       <div className="space-y-1">
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-full"></div>
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-3/4"></div>
//                         <div className="h-1 bg-[#E8DCC4] rounded-full w-1/2"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ═══════ STATS BAR ═══════ */}
//         <div className="mt-20 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             {heroStats.map((stat) => (
//               <div
//                 key={stat.label}
//                 className="flex items-center gap-3 p-4 bg-[#FAF5EA] backdrop-blur-sm rounded-2xl border border-[#E8DEC8] shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-1 transition-all duration-300"
//               >
//                 <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl shadow-md text-xl">
//                   {stat.emoji}
//                 </span>
//                 <div>
//                   <div 
//                     className="text-xl font-bold text-[#2B2419] leading-tight"
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     {stat.value}
//                   </div>
//                   <div className="text-xs text-[#6B5D4A] font-medium leading-tight">
//                     {stat.label}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ═══════ INDUSTRIES MARQUEE ═══════ */}
//         <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
//           <p className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
//             — TRUSTED BY BUSINESSES ACROSS INDIA
//           </p>
//           <div className="industries-marquee">
//             <div className="industries-marquee-content">
//               {industries.map((ind) => (
//                 <span key={`a-${ind.name}`} className="industry-pill">
//                   <span aria-hidden="true">{ind.emoji}</span>
//                   {ind.name}
//                 </span>
//               ))}
//             </div>
//             <div className="industries-marquee-content" aria-hidden="true">
//               {industries.map((ind) => (
//                 <span key={`b-${ind.name}`} className="industry-pill">
//                   <span>{ind.emoji}</span>
//                   {ind.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════ TECH STACK MARQUEE ═══════ */}
//       <div className="relative z-10 pt-4">
//         <h2 className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
//           — TECHNOLOGIES WE MASTER
//         </h2>
//         <div className="marquee">
//           <div className="marquee-content">
//             {techStack.map((tech) => (
//               <span key={`a-${tech.name}`} className="skill-pill">
//                 <span aria-hidden="true">{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//           <div className="marquee-content" aria-hidden="true">
//             {techStack.map((tech) => (
//               <span key={`b-${tech.name}`} className="skill-pill">
//                 <span>{tech.emoji}</span>
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ═══════ STYLES ═══════ */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob { animation: blob 7s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }

//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fade-in { animation: fade-in 1.2s ease-out; }

//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
//         }

//         @keyframes slide-left {
//           from { opacity: 0; transform: translateX(-40px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-slide-left {
//           animation: slide-left 1s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
//         }

//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink { animation: blink 0.8s step-end infinite; }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }

//         /* Industries Marquee */
//         .industries-marquee {
//           display: flex;
//           overflow: hidden;
//           user-select: none;
//           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
//         }
//         .industries-marquee-content {
//           display: flex;
//           gap: 1rem;
//           animation: industriesScroll 30s linear infinite;
//           flex-shrink: 0;
//           padding: 0 0.5rem;
//         }
//         .industries-marquee:hover .industries-marquee-content {
//           animation-play-state: paused;
//         }
//         @keyframes industriesScroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .industry-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.6rem 1.25rem;
//           background: #FAF5EA;
//           backdrop-filter: blur(10px);
//           border-radius: 50px;
//           font-size: 0.8rem;
//           font-weight: 500;
//           color: #6B5D4A;
//           border: 1px solid #E8DEC8;
//           white-space: nowrap;
//           transition: all 0.3s ease;
//         }
//         .industry-pill:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 15px rgba(139, 111, 71, 0.15);
//           border-color: #8B6F47;
//           color: #8B6F47;
//         }
//       `}</style>
//     </section>
//   );
// }




"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, useRef } from "react";

/* ─── Tech Stack ─── */
const techStack = [
  { name: "Next.js", emoji: "⚡" },
  { name: "React.js", emoji: "⚛️" },
  { name: "React Native", emoji: "📱" },
  { name: "Flutter", emoji: "🦋" },
  { name: "Node.js", emoji: "🟢" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "JavaScript", emoji: "🟨" },
  { name: "Python", emoji: "🐍" },
  { name: "MongoDB", emoji: "🍃" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Firebase", emoji: "🔥" },
  { name: "AWS", emoji: "☁️" },
  { name: "Figma", emoji: "🎨" },
  { name: "Tailwind CSS", emoji: "💨" },
  { name: "WordPress", emoji: "📝" },
];

/* ─── Industries ─── */
const industries = [
  { name: "Retail & Shops", emoji: "🏪" },
  { name: "Restaurants & Cafes", emoji: "☕" },
  { name: "Gyms & Fitness", emoji: "🏋️" },
  { name: "Clinics & Doctors", emoji: "🩺" },
  { name: "Salons & Spa", emoji: "💇" },
  { name: "Schools & Coaching", emoji: "🎓" },
  { name: "Logistics & Transport", emoji: "🚚" },
  { name: "E-Commerce", emoji: "🛒" },
  { name: "Billing & POS", emoji: "🧾" },
  { name: "Inventory Management", emoji: "📦" },
];

/* ─── Hero Stats ─── */
const heroStats = [
  { value: "50+", label: "Businesses Served", emoji: "🏢" },
  { value: "100%", label: "Client Satisfaction", emoji: "⭐" },
  { value: "3-5 Days", label: "Go Live", emoji: "⏱️" },
  { value: "24/7", label: "Support", emoji: "🎧" },
];

const WHATSAPP_NUMBER = "918103558368";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi AVB Software! I'm interested in getting a professional website / custom software for my business. Please share details."
)}`;

/* ═══════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════ */
function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN HERO SECTION
   ═══════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const headlines = useMemo(
    () => [
      "Grows Your Business",
      "Ranks on Google",
      "Scales With You",
      "Wins Customers",
    ],
    []
  );

  useEffect(() => {
    const currentWord = headlines[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          setTypingSpeed(120);
        } else {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          setTypingSpeed(80);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % headlines.length);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, headlines, typingSpeed]);

  return (
    <section className="relative overflow-hidden bg-[#F5F0E6] pt-24 lg:pt-28 pb-12">
      
      {/* ─── Decorative Background Blobs ─── */}
      <div className="absolute top-20 -left-48 w-96 h-96 bg-[#E8DCC4] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="absolute top-40 -right-48 w-96 h-96 bg-[#D4C29E] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#C9A45C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* ─── Grid Pattern ─── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,111,71,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,111,71,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══════════════════════════════════════════════
          MAIN HERO CONTENT - 2 COLUMNS
          ═══════════════════════════════════════════════ */}
      <div className="relative z-10 container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* ═══════ LEFT SIDE - TEXT CONTENT ═══════ */}
          <div className="text-center lg:text-left">
            
            {/* Premium Badge */}
            <div className="mb-6 animate-fade-in">
              <span 
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="w-8 h-px bg-[#8B6F47]"></span>
                PROFESSIONAL WEB STUDIO
              </span>
            </div>

            {/* H1 - Luxury Serif */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#2B2419] leading-[1.05] mb-6 tracking-tight animate-slide-left"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafting{" "}
              <span className="italic gradient-text">Digital</span>
              <br />
              Experiences That{" "}
              <span className="relative inline-block min-w-[200px]">
                <span 
                  className="italic gradient-text"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {displayText}
                </span>
                <span className="animate-blink inline-block w-[2px] h-[0.8em] bg-[#8B6F47] ml-1 align-middle" />
              </span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-base lg:text-lg text-[#6B5D4A] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <strong className="text-[#2B2419]">AVB Software</strong> creates premium websites, 
              billing systems, and custom business applications for ambitious brands across India.
              <span className="block mt-2 text-[#8B6F47] font-semibold">
                Starting at just ₹799/month — Premium quality, affordable price.
              </span>
            </p>

            {/* Trust Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 animate-fade-in-up">
              {[
                { text: "Free Domain", emoji: "🌐" },
                { text: "Free Hosting", emoji: "🖥️" },
                { text: "SSL Secured", emoji: "🔒" },
                { text: "GST Ready", emoji: "🧾" },
              ].map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF5EA] rounded-full border border-[#E8DEC8] text-xs text-[#6B5D4A] font-medium shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-semibold rounded-2xl shadow-lg shadow-[#8B6F47]/25 hover:shadow-[#8B6F47]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <WhatsAppIcon />
                  Free Consultation
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="tel:+918103558368"
                className="group px-8 py-4 bg-transparent text-[#8B6F47] font-semibold rounded-2xl border-2 border-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 hover:-translate-y-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="flex items-center gap-2">
                  <PhoneIcon />
                  Call Us Now
                </span>
              </a>
            </div>

            {/* Trust Bar - Client Avatars */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up">
              <div className="flex -space-x-3">
                {['K', 'R', 'P', 'A', 'S'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#FAF5EA] bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-xs font-bold shadow-md"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#C9A45C] fill-[#C9A45C]" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-[#6B5D4A]">
                  <span className="font-bold text-[#2B2419]">50+</span> Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* ═══════ RIGHT SIDE - LAPTOP MOCKUP ═══════ */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            
            {/* Decorative Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#C9A45C]/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#8B6F47]/20 rounded-full blur-2xl"></div>
            
            {/* Floating Badge - Top Right */}
            <div className="absolute -top-6 -right-6 z-20 animate-float">
              <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white text-lg">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>Fast Delivery</div>
                  <div className="text-[10px] text-[#6B5D4A]">3-5 Days</div>
                </div>
              </div>
            </div>

            {/* Floating Badge - Bottom Left */}
            <div className="absolute -bottom-4 -left-6 z-20 animate-float" style={{ animationDelay: "1s" }}>
              <div className="bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl shadow-xl p-3 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A45C] to-[#8B6F47] flex items-center justify-center text-white text-lg">
                  ⭐
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>4.9 Rating</div>
                  <div className="text-[10px] text-[#6B5D4A]">From 50+ clients</div>
                </div>
              </div>
            </div>

            {/* LAPTOP MOCKUP */}
            <div className="relative">
              {/* Laptop Body */}
              <div className="laptop-frame relative">
                {/* Camera Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1611] rounded-full z-10"></div>
                
                {/* Screen */}
                <div className="laptop-screen relative flex flex-col">
                  {/* Browser Bar */}
                  <div className="bg-[#F5F0E6] border-b border-[#E8DEC8] px-3 py-2 flex items-center gap-1.5 shrink-0">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#FFD93D]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#6BCB77]"></div>
                    </div>
                    <div className="flex-1 mx-3 px-3 py-0.5 bg-[#FAF5EA] rounded-md border border-[#E8DEC8] flex items-center gap-1.5">
                      <svg className="w-2.5 h-2.5 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-[9px] text-[#6B5D4A] truncate">avbsoftware.com</span>
                    </div>
                  </div>

                  {/* Video Preview Inside Laptop (below browser bar) */}
                  {/* <div className="relative flex-1 overflow-hidden  bg-[#FAF5EA] flex items-center">
                    <video
                      ref={videoRef}
                      src="videos/hero-video.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedMetadata={() => {
                        if (videoRef.current) {
                          videoRef.current.playbackRate = 0.6;
                        }
                      }}
                      className="w-full h-full"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div> */}


                  <div className="relative overflow-hidden bg-[#FAF5EA] flex items-center">
  <video
    ref={videoRef}
    src="videos/hero-video.mp4"
    autoPlay
    loop
    muted
    playsInline
    onLoadedMetadata={() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.6;
      }
    }}
    style={{ 
      width: "100%",
      height: "800px",        // ⬅️ Yahan direct height do
      objectFit: "contain", 
      objectPosition: "center" 
    }}
  />
</div>
                </div>

                {/* Laptop Base */}
                <div className="laptop-base"></div>
              </div>

              {/* Mobile Phone Overlay - Bottom Right */}
              <div className="absolute -bottom-8 -right-2 lg:-right-4 z-10 hidden md:block">
                <div className="w-28 lg:w-32 bg-[#2B2419] rounded-[20px] p-1.5 shadow-2xl">
                  <div className="bg-[#FAF5EA] rounded-[14px] overflow-hidden aspect-[9/16]">
                    {/* Phone Status Bar */}
                    <div className="bg-[#F5F0E6] px-2 py-1 flex justify-between items-center">
                      <span className="text-[5px] font-bold text-[#2B2419]">9:41</span>
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#2B2419] rounded-full"></div>
                      </div>
                    </div>
                    {/* Phone Content */}
                    <div className="p-2">
                      <div className="text-[6px] font-bold text-[#2B2419] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        AVB
                      </div>
                      <div className="text-[5px] text-[#8B6F47] font-semibold mb-1.5">— STUDIO</div>
                      <div className="bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded p-1.5 mb-1">
                        <div className="text-[5px] text-white font-bold">Premium Web</div>
                        <div className="text-[4px] text-white/80"> Starting just ₹799/month </div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 bg-[#E8DCC4] rounded-full w-full"></div>
                        <div className="h-1 bg-[#E8DCC4] rounded-full w-3/4"></div>
                        <div className="h-1 bg-[#E8DCC4] rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ STATS BAR ═══════ */}
        <div className="mt-20 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 bg-[#FAF5EA] backdrop-blur-sm rounded-2xl border border-[#E8DEC8] shadow-sm hover:shadow-md hover:border-[#D4C29E] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-xl shadow-md text-xl">
                  {stat.emoji}
                </span>
                <div>
                  <div 
                    className="text-xl font-bold text-[#2B2419] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6B5D4A] font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════ INDUSTRIES MARQUEE ═══════ */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
            — TRUSTED BY BUSINESSES ACROSS INDIA
          </p>
          <div className="industries-marquee">
            <div className="industries-marquee-content">
              {industries.map((ind) => (
                <span key={`a-${ind.name}`} className="industry-pill">
                  <span aria-hidden="true">{ind.emoji}</span>
                  {ind.name}
                </span>
              ))}
            </div>
            <div className="industries-marquee-content" aria-hidden="true">
              {industries.map((ind) => (
                <span key={`b-${ind.name}`} className="industry-pill">
                  <span>{ind.emoji}</span>
                  {ind.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ TECH STACK MARQUEE ═══════ */}
      <div className="relative z-10 pt-4">
        <h2 className="text-center text-xs text-[#8B6F47] font-semibold tracking-[2px] uppercase mb-4">
          — TECHNOLOGIES WE MASTER
        </h2>
        <div className="marquee">
          <div className="marquee-content">
            {techStack.map((tech) => (
              <span key={`a-${tech.name}`} className="skill-pill">
                <span aria-hidden="true">{tech.emoji}</span>
                {tech.name}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {techStack.map((tech) => (
              <span key={`b-${tech.name}`} className="skill-pill">
                <span>{tech.emoji}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ STYLES ═══════ */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1.2s ease-out; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) both;
        }

        @keyframes slide-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 1s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 0.8s step-end infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Industries Marquee */
        .industries-marquee {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .industries-marquee-content {
          display: flex;
          gap: 1rem;
          animation: industriesScroll 30s linear infinite;
          flex-shrink: 0;
          padding: 0 0.5rem;
        }
        .industries-marquee:hover .industries-marquee-content {
          animation-play-state: paused;
        }
        @keyframes industriesScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .industry-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background: #FAF5EA;
          backdrop-filter: blur(10px);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #6B5D4A;
          border: 1px solid #E8DEC8;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .industry-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(139, 111, 71, 0.15);
          border-color: #8B6F47;
          color: #8B6F47;
        }
      `}</style>
    </section>
  );
}