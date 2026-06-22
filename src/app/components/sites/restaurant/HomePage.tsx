// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef, useState } from "react";

// interface RestaurantHomeProps {
//   restaurantName?: string;
//   tagline?: string;
//   heroImage?: string;
//   featuredImages?: string[];
//   specialties?: {
//     title: string;
//     description: string;
//     image: string;
//   }[];
//   openingHours?: {
//     days: string;
//     hours: string;
//   }[];
//   reservationPhone?: string;
// }

// const defaultProps: RestaurantHomeProps = {
//   restaurantName: "AURUM",
//   tagline: "Where Every Moment Becomes A Memory",
//   heroImage:
//     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
//   featuredImages: [
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
//     "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
//     "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
//   ],
//   specialties: [
//     {
//       title: "Signature Cocktails",
//       description:
//         "Handcrafted with premium spirits and exotic ingredients sourced from around the world.",
//       image:
//         "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
//     },
//     {
//       title: "Fine Dining",
//       description:
//         "A culinary journey through flavors that ignite the senses and satisfy the soul.",
//       image:
//         "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
//     },
//     {
//       title: "Live Experiences",
//       description:
//         "Jazz evenings, curated performances, and unforgettable nights under the stars.",
//       image:
//         "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
//     },
//   ],
//   openingHours: [
//     { days: "Monday - Thursday", hours: "5:00 PM - 11:00 PM" },
//     { days: "Friday - Saturday", hours: "4:00 PM - 2:00 AM" },
//     { days: "Sunday", hours: "12:00 PM - 10:00 PM" },
//   ],
//   reservationPhone: "+1 (555) 123-4567",
// };

// export default function HomePage(props: RestaurantHomeProps) {
//   const merged = { ...defaultProps, ...props };
//   const heroRef = useRef<HTMLDivElement>(null);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   const fadeUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//     }),
//   };

//   const stagger = {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.1 } },
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#0a0a0a",
//         color: "#f5f0e8",
//         fontFamily: "'Georgia', serif",
//         overflowX: "hidden",
//       }}
//     >
//       {/* ══════════════════════════════════════════ */}
//       {/* HERO SECTION - Full Width Center Aligned */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         ref={heroRef}
//         style={{
//           position: "relative",
//           height: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//         }}
//       >
//         {/* Parallax Background */}
//         <motion.div
//           style={{ y: heroY }}
//           className="absolute inset-0"
//           css={{
//             position: "absolute",
//             inset: 0,
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${merged.heroImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               filter: "brightness(0.35)",
//             }}
//           />
//         </motion.div>

//         {/* Gold Gradient Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
//           }}
//         />

//         {/* Decorative Lines */}
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "5%",
//             right: "5%",
//             height: "1px",
//             background:
//               "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
//             transform: "translateY(-60px)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "5%",
//             right: "5%",
//             height: "1px",
//             background:
//               "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
//             transform: "translateY(60px)",
//           }}
//         />

//         {/* Hero Content - CENTER ALIGNED */}
//         <motion.div
//           style={{ opacity: heroOpacity, position: "relative", zIndex: 10 }}
//           variants={stagger}
//           initial="hidden"
//           animate="visible"
//         >
//           <div style={{ textAlign: "center", padding: "0 20px" }}>
//             {/* Gold Ornament */}
//             <motion.div
//               variants={fadeUp}
//               custom={0}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "16px",
//                 marginBottom: "32px",
//               }}
//             >
//               <div
//                 style={{
//                   height: "1px",
//                   width: "80px",
//                   background: "linear-gradient(90deg, transparent, #D4AF37)",
//                 }}
//               />
//               <span
//                 style={{
//                   color: "#D4AF37",
//                   fontSize: "11px",
//                   letterSpacing: "6px",
//                   textTransform: "uppercase",
//                   fontFamily: "sans-serif",
//                   fontWeight: 300,
//                 }}
//               >
//                 Est. 2020
//               </span>
//               <div
//                 style={{
//                   height: "1px",
//                   width: "80px",
//                   background: "linear-gradient(90deg, #D4AF37, transparent)",
//                 }}
//               />
//             </motion.div>

//             {/* Restaurant Name */}
//             <motion.h1
//               variants={fadeUp}
//               custom={1}
//               style={{
//                 fontSize: "clamp(72px, 12vw, 140px)",
//                 fontWeight: 700,
//                 letterSpacing: "20px",
//                 margin: "0 0 8px",
//                 lineHeight: 1,
//                 background: "linear-gradient(135deg, #f5f0e8, #D4AF37, #f5f0e8)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {merged.restaurantName}
//             </motion.h1>

//             {/* Tagline */}
//             <motion.p
//               variants={fadeUp}
//               custom={2}
//               style={{
//                 fontSize: "clamp(14px, 2vw, 18px)",
//                 letterSpacing: "4px",
//                 color: "rgba(245,240,232,0.7)",
//                 textTransform: "uppercase",
//                 fontFamily: "sans-serif",
//                 fontWeight: 300,
//                 margin: "24px 0 48px",
//               }}
//             >
//               {merged.tagline}
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               variants={fadeUp}
//               custom={3}
//               style={{ display: "flex", gap: "20px", justifyContent: "center" }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05, backgroundColor: "#c9a227" }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{
//                   padding: "16px 44px",
//                   background: "linear-gradient(135deg, #D4AF37, #c9a227)",
//                   color: "#0a0a0a",
//                   border: "none",
//                   fontSize: "11px",
//                   letterSpacing: "4px",
//                   textTransform: "uppercase",
//                   fontFamily: "sans-serif",
//                   fontWeight: 700,
//                   cursor: "pointer",
//                 }}
//               >
//                 Reserve A Table
//               </motion.button>

//               <motion.button
//                 whileHover={{
//                   scale: 1.05,
//                   backgroundColor: "rgba(212,175,55,0.1)",
//                 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{
//                   padding: "16px 44px",
//                   background: "transparent",
//                   color: "#D4AF37",
//                   border: "1px solid rgba(212,175,55,0.5)",
//                   fontSize: "11px",
//                   letterSpacing: "4px",
//                   textTransform: "uppercase",
//                   fontFamily: "sans-serif",
//                   fontWeight: 300,
//                   cursor: "pointer",
//                 }}
//               >
//                 View Menu
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           style={{
//             position: "absolute",
//             bottom: "40px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//           }}
//         >
//           <span
//             style={{
//               color: "rgba(212,175,55,0.6)",
//               fontSize: "10px",
//               letterSpacing: "4px",
//               fontFamily: "sans-serif",
//             }}
//           >
//             SCROLL
//           </span>
//           <div
//             style={{
//               width: "1px",
//               height: "40px",
//               background: "linear-gradient(180deg, #D4AF37, transparent)",
//             }}
//           />
//         </motion.div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* MARQUEE STRIP */}
//       {/* ══════════════════════════════════════════ */}
//       <div
//         style={{
//           backgroundColor: "#D4AF37",
//           padding: "14px 0",
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         <motion.div
//           animate={{ x: [0, -1000] }}
//           transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
//           style={{
//             display: "flex",
//             gap: "60px",
//             whiteSpace: "nowrap",
//             width: "max-content",
//           }}
//         >
//           {Array(8)
//             .fill(
//               "FINE DINING  ✦  SIGNATURE COCKTAILS  ✦  LIVE MUSIC  ✦  PRIVATE EVENTS  ✦  ROOFTOP BAR  ✦"
//             )
//             .map((text, i) => (
//               <span
//                 key={i}
//                 style={{
//                   color: "#0a0a0a",
//                   fontSize: "11px",
//                   letterSpacing: "3px",
//                   fontFamily: "sans-serif",
//                   fontWeight: 700,
//                 }}
//               >
//                 {text}
//               </span>
//             ))}
//         </motion.div>
//       </div>

//       {/* ══════════════════════════════════════════ */}
//       {/* SPLIT SCREEN - Image Mosaic + Text */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           minHeight: "90vh",
//         }}
//       >
//         {/* Left - Image Mosaic */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateRows: "60% 40%",
//             gap: "3px",
//             backgroundColor: "#0a0a0a",
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 1.1 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1.2 }}
//             style={{
//               backgroundImage: `url(${merged.featuredImages?.[0]})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               filter: "brightness(0.75)",
//             }}
//           />
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               style={{
//                 backgroundImage: `url(${merged.featuredImages?.[1]})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 filter: "brightness(0.7)",
//               }}
//             />
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               style={{
//                 backgroundImage: `url(${merged.featuredImages?.[2]})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 filter: "brightness(0.7)",
//               }}
//             />
//           </div>
//         </div>

//         {/* Right - Content */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "80px 70px",
//             backgroundColor: "#0f0f0f",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               marginBottom: "32px",
//             }}
//           >
//             <div
//               style={{ width: "40px", height: "1px", backgroundColor: "#D4AF37" }}
//             />
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontSize: "10px",
//                 letterSpacing: "5px",
//                 textTransform: "uppercase",
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Our Story
//             </span>
//           </div>

//           <h2
//             style={{
//               fontSize: "clamp(36px, 4vw, 52px)",
//               fontWeight: 700,
//               lineHeight: 1.15,
//               margin: "0 0 28px",
//               color: "#f5f0e8",
//             }}
//           >
//             A Sanctuary of
//             <br />
//             <span style={{ color: "#D4AF37" }}>Extraordinary</span>
//             <br />
//             Taste
//           </h2>

//           <p
//             style={{
//               color: "rgba(245,240,232,0.65)",
//               lineHeight: 1.9,
//               fontSize: "15px",
//               marginBottom: "40px",
//               fontFamily: "sans-serif",
//               fontWeight: 300,
//             }}
//           >
//             Nestled in the heart of the city, AURUM is more than a restaurant —
//             it's an experience. From our meticulously crafted menu to our
//             breathtaking ambiance, every detail has been designed to transport
//             you to another world.
//           </p>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "24px",
//               marginBottom: "48px",
//             }}
//           >
//             {[
//               { number: "120+", label: "Curated Dishes" },
//               { number: "50+", label: "Premium Wines" },
//               { number: "15+", label: "Years of Excellence" },
//               { number: "4.9★", label: "Guest Rating" },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "32px",
//                     fontWeight: 700,
//                     color: "#D4AF37",
//                     marginBottom: "4px",
//                   }}
//                 >
//                   {stat.number}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "11px",
//                     letterSpacing: "2px",
//                     color: "rgba(245,240,232,0.5)",
//                     textTransform: "uppercase",
//                     fontFamily: "sans-serif",
//                   }}
//                 >
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ x: 8 }}
//             style={{
//               alignSelf: "flex-start",
//               background: "none",
//               border: "none",
//               color: "#D4AF37",
//               fontSize: "12px",
//               letterSpacing: "4px",
//               textTransform: "uppercase",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               fontFamily: "sans-serif",
//               padding: 0,
//             }}
//           >
//             Discover Our Story
//             <span style={{ fontSize: "18px" }}>→</span>
//           </motion.button>
//         </motion.div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* SPECIALTIES - Magazine Grid */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           padding: "120px 5%",
//           backgroundColor: "#080808",
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           style={{ textAlign: "center", marginBottom: "80px" }}
//         >
//           <span
//             style={{
//               color: "#D4AF37",
//               fontSize: "10px",
//               letterSpacing: "6px",
//               textTransform: "uppercase",
//               fontFamily: "sans-serif",
//               display: "block",
//               marginBottom: "20px",
//             }}
//           >
//             Signature Offerings
//           </span>
//           <h2
//             style={{
//               fontSize: "clamp(36px, 5vw, 60px)",
//               fontWeight: 700,
//               color: "#f5f0e8",
//               margin: 0,
//             }}
//           >
//             The Aurum Experience
//           </h2>
//         </motion.div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: "2px",
//           }}
//         >
//           {merged.specialties?.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15, duration: 0.8 }}
//               onMouseEnter={() => setHoveredCard(i)}
//               onMouseLeave={() => setHoveredCard(null)}
//               style={{
//                 position: "relative",
//                 height: "500px",
//                 overflow: "hidden",
//                 cursor: "pointer",
//               }}
//             >
//               <motion.div
//                 animate={{
//                   scale: hoveredCard === i ? 1.08 : 1,
//                 }}
//                 transition={{ duration: 0.6 }}
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   backgroundImage: `url(${item.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               />

//               {/* Gradient Overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
//                 }}
//               />

//               {/* Gold border on hover */}
//               <motion.div
//                 animate={{
//                   opacity: hoveredCard === i ? 1 : 0,
//                 }}
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   border: "1px solid rgba(212,175,55,0.5)",
//                   pointerEvents: "none",
//                 }}
//               />

//               {/* Content */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   padding: "40px 32px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "30px",
//                     height: "1px",
//                     backgroundColor: "#D4AF37",
//                     marginBottom: "16px",
//                   }}
//                 />
//                 <h3
//                   style={{
//                     fontSize: "22px",
//                     fontWeight: 700,
//                     color: "#f5f0e8",
//                     margin: "0 0 12px",
//                   }}
//                 >
//                   {item.title}
//                 </h3>
//                 <motion.p
//                   animate={{
//                     opacity: hoveredCard === i ? 1 : 0,
//                     y: hoveredCard === i ? 0 : 10,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   style={{
//                     color: "rgba(245,240,232,0.7)",
//                     fontSize: "13px",
//                     lineHeight: 1.7,
//                     fontFamily: "sans-serif",
//                     margin: 0,
//                     fontWeight: 300,
//                   }}
//                 >
//                   {item.description}
//                 </motion.p>
//               </div>

//               {/* Number */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "24px",
//                   right: "24px",
//                   fontSize: "60px",
//                   fontWeight: 700,
//                   color: "rgba(212,175,55,0.15)",
//                   lineHeight: 1,
//                   fontFamily: "sans-serif",
//                 }}
//               >
//                 0{i + 1}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* OPENING HOURS - Dark Luxury */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           padding: "100px 5%",
//           backgroundColor: "#0f0f0f",
//           borderTop: "1px solid rgba(212,175,55,0.15)",
//           borderBottom: "1px solid rgba(212,175,55,0.15)",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "900px",
//             margin: "0 auto",
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "80px",
//             alignItems: "center",
//           }}
//         >
//           {/* Hours */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontSize: "10px",
//                 letterSpacing: "5px",
//                 textTransform: "uppercase",
//                 fontFamily: "sans-serif",
//                 display: "block",
//                 marginBottom: "32px",
//               }}
//             >
//               Opening Hours
//             </span>

//             {merged.openingHours?.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: "20px 0",
//                   borderBottom:
//                     i < (merged.openingHours?.length ?? 0) - 1
//                       ? "1px solid rgba(212,175,55,0.12)"
//                       : "none",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "rgba(245,240,232,0.7)",
//                     fontFamily: "sans-serif",
//                     fontSize: "14px",
//                     fontWeight: 300,
//                   }}
//                 >
//                   {item.days}
//                 </span>
//                 <span
//                   style={{
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     letterSpacing: "1px",
//                   }}
//                 >
//                   {item.hours}
//                 </span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Reservation CTA */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             style={{ textAlign: "center" }}
//           >
//             <div
//               style={{
//                 border: "1px solid rgba(212,175,55,0.3)",
//                 padding: "60px 40px",
//                 position: "relative",
//               }}
//             >
//               {/* Corner Ornaments */}
//               {["top-left", "top-right", "bottom-left", "bottom-right"].map(
//                 (pos) => (
//                   <div
//                     key={pos}
//                     style={{
//                       position: "absolute",
//                       width: "12px",
//                       height: "12px",
//                       borderTop: pos.includes("top")
//                         ? "2px solid #D4AF37"
//                         : "none",
//                       borderBottom: pos.includes("bottom")
//                         ? "2px solid #D4AF37"
//                         : "none",
//                       borderLeft: pos.includes("left")
//                         ? "2px solid #D4AF37"
//                         : "none",
//                       borderRight: pos.includes("right")
//                         ? "2px solid #D4AF37"
//                         : "none",
//                       top: pos.includes("top") ? "-1px" : "auto",
//                       bottom: pos.includes("bottom") ? "-1px" : "auto",
//                       left: pos.includes("left") ? "-1px" : "auto",
//                       right: pos.includes("right") ? "-1px" : "auto",
//                     }}
//                   />
//                 )
//               )}

//               <div
//                 style={{
//                   fontSize: "40px",
//                   marginBottom: "20px",
//                   color: "#D4AF37",
//                 }}
//               >
//                 ✦
//               </div>
//               <h3
//                 style={{
//                   fontSize: "28px",
//                   fontWeight: 700,
//                   color: "#f5f0e8",
//                   margin: "0 0 16px",
//                 }}
//               >
//                 Make A Reservation
//               </h3>
//               <p
//                 style={{
//                   color: "rgba(245,240,232,0.6)",
//                   fontFamily: "sans-serif",
//                   fontSize: "13px",
//                   lineHeight: 1.7,
//                   marginBottom: "32px",
//                   fontWeight: 300,
//                 }}
//               >
//                 Book your table and experience the luxury of AURUM
//               </p>
//               <div
//                 style={{
//                   color: "#D4AF37",
//                   fontFamily: "sans-serif",
//                   fontSize: "18px",
//                   fontWeight: 600,
//                   marginBottom: "24px",
//                   letterSpacing: "1px",
//                 }}
//               >
//                 {merged.reservationPhone}
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{
//                   padding: "14px 36px",
//                   background: "linear-gradient(135deg, #D4AF37, #c9a227)",
//                   border: "none",
//                   color: "#0a0a0a",
//                   fontSize: "11px",
//                   letterSpacing: "3px",
//                   textTransform: "uppercase",
//                   fontWeight: 700,
//                   cursor: "pointer",
//                   fontFamily: "sans-serif",
//                 }}
//               >
//                 Book Online
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }




//////////////////////////////////


"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Client } from "@/lib/supabase";

// ═══════════════════════════════════════════════════
// ANIMATION COMPONENTS
// ═══════════════════════════════════════════════════
const FadeIn = ({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "down" | "left" | "right"; className?: string;
}) => {
  const d = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { x: 60, y: 0 }, right: { x: -60, y: 0 } };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

const ScaleIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >{children}</motion.div>
);

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EUpload Image%3C/text%3E%3C/svg%3E";

// ═══════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericPart = value.replace(/[^0-9.]/g, "");
  const nonNumeric = value.replace(/[0-9.]/g, "");
  const num = parseFloat(numericPart) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !num) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, num]);

  return (
    <span ref={ref}>
      {count}{nonNumeric}{suffix}
    </span>
  );
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
interface HomePageProps {
  client: Client;
  setPage?: (page: string) => void;
}

export default function HomePage({ client, setPage }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredSpecialty, setHoveredSpecialty] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ══════════════════════════════════════════════════
  // DATA
  // ══════════════════════════════════════════════════
  const heroImage = client.hero_image || client.hero_image_url || PLACEHOLDER;
  const featuredImage1 = client.featured_image_1 || client.hero_image_url || PLACEHOLDER;
  const featuredImage2 = client.featured_image_2 || client.products?.[0]?.image_url || PLACEHOLDER;
  const featuredImage3 = client.featured_image_3 || client.products?.[1]?.image_url || PLACEHOLDER;
  const specialtyImage1 = client.specialty_image_1 || client.products?.[0]?.image_url || client.hero_image_url || PLACEHOLDER;
  const specialtyImage2 = client.specialty_image_2 || client.products?.[1]?.image_url || client.hero_image_url || PLACEHOLDER;
  const specialtyImage3 = client.specialty_image_3 || client.products?.[2]?.image_url || client.hero_image_url || PLACEHOLDER;
  const landscapeImage = (client as any).landscape_image || client.hero_image_url || null;

  const restaurantName = client.business_name || "Restaurant";
  const tagline = client.tagline || client.about || "Welcome to our restaurant";
  const yearEstablished = client.year_established || client.established_year || "2020";
  const phone = client.phone || "";
  const email = client.email || "";
  const aboutText = client.about_short || client.about || "";

  const stats = [
    { number: client.stat_1_number || "", label: client.stat_1_label || "" },
    { number: client.stat_2_number || "", label: client.stat_2_label || "" },
    { number: client.stat_3_number || "", label: client.stat_3_label || "" },
    { number: client.stat_4_number || "", label: client.stat_4_label || "" },
  ].filter((s) => s.number && s.label);

  const specialties = client.specialties && client.specialties.length > 0
    ? client.specialties
    : [
        { title: client.specialty_1_title || "", description: client.specialty_1_desc || "", image: specialtyImage1 },
        { title: client.specialty_2_title || "", description: client.specialty_2_desc || "", image: specialtyImage2 },
        { title: client.specialty_3_title || "", description: client.specialty_3_desc || "", image: specialtyImage3 },
      ].filter((s) => s.title);

  const openingHours = client.opening_hours || [];
  const reviews = client.reviews || [];
  const marqueeText = client.marquee_text || `${restaurantName}  ✦  FINE DINING  ✦  COCKTAILS  ✦  PRIVATE EVENTS  ✦`;

  // Auto-scroll reviews on mobile
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-serif overflow-x-hidden">

      {/* ════════════════════════════════════════════════════ */}
      {/*  1. HERO                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: isMobile ? 0 : heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.3)" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent -translate-y-[60px]" />
        <div className="hidden md:block absolute top-1/2 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent translate-y-[60px]" />

        <motion.div style={{ opacity: isMobile ? 1 : heroOpacity }} className="relative z-10 w-full">
          <div className="text-center px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="h-px w-10 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] md:text-[11px] tracking-[4px] sm:tracking-[6px] uppercase font-sans font-light">
                Est. {yearEstablished}
              </span>
              <div className="h-px w-10 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] lg:tracking-[20px] mb-2 leading-none bg-gradient-to-br from-[#f5f0e8] via-[#D4AF37] to-[#f5f0e8] bg-clip-text text-transparent"
            >
              {restaurantName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base tracking-[2px] sm:tracking-[3px] md:tracking-[4px] text-[rgba(245,240,232,0.7)] uppercase font-sans font-light mt-4 sm:mt-5 md:mt-6 mb-8 sm:mb-10 md:mb-12 max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-6 sm:px-0"
            >
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-gradient-to-br from-[#D4AF37] to-[#c9a227] text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer text-center block no-underline"
                >
                  Reserve A Table
                </motion.a>
              )}
              <motion.button
                onClick={() => setPage?.("menu")}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-transparent text-[#D4AF37] border border-[rgba(212,175,55,0.5)] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer text-center block"
              >
                View Menu
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[rgba(212,175,55,0.6)] text-[10px] tracking-[4px] font-sans">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. MARQUEE                                         */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="bg-[#D4AF37] py-2.5 sm:py-3 md:py-3.5 overflow-hidden relative">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-8 sm:gap-12 md:gap-16 whitespace-nowrap w-max"
        >
          {Array(10).fill(marqueeText).map((text, i) => (
            <span key={i} className="text-[#0a0a0a] text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] font-sans font-bold">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. SPLIT SCREEN - About + Mosaic                   */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[90vh]">
        <div className="grid grid-rows-[200px_150px] sm:grid-rows-[250px_180px] md:grid-rows-[300px_200px] lg:grid-rows-[60%_40%] gap-[2px] sm:gap-[3px] bg-[#0a0a0a]">
          <ScaleIn>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage1})`, filter: "brightness(0.75)" }} />
          </ScaleIn>
          <div className="grid grid-cols-2 gap-[2px] sm:gap-[3px]">
            <FadeIn delay={0.2} direction="left">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage2})`, filter: "brightness(0.7)" }} />
            </FadeIn>
            <FadeIn delay={0.4} direction="right">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${featuredImage3})`, filter: "brightness(0.7)" }} />
            </FadeIn>
          </div>
        </div>

        <FadeIn direction="right" className="bg-[#0f0f0f]">
          <div className="flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[70px] py-12 sm:py-16 md:py-20 lg:py-0 h-full">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-8 sm:w-10 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans">Our Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] xl:text-[52px] font-bold leading-[1.1] sm:leading-[1.15] mb-5 sm:mb-6 md:mb-7 text-[#f5f0e8]">
              A Sanctuary of<br /><span className="text-[#D4AF37]">Extraordinary</span><br />Taste
            </h2>

            {aboutText && (
              <p className="text-[rgba(245,240,232,0.65)] leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-sm sm:text-[15px] mb-8 sm:mb-10 font-sans font-light max-w-lg">
                {aboutText}
              </p>
            )}

            {stats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
                {stats.map((stat, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div>
                      <div className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#D4AF37] mb-1">
                        <AnimatedCounter value={stat.number} />
                      </div>
                      <div className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] text-[rgba(245,240,232,0.5)] uppercase font-sans">{stat.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}

            <motion.button
              onClick={() => setPage?.("about")}
              whileHover={{ x: 8 }}
              className="self-start text-[#D4AF37] text-[11px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase cursor-pointer flex items-center gap-2 sm:gap-3 font-sans bg-transparent border-none"
            >
              Discover Our Story <span className="text-base sm:text-lg">→</span>
            </motion.button>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  4. SPECIALTIES                                     */}
      {/* ════════════════════════════════════════════════════ */}
      {specialties.length > 0 && (
        <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[120px] bg-[#080808]">
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">Signature Offerings</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold text-[#f5f0e8] m-0">The {restaurantName} Experience</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] sm:gap-[3px]">
            {specialties.map((item: any, i: number) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  onMouseEnter={() => setHoveredSpecialty(i)}
                  onMouseLeave={() => setHoveredSpecialty(null)}
                  className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden cursor-pointer group"
                >
                  <motion.div
                    animate={{ scale: hoveredSpecialty === i ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image || PLACEHOLDER})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.95)] via-[rgba(0,0,0,0.2)] to-transparent" />
                  <motion.div animate={{ opacity: hoveredSpecialty === i ? 1 : 0 }} className="absolute inset-0 border border-[rgba(212,175,55,0.5)] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 lg:p-10">
                    <div className="w-6 sm:w-7 md:w-[30px] h-px bg-[#D4AF37] mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-[#f5f0e8] m-0 mb-2 sm:mb-3">{item.title}</h3>
                    {item.description && (
                      <p className="text-[rgba(245,240,232,0.7)] text-xs sm:text-[13px] leading-[1.6] sm:leading-[1.7] font-sans m-0 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-sm:opacity-100">{item.description}</p>
                    )}
                  </div>
                  <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 text-4xl sm:text-5xl md:text-[60px] font-bold text-[rgba(212,175,55,0.15)] leading-none font-sans">0{i + 1}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  5. OPENING HOURS + RESERVATION - PREMIUM LUXURY    */}
      {/* ════════════════════════════════════════════════════ */}
      {(openingHours.length > 0 || phone || client.working_hours) && (
        <section className="relative px-4 sm:px-6 md:px-[5%] py-20 sm:py-24 md:py-28 lg:py-32 bg-[#0a0a0a] overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.05),transparent_60%)]" />

          {/* Floating gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
                animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          {/* Section Header */}
          <FadeIn className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="flex items-center justify-center gap-4 sm:gap-5 mb-4 sm:mb-5"
            >
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans">Visit Us</span>
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#f5f0e8]">
              We&apos;re Open &{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#f5c842] to-[#D4AF37] bg-clip-text text-transparent">
                Waiting
              </span>
            </h2>
          </FadeIn>

          {/* Main Grid */}
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 relative z-10">

            {/* LEFT - OPENING HOURS CARD */}
            <FadeIn direction="left">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative h-full bg-gradient-to-br from-[#0f0f0f] via-[#0d0d0d] to-[#080808] border border-[rgba(212,175,55,0.2)] p-8 sm:p-10 md:p-12 lg:p-14 overflow-hidden group"
              >
                <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 h-px bg-[#D4AF37]" />
                <motion.div initial={{ height: 0 }} whileInView={{ height: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 w-px bg-[#D4AF37]" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-0 right-0 h-px bg-[#D4AF37]" />
                <motion.div initial={{ height: 0 }} whileInView={{ height: 60 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-0 right-0 w-px bg-[#D4AF37]" />

                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-6 sm:mb-8"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#D4AF37] flex items-center justify-center text-2xl sm:text-3xl">
                      🕐
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="h-px w-8 sm:w-10 bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-light">
                      Opening Hours
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#f5f0e8] mb-6 sm:mb-8 leading-tight">
                    Visit Us<br />
                    <span className="text-[#D4AF37]">Anytime</span>
                  </h3>

                  {openingHours.length > 0 ? (
                    <div className="space-y-0">
                      {openingHours.map((item: any, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
                          className={`flex justify-between items-center py-4 sm:py-5 group/item ${i < openingHours.length - 1 ? "border-b border-[rgba(212,175,55,0.1)]" : ""}`}
                        >
                          <span className="text-[rgba(245,240,232,0.75)] font-sans text-sm sm:text-[15px] font-light group-hover/item:text-[#D4AF37] transition-colors">
                            {item.days}
                          </span>
                          <span className="text-[#D4AF37] font-sans text-sm sm:text-[15px] font-semibold tracking-[1px] sm:tracking-[1.5px]">
                            {item.hours}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : client.working_hours ? (
                    <div className="py-6 px-6 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.15)]">
                      <p className="text-[#f5f0e8] font-sans text-base sm:text-lg font-medium text-center">
                        {client.working_hours}
                      </p>
                    </div>
                  ) : null}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)]"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[#D4AF37]"
                    />
                    <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-semibold">
                      Now Accepting Reservations
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>

            {/* RIGHT - RESERVATION CARD */}
            {phone && (
              <FadeIn direction="right">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative h-full overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#c9a227] to-[#a88820]" />
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, #0a0a0a 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(10,10,10,0.4)] via-transparent to-transparent" />

                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />

                  <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 h-full flex flex-col justify-between min-h-[420px]">
                    <div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="inline-block mb-6 sm:mb-8"
                      >
                        <div className="text-4xl sm:text-5xl text-[#0a0a0a]">✦</div>
                      </motion.div>

                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <div className="h-px w-8 sm:w-10 bg-[#0a0a0a]" />
                        <span className="text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-bold">
                          Reserve Now
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#0a0a0a] mb-4 sm:mb-5 leading-[1.1]">
                        Book Your<br />
                        Perfect Evening
                      </h3>

                      <p className="text-[rgba(10,10,10,0.75)] font-sans text-sm sm:text-[15px] leading-[1.7] font-medium mb-8 sm:mb-10 max-w-xs">
                        Skip the wait. Reserve your table at {restaurantName} and indulge in an unforgettable culinary journey.
                      </p>
                    </div>

                    <div>
                      <motion.a
                        href={`tel:${phone}`}
                        whileHover={{ scale: 1.02 }}
                        className="block mb-5 sm:mb-6 p-4 sm:p-5 bg-[#0a0a0a] border-2 border-[#0a0a0a] hover:border-white transition-colors group/phone no-underline"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <motion.div
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                            className="text-2xl sm:text-3xl"
                          >
                            📞
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase font-sans font-semibold mb-0.5">
                              Call Direct
                            </div>
                            <div className="text-[#f5f0e8] font-sans text-base sm:text-lg md:text-xl font-bold tracking-wider group-hover/phone:text-[#D4AF37] transition-colors">
                              {phone}
                            </div>
                          </div>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[#D4AF37] text-xl sm:text-2xl"
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.a>

                      <motion.button
                        onClick={() => setPage?.("contact")}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 sm:px-8 py-4 sm:py-[18px] bg-[#0a0a0a] hover:bg-[#1a1a1a] text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer border-none transition-colors flex items-center justify-center gap-3 group/btn"
                      >
                        <span>Book Online</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-base sm:text-lg"
                        >
                          ✦
                        </motion.span>
                      </motion.button>

                      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 sm:mt-6 text-[9px] sm:text-[10px] text-[rgba(10,10,10,0.7)] font-sans uppercase tracking-[2px] font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>Instant Confirm</span>
                        </div>
                        <div className="w-px h-3 bg-[rgba(10,10,10,0.3)]" />
                        <div className="flex items-center gap-1.5">
                          <span>✓</span>
                          <span>No Fees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            )}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="max-w-[1100px] mx-auto mt-12 sm:mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent"
          />
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  6. LANDSCAPE - "Experience the Magic"              */}
      {/* ════════════════════════════════════════════════════ */}
      {landscapeImage && landscapeImage !== PLACEHOLDER && (
        <section className="relative overflow-hidden">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${landscapeImage})`, filter: "brightness(0.5)" }}
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[rgba(0,0,0,0.4)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.3)] via-transparent to-[rgba(0,0,0,0.3)]" />

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-40"
                  style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                  animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center px-4 max-w-3xl"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
                >
                  <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl"
                  >
                    ✦
                  </motion.span>
                  <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]"
                >
                  Experience the<br />
                  <span className="bg-gradient-to-r from-[#D4AF37] via-[#f5c842] to-[#D4AF37] bg-clip-text text-transparent">
                    Magic
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-[rgba(255,255,255,0.65)] font-sans text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed"
                >
                  Where culinary artistry meets unforgettable ambiance — every visit becomes a cherished memory
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mt-8 sm:mt-10"
                >
                  <motion.button
                    onClick={() => setPage?.("gallery")}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 border border-[#D4AF37] text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer bg-transparent hover:bg-[rgba(212,175,55,0.1)] transition-colors"
                  >
                    Explore Gallery →
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  7. WHY CHOOSE US                                   */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] m-0">
              Crafted for <span className="text-[#D4AF37]">Perfection</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[1200px] mx-auto">
            {[
              { icon: "🍷", title: "Premium Ingredients", desc: "Sourced from the finest local and international suppliers" },
              { icon: "👨‍🍳", title: "Expert Chefs", desc: "Award-winning culinary team crafting every dish to perfection" },
              { icon: "🎵", title: "Unique Ambiance", desc: "Immersive atmosphere designed for unforgettable evenings" },
              { icon: "⭐", title: "5-Star Service", desc: "Dedicated team ensuring every guest feels like royalty" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-[#0f0f0f] border border-[rgba(212,175,55,0.1)] p-6 sm:p-8 relative group cursor-pointer overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute top-0 left-0 h-[2px] bg-[#D4AF37]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-3xl sm:text-4xl mb-4 sm:mb-5 inline-block"
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-bold text-[#f5f0e8] mb-2 sm:mb-3">{card.title}</h3>
                  <p className="text-[rgba(245,240,232,0.5)] font-sans text-xs sm:text-[13px] leading-[1.6] sm:leading-[1.7] font-light m-0">{card.desc}</p>
                </div>

                <div className="absolute bottom-3 right-3 text-[rgba(212,175,55,0.1)] text-3xl sm:text-4xl font-sans font-bold">0{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  8. REVIEWS - Auto-Scrolling Carousel               */}
      {/* ════════════════════════════════════════════════════ */}
      {reviews.length > 0 && (
        <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] bg-[#0a0a0a] overflow-hidden">
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16">
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-5">Guest Experiences</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f0e8] m-0">What Our Guests Say</h2>
          </FadeIn>

          {/* MOBILE: Single card auto-scroll */}
          <div className="md:hidden relative max-w-md mx-auto">
            <div className="overflow-hidden">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0f0f0f] border border-[rgba(212,175,55,0.1)] p-6 sm:p-7 relative"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.3)] to-transparent" />
                <div className="text-4xl text-[#D4AF37] leading-none font-serif opacity-50 mb-3">&ldquo;</div>
                <p className="text-[rgba(245,240,232,0.7)] font-sans text-xs sm:text-[13px] leading-[1.7] mb-5 font-light italic">
                  {reviews[reviewIndex]?.text}
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[#f5f0e8] font-sans text-xs sm:text-sm font-semibold">{reviews[reviewIndex]?.name}</div>
                    {reviews[reviewIndex]?.role && (
                      <div className="text-[rgba(245,240,232,0.4)] font-sans text-[10px]">{reviews[reviewIndex]?.role}</div>
                    )}
                    {reviews[reviewIndex]?.rating && (
                      <div className="text-[#D4AF37] text-[10px] tracking-wider">
                        {"★".repeat(Math.floor(Number(reviews[reviewIndex]?.rating)))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === reviewIndex ? "bg-[#D4AF37] w-6" : "bg-[rgba(212,175,55,0.3)]"}`}
                />
              ))}
            </div>
          </div>

          {/* DESKTOP: Infinite horizontal scroll */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: [0, -(reviews.length * 420)] }}
                transition={{ x: { duration: reviews.length * 6, repeat: Infinity, ease: "linear" } }}
                className="flex gap-5"
                style={{ width: "max-content" }}
              >
                {[...reviews, ...reviews, ...reviews].map((review: any, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="w-[380px] shrink-0 bg-[#0f0f0f] border border-[rgba(212,175,55,0.1)] p-7 md:p-8 relative group cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.3)] to-transparent" />
                    <motion.div className="absolute inset-0 border border-[rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="text-4xl sm:text-5xl text-[#D4AF37] leading-none font-serif opacity-50 mb-3 sm:mb-4">&ldquo;</div>
                    <p className="text-[rgba(245,240,232,0.7)] font-sans text-[13px] leading-[1.8] mb-5 sm:mb-6 font-light italic line-clamp-4">
                      {review.text || review.content || review.message}
                    </p>
                    <div className="flex items-center gap-3">
                      {review.image && (
                        <img src={review.image} alt={review.name || "Guest"} className="w-10 h-10 rounded-full object-cover border border-[rgba(212,175,55,0.3)]" />
                      )}
                      <div>
                        <div className="text-[#f5f0e8] font-sans text-sm font-semibold">{review.name || review.author}</div>
                        {review.role && <div className="text-[rgba(245,240,232,0.4)] font-sans text-xs">{review.role}</div>}
                        {review.rating && (
                          <div className="text-[#D4AF37] text-xs tracking-wider">
                            {"★".repeat(Math.floor(Number(review.rating)))}{"☆".repeat(5 - Math.floor(Number(review.rating)))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  9. BOTTOM CTA                                      */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredImage2 !== PLACEHOLDER ? featuredImage2 : heroImage})`, filter: "brightness(0.15)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.5)]" />

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-4 sm:mb-5 md:mb-6">
              Ready for an <span className="text-[#D4AF37]">Unforgettable</span> Evening?
            </h2>
            <p className="text-[rgba(245,240,232,0.6)] font-sans text-xs sm:text-sm md:text-base mb-8 sm:mb-10 font-light max-w-md sm:max-w-lg mx-auto">
              Reserve your table at {restaurantName} and let us craft an experience you&apos;ll remember forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {phone && (
                <motion.a href={`tel:${phone}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-gradient-to-br from-[#D4AF37] to-[#c9a227] text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer no-underline text-center block"
                >Call {phone}</motion.a>
              )}
              <motion.button onClick={() => setPage?.("contact")} whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.1)" }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-transparent text-[#D4AF37] border border-[rgba(212,175,55,0.5)] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-light cursor-pointer text-center block"
              >Contact Us</motion.button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}