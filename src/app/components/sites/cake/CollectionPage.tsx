// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Search, ArrowRight, Plus, X, Heart } from "lucide-react";
// import { Client } from "@/lib/supabase";

// const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

// // CHANGED: once: false - motion repeats on every scroll
// const FadeIn = ({ children, delay = 0, className = "" }: any) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: false, margin: "-100px" }}
//     transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//     className={className}
//   >
//     {children}
//   </motion.div>
// );

// export default function CollectionPage({ client, theme }: { client: Client; theme?: any }) {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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

//   const restaurantName = client.business_name || "Sweet Bites";
//   const currency = client.currency_symbol || "₹";

//   const categories: any[] = (() => {
//     if (client.menu_categories && client.menu_categories.length > 0) {
//       return [
//         { id: "all", name: "All", items: client.menu_categories.flatMap((c: any) => c.items || []) },
//         ...client.menu_categories,
//       ];
//     }
//     if (client.products && client.products.length > 0) {
//       return [{
//         id: "all",
//         name: "Collection",
//         items: client.products.map((p: any) => ({
//           name: p.name,
//           description: p.description,
//           price: p.price,
//           image: p.image_url,
//           tags: [],
//         })),
//       }];
//     }
//     return [];
//   })();

//   useEffect(() => {
//     if (categories.length > 0 && !activeCategory) {
//       setActiveCategory(categories[0].id || "all");
//     }
//   }, [categories]);

//   const currentCategory = categories.find((c: any) => (c.id || c.name) === activeCategory);
//   const allItems = currentCategory?.items || [];
//   const filteredItems = allItems.filter((item: any) =>
//     !searchQuery || item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div 
//       className="relative overflow-x-hidden"
//       style={{ 
//         background: colors.bg, 
//         color: colors.text, 
//         fontFamily: "'Inter', sans-serif",
//       }}
//     >

//       {/* HERO */}
//       <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-20 sm:py-28" style={{ background: colors.bg }}>
        
//         <div className="absolute inset-0 opacity-[0.03]" style={{
//           backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }} />

//         <div className="absolute top-1/2 left-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />
//         <div className="absolute top-1/2 right-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />

//         <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
//           <div className="max-w-5xl mx-auto text-center">
            
//             <motion.div
//               initial={{ opacity: 0, scaleX: 0 }}
//               whileInView={{ opacity: 1, scaleX: 1 }}
//               viewport={{ once: false, margin: "-50px" }}
//               transition={{ duration: 1.2 }}
//               className="flex items-center justify-center gap-4 mb-10"
//             >
//               <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//                 className="text-3xl sm:text-4xl"
//                 style={{ color: colors.primary }}
//               >
//                 ✦
//               </motion.div>
//               <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, margin: "-50px" }}
//               transition={{ duration: 0.8 }}
//               className="mb-8"
//             >
//               <div 
//                 className="text-xs sm:text-sm tracking-[8px] sm:tracking-[10px] uppercase"
//                 style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//               >
//                 — La Collection —
//               </div>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, margin: "-50px" }}
//               transition={{ duration: 1 }}
//               className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-10"
//               style={{ 
//                 fontFamily: "'Italiana', serif", 
//                 color: '#FFFFFF',
//                 letterSpacing: '-2px',
//               }}
//             >
//               <span style={{ color: '#FFFFFF', display: 'block' }}>The Art of</span>
//               <span 
//                 className="italic"
//                 style={{
//                   display: 'block',
//                   background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                 }}
//               >
//                 Patisserie
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, margin: "-50px" }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-lg sm:text-xl md:text-2xl italic font-light max-w-2xl mx-auto mb-10"
//               style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.7)' }}
//             >
//               Discover our exquisite collection of handcrafted creations, where every cake is a celebration of artistry.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, margin: "-50px" }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm tracking-[3px] uppercase"
//               style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
//                 <span>{allItems.length} Creations</span>
//               </div>
//               <div className="w-px h-4" style={{ background: colors.primary }} />
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
//                 <span>{categories.length - 1 || 1} Collections</span>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* SEARCH + CATEGORIES */}
//       {categories.length > 1 && (
//         <section className="relative py-10 sm:py-12 border-y" style={{ background: colors.bgSecondary, borderColor: colors.border }}>
//           <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            
//             <FadeIn className="max-w-md mx-auto mb-8">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.primary }} />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search the collection..."
//                   className="w-full pl-11 pr-4 py-3 outline-none text-sm italic border-b bg-transparent text-center transition-colors"
//                   style={{
//                     borderColor: colors.border,
//                     color: '#FFFFFF',
//                     fontFamily: "'Cormorant Garamond', serif",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = colors.primary}
//                   onBlur={(e) => e.target.style.borderColor = colors.border}
//                 />
//               </div>
//             </FadeIn>

//             <FadeIn delay={0.2}>
//               <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
//                 {categories.map((cat: any, i: number) => {
//                   const catId = cat.id || cat.name;
//                   const isActive = activeCategory === catId;
//                   return (
//                     <motion.button
//                       key={catId}
//                       onClick={() => setActiveCategory(catId)}
//                       whileHover={{ scale: 1.02 }}
//                       className="relative px-4 sm:px-6 py-2 sm:py-3 transition-all flex items-center gap-2 sm:gap-3 group"
//                     >
//                       <span 
//                         className="text-[10px] sm:text-xs"
//                         style={{ 
//                           fontFamily: "'Cinzel', serif", 
//                           color: isActive ? colors.primary : colors.textLight,
//                         }}
//                       >
//                         0{i + 1}
//                       </span>

//                       <span 
//                         className="whitespace-nowrap transition-all"
//                         style={{ 
//                           fontFamily: isActive ? "'Italiana', serif" : "'Cormorant Garamond', serif",
//                           fontSize: isActive ? '16px' : '14px',
//                           fontStyle: isActive ? 'normal' : 'italic',
//                           color: isActive ? '#FFFFFF' : colors.textLight,
//                         }}
//                       >
//                         {cat.name}
//                       </span>

//                       <span 
//                         className="text-[10px] sm:text-xs opacity-60"
//                         style={{ 
//                           fontFamily: "'Cinzel', serif", 
//                           color: isActive ? colors.primary : colors.textLight,
//                         }}
//                       >
//                         ({(cat.items || []).length})
//                       </span>

//                       {isActive && (
//                         <motion.div
//                           layoutId="categoryUnderline"
//                           className="absolute bottom-0 left-1/4 right-1/4 h-px"
//                           style={{ background: colors.primary }}
//                         />
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </FadeIn>
//           </div>
//         </section>
//       )}

//       {/* PRODUCTS */}
//       <section className="relative py-12 sm:py-16 md:py-20" style={{ background: colors.bg }}>
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
//           <FadeIn className="mb-12 sm:mb-16">
//             <div className="text-center max-w-2xl mx-auto">
//               <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                 {currentCategory?.name || "All Creations"}
//               </div>
//               <h2
//                 className="text-4xl sm:text-5xl md:text-6xl font-normal"
//                 style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//               >
//                 {filteredItems.length} <span className="italic" style={{ color: colors.primary }}>masterpieces</span>
//               </h2>
//             </div>
//           </FadeIn>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeCategory}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="max-w-6xl mx-auto space-y-12 sm:space-y-16 md:space-y-20"
//             >
//               {filteredItems.map((item: any, i: number) => {
//                 const isEven = i % 2 === 0;
//                 return (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 60 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: false, margin: "-100px" }}
//                     transition={{ duration: 0.8 }}
//                     onMouseEnter={() => setHoveredItem(i)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                     className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center"
//                   >
                    
//                     <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
//                         whileInView={{ opacity: 1, scale: 1, x: 0 }}
//                         viewport={{ once: false, margin: "-100px" }}
//                         transition={{ duration: 0.8, delay: 0.1 }}
//                         className="relative group cursor-pointer max-w-sm mx-auto"
//                         onClick={() => setSelectedItem(item)}
//                         whileHover={{ scale: 0.98 }}
//                       >
//                         <div 
//                           className="absolute -top-4 sm:-top-6 -left-2 sm:-left-4 text-[80px] sm:text-[100px] md:text-[120px] leading-[0.7] select-none pointer-events-none z-0"
//                           style={{ 
//                             fontFamily: "'Italiana', serif", 
//                             color: colors.primary,
//                             opacity: 0.1,
//                           }}
//                         >
//                           {String(i + 1).padStart(2, '0')}
//                         </div>

//                         <div className="relative aspect-square overflow-hidden z-10">
//                           {(item.image || item.image_url) ? (
//                             <img 
//                               src={item.image || item.image_url} 
//                               alt={item.name}
//                               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: colors.bgCard }}>
//                               🎂
//                             </div>
//                           )}

//                           <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ borderColor: colors.primary }} />
//                           <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ borderColor: colors.primary }} />

//                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `${colors.bg}66` }}>
//                             <div className="text-center">
//                               <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
//                               <div className="text-[10px] tracking-[4px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#FFFFFF' }}>
//                                 View Details
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div 
//                           className={`absolute border transition-all duration-700 pointer-events-none ${
//                             isEven 
//                               ? "-bottom-2 -right-2 top-6 left-6" 
//                               : "-bottom-2 -left-2 top-6 right-6"
//                           }`}
//                           style={{ 
//                             borderColor: colors.primary,
//                             opacity: hoveredItem === i ? 1 : 0.3,
//                           }}
//                         />
//                       </motion.div>
//                     </div>

//                     <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
//                       <motion.div
//                         initial={{ opacity: 0, x: isEven ? 50 : -50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: false, margin: "-100px" }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                       >
//                         <div className="flex items-center gap-3 mb-4">
//                           <div className="w-10 sm:w-14 h-px" style={{ background: colors.primary }} />
//                           <span 
//                             className="text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase"
//                             style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                           >
//                             {item.featured ? "Bestseller" : "Signature"}
//                           </span>
//                         </div>

//                         <div 
//                           className="text-xs sm:text-sm tracking-[3px] uppercase mb-3"
//                           style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
//                         >
//                           No. {String(i + 1).padStart(3, '0')}
//                         </div>

//                         <h3
//                           className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 leading-[1]"
//                           style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//                         >
//                           <span style={{ color: '#FFFFFF' }}>{item.name.split(' ')[0]}</span>
//                           {item.name.split(' ').slice(1).length > 0 && (
//                             <>
//                               <br />
//                               <span 
//                                 className="italic"
//                                 style={{
//                                   background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
//                                   WebkitBackgroundClip: 'text',
//                                   WebkitTextFillColor: 'transparent',
//                                   backgroundClip: 'text',
//                                 }}
//                               >
//                                 {item.name.split(' ').slice(1).join(' ')}
//                               </span>
//                             </>
//                           )}
//                         </h3>

//                         {item.description && (
//                           <p
//                             className="text-lg sm:text-xl md:text-2xl italic font-light leading-relaxed mb-8"
//                             style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
//                           >
//                             &ldquo;{item.description}&rdquo;
//                           </p>
//                         )}

//                         {item.tags && item.tags.length > 0 && (
//                           <div className="flex flex-wrap gap-2 mb-8">
//                             {item.tags.map((tag: string, j: number) => (
//                               <span
//                                 key={j}
//                                 className="text-xs px-3 py-1.5 border tracking-[2px] uppercase"
//                                 style={{
//                                   fontFamily: "'Cinzel', serif",
//                                   borderColor: colors.primary,
//                                   color: colors.primary,
//                                 }}
//                               >
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                         )}

//                         <div className="flex items-end justify-between gap-4 pt-6 border-t" style={{ borderColor: colors.border }}>
//                           {item.price && (
//                             <div>
//                               <div className="text-xs sm:text-sm tracking-[3px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
//                                 Starting At
//                               </div>
//                               <div 
//                                 className="text-4xl sm:text-5xl md:text-6xl"
//                                 style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//                               >
//                                 {String(item.price).includes(currency) ? item.price : `${currency}${item.price}`}
//                               </div>
//                             </div>
//                           )}
                          
//                           {client.whatsapp && (
//                             <motion.a
//                               href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=I would like to order: ${item.name}`}
//                               target="_blank"
//                               rel="noreferrer"
//                               whileHover={{ x: 5 }}
//                               className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase font-bold no-underline group/btn"
//                               style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
//                             >
//                               <span>Reserve</span>
//                               <div className="w-10 sm:w-14 h-px transition-all duration-300 group-hover/btn:w-16 sm:group-hover/btn:w-20" style={{ background: colors.primary }} />
//                               <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                             </motion.a>
//                           )}
//                         </div>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </AnimatePresence>

//           {filteredItems.length === 0 && (
//             <FadeIn className="text-center py-16">
//               <div className="text-6xl mb-4 opacity-20">🎂</div>
//               <h3 className="text-2xl sm:text-3xl italic mb-3" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                 {searchQuery ? `No results for "${searchQuery}"` : "Collection Coming Soon"}
//               </h3>
//               <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
//                 Our masterpieces are being crafted
//               </p>
//             </FadeIn>
//           )}
//         </div>
//       </section>

//       {/* CUSTOM ORDER */}
//       <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden" style={{ background: colors.bgSecondary }}>
        
//         <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(80px)' }} />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(80px)' }} />

//         <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
//           <div className="max-w-5xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              
//               <FadeIn>
//                 <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                   — Bespoke Service —
//                 </div>
                
//                 <h2
//                   className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[0.95] mb-6"
//                   style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//                 >
//                   <span style={{ color: '#FFFFFF' }}>Your Vision,</span>
//                   <br />
//                   <span 
//                     className="italic"
//                     style={{
//                       background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text',
//                     }}
//                   >
//                     Our Craft.
//                   </span>
//                 </h2>

//                 <p
//                   className="text-lg sm:text-xl italic font-light leading-relaxed mb-8 max-w-md"
//                   style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
//                 >
//                   Cannot find what you envision? Let our master baker bring your dream to life with a bespoke creation.
//                 </p>

//                 {client.whatsapp && (
//                   <motion.a
//                     href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=Hi! I would like to commission a bespoke cake.`}
//                     target="_blank"
//                     rel="noreferrer"
//                     whileHover={{ scale: 1.05 }}
//                     className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm tracking-[4px] uppercase font-bold no-underline group"
//                     style={{
//                       fontFamily: "'Cinzel', serif",
//                       background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
//                       color: colors.bg,
//                     }}
//                   >
//                     <Heart className="w-4 h-4 fill-current" />
//                     Commission Bespoke
//                     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                   </motion.a>
//                 )}
//               </FadeIn>

//               <FadeIn delay={0.3}>
//                 <div className="space-y-5 sm:space-y-6">
//                   {[
//                     { step: "I", title: "Consult", desc: "Share your vision with our atelier" },
//                     { step: "II", title: "Design", desc: "We craft a bespoke concept just for you" },
//                     { step: "III", title: "Create", desc: "Handcrafted with the finest ingredients" },
//                     { step: "IV", title: "Delight", desc: "Delivered to make your moment unforgettable" },
//                   ].map((process, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ opacity: 0, x: 30 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: false, margin: "-50px" }}
//                       transition={{ delay: i * 0.1, duration: 0.6 }}
//                       whileHover={{ x: 10 }}
//                       className="flex items-center gap-4 sm:gap-5 group cursor-default"
//                     >
//                       <div 
//                         className="text-4xl sm:text-5xl md:text-6xl w-16 sm:w-20 text-center transition-colors group-hover:text-white"
//                         style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//                       >
//                         {process.step}
//                       </div>

//                       <div className="w-10 sm:w-12 h-px transition-all duration-300 group-hover:w-14 sm:group-hover:w-20" style={{ background: colors.primary }} />

//                       <div>
//                         <div className="text-xl sm:text-2xl md:text-3xl mb-1" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                           {process.title}
//                         </div>
//                         <div className="text-sm sm:text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
//                           {process.desc}
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </FadeIn>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SIGNATURE FOOTER */}
//       <section className="relative py-16 sm:py-20 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
//         <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center max-w-2xl">
          
//           <FadeIn>
//             <div className="flex items-center justify-center gap-4 mb-6">
//               <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="text-2xl sm:text-3xl"
//                 style={{ color: colors.primary }}
//               >
//                 ✦
//               </motion.div>
//               <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
//             </div>

//             <p
//               className="text-3xl sm:text-4xl md:text-5xl italic font-light leading-relaxed mb-6"
//               style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
//             >
//               <span style={{ color: '#FFFFFF' }}>Crafted with</span>{' '}
//               <span style={{ color: colors.primary }}>passion.</span>
//               <br />
//               <span style={{ color: '#FFFFFF' }}>Served with</span>{' '}
//               <span style={{ color: colors.primary }}>love.</span>
//             </p>

//             <div className="mt-6">
//               <div 
//                 className="text-3xl sm:text-4xl mb-1"
//                 style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
//               >
//                 — {restaurantName}
//               </div>
//               <div className="text-xs sm:text-sm tracking-[4px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
//                 Atelier de Pâtisserie
//               </div>
//             </div>
//           </FadeIn>
//         </div>
//       </section>

//       {/* MODAL */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedItem(null)}
//             className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
//             style={{ background: `${colors.bg}EE`, backdropFilter: 'blur(20px)' }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               onClick={(e) => e.stopPropagation()}
//               className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//               style={{ background: colors.bgCard, border: `1px solid ${colors.primary}` }}
//             >
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border transition-all hover:bg-white"
//                 style={{ borderColor: colors.primary, color: colors.primary }}
//               >
//                 <X className="w-4 h-4" />
//               </button>

//               <div className="grid md:grid-cols-2 gap-0">
//                 <div className="aspect-square overflow-hidden">
//                   {(selectedItem.image || selectedItem.image_url) ? (
//                     <img 
//                       src={selectedItem.image || selectedItem.image_url} 
//                       alt={selectedItem.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-7xl" style={{ background: colors.bg }}>
//                       🎂
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6 sm:p-8 md:p-10">
//                   <div className="text-xs sm:text-sm tracking-[4px] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
//                     Signature Creation
//                   </div>

//                   <h3 className="text-3xl sm:text-4xl md:text-5xl mb-3 leading-tight" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
//                     {selectedItem.name}
//                   </h3>

//                   <div className="h-px w-12 my-4" style={{ background: colors.primary }} />

//                   {selectedItem.description && (
//                     <p className="text-base sm:text-lg italic mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.75)' }}>
//                       {selectedItem.description}
//                     </p>
//                   )}

//                   {selectedItem.tags && selectedItem.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {selectedItem.tags.map((tag: string, j: number) => (
//                         <span
//                           key={j}
//                           className="text-xs px-3 py-1.5 border tracking-[2px] uppercase"
//                           style={{
//                             fontFamily: "'Cinzel', serif",
//                             borderColor: colors.primary,
//                             color: colors.primary,
//                           }}
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {selectedItem.price && (
//                     <div className="mb-6 pt-4 border-t" style={{ borderColor: colors.border }}>
//                       <div className="text-xs sm:text-sm tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
//                         Starting At
//                       </div>
//                       <div className="text-4xl sm:text-5xl md:text-6xl" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
//                         {String(selectedItem.price).includes(currency) ? selectedItem.price : `${currency}${selectedItem.price}`}
//                       </div>
//                     </div>
//                   )}

//                   {client.whatsapp && (
//                     <motion.a
//                       href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=I would like to order: ${selectedItem.name}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       whileHover={{ scale: 1.02 }}
//                       className="block w-full text-center px-6 py-4 text-xs sm:text-sm tracking-[4px] uppercase font-bold no-underline"
//                       style={{
//                         fontFamily: "'Cinzel', serif",
//                         background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
//                         color: colors.bg,
//                       }}
//                     >
//                       Reserve This Creation
//                     </motion.a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, ArrowRight, Plus, X, Heart, Grid3x3, LayoutList } from "lucide-react";
import { Client } from "@/lib/supabase";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' fill='%231E3333'%3E%3Crect width='800' height='1000'/%3E%3Ctext x='50%25' y='50%25' font-size='80' text-anchor='middle' dominant-baseline='middle'%3E🎂%3C/text%3E%3C/svg%3E";

const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function CollectionPage({ client, theme }: { client: Client; theme?: any }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"editorial" | "grid">("editorial");

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

  const restaurantName = client.business_name || "Sweet Bites";
  const currency = client.currency_symbol || "₹";

  const categories: any[] = (() => {
    if (client.menu_categories && client.menu_categories.length > 0) {
      return [
        { id: "all", name: "All", items: client.menu_categories.flatMap((c: any) => c.items || []) },
        ...client.menu_categories,
      ];
    }
    if (client.products && client.products.length > 0) {
      return [{
        id: "all",
        name: "Collection",
        items: client.products.map((p: any) => ({
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image_url,
          tags: [],
        })),
      }];
    }
    return [];
  })();

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || "all");
    }
  }, [categories]);

  const currentCategory = categories.find((c: any) => (c.id || c.name) === activeCategory);
  const allItems = currentCategory?.items || [];
  const filteredItems = allItems.filter((item: any) =>
    !searchQuery || item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split items: First 3 in editorial, rest in grid
  const editorialItems = viewMode === "editorial" ? filteredItems.slice(0, 3) : [];
  const gridItems = viewMode === "editorial" ? filteredItems.slice(3) : filteredItems;

  return (
    <div 
      className="relative overflow-x-hidden"
      style={{ 
        background: colors.bg, 
        color: colors.text, 
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {/* HERO */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-20 sm:py-28" style={{ background: colors.bg }}>
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="absolute top-1/2 left-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />
        <div className="absolute top-1/2 right-8 w-px h-32 -translate-y-1/2 hidden md:block" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }} />

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 1.2 }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="text-3xl sm:text-4xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-20 sm:w-32 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div 
                className="text-xs sm:text-sm tracking-[8px] sm:tracking-[10px] uppercase"
                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
              >
                — La Collection —
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-normal leading-[0.95] mb-10"
              style={{ 
                fontFamily: "'Italiana', serif", 
                color: '#FFFFFF',
                letterSpacing: '-2px',
              }}
            >
              <span style={{ color: '#FFFFFF', display: 'block' }}>The Art of</span>
              <span 
                className="italic"
                style={{
                  display: 'block',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 50%, ${colors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Patisserie
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl italic font-light max-w-2xl mx-auto mb-10"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.7)' }}
            >
              Discover our exquisite collection of handcrafted creations, where every cake is a celebration of artistry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm tracking-[3px] uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                <span>{allItems.length} Creations</span>
              </div>
              <div className="w-px h-4" style={{ background: colors.primary }} />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                <span>{categories.length - 1 || 1} Collections</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEARCH + CATEGORIES + VIEW TOGGLE */}
      {categories.length > 1 && (
        <section className="relative py-10 sm:py-12 border-y" style={{ background: colors.bgSecondary, borderColor: colors.border }}>
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            
            <FadeIn className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.primary }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the collection..."
                  className="w-full pl-11 pr-4 py-3 outline-none text-sm italic border-b bg-transparent text-center transition-colors"
                  style={{
                    borderColor: colors.border,
                    color: '#FFFFFF',
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = colors.border}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
                {categories.map((cat: any, i: number) => {
                  const catId = cat.id || cat.name;
                  const isActive = activeCategory === catId;
                  return (
                    <motion.button
                      key={catId}
                      onClick={() => setActiveCategory(catId)}
                      whileHover={{ scale: 1.02 }}
                      className="relative px-4 sm:px-6 py-2 sm:py-3 transition-all flex items-center gap-2 sm:gap-3 group"
                    >
                      <span 
                        className="text-[10px] sm:text-xs"
                        style={{ 
                          fontFamily: "'Cinzel', serif", 
                          color: isActive ? colors.primary : colors.textLight,
                        }}
                      >
                        0{i + 1}
                      </span>

                      <span 
                        className="whitespace-nowrap transition-all"
                        style={{ 
                          fontFamily: isActive ? "'Italiana', serif" : "'Cormorant Garamond', serif",
                          fontSize: isActive ? '16px' : '14px',
                          fontStyle: isActive ? 'normal' : 'italic',
                          color: isActive ? '#FFFFFF' : colors.textLight,
                        }}
                      >
                        {cat.name}
                      </span>

                      <span 
                        className="text-[10px] sm:text-xs opacity-60"
                        style={{ 
                          fontFamily: "'Cinzel', serif", 
                          color: isActive ? colors.primary : colors.textLight,
                        }}
                      >
                        ({(cat.items || []).length})
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="categoryUnderline"
                          className="absolute bottom-0 left-1/4 right-1/4 h-px"
                          style={{ background: colors.primary }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </FadeIn>

            {/* ═══ NEW: VIEW MODE TOGGLE ═══ */}
            <FadeIn delay={0.3}>
              <div className="flex items-center justify-center gap-4">
                <div className="text-[10px] sm:text-xs tracking-[3px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                  View:
                </div>
                <div className="flex items-center gap-1 p-1 border" style={{ borderColor: colors.border }}>
                  <button
                    onClick={() => setViewMode("editorial")}
                    className="flex items-center gap-2 px-4 py-2 transition-all"
                    style={{
                      background: viewMode === "editorial" ? colors.primary : 'transparent',
                      color: viewMode === "editorial" ? colors.bg : colors.textLight,
                    }}
                  >
                    <LayoutList className="w-3 h-3" />
                    <span className="text-[10px] tracking-[2px] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                      Editorial
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="flex items-center gap-2 px-4 py-2 transition-all"
                    style={{
                      background: viewMode === "grid" ? colors.primary : 'transparent',
                      color: viewMode === "grid" ? colors.bg : colors.textLight,
                    }}
                  >
                    <Grid3x3 className="w-3 h-3" />
                    <span className="text-[10px] tracking-[2px] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                      Grid
                    </span>
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* PRODUCTS - HYBRID LAYOUT                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-20" style={{ background: colors.bg }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Section Header */}
          <FadeIn className="mb-12 sm:mb-16">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                {currentCategory?.name || "All Creations"}
              </div>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal"
                style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
              >
                {filteredItems.length} <span className="italic" style={{ color: colors.primary }}>masterpieces</span>
              </h2>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${viewMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >

              {/* ═══ EDITORIAL SECTION (First 3 items) ═══ */}
              {viewMode === "editorial" && editorialItems.length > 0 && (
                <div className="space-y-12 sm:space-y-16 md:space-y-20 mb-20">
                  {editorialItems.map((item: any, i: number) => {
                    const isEven = i % 2 === 0;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        onMouseEnter={() => setHoveredItem(i)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center"
                      >
                        
                        <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="relative group cursor-pointer max-w-sm mx-auto"
                            onClick={() => setSelectedItem(item)}
                            whileHover={{ scale: 0.98 }}
                          >
                            <div 
                              className="absolute -top-4 sm:-top-6 -left-2 sm:-left-4 text-[80px] sm:text-[100px] md:text-[120px] leading-[0.7] select-none pointer-events-none z-0"
                              style={{ 
                                fontFamily: "'Italiana', serif", 
                                color: colors.primary,
                                opacity: 0.1,
                              }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </div>

                            <div className="relative aspect-square overflow-hidden z-10">
                              {(item.image || item.image_url) ? (
                                <img 
                                  src={item.image || item.image_url} 
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: colors.bgCard }}>
                                  🎂
                                </div>
                              )}

                              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ borderColor: colors.primary }} />
                              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ borderColor: colors.primary }} />

                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `${colors.bg}66` }}>
                                <div className="text-center">
                                  <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                                  <div className="text-[10px] tracking-[4px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#FFFFFF' }}>
                                    View Details
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div 
                              className={`absolute border transition-all duration-700 pointer-events-none ${
                                isEven 
                                  ? "-bottom-2 -right-2 top-6 left-6" 
                                  : "-bottom-2 -left-2 top-6 right-6"
                              }`}
                              style={{ 
                                borderColor: colors.primary,
                                opacity: hoveredItem === i ? 1 : 0.3,
                              }}
                            />
                          </motion.div>
                        </div>

                        <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                          <motion.div
                            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 sm:w-14 h-px" style={{ background: colors.primary }} />
                              <span 
                                className="text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase"
                                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                              >
                                {item.featured ? "Bestseller" : "Signature"}
                              </span>
                            </div>

                            <div 
                              className="text-xs sm:text-sm tracking-[3px] uppercase mb-3"
                              style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}
                            >
                              No. {String(i + 1).padStart(3, '0')}
                            </div>

                            <h3
                              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-6 leading-[1]"
                              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                            >
                              <span style={{ color: '#FFFFFF' }}>{item.name.split(' ')[0]}</span>
                              {item.name.split(' ').slice(1).length > 0 && (
                                <>
                                  <br />
                                  <span 
                                    className="italic"
                                    style={{
                                      background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                      backgroundClip: 'text',
                                    }}
                                  >
                                    {item.name.split(' ').slice(1).join(' ')}
                                  </span>
                                </>
                              )}
                            </h3>

                            {item.description && (
                              <p
                                className="text-lg sm:text-xl md:text-2xl italic font-light leading-relaxed mb-8"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
                              >
                                &ldquo;{item.description}&rdquo;
                              </p>
                            )}

                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-8">
                                {item.tags.map((tag: string, j: number) => (
                                  <span
                                    key={j}
                                    className="text-xs px-3 py-1.5 border tracking-[2px] uppercase"
                                    style={{
                                      fontFamily: "'Cinzel', serif",
                                      borderColor: colors.primary,
                                      color: colors.primary,
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-end justify-between gap-4 pt-6 border-t" style={{ borderColor: colors.border }}>
                              {item.price && (
                                <div>
                                  <div className="text-xs sm:text-sm tracking-[3px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                                    Starting At
                                  </div>
                                  <div 
                                    className="text-4xl sm:text-5xl md:text-6xl"
                                    style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                                  >
                                    {String(item.price).includes(currency) ? item.price : `${currency}${item.price}`}
                                  </div>
                                </div>
                              )}
                              
                              {client.whatsapp && (
                                <motion.a
                                  href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=I would like to order: ${item.name}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  whileHover={{ x: 5 }}
                                  className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase font-bold no-underline group/btn"
                                  style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                                >
                                  <span>Reserve</span>
                                  <div className="w-10 sm:w-14 h-px transition-all duration-300 group-hover/btn:w-16 sm:group-hover/btn:w-20" style={{ background: colors.primary }} />
                                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </motion.a>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* ═══ DIVIDER between Editorial and Grid ═══ */}
              {viewMode === "editorial" && editorialItems.length > 0 && gridItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1 }}
                  className="my-20"
                >
                  <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
                    <div className="text-center">
                      <div className="text-xs sm:text-sm tracking-[4px] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                        More Creations
                      </div>
                      <div className="text-2xl" style={{ color: colors.primary }}>✦</div>
                    </div>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
                  </div>
                </motion.div>
              )}

              {/* ═══ GRID SECTION (Remaining items OR all if grid mode) ═══ */}
              {gridItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {gridItems.map((item: any, i: number) => {
                    const actualIndex = viewMode === "editorial" ? i + editorialItems.length : i;
                    return (
                      <motion.div
                        key={actualIndex}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedItem(item)}
                        className="group cursor-pointer"
                      >
                        <div className="relative">
                          {/* Image */}
                          <div className="relative aspect-square overflow-hidden">
                            {(item.image || item.image_url) ? (
                              <img 
                                src={item.image || item.image_url} 
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: colors.bgCard }}>
                                🎂
                              </div>
                            )}

                            {/* Number badge */}
                            <div 
                              className="absolute top-3 left-3 px-2 py-1 backdrop-blur-md"
                              style={{ 
                                background: `${colors.bg}99`,
                                color: colors.primary,
                              }}
                            >
                              <span className="text-[10px] tracking-[2px]" style={{ fontFamily: "'Cinzel', serif" }}>
                                No. {String(actualIndex + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Featured badge */}
                            {item.featured && (
                              <div 
                                className="absolute top-3 right-3 px-2 py-1 text-[10px] tracking-[2px] uppercase font-bold flex items-center gap-1"
                                style={{ 
                                  fontFamily: "'Cinzel', serif", 
                                  background: colors.primary,
                                  color: colors.bg,
                                }}
                              >
                                <Heart className="w-3 h-3 fill-current" />
                                Top
                              </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `${colors.bg}99` }}>
                              <div className="text-center">
                                <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                                <div className="text-[10px] tracking-[4px] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#FFFFFF' }}>
                                  View Details
                                </div>
                              </div>
                            </div>

                            {/* Gold corners on hover */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: colors.primary }} />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: colors.primary }} />
                          </div>

                          {/* Info Below Image */}
                          <div className="pt-5 pb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-px" style={{ background: colors.primary }} />
                              <span 
                                className="text-[10px] tracking-[3px] uppercase"
                                style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}
                              >
                                Signature
                              </span>
                            </div>

                            <h3
                              className="text-xl sm:text-2xl font-normal mb-2 leading-tight transition-colors group-hover:text-[#D4AF37]"
                              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                            >
                              {item.name}
                            </h3>

                            {item.description && (
                              <p
                                className="text-xs sm:text-sm italic mb-3 leading-relaxed line-clamp-2"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.6)' }}
                              >
                                {item.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.border }}>
                              {item.price && (
                                <div 
                                  className="text-xl sm:text-2xl"
                                  style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                                >
                                  {String(item.price).includes(currency) ? item.price : `${currency}${item.price}`}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2 text-[10px] tracking-[2px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                                <span>Order</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Empty State */}
              {filteredItems.length === 0 && (
                <FadeIn className="text-center py-16">
                  <div className="text-6xl mb-4 opacity-20">🎂</div>
                  <h3 className="text-2xl sm:text-3xl italic mb-3" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {searchQuery ? `No results for "${searchQuery}"` : "Collection Coming Soon"}
                  </h3>
                  <p className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                    Our masterpieces are being crafted
                  </p>
                </FadeIn>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CUSTOM ORDER */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden" style={{ background: colors.bgSecondary }}>
        
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: colors.primary, filter: 'blur(80px)' }} />

        <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              
              <FadeIn>
                <div className="text-xs sm:text-sm tracking-[6px] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                  — Bespoke Service —
                </div>
                
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[0.95] mb-6"
                  style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
                >
                  <span style={{ color: '#FFFFFF' }}>Your Vision,</span>
                  <br />
                  <span 
                    className="italic"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, #F4D03F 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Our Craft.
                  </span>
                </h2>

                <p
                  className="text-lg sm:text-xl italic font-light leading-relaxed mb-8 max-w-md"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.8)' }}
                >
                  Cannot find what you envision? Let our master baker bring your dream to life with a bespoke creation.
                </p>

                {client.whatsapp && (
                  <motion.a
                    href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=Hi! I would like to commission a bespoke cake.`}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm tracking-[4px] uppercase font-bold no-underline group"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      color: colors.bg,
                    }}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Commission Bespoke
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                )}
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="space-y-5 sm:space-y-6">
                  {[
                    { step: "I", title: "Consult", desc: "Share your vision with our atelier" },
                    { step: "II", title: "Design", desc: "We craft a bespoke concept just for you" },
                    { step: "III", title: "Create", desc: "Handcrafted with the finest ingredients" },
                    { step: "IV", title: "Delight", desc: "Delivered to make your moment unforgettable" },
                  ].map((process, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4 sm:gap-5 group cursor-default"
                    >
                      <div 
                        className="text-4xl sm:text-5xl md:text-6xl w-16 sm:w-20 text-center transition-colors group-hover:text-white"
                        style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
                      >
                        {process.step}
                      </div>

                      <div className="w-10 sm:w-12 h-px transition-all duration-300 group-hover:w-14 sm:group-hover:w-20" style={{ background: colors.primary }} />

                      <div>
                        <div className="text-xl sm:text-2xl md:text-3xl mb-1" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                          {process.title}
                        </div>
                        <div className="text-sm sm:text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: colors.textLight }}>
                          {process.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE FOOTER */}
      <section className="relative py-16 sm:py-20 border-t" style={{ background: colors.bg, borderColor: colors.border }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center max-w-2xl">
          
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.primary})` }} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl sm:text-3xl"
                style={{ color: colors.primary }}
              >
                ✦
              </motion.div>
              <div className="w-16 sm:w-20 h-px" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }} />
            </div>

            <p
              className="text-3xl sm:text-4xl md:text-5xl italic font-light leading-relaxed mb-6"
              style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>Crafted with</span>{' '}
              <span style={{ color: colors.primary }}>passion.</span>
              <br />
              <span style={{ color: '#FFFFFF' }}>Served with</span>{' '}
              <span style={{ color: colors.primary }}>love.</span>
            </p>

            <div className="mt-6">
              <div 
                className="text-3xl sm:text-4xl mb-1"
                style={{ fontFamily: "'Italiana', serif", color: colors.primary }}
              >
                — {restaurantName}
              </div>
              <div className="text-xs sm:text-sm tracking-[4px] uppercase" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                Atelier de Pâtisserie
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            style={{ background: `${colors.bg}EE`, backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{ background: colors.bgCard, border: `1px solid ${colors.primary}` }}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border transition-all hover:bg-white"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  {(selectedItem.image || selectedItem.image_url) ? (
                    <img 
                      src={selectedItem.image || selectedItem.image_url} 
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl" style={{ background: colors.bg }}>
                      🎂
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 md:p-10">
                  <div className="text-xs sm:text-sm tracking-[4px] uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: colors.primary }}>
                    Signature Creation
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl mb-3 leading-tight" style={{ fontFamily: "'Italiana', serif", color: '#FFFFFF' }}>
                    {selectedItem.name}
                  </h3>

                  <div className="h-px w-12 my-4" style={{ background: colors.primary }} />

                  {selectedItem.description && (
                    <p className="text-base sm:text-lg italic mb-6 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(240, 245, 240, 0.75)' }}>
                      {selectedItem.description}
                    </p>
                  )}

                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedItem.tags.map((tag: string, j: number) => (
                        <span
                          key={j}
                          className="text-xs px-3 py-1.5 border tracking-[2px] uppercase"
                          style={{
                            fontFamily: "'Cinzel', serif",
                            borderColor: colors.primary,
                            color: colors.primary,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {selectedItem.price && (
                    <div className="mb-6 pt-4 border-t" style={{ borderColor: colors.border }}>
                      <div className="text-xs sm:text-sm tracking-[3px] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif", color: colors.textLight }}>
                        Starting At
                      </div>
                      <div className="text-4xl sm:text-5xl md:text-6xl" style={{ fontFamily: "'Italiana', serif", color: colors.primary }}>
                        {String(selectedItem.price).includes(currency) ? selectedItem.price : `${currency}${selectedItem.price}`}
                      </div>
                    </div>
                  )}

                  {client.whatsapp && (
                    <motion.a
                      href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}?text=I would like to order: ${selectedItem.name}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="block w-full text-center px-6 py-4 text-xs sm:text-sm tracking-[4px] uppercase font-bold no-underline"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                        color: colors.bg,
                      }}
                    >
                      Reserve This Creation
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}