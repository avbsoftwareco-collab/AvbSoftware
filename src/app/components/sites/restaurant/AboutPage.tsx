// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// interface TeamMember {
//   name: string;
//   role: string;
//   bio: string;
//   image: string;
// }

// interface RestaurantAboutProps {
//   restaurantName?: string;
//   heroImage?: string;
//   aboutImage?: string;
//   storyImages?: string[];
//   chefName?: string;
//   chefImage?: string;
//   chefQuote?: string;
//   teamMembers?: TeamMember[];
//   awards?: { title: string; year: string; org: string }[];
//   story?: {
//     heading: string;
//     paragraphs: string[];
//   };
// }

// const defaultProps: RestaurantAboutProps = {
//   restaurantName: "AURUM",
//   heroImage:
//     "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&q=80",
//   aboutImage:
//     "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
//   storyImages: [
//     "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
//     "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
//   ],
//   chefName: "Chef Marco Bellini",
//   chefImage:
//     "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
//   chefQuote:
//     "Food is not just nourishment — it is art, memory, and emotion served on a plate.",
//   teamMembers: [
//     {
//       name: "Marco Bellini",
//       role: "Executive Chef",
//       bio: "Michelin-starred chef with 20 years across Paris, Milan and New York.",
//       image:
//         "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
//     },
//     {
//       name: "Sophie Laurent",
//       role: "Head Sommelier",
//       bio: "Award-winning sommelier curating world-class wine experiences.",
//       image:
//         "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
//     },
//     {
//       name: "Raj Kapoor",
//       role: "Bar Director",
//       bio: "Pioneering mixologist known for his innovative cocktail philosophy.",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     },
//   ],
//   awards: [
//     { title: "Restaurant of the Year", year: "2024", org: "City Dining Awards" },
//     { title: "Best Cocktail Bar", year: "2023", org: "National Bar Guild" },
//     { title: "Michelin Recommended", year: "2022", org: "Michelin Guide" },
//     { title: "Best Ambiance", year: "2023", org: "Luxury Living Magazine" },
//   ],
//   story: {
//     heading: "Born From Passion, Crafted With Purpose",
//     paragraphs: [
//       "AURUM was born from a singular vision: to create a space where extraordinary food, impeccable service, and breathtaking design converge into one unforgettable experience.",
//       "Founded in 2020 by a team of culinary visionaries, we set out to redefine what a restaurant could be. Not just a place to eat, but a destination — a sanctuary where every visit tells a story.",
//       "From our hand-selected ingredients to our bespoke interiors, every element of AURUM has been curated with obsessive attention to detail. We believe that true luxury lies in the details you almost miss.",
//     ],
//   },
// };

// export default function AboutPage(props: RestaurantAboutProps) {
//   const merged = { ...defaultProps, ...props };
//   const heroRef = useRef<HTMLDivElement>(null);
//   const chefRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress: heroScroll } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);

//   const { scrollYProgress: chefScroll } = useScroll({
//     target: chefRef,
//     offset: ["start end", "end start"],
//   });
//   const chefX = useTransform(chefScroll, [0, 1], ["-5%", "5%"]);

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
//       {/* HERO - Full Width with Parallax */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         ref={heroRef}
//         style={{
//           position: "relative",
//           height: "70vh",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "flex-end",
//           justifyContent: "flex-start",
//         }}
//       >
//         <motion.div
//           style={{ y: heroY, position: "absolute", inset: 0 }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${merged.heroImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center top",
//               filter: "brightness(0.3)",
//             }}
//           />
//         </motion.div>

//         {/* Diagonal overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 60%)",
//           }}
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           style={{
//             position: "relative",
//             zIndex: 10,
//             padding: "0 8% 80px",
//           }}
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
//             About Us
//           </span>
//           <h1
//             style={{
//               fontSize: "clamp(48px, 7vw, 90px)",
//               fontWeight: 700,
//               margin: 0,
//               lineHeight: 1.05,
//               color: "#f5f0e8",
//             }}
//           >
//             Our
//             <br />
//             <span
//               style={{
//                 background: "linear-gradient(135deg, #D4AF37, #f5c842)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               Legacy
//             </span>
//           </h1>
//         </motion.div>

//         {/* Gold line at bottom */}
//         <div
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "2px",
//             background:
//               "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3), transparent)",
//           }}
//         />
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* STORY - Split Screen with DIFFERENT Image */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           minHeight: "80vh",
//         }}
//       >
//         {/* Left Content */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           style={{
//             padding: "100px 80px",
//             backgroundColor: "#0f0f0f",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "16px",
//               marginBottom: "40px",
//             }}
//           >
//             <div
//               style={{
//                 width: "50px",
//                 height: "1px",
//                 backgroundColor: "#D4AF37",
//               }}
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
//               The Story
//             </span>
//           </div>

//           <h2
//             style={{
//               fontSize: "clamp(28px, 3.5vw, 44px)",
//               fontWeight: 700,
//               lineHeight: 1.2,
//               margin: "0 0 36px",
//               color: "#f5f0e8",
//             }}
//           >
//             {merged.story?.heading}
//           </h2>

//           {merged.story?.paragraphs.map((para, i) => (
//             <motion.p
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15, duration: 0.7 }}
//               style={{
//                 color: "rgba(245,240,232,0.65)",
//                 lineHeight: 1.9,
//                 fontSize: "14px",
//                 marginBottom: "20px",
//                 fontFamily: "sans-serif",
//                 fontWeight: 300,
//               }}
//             >
//               {para}
//             </motion.p>
//           ))}

//           {/* Small gallery strip */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "8px",
//               marginTop: "40px",
//             }}
//           >
//             {merged.storyImages?.map((img, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//                 style={{
//                   height: "160px",
//                   backgroundImage: `url(${img})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   filter: "brightness(0.75) sepia(0.2)",
//                 }}
//               />
//             ))}
//           </div>
//         </motion.div>

//         {/* Right - ABOUT IMAGE (Different from Hero) */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           style={{ position: "relative", overflow: "hidden" }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${merged.aboutImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               filter: "brightness(0.6) sepia(0.15)",
//             }}
//           />

//           {/* Gradient overlay */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(212,175,55,0.05))",
//             }}
//           />

//           {/* Stats overlay */}
//           <div
//             style={{
//               position: "absolute",
//               bottom: "60px",
//               right: "40px",
//               backgroundColor: "rgba(0,0,0,0.85)",
//               border: "1px solid rgba(212,175,55,0.3)",
//               padding: "32px 40px",
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             <div
//               style={{
//                 fontSize: "52px",
//                 fontWeight: 700,
//                 color: "#D4AF37",
//                 lineHeight: 1,
//               }}
//             >
//               2020
//             </div>
//             <div
//               style={{
//                 color: "rgba(245,240,232,0.7)",
//                 fontFamily: "sans-serif",
//                 fontSize: "11px",
//                 letterSpacing: "3px",
//                 textTransform: "uppercase",
//                 marginTop: "8px",
//               }}
//             >
//               Founded
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* CHEF SECTION - Magazine Style */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         ref={chefRef}
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           backgroundColor: "#080808",
//         }}
//       >
//         {/* Background parallax image */}
//         <motion.div
//           style={{
//             x: chefX,
//             position: "absolute",
//             inset: "-10%",
//             backgroundImage: `url(${merged.chefImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             filter: "brightness(0.15) blur(2px)",
//           }}
//         />

//         <div
//           style={{
//             position: "relative",
//             zIndex: 10,
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             minHeight: "80vh",
//           }}
//         >
//           {/* Chef Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//             style={{ position: "relative" }}
//           >
//             <div
//               style={{
//                 margin: "60px 0 60px 60px",
//                 height: "calc(100% - 120px)",
//                 minHeight: "500px",
//                 backgroundImage: `url(${merged.chefImage})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center top",
//                 filter: "brightness(0.85)",
//               }}
//             />
//             {/* Gold frame accent */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "40px",
//                 left: "40px",
//                 right: "20px",
//                 bottom: "40px",
//                 border: "1px solid rgba(212,175,55,0.3)",
//                 pointerEvents: "none",
//               }}
//             />
//           </motion.div>

//           {/* Chef Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.9, delay: 0.2 }}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               padding: "80px 80px 80px 60px",
//             }}
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
//               The Mastermind
//             </span>

//             {/* Quote */}
//             <div
//               style={{
//                 fontSize: "60px",
//                 color: "#D4AF37",
//                 lineHeight: 0.5,
//                 marginBottom: "24px",
//                 fontFamily: "Georgia, serif",
//               }}
//             >
//               "
//             </div>
//             <p
//               style={{
//                 fontSize: "clamp(18px, 2.5vw, 26px)",
//                 lineHeight: 1.5,
//                 color: "#f5f0e8",
//                 fontStyle: "italic",
//                 margin: "0 0 40px",
//                 fontWeight: 400,
//               }}
//             >
//               {merged.chefQuote}
//             </p>

//             <div
//               style={{
//                 width: "60px",
//                 height: "1px",
//                 backgroundColor: "#D4AF37",
//                 marginBottom: "24px",
//               }}
//             />

//             <h3
//               style={{
//                 fontSize: "24px",
//                 fontWeight: 700,
//                 color: "#f5f0e8",
//                 margin: "0 0 8px",
//               }}
//             >
//               {merged.chefName}
//             </h3>
//             <p
//               style={{
//                 color: "#D4AF37",
//                 fontFamily: "sans-serif",
//                 fontSize: "12px",
//                 letterSpacing: "3px",
//                 textTransform: "uppercase",
//                 margin: 0,
//               }}
//             >
//               Executive Chef & Founder
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* TEAM MEMBERS */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           padding: "120px 5%",
//           backgroundColor: "#0a0a0a",
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
//             Our People
//           </span>
//           <h2
//             style={{
//               fontSize: "clamp(32px, 4.5vw, 56px)",
//               fontWeight: 700,
//               color: "#f5f0e8",
//               margin: 0,
//             }}
//           >
//             The Team Behind Aurum
//           </h2>
//         </motion.div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: "2px",
//             maxWidth: "1200px",
//             margin: "0 auto",
//           }}
//         >
//           {merged.teamMembers?.map((member, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15, duration: 0.8 }}
//               whileHover={{ y: -8 }}
//               style={{
//                 backgroundColor: "#0f0f0f",
//                 overflow: "hidden",
//               }}
//             >
//               {/* Image */}
//               <div
//                 style={{
//                   height: "320px",
//                   backgroundImage: `url(${member.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center top",
//                   filter: "brightness(0.8) grayscale(0.3)",
//                   position: "relative",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     height: "60px",
//                     background:
//                       "linear-gradient(to top, #0f0f0f, transparent)",
//                   }}
//                 />
//               </div>

//               {/* Content */}
//               <div style={{ padding: "28px 32px 36px" }}>
//                 <div
//                   style={{
//                     width: "24px",
//                     height: "1px",
//                     backgroundColor: "#D4AF37",
//                     marginBottom: "16px",
//                   }}
//                 />
//                 <h3
//                   style={{
//                     fontSize: "20px",
//                     fontWeight: 700,
//                     color: "#f5f0e8",
//                     margin: "0 0 6px",
//                   }}
//                 >
//                   {member.name}
//                 </h3>
//                 <p
//                   style={{
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "11px",
//                     letterSpacing: "2px",
//                     textTransform: "uppercase",
//                     margin: "0 0 16px",
//                   }}
//                 >
//                   {member.role}
//                 </p>
//                 <p
//                   style={{
//                     color: "rgba(245,240,232,0.6)",
//                     fontFamily: "sans-serif",
//                     fontSize: "13px",
//                     lineHeight: 1.7,
//                     margin: 0,
//                     fontWeight: 300,
//                   }}
//                 >
//                   {member.bio}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* AWARDS */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           padding: "80px 5%",
//           backgroundColor: "#0f0f0f",
//           borderTop: "1px solid rgba(212,175,55,0.15)",
//         }}
//       >
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             style={{ textAlign: "center", marginBottom: "60px" }}
//           >
//             <h2
//               style={{
//                 fontSize: "clamp(28px, 3.5vw, 44px)",
//                 fontWeight: 700,
//                 color: "#f5f0e8",
//                 margin: 0,
//               }}
//             >
//               Recognition & Awards
//             </h2>
//           </motion.div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4, 1fr)",
//               gap: "1px",
//               backgroundColor: "rgba(212,175,55,0.1)",
//             }}
//           >
//             {merged.awards?.map((award, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//                 style={{
//                   backgroundColor: "#0f0f0f",
//                   padding: "48px 32px",
//                   textAlign: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     color: "#D4AF37",
//                     fontSize: "28px",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   ✦
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "28px",
//                     fontWeight: 700,
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   {award.year}
//                 </div>
//                 <h4
//                   style={{
//                     fontSize: "15px",
//                     fontWeight: 700,
//                     color: "#f5f0e8",
//                     margin: "0 0 8px",
//                     lineHeight: 1.3,
//                   }}
//                 >
//                   {award.title}
//                 </h4>
//                 <p
//                   style={{
//                     color: "rgba(245,240,232,0.5)",
//                     fontFamily: "sans-serif",
//                     fontSize: "11px",
//                     letterSpacing: "2px",
//                     margin: 0,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {award.org}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }




"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Client } from "@/lib/supabase";

// ═══════════════════════════════════════════════════
// ANIMATIONS
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

export default function AboutPage({ client }: { client: Client }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // ══════════════════════════════════════════════════
  // IMAGES
  // ══════════════════════════════════════════════════
  const heroImage = client.about_hero_image || client.hero_image || client.hero_image_url || PLACEHOLDER;
  const aboutImage = client.about_image || client.hero_image_url || PLACEHOLDER;
  const chefImage = client.chef_image || client.logo_url || PLACEHOLDER;
  const storyImage1 = client.story_image_1 || client.featured_image_2 || client.products?.[0]?.image_url || PLACEHOLDER;
  const storyImage2 = client.story_image_2 || client.featured_image_3 || client.products?.[1]?.image_url || PLACEHOLDER;

  // ══════════════════════════════════════════════════
  // DATA - All Dynamic
  // ══════════════════════════════════════════════════
  const restaurantName = client.business_name || "Restaurant";
  const yearEstablished = client.year_established || client.established_year || "2020";
  const currentYear = new Date().getFullYear();
  const yearsRunning = parseInt(yearEstablished) ? currentYear - parseInt(yearEstablished) : 5;

  const chefName = client.chef_name || client.owner_name || "";
  const chefQuote = client.chef_quote || "";
  const chefRole = client.chef_role || "Executive Chef";

  const storyHeading = client.story_heading || client.about_heading || "Born From Passion, Crafted With Purpose";
  
  // Auto-generate story paragraphs - FIXED with explicit type
  const storyParagraphs: string[] = (() => {
    if (client.story_paragraphs && client.story_paragraphs.length > 0) {
      return client.story_paragraphs as string[];
    }
    const paragraphs: string[] = [
      client.about_text,
      client.about_text_2,
      client.about,
    ].filter((p): p is string => Boolean(p));
    
    if (paragraphs.length > 0) return paragraphs;
    
    return [
      `Founded in ${yearEstablished}, ${restaurantName} began as a passionate vision to redefine the dining experience in ${client.city || "the city"}. What started as a dream has now blossomed into a beloved destination for food enthusiasts and connoisseurs alike.`,
      `Over the years, we have remained committed to one simple philosophy — exceptional ingredients, authentic flavors, and an atmosphere that turns every meal into a cherished memory. Our journey is built on the trust of countless guests who walk through our doors.`,
      `Today, ${restaurantName} stands as a testament to what's possible when passion meets perfection. Every dish tells a story, every detail matters, and every guest becomes part of our family.`,
    ];
  })();

  const teamMembers: any[] = client.team_members || [];
  const awards: any[] = client.awards || [];

  // ══════════════════════════════════════════════════
  // MISSION & VISION
  // ══════════════════════════════════════════════════
  const mission: string = (client as any).mission || 
    `To deliver an unforgettable culinary journey that celebrates authentic flavors, premium ingredients, and warm hospitality — making every visit to ${restaurantName} a moment worth remembering.`;
  
  const vision: string = (client as any).vision || 
    `To become ${client.city || "the city"}'s most loved dining destination, where tradition meets innovation, and where every guest leaves with a smile and a story to share.`;

  // ══════════════════════════════════════════════════
  // CORE VALUES
  // ══════════════════════════════════════════════════
  const values = [
    {
      icon: "🌿",
      title: "Quality First",
      desc: "We source only the finest ingredients from trusted local and global suppliers, ensuring every dish meets our uncompromising standards.",
    },
    {
      icon: "❤️",
      title: "Passion Driven",
      desc: "Our team pours their heart into every plate, treating cooking as an art form and hospitality as a sacred calling.",
    },
    {
      icon: "✨",
      title: "Authentic Experience",
      desc: "We believe in preserving traditional techniques while embracing modern creativity to create unique flavor experiences.",
    },
    {
      icon: "🤝",
      title: "Guest Family",
      desc: "Every guest who walks in is treated like family. Your comfort, satisfaction, and happiness are our highest priorities.",
    },
  ];

  // ══════════════════════════════════════════════════
  // JOURNEY TIMELINE
  // ══════════════════════════════════════════════════
  const timeline = [
    { year: yearEstablished, title: "The Beginning", desc: `${restaurantName} opened its doors with a vision to revolutionize the dining scene.` },
    { year: String(parseInt(yearEstablished) + Math.floor(yearsRunning / 3)), title: "Growing Recognition", desc: "Earned love from thousands of guests and established our signature style." },
    { year: String(parseInt(yearEstablished) + Math.floor((yearsRunning * 2) / 3)), title: "Award Winning", desc: "Recognized for culinary excellence and outstanding service in the region." },
    { year: String(currentYear), title: "Today & Beyond", desc: "Continuing to innovate and serve unforgettable experiences to our cherished guests." },
  ];

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-serif overflow-x-hidden">

      {/* ════════════════════════════════════════════════════ */}
      {/*  1. HERO                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] overflow-hidden flex items-end justify-start"
      >
        <motion.div style={{ y: isMobile ? 0 : heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})`, filter: "brightness(0.3)" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.8)] via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 px-4 sm:px-6 md:px-[5%] lg:px-[8%] pb-12 sm:pb-16 md:pb-20"
        >
          <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">
            About {restaurantName}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold m-0 leading-[1.05]">
            Our<br />
            <span className="bg-gradient-to-br from-[#D4AF37] to-[#f5c842] bg-clip-text text-transparent">
              Legacy
            </span>
          </h1>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.3)] to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  2. INTRO STATS BAR                                 */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] border-b border-[rgba(212,175,55,0.15)] py-10 sm:py-12 md:py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {[
            { number: yearEstablished, label: "Founded" },
            { number: `${yearsRunning}+`, label: "Years of Excellence" },
            { number: client.happy_customers || "10K+", label: "Happy Guests" },
            { number: awards.length > 0 ? `${awards.length}+` : "5+", label: "Awards Won" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37] mb-1 sm:mb-2 leading-none">
                  {stat.number}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] text-[rgba(245,240,232,0.5)] uppercase font-sans">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  3. STORY - Split Screen                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[80vh]">
        <FadeIn direction="left" className="bg-[#0f0f0f] order-2 lg:order-1">
          <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-[100px]">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
              <div className="w-8 sm:w-10 md:w-[50px] h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans">
                The Story
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] xl:text-[44px] font-bold leading-[1.15] sm:leading-[1.2] mb-6 sm:mb-8 md:mb-9 text-[#f5f0e8]">
              {storyHeading}
            </h2>

            {storyParagraphs.map((para, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <p className="text-[rgba(245,240,232,0.7)] leading-[1.7] sm:leading-[1.8] md:leading-[1.9] text-sm sm:text-[15px] mb-5 sm:mb-6 font-sans font-light">
                  {para}
                </p>
              </FadeIn>
            ))}

            {(storyImage1 !== PLACEHOLDER || storyImage2 !== PLACEHOLDER) && (
              <div className="grid grid-cols-2 gap-2 sm:gap-[8px] mt-6 sm:mt-8 md:mt-10">
                {[storyImage1, storyImage2].filter(img => img !== PLACEHOLDER).map((img, i) => (
                  <ScaleIn key={i} delay={i * 0.1}>
                    <div
                      className="h-28 sm:h-32 md:h-36 lg:h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})`, filter: "brightness(0.75) sepia(0.2)" }}
                    />
                  </ScaleIn>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn direction="right" className="relative overflow-hidden order-1 lg:order-2 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${aboutImage})`, filter: "brightness(0.6) sepia(0.15)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(212,175,55,0.05)]" />

          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-6 md:bottom-12 md:right-8 lg:bottom-[60px] lg:right-10 bg-[rgba(0,0,0,0.85)] border border-[rgba(212,175,55,0.3)] p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-[10px]">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#D4AF37] leading-none">
              {yearEstablished}
            </div>
            <div className="text-[rgba(245,240,232,0.7)] font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[2px] sm:tracking-[3px] uppercase mt-1 sm:mt-2">
              Founded
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  4. MISSION & VISION CARDS                          */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 md:px-[5%] py-20 sm:py-24 md:py-28 lg:py-32 bg-[#080808] overflow-hidden">
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

        <FadeIn className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
          <div className="flex items-center justify-center gap-4 sm:gap-5 mb-4 sm:mb-5">
            <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans">
              Our Purpose
            </span>
            <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#f5f0e8]">
            Mission & <span className="bg-gradient-to-r from-[#D4AF37] via-[#f5c842] to-[#D4AF37] bg-clip-text text-transparent">Vision</span>
          </h2>
        </FadeIn>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 relative z-10">

          {/* MISSION CARD */}
          <FadeIn direction="left">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative h-full bg-gradient-to-br from-[#0f0f0f] via-[#0d0d0d] to-[#080808] border border-[rgba(212,175,55,0.2)] p-8 sm:p-10 md:p-12 lg:p-14 overflow-hidden group"
            >
              <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 h-px bg-[#D4AF37]" />
              <motion.div initial={{ height: 0 }} whileInView={{ height: 80 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="absolute top-0 left-0 w-px bg-[#D4AF37]" />

              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="inline-block mb-6 sm:mb-8"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-3xl sm:text-4xl bg-[rgba(212,175,55,0.05)]">
                    🎯
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="h-px w-8 sm:w-10 bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-light">
                    Our Mission
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#f5f0e8] mb-5 sm:mb-6 leading-[1.15]">
                  What Drives <span className="text-[#D4AF37]">Us</span>
                </h3>

                <p className="text-[rgba(245,240,232,0.7)] font-sans text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.9] font-light italic">
                  &ldquo;{mission}&rdquo;
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-8 sm:mt-10 h-px bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.3)] to-transparent"
                />
              </div>
            </motion.div>
          </FadeIn>

          {/* VISION CARD */}
          <FadeIn direction="right">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative h-full overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#c9a227] to-[#a88820]" />
              
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, #0a0a0a 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(10,10,10,0.5)] via-transparent to-transparent" />

              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />

              <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block mb-6 sm:mb-8"
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-3xl sm:text-4xl bg-[rgba(10,10,10,0.1)]">
                    🌟
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="h-px w-8 sm:w-10 bg-[#0a0a0a]" />
                  <span className="text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[4px] sm:tracking-[5px] uppercase font-sans font-bold">
                    Our Vision
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#0a0a0a] mb-5 sm:mb-6 leading-[1.15]">
                  Where We&apos;re Headed
                </h3>

                <p className="text-[rgba(10,10,10,0.85)] font-sans text-sm sm:text-[15px] md:text-base leading-[1.8] sm:leading-[1.9] font-medium italic">
                  &ldquo;{vision}&rdquo;
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-8 sm:mt-10 h-px bg-gradient-to-r from-[#0a0a0a] via-[rgba(10,10,10,0.3)] to-transparent"
                />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  5. CORE VALUES                                     */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] bg-[#0a0a0a]">
        <FadeIn className="text-center mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">
            What We Stand For
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#f5f0e8] m-0">
            Our Core <span className="text-[#D4AF37]">Values</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[1200px] mx-auto">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -12 }}
              className="bg-[#0f0f0f] border border-[rgba(212,175,55,0.1)] p-6 sm:p-7 md:p-8 relative group cursor-pointer overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-[#D4AF37]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-3xl sm:text-4xl mb-4 sm:mb-5 inline-block"
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f5f0e8] mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-[rgba(245,240,232,0.55)] font-sans text-xs sm:text-[13px] leading-[1.7] font-light m-0">
                  {value.desc}
                </p>
              </div>

              <div className="absolute bottom-3 right-3 text-[rgba(212,175,55,0.1)] text-3xl sm:text-4xl font-sans font-bold">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  6. JOURNEY TIMELINE                                */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[100px] bg-[#080808] relative overflow-hidden">
        <FadeIn className="text-center mb-12 sm:mb-14 md:mb-16">
          <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#f5f0e8] m-0">
            A Story of <span className="text-[#D4AF37]">Growth</span>
          </h2>
        </FadeIn>

        <div className="max-w-[900px] mx-auto relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.3)] to-transparent -translate-x-1/2" />
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.3)] to-transparent" />

          {timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative mb-8 sm:mb-10 md:mb-12 md:flex md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`absolute md:relative md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} left-0 md:left-auto`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                    className="hidden md:inline-block"
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4AF37]">
                      {item.year}
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.5, type: "spring", stiffness: 300 }}
                    className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D4AF37] border-4 border-[#080808]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="absolute inset-0 rounded-full bg-[#D4AF37]"
                    />
                  </motion.div>
                </div>

                <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <div className="md:hidden text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-2">
                    {item.year}
                  </div>
                  
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative bg-[#0f0f0f] border border-[rgba(212,175,55,0.15)] p-5 sm:p-6 md:p-7 group"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37] via-[rgba(212,175,55,0.3)] to-transparent" />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f5f0e8] mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[rgba(245,240,232,0.6)] font-sans text-xs sm:text-[13px] md:text-sm leading-[1.7] font-light m-0">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  7. CHEF SECTION                                    */}
      {/* ════════════════════════════════════════════════════ */}
      {(chefName || chefQuote) && (
        <section className="relative overflow-hidden bg-[#0a0a0a]">
          <div
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{ backgroundImage: `url(${chefImage})`, filter: "brightness(0.12) blur(3px)" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-[80vh]">
            <ScaleIn className="relative">
              <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-[60px] my-6 sm:my-8 md:my-10 lg:my-[60px] relative">
                <div
                  className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center bg-top"
                  style={{ backgroundImage: `url(${chefImage})`, filter: "brightness(0.85)" }}
                />
                <div className="hidden md:block absolute -top-4 -left-4 lg:-top-5 lg:-left-5 right-4 lg:right-5 bottom-4 lg:bottom-5 border border-[rgba(212,175,55,0.3)] pointer-events-none" />
              </div>
            </ScaleIn>

            <FadeIn direction="right" className="flex flex-col justify-center">
              <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-0">
                <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-sans block mb-5 sm:mb-6 md:mb-8">
                  The Mastermind
                </span>

                {chefQuote && (
                  <>
                    <div className="text-4xl sm:text-5xl md:text-[60px] text-[#D4AF37] leading-[0.5] mb-4 sm:mb-5 md:mb-6 font-serif">
                      &ldquo;
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-[1.4] sm:leading-[1.5] text-[#f5f0e8] italic m-0 mb-6 sm:mb-8 md:mb-10 font-normal max-w-lg">
                      {chefQuote}
                    </p>
                  </>
                )}

                <div className="w-10 sm:w-12 md:w-[60px] h-px bg-[#D4AF37] mb-4 sm:mb-5 md:mb-6" />

                {chefName && (
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f5f0e8] m-0 mb-1 sm:mb-2">
                    {chefName}
                  </h3>
                )}
                <p className="text-[#D4AF37] font-sans text-[10px] sm:text-[11px] md:text-xs tracking-[2px] sm:tracking-[3px] uppercase m-0">
                  {chefRole}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  8. TEAM MEMBERS                                    */}
      {/* ════════════════════════════════════════════════════ */}
      {teamMembers.length > 0 && (
        <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 lg:py-[120px] bg-[#080808]">
          <FadeIn className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans block mb-3 sm:mb-4 md:mb-5">
              Our People
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#f5f0e8] m-0">
              The Team Behind {restaurantName}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] sm:gap-[3px] max-w-[1200px] mx-auto">
            {teamMembers.map((member, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -8 }} className="bg-[#0f0f0f] overflow-hidden">
                  <div
                    className="h-48 sm:h-56 md:h-64 lg:h-[320px] bg-cover bg-center bg-top relative"
                    style={{ backgroundImage: `url(${member.image || PLACEHOLDER})`, filter: "brightness(0.8) grayscale(0.3)" }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                    <div className="w-5 sm:w-6 h-px bg-[#D4AF37] mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f5f0e8] m-0 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#D4AF37] font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase m-0 mb-3 sm:mb-4">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-[rgba(245,240,232,0.6)] font-sans text-[11px] sm:text-xs md:text-[13px] leading-[1.6] sm:leading-[1.7] m-0 font-light">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  9. AWARDS                                          */}
      {/* ════════════════════════════════════════════════════ */}
      {awards.length > 0 && (
        <section className="px-4 sm:px-6 md:px-[5%] py-12 sm:py-16 md:py-20 bg-[#0f0f0f] border-t border-[rgba(212,175,55,0.15)]">
          <div className="max-w-[1100px] mx-auto">
            <FadeIn className="text-center mb-10 sm:mb-12 md:mb-[60px]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-[#f5f0e8] m-0">
                Recognition & Awards
              </h2>
            </FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(212,175,55,0.1)]">
              {awards.map((award, i) => (
                <ScaleIn key={i} delay={i * 0.1}>
                  <div className="bg-[#0f0f0f] p-6 sm:p-8 md:p-10 lg:p-12 text-center">
                    <div className="text-[#D4AF37] text-xl sm:text-2xl mb-3 sm:mb-4">✦</div>
                    <div className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#D4AF37] font-sans mb-2 sm:mb-3">
                      {award.year}
                    </div>
                    <h4 className="text-xs sm:text-sm md:text-[15px] font-bold text-[#f5f0e8] m-0 mb-1 sm:mb-2 leading-[1.3]">
                      {award.title}
                    </h4>
                    <p className="text-[rgba(245,240,232,0.5)] font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1px] sm:tracking-[2px] m-0 uppercase">
                      {award.org || award.organization}
                    </p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════ */}
      {/*  10. CTA                                            */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-[5%] py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#080808] via-[#0a0a0a] to-[#080808] border-t border-[rgba(212,175,55,0.15)]">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <div className="text-4xl sm:text-5xl text-[#D4AF37] mb-6 sm:mb-8">✦</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-4 sm:mb-6">
            Become Part of Our <span className="text-[#D4AF37]">Story</span>
          </h2>
          <p className="text-[rgba(245,240,232,0.6)] font-sans text-sm sm:text-base mb-8 sm:mb-10 font-light leading-relaxed">
            Every guest at {restaurantName} adds a beautiful chapter to our journey. We&apos;d love to welcome you to our family.
          </p>
          {client.phone && (
            <motion.a
              href={`tel:${client.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 bg-gradient-to-br from-[#D4AF37] to-[#c9a227] text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] uppercase font-sans font-bold cursor-pointer no-underline"
            >
              Reserve Your Table
            </motion.a>
          )}
        </FadeIn>
      </section>
    </div>
  );
}