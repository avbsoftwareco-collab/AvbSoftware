// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   Save,
//   Eye,
//   Plus,
//   X,
//   Loader,
//   Phone,
//   Mail,
//   MapPin,
//   Star,
//   Trash2,
//   Sparkles,
//   Check,
//   BedDouble,
// } from "lucide-react";
// import {
//   getClientById,
//   updateClient,
//   deleteClient,
//   Client,
// } from "@/lib/supabase";
// import ImageUpload from "@/app/admin/ImageUpload";
// import CakeThemePicker from "@/app/admin/components/CakeThemePicker";
// import HeroVideoUpload from "@/app/admin/components/HeroVideoUpload";
// import RestaurantThemePicker from "../../../components/RestaurantThemePicker";
// import ResortThemePicker from "../../../components/ResortThemePicker";

// export default function EditWebsitePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);
//   const [activeMenuCat, setActiveMenuCat] = useState(0);
//   const [activeCakeMenuCat, setActiveCakeMenuCat] = useState(0);
//   const [activeTab, setActiveTab] = useState<
//     "basic" | "restaurant" | "cake" | "resort"
//   >("basic");

//   const [formData, setFormData] = useState<Client>({
//     template: "",
//     business_name: "",
//     subdomain: "",
//     tagline: "",
//     about: "",
//     phone: "",
//     whatsapp: "",
//     email: "",
//     address: "",
//     city: "Bhopal",
//     maps_link: "",
//     working_hours: "Mon-Sat: 9 AM - 8 PM",
//     facebook: "",
//     instagram: "",
//     products: [],
//     reviews: [],
//     primary_color: "#8B6F47",
//     secondary_color: "#C9A45C",
//     logo_url: "",
//     hero_image_url: "",
//     plan_type: "starter",
//     plan_price: 799,
//     custom_domain: "",
//     payment_status: "pending",
//     status: "draft",
//     opening_hours: [],
//     menu_categories: [],
//     gallery_images_detailed: [],
//   });

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("avb_admin_logged_in");
//     if (loggedIn !== "true") {
//       router.push("/admin");
//     } else {
//       setIsLoggedIn(true);
//       loadClient();
//     }
//   }, [router, params.id]);

//   const loadClient = async () => {
//     setLoading(true);
//     const client = await getClientById(params.id);
//     if (client) {
//       setFormData({
//         ...client,
//         products:
//           client.products && client.products.length > 0
//             ? client.products
//             : [{ name: "", price: "", description: "", image_url: "" }],
//         reviews:
//           client.reviews && client.reviews.length > 0
//             ? client.reviews
//             : [{ name: "", text: "", rating: 5, role: "" }],
//         opening_hours: client.opening_hours || [],
//         menu_categories: client.menu_categories || [],
//         gallery_images_detailed: client.gallery_images_detailed || [],
//       });
//     } else {
//       alert("Client not found!");
//       router.push("/admin/dashboard");
//     }
//     setLoading(false);
//   };

//   const handleChange = (field: keyof Client | string, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const selectPlan = (planType: "starter" | "professional") => {
//     const price = planType === "professional" ? 2499 : 799;
//     setFormData((prev) => ({
//       ...prev,
//       plan_type: planType,
//       plan_price: price,
//     }));
//   };

//   // ═══ Resort Rooms Functions ═══
//   const addRoom = () => {
//     const rooms = (formData as any).rooms || [];
//     handleChange("rooms", [
//       ...rooms,
//       {
//         id: Date.now(),
//         name: "New Room",
//         category: "Suites",
//         subtitle: "",
//         price: "10000",
//         image: "",
//         size: "40",
//         beds: "1 King",
//         guests: "2",
//         view: "Garden",
//         description: "",
//         amenities: [],
//         featured: false,
//       },
//     ]);
//   };

//   const removeRoom = (idx: number) => {
//     if (!confirm("Delete this room?")) return;
//     const rooms = (formData as any).rooms || [];
//     handleChange("rooms", rooms.filter((_: any, i: number) => i !== idx));
//   };

//   const updateRoom = (idx: number, field: string, value: any) => {
//     const rooms = (formData as any).rooms || [];
//     handleChange(
//       "rooms",
//       rooms.map((r: any, i: number) =>
//         i === idx ? { ...r, [field]: value } : r
//       )
//     );
//   };

//   // ═══ Resort Hero Slides ═══
//   const addHeroSlide = (url: string) => {
//     const slides = (formData as any).hero_slides || [];
//     handleChange("hero_slides", [...slides, url]);
//   };

//   const removeHeroSlide = (idx: number) => {
//     const slides = (formData as any).hero_slides || [];
//     handleChange(
//       "hero_slides",
//       slides.filter((_: any, i: number) => i !== idx)
//     );
//   };

//   // Generic add helpers
//   const addProduct = () =>
//     handleChange("products", [
//       ...(formData.products || []),
//       { name: "", price: "", description: "", image_url: "" },
//     ]);
//   const removeProduct = (i: number) =>
//     handleChange(
//       "products",
//       formData.products?.filter((_, idx) => idx !== i) || []
//     );
//   const updateProduct = (i: number, field: string, value: string) => {
//     const u = [...(formData.products || [])];
//     u[i] = { ...u[i], [field]: value };
//     handleChange("products", u);
//   };

//   const addReview = () =>
//     handleChange("reviews", [
//       ...(formData.reviews || []),
//       { name: "", text: "", rating: 5, role: "" },
//     ]);
//   const removeReview = (i: number) =>
//     handleChange(
//       "reviews",
//       formData.reviews?.filter((_, idx) => idx !== i) || []
//     );
//   const updateReview = (i: number, field: string, value: any) => {
//     const u = [...(formData.reviews || [])];
//     u[i] = { ...u[i], [field]: value };
//     handleChange("reviews", u);
//   };

//   const addOpeningHour = () =>
//     handleChange("opening_hours", [
//       ...(formData.opening_hours || []),
//       { days: "", hours: "" },
//     ]);
//   const removeOpeningHour = (i: number) =>
//     handleChange(
//       "opening_hours",
//       (formData.opening_hours || []).filter((_, idx) => idx !== i)
//     );
//   const updateOpeningHour = (i: number, field: string, value: string) => {
//     const u = [...(formData.opening_hours || [])];
//     u[i] = { ...u[i], [field]: value };
//     handleChange("opening_hours", u);
//   };

//   const addGalleryImage = (url: string) => {
//     handleChange("gallery_images_detailed", [
//       ...(formData.gallery_images_detailed || []),
//       { src: url, alt: "", category: "All" },
//     ]);
//   };
//   const removeGalleryImage = (i: number) => {
//     handleChange(
//       "gallery_images_detailed",
//       (formData.gallery_images_detailed || []).filter((_, idx) => idx !== i)
//     );
//   };

//   const handleUpdate = async (status?: "draft" | "live") => {
//     if (!formData.business_name || !formData.subdomain) {
//       alert("Business name aur subdomain required!");
//       return;
//     }
//     setSaving(true);
//     const result = await updateClient(params.id, {
//       ...formData,
//       ...(status && { status }),
//     });
//     if (result) {
//       alert("Updated!");
//       router.push("/admin/dashboard");
//     } else {
//       alert("Failed!");
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm(`Delete ${formData.business_name}?`)) return;
//     if (await deleteClient(params.id)) {
//       alert("Deleted!");
//       router.push("/admin/dashboard");
//     }
//   };

//   const isRestaurant = formData.template?.toLowerCase().includes("restaurant");
//   const isCake = formData.template?.toLowerCase().includes("cake");
//   const isResort = formData.template?.toLowerCase().includes("resort");

//   if (!isLoggedIn || loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
//         <div className="text-center">
//           <div className="text-6xl mb-4 animate-spin">⏳</div>
//           <p className="text-xl text-[#8B6F47] font-bold">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const SaveButtons = () => (
//     <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md flex flex-col md:flex-row gap-3">
//       <button
//         onClick={() => router.push("/admin/dashboard")}
//         className="px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl"
//       >
//         Cancel
//       </button>
//       <button
//         onClick={() => handleUpdate("draft")}
//         disabled={saving}
//         className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
//       >
//         {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
//         Save Draft
//       </button>
//       <button
//         onClick={() => handleUpdate("live")}
//         disabled={saving}
//         className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
//       >
//         {saving ? <Loader className="w-5 h-5 animate-spin" /> : <>🚀 Go Live</>}
//       </button>
//     </div>
//   );

//   const HeroImagesEditor = ({
//     labels,
//   }: {
//     labels: { field: string; label: string; desc?: string }[];
//   }) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {labels.map(({ field, label, desc }) => (
//         <div
//           key={field}
//           className="bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
//         >
//           <ImageUpload
//             label={label}
//             currentImage={(formData as any)[field]}
//             subdomain={formData.subdomain || "default"}
//             type="hero"
//             onUpload={(url) => handleChange(field, url)}
//             onRemove={() => handleChange(field, "")}
//           />
//           {desc && (
//             <p className="text-[10px] text-[#6B5D4A] mt-2 italic">{desc}</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const StatsEditor = ({ placeholders }: { placeholders: string[][] }) => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {[1, 2, 3, 4].map((num) => (
//         <div
//           key={num}
//           className="bg-[#FAF5EA] rounded-xl p-4 border border-[#E8DEC8]"
//         >
//           <span className="text-sm font-bold text-[#2B2419]">Stat #{num}</span>
//           <input
//             type="text"
//             value={(formData as any)[`stat_${num}_number`] || ""}
//             onChange={(e) => handleChange(`stat_${num}_number`, e.target.value)}
//             placeholder={placeholders[num - 1]?.[0] || "100+"}
//             className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm font-bold"
//           />
//           <input
//             type="text"
//             value={(formData as any)[`stat_${num}_label`] || ""}
//             onChange={(e) => handleChange(`stat_${num}_label`, e.target.value)}
//             placeholder={placeholders[num - 1]?.[1] || "Label"}
//             className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//           />
//         </div>
//       ))}
//     </div>
//   );

//   const GalleryEditor = () => (
//     <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//       <h2 className="text-xl font-bold text-[#2B2419] mb-1">🖼 Gallery Images</h2>
//       <p className="text-sm text-[#6B5D4A] mb-5">
//         {(formData.gallery_images_detailed || []).length} uploaded
//       </p>
//       <div className="mb-5 p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
//         <p className="text-xs font-bold text-[#2B2419] mb-3">Upload New:</p>
//         <ImageUpload
//           label="Gallery Photo"
//           currentImage={undefined}
//           subdomain={formData.subdomain || "default"}
//           type="gallery"
//           onUpload={(url) => addGalleryImage(url)}
//           onRemove={() => {}}
//         />
//       </div>
//       {(formData.gallery_images_detailed || []).length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//           {(formData.gallery_images_detailed || []).map((img, i) => (
//             <div
//               key={i}
//               className="relative group aspect-square rounded-xl overflow-hidden border border-[#E8DEC8]"
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt || `Gallery ${i + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() => removeGalleryImage(i)}
//                 className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#F5F0E6]">
//       {/* Header */}
//       <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <Link
//             href="/admin/dashboard"
//             className="flex items-center gap-2 text-[#8B6F47] font-semibold"
//           >
//             <ArrowLeft className="w-5 h-5" /> Back
//           </Link>
//           <h1 className="text-xl font-bold text-[#2B2419]">
//             {formData.business_name}
//           </h1>
//           <div className="flex gap-2">
//             <Link
//               href={`/site/${formData.subdomain}`}
//               target="_blank"
//               className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm flex items-center gap-1"
//             >
//               <Eye className="w-4 h-4" /> Preview
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm flex items-center gap-1"
//             >
//               <Trash2 className="w-4 h-4" /> Delete
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Status Bar */}
//       <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-3">
//         <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap text-sm">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-bold ${
//               formData.status === "live"
//                 ? "bg-green-500 text-white"
//                 : "bg-yellow-500 text-white"
//             }`}
//           >
//             {formData.status === "live" ? "🟢 LIVE" : "🟡 DRAFT"}
//           </span>
//           {isResort && (
//             <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
//               🏝️ Resort
//             </span>
//           )}
//           {isRestaurant && (
//             <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
//               🍽 Restaurant
//             </span>
//           )}
//           {isCake && (
//             <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
//               🎂 Cake
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Tabs */}
//       {(isRestaurant || isCake || isResort) && (
//         <div className="bg-white border-b border-[#E8DEC8]">
//           <div className="container mx-auto px-4">
//             <div className="flex gap-0 overflow-x-auto">
//               <button
//                 onClick={() => setActiveTab("basic")}
//                 className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
//                   activeTab === "basic"
//                     ? "border-[#8B6F47] text-[#8B6F47]"
//                     : "border-transparent text-gray-400"
//                 }`}
//               >
//                 📝 Basic Info
//               </button>
//               {isResort && (
//                 <button
//                   onClick={() => setActiveTab("resort")}
//                   className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
//                     activeTab === "resort"
//                       ? "border-blue-500 text-blue-500"
//                       : "border-transparent text-gray-400"
//                   }`}
//                 >
//                   🏝️ Resort
//                 </button>
//               )}
//               {isRestaurant && (
//                 <button
//                   onClick={() => setActiveTab("restaurant")}
//                   className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
//                     activeTab === "restaurant"
//                       ? "border-[#C9A45C] text-[#C9A45C]"
//                       : "border-transparent text-gray-400"
//                   }`}
//                 >
//                   🍽 Restaurant
//                 </button>
//               )}
//               {isCake && (
//                 <button
//                   onClick={() => setActiveTab("cake")}
//                   className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
//                     activeTab === "cake"
//                       ? "border-pink-500 text-pink-500"
//                       : "border-transparent text-gray-400"
//                   }`}
//                 >
//                   🎂 Cake
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="container mx-auto px-4 py-8 max-w-5xl">
//         {/* ═══ BASIC TAB ═══ */}
//         {((!isRestaurant && !isCake && !isResort) || activeTab === "basic") && (
//           <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md space-y-6">
//             {/* Plan, Business Info, Images, Reviews — same as before */}
//             <div>
//               <h2 className="text-2xl font-bold text-[#2B2419] mb-4">📝 Business Info</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Business Name *</label>
//                   <input
//                     type="text"
//                     value={formData.business_name}
//                     onChange={(e) => handleChange("business_name", e.target.value)}
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Subdomain *</label>
//                   <input
//                     type="text"
//                     value={formData.subdomain}
//                     onChange={(e) => handleChange("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Tagline</label>
//                   <input
//                     type="text"
//                     value={formData.tagline || ""}
//                     onChange={(e) => handleChange("tagline", e.target.value)}
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold mb-2">About</label>
//                   <textarea
//                     value={formData.about || ""}
//                     onChange={(e) => handleChange("about", e.target.value)}
//                     rows={4}
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl resize-none"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <input
//                     type="tel"
//                     value={formData.phone || ""}
//                     onChange={(e) => handleChange("phone", e.target.value)}
//                     placeholder="Phone"
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                   <input
//                     type="tel"
//                     value={formData.whatsapp || ""}
//                     onChange={(e) => handleChange("whatsapp", e.target.value)}
//                     placeholder="WhatsApp"
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                   <input
//                     type="email"
//                     value={formData.email || ""}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     placeholder="Email"
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                   <input
//                     type="text"
//                     value={formData.city || ""}
//                     onChange={(e) => handleChange("city", e.target.value)}
//                     placeholder="City"
//                     className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   value={formData.address || ""}
//                   onChange={(e) => handleChange("address", e.target.value)}
//                   placeholder="Address"
//                   className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                 />
//               </div>
//             </div>

//             <div className="border-t border-[#E8DEC8] pt-6">
//               <h2 className="text-2xl font-bold text-[#2B2419] mb-4">🖼️ Logo & Hero</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <ImageUpload
//                   label="🎨 Logo"
//                   currentImage={formData.logo_url}
//                   subdomain={formData.subdomain || "default"}
//                   type="logo"
//                   onUpload={(url) => handleChange("logo_url", url)}
//                   onRemove={() => handleChange("logo_url", "")}
//                 />
//                 <ImageUpload
//                   label="🖼️ Hero"
//                   currentImage={formData.hero_image_url}
//                   subdomain={formData.subdomain || "default"}
//                   type="hero"
//                   onUpload={(url) => handleChange("hero_image_url", url)}
//                   onRemove={() => handleChange("hero_image_url", "")}
//                 />
//               </div>
//             </div>

//             <SaveButtons />
//           </div>
//         )}



//         {/* ═══════════════════════════════════
//             🏝️ RESORT TAB
//         ═══════════════════════════════════ */}
//         {isResort && activeTab === "resort" && (
//           <div className="space-y-6">
//             {/* 🎨 Resort Theme Picker */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <ResortThemePicker
//                 selected={(formData as any).resort_theme || "royal_onyx"}
//                 onSelect={(id) => handleChange("resort_theme", id)}
//               />
//             </div>

//             {/* 🎬 Hero Slides */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-1">
//                 🎬 Hero Slideshow Images
//               </h2>
//               <p className="text-sm text-[#6B5D4A] mb-5">
//                 Add multiple images for the home page slideshow (auto-rotating)
//               </p>

//               <div className="mb-5 p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
//                 <p className="text-xs font-bold text-[#2B2419] mb-3">
//                   Upload Slide:
//                 </p>
//                 <ImageUpload
//                   label="Hero Slide Image"
//                   currentImage={undefined}
//                   subdomain={formData.subdomain || "default"}
//                   type="hero"
//                   onUpload={(url) => addHeroSlide(url)}
//                   onRemove={() => {}}
//                 />
//               </div>

//               {(formData as any).hero_slides &&
//                 (formData as any).hero_slides.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                     {(formData as any).hero_slides.map(
//                       (slide: string, i: number) => (
//                         <div
//                           key={i}
//                           className="relative group aspect-video rounded-xl overflow-hidden border border-[#E8DEC8]"
//                         >
//                           <img
//                             src={slide}
//                             alt={`Slide ${i + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                           <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
//                             #{i + 1}
//                           </div>
//                           <button
//                             onClick={() => removeHeroSlide(i)}
//                             className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}
//             </div>

//             {/* 🎥 Hero Video (Optional) */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-1">
//                 🎥 Hero Video (Optional)
//               </h2>
//               <p className="text-sm text-[#6B5D4A] mb-5">
//                 If set, video will replace slideshow
//               </p>
//               <input
//                 type="text"
//                 value={(formData as any).hero_video_url || ""}
//                 onChange={(e) => handleChange("hero_video_url", e.target.value)}
//                 placeholder="https://example.com/video.mp4"
//                 className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//               />
//             </div>

//             {/* 🖼️ Page Hero Images */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                 🖼 Page Hero Images
//               </h2>
//               <HeroImagesEditor
//                 labels={[
//                   { field: "about_hero_image", label: "👥 About Page" },
//                   { field: "rooms_hero_image", label: "🛏 Rooms Page" },
//                   { field: "amenities_hero_image", label: "🌊 Amenities Page" },
//                   { field: "gallery_hero_image", label: "🖼 Gallery Page" },
//                   { field: "reviews_hero_image", label: "⭐ Reviews Page" },
//                   { field: "contact_hero_image", label: "📞 Contact Page" },
//                 ]}
//               />
//             </div>

//             {/* 👥 About Section */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                 👥 About Section
//               </h2>
//               <div className="grid grid-cols-2 gap-4 mb-5">
//                 <ImageUpload
//                   label="About Image"
//                   currentImage={(formData as any).about_image}
//                   subdomain={formData.subdomain || "default"}
//                   type="about"
//                   onUpload={(url) => handleChange("about_image", url)}
//                   onRemove={() => handleChange("about_image", "")}
//                 />
//                 <ImageUpload
//                   label="Featured Image"
//                   currentImage={(formData as any).featured_image_1}
//                   subdomain={formData.subdomain || "default"}
//                   type="featured"
//                   onUpload={(url) => handleChange("featured_image_1", url)}
//                   onRemove={() => handleChange("featured_image_1", "")}
//                 />
//               </div>
//               <input
//                 type="text"
//                 value={(formData as any).year_established || ""}
//                 onChange={(e) => handleChange("year_established", e.target.value)}
//                 placeholder="Year Established (e.g. 1999)"
//                 className="w-full px-4 py-3 mb-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//               />
//               <textarea
//                 value={(formData as any).about_short || ""}
//                 onChange={(e) => handleChange("about_short", e.target.value)}
//                 placeholder="Short About (Home page)"
//                 rows={3}
//                 className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl resize-none"
//               />
//             </div>

//             {/* 👨‍💼 Founder Section */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                 👨‍💼 Founder / Owner
//               </h2>
//               <ImageUpload
//                 label="Founder Photo"
//                 currentImage={(formData as any).founder_image || (formData as any).chef_image}
//                 subdomain={formData.subdomain || "default"}
//                 type="chef"
//                 onUpload={(url) => {
//                   handleChange("founder_image", url);
//                   handleChange("chef_image", url);
//                 }}
//                 onRemove={() => {
//                   handleChange("founder_image", "");
//                   handleChange("chef_image", "");
//                 }}
//               />
//               <div className="grid grid-cols-2 gap-3 mt-4">
//                 <input
//                   type="text"
//                   value={(formData as any).founder_name || (formData as any).chef_name || ""}
//                   onChange={(e) => {
//                     handleChange("founder_name", e.target.value);
//                     handleChange("chef_name", e.target.value);
//                   }}
//                   placeholder="Founder Name"
//                   className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
//                 />
//                 <input
//                   type="text"
//                   value={(formData as any).founder_role || (formData as any).chef_role || ""}
//                   onChange={(e) => {
//                     handleChange("founder_role", e.target.value);
//                     handleChange("chef_role", e.target.value);
//                   }}
//                   placeholder="Role / Title"
//                   className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
//                 />
//               </div>
//               <textarea
//                 value={(formData as any).founder_quote || (formData as any).chef_quote || ""}
//                 onChange={(e) => {
//                   handleChange("founder_quote", e.target.value);
//                   handleChange("chef_quote", e.target.value);
//                 }}
//                 placeholder="Quote / Message from founder"
//                 rows={3}
//                 className="w-full mt-3 px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
//               />
//             </div>

//             {/* 💎 Mission & Vision */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                 💎 Mission & Vision
//               </h2>
//               <label className="block text-xs font-bold text-[#2B2419] mb-1">
//                 Mission
//               </label>
//               <textarea
//                 value={(formData as any).mission || ""}
//                 onChange={(e) => handleChange("mission", e.target.value)}
//                 placeholder="Our mission..."
//                 rows={3}
//                 className="w-full mb-4 px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
//               />
//               <label className="block text-xs font-bold text-[#2B2419] mb-1">
//                 Vision
//               </label>
//               <textarea
//                 value={(formData as any).vision || ""}
//                 onChange={(e) => handleChange("vision", e.target.value)}
//                 placeholder="Our vision..."
//                 rows={3}
//                 className="w-full px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
//               />
//             </div>

//             {/* 📊 Stats */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">📊 Stats</h2>
//               <StatsEditor
//                 placeholders={[
//                   ["150+", "Luxury Rooms"],
//                   ["25+", "Years Heritage"],
//                   ["50K+", "Happy Guests"],
//                   ["4.9★", "Guest Rating"],
//                 ]}
//               />
//             </div>

//             {/* 🕐 Hours */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                 🕐 Reception Hours
//               </h2>
//               <div className="space-y-3 mb-3">
//                 {(formData.opening_hours || []).map((h, i) => (
//                   <div
//                     key={i}
//                     className="flex gap-2 items-center bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
//                   >
//                     <input
//                       type="text"
//                       value={h.days}
//                       onChange={(e) => updateOpeningHour(i, "days", e.target.value)}
//                       placeholder="Days (e.g. Mon-Fri)"
//                       className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                     />
//                     <input
//                       type="text"
//                       value={h.hours}
//                       onChange={(e) => updateOpeningHour(i, "hours", e.target.value)}
//                       placeholder="Hours (e.g. 24/7)"
//                       className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                     />
//                     <button
//                       onClick={() => removeOpeningHour(i)}
//                       className="text-red-400 p-1"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={addOpeningHour}
//                 className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-4 h-4" /> Add Hours
//               </button>
//             </div>

//             {/* 🛏️ Rooms Manager */}
//             <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//               <div className="flex items-center justify-between mb-5">
//                 <div>
//                   <h2 className="text-xl font-bold text-[#2B2419] flex items-center gap-2">
//                     <BedDouble className="w-6 h-6" /> Rooms & Villas
//                   </h2>
//                   <p className="text-sm text-[#6B5D4A]">
//                     {((formData as any).rooms || []).length} rooms added
//                   </p>
//                 </div>
//                 <button
//                   onClick={addRoom}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" /> Add Room
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {((formData as any).rooms || []).map((room: any, i: number) => (
//                   <div
//                     key={i}
//                     className="p-5 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="font-bold text-[#2B2419]">
//                         Room #{i + 1} {room.featured && "⭐"}
//                       </h4>
//                       <button
//                         onClick={() => removeRoom(i)}
//                         className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <ImageUpload
//                       label="Room Photo"
//                       currentImage={room.image}
//                       subdomain={formData.subdomain || "default"}
//                       type="product"
//                       onUpload={(url) => updateRoom(i, "image", url)}
//                       onRemove={() => updateRoom(i, "image", "")}
//                     />

//                     <div className="grid grid-cols-2 gap-3 mt-4">
//                       <input
//                         type="text"
//                         value={room.name}
//                         onChange={(e) => updateRoom(i, "name", e.target.value)}
//                         placeholder="Room Name"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                       <input
//                         type="text"
//                         value={room.subtitle}
//                         onChange={(e) => updateRoom(i, "subtitle", e.target.value)}
//                         placeholder="Subtitle (e.g. Beach Luxury)"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                     </div>

//                     <div className="grid grid-cols-3 gap-3 mt-3">
//                       <select
//                         value={room.category}
//                         onChange={(e) => updateRoom(i, "category", e.target.value)}
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       >
//                         <option value="Suites">Suites</option>
//                         <option value="Villas">Villas</option>
//                         <option value="Penthouses">Penthouses</option>
//                         <option value="Cottages">Cottages</option>
//                         <option value="Bungalows">Bungalows</option>
//                       </select>
//                       <input
//                         type="number"
//                         value={room.price}
//                         onChange={(e) => updateRoom(i, "price", e.target.value)}
//                         placeholder="Price (₹)"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                       <input
//                         type="text"
//                         value={room.size}
//                         onChange={(e) => updateRoom(i, "size", e.target.value)}
//                         placeholder="Size (m²)"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                     </div>

//                     <div className="grid grid-cols-3 gap-3 mt-3">
//                       <input
//                         type="text"
//                         value={room.beds}
//                         onChange={(e) => updateRoom(i, "beds", e.target.value)}
//                         placeholder="Beds (e.g. 1 King)"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                       <input
//                         type="text"
//                         value={room.guests}
//                         onChange={(e) => updateRoom(i, "guests", e.target.value)}
//                         placeholder="Max Guests"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                       <input
//                         type="text"
//                         value={room.view}
//                         onChange={(e) => updateRoom(i, "view", e.target.value)}
//                         placeholder="View (Garden/Beach)"
//                         className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                       />
//                     </div>

//                     <textarea
//                       value={room.description}
//                       onChange={(e) => updateRoom(i, "description", e.target.value)}
//                       placeholder="Description"
//                       rows={2}
//                       className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm resize-none"
//                     />

//                     <input
//                       type="text"
//                       value={(room.amenities || []).join(", ")}
//                       onChange={(e) =>
//                         updateRoom(
//                           i,
//                           "amenities",
//                           e.target.value.split(",").map((a) => a.trim()).filter(Boolean)
//                         )
//                       }
//                       placeholder="Amenities (comma separated: WiFi, AC, Pool)"
//                       className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//                     />

//                     <label className="flex items-center gap-2 mt-3 text-sm cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={room.featured || false}
//                         onChange={(e) => updateRoom(i, "featured", e.target.checked)}
//                       />
//                       <span className="font-bold text-[#2B2419]">⭐ Featured Room</span>
//                     </label>
//                   </div>
//                 ))}

//                 {((formData as any).rooms || []).length === 0 && (
//                   <button
//                     onClick={addRoom}
//                     className="w-full py-8 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-2xl font-bold flex items-center justify-center gap-2"
//                   >
//                     <Plus className="w-5 h-5" /> Add Your First Room
//                   </button>
//                 )}
//               </div>
//             </div>


//             {/* 🌊 EXPERIENCES MANAGER */}
// <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//   <div className="flex items-center justify-between mb-5">
//     <div>
//       <h2 className="text-xl font-bold text-[#2B2419] flex items-center gap-2">
//         🌊 Curated Experiences
//       </h2>
//       <p className="text-sm text-[#6B5D4A]">
//         4 experience cards shown on Home page
//       </p>
//     </div>
//   </div>

//   <div className="space-y-4">
//     {[1, 2, 3, 4].map((num) => (
//       <div
//         key={num}
//         className="p-5 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
//       >
//         <div className="flex items-center gap-2 mb-4">
//           <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
//             {num}
//           </span>
//           <h4 className="font-bold text-[#2B2419]">Experience #{num}</h4>
//         </div>

//         <ImageUpload
//           label="Experience Image"
//           currentImage={(formData as any)[`exp_image_${num}`]}
//           subdomain={formData.subdomain || "default"}
//           type="featured"
//           onUpload={(url) => handleChange(`exp_image_${num}`, url)}
//           onRemove={() => handleChange(`exp_image_${num}`, "")}
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
//           <input
//             type="text"
//             value={(formData as any)[`exp_title_${num}`] || ""}
//             onChange={(e) => handleChange(`exp_title_${num}`, e.target.value)}
//             placeholder={
//               num === 1
//                 ? "e.g. Infinity Pool"
//                 : num === 2
//                 ? "e.g. Garden Spa"
//                 : num === 3
//                 ? "e.g. Fine Dining"
//                 : "e.g. Private Beach"
//             }
//             className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//           />
//           <input
//             type="text"
//             value={(formData as any)[`exp_desc_${num}`] || ""}
//             onChange={(e) => handleChange(`exp_desc_${num}`, e.target.value)}
//             placeholder="Short description"
//             className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
//           />
//         </div>
//       </div>
//     ))}
//   </div>

//   <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
//     <p className="text-xs text-blue-800">
//       💡 <strong>Tip:</strong> These 4 experiences will appear on the home page
//       under "Moments of Pure Bliss" section.
//     </p>
//   </div>
// </div>

// {/* 🖼️ ADVANCED GALLERY MANAGER (Multiple Upload + Categories) */}
// <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//   <div className="flex items-center justify-between mb-5">
//     <div>
//       <h2 className="text-xl font-bold text-[#2B2419] flex items-center gap-2">
//         🖼️ Gallery Manager
//       </h2>
//       <p className="text-sm text-[#6B5D4A]">
//         {(formData.gallery_images_detailed || []).length} images uploaded
//       </p>
//     </div>
//   </div>

//   {/* Upload Section */}
//   <div className="mb-5 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-dashed border-blue-300">
//     <p className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
//       📤 Upload New Image
//     </p>
//     <ImageUpload
//       label="Click to upload gallery image"
//       currentImage={undefined}
//       subdomain={formData.subdomain || "default"}
//       type="gallery"
//       onUpload={(url) => addGalleryImage(url)}
//       onRemove={() => {}}
//     />
//     <p className="text-xs text-blue-700 mt-2 italic">
//       ✨ Upload multiple images one by one. Each image can have category +
//       description.
//     </p>
//   </div>

//   {/* Images Grid with Edit */}
//   {(formData.gallery_images_detailed || []).length > 0 ? (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-sm font-bold text-[#2B2419]">
//           📸 Uploaded Images ({(formData.gallery_images_detailed || []).length})
//         </h3>
//         <button
//           onClick={() => {
//             if (confirm("Delete ALL gallery images?")) {
//               handleChange("gallery_images_detailed", []);
//             }
//           }}
//           className="text-xs text-red-500 font-bold hover:bg-red-50 px-3 py-1 rounded-lg"
//         >
//           🗑 Clear All
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {(formData.gallery_images_detailed || []).map((img, i) => (
//           <div
//             key={i}
//             className="p-3 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
//           >
//             {/* Image Preview */}
//             <div className="relative aspect-square rounded-xl overflow-hidden mb-3 group">
//               <img
//                 src={img.src}
//                 alt={img.alt || `Gallery ${i + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() => removeGalleryImage(i)}
//                 className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//               <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
//                 #{i + 1}
//               </div>
//             </div>

//             {/* Category Dropdown */}
//             <select
//               value={img.category || "All"}
//               onChange={(e) => {
//                 const updated = [
//                   ...(formData.gallery_images_detailed || []),
//                 ];
//                 updated[i] = { ...updated[i], category: e.target.value };
//                 handleChange("gallery_images_detailed", updated);
//               }}
//               className="w-full px-3 py-2 mb-2 bg-white border border-[#E8DEC8] rounded-lg text-sm font-semibold"
//             >
//               <option value="All">All</option>
//               <option value="Rooms">Rooms</option>
//               <option value="Pool">Pool</option>
//               <option value="Spa">Spa</option>
//               <option value="Beach">Beach</option>
//               <option value="Dining">Dining</option>
//               <option value="Resort">Resort</option>
//               <option value="Garden">Garden</option>
//               <option value="Events">Events</option>
//             </select>

//             {/* Alt Text */}
//             <input
//               type="text"
//               value={img.alt || ""}
//               onChange={(e) => {
//                 const updated = [
//                   ...(formData.gallery_images_detailed || []),
//                 ];
//                 updated[i] = { ...updated[i], alt: e.target.value };
//                 handleChange("gallery_images_detailed", updated);
//               }}
//               placeholder="Image description (e.g. Sunset View)"
//               className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-xs"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   ) : (
//     <div className="text-center py-12 bg-[#FAF5EA] rounded-2xl border-2 border-dashed border-[#E8DEC8]">
//       <div className="text-5xl mb-3">📷</div>
//       <p className="text-[#6B5D4A] font-semibold mb-1">No images yet</p>
//       <p className="text-xs text-[#8B6F47]">
//         Upload your first gallery image above ☝️
//       </p>
//     </div>
//   )}

//   {/* Category Stats */}
//   {(formData.gallery_images_detailed || []).length > 0 && (
//     <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
//       <p className="text-xs font-bold text-amber-900 mb-2">
//         📊 Category Distribution:
//       </p>
//       <div className="flex flex-wrap gap-2">
//         {Array.from(
//           new Set(
//             (formData.gallery_images_detailed || []).map(
//               (img) => img.category || "All"
//             )
//           )
//         ).map((cat) => {
//           const count = (formData.gallery_images_detailed || []).filter(
//             (img) => (img.category || "All") === cat
//           ).length;
//           return (
//             <span
//               key={cat}
//               className="px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 border border-amber-300"
//             >
//               {cat} ({count})
//             </span>
//           );
//         })}
//       </div>
//     </div>
//   )}
// </div>

//             {/* 🖼️ Gallery */}
//             <GalleryEditor />

//             {/* 🌐 Custom Domain + SEO (if Pro) */}
//             {formData.plan_type === "professional" && (
//               <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
//                 <h2 className="text-xl font-bold text-[#2B2419] mb-5">
//                   👑 Professional Features
//                 </h2>
//                 <label className="block text-sm font-bold mb-2">Custom Domain</label>
//                 <input
//                   type="text"
//                   value={formData.custom_domain || ""}
//                   onChange={(e) => handleChange("custom_domain", e.target.value)}
//                   placeholder="yourresort.com"
//                   className="w-full mb-4 px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                 />
//                 <label className="block text-sm font-bold mb-2">Google Analytics ID</label>
//                 <input
//                   type="text"
//                   value={(formData as any).google_analytics_id || ""}
//                   onChange={(e) => handleChange("google_analytics_id", e.target.value)}
//                   placeholder="G-XXXXXXXXXX"
//                   className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
//                 />
//               </div>
//             )}


            

//             <SaveButtons />
//           </div>
//         )}

        
//       </main>
//     </div>
//   );
// }






"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  X,
  Loader,
  Star,
  Trash2,
  BedDouble,
} from "lucide-react";
import {
  getClientById,
  updateClient,
  deleteClient,
  Client,
} from "@/lib/supabase";
import ImageUpload from "@/app/admin/ImageUpload";
import CakeThemePicker from "@/app/admin/components/CakeThemePicker";
import HeroVideoUpload from "@/app/admin/components/HeroVideoUpload";
import RestaurantThemePicker from "../../../components/RestaurantThemePicker";
import ResortThemePicker from "../../../components/ResortThemePicker";

export default function EditWebsitePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "basic" | "restaurant" | "cake" | "resort"
  >("basic");

  const [formData, setFormData] = useState<Client>({
    template: "",
    business_name: "",
    subdomain: "",
    tagline: "",
    about: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "Bhopal",
    maps_link: "",
    working_hours: "Mon-Sat: 9 AM - 8 PM",
    facebook: "",
    instagram: "",
    products: [],
    reviews: [],
    primary_color: "#8B6F47",
    secondary_color: "#C9A45C",
    logo_url: "",
    hero_image_url: "",
    plan_type: "starter",
    plan_price: 799,
    custom_domain: "",
    payment_status: "pending",
    status: "draft",
    opening_hours: [],
    menu_categories: [],
    gallery_images_detailed: [],
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      loadClient();
    }
  }, [router, params.id]);

  const loadClient = async () => {
    setLoading(true);
    const client = await getClientById(params.id);
    if (client) {
      setFormData({
        ...client,
        products:
          client.products && client.products.length > 0
            ? client.products
            : [{ name: "", price: "", description: "", image_url: "" }],
        reviews:
          client.reviews && client.reviews.length > 0
            ? client.reviews
            : [{ name: "", text: "", rating: 5, role: "" }],
        opening_hours: client.opening_hours || [],
        menu_categories: client.menu_categories || [],
        gallery_images_detailed: client.gallery_images_detailed || [],
      });
    } else {
      alert("Client not found!");
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  const handleChange = (field: keyof Client | string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ═══ Resort Rooms Functions ═══
  const addRoom = () => {
    const rooms = (formData as any).rooms || [];
    handleChange("rooms", [
      ...rooms,
      {
        id: Date.now(),
        name: "New Room",
        category: "Suites",
        subtitle: "",
        price: "10000",
        image: "",
        size: "40",
        beds: "1 King",
        guests: "2",
        view: "Garden",
        description: "",
        amenities: [],
        featured: false,
      },
    ]);
  };

  const removeRoom = (idx: number) => {
    if (!confirm("Delete this room?")) return;
    const rooms = (formData as any).rooms || [];
    handleChange(
      "rooms",
      rooms.filter((_: any, i: number) => i !== idx)
    );
  };

  const updateRoom = (idx: number, field: string, value: any) => {
    const rooms = (formData as any).rooms || [];
    handleChange(
      "rooms",
      rooms.map((r: any, i: number) =>
        i === idx ? { ...r, [field]: value } : r
      )
    );
  };

  // ═══ Resort Hero Slides ═══
  const addHeroSlide = (url: string) => {
    const slides = (formData as any).hero_slides || [];
    handleChange("hero_slides", [...slides, url]);
  };

  const removeHeroSlide = (idx: number) => {
    const slides = (formData as any).hero_slides || [];
    handleChange(
      "hero_slides",
      slides.filter((_: any, i: number) => i !== idx)
    );
  };

  // Generic add helpers
  const addProduct = () =>
    handleChange("products", [
      ...(formData.products || []),
      { name: "", price: "", description: "", image_url: "" },
    ]);
  const removeProduct = (i: number) =>
    handleChange(
      "products",
      formData.products?.filter((_, idx) => idx !== i) || []
    );
  const updateProduct = (i: number, field: string, value: string) => {
    const u = [...(formData.products || [])];
    u[i] = { ...u[i], [field]: value };
    handleChange("products", u);
  };

  const addReview = () =>
    handleChange("reviews", [
      ...(formData.reviews || []),
      { name: "", text: "", rating: 5, role: "" },
    ]);
  const removeReview = (i: number) =>
    handleChange(
      "reviews",
      formData.reviews?.filter((_, idx) => idx !== i) || []
    );
  const updateReview = (i: number, field: string, value: any) => {
    const u = [...(formData.reviews || [])];
    u[i] = { ...u[i], [field]: value };
    handleChange("reviews", u);
  };

  const addOpeningHour = () =>
    handleChange("opening_hours", [
      ...(formData.opening_hours || []),
      { days: "", hours: "" },
    ]);
  const removeOpeningHour = (i: number) =>
    handleChange(
      "opening_hours",
      (formData.opening_hours || []).filter((_, idx) => idx !== i)
    );
  const updateOpeningHour = (i: number, field: string, value: string) => {
    const u = [...(formData.opening_hours || [])];
    u[i] = { ...u[i], [field]: value };
    handleChange("opening_hours", u);
  };

  const addGalleryImage = (url: string) => {
    handleChange("gallery_images_detailed", [
      ...(formData.gallery_images_detailed || []),
      { src: url, alt: "", category: "All" },
    ]);
  };
  const removeGalleryImage = (i: number) => {
    handleChange(
      "gallery_images_detailed",
      (formData.gallery_images_detailed || []).filter((_, idx) => idx !== i)
    );
  };

  const handleUpdate = async (status?: "draft" | "live") => {
    if (!formData.business_name || !formData.subdomain) {
      alert("Business name aur subdomain required!");
      return;
    }
    setSaving(true);
    const result = await updateClient(params.id, {
      ...formData,
      ...(status && { status }),
    });
    if (result) {
      alert("Updated!");
      router.push("/admin/dashboard");
    } else {
      alert("Failed!");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${formData.business_name}?`)) return;
    if (await deleteClient(params.id)) {
      alert("Deleted!");
      router.push("/admin/dashboard");
    }
  };

  const isRestaurant = formData.template?.toLowerCase().includes("restaurant");
  const isCake = formData.template?.toLowerCase().includes("cake");
  const isResort = formData.template?.toLowerCase().includes("resort");

  if (!isLoggedIn || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-xl text-[#8B6F47] font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  const SaveButtons = () => (
    <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md flex flex-col md:flex-row gap-3">
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl"
      >
        Cancel
      </button>
      <button
        onClick={() => handleUpdate("draft")}
        disabled={saving}
        className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
      >
        {saving ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        Save Draft
      </button>
      <button
        onClick={() => handleUpdate("live")}
        disabled={saving}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
      >
        {saving ? <Loader className="w-5 h-5 animate-spin" /> : <>🚀 Go Live</>}
      </button>
    </div>
  );

  const HeroImagesEditor = ({
    labels,
  }: {
    labels: { field: string; label: string; desc?: string }[];
  }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {labels.map(({ field, label, desc }) => (
        <div
          key={field}
          className="bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
        >
          <ImageUpload
            label={label}
            currentImage={(formData as any)[field]}
            subdomain={formData.subdomain || "default"}
            type="hero"
            onUpload={(url) => handleChange(field, url)}
            onRemove={() => handleChange(field, "")}
          />
          {desc && (
            <p className="text-[10px] text-[#6B5D4A] mt-2 italic">{desc}</p>
          )}
        </div>
      ))}
    </div>
  );

  const StatsEditor = ({ placeholders }: { placeholders: string[][] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className="bg-[#FAF5EA] rounded-xl p-4 border border-[#E8DEC8]"
        >
          <span className="text-sm font-bold text-[#2B2419]">Stat #{num}</span>
          <input
            type="text"
            value={(formData as any)[`stat_${num}_number`] || ""}
            onChange={(e) => handleChange(`stat_${num}_number`, e.target.value)}
            placeholder={placeholders[num - 1]?.[0] || "100+"}
            className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm font-bold"
          />
          <input
            type="text"
            value={(formData as any)[`stat_${num}_label`] || ""}
            onChange={(e) => handleChange(`stat_${num}_label`, e.target.value)}
            placeholder={placeholders[num - 1]?.[1] || "Label"}
            className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
          />
        </div>
      ))}
    </div>
  );

  const GalleryEditor = () => (
    <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
      <h2 className="text-xl font-bold text-[#2B2419] mb-1">
        🖼 Gallery Manager
      </h2>
      <p className="text-sm text-[#6B5D4A] mb-5">
        {(formData.gallery_images_detailed || []).length} images uploaded
      </p>

      {/* Upload */}
      <div className="mb-5 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-dashed border-blue-300">
        <p className="text-sm font-bold text-blue-900 mb-3">
          📤 Upload New Image
        </p>
        <ImageUpload
          label="Click to upload"
          currentImage={undefined}
          subdomain={formData.subdomain || "default"}
          type="gallery"
          onUpload={(url) => addGalleryImage(url)}
          onRemove={() => {}}
        />
        <p className="text-xs text-blue-700 mt-2 italic">
          ✨ Upload multiple images one by one
        </p>
      </div>

      {(formData.gallery_images_detailed || []).length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">
              📸 Images ({(formData.gallery_images_detailed || []).length})
            </h3>
            <button
              onClick={() => {
                if (confirm("Delete ALL images?")) {
                  handleChange("gallery_images_detailed", []);
                }
              }}
              className="text-xs text-red-500 font-bold hover:bg-red-50 px-3 py-1 rounded-lg"
            >
              🗑 Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(formData.gallery_images_detailed || []).map((img, i) => (
              <div
                key={i}
                className="p-3 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 group">
                  <img
                    src={img.src}
                    alt={img.alt || `Gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    #{i + 1}
                  </div>
                </div>

                <select
                  value={img.category || "All"}
                  onChange={(e) => {
                    const updated = [
                      ...(formData.gallery_images_detailed || []),
                    ];
                    updated[i] = { ...updated[i], category: e.target.value };
                    handleChange("gallery_images_detailed", updated);
                  }}
                  className="w-full px-3 py-2 mb-2 bg-white border border-[#E8DEC8] rounded-lg text-sm font-semibold"
                >
                  <option value="All">All</option>
                  <option value="Rooms">Rooms</option>
                  <option value="Pool">Pool</option>
                  <option value="Spa">Spa</option>
                  <option value="Beach">Beach</option>
                  <option value="Dining">Dining</option>
                  <option value="Resort">Resort</option>
                  <option value="Garden">Garden</option>
                  <option value="Events">Events</option>
                  <option value="Cakes">Cakes</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Interior">Interior</option>
                </select>

                <input
                  type="text"
                  value={img.alt || ""}
                  onChange={(e) => {
                    const updated = [
                      ...(formData.gallery_images_detailed || []),
                    ];
                    updated[i] = { ...updated[i], alt: e.target.value };
                    handleChange("gallery_images_detailed", updated);
                  }}
                  placeholder="Description"
                  className="w-full px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-[#FAF5EA] rounded-2xl border-2 border-dashed border-[#E8DEC8]">
          <div className="text-5xl mb-3">📷</div>
          <p className="text-[#6B5D4A] font-semibold mb-1">No images yet</p>
          <p className="text-xs text-[#8B6F47]">
            Upload your first image above ☝️
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-[#8B6F47] font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <h1 className="text-xl font-bold text-[#2B2419]">
            {formData.business_name}
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/site/${formData.subdomain}`}
              target="_blank"
              className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm flex items-center gap-1"
            >
              <Eye className="w-4 h-4" /> Preview
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-3">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap text-sm">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              formData.status === "live"
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {formData.status === "live" ? "🟢 LIVE" : "🟡 DRAFT"}
          </span>
          {isResort && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              🏝️ Resort
            </span>
          )}
          {isRestaurant && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              🍽 Restaurant
            </span>
          )}
          {isCake && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700">
              🎂 Cake
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      {(isRestaurant || isCake || isResort) && (
        <div className="bg-white border-b border-[#E8DEC8]">
          <div className="container mx-auto px-4">
            <div className="flex gap-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
                  activeTab === "basic"
                    ? "border-[#8B6F47] text-[#8B6F47]"
                    : "border-transparent text-gray-400"
                }`}
              >
                📝 Basic Info
              </button>
              {isResort && (
                <button
                  onClick={() => setActiveTab("resort")}
                  className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
                    activeTab === "resort"
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  🏝️ Resort
                </button>
              )}
              {isRestaurant && (
                <button
                  onClick={() => setActiveTab("restaurant")}
                  className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
                    activeTab === "restaurant"
                      ? "border-[#C9A45C] text-[#C9A45C]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  🍽 Restaurant
                </button>
              )}
              {isCake && (
                <button
                  onClick={() => setActiveTab("cake")}
                  className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap ${
                    activeTab === "cake"
                      ? "border-pink-500 text-pink-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  🎂 Cake
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* ═══ BASIC TAB ═══ */}
        {((!isRestaurant && !isCake && !isResort) ||
          activeTab === "basic") && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4">
                📝 Business Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) =>
                      handleChange("business_name", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Subdomain *{" "}
                    <span className="text-xs font-normal text-yellow-600 ml-2">
                      ⚠️ Changing changes URL
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.subdomain}
                      onChange={(e) =>
                        handleChange(
                          "subdomain",
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                        )
                      }
                      className="w-full px-4 py-3 pr-40 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B6F47] font-semibold">
                      .avbsoftware.com
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline || ""}
                    onChange={(e) => handleChange("tagline", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">About</label>
                  <textarea
                    value={formData.about || ""}
                    onChange={(e) => handleChange("about", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Phone"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                  <input
                    type="tel"
                    value={formData.whatsapp || ""}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="WhatsApp"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                  <input
                    type="text"
                    value={formData.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="City"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                </div>
                <input
                  type="text"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Address"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                />
                <input
                  type="text"
                  value={formData.maps_link || ""}
                  onChange={(e) => handleChange("maps_link", e.target.value)}
                  placeholder="Google Maps URL"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.instagram || ""}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                    placeholder="Instagram URL"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                  <input
                    type="text"
                    value={formData.facebook || ""}
                    onChange={(e) => handleChange("facebook", e.target.value)}
                    placeholder="Facebook URL"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#E8DEC8] pt-6">
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4">
                🖼️ Logo & Hero
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  label="🎨 Logo"
                  currentImage={formData.logo_url}
                  subdomain={formData.subdomain || "default"}
                  type="logo"
                  onUpload={(url) => handleChange("logo_url", url)}
                  onRemove={() => handleChange("logo_url", "")}
                />
                <ImageUpload
                  label="🖼️ Hero"
                  currentImage={formData.hero_image_url}
                  subdomain={formData.subdomain || "default"}
                  type="hero"
                  onUpload={(url) => handleChange("hero_image_url", url)}
                  onRemove={() => handleChange("hero_image_url", "")}
                />
              </div>
            </div>

            <SaveButtons />
          </div>
        )}

        {/* ═══ RESORT TAB ═══ */}
        {isResort && activeTab === "resort" && (
          <div className="space-y-6">
            {/* Theme Picker */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <ResortThemePicker
                selected={(formData as any).resort_theme || "royal_onyx"}
                onSelect={(id) => handleChange("resort_theme", id)}
              />
            </div>

            {/* Hero Slides */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-1">
                🎬 Hero Slideshow Images
              </h2>
              <p className="text-sm text-[#6B5D4A] mb-5">
                Add multiple images for the home page slideshow
              </p>

              <div className="mb-5 p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                <ImageUpload
                  label="Hero Slide Image"
                  currentImage={undefined}
                  subdomain={formData.subdomain || "default"}
                  type="hero"
                  onUpload={(url) => addHeroSlide(url)}
                  onRemove={() => {}}
                />
              </div>

              {(formData as any).hero_slides &&
                (formData as any).hero_slides.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {(formData as any).hero_slides.map(
                      (slide: string, i: number) => (
                        <div
                          key={i}
                          className="relative group aspect-video rounded-xl overflow-hidden border border-[#E8DEC8]"
                        >
                          <img
                            src={slide}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                            #{i + 1}
                          </div>
                          <button
                            onClick={() => removeHeroSlide(i)}
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>

            {/* Hero Video */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-1">🎥 Hero Video (Optional)</h2>
              <p className="text-sm text-[#6B5D4A] mb-5">
                If set, video will replace slideshow
              </p>
              <input
                type="text"
                value={(formData as any).hero_video_url || ""}
                onChange={(e) => handleChange("hero_video_url", e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
              />
            </div>

            {/* Page Hero Images */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🖼 Page Hero Images</h2>
              <HeroImagesEditor
                labels={[
                  { field: "about_hero_image", label: "👥 About Page" },
                  { field: "rooms_hero_image", label: "🛏 Rooms Page" },
                  { field: "amenities_hero_image", label: "🌊 Amenities" },
                  { field: "gallery_hero_image", label: "🖼 Gallery" },
                  { field: "reviews_hero_image", label: "⭐ Reviews" },
                  { field: "contact_hero_image", label: "📞 Contact" },
                ]}
              />
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">👥 About Section</h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <ImageUpload
                  label="About Image"
                  currentImage={(formData as any).about_image}
                  subdomain={formData.subdomain || "default"}
                  type="about"
                  onUpload={(url) => handleChange("about_image", url)}
                  onRemove={() => handleChange("about_image", "")}
                />
                <ImageUpload
                  label="Featured Image"
                  currentImage={(formData as any).featured_image_1}
                  subdomain={formData.subdomain || "default"}
                  type="featured"
                  onUpload={(url) => handleChange("featured_image_1", url)}
                  onRemove={() => handleChange("featured_image_1", "")}
                />
              </div>
              <input
                type="text"
                value={(formData as any).year_established || ""}
                onChange={(e) =>
                  handleChange("year_established", e.target.value)
                }
                placeholder="Year Established"
                className="w-full px-4 py-3 mb-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
              />
              <textarea
                value={(formData as any).about_short || ""}
                onChange={(e) => handleChange("about_short", e.target.value)}
                placeholder="Short About"
                rows={3}
                className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl resize-none"
              />
            </div>

            {/* Founder */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">👨‍💼 Founder / Owner</h2>
              <ImageUpload
                label="Founder Photo"
                currentImage={
                  (formData as any).founder_image ||
                  (formData as any).chef_image
                }
                subdomain={formData.subdomain || "default"}
                type="chef"
                onUpload={(url) => {
                  handleChange("founder_image", url);
                  handleChange("chef_image", url);
                }}
                onRemove={() => {
                  handleChange("founder_image", "");
                  handleChange("chef_image", "");
                }}
              />
              <div className="grid grid-cols-2 gap-3 mt-4">
                <input
                  type="text"
                  value={
                    (formData as any).founder_name ||
                    (formData as any).chef_name ||
                    ""
                  }
                  onChange={(e) => {
                    handleChange("founder_name", e.target.value);
                    handleChange("chef_name", e.target.value);
                  }}
                  placeholder="Founder Name"
                  className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={
                    (formData as any).founder_role ||
                    (formData as any).chef_role ||
                    ""
                  }
                  onChange={(e) => {
                    handleChange("founder_role", e.target.value);
                    handleChange("chef_role", e.target.value);
                  }}
                  placeholder="Role"
                  className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
                />
              </div>
              <textarea
                value={
                  (formData as any).founder_quote ||
                  (formData as any).chef_quote ||
                  ""
                }
                onChange={(e) => {
                  handleChange("founder_quote", e.target.value);
                  handleChange("chef_quote", e.target.value);
                }}
                placeholder="Quote"
                rows={3}
                className="w-full mt-3 px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
            </div>

            {/* Mission & Vision */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">💎 Mission & Vision</h2>
              <label className="block text-xs font-bold mb-1">Mission</label>
              <textarea
                value={(formData as any).mission || ""}
                onChange={(e) => handleChange("mission", e.target.value)}
                placeholder="Our mission..."
                rows={3}
                className="w-full mb-4 px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
              <label className="block text-xs font-bold mb-1">Vision</label>
              <textarea
                value={(formData as any).vision || ""}
                onChange={(e) => handleChange("vision", e.target.value)}
                placeholder="Our vision..."
                rows={3}
                className="w-full px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">📊 Stats</h2>
              <StatsEditor
                placeholders={[
                  ["150+", "Luxury Rooms"],
                  ["25+", "Years Heritage"],
                  ["50K+", "Happy Guests"],
                  ["4.9★", "Guest Rating"],
                ]}
              />
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🕐 Reception Hours</h2>
              <div className="space-y-3 mb-3">
                {(formData.opening_hours || []).map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
                  >
                    <input
                      type="text"
                      value={h.days}
                      onChange={(e) =>
                        updateOpeningHour(i, "days", e.target.value)
                      }
                      placeholder="Days"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={h.hours}
                      onChange={(e) =>
                        updateOpeningHour(i, "hours", e.target.value)
                      }
                      placeholder="Hours"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <button
                      onClick={() => removeOpeningHour(i)}
                      className="text-red-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addOpeningHour}
                className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Hours
              </button>
            </div>

            {/* Rooms Manager */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <BedDouble className="w-6 h-6" /> Rooms & Villas
                  </h2>
                  <p className="text-sm text-[#6B5D4A]">
                    {((formData as any).rooms || []).length} rooms
                  </p>
                </div>
                <button
                  onClick={addRoom}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Room
                </button>
              </div>

              <div className="space-y-4">
                {((formData as any).rooms || []).map((room: any, i: number) => (
                  <div
                    key={i}
                    className="p-5 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">
                        Room #{i + 1} {room.featured && "⭐"}
                      </h4>
                      <button
                        onClick={() => removeRoom(i)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <ImageUpload
                      label="Room Photo"
                      currentImage={room.image}
                      subdomain={formData.subdomain || "default"}
                      type="product"
                      onUpload={(url) => updateRoom(i, "image", url)}
                      onRemove={() => updateRoom(i, "image", "")}
                    />

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) =>
                          updateRoom(i, "name", e.target.value)
                        }
                        placeholder="Room Name"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={room.subtitle}
                        onChange={(e) =>
                          updateRoom(i, "subtitle", e.target.value)
                        }
                        placeholder="Subtitle"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <select
                        value={room.category}
                        onChange={(e) =>
                          updateRoom(i, "category", e.target.value)
                        }
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      >
                        <option value="Suites">Suites</option>
                        <option value="Villas">Villas</option>
                        <option value="Penthouses">Penthouses</option>
                        <option value="Cottages">Cottages</option>
                      </select>
                      <input
                        type="number"
                        value={room.price}
                        onChange={(e) =>
                          updateRoom(i, "price", e.target.value)
                        }
                        placeholder="Price ₹"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={room.size}
                        onChange={(e) =>
                          updateRoom(i, "size", e.target.value)
                        }
                        placeholder="Size m²"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <input
                        type="text"
                        value={room.beds}
                        onChange={(e) =>
                          updateRoom(i, "beds", e.target.value)
                        }
                        placeholder="Beds"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={room.guests}
                        onChange={(e) =>
                          updateRoom(i, "guests", e.target.value)
                        }
                        placeholder="Guests"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={room.view}
                        onChange={(e) =>
                          updateRoom(i, "view", e.target.value)
                        }
                        placeholder="View"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                    </div>

                    <textarea
                      value={room.description}
                      onChange={(e) =>
                        updateRoom(i, "description", e.target.value)
                      }
                      placeholder="Description"
                      rows={2}
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm resize-none"
                    />

                    <input
                      type="text"
                      value={(room.amenities || []).join(", ")}
                      onChange={(e) =>
                        updateRoom(
                          i,
                          "amenities",
                          e.target.value
                            .split(",")
                            .map((a) => a.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="Amenities (WiFi, AC, Pool)"
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />

                    <label className="flex items-center gap-2 mt-3 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={room.featured || false}
                        onChange={(e) =>
                          updateRoom(i, "featured", e.target.checked)
                        }
                      />
                      <span className="font-bold">⭐ Featured Room</span>
                    </label>
                  </div>
                ))}

                {((formData as any).rooms || []).length === 0 && (
                  <button
                    onClick={addRoom}
                    className="w-full py-8 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" /> Add Your First Room
                  </button>
                )}
              </div>
            </div>

            {/* Experiences Manager */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-1">
                🌊 Curated Experiences
              </h2>
              <p className="text-sm text-[#6B5D4A] mb-5">
                4 experience cards on Home page
              </p>

              <div className="space-y-4">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="p-5 bg-[#FAF5EA] rounded-2xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                        {num}
                      </span>
                      <h4 className="font-bold">Experience #{num}</h4>
                    </div>

                    <ImageUpload
                      label="Image"
                      currentImage={(formData as any)[`exp_image_${num}`]}
                      subdomain={formData.subdomain || "default"}
                      type="featured"
                      onUpload={(url) =>
                        handleChange(`exp_image_${num}`, url)
                      }
                      onRemove={() => handleChange(`exp_image_${num}`, "")}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <input
                        type="text"
                        value={(formData as any)[`exp_title_${num}`] || ""}
                        onChange={(e) =>
                          handleChange(`exp_title_${num}`, e.target.value)
                        }
                        placeholder={
                          num === 1
                            ? "Infinity Pool"
                            : num === 2
                            ? "Garden Spa"
                            : num === 3
                            ? "Fine Dining"
                            : "Private Beach"
                        }
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={(formData as any)[`exp_desc_${num}`] || ""}
                        onChange={(e) =>
                          handleChange(`exp_desc_${num}`, e.target.value)
                        }
                        placeholder="Description"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <GalleryEditor />

            {/* Pro Features */}
            {formData.plan_type === "professional" && (
              <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
                <h2 className="text-xl font-bold mb-5">
                  👑 Professional Features
                </h2>
                <label className="block text-sm font-bold mb-2">
                  Custom Domain
                </label>
                <input
                  type="text"
                  value={formData.custom_domain || ""}
                  onChange={(e) =>
                    handleChange("custom_domain", e.target.value)
                  }
                  placeholder="yourresort.com"
                  className="w-full mb-4 px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                />
                <label className="block text-sm font-bold mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={(formData as any).google_analytics_id || ""}
                  onChange={(e) =>
                    handleChange("google_analytics_id", e.target.value)
                  }
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl"
                />
              </div>
            )}

            <SaveButtons />
          </div>
        )}

        {/* ═══ CAKE TAB ═══ */}
        {isCake && activeTab === "cake" && (
          <div className="space-y-6">
            {/* Theme */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <CakeThemePicker
                selected={(formData as any).cake_theme || "emerald_noir"}
                onSelect={(id) => handleChange("cake_theme", id)}
              />
            </div>

            {/* Video */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <HeroVideoUpload
                currentUrl={(formData as any).hero_video_url}
                currentType={(formData as any).hero_video_type}
                onChange={(url, type) => {
                  handleChange("hero_video_url", url);
                  handleChange("hero_video_type", type);
                }}
              />
            </div>

            {/* Hero Images */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🖼 Page Hero Images</h2>
              <HeroImagesEditor
                labels={[
                  { field: "hero_image", label: "🏠 Home" },
                  { field: "about_hero_image", label: "👥 Heritage" },
                  { field: "menu_hero_image", label: "🎂 Collection" },
                  { field: "gallery_hero_image", label: "🖼 Gallery" },
                  { field: "contact_hero_image", label: "📞 Contact" },
                ]}
              />
            </div>

            {/* Featured Images */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">📸 Featured Images</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "featured_image_1",
                  "featured_image_2",
                  "featured_image_3",
                ].map((f, i) => (
                  <ImageUpload
                    key={f}
                    label={`Featured ${i + 1}`}
                    currentImage={(formData as any)[f]}
                    subdomain={formData.subdomain || "default"}
                    type="featured"
                    onUpload={(url) => handleChange(f, url)}
                    onRemove={() => handleChange(f, "")}
                  />
                ))}
              </div>
            </div>

            {/* About / Chef */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">
                👥 About / Master Baker
              </h2>
              <ImageUpload
                label="About Image"
                currentImage={(formData as any).about_image}
                subdomain={formData.subdomain || "default"}
                type="about"
                onUpload={(url) => handleChange("about_image", url)}
                onRemove={() => handleChange("about_image", "")}
              />

              <div className="p-4 bg-pink-50 rounded-xl border border-pink-200 mt-5 mb-5">
                <h3 className="text-sm font-bold text-pink-800 mb-3">
                  👨‍🍳 Master Baker
                </h3>
                <ImageUpload
                  label="Chef Photo"
                  currentImage={(formData as any).chef_image}
                  subdomain={formData.subdomain || "default"}
                  type="chef"
                  onUpload={(url) => handleChange("chef_image", url)}
                  onRemove={() => handleChange("chef_image", "")}
                />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <input
                    type="text"
                    value={(formData as any).chef_name || ""}
                    onChange={(e) => handleChange("chef_name", e.target.value)}
                    placeholder="Baker Name"
                    className="px-3 py-2 bg-white border border-pink-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={(formData as any).chef_role || ""}
                    onChange={(e) => handleChange("chef_role", e.target.value)}
                    placeholder="Role"
                    className="px-3 py-2 bg-white border border-pink-200 rounded-lg text-sm"
                  />
                </div>
                <textarea
                  value={(formData as any).chef_quote || ""}
                  onChange={(e) => handleChange("chef_quote", e.target.value)}
                  placeholder="Quote..."
                  rows={3}
                  className="w-full mt-3 px-3 py-2 bg-white border border-pink-200 rounded-lg text-sm resize-none"
                />
              </div>

              <input
                type="text"
                value={(formData as any).year_established || ""}
                onChange={(e) =>
                  handleChange("year_established", e.target.value)
                }
                placeholder="Year Established (2010)"
                className="w-full px-3 py-2 mb-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
              />
              <textarea
                value={(formData as any).about_short || ""}
                onChange={(e) => handleChange("about_short", e.target.value)}
                placeholder="Short About"
                rows={3}
                className="w-full px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">📊 Stats</h2>
              <StatsEditor
                placeholders={[
                  ["10K+", "Customers"],
                  ["500+", "Cakes"],
                  ["50+", "Flavors"],
                  ["4.9★", "Rating"],
                ]}
              />
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🕐 Hours</h2>
              <div className="space-y-3 mb-3">
                {(formData.opening_hours || []).map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
                  >
                    <input
                      type="text"
                      value={h.days}
                      onChange={(e) =>
                        updateOpeningHour(i, "days", e.target.value)
                      }
                      placeholder="Days"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={h.hours}
                      onChange={(e) =>
                        updateOpeningHour(i, "hours", e.target.value)
                      }
                      placeholder="Hours"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <button
                      onClick={() => removeOpeningHour(i)}
                      className="text-red-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addOpeningHour}
                className="w-full py-3 border-2 border-dashed border-pink-300 text-pink-600 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🎂 Cake Products</h2>
              <div className="space-y-3">
                {formData.products?.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">Cake {i + 1}</h4>
                      {formData.products && formData.products.length > 1 && (
                        <button
                          onClick={() => removeProduct(i)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <ImageUpload
                      label="📸 Cake Photo"
                      currentImage={p.image_url}
                      subdomain={formData.subdomain || "default"}
                      type="product"
                      onUpload={(url) => updateProduct(i, "image_url", url)}
                      onRemove={() => updateProduct(i, "image_url", "")}
                    />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) =>
                          updateProduct(i, "name", e.target.value)
                        }
                        placeholder="Cake Name"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                      <input
                        type="text"
                        value={p.price}
                        onChange={(e) =>
                          updateProduct(i, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      value={p.description || ""}
                      onChange={(e) =>
                        updateProduct(i, "description", e.target.value)
                      }
                      placeholder="Description"
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                    />
                  </div>
                ))}
                <button
                  onClick={addProduct}
                  className="w-full py-3 border-2 border-dashed border-pink-300 text-pink-600 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Cake
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">
                <Star className="w-5 h-5 inline mr-2" />
                Customer Reviews
              </h2>
              <div className="space-y-3">
                {formData.reviews?.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">Review {i + 1}</h4>
                      {formData.reviews && formData.reviews.length > 1 && (
                        <button
                          onClick={() => removeReview(i)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={r.name}
                        onChange={(e) =>
                          updateReview(i, "name", e.target.value)
                        }
                        placeholder="Name"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                      <input
                        type="text"
                        value={r.role || ""}
                        onChange={(e) =>
                          updateReview(i, "role", e.target.value)
                        }
                        placeholder="Role"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                    </div>
                    <textarea
                      value={r.text}
                      onChange={(e) =>
                        updateReview(i, "text", e.target.value)
                      }
                      placeholder="Review"
                      rows={2}
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={addReview}
                  className="w-full py-3 border-2 border-dashed border-pink-300 text-pink-600 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Review
                </button>
              </div>
            </div>

            <GalleryEditor />

            <SaveButtons />
          </div>
        )}

        {/* ═══ RESTAURANT TAB ═══ */}
        {isRestaurant && activeTab === "restaurant" && (
          <div className="space-y-6">
            {/* Theme */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <RestaurantThemePicker
                selected={(formData as any).restaurant_theme || "dark_gold"}
                onSelect={(id) => handleChange("restaurant_theme", id)}
              />
            </div>

            {/* Hero Images */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🖼 Hero Images</h2>
              <HeroImagesEditor
                labels={[
                  { field: "hero_image", label: "🏠 Home" },
                  { field: "about_hero_image", label: "👥 About" },
                  { field: "menu_hero_image", label: "🍽 Menu" },
                  { field: "gallery_hero_image", label: "🖼 Gallery" },
                  { field: "contact_hero_image", label: "📞 Contact" },
                ]}
              />
            </div>

            {/* About / Chef */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">👥 About / Chef</h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <ImageUpload
                  label="About Image"
                  currentImage={(formData as any).about_image}
                  subdomain={formData.subdomain || "default"}
                  type="about"
                  onUpload={(url) => handleChange("about_image", url)}
                  onRemove={() => handleChange("about_image", "")}
                />
                <ImageUpload
                  label="Chef Photo"
                  currentImage={(formData as any).chef_image}
                  subdomain={formData.subdomain || "default"}
                  type="chef"
                  onUpload={(url) => handleChange("chef_image", url)}
                  onRemove={() => handleChange("chef_image", "")}
                />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <input
                  type="text"
                  value={(formData as any).chef_name || ""}
                  onChange={(e) => handleChange("chef_name", e.target.value)}
                  placeholder="Chef Name"
                  className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={(formData as any).chef_role || ""}
                  onChange={(e) => handleChange("chef_role", e.target.value)}
                  placeholder="Role"
                  className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={(formData as any).year_established || ""}
                  onChange={(e) =>
                    handleChange("year_established", e.target.value)
                  }
                  placeholder="Year"
                  className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm"
                />
              </div>
              <textarea
                value={(formData as any).chef_quote || ""}
                onChange={(e) => handleChange("chef_quote", e.target.value)}
                placeholder="Chef Quote"
                rows={2}
                className="w-full px-3 py-2 mb-4 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
              <textarea
                value={(formData as any).about_short || ""}
                onChange={(e) => handleChange("about_short", e.target.value)}
                placeholder="Short About"
                rows={3}
                className="w-full px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none"
              />
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">📊 Stats</h2>
              <StatsEditor
                placeholders={[
                  ["120+", "Dishes"],
                  ["50+", "Wines"],
                  ["15+", "Years"],
                  ["4.9★", "Rating"],
                ]}
              />
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🕐 Hours</h2>
              <div className="space-y-3 mb-3">
                {(formData.opening_hours || []).map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-center bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]"
                  >
                    <input
                      type="text"
                      value={h.days}
                      onChange={(e) =>
                        updateOpeningHour(i, "days", e.target.value)
                      }
                      placeholder="Days"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={h.hours}
                      onChange={(e) =>
                        updateOpeningHour(i, "hours", e.target.value)
                      }
                      placeholder="Hours"
                      className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm"
                    />
                    <button
                      onClick={() => removeOpeningHour(i)}
                      className="text-red-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addOpeningHour}
                className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">🍽 Menu Items</h2>
              <div className="space-y-3">
                {formData.products?.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">Item {i + 1}</h4>
                      {formData.products && formData.products.length > 1 && (
                        <button
                          onClick={() => removeProduct(i)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <ImageUpload
                      label="📸 Dish Photo"
                      currentImage={p.image_url}
                      subdomain={formData.subdomain || "default"}
                      type="product"
                      onUpload={(url) => updateProduct(i, "image_url", url)}
                      onRemove={() => updateProduct(i, "image_url", "")}
                    />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) =>
                          updateProduct(i, "name", e.target.value)
                        }
                        placeholder="Dish Name"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                      <input
                        type="text"
                        value={p.price}
                        onChange={(e) =>
                          updateProduct(i, "price", e.target.value)
                        }
                        placeholder="Price"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                    </div>
                    <input
                      type="text"
                      value={p.description || ""}
                      onChange={(e) =>
                        updateProduct(i, "description", e.target.value)
                      }
                      placeholder="Description"
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                    />
                  </div>
                ))}
                <button
                  onClick={addProduct}
                  className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Menu Item
                </button>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold mb-5">
                <Star className="w-5 h-5 inline mr-2" />
                Reviews
              </h2>
              <div className="space-y-3">
                {formData.reviews?.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">Review {i + 1}</h4>
                      {formData.reviews && formData.reviews.length > 1 && (
                        <button
                          onClick={() => removeReview(i)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={r.name}
                        onChange={(e) =>
                          updateReview(i, "name", e.target.value)
                        }
                        placeholder="Name"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                      <input
                        type="text"
                        value={r.role || ""}
                        onChange={(e) =>
                          updateReview(i, "role", e.target.value)
                        }
                        placeholder="Role"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg"
                      />
                    </div>
                    <textarea
                      value={r.text}
                      onChange={(e) =>
                        updateReview(i, "text", e.target.value)
                      }
                      placeholder="Review"
                      rows={2}
                      className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={addReview}
                  className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Add Review
                </button>
              </div>
            </div>

            <GalleryEditor />

            <SaveButtons />
          </div>
        )}
      </main>
    </div>
  );
}