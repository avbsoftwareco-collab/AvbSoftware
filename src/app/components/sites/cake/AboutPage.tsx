// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { Client } from "@/lib/supabase";

// const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

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

// // Parallax image component
// function ParallaxImage({ src, className = "", children }: any) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

//   return (
//     <div ref={ref} className={`relative overflow-hidden ${className}`}>
//       <motion.div style={{ y }} className="absolute inset-0 scale-110">
//         <img src={src} alt="" className="w-full h-full object-cover" />
//       </motion.div>
//       {children}
//     </div>
//   );
// }

// export default function AboutPage({ client, theme }: { client: Client; theme?: any }) {
//   const colors = theme?.colors || {
//     bg: "#0F1F1F",
//     bgSecondary: "#162929",
//     bgCard: "#1E3333",
//     primary: "#D4AF37",
//     accent: "#B89030",
//     text: "#F0F5F0",
//     textLight: "rgba(240, 245, 240, 0.6)",
//     border: "rgba(212, 175, 55, 0.2)",
//   };

//   // Dynamic data
//   const heroImage = client.about_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
//   const aboutImage = client.about_image || client.hero_image_url || PLACEHOLDER;
//   const chefImage = client.chef_image || client.logo_url || PLACEHOLDER;
//   const featured1 = client.featured_image_1 || client.hero_image_url || PLACEHOLDER;
//   const featured2 = client.featured_image_2 || client.hero_image_url || PLACEHOLDER;
//   const featured3 = client.featured_image_3 || client.hero_image_url || PLACEHOLDER;
  
//   const restaurantName = client.business_name || "Sweet Bites";
//   const yearEstablished = client.year_established || client.established_year || "2010";
//   const currentYear = new Date().getFullYear();
//   const yearsRunning = parseInt(yearEstablished) ? currentYear - parseInt(yearEstablished) : 15;
  
//   const chefName = client.chef_name || "Master Baker";
//   const chefQuote = client.chef_quote || "A cake is not just a dessert—it's a celebration of life's sweetest moments, crafted with passion and served with love.";
//   const chefRole = client.chef_role || "Master Baker & Founder";

//   const aboutText = client.about || client.about_short || `${restaurantName} represents the pinnacle of artisanal baking. Every creation is a testament to our unwavering commitment to excellence, where tradition meets innovation in perfect harmony.`;

//   const mission = (client as any).mission || `To craft extraordinary moments through the art of patisserie, where every cake becomes a cherished memory and every bite tells a story of devotion.`;
  
//   const vision = (client as any).vision || `To be recognized as the most distinguished atelier de pâtisserie, where culinary artistry meets timeless elegance.`;

//   return (
//     <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden">

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 1. MAGAZINE COVER HERO                          */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: colors.bg }}>
        
//         {/* Background image with parallax */}
//         <ParallaxImage src={heroImage} className="absolute inset-0">
//           <div className="absolute inset-0" style={{ background: `${colors.bg}CC` }} />
//           <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.bg} 0%, ${colors.bg}99 50%, transparent 100%)` }} />
//         </ParallaxImage>

//         {/* Decorative grid lines */}
//         <div className="absolute inset-0 hidden lg:block pointer-events-none">
//           <div className="absolute left-[8.33%] top-0 bottom-0 w-px" style={{ background: `${colors.primary}15` }} />
//           <div className="absolute left-[50%] top-0 bottom-0 w-px" style={{ background: `${colors.primary}15` }} />
//           <div className="absolute right-[8.33%] top-0 bottom-0 w-px" style={{ background: `${colors.primary}15` }} />
//         </div>

//         <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 py-20">
//           <div className="grid lg:grid-cols-12 gap-8 items-center">
            
//             {/* LEFT - Big Text */}
//             <div className="lg:col-span-7">
//               <FadeIn>
//                 {/* Magazine header */}
//                 <div className="flex items-center gap-4 mb-12">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-px" style={{ background: colors.primary }} />
//                     <span
//                       className="text-xs tracking-[6px] uppercase font-bold"
//                       style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                     >
//                       Vol. {yearsRunning} · Issue No.{currentYear}
//                     </span>
//                   </div>
//                 </div>
//               </FadeIn>

//               <FadeIn delay={0.2}>
//                 <div
//                   className="text-[10px] sm:text-xs tracking-[8px] uppercase mb-4"
//                   style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//                 >
//                   The Story Of
//                 </div>
//               </FadeIn>

//               <FadeIn delay={0.3}>
//                 <h1
//                   className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-normal leading-[0.85] mb-8"
//                   style={{ fontFamily: "'Italiana', serif", letterSpacing: '-3px', color: '#FFFFFF' }}
//                 >
//                   <span 
//                     style={{
//                       background: `linear-gradient(135deg, #FFFFFF 0%, ${colors.primary} 50%, #FFFFFF 100%)`,
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text',
//                     }}
//                   >
//                     {restaurantName.split(' ')[0]}
//                   </span>
//                   {restaurantName.split(' ')[1] && (
//                     <>
//                       <br />
//                       <span 
//                         className="italic"
//                         style={{
//                           background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                           WebkitBackgroundClip: 'text',
//                           WebkitTextFillColor: 'transparent',
//                           backgroundClip: 'text',
//                         }}
//                       >
//                         {restaurantName.split(' ').slice(1).join(' ')}
//                       </span>
//                     </>
//                   )}
//                 </h1>
//               </FadeIn>

//               <FadeIn delay={0.5}>
//                 <div className="flex items-center gap-6 max-w-xl">
//                   <div className="w-16 h-px" style={{ background: colors.primary }} />
//                   <p
//                     className="text-lg sm:text-xl italic font-light"
//                     style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.9)' }}
//                   >
//                     {client.tagline || "Where every cake tells a story"}
//                   </p>
//                 </div>
//               </FadeIn>
//             </div>

//             {/* RIGHT - Stats Box (overlapping) */}
//             <div className="lg:col-span-5">
//               <FadeIn delay={0.6} direction="right">
//                 <div className="relative">
//                   {/* Background frame */}
//                   <div className="absolute -top-4 -left-4 right-4 bottom-4 border-2 z-0" style={{ borderColor: colors.primary }} />
                  
//                   {/* Main box */}
//                   <div className="relative z-10 p-8 sm:p-10 lg:p-12 backdrop-blur-sm" style={{ background: `${colors.bgCard}EE` }}>
//                     <div className="space-y-8">
                      
//                       <div>
//                         <div className="text-xs tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                           Founded
//                         </div>
//                         <div className="text-6xl sm:text-7xl" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                           {yearEstablished}
//                         </div>
//                       </div>

//                       <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }} />

//                       <div>
//                         <div className="text-xs tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                           Years of Mastery
//                         </div>
//                         <div className="text-6xl sm:text-7xl" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
//                           {yearsRunning}<span className="text-3xl">+</span>
//                         </div>
//                       </div>

//                       <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }} />

//                       <div>
//                         <div className="text-xs tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                           Located In
//                         </div>
//                         <div className="text-3xl sm:text-4xl" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                           {client.city || "Bhopal"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </FadeIn>
//             </div>
//           </div>
//         </div>

//         {/* Bottom scroll indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
//         >
//           <div className="flex flex-col items-center gap-2">
//             <span className="text-[10px] tracking-[4px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//               The Story Continues
//             </span>
//             <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }} />
//           </div>
//         </motion.div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 2. CHAPTER 1 - OUR ORIGIN (FULLSCREEN PHOTO)   */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">
        
//         <ParallaxImage src={aboutImage} className="absolute inset-0">
//           <div className="absolute inset-0" style={{ background: `${colors.bg}E6` }} />
//         </ParallaxImage>

//         <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 py-20">
//           <div className="max-w-4xl">
            
//             <FadeIn>
//               <div className="flex items-center gap-3 mb-6">
//                 <span 
//                   className="text-xs tracking-[6px] uppercase font-bold"
//                   style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                 >
//                   Chapter I
//                 </span>
//                 <div className="w-12 h-px" style={{ background: colors.primary }} />
//               </div>
//             </FadeIn>

//             <FadeIn delay={0.2}>
//               <h2
//                 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-10 leading-[0.95]"
//                 style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//               >
//                 <span style={{ color: '#FFFFFF' }}>The</span>
//                 {' '}
//                 <span 
//                   className="italic"
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   Origin
//                 </span>
//               </h2>
//             </FadeIn>

//             {/* Drop cap paragraph */}
//             <FadeIn delay={0.3}>
//               <p
//                 className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed first-letter:text-7xl first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:leading-none"
//                 style={{ 
//                   fontFamily: "'Cormorant Garamond', serif", 
//                   color: 'rgba(240, 245, 240, 0.9)',
//                 }}
//               >
//                 <span 
//                   className="first-letter:text-7xl"
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.primary}, #F4D03F)`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   {aboutText.charAt(0)}
//                 </span>
//                 {aboutText.substring(1)}
//               </p>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 3. EDITORIAL SPLIT - PULL QUOTE                 */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="py-32 sm:py-40" style={{ background: colors.bgSecondary }}>
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16">
//           <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            
//             {/* LEFT - Image */}
//             <FadeIn direction="left" className="lg:col-span-5">
//               <div className="relative">
//                 <div className="aspect-[3/4] overflow-hidden">
//                   <img src={featured1} alt="Heritage" className="w-full h-full object-cover" />
//                 </div>
//                 {/* Frame */}
//                 <div className="absolute -top-4 -right-4 left-4 bottom-4 border-2 z-[-1]" style={{ borderColor: colors.primary }} />
//               </div>
//             </FadeIn>

//             {/* RIGHT - Huge Quote */}
//             <div className="lg:col-span-7">
//               <FadeIn direction="right">
//                 <div className="flex items-center gap-3 mb-8">
//                   <span className="text-xs tracking-[6px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                     Chapter II
//                   </span>
//                   <div className="w-12 h-px" style={{ background: colors.primary }} />
//                 </div>

//                 <div className="text-[120px] sm:text-[160px] leading-[0.3] mb-4" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
//                   &ldquo;
//                 </div>

//                 <p
//                   className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light leading-tight mb-8"
//                   style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//                 >
//                   {mission}
//                 </p>

//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-px" style={{ background: colors.primary }} />
//                   <div>
//                     <div className="text-xs tracking-[4px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                       Our Mission
//                     </div>
//                   </div>
//                 </div>
//               </FadeIn>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 4. NUMBERS / GRID LAYOUT                        */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="py-32 sm:py-40 relative overflow-hidden" style={{ background: colors.bg }}>
        
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            
//             {/* Big text - takes 5 cols */}
//             <FadeIn className="lg:col-span-5">
//               <span className="text-xs tracking-[6px] uppercase font-bold mb-6 block" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                 Chapter III · By The Numbers
//               </span>
//               <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] mb-8" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                 A Story Told In{' '}
//                 <span 
//                   className="italic"
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   Moments
//                 </span>
//               </h2>
//               <p className="text-xl italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
//                 Every number represents countless smiles, celebrations, and cherished memories.
//               </p>
//             </FadeIn>

//             {/* Numbers grid - takes 7 cols */}
//             <div className="lg:col-span-7 grid grid-cols-2 gap-px" style={{ background: colors.border }}>
//               {[
//                 { num: client.stat_1_number || `${yearsRunning}+`, label: client.stat_1_label || "Years of Mastery" },
//                 { num: client.stat_2_number || "10K+", label: client.stat_2_label || "Happy Patrons" },
//                 { num: client.stat_3_number || "500+", label: client.stat_3_label || "Custom Creations" },
//                 { num: client.stat_4_number || "50+", label: client.stat_4_label || "Cake Varieties" },
//               ].map((stat, i) => (
//                 <FadeIn key={i} delay={i * 0.1}>
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     className="aspect-square p-6 sm:p-8 flex flex-col justify-between transition-colors group cursor-default"
//                     style={{ background: colors.bgCard }}
//                   >
//                     <span className="text-xs tracking-[3px] uppercase opacity-50 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                       0{i + 1}
//                     </span>
                    
//                     <div>
//                       <div 
//                         className="text-5xl sm:text-6xl md:text-7xl mb-2 transition-colors"
//                         style={{ 
//                           fontFamily: "'Italiana', serif", 
//                           color: '#FFFFFF',
//                         }}
//                       >
//                         {stat.num}
//                       </div>
//                       <div className="text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
//                         {stat.label}
//                       </div>
//                     </div>
//                   </motion.div>
//                 </FadeIn>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 5. CHEF SPOTLIGHT - PORTRAIT STYLE              */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: colors.bgSecondary }}>
        
//         {/* Background blurred chef */}
//         <div className="absolute inset-0">
//           <img src={chefImage} alt="" className="w-full h-full object-cover opacity-10" style={{ filter: 'blur(40px)' }} />
//         </div>

//         <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 py-20">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            
//             {/* LEFT - Big quote */}
//             <FadeIn direction="left">
//               <div>
//                 <div className="flex items-center gap-3 mb-8">
//                   <span className="text-xs tracking-[6px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                     Chapter IV · The Artist
//                   </span>
//                   <div className="w-12 h-px" style={{ background: colors.primary }} />
//                 </div>

//                 {/* Photo overlay on quote */}
//                 <div className="relative mb-8">
//                   <div className="absolute -top-12 -left-8 sm:-left-12 w-32 h-40 sm:w-40 sm:h-48 overflow-hidden z-10 opacity-90">
//                     <img src={chefImage} alt={chefName} className="w-full h-full object-cover" style={{ filter: 'grayscale(0.3)' }} />
//                   </div>

//                   <p
//                     className="text-4xl sm:text-5xl md:text-6xl italic font-light leading-tight relative z-0 pt-8 sm:pt-12 pl-4"
//                     style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//                   >
//                     &ldquo;{chefQuote}&rdquo;
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4 mt-12">
//                   <div className="w-16 h-px" style={{ background: colors.primary }} />
//                   <div>
//                     <div className="text-3xl mb-1" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
//                       {chefName}
//                     </div>
//                     <div className="text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
//                       {chefRole}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </FadeIn>

//             {/* RIGHT - Full Chef Portrait */}
//             <FadeIn direction="right">
//               <div className="relative">
//                 {/* Decorative number background */}
//                 <div className="absolute -top-20 -right-4 text-[200px] sm:text-[300px] leading-none opacity-10 select-none" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
//                   04
//                 </div>

//                 <div className="relative">
//                   <div className="aspect-[3/4] overflow-hidden">
//                     <img src={chefImage} alt={chefName} className="w-full h-full object-cover" />
//                   </div>
                  
//                   {/* Gold corner decorations */}
//                   <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2" style={{ borderColor: colors.primary }} />
//                   <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2" style={{ borderColor: colors.primary }} />
//                 </div>
//               </div>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 6. VISION - BIG STATEMENT                       */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="py-32 sm:py-40 relative overflow-hidden" style={{ background: colors.bg }}>
        
//         {/* Decorative background pattern */}
//         <div className="absolute inset-0 opacity-[0.03]" style={{
//           backgroundImage: `radial-gradient(circle, ${colors.primary} 2px, transparent 2px)`,
//           backgroundSize: "60px 60px",
//         }} />

//         <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
//           <div className="max-w-5xl mx-auto text-center">
            
//             <FadeIn>
//               <div className="flex items-center justify-center gap-4 mb-8">
//                 <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
//                 <motion.span
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                   className="text-3xl"
//                   style={{ color: colors.primary }}
//                 >
//                   ✦
//                 </motion.span>
//                 <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
//               </div>

//               <span className="text-xs tracking-[8px] uppercase font-bold block mb-8" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                 Chapter V · The Vision
//               </span>
//             </FadeIn>

//             <FadeIn delay={0.3}>
//               <h2 
//                 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1] mb-12"
//                 style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//               >
//                 <span style={{ color: '#FFFFFF' }}>Where</span>{' '}
//                 <span 
//                   className="italic"
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   Tomorrow
//                 </span>
//                 <br />
//                 <span style={{ color: '#FFFFFF' }}>Awaits</span>
//               </h2>
//             </FadeIn>

//             <FadeIn delay={0.5}>
//               <p
//                 className="text-2xl sm:text-3xl italic font-light leading-relaxed max-w-3xl mx-auto"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
//               >
//                 {vision}
//               </p>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 7. PHOTO COLLAGE - GALLERY PREVIEW              */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="py-20 sm:py-32 relative" style={{ background: colors.bgSecondary }}>
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
//           <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
//             <span className="text-xs tracking-[6px] uppercase font-bold mb-4 block" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//               Chapter VI · The Craft
//             </span>
//             <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//               <span style={{ color: '#FFFFFF' }}>Moments</span>{' '}
//               <span 
//                 className="italic"
//                 style={{
//                   background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                 }}
//               >
//                 Captured
//               </span>
//             </h2>
//           </FadeIn>

//           {/* Asymmetric Photo Grid */}
//           <div className="grid grid-cols-12 gap-3 sm:gap-4 max-w-6xl mx-auto">
            
//             {/* Big - Left */}
//             <FadeIn direction="left" className="col-span-12 md:col-span-7 md:row-span-2">
//               <motion.div
//                 whileHover={{ scale: 0.98 }}
//                 className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
//               >
//                 <img src={featured1} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100" style={{ background: `linear-gradient(to top, ${colors.bg}E6, transparent)` }} />
//                 <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
//                   <div className="text-xs tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                     Featured
//                   </div>
//                   <div className="text-2xl sm:text-3xl" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                     Signature Creation
//                   </div>
//                 </div>
//               </motion.div>
//             </FadeIn>

//             {/* Two right - top */}
//             <FadeIn direction="right" delay={0.1} className="col-span-6 md:col-span-5">
//               <motion.div
//                 whileHover={{ scale: 0.98 }}
//                 className="relative aspect-square overflow-hidden group cursor-pointer"
//               >
//                 <img src={featured2} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 opacity-30 group-hover:opacity-0 transition-opacity" style={{ background: `${colors.bg}99` }} />
//               </motion.div>
//             </FadeIn>

//             <FadeIn direction="right" delay={0.2} className="col-span-6 md:col-span-5">
//               <motion.div
//                 whileHover={{ scale: 0.98 }}
//                 className="relative aspect-square overflow-hidden group cursor-pointer"
//               >
//                 <img src={featured3} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 <div className="absolute inset-0 opacity-30 group-hover:opacity-0 transition-opacity" style={{ background: `${colors.bg}99` }} />
//               </motion.div>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════════════════════ */}
//       {/* 8. FINAL CTA - EDITORIAL                        */}
//       {/* ═══════════════════════════════════════════════ */}
//       <section className="py-32 sm:py-40 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16">
//           <div className="max-w-4xl mx-auto text-center">
            
//             <FadeIn>
//               <div className="flex items-center justify-center gap-4 mb-10">
//                 <div className="w-16 h-px" style={{ background: colors.primary }} />
//                 <span className="text-xs tracking-[6px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                   Epilogue
//                 </span>
//                 <div className="w-16 h-px" style={{ background: colors.primary }} />
//               </div>

//               <h2 className="text-6xl sm:text-7xl md:text-8xl font-normal mb-10 leading-[0.95]" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                 <span style={{ color: '#FFFFFF' }}>Your Story,</span>
//                 <br />
//                 <span 
//                   className="italic"
//                   style={{
//                     background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   Our Canvas
//                 </span>
//               </h2>

//               <p className="text-xl sm:text-2xl italic font-light mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
//                 Let us craft the cake that becomes the centerpiece of your most cherished memories.
//               </p>

//               {client.phone && (
//                 <motion.a
//                   href={`tel:${client.phone}`}
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-block px-12 py-5 text-xs tracking-[5px] uppercase font-bold no-underline"
//                   style={{
//                     fontFamily: "'Cinzel', serif",
//                     background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
//                     color: colors.bg,
//                   }}
//                 >
//                   Begin Your Story
//                 </motion.a>
//               )}
//             </FadeIn>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }





"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Parallax image
function ParallaxBg({ src, speed = 0.5 }: { src: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-20%]">
        <img src={src} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}

export default function AboutPage({ client, theme }: { client: Client; theme?: any }) {
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

  // Dynamic data
  const heroImage = client.about_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const aboutImage = client.about_image || client.hero_image_url || PLACEHOLDER;
  const chefImage = client.chef_image || client.logo_url || PLACEHOLDER;
  const featured1 = client.featured_image_1 || PLACEHOLDER;
  const featured2 = client.featured_image_2 || PLACEHOLDER;
  const featured3 = client.featured_image_3 || PLACEHOLDER;
  
  const restaurantName = client.business_name || "Sweet Bites";
  const yearEstablished = client.year_established || client.established_year || "2010";
  const currentYear = new Date().getFullYear();
  const yearsRunning = parseInt(yearEstablished) ? currentYear - parseInt(yearEstablished) : 15;
  
  const chefName = client.chef_name || "Master Baker";
  const chefQuote = client.chef_quote || "Every cake tells a story. Every bite is a memory in the making.";
  const chefRole = client.chef_role || "Master Baker & Founder";

  const aboutText = client.about || client.about_short || `${restaurantName} is more than a bakery—it's a sanctuary of sweet artistry, where every creation is born from passion, perfected through tradition, and presented with the elegance of fine art.`;
  
  const mission = (client as any).mission || `To create cakes that don't just feed the body, but nourish the soul—turning ordinary moments into extraordinary memories.`;
  const vision = (client as any).vision || `To be the most cherished bakery, where every cake we craft becomes a treasured chapter in someone's life story.`;

  return (
    <div 
      className="relative overflow-x-hidden"
      style={{ 
        background: colors.bg, 
        color: colors.text, 
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* ═══════════════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO - FULL SCREEN PHOTO          */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        
        {/* Full screen image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.55)' }}
          />
          {/* Vignette */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at center, transparent 0%, ${colors.bg}99 100%)`,
          }} />
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3" style={{
            background: `linear-gradient(to top, ${colors.bg} 0%, ${colors.bg}99 30%, transparent 100%)`,
          }} />
        </div>

        {/* Documentary-style content overlay */}
        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-28">
          
          {/* Documentary tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF0000' }} />
            <span 
              className="text-xs tracking-[4px] uppercase font-bold"
              style={{ fontFamily: "'Cinzel', serif", color: '#FFFFFF' }}
            >
              REC ● A FILM BY {restaurantName.toUpperCase()}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            
            {/* Big title - takes 8 cols */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="lg:col-span-8"
            >
              <div 
                className="text-xs tracking-[6px] uppercase mb-6"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                A Documentary Story
              </div>

              <h1
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-normal leading-[0.85] mb-8"
                style={{ 
                  fontFamily: "'Italiana', serif", 
                  color: '#FFFFFF',
                  textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                }}
              >
                Behind
                <br />
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  The Magic
                </span>
              </h1>
            </motion.div>

            {/* Side info - takes 4 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="lg:col-span-4 lg:pl-8 lg:border-l"
              style={{ borderColor: colors.primary }}
            >
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Featuring
                  </div>
                  <div className="text-lg" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {chefName}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Runtime
                  </div>
                  <div className="text-lg" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {yearsRunning}+ Years
                  </div>
                </div>

                <div>
                  <div className="text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Location
                  </div>
                  <div className="text-lg" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {client.city || "Bhopal"}, India
                  </div>
                </div>

                <div>
                  <div className="text-[10px] tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Year
                  </div>
                  <div className="text-lg" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {yearEstablished} – Present
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom film strip decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-2 flex">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="flex-1 border-r" style={{ background: i % 2 === 0 ? colors.primary : 'transparent', borderColor: colors.bg }} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 2. OPENING SCENE - BIG TYPOGRAPHY               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-40 lg:py-48" style={{ background: colors.bg }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Scene marker */}
            <FadeIn>
              <div className="flex items-center gap-4 mb-12">
                <span 
                  className="text-xs tracking-[4px] uppercase font-bold"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  ▸ Scene 01
                </span>
                <div className="w-20 h-px" style={{ background: colors.primary }} />
                <span 
                  className="text-xs tracking-[4px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
                >
                  The Origin
                </span>
              </div>
            </FadeIn>

            {/* Huge editorial text */}
            <FadeIn delay={0.2}>
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[0.95] mb-16"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                It all started with{' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  a single dream.
                </span>
              </h2>
            </FadeIn>

            {/* Story paragraph */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              <FadeIn delay={0.3} className="lg:col-span-8">
                <p
                  className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    color: 'rgba(240, 245, 240, 0.9)',
                  }}
                >
                  {aboutText}
                </p>
              </FadeIn>

              {/* Side stat */}
              <FadeIn delay={0.5} className="lg:col-span-4">
                <div 
                  className="p-8 border-l-2 sticky top-32"
                  style={{ borderColor: colors.primary }}
                >
                  <div className="text-[10px] tracking-[4px] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Director&apos;s Note
                  </div>
                  <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                    &ldquo;What began in {yearEstablished} as a passion project has blossomed into {client.city || 'Bhopal'}&apos;s most beloved patisserie.&rdquo;
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 3. WIDE SHOT - FULL BLEED IMAGE WITH QUOTE     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        
        <ParallaxBg src={aboutImage} speed={0.3} />
        
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: `${colors.bg}D9` }} />

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10 py-20">
          <div className="max-w-5xl mx-auto text-center">
            
            <FadeIn>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px" style={{ background: colors.primary }} />
                <span 
                  className="text-xs tracking-[6px] uppercase font-bold"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  ▸ Wide Shot
                </span>
                <div className="w-12 h-px" style={{ background: colors.primary }} />
              </div>
            </FadeIn>

            {/* Giant quote */}
            <FadeIn delay={0.2}>
              <div 
                className="text-[100px] sm:text-[150px] md:text-[200px] leading-[0.2] mb-12 select-none"
                style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
              >
                &ldquo;
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic font-light leading-tight mb-12"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                {mission}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px" style={{ background: colors.primary }} />
                <span 
                  className="text-xs tracking-[4px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  Our Mission
                </span>
                <div className="w-16 h-px" style={{ background: colors.primary }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 4. B-ROLL - NUMBERS MONTAGE                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32" style={{ background: colors.bgSecondary }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
          <FadeIn className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span 
                className="text-xs tracking-[4px] uppercase font-bold"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                ▸ Scene 02
              </span>
              <div className="w-20 h-px" style={{ background: colors.primary }} />
              <span 
                className="text-xs tracking-[4px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
              >
                The Numbers Speak
              </span>
            </div>

            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-normal max-w-4xl leading-[0.95]"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              A journey measured in{' '}
              <span 
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                moments.
              </span>
            </h2>
          </FadeIn>

          {/* Documentary-style stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px max-w-7xl" style={{ background: colors.border }}>
            {[
              { 
                num: client.stat_1_number || `${yearsRunning}+`, 
                label: client.stat_1_label || "Years",
                desc: "Of dedication and craft"
              },
              { 
                num: client.stat_2_number || "10K+", 
                label: client.stat_2_label || "Patrons",
                desc: "Hearts won, one cake at a time"
              },
              { 
                num: client.stat_3_number || "500+", 
                label: client.stat_3_label || "Creations",
                desc: "Custom designs made with love"
              },
              { 
                num: client.stat_4_number || "50+", 
                label: client.stat_4_label || "Recipes",
                desc: "Perfected through generations"
              },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-10 sm:p-12 h-full relative overflow-hidden group cursor-default"
                  style={{ background: colors.bg }}
                >
                  {/* Hover line at top */}
                  <motion.div
                    className="absolute top-0 left-0 h-px"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.5, duration: 1 }}
                    style={{ background: colors.primary }}
                  />

                  {/* Take number */}
                  <div className="text-[10px] tracking-[3px] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Take 0{i + 1}
                  </div>

                  {/* Big number */}
                  <div 
                    className="text-6xl sm:text-7xl md:text-8xl leading-none mb-4"
                    style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                  >
                    {stat.num}
                  </div>

                  {/* Label */}
                  <div className="text-xl mb-3" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
                    {stat.label}
                  </div>

                  {/* Description */}
                  <p className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                    {stat.desc}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 5. CLOSE-UP - CHEF INTERVIEW                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center py-20" style={{ background: colors.bg }}>
        
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
          <FadeIn className="mb-16">
            <div className="flex items-center gap-4">
              <span 
                className="text-xs tracking-[4px] uppercase font-bold"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                ▸ Scene 03
              </span>
              <div className="w-20 h-px" style={{ background: colors.primary }} />
              <span 
                className="text-xs tracking-[4px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
              >
                The Interview
              </span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            
            {/* Chef Photo - 5 cols */}
            <FadeIn className="lg:col-span-5">
              <div className="relative">
                {/* Polaroid-style frame */}
                <div className="p-3 pb-16 relative" style={{ background: '#F0F5F0' }}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={chefImage} 
                      alt={chefName}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(0.3) contrast(1.05)' }}
                    />
                  </div>
                  
                  {/* Polaroid caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <div 
                      className="text-sm"
                      style={{ 
                        fontFamily: "'Italiana', serif", 
                        color: '#1A1A1A',
                      }}
                    >
                      {chefName}, {yearEstablished}
                    </div>
                  </div>
                </div>

                {/* Tape effect */}
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8"
                  style={{ 
                    background: 'rgba(244, 208, 63, 0.3)',
                    transform: 'translateX(-50%) rotate(-3deg)',
                  }}
                />

                {/* Behind shadow */}
                <div 
                  className="absolute -bottom-4 -right-4 -left-4 h-full -z-10"
                  style={{ 
                    background: colors.bgSecondary,
                    transform: 'rotate(2deg)',
                  }}
                />
              </div>
            </FadeIn>

            {/* Interview content - 7 cols */}
            <div className="lg:col-span-7">
              
              {/* Question */}
              <FadeIn delay={0.2}>
                <div className="mb-8">
                  <div className="text-[10px] tracking-[4px] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Question 01
                  </div>
                  <h3 
                    className="text-2xl sm:text-3xl italic font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.7)' }}
                  >
                    What inspires your creations?
                  </h3>
                </div>
              </FadeIn>

              {/* Answer */}
              <FadeIn delay={0.4}>
                <div 
                  className="text-[150px] sm:text-[180px] leading-[0.2] mb-6 select-none"
                  style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                >
                  &ldquo;
                </div>

                <p
                  className="text-3xl sm:text-4xl md:text-5xl italic font-light leading-tight mb-12"
                  style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                >
                  {chefQuote}
                </p>
              </FadeIn>

              {/* Attribution */}
              <FadeIn delay={0.6}>
                <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: colors.border }}>
                  <div>
                    <div className="text-2xl mb-1" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
                      — {chefName}
                    </div>
                    <div className="text-[10px] tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                      {chefRole}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 6. MONTAGE - PHOTO GRID                         */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32" style={{ background: colors.bgSecondary }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
          <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span 
                className="text-xs tracking-[4px] uppercase font-bold"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                ▸ Scene 04
              </span>
              <div className="w-12 h-px" style={{ background: colors.primary }} />
            </div>

            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-normal"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              The{' '}
              <span 
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Montage
              </span>
            </h2>
            <p className="text-xl italic mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
              Captured moments from our journey
            </p>
          </FadeIn>

          {/* Photo grid with documentary captions */}
          <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
            
            {/* Big left */}
            <FadeIn className="col-span-12 md:col-span-8">
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative aspect-[16/10] overflow-hidden group cursor-pointer"
              >
                <img src={featured1} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                
                {/* Film grain effect */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }} />

                {/* Caption */}
                <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[3px] uppercase" style={{ 
                  fontFamily: "'Cinzel', serif", 
                  color: '#FFFFFF',
                  background: 'rgba(0,0,0,0.7)',
                }}>
                  CLIP 001 · {yearEstablished}
                </div>
              </motion.div>
            </FadeIn>

            {/* Two right stacked */}
            <FadeIn delay={0.1} className="col-span-6 md:col-span-4">
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
              >
                <img src={featured2} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[3px] uppercase" style={{ 
                  fontFamily: "'Cinzel', serif", 
                  color: '#FFFFFF',
                  background: 'rgba(0,0,0,0.7)',
                }}>
                  CLIP 002
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2} className="col-span-6 md:col-span-4">
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img src={featured3} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[3px] uppercase" style={{ 
                  fontFamily: "'Cinzel', serif", 
                  color: '#FFFFFF',
                  background: 'rgba(0,0,0,0.7)',
                }}>
                  CLIP 003
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.3} className="col-span-12 md:col-span-8">
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="relative aspect-[16/9] overflow-hidden group cursor-pointer"
              >
                <img src={aboutImage} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[3px] uppercase" style={{ 
                  fontFamily: "'Cinzel', serif", 
                  color: '#FFFFFF',
                  background: 'rgba(0,0,0,0.7)',
                }}>
                  CLIP 004 · BEHIND THE SCENES
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 7. CLOSING SCENE - VISION                       */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0" style={{ background: colors.bg }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle, ${colors.primary} 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            <FadeIn>
              <div className="flex items-center gap-4 mb-12">
                <span 
                  className="text-xs tracking-[4px] uppercase font-bold"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                >
                  ▸ Scene 05
                </span>
                <div className="w-20 h-px" style={{ background: colors.primary }} />
                <span 
                  className="text-xs tracking-[4px] uppercase"
                  style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
                >
                  The Future
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[0.9] mb-16"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                What lies{' '}
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ahead?
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-7">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl italic font-light leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.85)' }}
                  >
                    {vision}
                  </p>
                </div>

                <div className="lg:col-span-5 flex items-center">
                  <div className="w-full">
                    <div 
                      className="p-8 border"
                      style={{ borderColor: colors.primary, background: colors.bgCard }}
                    >
                      <div className="text-[10px] tracking-[4px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                        Coming Soon
                      </div>
                      <div className="text-3xl mb-4" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                        Chapter Two
                      </div>
                      <p className="text-sm italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                        Our story continues to unfold, with every new cake we craft adding another chapter to our legacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* 8. END CREDITS - CTA                            */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-32 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            
            <FadeIn>
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-3xl"
                  style={{ color: colors.primary }}
                >
                  ✦
                </motion.span>
                <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
              </div>

              <div className="text-xs tracking-[6px] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                End Credits
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.95] mb-10"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                <span style={{ color: '#FFFFFF' }}>Be part of our</span>
                <br />
                <span 
                  className="italic"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  next scene.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p
                className="text-xl sm:text-2xl italic font-light mb-12 max-w-2xl mx-auto"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}
              >
                Every order writes a new chapter in our story
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              {client.phone && (
                <motion.a
                  href={`tel:${client.phone}`}
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-12 py-5 text-xs tracking-[5px] uppercase font-bold no-underline"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: colors.bg,
                  }}
                >
                  Start Your Story
                </motion.a>
              )}
            </FadeIn>

            {/* Bottom credit */}
            <FadeIn delay={0.8}>
              <div className="mt-16 pt-12 border-t" style={{ borderColor: colors.border }}>
                <div className="text-[10px] tracking-[6px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                  A Story By
                </div>
                <div className="text-3xl mt-2" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
                  {restaurantName}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}