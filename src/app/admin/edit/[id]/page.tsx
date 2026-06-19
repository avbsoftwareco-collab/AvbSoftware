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
  Phone,
  Mail,
  MapPin,
  Package,
  Star,
  Trash2,
  Sparkles
} from "lucide-react";
import { getClientById, updateClient, deleteClient, Client } from "@/lib/supabase";
import ImageUpload from "@/app/admin/ImageUpload";

export default function EditWebsitePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

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
    status: "draft",
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
      });
    } else {
      alert("Client not found!");
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  const handleChange = (field: keyof Client, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const generateAboutWithAI = async () => {
    if (!formData.business_name) {
      alert("Pehle Business Name daalo!");
      return;
    }
    
    setAiLoading(true);
    
    setTimeout(() => {
      const templates: Record<string, string> = {
        "Timber Pro": `Welcome to ${formData.business_name}, your trusted partner in premium wood solutions in ${formData.city}.`,
        "Cake Shop": `Welcome to ${formData.business_name}, ${formData.city}'s most loved bakery!`,
      };

      const aiAbout = templates[formData.template] || `Welcome to ${formData.business_name}, your trusted business in ${formData.city}.`;
      
      handleChange("about", aiAbout);
      setAiLoading(false);
    }, 2000);
  };

  const addProduct = () => {
    handleChange("products", [
      ...(formData.products || []),
      { name: "", price: "", description: "", image_url: "" }
    ]);
  };

  const removeProduct = (index: number) => {
    const updated = formData.products?.filter((_, i) => i !== index) || [];
    handleChange("products", updated);
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const updated = [...(formData.products || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("products", updated);
  };

  const addReview = () => {
    handleChange("reviews", [
      ...(formData.reviews || []),
      { name: "", text: "", rating: 5, role: "" }
    ]);
  };

  const removeReview = (index: number) => {
    const updated = formData.reviews?.filter((_, i) => i !== index) || [];
    handleChange("reviews", updated);
  };

  const updateReview = (index: number, field: string, value: any) => {
    const updated = [...(formData.reviews || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange("reviews", updated);
  };

  const handleUpdate = async (status?: "draft" | "live") => {
    if (!formData.business_name || !formData.subdomain) {
      alert("Business name aur subdomain required hai!");
      return;
    }

    setSaving(true);

    const updates: Partial<Client> = {
      ...formData,
      ...(status && { status }),
    };

    const result = await updateClient(params.id, updates);

    if (result) {
      alert(`✅ Website updated successfully!`);
      router.push("/admin/dashboard");
    } else {
      alert("❌ Update failed! Check console.");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${formData.business_name}? This cannot be undone!`)) return;
    
    const success = await deleteClient(params.id);
    if (success) {
      alert("✅ Deleted successfully!");
      router.push("/admin/dashboard");
    } else {
      alert("❌ Delete failed!");
    }
  };

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

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5535] transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 
            className="text-xl font-bold text-[#2B2419]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Edit: {formData.business_name}
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/site/${formData.subdomain}`}
              target="_blank"
              className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm hover:bg-[#E8DCC4] transition-all flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 text-sm">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              formData.status === 'live' 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-500 text-white'
            }`}>
              {formData.status === 'live' ? '🟢 LIVE' : '🟡 DRAFT'}
            </span>
            <span className="text-blue-700">
              🌐 <a 
                href={`https://${formData.subdomain}.avbsoftware.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                {formData.subdomain}.avbsoftware.com
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md space-y-6">
          
          {/* Business Info Section */}
          <div>
            <h2 
              className="text-2xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              📝 Business <span className="italic gradient-text">Information</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Template
                </label>
                <div className="px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl text-[#6B5D4A]">
                  {formData.template}
                  <span className="text-xs text-[#8B7E6A] ml-2">(Cannot change template)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleChange("business_name", e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Subdomain * <span className="text-red-500 text-xs font-normal">(⚠️ URL change ho jayega!)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.subdomain}
                    onChange={(e) => {
                      const value = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "")
                        .replace(/-+/g, "-");
                      handleChange("subdomain", value);
                    }}
                    placeholder="e.g., priya-ki-rasoi"
                    className="w-full px-4 py-3 pr-40 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B6F47] font-semibold">
                    .avbsoftware.com
                  </div>
                </div>
                <p className="text-xs text-[#8B6F47] mt-2 bg-[#FAF5EA] p-2 rounded">
                  🌐 URL: <code className="bg-white px-2 py-0.5 rounded font-bold">
                    {formData.subdomain || "your-name"}.avbsoftware.com
                  </code>
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-[#2B2419]">
                    About Business *
                  </label>
                  <button
                    onClick={generateAboutWithAI}
                    disabled={aiLoading}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold flex items-center gap-1 disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <><Loader className="w-3 h-3 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-3 h-3" /> AI Generate</>
                    )}
                  </button>
                </div>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    <Phone className="w-4 h-4 inline mr-1" /> Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    <Mail className="w-4 h-4 inline mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" /> City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* IMAGES SECTION - NEW! */}
          {/* ============================================ */}
          <div className="pt-6 border-t border-[#E8DEC8]">
            <h2 
              className="text-2xl font-bold text-[#2B2419] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              🖼️ Website <span className="italic gradient-text">Images</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUpload
                label="🎨 Business Logo"
                currentImage={formData.logo_url}
                subdomain={formData.subdomain}
                type="logo"
                onUpload={(url) => handleChange("logo_url", url)}
                onRemove={() => handleChange("logo_url", "")}
              />

              <ImageUpload
                label="🖼️ Hero Banner Image"
                currentImage={formData.hero_image_url}
                subdomain={formData.subdomain}
                type="hero"
                onUpload={(url) => handleChange("hero_image_url", url)}
                onRemove={() => handleChange("hero_image_url", "")}
              />
            </div>
          </div>

          {/* Products Section with Images */}
          <div className="pt-6 border-t border-[#E8DEC8]">
            <h2 
              className="text-2xl font-bold text-[#2B2419] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <Package className="w-6 h-6 text-[#8B6F47]" />
              Products / Services
            </h2>

            <div className="space-y-3">
              {formData.products?.map((product, index) => (
                <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[#2B2419]">Product {index + 1}</h4>
                    {formData.products && formData.products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Product Image Upload */}
                  <div className="mb-4">
                    <ImageUpload
                      label={`📸 Product Image`}
                      currentImage={product.image_url}
                      subdomain={formData.subdomain}
                      type="product"
                      onUpload={(url) => updateProduct(index, "image_url", url)}
                      onRemove={() => updateProduct(index, "image_url", "")}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                      placeholder="Product name"
                      className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                    />
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => updateProduct(index, "price", e.target.value)}
                      placeholder="Price"
                      className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                    />
                  </div>

                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => updateProduct(index, "description", e.target.value)}
                    placeholder="Short description"
                    className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                  />
                </div>
              ))}

              <button
                onClick={addProduct}
                className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold hover:bg-[#FAF5EA] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pt-6 border-t border-[#E8DEC8]">
            <h2 
              className="text-2xl font-bold text-[#2B2419] mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <Star className="w-6 h-6 text-[#C9A45C] fill-[#C9A45C]" />
              Customer Reviews
            </h2>

            <div className="space-y-3">
              {formData.reviews?.map((review, index) => (
                <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-[#2B2419]">Review {index + 1}</h4>
                    {formData.reviews && formData.reviews.length > 1 && (
                      <button
                        onClick={() => removeReview(index)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => updateReview(index, "name", e.target.value)}
                      placeholder="Customer name"
                      className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                    />
                    <input
                      type="text"
                      value={review.role}
                      onChange={(e) => updateReview(index, "role", e.target.value)}
                      placeholder="Role"
                      className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                    />
                  </div>

                  <textarea
                    value={review.text}
                    onChange={(e) => updateReview(index, "text", e.target.value)}
                    placeholder="Review text"
                    rows={2}
                    className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47] resize-none"
                  />
                </div>
              ))}

              <button
                onClick={addReview}
                className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold hover:bg-[#FAF5EA] transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Review
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[#E8DEC8] flex flex-col md:flex-row gap-3">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="px-6 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-[#E8DCC4] transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={() => handleUpdate("draft")}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save as Draft
            </button>
            
            <button
              onClick={() => handleUpdate("live")}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <><Loader className="w-5 h-5 animate-spin" /> Updating...</>
              ) : (
                <>🚀 Update & Go Live</>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}