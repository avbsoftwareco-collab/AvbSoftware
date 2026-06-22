"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Save, Eye, Plus, X, Loader, Phone, Mail, MapPin, 
  Package, Star, Trash2, Sparkles, Check, Crown
} from "lucide-react";
import { 
  getClientById, updateClient, deleteClient, 
  Client 
} from "@/lib/supabase";
import ImageUpload from "@/app/admin/ImageUpload";

export default function EditWebsitePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeMenuCat, setActiveMenuCat] = useState(0);
  const [activeTab, setActiveTab] = useState<'basic' | 'restaurant'>('basic');

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
        products: client.products && client.products.length > 0 
          ? client.products 
          : [{ name: "", price: "", description: "", image_url: "" }],
        reviews: client.reviews && client.reviews.length > 0
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

  const handleChange = (field: keyof Client, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectPlan = (planType: "starter" | "professional") => {
    const price = planType === "professional" ? 2499 : 799;
    setFormData(prev => ({ ...prev, plan_type: planType, plan_price: price }));
  };

  const generateAboutWithAI = async () => {
    if (!formData.business_name) { 
      alert("Pehle Business Name daalo!"); 
      return; 
    }
    setAiLoading(true);
    setTimeout(() => {
      const aiAbout = `Welcome to ${formData.business_name}, located in ${formData.city}. We are dedicated to providing the best experience to our customers.`;
      handleChange("about", aiAbout);
      setAiLoading(false);
    }, 2000);
  };

  // Products
  const addProduct = () => handleChange("products", [...(formData.products || []), { name: "", price: "", description: "", image_url: "" }]);
  const removeProduct = (i: number) => handleChange("products", formData.products?.filter((_, idx) => idx !== i) || []);
  const updateProduct = (i: number, field: string, value: string) => {
    const updated = [...(formData.products || [])];
    updated[i] = { ...updated[i], [field]: value };
    handleChange("products", updated);
  };

  // Reviews
  const addReview = () => handleChange("reviews", [...(formData.reviews || []), { name: "", text: "", rating: 5, role: "" }]);
  const removeReview = (i: number) => handleChange("reviews", formData.reviews?.filter((_, idx) => idx !== i) || []);
  const updateReview = (i: number, field: string, value: any) => {
    const updated = [...(formData.reviews || [])];
    updated[i] = { ...updated[i], [field]: value };
    handleChange("reviews", updated);
  };

  // Opening Hours
  const addOpeningHour = () => handleChange("opening_hours", [...(formData.opening_hours || []), { days: "", hours: "" }]);
  const removeOpeningHour = (i: number) => handleChange("opening_hours", (formData.opening_hours || []).filter((_, idx) => idx !== i));
  const updateOpeningHour = (i: number, field: string, value: string) => {
    const updated = [...(formData.opening_hours || [])];
    updated[i] = { ...updated[i], [field]: value };
    handleChange("opening_hours", updated);
  };

  // Menu Categories
  const addMenuCategory = () => {
    const cats = formData.menu_categories || [];
    handleChange("menu_categories", [
      ...cats,
      { id: `cat-${Date.now()}`, name: "New Category", subtitle: "", items: [] }
    ]);
    setActiveMenuCat(cats.length);
  };

  const removeMenuCategory = (i: number) => {
    if (!confirm("Category delete karein?")) return;
    const updated = (formData.menu_categories || []).filter((_, idx) => idx !== i);
    handleChange("menu_categories", updated);
    setActiveMenuCat(Math.max(0, activeMenuCat - 1));
  };

  const updateMenuCategory = (i: number, field: string, value: any) => {
    const updated = (formData.menu_categories || []).map((c, idx) =>
      idx === i ? { ...c, [field]: value } : c
    );
    handleChange("menu_categories", updated);
  };

  const addMenuItem = (catIdx: number) => {
    const updated = (formData.menu_categories || []).map((c, i) =>
      i === catIdx
        ? { ...c, items: [...(c.items || []), { name: "", description: "", price: "", image: "", tags: [], featured: false }] }
        : c
    );
    handleChange("menu_categories", updated);
  };

  const removeMenuItem = (catIdx: number, itemIdx: number) => {
    const updated = (formData.menu_categories || []).map((c, i) =>
      i === catIdx ? { ...c, items: c.items.filter((_: any, j: number) => j !== itemIdx) } : c
    );
    handleChange("menu_categories", updated);
  };

  const updateMenuItem = (catIdx: number, itemIdx: number, field: string, value: any) => {
    const updated = (formData.menu_categories || []).map((c, i) =>
      i === catIdx
        ? { ...c, items: c.items.map((item: any, j: number) => j === itemIdx ? { ...item, [field]: value } : item) }
        : c
    );
    handleChange("menu_categories", updated);
  };

  // Gallery
  const addGalleryImage = (url: string) => {
    const current = formData.gallery_images_detailed || [];
    handleChange("gallery_images_detailed", [...current, { src: url, alt: "", category: "Ambiance" }]);
  };

  const removeGalleryImage = (i: number) => {
    handleChange("gallery_images_detailed", (formData.gallery_images_detailed || []).filter((_, idx) => idx !== i));
  };

  const updateGalleryImage = (i: number, field: string, value: string) => {
    const updated = (formData.gallery_images_detailed || []).map((img, idx) =>
      idx === i ? { ...img, [field]: value } : img
    );
    handleChange("gallery_images_detailed", updated);
  };

  // Save
  const handleUpdate = async (status?: "draft" | "live") => {
    if (!formData.business_name || !formData.subdomain) {
      alert("Business name aur subdomain required hai!");
      return;
    }
    setSaving(true);
    const result = await updateClient(params.id, { ...formData, ...(status && { status }) });
    if (result) {
      alert(`Updated Successfully!`);
      router.push("/admin/dashboard");
    } else {
      alert("Update failed!");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${formData.business_name}?`)) return;
    const success = await deleteClient(params.id);
    if (success) { 
      alert("Deleted!"); 
      router.push("/admin/dashboard"); 
    }
  };

  const isRestaurant = formData.template?.toLowerCase().includes("restaurant");

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

  const currentCat = (formData.menu_categories || [])[activeMenuCat];

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#8B6F47] font-semibold">
            <ArrowLeft className="w-5 h-5" /> Back
          </Link>
          <h1 className="text-xl font-bold text-[#2B2419]">{formData.business_name}</h1>
          <div className="flex gap-2">
            <Link href={`/site/${formData.subdomain}`} target="_blank" className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" /> Preview
            </Link>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-3">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap text-sm">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.status === 'live' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
            {formData.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.plan_type === 'professional' ? 'bg-[#C9A45C] text-white' : 'bg-[#8B6F47] text-white'}`}>
            {formData.plan_type === 'professional' ? '👑 Professional ₹2,499/mo' : '🌟 Starter ₹799/mo'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {formData.payment_status === 'paid' ? '✅ Paid' : '⏰ Pending'}
          </span>
          {isRestaurant && <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">🍽 Restaurant Template</span>}
        </div>
      </div>

      {/* Tab Switcher */}
      {isRestaurant && (
        <div className="bg-white border-b border-[#E8DEC8]">
          <div className="container mx-auto px-4">
            <div className="flex gap-0">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === 'basic' ? 'border-[#8B6F47] text-[#8B6F47]' : 'border-transparent text-gray-400'}`}
              >
                📝 Basic Info
              </button>
              <button
                onClick={() => setActiveTab('restaurant')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === 'restaurant' ? 'border-[#C9A45C] text-[#C9A45C]' : 'border-transparent text-gray-400'}`}
              >
                🍽 Restaurant Content
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        {/* BASIC TAB */}
        {(!isRestaurant || activeTab === 'basic') && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md space-y-6">

            {/* Plan Management */}
            <div>
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4">💎 Plan Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => selectPlan("starter")} className={`cursor-pointer p-5 rounded-2xl border-2 ${formData.plan_type === "starter" ? "border-[#8B6F47] bg-[#FAF5EA] ring-2 ring-[#8B6F47]" : "border-[#E8DEC8] bg-white"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-4xl">🌟</div>
                    {formData.plan_type === "starter" && <div className="bg-green-500 text-white rounded-full p-1.5"><Check className="w-5 h-5" /></div>}
                  </div>
                  <h3 className="text-xl font-bold text-[#2B2419]">Starter</h3>
                  <div className="text-2xl font-bold text-[#8B6F47] mt-1">₹799/mo</div>
                  <p className="text-xs text-[#8B6F47] mt-1">name.avbsoftware.com</p>
                </div>

                <div onClick={() => selectPlan("professional")} className={`cursor-pointer p-5 rounded-2xl border-2 ${formData.plan_type === "professional" ? "border-[#C9A45C] bg-[#FFF9E6] ring-2 ring-[#C9A45C]" : "border-[#E8DEC8] bg-white"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-4xl">👑</div>
                    {formData.plan_type === "professional" && <div className="bg-green-500 text-white rounded-full p-1.5"><Check className="w-5 h-5" /></div>}
                  </div>
                  <h3 className="text-xl font-bold text-[#2B2419]">Professional</h3>
                  <div className="text-2xl font-bold text-[#C9A45C] mt-1">₹2,499/mo</div>
                  <p className="text-xs text-[#8B6F47] mt-1">Custom domain + SEO</p>
                </div>
              </div>

              {formData.plan_type === "professional" && (
                <div className="mt-4 p-5 bg-yellow-50 border-2 border-yellow-300 rounded-2xl">
                  <h4 className="font-bold text-yellow-700 mb-2">🌐 Custom Domain</h4>
                  <input type="text" value={formData.custom_domain || ""} onChange={(e) => handleChange("custom_domain", e.target.value)} placeholder="example.com" className="w-full px-4 py-3 bg-white border border-yellow-300 rounded-xl" />
                </div>
              )}

              <div className="mt-4">
                <label className="block text-sm font-bold text-[#2B2419] mb-2">💳 Payment Status</label>
                <select value={formData.payment_status || "pending"} onChange={(e) => handleChange("payment_status", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl">
                  <option value="paid">✅ Paid</option>
                  <option value="pending">⏰ Pending</option>
                  <option value="overdue">❌ Overdue</option>
                </select>
              </div>
            </div>

            <div className="border-t border-[#E8DEC8] pt-6" />

            {/* Business Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4">📝 Business Information</h2>
              <div className="space-y-4">
                <div className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl text-sm">
                  Template: <strong>{formData.template}</strong>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">Business Name *</label>
                  <input type="text" value={formData.business_name} onChange={(e) => handleChange("business_name", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">Subdomain *</label>
                  <div className="relative">
                    <input type="text" value={formData.subdomain} onChange={(e) => handleChange("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-"))} className="w-full px-4 py-3 pr-40 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B6F47] font-semibold">.avbsoftware.com</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">Tagline</label>
                  <input type="text" value={formData.tagline || ""} onChange={(e) => handleChange("tagline", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-[#2B2419]">About Business</label>
                    <button onClick={generateAboutWithAI} disabled={aiLoading} className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold flex items-center gap-1">
                      {aiLoading ? <><Loader className="w-3 h-3 animate-spin" /> Generating...</> : <><Sparkles className="w-3 h-3" /> AI Generate</>}
                    </button>
                  </div>
                  <textarea value={formData.about || ""} onChange={(e) => handleChange("about", e.target.value)} rows={5} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#2B2419] mb-2"><Phone className="w-4 h-4 inline mr-1" />Phone</label>
                    <input type="tel" value={formData.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2B2419] mb-2">WhatsApp</label>
                    <input type="tel" value={formData.whatsapp || ""} onChange={(e) => handleChange("whatsapp", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2B2419] mb-2"><Mail className="w-4 h-4 inline mr-1" />Email</label>
                    <input type="email" value={formData.email || ""} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#2B2419] mb-2"><MapPin className="w-4 h-4 inline mr-1" />City</label>
                    <input type="text" value={formData.city || ""} onChange={(e) => handleChange("city", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">Full Address</label>
                  <input type="text" value={formData.address || ""} onChange={(e) => handleChange("address", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">Google Maps URL</label>
                  <input type="text" value={formData.map_embed_url || formData.maps_link || ""} onChange={(e) => handleChange("map_embed_url", e.target.value)} placeholder="https://maps.google.com/..." className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl" />
                </div>
              </div>
            </div>

            <div className="border-t border-[#E8DEC8] pt-6" />

            {/* Basic Images */}
            <div>
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4">🖼️ Basic Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload label="🎨 Logo" currentImage={formData.logo_url} subdomain={formData.subdomain} type="logo" onUpload={(url) => handleChange("logo_url", url)} onRemove={() => handleChange("logo_url", "")} />
                <ImageUpload label="🖼️ Hero Banner" currentImage={formData.hero_image_url} subdomain={formData.subdomain} type="hero" onUpload={(url) => handleChange("hero_image_url", url)} onRemove={() => handleChange("hero_image_url", "")} />
              </div>
            </div>

            {!isRestaurant && (
              <>
                <div className="border-t border-[#E8DEC8] pt-6" />
                <div>
                  <h2 className="text-2xl font-bold text-[#2B2419] mb-4"><Package className="w-6 h-6 inline mr-2" />Products</h2>
                  <div className="space-y-3">
                    {formData.products?.map((product, index) => (
                      <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-[#2B2419]">Product {index + 1}</h4>
                          {formData.products && formData.products.length > 1 && (
                            <button onClick={() => removeProduct(index)} className="text-red-500"><X className="w-4 h-4" /></button>
                          )}
                        </div>
                        <ImageUpload label="📸 Image" currentImage={product.image_url} subdomain={formData.subdomain} type="product" onUpload={(url) => updateProduct(index, "image_url", url)} onRemove={() => updateProduct(index, "image_url", "")} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <input type="text" value={product.name} onChange={(e) => updateProduct(index, "name", e.target.value)} placeholder="Name" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg" />
                          <input type="text" value={product.price} onChange={(e) => updateProduct(index, "price", e.target.value)} placeholder="Price" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg" />
                        </div>
                        <input type="text" value={product.description || ""} onChange={(e) => updateProduct(index, "description", e.target.value)} placeholder="Description" className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg" />
                      </div>
                    ))}
                    <button onClick={addProduct} className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" /> Add Product
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Reviews */}
            <div className="border-t border-[#E8DEC8] pt-6">
              <h2 className="text-2xl font-bold text-[#2B2419] mb-4"><Star className="w-6 h-6 inline mr-2" />Reviews</h2>
              <div className="space-y-3">
                {formData.reviews?.map((review, index) => (
                  <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#2B2419]">Review {index + 1}</h4>
                      {formData.reviews && formData.reviews.length > 1 && (
                        <button onClick={() => removeReview(index)} className="text-red-500"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" value={review.name} onChange={(e) => updateReview(index, "name", e.target.value)} placeholder="Name" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg" />
                      <input type="text" value={review.role || ""} onChange={(e) => updateReview(index, "role", e.target.value)} placeholder="Role" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg" />
                    </div>
                    <textarea value={review.text} onChange={(e) => updateReview(index, "text", e.target.value)} placeholder="Review text" rows={2} className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg resize-none" />
                  </div>
                ))}
                <button onClick={addReview} className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add Review
                </button>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-6 border-t border-[#E8DEC8] flex flex-col md:flex-row gap-3">
              <button onClick={() => router.push("/admin/dashboard")} className="px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">Cancel</button>
              <button onClick={() => handleUpdate("draft")} disabled={saving} className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Draft
              </button>
              <button onClick={() => handleUpdate("live")} disabled={saving} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <>🚀 Go Live</>}
              </button>
            </div>
          </div>
        )}

        {/* RESTAURANT TAB */}
        {isRestaurant && activeTab === 'restaurant' && (
          <div className="space-y-6">

            {/* Page Hero Images */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-1">🖼 Page Hero Images</h2>
              <p className="text-sm text-[#6B5D4A] mb-5">Har page ka alag background</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { field: "hero_image", label: "🏠 Home Hero" },
                  { field: "about_hero_image", label: "👥 About Hero" },
                  { field: "menu_hero_image", label: "🍽 Menu Hero" },
                  { field: "gallery_hero_image", label: "🖼 Gallery Hero" },
                  { field: "contact_hero_image", label: "📞 Contact Hero" },
                ].map(({ field, label }) => (
                  <div key={field} className="bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]">
                    <ImageUpload
                      label={label}
                      currentImage={(formData as any)[field]}
                      subdomain={formData.subdomain}
                      type="hero"
                      onUpload={(url) => handleChange(field as keyof Client, url)}
                      onRemove={() => handleChange(field as keyof Client, "")}
                    />
                  </div>
                ))}
              </div>

              {/* Landscape Image */}
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                <h3 className="text-sm font-bold text-green-800 mb-3">🏞 Landscape Photo (Home)</h3>
                <ImageUpload
                  label="Landscape Photo"
                  currentImage={(formData as any).landscape_image}
                  subdomain={formData.subdomain}
                  type="featured"
                  onUpload={(url) => handleChange("landscape_image" as any, url)}
                  onRemove={() => handleChange("landscape_image" as any, "")}
                />
              </div>

              {/* Featured Mosaic */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                <h3 className="text-sm font-bold text-blue-800 mb-3">📸 Home Mosaic — 3 Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["featured_image_1", "featured_image_2", "featured_image_3"].map((field, i) => (
                    <ImageUpload
                      key={field}
                      label={`Image ${i + 1}`}
                      currentImage={(formData as any)[field]}
                      subdomain={formData.subdomain}
                      type="featured"
                      onUpload={(url) => handleChange(field as keyof Client, url)}
                      onRemove={() => handleChange(field as keyof Client, "")}
                    />
                  ))}
                </div>
              </div>

              {/* Specialty Cards */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h3 className="text-sm font-bold text-amber-800 mb-3">✨ Specialty Cards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num}>
                      <input
                        type="text"
                        value={(formData as any)[`specialty_${num}_title`] || ""}
                        onChange={(e) => handleChange(`specialty_${num}_title` as any, e.target.value)}
                        placeholder={`Specialty ${num} Title`}
                        className="w-full px-3 py-2 mb-2 bg-white border border-amber-200 rounded-lg text-sm"
                      />
                      <textarea
                        value={(formData as any)[`specialty_${num}_desc`] || ""}
                        onChange={(e) => handleChange(`specialty_${num}_desc` as any, e.target.value)}
                        placeholder="Description..."
                        rows={2}
                        className="w-full px-3 py-2 mb-2 bg-white border border-amber-200 rounded-lg text-sm resize-none"
                      />
                      <ImageUpload
                        label={`Specialty ${num}`}
                        currentImage={(formData as any)[`specialty_image_${num}`]}
                        subdomain={formData.subdomain}
                        type="specialty"
                        onUpload={(url) => handleChange(`specialty_image_${num}` as any, url)}
                        onRemove={() => handleChange(`specialty_image_${num}` as any, "")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Page */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-5">👥 About Page Content</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <ImageUpload label="About Image" currentImage={formData.about_image} subdomain={formData.subdomain} type="about" onUpload={(url) => handleChange("about_image", url)} onRemove={() => handleChange("about_image", "")} />
                <ImageUpload label="Chef Photo" currentImage={formData.chef_image} subdomain={formData.subdomain} type="chef" onUpload={(url) => handleChange("chef_image", url)} onRemove={() => handleChange("chef_image", "")} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <input type="text" value={formData.chef_name || ""} onChange={(e) => handleChange("chef_name", e.target.value)} placeholder="Chef Name" className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm" />
                <input type="text" value={formData.chef_role || ""} onChange={(e) => handleChange("chef_role", e.target.value)} placeholder="Chef Role" className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm" />
                <input type="text" value={formData.year_established || ""} onChange={(e) => handleChange("year_established", e.target.value)} placeholder="Year (2020)" className="px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm" />
              </div>

              <textarea value={formData.chef_quote || ""} onChange={(e) => handleChange("chef_quote", e.target.value)} placeholder="Chef Quote" rows={2} className="w-full px-3 py-2 mb-4 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none" />
              <textarea value={formData.about_short || ""} onChange={(e) => handleChange("about_short", e.target.value)} placeholder="About Short (Home page)" rows={3} className="w-full px-3 py-2 mb-4 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm resize-none" />
              <input type="text" value={formData.marquee_text || ""} onChange={(e) => handleChange("marquee_text", e.target.value)} placeholder="Marquee Text (Gold strip)" className="w-full px-3 py-2 bg-[#FAF5EA] border border-[#E8DEC8] rounded-lg text-sm" />
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-5">📊 Stats & Numbers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-[#FAF5EA] rounded-xl p-4 border border-[#E8DEC8]">
                    <span className="text-sm font-bold text-[#2B2419]">Stat #{num}</span>
                    <input type="text" value={(formData as any)[`stat_${num}_number`] || ""} onChange={(e) => handleChange(`stat_${num}_number` as any, e.target.value)} placeholder={["120+", "50+", "15+", "4.9★"][num - 1]} className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm font-bold" />
                    <input type="text" value={(formData as any)[`stat_${num}_label`] || ""} onChange={(e) => handleChange(`stat_${num}_label` as any, e.target.value)} placeholder={["Dishes", "Wines", "Years", "Rating"][num - 1]} className="w-full mt-2 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-5">🕐 Opening Hours</h2>
              <div className="space-y-3 mb-3">
                {(formData.opening_hours || []).map((hour, i) => (
                  <div key={i} className="flex gap-2 items-center bg-[#FAF5EA] rounded-xl p-3 border border-[#E8DEC8]">
                    <input type="text" value={hour.days} onChange={(e) => updateOpeningHour(i, "days", e.target.value)} placeholder="e.g. Mon - Fri" className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm" />
                    <input type="text" value={hour.hours} onChange={(e) => updateOpeningHour(i, "hours", e.target.value)} placeholder="e.g. 11 AM - 10 PM" className="flex-1 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg text-sm" />
                    <button onClick={() => removeOpeningHour(i)} className="text-red-400 p-1"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <button onClick={addOpeningHour} className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Hours
              </button>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-1">🖼 Gallery Images</h2>
              <p className="text-sm text-[#6B5D4A] mb-5">{(formData.gallery_images_detailed || []).length} uploaded</p>

              <div className="mb-5 p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                <p className="text-xs font-bold text-[#2B2419] mb-3">Upload New:</p>
                <ImageUpload label="Gallery Photo" currentImage={undefined} subdomain={formData.subdomain} type="gallery" onUpload={(url) => addGalleryImage(url)} onRemove={() => {}} />
              </div>

              {(formData.gallery_images_detailed || []).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(formData.gallery_images_detailed || []).map((img, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[#E8DEC8]">
                      <img src={img.src} alt={img.alt || `Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      <button onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1">
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                        <input type="text" value={img.category || ""} onChange={(e) => updateGalleryImage(i, "category", e.target.value)} placeholder="Category" className="w-full bg-transparent text-white text-[10px] outline-none placeholder:text-white/50" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Menu */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md">
              <h2 className="text-xl font-bold text-[#2B2419] mb-5">🍽 Menu Categories</h2>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-48">
                  <div className="space-y-1 mb-3">
                    {(formData.menu_categories || []).map((cat, i) => (
                      <div key={cat.id} className="flex items-center gap-1">
                        <button onClick={() => setActiveMenuCat(i)} className={`flex-1 text-left px-3 py-2 rounded-xl text-sm ${activeMenuCat === i ? "bg-[#C9A45C] text-white font-bold" : "bg-[#FAF5EA] text-[#6B5D4A]"}`}>
                          <span className="block truncate">{cat.name || "Untitled"}</span>
                          <span className="text-xs">{(cat.items || []).length} items</span>
                        </button>
                        <button onClick={() => removeMenuCategory(i)} className="text-gray-400 hover:text-red-500 p-1"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={addMenuCategory} className="w-full py-2 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl text-xs font-bold">
                    + Add Category
                  </button>
                </div>

                {currentCat && (
                  <div className="flex-1 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8] p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <input type="text" value={currentCat.name} onChange={(e) => updateMenuCategory(activeMenuCat, "name", e.target.value)} placeholder="Category Name" className="px-3 py-2 border border-[#E8DEC8] rounded-lg text-sm bg-white" />
                      <input type="text" value={currentCat.subtitle || ""} onChange={(e) => updateMenuCategory(activeMenuCat, "subtitle", e.target.value)} placeholder="Subtitle" className="px-3 py-2 border border-[#E8DEC8] rounded-lg text-sm bg-white" />
                    </div>

                    <button onClick={() => addMenuItem(activeMenuCat)} className="text-xs px-3 py-1.5 bg-white border border-[#C9A45C] text-[#C9A45C] rounded-lg font-bold mb-4">
                      + Add Item
                    </button>

                    <div className="space-y-4">
                      {(currentCat.items || []).map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="bg-white rounded-xl p-4 border border-[#E8DEC8]">
                          <div className="flex justify-between mb-3">
                            <span className="text-xs font-bold">Item #{itemIdx + 1}</span>
                            <button onClick={() => removeMenuItem(activeMenuCat, itemIdx)} className="text-red-400"><X className="w-4 h-4" /></button>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-24 shrink-0">
                              <ImageUpload label="Photo" currentImage={item.image} subdomain={formData.subdomain} type="menu" onUpload={(url) => updateMenuItem(activeMenuCat, itemIdx, "image", url)} onRemove={() => updateMenuItem(activeMenuCat, itemIdx, "image", "")} />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={item.name || ""} onChange={(e) => updateMenuItem(activeMenuCat, itemIdx, "name", e.target.value)} placeholder="Name" className="px-2 py-1.5 border border-[#E8DEC8] rounded-lg text-sm" />
                                <input type="text" value={item.price || ""} onChange={(e) => updateMenuItem(activeMenuCat, itemIdx, "price", e.target.value)} placeholder="Price" className="px-2 py-1.5 border border-[#E8DEC8] rounded-lg text-sm" />
                              </div>
                              <textarea value={item.description || ""} onChange={(e) => updateMenuItem(activeMenuCat, itemIdx, "description", e.target.value)} placeholder="Description" rows={2} className="w-full px-2 py-1.5 border border-[#E8DEC8] rounded-lg text-sm resize-none" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Save Buttons */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DEC8] shadow-md flex flex-col md:flex-row gap-3">
              <button onClick={() => router.push("/admin/dashboard")} className="px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">Cancel</button>
              <button onClick={() => handleUpdate("draft")} disabled={saving} className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Draft
              </button>
              <button onClick={() => handleUpdate("live")} disabled={saving} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <>🚀 Go Live</>}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}