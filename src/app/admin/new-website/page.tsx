"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Eye,
  Plus,
  X,
  Loader,
  Check,
  ArrowRight,
  Globe,
  Phone,
  Mail,
  MapPin,
  Package,
  Star
} from "lucide-react";
import { createNewClient, Client } from "@/lib/supabase";

const TEMPLATES = [
  { 
    id: "Timber Pro", 
    name: "Timber Pro", 
    emoji: "🪵", 
    desc: "Premium template for timber, wood & furniture businesses",
    color: "from-[#8B6F47] to-[#6B5535]"
  },
  { 
    id: "Cake Shop", 
    name: "Sweet Bites", 
    emoji: "🎂", 
    desc: "Sweet template for bakeries and cake shops",
    color: "from-[#D4647C] to-[#B84960]"
  },
];

export default function NewWebsitePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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
    products: [{ name: "", price: "", description: "" }],
    reviews: [{ name: "", text: "", rating: 5, role: "" }],
    primary_color: "#8B6F47",
    secondary_color: "#C9A45C",
    status: "draft",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("avb_admin_logged_in");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleChange = (field: keyof Client, value: any) => {
    setFormData({ ...formData, [field]: value });

    // Auto-generate subdomain from business name
    if (field === "business_name") {
      const subdomain = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData(prev => ({ ...prev, business_name: value, subdomain }));
    }
  };

  // AI Helper - Generate About Text
  const generateAboutWithAI = async () => {
    if (!formData.business_name) {
      alert("Pehle Business Name daalo!");
      return;
    }
    
    setAiLoading(true);
    
    setTimeout(() => {
      const templates: Record<string, string> = {
        "Timber Pro": `Welcome to ${formData.business_name}, your trusted partner in premium wood solutions in ${formData.city}. With years of experience and a commitment to quality, we offer the finest selection of timber, plywood, doors, and custom furniture. Our skilled craftsmen and dedication to customer satisfaction make us the preferred choice for builders, contractors, and homeowners. Whether you're constructing a new home, renovating, or looking for custom furniture, we have the perfect wood solution for you. Visit our showroom today and experience the ${formData.business_name} difference!`,
        
        "Cake Shop": `Welcome to ${formData.business_name}, ${formData.city}'s most loved bakery! We specialize in creating delicious, beautifully crafted cakes, pastries, and treats for every occasion. From birthday celebrations to weddings, anniversaries to corporate events, our talented bakers use only the finest ingredients to create memorable moments. Our cakes are made fresh daily with love and attention to detail. Whether you need a custom cake design or want to try our signature pastries, ${formData.business_name} is here to make your sweet dreams come true!`,
      };

      const aiAbout = templates[formData.template] || `Welcome to ${formData.business_name}, your trusted business in ${formData.city}. We are committed to providing the best products and services to our customers.`;
      
      handleChange("about", aiAbout);
      setAiLoading(false);
    }, 2000);
  };

  // Add product
  const addProduct = () => {
    handleChange("products", [
      ...(formData.products || []),
      { name: "", price: "", description: "" }
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

  // Add review
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

  // Save Client to Supabase
  const handleSave = async (status: "draft" | "live") => {
    if (!formData.business_name || !formData.template || !formData.subdomain) {
      alert("Business name, template aur subdomain required hai!");
      return;
    }

    setSaving(true);

    const clientData: Client = {
      ...formData,
      status,
    };

    const result = await createNewClient(clientData);

    if (result) {
      alert(`✅ Website ${status === "live" ? "LIVE" : "Draft"} ho gayi! Saved successfully!`);
      router.push("/admin/dashboard");
    } else {
      alert("❌ Save karne me error aaya! Console check karo.");
      setSaving(false);
    }
  };

  if (!isLoggedIn) return null;

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
            Create New Website
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm hover:bg-[#E8DCC4] transition-all flex items-center gap-1 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button
              onClick={() => handleSave("live")}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white rounded-xl font-semibold text-sm flex items-center gap-1 hover:shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Generate Website
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#E8DEC8] py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { num: 1, label: "Template" },
              { num: 2, label: "Business Info" },
              { num: 3, label: "Products & Reviews" },
              { num: 4, label: "Review & Save" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2">
                <button
                  onClick={() => setStep(s.num)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                    step === s.num
                      ? "bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white scale-105 shadow-lg"
                      : step > s.num
                      ? "bg-green-500 text-white"
                      : "bg-[#FAF5EA] text-[#8B6F47]"
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="text-sm hidden md:inline">{s.label}</span>
                </button>
                {idx < 3 && <div className="w-8 h-0.5 bg-[#E8DEC8]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* ============ STEP 1: TEMPLATE ============ */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 
              className="text-3xl font-bold text-[#2B2419] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Step 1: Choose <span className="italic gradient-text">Template</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Select the template that best fits your client&apos;s business</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleChange("template", template.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all hover:-translate-y-1 ${
                    formData.template === template.id
                      ? "border-[#8B6F47] bg-[#FAF5EA] shadow-xl scale-105"
                      : "border-[#E8DEC8] hover:border-[#D4C29E] bg-white"
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {template.emoji}
                  </div>
                  <h3 
                    className="text-xl font-bold text-[#2B2419] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {template.name}
                  </h3>
                  <p className="text-sm text-[#6B5D4A]">{template.desc}</p>
                  {formData.template === template.id && (
                    <div className="mt-3 flex items-center gap-1 text-[#8B6F47] font-bold text-sm">
                      <Check className="w-4 h-4" />
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.template}
                className="px-8 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2 hover:shadow-lg transition-all"
              >
                Next: Business Info
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 2: BUSINESS INFO ============ */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 
              className="text-3xl font-bold text-[#2B2419] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Step 2: Business <span className="italic gradient-text">Information</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Enter the client&apos;s business details</p>

            <div className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Business Name * <span className="text-[#8B6F47] text-xs font-normal">(Subdomain auto-generates)</span>
                </label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleChange("business_name", e.target.value)}
                  placeholder="e.g., Krishna Timber"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] transition-colors"
                />
                {formData.subdomain && (
                  <p className="text-xs text-[#8B6F47] mt-1">
                    🌐 URL: <code className="bg-[#FAF5EA] px-2 py-0.5 rounded">{formData.subdomain}.avbsoftware.com</code>
                  </p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange("tagline", e.target.value)}
                  placeholder="e.g., Premium Wood Solutions"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
              </div>

              {/* About + AI Button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-[#2B2419]">
                    About Business *
                  </label>
                  <button
                    onClick={generateAboutWithAI}
                    disabled={aiLoading}
                    className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold flex items-center gap-1 disabled:opacity-50 hover:shadow-lg"
                  >
                    {aiLoading ? (
                      <>
                        <Loader className="w-3 h-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        AI Generate
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  placeholder="Describe the business... or click AI Generate!"
                  rows={5}
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] resize-none"
                />
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    <Phone className="w-4 h-4 inline mr-1" /> Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
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
                    placeholder="919876543210"
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
                    placeholder="info@business.com"
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
                    placeholder="Bhopal"
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Shop No. 5, Main Market, Bhopal"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
              </div>

              {/* Social Media */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => handleChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-[#E8DCC4] transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Next: Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 3: PRODUCTS & REVIEWS ============ */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 
              className="text-3xl font-bold text-[#2B2419] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Step 3: Products & <span className="italic gradient-text">Reviews</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Add products/services and customer reviews</p>

            {/* PRODUCTS Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#2B2419] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#8B6F47]" />
                Products / Services
              </h3>

              <div className="space-y-3">
                {formData.products?.map((product, index) => (
                  <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#2B2419]">Product {index + 1}</h4>
                      {formData.products && formData.products.length > 1 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
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
                        placeholder="Price (e.g., ₹500)"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                      />
                    </div>

                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => updateProduct(index, "description", e.target.value)}
                      placeholder="Short description (optional)"
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

            {/* REVIEWS Section */}
            <div>
              <h3 className="text-xl font-bold text-[#2B2419] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#C9A45C] fill-[#C9A45C]" />
                Customer Reviews
              </h3>

              <div className="space-y-3">
                {formData.reviews?.map((review, index) => (
                  <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#2B2419]">Review {index + 1}</h4>
                      {formData.reviews && formData.reviews.length > 1 && (
                        <button
                          onClick={() => removeReview(index)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
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
                        placeholder="Role (e.g., Customer)"
                        className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]"
                      />
                    </div>

                    <textarea
                      value={review.text}
                      onChange={(e) => updateReview(index, "text", e.target.value)}
                      placeholder="Review text..."
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

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-[#E8DCC4] transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Next: Review
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 4: REVIEW & SAVE ============ */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 
              className="text-3xl font-bold text-[#2B2419] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Step 4: Review & <span className="italic gradient-text">Generate</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Verify all info before generating the website</p>

            {/* Summary */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Template</div>
                  <div className="text-[#2B2419] font-bold">{formData.template}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Business</div>
                  <div className="text-[#2B2419] font-bold">{formData.business_name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Subdomain</div>
                  <code className="bg-white px-2 py-1 rounded text-sm">{formData.subdomain}</code>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Phone</div>
                  <div className="text-[#2B2419] font-bold">{formData.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">City</div>
                  <div className="text-[#2B2419] font-bold">{formData.city}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Email</div>
                  <div className="text-[#2B2419] font-bold text-sm">{formData.email || "Not provided"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Products & Reviews</div>
                  <div className="text-[#2B2419] font-bold">
                    📦 {formData.products?.length || 0} products • ⭐ {formData.reviews?.length || 0} reviews
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-bold flex items-center gap-2">
                  ✅ All set! Click below to save and generate the website.
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Future URL: <code className="bg-white px-2 py-0.5 rounded">{formData.subdomain}.avbsoftware.com</code>
                </p>
              </div>
            </div>

            {/* Final Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-[#E8DCC4] transition-colors"
              >
                ← Edit
              </button>
              <button
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save as Draft
              </button>
              <button
                onClick={() => handleSave("live")}
                disabled={saving}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    🚀 Generate Live Website
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}