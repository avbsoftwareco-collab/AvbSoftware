// // "use client";

// // import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
// // import { useRef, useState, useEffect } from "react";
// // import { Phone, MessageCircle, Award, ChefHat, Truck, Sparkles, Star, ArrowRight } from "lucide-react";
// // import { Client } from "@/lib/supabase";

// // const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%231E3333'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

// // // FAST loading Pexels CDN video (compressed)
// // const HERO_VIDEO = "https://videos.pexels.com/video-files/3997798/3997798-uhd_2560_1440_25fps.mp4";
// // const HERO_POSTER = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80";

// // const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: any) => {
// //   const d: any = { up: { y: 60 }, down: { y: -60 }, left: { x: 60 }, right: { x: -60 } };
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, ...d[direction] }}
// //       whileInView={{ opacity: 1, x: 0, y: 0 }}
// //       viewport={{ once: true, margin: "-50px" }}
// //       transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
// //       className={className}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // };

// // function AnimatedCounter({ value }: { value: string }) {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true });
// //   const numericPart = value.replace(/[^0-9.]/g, "");
// //   const nonNumeric = value.replace(/[0-9.]/g, "");
// //   const num = parseFloat(numericPart) || 0;
// //   const [count, setCount] = useState(0);

// //   useEffect(() => {
// //     if (!isInView || !num) return;
// //     let start = 0;
// //     const duration = 2500;
// //     const step = (timestamp: number) => {
// //       if (!start) start = timestamp;
// //       const progress = Math.min((timestamp - start) / duration, 1);
// //       setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * num));
// //       if (progress < 1) requestAnimationFrame(step);
// //     };
// //     requestAnimationFrame(step);
// //   }, [isInView, num]);

// //   return <span ref={ref}>{count}{nonNumeric}</span>;
// // }

// // function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
// //   const letters = text.split("");
// //   return (
// //     <span className={className}>
// //       {letters.map((letter, i) => (
// //         <motion.span
// //           key={i}
// //           initial={{ opacity: 0, y: 50, rotateX: -90 }}
// //           animate={{ opacity: 1, y: 0, rotateX: 0 }}
// //           transition={{ delay: delay + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// //           style={{ display: "inline-block" }}
// //         >
// //           {letter === " " ? "\u00A0" : letter}
// //         </motion.span>
// //       ))}
// //     </span>
// //   );
// // }


// // export default function HomePage({ client, setPage }: { client: Client; setPage?: (p: string) => void }) {
// //   const heroRef = useRef<HTMLDivElement>(null);
// //   const [videoLoaded, setVideoLoaded] = useState(false);
// //   const [activeReview, setActiveReview] = useState(0);
  
// //   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
// //   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
// //   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

// //   const restaurantName = client.business_name || "Sweet Bites";
// //   const tagline = client.tagline || "Atelier de Pâtisserie";
// //   const phone = client.phone || "";
// //   const whatsapp = client.whatsapp || "";
// //   const yearEstablished = client.year_established || client.established_year || "2010";

// //   const featured = client.products?.slice(0, 3) || [
// //     { name: "Belgian Truffle", price: "₹1,250", description: "Premium Belgian chocolate", image_url: PLACEHOLDER },
// //     { name: "Velvet Royale", price: "₹1,450", description: "Classic red velvet", image_url: PLACEHOLDER },
// //     { name: "Saffron Pistachio", price: "₹1,650", description: "Kashmiri saffron infused", image_url: PLACEHOLDER },
// //   ];

// //   const stats = [
// //     { number: client.stat_1_number || "10K", label: client.stat_1_label || "Patrons" },
// //     { number: client.stat_2_number || "500", label: client.stat_2_label || "Bespoke" },
// //     { number: client.stat_3_number || "50", label: client.stat_3_label || "Flavors" },
// //     { number: client.stat_4_number || "4.9", label: client.stat_4_label || "Rating" },
// //   ];

// //   const reviews = client.reviews || [];

// //   // Auto-rotate reviews
// //   useEffect(() => {
// //     if (reviews.length <= 1) return;
// //     const timer = setInterval(() => {
// //       setActiveReview((prev) => (prev + 1) % reviews.length);
// //     }, 5000);
// //     return () => clearInterval(timer);
// //   }, [reviews.length]);

// //   const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : "#";

// //   return (
// //     <div className="bg-[#0F1F1F] text-[#F0F5F0] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 1. HERO - VIDEO BACKGROUND                */}
// //       {/* ════════════════════════════════════════ */}
// //       <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
// //         <motion.div style={{ y: heroY }} className="absolute inset-0">
// //           {/* Poster image (loads first - super fast) */}
// //           <div
// //             className="absolute inset-0 bg-cover bg-center"
// //             style={{
// //               backgroundImage: `url(${HERO_POSTER})`,
// //               filter: "brightness(0.35)",
// //             }}
// //           />
          
// //           {/* Video (loads after) */}
// //           <video
// //             autoPlay
// //             muted
// //             loop
// //             playsInline
// //             preload="auto"
// //             poster={HERO_POSTER}
// //             onLoadedData={() => setVideoLoaded(true)}
// //             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
// //               videoLoaded ? "opacity-100" : "opacity-0"
// //             }`}
// //             style={{ filter: "brightness(0.35)" }}
// //           >
// //             <source src={HERO_VIDEO} type="video/mp4" />
// //           </video>

// //           {/* Dark gradient overlays */}
// //           <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F1F]/60 via-[#0F1F1F]/30 to-[#0F1F1F]" />
// //           <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F1F]/40 via-transparent to-[#0F1F1F]/40" />
// //         </motion.div>

// //         {/* Floating gold sparkles */}
// //         <div className="absolute inset-0 pointer-events-none">
// //           {[...Array(15)].map((_, i) => (
// //             <motion.div
// //               key={i}
// //               className="absolute"
// //               style={{
// //                 left: `${Math.random() * 100}%`,
// //                 top: `${Math.random() * 100}%`,
// //               }}
// //               animate={{
// //                 y: [0, -30, 0],
// //                 opacity: [0, 0.8, 0],
// //                 scale: [0, 1, 0],
// //               }}
// //               transition={{
// //                 duration: 3 + Math.random() * 2,
// //                 repeat: Infinity,
// //                 delay: Math.random() * 5,
// //               }}
// //             >
// //               <Sparkles className="w-3 h-3 sm:w-4 sm:h-4text-[var(--theme-primary)]" />
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* Decorative side lines */}
// //         <div className="hidden md:block absolute top-1/2 left-[5%] w-px h-32 bg-gradient-to-b from-transparentvia-[var(--theme-primary)]/50 to-transparent -translate-y-1/2" />
// //         <div className="hidden md:block absolute top-1/2 right-[5%] w-px h-32 bg-gradient-to-b from-transparentvia-[var(--theme-primary)]/50 to-transparent -translate-y-1/2" />

// //         {/* CONTENT */}
// //         <motion.div
// //           style={{ opacity: heroOpacity }}
// //           className="relative z-10 text-center px-6 max-w-5xl"
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 1.2, delay: 0.3 }}
// //             className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
// //           >
// //             <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
// //             <motion.span
// //               animate={{ rotate: 360 }}
// //               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
// //               className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl"
// //             >
// //               ✦
// //             </motion.span>
// //             <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
// //           </motion.div>

// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.5, duration: 1 }}
// //             className="mb-6"
// //           >
// //             <span
// //               className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[6px] sm:tracking-[8px] uppercase font-medium"
// //               style={{ fontFamily: "'Cinzel', serif" }}
// //             >
// //               Established · {yearEstablished}
// //             </span>
// //           </motion.div>

// //           <h1
// //             className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-6 sm:mb-8"
// //             style={{ fontFamily: "'Italiana', serif", letterSpacing: '-2px' }}
// //           >
// //             <span className="block bg-gradient-to-br from-[#F0F5F0]via-[var(--theme-primary)] to-[#F0F5F0] bg-clip-text text-transparent">
// //               <SplitText text={restaurantName.split(' ')[0] || ''} delay={0.8} />
// //             </span>
// //             {restaurantName.split(' ')[1] && (
// //               <span className="block italictext-[var(--theme-primary)]">
// //                 <SplitText text={restaurantName.split(' ')[1] || ''} delay={1.3} />
// //               </span>
// //             )}
// //           </h1>

// //           <motion.p
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 2, duration: 1 }}
// //             className="text-base sm:text-lg md:text-xl text-[#F0F5F0]/80 tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-light mb-12 sm:mb-14"
// //             style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //           >
// //             {tagline}
// //           </motion.p>

// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 2.3, duration: 1 }}
// //             className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center"
// //           >
// //             {whatsapp && (
// //               <motion.a
// //                 href={whatsappUrl}
// //                 target="_blank"
// //                 whileHover={{ scale: 1.05, y: -3 }}
// //                 whileTap={{ scale: 0.97 }}
// //                 className="group relative overflow-hidden bg-gradient-to-br from-[var(--theme-primary)] via-[#C9A227] to-[#B89030] text-[#0F1F1F] px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-bold no-underline"
// //                 style={{ fontFamily: "'Cinzel', serif" }}
// //               >
// //                 <motion.div
// //                   animate={{ x: ["-100%", "200%"] }}
// //                   transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
// //                   className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
// //                 />
// //                 <span className="relative z-10">Reserve Now</span>
// //               </motion.a>
// //             )}
// //             <motion.button
// //               onClick={() => setPage?.("collection")}
// //               whileHover={{ scale: 1.05, y: -3 }}
// //               whileTap={{ scale: 0.97 }}
// //               className="border border-[var(--theme-primary)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-colors px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-medium"
// //               style={{ fontFamily: "'Cinzel', serif" }}
// //             >
// //               View Collection
// //             </motion.button>
// //           </motion.div>
// //         </motion.div>

// //         <motion.div
// //           animate={{ y: [0, 12, 0] }}
// //           transition={{ duration: 2, repeat: Infinity }}
// //           className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
// //         >
// //           <span
// //             className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase"
// //             style={{ fontFamily: "'Cinzel', serif" }}
// //           >
// //             Discover
// //           </span>
// //           <div className="w-px h-12 bg-gradient-to-b from-[var(--theme-primary)] to-transparent" />
// //         </motion.div>
// //       </section>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 2. STATS BAR - GOLD STRIP                 */}
// //       {/* ════════════════════════════════════════ */}
// //       <section className="bg-gradient-to-r from-[#0F1F1F] via-[#162929] to-[#0F1F1F] py-12 sm:py-16 border-y border-[var(--theme-primary)]/20 relative overflow-hidden">
// //         <div className="absolute inset-0 opacity-5" style={{
// //           backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
// //           backgroundSize: "30px 30px",
// //         }} />

// //         <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
// //           {stats.map((stat, i) => (
// //             <FadeIn key={i} delay={i * 0.1}>
// //               <div className="text-center group cursor-default">
// //                 <div
// //                   className="text-4xl sm:text-5xl md:text-6xltext-[var(--theme-primary)] mb-2 group-hover:scale-110 transition-transform"
// //                   style={{ fontFamily: "'Italiana', serif" }}
// //                 >
// //                   <AnimatedCounter value={stat.number} />
// //                   {!stat.number.includes('★') && !stat.number.includes('K') && !stat.number.includes('+') && !stat.number.includes('.') && '+'}
// //                 </div>
// //                 <div
// //                   className="text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase text-[#F0F5F0]/60"
// //                   style={{ fontFamily: "'Cinzel', serif" }}
// //                 >
// //                   {stat.label}
// //                 </div>
// //               </div>
// //             </FadeIn>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 3. SIGNATURE COLLECTION                   */}
// //       {/* ════════════════════════════════════════ */}
// //       <section className="py-20 sm:py-24 md:py-32 bg-[#0F1F1F]">
// //         <div className="container mx-auto px-4 sm:px-6">
// //           <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
// //             <div className="flex items-center justify-center gap-4 mb-6">
// //               <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
// //               <span
// //                 className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[6px] uppercase"
// //                 style={{ fontFamily: "'Cinzel', serif" }}
// //               >
// //                 Signature Collection
// //               </span>
// //               <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
// //             </div>

// //             <h2
// //               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6"
// //               style={{ fontFamily: "'Italiana', serif" }}
// //             >
// //               Crafted <span className="italictext-[var(--theme-primary)]">Masterpieces</span>
// //             </h2>

// //             <p
// //               className="text-base sm:text-lg text-[#F0F5F0]/60 italic font-light"
// //               style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //             >
// //               Each creation is a work of art, handcrafted with the finest ingredients
// //             </p>
// //           </FadeIn>

// //           {/* Featured Cakes Grid - 3D Flip Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
// //             {featured.map((cake: any, i: number) => (
// //               <motion.div
// //                 key={i}
// //                 initial={{ opacity: 0, y: 60, rotateY: -15 }}
// //                 whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
// //                 viewport={{ once: true, margin: "-50px" }}
// //                 transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
// //                 whileHover={{ y: -15 }}
// //                 className="group cursor-pointer"
// //               >
// //                 <div className="relative bg-[#1E3333] border border-[var(--theme-primary)]/20 overflow-hidden transition-all duration-500 group-hover:border-[var(--theme-primary)] group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/20">
                  
// //                   {/* Image */}
// //                   <div className="relative h-80 sm:h-96 overflow-hidden">
// //                     <img
// //                       src={cake.image_url || cake.image || PLACEHOLDER}
// //                       alt={cake.name}
// //                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                     />
                    
// //                     {/* Gradient overlay */}
// //                     <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F1F] via-transparent to-transparent opacity-70" />
                    
// //                     {/* Number badge */}
// //                     <div className="absolute top-4 left-4">
// //                       <span
// //                         className="text-3xl sm:text-4xltext-[var(--theme-primary)]/40 group-hover:text-[#D4AF37] transition-colors"
// //                         style={{ fontFamily: "'Italiana', serif" }}
// //                       >
// //                         0{i + 1}
// //                       </span>
// //                     </div>

// //                     {/* Price tag */}
// //                     {cake.price && (
// //                       <div className="absolute top-4 right-4 bg-[#0F1F1F]/90 backdrop-blur-sm border border-[var(--theme-primary)]/40 px-4 py-2">
// //                         <span
// //                           className="text-[#D4AF37] text-lg sm:text-xl"
// //                           style={{ fontFamily: "'Italiana', serif" }}
// //                         >
// //                           {cake.price}
// //                         </span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Content */}
// //                   <div className="p-6 sm:p-8">
// //                     <h3
// //                       className="text-2xl sm:text-3xl text-[#F0F5F0] mb-3 group-hover:text-[#D4AF37] transition-colors"
// //                       style={{ fontFamily: "'Italiana', serif" }}
// //                     >
// //                       {cake.name}
// //                     </h3>

// //                     <div className="h-px w-12bg-[var(--theme-primary)] mb-4" />

// //                     {cake.description && (
// //                       <p
// //                         className="text-[#F0F5F0]/60 text-sm sm:text-base italic font-light leading-relaxed"
// //                         style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //                       >
// //                         {cake.description}
// //                       </p>
// //                     )}

// //                     <motion.button
// //                       className="mt-6 flex items-center gap-2text-[var(--theme-primary)] text-[11px] tracking-[3px] uppercase font-medium group/btn"
// //                       style={{ fontFamily: "'Cinzel', serif" }}
// //                       whileHover={{ x: 5 }}
// //                     >
// //                       <span>Order</span>
// //                       <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
// //                     </motion.button>
// //                   </div>

// //                   {/* Hover corner accents */}
// //                   <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[var(--theme-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //                   <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[var(--theme-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>

// //           {/* View All Button */}
// //           <FadeIn delay={0.5} className="text-center mt-12 sm:mt-16">
// //             <motion.button
// //               onClick={() => setPage?.("collection")}
// //               whileHover={{ scale: 1.05 }}
// //               className="inline-flex items-center gap-3 border border-[var(--theme-primary)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-colors px-10 py-4 text-[11px] tracking-[4px] uppercase font-medium"
// //               style={{ fontFamily: "'Cinzel', serif" }}
// //             >
// //               View Full Collection <ArrowRight className="w-4 h-4" />
// //             </motion.button>
// //           </FadeIn>
// //         </div>
// //       </section>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 4. PROCESS - HOW WE BAKE                  */}
// //       {/* ════════════════════════════════════════ */}
// //       <section className="py-20 sm:py-24 md:py-32 bg-[#162929] relative overflow-hidden">
// //         {/* Background pattern */}
// //         <div className="absolute inset-0 opacity-5" style={{
// //           backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
// //           backgroundSize: "40px 40px",
// //         }} />

// //         <div className="container mx-auto px-4 sm:px-6 relative z-10">
// //           <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
// //             <div className="flex items-center justify-center gap-4 mb-6">
// //               <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
// //               <span
// //                 className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[6px] uppercase"
// //                 style={{ fontFamily: "'Cinzel', serif" }}
// //               >
// //                 The Process
// //               </span>
// //               <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
// //             </div>

// //             <h2
// //               className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6"
// //               style={{ fontFamily: "'Italiana', serif" }}
// //             >
// //               From Vision to <span className="italictext-[var(--theme-primary)]">Reality</span>
// //             </h2>
// //           </FadeIn>

// //           {/* Process Steps */}
// //           <div className="max-w-6xl mx-auto">
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
// //               {/* Connecting line (desktop only) */}
// //               <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparentvia-[var(--theme-primary)]/30 to-transparent" />

// //               {[
// //                 { num: "01", icon: ChefHat, title: "Consult", desc: "Share your vision with our master baker" },
// //                 { num: "02", icon: Sparkles, title: "Design", desc: "We craft a bespoke design for your cake" },
// //                 { num: "03", icon: Award, title: "Bake", desc: "Handcrafted with premium ingredients" },
// //                 { num: "04", icon: Truck, title: "Deliver", desc: "Fresh delivery to your celebration" },
// //               ].map((step, i) => (
// //                 <motion.div
// //                   key={i}
// //                   initial={{ opacity: 0, y: 50 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ delay: i * 0.15, duration: 0.8 }}
// //                   className="relative text-center group"
// //                 >
// //                   {/* Step circle */}
// //                   <div className="relative mb-6 inline-block">
// //                     <motion.div
// //                       className="w-24 h-24 mx-auto rounded-full border-2 border-[var(--theme-primary)] bg-[#0F1F1F] flex items-center justify-center relative z-10 group-hover:bg-[#D4AF37] transition-colors duration-500"
// //                       whileHover={{ scale: 1.1, rotate: 360 }}
// //                       transition={{ duration: 0.6 }}
// //                     >
// //                       <step.icon className="w-10 h-10text-[var(--theme-primary)] group-hover:text-[#0F1F1F] transition-colors" />
// //                     </motion.div>
// //                     {/* Number badge */}
// //                     <span
// //                       className="absolute -top-2 -right-2bg-[var(--theme-primary)] text-[#0F1F1F] w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-20"
// //                       style={{ fontFamily: "'Cinzel', serif" }}
// //                     >
// //                       {step.num}
// //                     </span>
// //                   </div>

// //                   <h3
// //                     className="text-2xl sm:text-3xl text-[#F0F5F0] mb-3 group-hover:text-[#D4AF37] transition-colors"
// //                     style={{ fontFamily: "'Italiana', serif" }}
// //                   >
// //                     {step.title}
// //                   </h3>

// //                   <p
// //                     className="text-[#F0F5F0]/60 text-sm italic"
// //                     style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px' }}
// //                   >
// //                     {step.desc}
// //                   </p>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 5. ABOUT PREVIEW                          */}
// //       {/* ════════════════════════════════════════ */}
// //       <section className="py-20 sm:py-24 md:py-32 bg-[#0F1F1F]">
// //         <div className="container mx-auto px-4 sm:px-6">
// //           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            
// //             {/* Left - Image */}
// //             <FadeIn direction="left">
// //               <div className="relative">
// //                 {/* Decorative border */}
// //                 <div className="absolute -top-6 -left-6 right-12 bottom-12 border border-[var(--theme-primary)] z-0" />
                
// //                 <div className="relative z-10 aspect-[4/5] overflow-hidden">
// //                   <img
// //                     src={client.about_image || client.hero_image_url || PLACEHOLDER}
// //                     alt="Heritage"
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>

// //                 {/* Floating badge */}
// //                 <motion.div
// //                   animate={{ y: [0, -10, 0] }}
// //                   transition={{ duration: 3, repeat: Infinity }}
// //                   className="absolute -bottom-8 -right-8 bg-[#0F1F1F] border border-[var(--theme-primary)] p-6 sm:p-8 text-center z-20"
// //                 >
// //                   <div
// //                     className="text-4xl sm:text-5xltext-[var(--theme-primary)] leading-none"
// //                     style={{ fontFamily: "'Italiana', serif" }}
// //                   >
// //                     {yearEstablished}
// //                   </div>
// //                   <div
// //                     className="text-[10px] tracking-[3px] uppercase text-[#F0F5F0]/60 mt-2"
// //                     style={{ fontFamily: "'Cinzel', serif" }}
// //                   >
// //                     Est.
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </FadeIn>

// //             {/* Right - Content */}
// //             <FadeIn direction="right">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="h-px w-12bg-[var(--theme-primary)]" />
// //                 <span
// //                   className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[6px] uppercase"
// //                   style={{ fontFamily: "'Cinzel', serif" }}
// //                 >
// //                   Our Heritage
// //                 </span>
// //               </div>

// //               <h2
// //                 className="text-4xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight"
// //                 style={{ fontFamily: "'Italiana', serif" }}
// //               >
// //                 A Legacy of <span className="italictext-[var(--theme-primary)]">Excellence</span>
// //               </h2>

// //               <p
// //                 className="text-lg sm:text-xl text-[#F0F5F0]/70 leading-relaxed mb-6 italic font-light"
// //                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //               >
// //                 {client.about_short || client.about || `Since ${yearEstablished}, ${restaurantName} has been crafting extraordinary cakes that transform celebrations into cherished memories.`}
// //               </p>

// //               <p
// //                 className="text-base text-[#F0F5F0]/50 leading-relaxed mb-10 italic font-light"
// //                 style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //               >
// //                 Each creation is a testament to our unwavering commitment to quality, artistry, and the timeless tradition of fine baking.
// //               </p>

// //               <motion.button
// //                 onClick={() => setPage?.("heritage")}
// //                 whileHover={{ x: 10 }}
// //                 className="inline-flex items-center gap-3text-[var(--theme-primary)] text-[11px] tracking-[4px] uppercase font-medium group"
// //                 style={{ fontFamily: "'Cinzel', serif" }}
// //               >
// //                 Discover Our Story
// //                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
// //               </motion.button>
// //             </FadeIn>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ════════════════════════════════════════ */}
// //       {/* 6. TESTIMONIALS - EDITORIAL              */}
// //       {/* ════════════════════════════════════════ */}
// //       {reviews.length > 0 && (
// //         <section className="py-20 sm:py-24 md:py-32 bg-gradient-to-b from-[#0F1F1F] via-[#162929] to-[#0F1F1F] relative overflow-hidden">
// //           {/* Decorative quote marks */}
// //           <div className="absolute top-10 left-10 text-[200px]text-[var(--theme-primary)]/5 leading-none" style={{ fontFamily: "'Italiana', serif" }}>"</div>
// //           <div className="absolute bottom-10 right-10 text-[200px]text-[var(--theme-primary)]/5 leading-none" style={{ fontFamily: "'Italiana', serif" }}>"</div>

// //           <div className="container mx-auto px-4 sm:px-6 relative z-10">
// //             <FadeIn className="text-center max-w-3xl mx-auto mb-16">
// //               <div className="flex items-center justify-center gap-4 mb-6">
// //                 <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
// //                 <span
// //                   className="text-[#D4AF37] text-[10px] sm:text-xs tracking-[6px] uppercase"
// //                   style={{ fontFamily: "'Cinzel', serif" }}
// //                 >
// //                   Testimonials
// //                 </span>
// //                 <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
// //               </div>

// //               <h2
// //                 className="text-4xl sm:text-5xl md:text-6xl font-normal"
// //                 style={{ fontFamily: "'Italiana', serif" }}
// //               >
// //                 Words from our <span className="italictext-[var(--theme-primary)]">Patrons</span>
// //               </h2>
// //             </FadeIn>

// //             {/* Single Review Display with Rotation */}
// //             <div className="max-w-4xl mx-auto">
// //               <AnimatePresence mode="wait">
// //                 <motion.div
// //                   key={activeReview}
// //                   initial={{ opacity: 0, y: 30 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -30 }}
// //                   transition={{ duration: 0.6 }}
// //                   className="text-center"
// //                 >
// //                   {/* Stars */}
// //                   <div className="flex justify-center gap-1 mb-8">
// //                     {[...Array(reviews[activeReview]?.rating || 5)].map((_, i) => (
// //                       <Star key={i} className="w-5 h-5 fill-[#D4AF37]text-[var(--theme-primary)]" />
// //                     ))}
// //                   </div>

// //                   {/* Quote */}
// //                   <p
// //                     className="text-2xl sm:text-3xl md:text-4xl text-[#F0F5F0] leading-relaxed italic font-light mb-10"
// //                     style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //                   >
// //                     &ldquo;{reviews[activeReview]?.text}&rdquo;
// //                   </p>

// //                   {/* Divider */}
// //                   <div className="flex items-center justify-center gap-3 mb-6">
// //                     <div className="h-px w-12bg-[var(--theme-primary)]/40" />
// //                     <span className="text-[#D4AF37]">✦</span>
// //                     <div className="h-px w-12bg-[var(--theme-primary)]/40" />
// //                   </div>

// //                   {/* Author */}
// //                   <h4
// //                     className="text-2xltext-[var(--theme-primary)] mb-1"
// //                     style={{ fontFamily: "'Italiana', serif" }}
// //                   >
// //                     {reviews[activeReview]?.name}
// //                   </h4>
// //                   {reviews[activeReview]?.role && (
// //                     <p
// //                       className="text-xs tracking-[4px] uppercase text-[#F0F5F0]/40"
// //                       style={{ fontFamily: "'Cinzel', serif" }}
// //                     >
// //                       {reviews[activeReview]?.role}
// //                     </p>
// //                   )}
// //                 </motion.div>
// //               </AnimatePresence>

// //               {/* Dots */}
// //               <div className="flex justify-center gap-2 mt-12">
// //                 {reviews.map((_, i) => (
// //                   <button
// //                     key={i}
// //                     onClick={() => setActiveReview(i)}
// //                     className={`h-px transition-all duration-500 ${
// //                       activeReview === i
// //                         ? "w-12bg-[var(--theme-primary)]"
// //                         : "w-6bg-[var(--theme-primary)]/30 hover:bg-[#D4AF37]/60"
// //                     }`}
// //                   />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       )}

// //       {/* ════════════════════════════════════════ */}
// //       {/* 7. CTA - RESERVE NOW                      */}
// //       {/* ════════════════════════════════════════ */}
// //       <section className="py-20 sm:py-24 md:py-32 bg-[#162929] border-y border-[var(--theme-primary)]/20 relative overflow-hidden">
// //         {/* Background glow */}
// //         <div className="absolute inset-0 opacity-20" style={{
// //           background: "radial-gradient(circle at center, #D4AF37 0%, transparent 70%)"
// //         }} />

// //         <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
// //           <FadeIn>
// //             <div className="flex items-center justify-center gap-4 mb-8">
// //               <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--theme-primary)]" />
// //               <motion.span
// //                 animate={{ rotate: 360 }}
// //                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
// //                 className="text-[#D4AF37] text-3xl"
// //               >
// //                 ✦
// //               </motion.span>
// //               <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--theme-primary)]" />
// //             </div>

// //             <h2
// //               className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6 leading-tight"
// //               style={{ fontFamily: "'Italiana', serif" }}
// //             >
// //               Begin Your <span className="italictext-[var(--theme-primary)]">Journey</span>
// //             </h2>

// //             <p
// //               className="text-xl text-[#F0F5F0]/60 italic font-light mb-12"
// //               style={{ fontFamily: "'Cormorant Garamond', serif" }}
// //             >
// //               Reserve a consultation with our master baker
// //             </p>

// //             <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
// //               {phone && (
// //                 <motion.a
// //                   href={`tel:${phone}`}
// //                   whileHover={{ scale: 1.05 }}
// //                   className="bg-gradient-to-br from-[var(--theme-primary)] to-[#B89030] text-[#0F1F1F] px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-bold no-underline flex items-center gap-3"
// //                   style={{ fontFamily: "'Cinzel', serif" }}
// //                 >
// //                   <Phone className="w-4 h-4" />
// //                   Call to Reserve
// //                 </motion.a>
// //               )}
// //               <motion.button
// //                 onClick={() => setPage?.("contact")}
// //                 whileHover={{ scale: 1.05 }}
// //                 className="border border-[var(--theme-primary)]text-[var(--theme-primary)] hover:bg-[#D4AF37] hover:text-[#0F1F1F] transition-colors px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-medium"
// //                 style={{ fontFamily: "'Cinzel', serif" }}
// //               >
// //                 Get In Touch
// //               </motion.button>
// //             </div>
// //           </FadeIn>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }




// "use client";

// import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
// import { useRef, useState, useEffect } from "react";
// import { Phone, MessageCircle, Award, ChefHat, Truck, Sparkles, Star, ArrowRight } from "lucide-react";
// import { Client } from "@/lib/supabase";
// import { CakeTheme } from "./themes";

// const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%231E3333'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

// // Fallback poster image
// const DEFAULT_POSTER = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80";

// // ════════════════════════════════════════
// // ANIMATION COMPONENTS
// // ════════════════════════════════════════
// const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: any) => {
//   const d: any = { up: { y: 60 }, down: { y: -60 }, left: { x: 60 }, right: { x: -60 } };
//   return (
//     <motion.div
//       initial={{ opacity: 0, ...d[direction] }}
//       whileInView={{ opacity: 1, x: 0, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// function AnimatedCounter({ value, color }: { value: string; color: string }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const numericPart = value.replace(/[^0-9.]/g, "");
//   const nonNumeric = value.replace(/[0-9.]/g, "");
//   const num = parseFloat(numericPart) || 0;
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!isInView || !num) return;
//     let start = 0;
//     const duration = 2500;
//     const step = (timestamp: number) => {
//       if (!start) start = timestamp;
//       const progress = Math.min((timestamp - start) / duration, 1);
//       setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * num));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [isInView, num]);

//   return <span ref={ref} style={{ color }}>{count}{nonNumeric}</span>;
// }

// function SplitText({ text, className = "", delay = 0, style = {} }: { text: string; className?: string; delay?: number; style?: any }) {
//   const letters = text.split("");
//   return (
//     <span className={className} style={style}>
//       {letters.map((letter, i) => (
//         <motion.span
//           key={i}
//           initial={{ opacity: 0, y: 50, rotateX: -90 }}
//           animate={{ opacity: 1, y: 0, rotateX: 0 }}
//           transition={{ delay: delay + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           style={{ display: "inline-block" }}
//         >
//           {letter === " " ? "\u00A0" : letter}
//         </motion.span>
//       ))}
//     </span>
//   );
// }

// // ════════════════════════════════════════
// // MAIN HOMEPAGE COMPONENT
// // ════════════════════════════════════════
// interface HomePageProps {
//   client: Client;
//   setPage?: (p: string) => void;
//   theme?: CakeTheme;
// }

// export default function HomePage({ client, setPage, theme }: HomePageProps) {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const [activeReview, setActiveReview] = useState(0);
  
//   const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   // Theme colors with fallback
//   const colors = theme?.colors || {
//     bg: "#0F1F1F",
//     bgSecondary: "#162929",
//     bgCard: "#1E3333",
//     primary: "#D4AF37",
//     accent: "#B89030",
//     text: "#F0F5F0",
//     textLight: "rgba(240, 245, 240, 0.6)",
//     border: "rgba(212, 175, 55, 0.2)",
//     shadow: "rgba(212, 175, 55, 0.15)",
//   };

//   // ════════════════════════════════════════
//   // DYNAMIC DATA FROM CLIENT
//   // ════════════════════════════════════════
  
//   // Hero Video - from admin OR local fallback
//   const HERO_VIDEO_PRIMARY = client.hero_video_url || "/videos/cake-hero.mp4";
//   const HERO_VIDEO_FALLBACK = "/videos/hero-video.mp4";
//   const HERO_POSTER = client.hero_image || client.hero_image_url || DEFAULT_POSTER;

//   const restaurantName = client.business_name || "Sweet Bites";
//   const tagline = client.tagline || "Atelier de Pâtisserie";
//   const phone = client.phone || "";
//   const whatsapp = client.whatsapp || "";
//   const yearEstablished = client.year_established || client.established_year || "2010";

//   const featured = client.products?.slice(0, 3) || [
//     { name: "Belgian Truffle", price: "₹1,250", description: "Premium Belgian chocolate", image_url: PLACEHOLDER },
//     { name: "Velvet Royale", price: "₹1,450", description: "Classic red velvet", image_url: PLACEHOLDER },
//     { name: "Saffron Pistachio", price: "₹1,650", description: "Kashmiri saffron infused", image_url: PLACEHOLDER },
//   ];

//   const stats = [
//     { number: client.stat_1_number || "10K", label: client.stat_1_label || "Patrons" },
//     { number: client.stat_2_number || "500", label: client.stat_2_label || "Bespoke" },
//     { number: client.stat_3_number || "50", label: client.stat_3_label || "Flavors" },
//     { number: client.stat_4_number || "4.9", label: client.stat_4_label || "Rating" },
//   ];

//   const reviews = client.reviews || [];

//   useEffect(() => {
//     if (reviews.length <= 1) return;
//     const timer = setInterval(() => {
//       setActiveReview((prev) => (prev + 1) % reviews.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [reviews.length]);

//   const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : "#";

//   // Gold gradient for headings
//   const goldGradient = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 50%, ${colors.primary} 100%)`;
//   const goldGradientText = {
//     background: goldGradient,
//     WebkitBackgroundClip: 'text' as const,
//     WebkitTextFillColor: 'transparent' as const,
//     backgroundClip: 'text' as const,
//   };

//   return (
//     <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>

//       {/* ════════════════════════════════════════ */}
//       {/* 1. HERO - VIDEO BACKGROUND                */}
//       {/* ════════════════════════════════════════ */}
//       <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
//         <motion.div style={{ y: heroY }} className="absolute inset-0">
//           {/* Poster image (background fallback) */}
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url(${HERO_POSTER})`,
//               filter: "brightness(0.35)",
//             }}
//           />
          
//           {/* Video */}
//           <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             key={HERO_VIDEO_PRIMARY}
//             className="absolute inset-0 w-full h-full object-cover"
//             style={{ filter: "brightness(0.35)" }}
//           >
//             <source src={HERO_VIDEO_PRIMARY} type="video/mp4" />
//             <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
//             Your browser does not support video.
//           </video>

//           {/* Dark gradient overlays */}
//           <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${colors.bg}99, ${colors.bg}4D, ${colors.bg})` }} />
//           <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.bg}66, transparent, ${colors.bg}66)` }} />
//         </motion.div>

//         {/* Floating sparkles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 y: [0, -30, 0],
//                 opacity: [0, 0.8, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//             >
//               <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: colors.primary }} />
//             </motion.div>
//           ))}
//         </div>

//         {/* Decorative side lines */}
//         <div 
//           className="hidden md:block absolute top-1/2 left-[5%] w-px h-32 -translate-y-1/2"
//           style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}80, transparent)` }}
//         />
//         <div 
//           className="hidden md:block absolute top-1/2 right-[5%] w-px h-32 -translate-y-1/2"
//           style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}80, transparent)` }}
//         />

//         {/* CONTENT */}
//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="relative z-10 text-center px-6 max-w-5xl"
//         >
//           {/* Top Ornament */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.2, delay: 0.3 }}
//             className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
//           >
//             <div className="h-px w-16 sm:w-24 md:w-32" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
//             <motion.span
//               animate={{ rotate: 360 }}
//               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//               className="text-2xl sm:text-3xl md:text-4xl"
//               style={{ color: colors.primary }}
//             >
//               ✦
//             </motion.span>
//             <div className="h-px w-16 sm:w-24 md:w-32" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
//           </motion.div>

//           {/* Established */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="mb-6"
//           >
//             <span
//               className="text-[10px] sm:text-xs tracking-[6px] sm:tracking-[8px] uppercase font-medium"
//               style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//             >
//               Established · {yearEstablished}
//             </span>
//           </motion.div>

//           {/* Brand Name with letter animation */}
//           <h1
//             className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-6 sm:mb-8"
//             style={{ fontFamily: "'Italiana', serif", letterSpacing: '-2px' }}
//           >
//             <SplitText 
//               text={restaurantName.split(' ')[0] || ''} 
//               delay={0.8}
//               className="block"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.text} 0%, ${colors.primary} 50%, ${colors.text} 100%)`,
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             />
//             {restaurantName.split(' ')[1] && (
//               <SplitText 
//                 text={restaurantName.split(' ')[1] || ''} 
//                 delay={1.3}
//                 className="block italic"
//                 style={{ color: colors.primary }}
//               />
//             )}
//           </h1>

//           {/* Tagline */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2, duration: 1 }}
//             className="text-base sm:text-lg md:text-xl tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-light mb-12 sm:mb-14"
//             style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.text, opacity: 0.8 }}
//           >
//             {tagline}
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.3, duration: 1 }}
//             className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center"
//           >
//             {whatsapp && (
//               <motion.a
//                 href={whatsappUrl}
//                 target="_blank"
//                 whileHover={{ scale: 1.05, y: -3 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="group relative overflow-hidden px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-bold no-underline"
//                 style={{ 
//                   fontFamily: "'Cinzel', serif",
//                   background: goldGradient,
//                   color: colors.bg,
//                 }}
//               >
//                 <motion.div
//                   animate={{ x: ["-100%", "200%"] }}
//                   transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
//                   className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
//                 />
//                 <span className="relative z-10">Reserve Now</span>
//               </motion.a>
//             )}
//             <motion.button
//               onClick={() => setPage?.("collection")}
//               whileHover={{ scale: 1.05, y: -3 }}
//               whileTap={{ scale: 0.97 }}
//               className="transition-colors px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-medium border"
//               style={{ 
//                 fontFamily: "'Cinzel', serif",
//                 borderColor: colors.primary,
//                 color: colors.primary,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = colors.primary;
//                 e.currentTarget.style.color = colors.bg;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = colors.primary;
//               }}
//             >
//               View Collection
//             </motion.button>
//           </motion.div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 12, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
//         >
//           <span
//             className="text-[10px] tracking-[4px] uppercase"
//             style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//           >
//             Discover
//           </span>
//           <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }} />
//         </motion.div>
//       </section>

//       {/* ════════════════════════════════════════ */}
//       {/* 2. STATS BAR                              */}
//       {/* ════════════════════════════════════════ */}
//       <section 
//         className="py-12 sm:py-16 border-y relative overflow-hidden"
//         style={{ 
//           background: `linear-gradient(to right, ${colors.bg}, ${colors.bgSecondary}, ${colors.bg})`,
//           borderColor: colors.border,
//         }}
//       >
//         <div className="absolute inset-0 opacity-5" style={{
//           backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
//           backgroundSize: "30px 30px",
//         }} />

//         <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
//           {stats.map((stat, i) => (
//             <FadeIn key={i} delay={i * 0.1}>
//               <div className="text-center group cursor-default">
//                 <div
//                   className="text-4xl sm:text-5xl md:text-6xl mb-2 group-hover:scale-110 transition-transform"
//                   style={{ fontFamily: "'Italiana', serif" }}
//                 >
//                   <AnimatedCounter value={stat.number} color={colors.primary} />
//                   {!stat.number.includes('★') && !stat.number.includes('K') && !stat.number.includes('+') && !stat.number.includes('.') && (
//                     <span style={{ color: colors.primary }}>+</span>
//                   )}
//                 </div>
//                 <div
//                   className="text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase"
//                   style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//                 >
//                   {stat.label}
//                 </div>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </section>

//       {/* ════════════════════════════════════════ */}
//       {/* 3. SIGNATURE COLLECTION                   */}
//       {/* ════════════════════════════════════════ */}
//       <section className="py-20 sm:py-24 md:py-32" style={{ background: colors.bg }}>
//         <div className="container mx-auto px-4 sm:px-6">
//           <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
//               <span
//                 className="text-[10px] sm:text-xs tracking-[6px] uppercase"
//                 style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//               >
//                 Signature Collection
//               </span>
//               <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
//             </div>

//             <h2
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6"
//               style={{ fontFamily: "'Italiana', serif" }}
//             >
//               <span style={{ color: colors.text }}>Crafted</span>
//               {' '}
//               <span className="italic" style={goldGradientText}>
//                 Masterpieces
//               </span>
//             </h2>

//             <p
//               className="text-base sm:text-lg italic font-light"
//               style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
//             >
//               Each creation is a work of art, handcrafted with the finest ingredients
//             </p>
//           </FadeIn>

//           {/* Cake Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
//             {featured.map((cake: any, i: number) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 60, rotateY: -15 }}
//                 whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -15 }}
//                 className="group cursor-pointer"
//               >
//                 <div 
//                   className="relative overflow-hidden transition-all duration-500 border"
//                   style={{ 
//                     background: colors.bgCard,
//                     borderColor: colors.border,
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = colors.primary;
//                     e.currentTarget.style.boxShadow = `0 25px 50px ${colors.shadow}`;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = colors.border;
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}
//                 >
//                   <div className="relative h-80 sm:h-96 overflow-hidden">
//                     <img
//                       src={cake.image_url || cake.image || PLACEHOLDER}
//                       alt={cake.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div 
//                       className="absolute inset-0" 
//                       style={{ background: `linear-gradient(to top, ${colors.bg}, transparent 50%)` }}
//                     />
                    
//                     <div className="absolute top-4 left-4">
//                       <span
//                         className="text-3xl sm:text-4xl group-hover:opacity-100 transition-opacity"
//                         style={{ 
//                           fontFamily: "'Italiana', serif",
//                           color: colors.primary,
//                           opacity: 0.4,
//                         }}
//                       >
//                         0{i + 1}
//                       </span>
//                     </div>

//                     {cake.price && (
//                       <div 
//                         className="absolute top-4 right-4 backdrop-blur-sm border px-4 py-2"
//                         style={{ 
//                           background: `${colors.bg}E6`,
//                           borderColor: colors.primary,
//                         }}
//                       >
//                         <span
//                           className="text-lg sm:text-xl"
//                           style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//                         >
//                           {cake.price}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-6 sm:p-8">
//                     <h3
//                       className="text-2xl sm:text-3xl mb-3 transition-colors"
//                       style={{ fontFamily: "'Italiana', serif", color: colors.text }}
//                     >
//                       {cake.name}
//                     </h3>

//                     <div className="h-px w-12 mb-4" style={{ background: colors.primary }} />

//                     {cake.description && (
//                       <p
//                         className="text-sm sm:text-base italic font-light leading-relaxed"
//                         style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
//                       >
//                         {cake.description}
//                       </p>
//                     )}

//                     <motion.button
//                       className="mt-6 flex items-center gap-2 text-[11px] tracking-[3px] uppercase font-medium group/btn"
//                       style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                       whileHover={{ x: 5 }}
//                     >
//                       <span>Order</span>
//                       <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//                     </motion.button>
//                   </div>

//                   {/* Corner accents */}
//                   <div 
//                     className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                     style={{ borderColor: colors.primary }}
//                   />
//                   <div 
//                     className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                     style={{ borderColor: colors.primary }}
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <FadeIn delay={0.5} className="text-center mt-12 sm:mt-16">
//             <motion.button
//               onClick={() => setPage?.("collection")}
//               whileHover={{ scale: 1.05 }}
//               className="inline-flex items-center gap-3 transition-colors px-10 py-4 text-[11px] tracking-[4px] uppercase font-medium border"
//               style={{ 
//                 fontFamily: "'Cinzel', serif",
//                 borderColor: colors.primary,
//                 color: colors.primary,
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = colors.primary;
//                 e.currentTarget.style.color = colors.bg;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent';
//                 e.currentTarget.style.color = colors.primary;
//               }}
//             >
//               View Full Collection <ArrowRight className="w-4 h-4" />
//             </motion.button>
//           </FadeIn>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════ */}
//       {/* 4. PROCESS                                */}
//       {/* ════════════════════════════════════════ */}
//       <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden" style={{ background: colors.bgSecondary }}>
//         <div className="absolute inset-0 opacity-5" style={{
//           backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
//           backgroundSize: "40px 40px",
//         }} />

//         <div className="container mx-auto px-4 sm:px-6 relative z-10">
//           <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
//               <span
//                 className="text-[10px] sm:text-xs tracking-[6px] uppercase"
//                 style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//               >
//                 The Process
//               </span>
//               <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
//             </div>

//             <h2
//               className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6"
//               style={{ fontFamily: "'Italiana', serif" }}
//             >
//               <span style={{ color: colors.text }}>From Vision to</span>
//               {' '}
//               <span className="italic" style={goldGradientText}>
//                 Reality
//               </span>
//             </h2>
//           </FadeIn>

//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
//               <div 
//                 className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
//                 style={{ background: `linear-gradient(to right, transparent, ${colors.primary}4D, transparent)` }}
//               />

//               {[
//                 { num: "01", icon: ChefHat, title: "Consult", desc: "Share your vision with our master baker" },
//                 { num: "02", icon: Sparkles, title: "Design", desc: "We craft a bespoke design for your cake" },
//                 { num: "03", icon: Award, title: "Bake", desc: "Handcrafted with premium ingredients" },
//                 { num: "04", icon: Truck, title: "Deliver", desc: "Fresh delivery to your celebration" },
//               ].map((step, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.15, duration: 0.8 }}
//                   className="relative text-center group"
//                 >
//                   <div className="relative mb-6 inline-block">
//                     <motion.div
//                       className="w-24 h-24 mx-auto rounded-full border-2 flex items-center justify-center relative z-10 transition-colors duration-500"
//                       style={{ 
//                         borderColor: colors.primary,
//                         background: colors.bg,
//                       }}
//                       whileHover={{ 
//                         scale: 1.1, 
//                         rotate: 360,
//                       }}
//                       transition={{ duration: 0.6 }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = colors.primary;
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = colors.bg;
//                       }}
//                     >
//                       <step.icon 
//                         className="w-10 h-10 transition-colors group-hover:!text-current"
//                         style={{ color: colors.primary }}
//                       />
//                     </motion.div>
//                     <span
//                       className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-20"
//                       style={{ 
//                         fontFamily: "'Cinzel', serif",
//                         background: colors.primary,
//                         color: colors.bg,
//                       }}
//                     >
//                       {step.num}
//                     </span>
//                   </div>

//                   <h3
//                     className="text-2xl sm:text-3xl mb-3 transition-colors"
//                     style={{ fontFamily: "'Italiana', serif", color: colors.text }}
//                   >
//                     {step.title}
//                   </h3>

//                   <p
//                     className="text-sm italic"
//                     style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: colors.textLight }}
//                   >
//                     {step.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════ */}
//       {/* 5. ABOUT PREVIEW                          */}
//       {/* ════════════════════════════════════════ */}
//       <section className="py-20 sm:py-24 md:py-32" style={{ background: colors.bg }}>
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            
//             <FadeIn direction="left">
//               <div className="relative">
//                 <div 
//                   className="absolute -top-6 -left-6 right-12 bottom-12 border z-0"
//                   style={{ borderColor: colors.primary }}
//                 />
                
//                 <div className="relative z-10 aspect-[4/5] overflow-hidden">
//                   <img
//                     src={client.about_image || client.hero_image_url || PLACEHOLDER}
//                     alt="Heritage"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <motion.div
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="absolute -bottom-8 -right-8 border p-6 sm:p-8 text-center z-20"
//                   style={{ 
//                     background: colors.bg,
//                     borderColor: colors.primary,
//                   }}
//                 >
//                   <div
//                     className="text-4xl sm:text-5xl leading-none"
//                     style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//                   >
//                     {yearEstablished}
//                   </div>
//                   <div
//                     className="text-[10px] tracking-[3px] uppercase mt-2"
//                     style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//                   >
//                     Est.
//                   </div>
//                 </motion.div>
//               </div>
//             </FadeIn>

//             <FadeIn direction="right">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="h-px w-12" style={{ background: colors.primary }} />
//                 <span
//                   className="text-[10px] sm:text-xs tracking-[6px] uppercase"
//                   style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                 >
//                   Our Heritage
//                 </span>
//               </div>

//               <h2
//                 className="text-4xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight"
//                 style={{ fontFamily: "'Italiana', serif" }}
//               >
//                 <span style={{ color: colors.text }}>A Legacy of</span>
//                 {' '}
//                 <span className="italic" style={goldGradientText}>
//                   Excellence
//                 </span>
//               </h2>

//               <p
//                 className="text-lg sm:text-xl leading-relaxed mb-6 italic font-light"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.text, opacity: 0.7 }}
//               >
//                 {client.about_short || client.about || `Since ${yearEstablished}, ${restaurantName} has been crafting extraordinary cakes that transform celebrations into cherished memories.`}
//               </p>

//               <p
//                 className="text-base leading-relaxed mb-10 italic font-light"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
//               >
//                 Each creation is a testament to our unwavering commitment to quality, artistry, and the timeless tradition of fine baking.
//               </p>

//               <motion.button
//                 onClick={() => setPage?.("heritage")}
//                 whileHover={{ x: 10 }}
//                 className="inline-flex items-center gap-3 text-[11px] tracking-[4px] uppercase font-medium group"
//                 style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//               >
//                 Discover Our Story
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
//               </motion.button>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* ════════════════════════════════════════ */}
//       {/* 6. TESTIMONIALS                           */}
//       {/* ════════════════════════════════════════ */}
//       {reviews.length > 0 && (
//         <section 
//           className="py-20 sm:py-24 md:py-32 relative overflow-hidden"
//           style={{ background: `linear-gradient(to bottom, ${colors.bg}, ${colors.bgSecondary}, ${colors.bg})` }}
//         >
//           <div 
//             className="absolute top-10 left-10 text-[200px] leading-none"
//             style={{ fontFamily: "'Italiana', serif", color: `${colors.primary}0D` }}
//           >"</div>
//           <div 
//             className="absolute bottom-10 right-10 text-[200px] leading-none"
//             style={{ fontFamily: "'Italiana', serif", color: `${colors.primary}0D` }}
//           >"</div>

//           <div className="container mx-auto px-4 sm:px-6 relative z-10">
//             <FadeIn className="text-center max-w-3xl mx-auto mb-16">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
//                 <span
//                   className="text-[10px] sm:text-xs tracking-[6px] uppercase"
//                   style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                 >
//                   Testimonials
//                 </span>
//                 <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
//               </div>

//               <h2
//                 className="text-4xl sm:text-5xl md:text-6xl font-normal"
//                 style={{ fontFamily: "'Italiana', serif" }}
//               >
//                 <span style={{ color: colors.text }}>Words from our</span>
//                 {' '}
//                 <span className="italic" style={goldGradientText}>
//                   Patrons
//                 </span>
//               </h2>
//             </FadeIn>

//             <div className="max-w-4xl mx-auto">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeReview}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -30 }}
//                   transition={{ duration: 0.6 }}
//                   className="text-center"
//                 >
//                   <div className="flex justify-center gap-1 mb-8">
//                     {[...Array(reviews[activeReview]?.rating || 5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className="w-5 h-5" 
//                         style={{ color: colors.primary, fill: colors.primary }}
//                       />
//                     ))}
//                   </div>

//                   <p
//                     className="text-2xl sm:text-3xl md:text-4xl leading-relaxed italic font-light mb-10"
//                     style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.text }}
//                   >
//                     &ldquo;{reviews[activeReview]?.text}&rdquo;
//                   </p>

//                   <div className="flex items-center justify-center gap-3 mb-6">
//                     <div className="h-px w-12" style={{ background: `${colors.primary}66` }} />
//                     <span style={{ color: colors.primary }}>✦</span>
//                     <div className="h-px w-12" style={{ background: `${colors.primary}66` }} />
//                   </div>

//                   <h4
//                     className="text-2xl mb-1"
//                     style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//                   >
//                     {reviews[activeReview]?.name}
//                   </h4>
//                   {reviews[activeReview]?.role && (
//                     <p
//                       className="text-xs tracking-[4px] uppercase"
//                       style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//                     >
//                       {reviews[activeReview]?.role}
//                     </p>
//                   )}
//                 </motion.div>
//               </AnimatePresence>

//               <div className="flex justify-center gap-2 mt-12">
//                 {reviews.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveReview(i)}
//                     className="h-px transition-all duration-500"
//                     style={{
//                       width: activeReview === i ? '48px' : '24px',
//                       background: activeReview === i ? colors.primary : `${colors.primary}4D`,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ════════════════════════════════════════ */}
//       {/* 7. CTA                                    */}
//       {/* ════════════════════════════════════════ */}
//       <section 
//         className="py-20 sm:py-24 md:py-32 border-y relative overflow-hidden"
//         style={{ 
//           background: colors.bgSecondary,
//           borderColor: colors.border,
//         }}
//       >
//         <div className="absolute inset-0 opacity-20" style={{
//           background: `radial-gradient(circle at center, ${colors.primary} 0%, transparent 70%)`
//         }} />

//         <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
//           <FadeIn>
//             <div className="flex items-center justify-center gap-4 mb-8">
//               <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
//               <motion.span
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                 className="text-3xl"
//                 style={{ color: colors.primary }}
//               >
//                 ✦
//               </motion.span>
//               <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
//             </div>

//             <h2
//               className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6 leading-tight"
//               style={{ fontFamily: "'Italiana', serif" }}
//             >
//               <span style={{ color: colors.text }}>Begin Your</span>
//               {' '}
//               <span className="italic" style={goldGradientText}>
//                 Journey
//               </span>
//             </h2>

//             <p
//               className="text-xl italic font-light mb-12"
//               style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
//             >
//               Reserve a consultation with our master baker
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
//               {phone && (
//                 <motion.a
//                   href={`tel:${phone}`}
//                   whileHover={{ scale: 1.05 }}
//                   className="px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-bold no-underline flex items-center gap-3"
//                   style={{ 
//                     fontFamily: "'Cinzel', serif",
//                     background: goldGradient,
//                     color: colors.bg,
//                   }}
//                 >
//                   <Phone className="w-4 h-4" />
//                   Call to Reserve
//                 </motion.a>
//               )}
//               <motion.button
//                 onClick={() => setPage?.("contact")}
//                 whileHover={{ scale: 1.05 }}
//                 className="transition-colors px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-medium border"
//                 style={{ 
//                   fontFamily: "'Cinzel', serif",
//                   borderColor: colors.primary,
//                   color: colors.primary,
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = colors.primary;
//                   e.currentTarget.style.color = colors.bg;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent';
//                   e.currentTarget.style.color = colors.primary;
//                 }}
//               >
//                 Get In Touch
//               </motion.button>
//             </div>
//           </FadeIn>
//         </div>
//       </section>
//     </div>
//   );
// }




"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, MessageCircle, Award, ChefHat, Truck, Sparkles, Star, ArrowRight } from "lucide-react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%231E3333'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

// Fallback videos (used if no custom video from admin)
const HERO_VIDEO_1 = "/videos/cake-hero.mp4";
const HERO_VIDEO_2 = "/videos/hero-video.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80";

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: any) => {
  const d: any = { up: { y: 60 }, down: { y: -60 }, left: { x: 60 }, right: { x: -60 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const nonNumeric = value.replace(/[0-9.]/g, "");
  const num = parseFloat(numericPart) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !num) return;
    let start = 0;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, num]);

  return <span ref={ref}>{count}{nonNumeric}</span>;
}

function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = text.split("");
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default function HomePage({ client, setPage, theme }: { client: Client; setPage?: (p: string) => void; theme?: any }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Get theme colors with fallback
  const colors = theme?.colors || {
    bg: "#0F1F1F",
    bgSecondary: "#162929",
    bgCard: "#1E3333",
    primary: "#D4AF37",
    accent: "#B89030",
    text: "#F0F5F0",
    textLight: "rgba(240, 245, 240, 0.6)",
    border: "rgba(212, 175, 55, 0.2)",
  };

  // ═══════════════════════════════════════════════════════
  // DYNAMIC DATA FROM CLIENT (Admin se aayega)
  // ═══════════════════════════════════════════════════════
  const heroImage = client.hero_image || client.hero_image_url || PLACEHOLDER;
  const featuredImage1 = client.featured_image_1 || client.hero_image_url || PLACEHOLDER;
  const featuredImage2 = client.featured_image_2 || client.products?.[0]?.image_url || PLACEHOLDER;
  const featuredImage3 = client.featured_image_3 || client.products?.[1]?.image_url || PLACEHOLDER;

  const restaurantName = client.business_name || "Sweet Bites";
  const tagline = client.tagline || client.about || "Atelier de Pâtisserie";
  const phone = client.phone || "";
  const whatsapp = client.whatsapp || "";
  const yearEstablished = client.year_established || client.established_year || "2010";

  const featured = client.products?.slice(0, 3) || [
    { name: "Belgian Truffle", price: "₹1,250", description: "Premium Belgian chocolate", image_url: PLACEHOLDER },
    { name: "Velvet Royale", price: "₹1,450", description: "Classic red velvet", image_url: PLACEHOLDER },
    { name: "Saffron Pistachio", price: "₹1,650", description: "Kashmiri saffron infused", image_url: PLACEHOLDER },
  ];

  const stats = [
    { number: client.stat_1_number || "10K", label: client.stat_1_label || "Patrons" },
    { number: client.stat_2_number || "500", label: client.stat_2_label || "Bespoke" },
    { number: client.stat_3_number || "50", label: client.stat_3_label || "Flavors" },
    { number: client.stat_4_number || "4.9", label: client.stat_4_label || "Rating" },
  ];

  const reviews = client.reviews || [];

  // Auto-rotate reviews
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : "#";

  return (
    <div className="overflow-x-hidden" style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif" }}>

      {/* ════════════════════════════════════════ */}
      {/* 1. HERO - VIDEO BACKGROUND (DYNAMIC!)   */}
      {/* ════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {/* Poster image - loads first as fallback */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_POSTER})`,
              filter: "brightness(0.35)",
            }}
          />
          
          {/* ═══════════════════════════════════════ */}
          {/* VIDEO - DYNAMIC FROM CLIENT (FIXED!)   */}
          {/* ═══════════════════════════════════════ */}
          <video
            key={client.hero_video_url || 'default-video'} // Force reload when URL changes
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            onLoadedData={() => console.log("✅ Video loaded:", client.hero_video_url || HERO_VIDEO_1)}
            onError={(e) => console.error("❌ Video error:", e)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.35)" }}
          >
            {/* Priority 1: Client's video from admin (Pexels URL ya uploaded) */}
            {client.hero_video_url && (
              <source src={client.hero_video_url} type="video/mp4" />
            )}
            
            {/* Priority 2: Local fallback videos */}
            <source src={HERO_VIDEO_1} type="video/mp4" />
            <source src={HERO_VIDEO_2} type="video/mp4" />
            
            Your browser does not support video.
          </video>

          {/* Dark gradient overlays */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom, ${colors.bg}99 0%, ${colors.bg}4D 50%, ${colors.bg} 100%)`
          }} />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to right, ${colors.bg}66 0%, transparent 50%, ${colors.bg}66 100%)`
          }} />
        </motion.div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: colors.primary }} />
            </motion.div>
          ))}
        </div>

        {/* Decorative lines */}
        <div className="hidden md:block absolute top-1/2 left-[5%] w-px h-32 -translate-y-1/2" 
             style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}80, transparent)` }} />
        <div className="hidden md:block absolute top-1/2 right-[5%] w-px h-32 -translate-y-1/2" 
             style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}80, transparent)` }} />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
          >
            <div className="h-px w-16 sm:w-24 md:w-32" 
                 style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ color: colors.primary }}
            >
              ✦
            </motion.span>
            <div className="h-px w-16 sm:w-24 md:w-32" 
                 style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-6"
          >
            <span
              className="text-[10px] sm:text-xs tracking-[6px] sm:tracking-[8px] uppercase font-medium"
              style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
            >
              Established · {yearEstablished}
            </span>
          </motion.div>

          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-6 sm:mb-8"
            style={{ 
              fontFamily: "'Italiana', serif", 
              letterSpacing: '-2px', 
              color: '#FFFFFF' 
            }}
          >
            <span 
              className="block"
              style={{
                background: `linear-gradient(135deg, #FFFFFF 0%, ${colors.primary} 50%, #FFFFFF 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <SplitText text={restaurantName.split(' ')[0] || ''} delay={0.8} />
            </span>
            {restaurantName.split(' ')[1] && (
              <span className="block italic" style={{ color: colors.primary }}>
                <SplitText text={restaurantName.split(' ')[1] || ''} delay={1.3} />
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-base sm:text-lg md:text-xl tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-light mb-12 sm:mb-14"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              color: 'rgba(240, 245, 240, 0.8)' 
            }}
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center"
          >
            {whatsapp && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-bold no-underline"
                style={{ 
                  fontFamily: "'Cinzel', serif",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: colors.bg
                }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
                <span className="relative z-10">Reserve Now</span>
              </motion.a>
            )}
            <motion.button
              onClick={() => setPage?.("collection")}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="border transition-colors px-10 sm:px-12 py-4 sm:py-5 text-[11px] sm:text-xs tracking-[4px] uppercase font-medium"
              style={{ 
                fontFamily: "'Cinzel', serif",
                borderColor: colors.primary,
                color: colors.primary,
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.color = colors.bg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.primary;
              }}
            >
              View Collection
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
        >
          <span
            className="text-[10px] tracking-[4px] uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
          >
            Discover
          </span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }} />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* 2. STATS BAR                              */}
      {/* ════════════════════════════════════════ */}
      <section 
        className="py-12 sm:py-16 border-y relative overflow-hidden"
        style={{ 
          background: `linear-gradient(to right, ${colors.bg}, ${colors.bgSecondary}, ${colors.bg})`,
          borderColor: colors.border
        }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }} />

        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center group cursor-default">
                <div
                  className="text-4xl sm:text-5xl md:text-6xl mb-2 group-hover:scale-110 transition-transform"
                  style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                >
                  <AnimatedCounter value={stat.number} />
                  {!stat.number.includes('★') && !stat.number.includes('K') && !stat.number.includes('+') && !stat.number.includes('.') && '+'}
                </div>
                <div
                  className="text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
                >
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* 3. SIGNATURE COLLECTION                   */}
      {/* ════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 md:py-32" style={{ background: colors.bg }}>
        <div className="container mx-auto px-4 sm:px-6">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
              <span
                className="text-[10px] sm:text-xs tracking-[6px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                Signature Collection
              </span>
              <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>Crafted</span>
              {' '}
              <span 
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Masterpieces
              </span>
            </h2>

            <p
              className="text-base sm:text-lg italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.6)' }}
            >
              Each creation is a work of art, handcrafted with the finest ingredients
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {featured.map((cake: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -15 }}
                className="group cursor-pointer"
              >
                <div 
                  className="relative overflow-hidden transition-all duration-500"
                  style={{ 
                    background: colors.bgCard,
                    border: `1px solid ${colors.border}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 20px 40px ${colors.primary}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="relative h-80 sm:h-96 overflow-hidden">
                    <img
                      src={cake.image_url || cake.image || PLACEHOLDER}
                      alt={cake.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{
                      background: `linear-gradient(to top, ${colors.bg}, transparent, transparent)`,
                      opacity: 0.7
                    }} />
                    
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-3xl sm:text-4xl group-hover:text-[#D4AF37] transition-colors"
                        style={{ 
                          fontFamily: "'Italiana', serif", 
                          color: `${colors.primary}66`
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {cake.price && (
                      <div 
                        className="absolute top-4 right-4 backdrop-blur-sm px-4 py-2"
                        style={{ 
                          background: `${colors.bg}E6`,
                          border: `1px solid ${colors.primary}66`
                        }}
                      >
                        <span
                          className="text-lg sm:text-xl"
                          style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                        >
                          {cake.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3
                      className="text-2xl sm:text-3xl mb-3 group-hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                    >
                      {cake.name}
                    </h3>

                    <div className="h-px w-12 mb-4" style={{ background: colors.primary }} />

                    {cake.description && (
                      <p
                        className="text-sm sm:text-base italic font-light leading-relaxed"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.6)' }}
                      >
                        {cake.description}
                      </p>
                    )}

                    <motion.button
                      className="mt-6 flex items-center gap-2 text-[11px] tracking-[3px] uppercase font-medium group/btn"
                      style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Order</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  <div 
                    className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderTop: `2px solid ${colors.primary}`, borderRight: `2px solid ${colors.primary}` }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderBottom: `2px solid ${colors.primary}`, borderLeft: `2px solid ${colors.primary}` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center mt-12 sm:mt-16">
            <motion.button
              onClick={() => setPage?.("collection")}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 border transition-colors px-10 py-4 text-[11px] tracking-[4px] uppercase font-medium"
              style={{ 
                fontFamily: "'Cinzel', serif",
                borderColor: colors.primary,
                color: colors.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primary;
                e.currentTarget.style.color = colors.bg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.primary;
              }}
            >
              View Full Collection <ArrowRight className="w-4 h-4" />
            </motion.button>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* 4. PROCESS                                */}
      {/* ════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden" style={{ background: colors.bgSecondary }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
              <span
                className="text-[10px] sm:text-xs tracking-[6px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                The Process
              </span>
              <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>From Vision to</span>
              {' '}
              <span 
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Reality
              </span>
            </h2>
          </FadeIn>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px" 
                   style={{ background: `linear-gradient(to right, transparent, ${colors.primary}4D, transparent)` }} />

              {[
                { num: "01", icon: ChefHat, title: "Consult", desc: "Share your vision with our master baker" },
                { num: "02", icon: Sparkles, title: "Design", desc: "We craft a bespoke design for your cake" },
                { num: "03", icon: Award, title: "Bake", desc: "Handcrafted with premium ingredients" },
                { num: "04", icon: Truck, title: "Deliver", desc: "Fresh delivery to your celebration" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="relative text-center group"
                >
                  <div className="relative mb-6 inline-block">
                    <motion.div
                      className="w-24 h-24 mx-auto rounded-full flex items-center justify-center relative z-10 transition-colors duration-500"
                      style={{ 
                        border: `2px solid ${colors.primary}`,
                        background: colors.bg
                      }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      onMouseEnter={(e) => e.currentTarget.style.background = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.background = colors.bg}
                    >
                      <step.icon 
                        className="w-10 h-10 transition-colors" 
                        style={{ color: colors.primary }}
                      />
                    </motion.div>
                    <span
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-20"
                      style={{ 
                        background: colors.primary,
                        color: colors.bg,
                        fontFamily: "'Cinzel', serif"
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl mb-3 group-hover:text-[#D4AF37] transition-colors"
                    style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-sm italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'rgba(240, 245, 240, 0.6)' }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* 5. ABOUT PREVIEW                          */}
      {/* ════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 md:py-32" style={{ background: colors.bg }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute -top-6 -left-6 right-12 bottom-12 z-0" 
                     style={{ border: `1px solid ${colors.primary}` }} />
                
                <div className="relative z-10 aspect-[4/5] overflow-hidden">
                  <img
                    src={client.about_image || client.hero_image_url || PLACEHOLDER}
                    alt="Heritage"
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-8 -right-8 p-6 sm:p-8 text-center z-20"
                  style={{ 
                    background: colors.bg,
                    border: `1px solid ${colors.primary}`
                  }}
                >
                  <div
                    className="text-4xl sm:text-5xl leading-none"
                    style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                  >
                    {yearEstablished}
                  </div>
                  <div
                    className="text-[10px] tracking-[3px] uppercase mt-2"
                    style={{ fontFamily: "'Cinzel', serif", color: 'rgba(240, 245, 240, 0.6)' }}
                  >
                    Est.
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: colors.primary }} />
                <span
                  className="text-[10px] sm:text-xs tracking-[6px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  Our Heritage
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>A Legacy of</span>
                {' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Excellence
                </span>
              </h2>

              <p
                className="text-lg sm:text-xl leading-relaxed mb-6 italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.7)' }}
              >
                {client.about_short || client.about || `Since ${yearEstablished}, ${restaurantName} has been crafting extraordinary cakes that transform celebrations into cherished memories.`}
              </p>

              <p
                className="text-base leading-relaxed mb-10 italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.5)' }}
              >
                Each creation is a testament to our unwavering commitment to quality, artistry, and the timeless tradition of fine baking.
              </p>

              <motion.button
                onClick={() => setPage?.("heritage")}
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-3 text-[11px] tracking-[4px] uppercase font-medium group"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* 6. TESTIMONIALS                           */}
      {/* ════════════════════════════════════════ */}
      {reviews.length > 0 && (
        <section 
          className="py-20 sm:py-24 md:py-32 relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom, ${colors.bg}, ${colors.bgSecondary}, ${colors.bg})` }}
        >
          <div className="absolute top-10 left-10 text-[200px] leading-none" 
               style={{ fontFamily: "'Italiana', serif", color: `${colors.primary}0D` }}>"</div>
          <div className="absolute bottom-10 right-10 text-[200px] leading-none" 
               style={{ fontFamily: "'Italiana', serif", color: `${colors.primary}0D` }}>"</div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <FadeIn className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
                <span
                  className="text-[10px] sm:text-xs tracking-[6px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  Testimonials
                </span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
              </div>

              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>Words from our</span>
                {' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Patrons
                </span>
              </h2>
            </FadeIn>

            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(reviews[activeReview]?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: colors.primary }} />
                    ))}
                  </div>

                  <p
                    className="text-2xl sm:text-3xl md:text-4xl leading-relaxed italic font-light mb-10"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFFFFF' }}
                  >
                    &ldquo;{reviews[activeReview]?.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px w-12" style={{ background: `${colors.primary}66` }} />
                    <span style={{ color: colors.primary }}>✦</span>
                    <div className="h-px w-12" style={{ background: `${colors.primary}66` }} />
                  </div>

                  <h4
                    className="text-2xl mb-1"
                    style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                  >
                    {reviews[activeReview]?.name}
                  </h4>
                  {reviews[activeReview]?.role && (
                    <p
                      className="text-xs tracking-[4px] uppercase"
                      style={{ fontFamily: "'Cinzel', serif", color: 'rgba(240, 245, 240, 0.4)' }}
                    >
                      {reviews[activeReview]?.role}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2 mt-12">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReview(i)}
                    className="h-px transition-all duration-500"
                    style={{
                      width: activeReview === i ? '48px' : '24px',
                      background: activeReview === i ? colors.primary : `${colors.primary}4D`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════ */}
      {/* 7. CTA                                    */}
      {/* ════════════════════════════════════════ */}
      <section 
        className="py-20 sm:py-24 md:py-32 border-y relative overflow-hidden"
        style={{ background: colors.bgSecondary, borderColor: colors.border }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(circle at center, ${colors.primary} 0%, transparent 70%)`
        }} />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-3xl">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${colors.primary})` }} />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.span>
              <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${colors.primary})` }} />
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-normal mb-6 leading-tight"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>Begin Your</span>
              {' '}
              <span 
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Journey
              </span>
            </h2>

            <p
              className="text-xl italic font-light mb-12"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.6)' }}
            >
              Reserve a consultation with our master baker
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-bold no-underline flex items-center gap-3"
                  style={{ 
                    fontFamily: "'Cinzel', serif",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: colors.bg
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Call to Reserve
                </motion.a>
              )}
              <motion.button
                onClick={() => setPage?.("contact")}
                whileHover={{ scale: 1.05 }}
                className="border transition-colors px-10 py-4 sm:py-5 text-[11px] tracking-[4px] uppercase font-medium"
                style={{ 
                  fontFamily: "'Cinzel', serif",
                  borderColor: colors.primary,
                  color: colors.primary,
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primary;
                  e.currentTarget.style.color = colors.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.primary;
                }}
              >
                Get In Touch
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}