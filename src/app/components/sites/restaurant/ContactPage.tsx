// "use client";

// import { motion ,AnimatePresence } from "framer-motion";
// import { useState } from "react";

// interface RestaurantContactProps {
//   restaurantName?: string;
//   heroImage?: string;
//   address?: string;
//   city?: string;
//   phone?: string;
//   email?: string;
//   mapEmbedUrl?: string;
//   openingHours?: { days: string; hours: string }[];
//   socials?: { name: string; url: string; icon: string }[];
// }

// const defaultProps: RestaurantContactProps = {
//   restaurantName: "AURUM",
//   heroImage:
//     "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80",
//   address: "42 Luxury Lane, Manhattan",
//   city: "New York, NY 10001",
//   phone: "+1 (555) 123-4567",
//   email: "reservations@aurum.com",
//   mapEmbedUrl:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s",
//   openingHours: [
//     { days: "Monday - Thursday", hours: "5:00 PM - 11:00 PM" },
//     { days: "Friday - Saturday", hours: "4:00 PM - 2:00 AM" },
//     { days: "Sunday", hours: "12:00 PM - 10:00 PM" },
//   ],
//   socials: [
//     { name: "Instagram", url: "#", icon: "📷" },
//     { name: "Facebook", url: "#", icon: "📘" },
//     { name: "Twitter", url: "#", icon: "🐦" },
//     { name: "TripAdvisor", url: "#", icon: "🌟" },
//   ],
// };

// export default function ContactPage(props: RestaurantContactProps) {
//   const merged = { ...defaultProps, ...props };
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     time: "",
//     guests: "2",
//     occasion: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [focused, setFocused] = useState<string | null>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 5000);
//   };

//   const inputStyle = (fieldName: string) => ({
//     width: "100%",
//     padding: "16px 0",
//     background: "none",
//     border: "none",
//     borderBottom: `1px solid ${
//       focused === fieldName
//         ? "#D4AF37"
//         : "rgba(212,175,55,0.2)"
//     }`,
//     color: "#f5f0e8",
//     fontSize: "14px",
//     fontFamily: "sans-serif",
//     outline: "none",
//     transition: "border-color 0.3s ease",
//     boxSizing: "border-box" as const,
//   });

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
//       {/* HERO */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           position: "relative",
//           height: "55vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//         }}
//       >
//         <motion.div
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 2 }}
//           style={{
//             position: "absolute",
//             inset: 0,
//             backgroundImage: `url(${merged.heroImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             filter: "brightness(0.2)",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "radial-gradient(ellipse at center, rgba(212,175,55,0.07), transparent)",
//           }}
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//           style={{ position: "relative", zIndex: 10, textAlign: "center" }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "20px",
//               marginBottom: "24px",
//             }}
//           >
//             <div
//               style={{
//                 height: "1px",
//                 width: "60px",
//                 background: "linear-gradient(90deg, transparent, #D4AF37)",
//               }}
//             />
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontSize: "10px",
//                 letterSpacing: "6px",
//                 textTransform: "uppercase",
//                 fontFamily: "sans-serif",
//               }}
//             >
//               Get In Touch
//             </span>
//             <div
//               style={{
//                 height: "1px",
//                 width: "60px",
//                 background: "linear-gradient(90deg, #D4AF37, transparent)",
//               }}
//             />
//           </div>
//           <h1
//             style={{
//               fontSize: "clamp(48px, 7vw, 90px)",
//               fontWeight: 700,
//               letterSpacing: "12px",
//               margin: 0,
//               background: "linear-gradient(135deg, #f5f0e8, #D4AF37)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               backgroundClip: "text",
//             }}
//           >
//             CONTACT
//           </h1>
//         </motion.div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* MAIN CONTENT - Split Layout */}
//       {/* ══════════════════════════════════════════ */}
//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1.2fr",
//           minHeight: "80vh",
//         }}
//       >
//         {/* LEFT - Info Panel */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           style={{
//             backgroundColor: "#0f0f0f",
//             padding: "80px 70px",
//             borderRight: "1px solid rgba(212,175,55,0.1)",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "clamp(28px, 3.5vw, 40px)",
//               fontWeight: 700,
//               color: "#f5f0e8",
//               margin: "0 0 48px",
//               lineHeight: 1.2,
//             }}
//           >
//             Visit Us At
//             <br />
//             <span style={{ color: "#D4AF37" }}>AURUM</span>
//           </h2>

//           {/* Contact Info Cards */}
//           {[
//             {
//               icon: "📍",
//               label: "Location",
//               value: merged.address,
//               sub: merged.city,
//             },
//             {
//               icon: "📞",
//               label: "Reservations",
//               value: merged.phone,
//               sub: "Call us anytime",
//             },
//             {
//               icon: "✉️",
//               label: "Email",
//               value: merged.email,
//               sub: "We respond within 2 hours",
//             },
//           ].map((info, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15, duration: 0.6 }}
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 padding: "24px 0",
//                 borderBottom: "1px solid rgba(212,175,55,0.1)",
//               }}
//             >
//               <span style={{ fontSize: "20px" }}>{info.icon}</span>
//               <div>
//                 <span
//                   style={{
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     display: "block",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   {info.label}
//                 </span>
//                 <p
//                   style={{
//                     color: "#f5f0e8",
//                     fontFamily: "sans-serif",
//                     fontSize: "15px",
//                     margin: "0 0 4px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {info.value}
//                 </p>
//                 <p
//                   style={{
//                     color: "rgba(245,240,232,0.5)",
//                     fontFamily: "sans-serif",
//                     fontSize: "12px",
//                     margin: 0,
//                     fontWeight: 300,
//                   }}
//                 >
//                   {info.sub}
//                 </p>
//               </div>
//             </motion.div>
//           ))}

//           {/* Opening Hours */}
//           <div style={{ marginTop: "48px" }}>
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontFamily: "sans-serif",
//                 fontSize: "9px",
//                 letterSpacing: "3px",
//                 textTransform: "uppercase",
//                 display: "block",
//                 marginBottom: "20px",
//               }}
//             >
//               Opening Hours
//             </span>
//             {merged.openingHours?.map((item, i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   padding: "12px 0",
//                   borderBottom: "1px solid rgba(212,175,55,0.08)",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "rgba(245,240,232,0.65)",
//                     fontFamily: "sans-serif",
//                     fontSize: "13px",
//                     fontWeight: 300,
//                   }}
//                 >
//                   {item.days}
//                 </span>
//                 <span
//                   style={{
//                     color: "#f5f0e8",
//                     fontFamily: "sans-serif",
//                     fontSize: "13px",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {item.hours}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Social Links */}
//           <div style={{ marginTop: "48px" }}>
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontFamily: "sans-serif",
//                 fontSize: "9px",
//                 letterSpacing: "3px",
//                 textTransform: "uppercase",
//                 display: "block",
//                 marginBottom: "20px",
//               }}
//             >
//               Follow Us
//             </span>
//             <div style={{ display: "flex", gap: "12px" }}>
//               {merged.socials?.map((social, i) => (
//                 <motion.a
//                   key={i}
//                   href={social.url}
//                   whileHover={{
//                     scale: 1.1,
//                     backgroundColor: "rgba(212,175,55,0.15)",
//                   }}
//                   style={{
//                     width: "44px",
//                     height: "44px",
//                     border: "1px solid rgba(212,175,55,0.3)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "16px",
//                     textDecoration: "none",
//                     transition: "all 0.3s",
//                   }}
//                   title={social.name}
//                 >
//                   {social.icon}
//                 </motion.a>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT - Reservation Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//           style={{
//             padding: "80px 80px",
//             backgroundColor: "#080808",
//           }}
//         >
//           <div style={{ marginBottom: "48px" }}>
//             <span
//               style={{
//                 color: "#D4AF37",
//                 fontFamily: "sans-serif",
//                 fontSize: "9px",
//                 letterSpacing: "5px",
//                 textTransform: "uppercase",
//                 display: "block",
//                 marginBottom: "20px",
//               }}
//             >
//               Reserve Your Experience
//             </span>
//             <h2
//               style={{
//                 fontSize: "clamp(28px, 3.5vw, 42px)",
//                 fontWeight: 700,
//                 color: "#f5f0e8",
//                 margin: 0,
//                 lineHeight: 1.2,
//               }}
//             >
//               Make A
//               <br />
//               Reservation
//             </h2>
//           </div>

//           {/* Success Message */}
//           <AnimatePresence>
//             {submitted && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20, height: 0 }}
//                 animate={{ opacity: 1, y: 0, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 style={{
//                   backgroundColor: "rgba(212,175,55,0.1)",
//                   border: "1px solid rgba(212,175,55,0.4)",
//                   padding: "20px 24px",
//                   marginBottom: "32px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                 }}
//               >
//                 <span style={{ color: "#D4AF37", fontSize: "20px" }}>✦</span>
//                 <div>
//                   <p
//                     style={{
//                       color: "#D4AF37",
//                       fontFamily: "sans-serif",
//                       fontSize: "14px",
//                       fontWeight: 600,
//                       margin: "0 0 4px",
//                     }}
//                   >
//                     Reservation Request Sent!
//                   </p>
//                   <p
//                     style={{
//                       color: "rgba(212,175,55,0.7)",
//                       fontFamily: "sans-serif",
//                       fontSize: "12px",
//                       margin: 0,
//                       fontWeight: 300,
//                     }}
//                   >
//                     We'll confirm within 2 hours. Thank you!
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "0 40px",
//               }}
//             >
//               {/* Name */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   onFocus={() => setFocused("name")}
//                   onBlur={() => setFocused(null)}
//                   placeholder="Your name"
//                   style={inputStyle("name")}
//                 />
//               </div>

//               {/* Email */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   onFocus={() => setFocused("email")}
//                   onBlur={() => setFocused(null)}
//                   placeholder="your@email.com"
//                   style={inputStyle("email")}
//                 />
//               </div>

//               {/* Phone */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   onFocus={() => setFocused("phone")}
//                   onBlur={() => setFocused(null)}
//                   placeholder="+1 (555) 000-0000"
//                   style={inputStyle("phone")}
//                 />
//               </div>

//               {/* Guests */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Guests *
//                 </label>
//                 <select
//                   value={formData.guests}
//                   onChange={(e) =>
//                     setFormData({ ...formData, guests: e.target.value })
//                   }
//                   onFocus={() => setFocused("guests")}
//                   onBlur={() => setFocused(null)}
//                   style={{
//                     ...inputStyle("guests"),
//                     cursor: "pointer",
//                   }}
//                 >
//                   {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
//                     <option
//                       key={n}
//                       value={n}
//                       style={{ backgroundColor: "#0f0f0f" }}
//                     >
//                       {n} {n === "1" ? "Guest" : "Guests"}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Date */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Date *
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                   onFocus={() => setFocused("date")}
//                   onBlur={() => setFocused(null)}
//                   style={{
//                     ...inputStyle("date"),
//                     colorScheme: "dark",
//                   }}
//                 />
//               </div>

//               {/* Time */}
//               <div style={{ marginBottom: "36px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     color: "#D4AF37",
//                     fontFamily: "sans-serif",
//                     fontSize: "9px",
//                     letterSpacing: "3px",
//                     textTransform: "uppercase",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Preferred Time *
//                 </label>
//                 <select
//                   value={formData.time}
//                   onChange={(e) =>
//                     setFormData({ ...formData, time: e.target.value })
//                   }
//                   onFocus={() => setFocused("time")}
//                   onBlur={() => setFocused(null)}
//                   style={{
//                     ...inputStyle("time"),
//                     cursor: "pointer",
//                   }}
//                 >
//                   <option value="" style={{ backgroundColor: "#0f0f0f" }}>
//                     Select time
//                   </option>
//                   {[
//                     "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM",
//                     "7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
//                   ].map((t) => (
//                     <option
//                       key={t}
//                       value={t}
//                       style={{ backgroundColor: "#0f0f0f" }}
//                     >
//                       {t}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Occasion */}
//             <div style={{ marginBottom: "36px" }}>
//               <label
//                 style={{
//                   display: "block",
//                   color: "#D4AF37",
//                   fontFamily: "sans-serif",
//                   fontSize: "9px",
//                   letterSpacing: "3px",
//                   textTransform: "uppercase",
//                   marginBottom: "8px",
//                 }}
//               >
//                 Special Occasion
//               </label>
//               <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//                 {[
//                   "Birthday",
//                   "Anniversary",
//                   "Business",
//                   "Date Night",
//                   "Other",
//                 ].map((occ) => (
//                   <motion.button
//                     key={occ}
//                     type="button"
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() =>
//                       setFormData({ ...formData, occasion: occ })
//                     }
//                     style={{
//                       padding: "8px 18px",
//                       border: `1px solid ${
//                         formData.occasion === occ
//                           ? "#D4AF37"
//                           : "rgba(212,175,55,0.25)"
//                       }`,
//                       backgroundColor:
//                         formData.occasion === occ
//                           ? "rgba(212,175,55,0.12)"
//                           : "transparent",
//                       color:
//                         formData.occasion === occ
//                           ? "#D4AF37"
//                           : "rgba(245,240,232,0.6)",
//                       fontSize: "10px",
//                       letterSpacing: "2px",
//                       textTransform: "uppercase",
//                       fontFamily: "sans-serif",
//                       cursor: "pointer",
//                       transition: "all 0.2s",
//                     }}
//                   >
//                     {occ}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Message */}
//             <div style={{ marginBottom: "48px" }}>
//               <label
//                 style={{
//                   display: "block",
//                   color: "#D4AF37",
//                   fontFamily: "sans-serif",
//                   fontSize: "9px",
//                   letterSpacing: "3px",
//                   textTransform: "uppercase",
//                   marginBottom: "8px",
//                 }}
//               >
//                 Special Requests
//               </label>
//               <textarea
//                 rows={3}
//                 value={formData.message}
//                 onChange={(e) =>
//                   setFormData({ ...formData, message: e.target.value })
//                 }
//                 onFocus={() => setFocused("message")}
//                 onBlur={() => setFocused(null)}
//                 placeholder="Dietary requirements, seating preferences, etc."
//                 style={{
//                   ...inputStyle("message"),
//                   resize: "none",
//                   paddingTop: "12px",
//                 }}
//               />
//             </div>

//             {/* Submit */}
//             <motion.button
//               type="submit"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               style={{
//                 width: "100%",
//                 padding: "20px",
//                 background: "linear-gradient(135deg, #D4AF37, #c9a227)",
//                 border: "none",
//                 color: "#0a0a0a",
//                 fontSize: "11px",
//                 letterSpacing: "5px",
//                 textTransform: "uppercase",
//                 fontFamily: "sans-serif",
//                 fontWeight: 700,
//                 cursor: "pointer",
//               }}
//             >
//               Confirm Reservation ✦
//             </motion.button>
//           </form>
//         </motion.div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* MAP SECTION */}
//       {/* ══════════════════════════════════════════ */}
//       <section style={{ position: "relative" }}>
//         <div
//           style={{
//             position: "relative",
//             height: "400px",
//             overflow: "hidden",
//           }}
//         >
//           <iframe
//             src={merged.mapEmbedUrl}
//             width="100%"
//             height="100%"
//             style={{
//               border: 0,
//               filter: "invert(90%) hue-rotate(180deg) brightness(0.8) grayscale(0.3)",
//             }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Restaurant Location"
//           />

//           {/* Location Card Overlay */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             style={{
//               position: "absolute",
//               left: "60px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(10,10,10,0.92)",
//               border: "1px solid rgba(212,175,55,0.3)",
//               padding: "32px 40px",
//               backdropFilter: "blur(10px)",
//               minWidth: "260px",
//             }}
//           >
//             <div
//               style={{
//                 color: "#D4AF37",
//                 fontSize: "24px",
//                 marginBottom: "16px",
//               }}
//             >
//               ✦
//             </div>
//             <h3
//               style={{
//                 fontSize: "20px",
//                 fontWeight: 700,
//                 color: "#f5f0e8",
//                 margin: "0 0 8px",
//               }}
//             >
//               {merged.restaurantName}
//             </h3>
//             <p
//               style={{
//                 color: "rgba(245,240,232,0.65)",
//                 fontFamily: "sans-serif",
//                 fontSize: "13px",
//                 lineHeight: 1.6,
//                 margin: "0 0 20px",
//               }}
//             >
//               {merged.address}
//               <br />
//               {merged.city}
//             </p>
//             <a
//               href={`https://maps.google.com/?q=${merged.address}`}
//               target="_blank"
//               rel="noreferrer"
//               style={{
//                 color: "#D4AF37",
//                 fontFamily: "sans-serif",
//                 fontSize: "10px",
//                 letterSpacing: "3px",
//                 textTransform: "uppercase",
//                 textDecoration: "none",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               Get Directions →
//             </a>
//           </motion.div>
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════ */}
//       {/* FOOTER */}
//       {/* ══════════════════════════════════════════ */}
//       <footer
//         style={{
//           backgroundColor: "#050505",
//           padding: "60px 5%",
//           textAlign: "center",
//           borderTop: "1px solid rgba(212,175,55,0.15)",
//         }}
//       >
//         <div
//           style={{
//             fontSize: "48px",
//             fontWeight: 700,
//             letterSpacing: "16px",
//             background: "linear-gradient(135deg, #f5f0e8, #D4AF37)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//             marginBottom: "24px",
//           }}
//         >
//           {merged.restaurantName}
//         </div>
//         <p
//           style={{
//             color: "rgba(245,240,232,0.35)",
//             fontFamily: "sans-serif",
//             fontSize: "11px",
//             letterSpacing: "3px",
//             margin: 0,
//           }}
//         >
//           © 2024 {merged.restaurantName} · All Rights Reserved · Powered by AVB
//           Software
//         </p>
//       </footer>
//     </div>
//   );
// }




"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Client } from "@/lib/supabase";

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) => {
  const d = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...d[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23111'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3EUpload Image%3C/text%3E%3C/svg%3E";

export default function ContactPage({ client }: { client: Client }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      occasion: "",
      message: "",
    });
  };

  // ══════════════════════════════════════════════════
  // DATA
  // ══════════════════════════════════════════════════
  const restaurantName = client.business_name || "Restaurant";
  const address = client.address || "";
  const city = client.city || "";
  const phone = client.phone || "";
  const email = client.email || "";
  const openingHours = client.opening_hours || [];
  const occasions = ["Birthday", "Anniversary", "Business", "Date Night", "Other"];
  const timeSlots = [
    "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM",
    "5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM",
    "7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
  ];
  const maxGuests = 8;

  const contactHeroImage =
    client.contact_hero_image ||
    client.hero_image ||
    client.hero_image_url ||
    PLACEHOLDER;

  // Map embed - Google Maps se link leke
  const mapEmbedUrl = client.map_embed_url || client.maps_link || "";

  const inputCls = (f: string) =>
    `w-full py-3 sm:py-3.5 md:py-4 bg-transparent border-0 border-b text-[#f5f0e8] text-xs sm:text-sm font-sans outline-none transition-colors placeholder:text-[rgba(245,240,232,0.3)] ${
      focused === f
        ? "border-[#D4AF37]"
        : "border-[rgba(212,175,55,0.2)]"
    }`;

  return (
    <div className="bg-[#0a0a0a] text-[#f5f0e8] font-serif overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${contactHeroImage})`,
            filter: "brightness(0.2)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6">
            <div className="h-px w-8 sm:w-12 md:w-[60px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase font-sans">
              Get In Touch
            </span>
            <div className="h-px w-8 sm:w-12 md:w-[60px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] font-bold tracking-[6px] sm:tracking-[8px] md:tracking-[12px] m-0 bg-gradient-to-br from-[#f5f0e8] to-[#D4AF37] bg-clip-text text-transparent">
            CONTACT
          </h1>
        </motion.div>
      </section>

      {/* SPLIT: Info + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-0 lg:min-h-[80vh]">
        {/* LEFT - Info */}
        <FadeIn
          direction="left"
          className="bg-[#0f0f0f] lg:border-r lg:border-[rgba(212,175,55,0.1)]"
        >
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[70px] py-10 sm:py-12 md:py-16 lg:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-bold text-[#f5f0e8] m-0 mb-8 sm:mb-10 md:mb-12 leading-[1.15]">
              Visit Us At
              <br />
              <span className="text-[#D4AF37]">{restaurantName}</span>
            </h2>

            {/* Contact Info */}
            {[
              {
                icon: "📍",
                label: "Location",
                value: address,
                sub: city,
              },
              {
                icon: "📞",
                label: "Reservations",
                value: phone,
                sub: "Call us anytime",
                href: phone ? `tel:${phone}` : undefined,
              },
              {
                icon: "✉️",
                label: "Email",
                value: email,
                sub: "We respond within 2 hours",
                href: email ? `mailto:${email}` : undefined,
              },
            ]
              .filter((info) => info.value)
              .map((info, i) => (
                <FadeIn key={i} delay={i * 0.12} direction="left">
                  <div className="flex gap-3 sm:gap-4 md:gap-5 py-4 sm:py-5 md:py-6 border-b border-[rgba(212,175,55,0.1)]">
                    <span className="text-lg sm:text-xl shrink-0">
                      {info.icon}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-1 sm:mb-1.5">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-[#f5f0e8] font-sans text-sm sm:text-[15px] m-0 mb-0.5 font-medium block no-underline hover:text-[#D4AF37] transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#f5f0e8] font-sans text-sm sm:text-[15px] m-0 mb-0.5 font-medium break-words">
                          {info.value}
                        </p>
                      )}
                      <p className="text-[rgba(245,240,232,0.5)] font-sans text-[10px] sm:text-xs m-0 font-light">
                        {info.sub}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}

            {/* Opening Hours */}
            {openingHours.length > 0 && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <span className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-4 sm:mb-5">
                  Opening Hours
                </span>
                {openingHours.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between py-2.5 sm:py-3 border-b border-[rgba(212,175,55,0.08)] last:border-0"
                  >
                    <span className="text-[rgba(245,240,232,0.65)] font-sans text-[11px] sm:text-xs md:text-[13px] font-light">
                      {item.days}
                    </span>
                    <span className="text-[#f5f0e8] font-sans text-[11px] sm:text-xs md:text-[13px] font-medium">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Fallback hours from working_hours */}
            {openingHours.length === 0 && client.working_hours && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <span className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-4 sm:mb-5">
                  Opening Hours
                </span>
                <p className="text-[rgba(245,240,232,0.65)] font-sans text-xs sm:text-sm font-light">
                  {client.working_hours}
                </p>
              </div>
            )}

            {/* Social Links */}
            {(client.instagram || client.facebook) && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <span className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase block mb-4 sm:mb-5">
                  Follow Us
                </span>
                <div className="flex gap-2 sm:gap-3">
                  {client.instagram && (
                    <motion.a
                      href={client.instagram}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(212,175,55,0.15)",
                      }}
                      className="w-10 h-10 sm:w-11 sm:h-11 border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-sm no-underline transition-all text-[#D4AF37] font-bold"
                    >
                      IG
                    </motion.a>
                  )}
                  {client.facebook && (
                    <motion.a
                      href={client.facebook}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(212,175,55,0.15)",
                      }}
                      className="w-10 h-10 sm:w-11 sm:h-11 border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-sm no-underline transition-all text-[#D4AF37] font-bold"
                    >
                      FB
                    </motion.a>
                  )}
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* RIGHT - Reservation Form */}
        <FadeIn direction="right" className="bg-[#080808]">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-10 sm:py-12 md:py-16 lg:py-20">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <span className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[3px] sm:tracking-[5px] uppercase block mb-3 sm:mb-4 md:mb-5">
                Reserve Your Experience
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[42px] font-bold text-[#f5f0e8] m-0 leading-[1.15]">
                Make A
                <br />
                Reservation
              </h2>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.4)] p-4 sm:p-5 mb-6 sm:mb-8 flex items-start sm:items-center gap-2.5 sm:gap-3"
                >
                  <span className="text-[#D4AF37] text-base sm:text-xl shrink-0">
                    ✦
                  </span>
                  <div>
                    <p className="text-[#D4AF37] font-sans text-xs sm:text-sm font-semibold m-0 mb-0.5">
                      Reservation Request Sent!
                    </p>
                    <p className="text-[rgba(212,175,55,0.7)] font-sans text-[10px] sm:text-xs m-0 font-light">
                      We&apos;ll confirm within 2 hours. Thank you!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10">
                {/* Name */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className={inputCls("name")}
                  />
                </div>

                {/* Email */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    className={inputCls("email")}
                  />
                </div>

                {/* Phone */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    placeholder={phone || "+91 00000 00000"}
                    className={inputCls("phone")}
                  />
                </div>

                {/* Guests */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    onFocus={() => setFocused("guests")}
                    onBlur={() => setFocused(null)}
                    className={`${inputCls("guests")} cursor-pointer`}
                  >
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                      (n) => (
                        <option
                          key={n}
                          value={n.toString()}
                          className="bg-[#0f0f0f]"
                        >
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      )
                    )}
                    <option
                      value={`${maxGuests}+`}
                      className="bg-[#0f0f0f]"
                    >
                      {maxGuests}+ Guests
                    </option>
                  </select>
                </div>

                {/* Date */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    onFocus={() => setFocused("date")}
                    onBlur={() => setFocused(null)}
                    className={`${inputCls("date")} [color-scheme:dark]`}
                  />
                </div>

                {/* Time */}
                <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                  <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    onFocus={() => setFocused("time")}
                    onBlur={() => setFocused(null)}
                    className={`${inputCls("time")} cursor-pointer`}
                  >
                    <option value="" className="bg-[#0f0f0f]">
                      Select time
                    </option>
                    {timeSlots.map((t: string) => (
                      <option key={t} value={t} className="bg-[#0f0f0f]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-6 sm:mb-7 md:mb-8 lg:mb-9">
                <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-2 sm:mb-3">
                  Special Occasion
                </label>
                <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 flex-wrap">
                  {occasions.map((occ: string) => (
                    <motion.button
                      key={occ}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          occasion: formData.occasion === occ ? "" : occ,
                        })
                      }
                      className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 border text-[8px] sm:text-[9px] md:text-[10px] tracking-[1px] sm:tracking-[2px] uppercase font-sans cursor-pointer transition-all ${
                        formData.occasion === occ
                          ? "border-[#D4AF37] bg-[rgba(212,175,55,0.12)] text-[#D4AF37]"
                          : "border-[rgba(212,175,55,0.25)] bg-transparent text-[rgba(245,240,232,0.6)]"
                      }`}
                    >
                      {occ}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <label className="block text-[#D4AF37] font-sans text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase mb-1.5 sm:mb-2">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Dietary requirements, seating preferences..."
                  className={`${inputCls("message")} resize-none pt-3`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 sm:py-[18px] md:py-5 bg-gradient-to-br from-[#D4AF37] to-[#c9a227] border-none text-[#0a0a0a] text-[10px] sm:text-[11px] tracking-[3px] sm:tracking-[4px] md:tracking-[5px] uppercase font-sans font-bold cursor-pointer"
              >
                Confirm Reservation ✦
              </motion.button>
            </form>
          </div>
        </FadeIn>
      </section>

      {/* MAP */}
      {mapEmbedUrl && (
        <section className="relative">
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter:
                  "invert(90%) hue-rotate(180deg) brightness(0.8) grayscale(0.3)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${restaurantName} Location`}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-3 sm:left-6 md:left-10 lg:left-[60px] top-1/2 -translate-y-1/2 bg-[rgba(10,10,10,0.92)] border border-[rgba(212,175,55,0.3)] p-4 sm:p-5 md:p-6 lg:p-8 backdrop-blur-[10px] max-w-[200px] sm:max-w-[240px] md:max-w-[260px]"
            >
              <div className="text-[#D4AF37] text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 md:mb-4">
                ✦
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#f5f0e8] m-0 mb-1 sm:mb-2">
                {restaurantName}
              </h3>
              <p className="text-[rgba(245,240,232,0.65)] font-sans text-[10px] sm:text-[11px] md:text-[13px] leading-[1.5] m-0 mb-3 sm:mb-4 md:mb-5">
                {address}
                {address && city ? <br /> : ""}
                {city}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${address}, ${city}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#D4AF37] font-sans text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase no-underline flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity"
              >
                Get Directions →
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#050505] px-4 sm:px-6 md:px-[5%] py-10 sm:py-12 md:py-14 lg:py-[60px] text-center border-t border-[rgba(212,175,55,0.15)]">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold tracking-[8px] sm:tracking-[12px] md:tracking-[16px] bg-gradient-to-br from-[#f5f0e8] to-[#D4AF37] bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6">
          {restaurantName}
        </div>
        <p className="text-[rgba(245,240,232,0.35)] font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] m-0">
          © {new Date().getFullYear()} {restaurantName} · All Rights Reserved
          · Powered by{" "}
          <a
            href="https://avbsoftware.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#D4AF37] no-underline hover:opacity-80"
          >
            AVB Software
          </a>
        </p>
      </footer>
    </div>
  );
}