


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Sparkles, Save, Eye, Plus, X, Loader, Check, ArrowRight,
  Phone, Mail, MapPin, Package, Star, Crown, Zap
} from "lucide-react";
import { createNewClient, Client } from "@/lib/supabase";
import ImageUpload from "@/app/admin/ImageUpload";

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
  { 
    id: "Restaurant Pro", 
    name: "Restaurant Pro", 
    emoji: "🍽️", 
    desc: "Dark luxury template for restaurants, bars, cafes & pubs",
    color: "from-[#D4AF37] to-[#8B6914]"
  },
];
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 799,
    emoji: "🌟",
    color: "from-[#8B6F47] to-[#6B5535]",
    features: [
      "Multi-page website (5 pages)",
      "Professional design",
      "Products with images",
      "Photo gallery",
      "Customer reviews",
      "Contact + Google Maps",
      "WhatsApp integration",
      "Order/Booking system",
      "Subdomain (name.avbsoftware.com)",
      "Basic SEO"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: 2499,
    emoji: "👑",
    color: "from-[#C9A45C] to-[#A88848]",
    features: [
      "Everything in Starter",
      "Custom Domain (.com)",
      "Premium Animations",
      "Video Integration",
      "Advanced SEO",
      "Google Analytics",
      "Business Email",
      "Priority Support",
      "Monthly Reports",
      "Unlimited Updates"
    ]
  }
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
    products: [{ name: "", price: "", description: "", image_url: "" }],
    reviews: [{ name: "", text: "", rating: 5, role: "" }],
    primary_color: "#8B6F47",
    secondary_color: "#C9A45C",
    logo_url: "",
    hero_image_url: "",
    plan_type: "starter",
    plan_price: 799,
    custom_domain: "",
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

  const handlePlanChange = (planId: "starter" | "professional") => {
    const plan = PLANS.find(p => p.id === planId);
    setFormData({
      ...formData,
      plan_type: planId,
      plan_price: plan?.price || 799,
    });
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

      const aiAbout = templates[formData.template] || `Welcome to ${formData.business_name}.`;
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
      alert(`✅ Website ${status === "live" ? "LIVE" : "Draft"} ho gayi!\nPlan: ${formData.plan_type === 'professional' ? '👑 Professional' : '🌟 Starter'}`);
      router.push("/admin/dashboard");
    } else {
      alert("❌ Save karne me error aaya!");
      setSaving(false);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <header className="bg-white border-b border-[#E8DEC8] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5535] font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create New Website
          </h1>
          <div className="flex gap-2">
            <button onClick={() => handleSave("draft")} disabled={saving} className="px-4 py-2 bg-[#FAF5EA] text-[#8B6F47] rounded-xl font-semibold text-sm hover:bg-[#E8DCC4] flex items-center gap-1 disabled:opacity-50">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button onClick={() => handleSave("live")} disabled={saving} className="px-4 py-2 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white rounded-xl font-semibold text-sm flex items-center gap-1 hover:shadow-lg disabled:opacity-50">
              {saving ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</> : <><Eye className="w-4 h-4" /> Generate</>}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#E8DEC8] py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { num: 1, label: "Plan" },
              { num: 2, label: "Template" },
              { num: 3, label: "Business Info" },
              { num: 4, label: "Products" },
              { num: 5, label: "Review" },
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
                {idx < 4 && <div className="w-8 h-0.5 bg-[#E8DEC8]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* ============ STEP 1: PLAN SELECTION ============ */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 className="text-3xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 1: Choose <span className="italic gradient-text">Plan</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Select which plan client purchased</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => handlePlanChange(plan.id as "starter" | "professional")}
                  className={`p-6 rounded-2xl border-2 text-left transition-all hover:-translate-y-1 ${
                    formData.plan_type === plan.id
                      ? "border-[#8B6F47] bg-[#FAF5EA] shadow-xl scale-105"
                      : "border-[#E8DEC8] hover:border-[#D4C29E] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                      {plan.emoji}
                    </div>
                    {formData.plan_type === plan.id && (
                      <div className="bg-green-500 text-white rounded-full p-1">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#2B2419] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ₹{plan.price}<span className="text-sm text-[#6B5D4A]">/month</span>
                  </div>

                  <div className="space-y-2">
                    {plan.features.slice(0, 5).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#6B5D4A]">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <div className="text-xs text-[#8B6F47] font-bold mt-2">
                        + {plan.features.length - 5} more features
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Domain Field for Professional */}
            {formData.plan_type === 'professional' && (
              <div className="mt-6 p-5 bg-yellow-50 border border-yellow-300 rounded-2xl">
                <div className="flex items-start gap-3 mb-3">
                  <Crown className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-yellow-700 mb-1">Custom Domain Setup</h4>
                    <p className="text-sm text-yellow-600">Enter client&apos;s custom domain (you can add later too)</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.custom_domain || ""}
                  onChange={(e) => handleChange("custom_domain", e.target.value)}
                  placeholder="example.com (without https://)"
                  className="w-full px-4 py-3 bg-white border border-yellow-300 rounded-xl outline-none focus:border-yellow-500"
                />
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.plan_type}
                className="px-8 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2"
              >
                Next: Template <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 2: TEMPLATE ============ */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 className="text-3xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 2: Choose <span className="italic gradient-text">Template</span>
            </h2>
            <p className="text-[#6B5D4A] mb-6">Select the template for client&apos;s business</p>

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
                  <h3 className="text-xl font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {template.name}
                  </h3>
                  <p className="text-sm text-[#6B5D4A]">{template.desc}</p>
                  {formData.template === template.id && (
                    <div className="mt-3 flex items-center gap-1 text-[#8B6F47] font-bold text-sm">
                      <Check className="w-4 h-4" /> Selected
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">← Back</button>
              <button onClick={() => setStep(3)} disabled={!formData.template} className="flex-1 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                Next: Business Info <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 3: BUSINESS INFO ============ */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 className="text-3xl font-bold text-[#2B2419] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 3: Business <span className="italic gradient-text">Info</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">Business Name *</label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleChange("business_name", e.target.value)}
                  placeholder="e.g., business Name"
                  className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]"
                />
                {formData.subdomain && (
                  <p className="text-xs text-[#8B6F47] mt-1">
                    🌐 URL: <code className="bg-[#FAF5EA] px-2 py-0.5 rounded">{formData.subdomain}.avbsoftware.com</code>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">Tagline</label>
                <input type="text" value={formData.tagline} onChange={(e) => handleChange("tagline", e.target.value)} placeholder="e.g., Premium Wood Solutions" className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-[#2B2419]">About Business *</label>
                  <button onClick={generateAboutWithAI} disabled={aiLoading} className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold flex items-center gap-1 disabled:opacity-50">
                    {aiLoading ? <><Loader className="w-3 h-3 animate-spin" /> Generating...</> : <><Sparkles className="w-3 h-3" /> AI Generate</>}
                  </button>
                </div>
                <textarea value={formData.about} onChange={(e) => handleChange("about", e.target.value)} rows={5} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2"><Phone className="w-4 h-4 inline mr-1" /> Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+91 0000000000" className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2">WhatsApp</label>
                  <input type="tel" value={formData.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} placeholder="+91 0000000000" className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2"><Mail className="w-4 h-4 inline mr-1" /> Email</label>
                  <input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2B2419] mb-2"><MapPin className="w-4 h-4 inline mr-1" /> City</label>
                  <input type="text" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2B2419] mb-2">Full Address</label>
                <input type="text" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47]" />
              </div>

              <div className="pt-4 border-t border-[#E8DEC8]">
                <h3 className="text-lg font-bold text-[#2B2419] mb-3">🖼️ Website Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUpload label="🎨 Logo" currentImage={formData.logo_url} subdomain={formData.subdomain} type="logo" onUpload={(url) => handleChange("logo_url", url)} onRemove={() => handleChange("logo_url", "")} />
                  <ImageUpload label="🖼️ Hero Banner" currentImage={formData.hero_image_url} subdomain={formData.subdomain} type="hero" onUpload={(url) => handleChange("hero_image_url", url)} onRemove={() => handleChange("hero_image_url", "")} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">← Back</button>
              <button onClick={() => setStep(4)} className="flex-1 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl flex items-center justify-center gap-2">
                Next: Products <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 4: PRODUCTS & REVIEWS ============ */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 className="text-3xl font-bold text-[#2B2419] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 4: Products & <span className="italic gradient-text">Reviews</span>
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#2B2419] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#8B6F47]" /> Products / Services
              </h3>

              <div className="space-y-3">
                {formData.products?.map((product, index) => (
                  <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#2B2419]">Product {index + 1}</h4>
                      {formData.products && formData.products.length > 1 && (
                        <button onClick={() => removeProduct(index)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mb-3">
                      <ImageUpload label="📸 Product Image" currentImage={product.image_url} subdomain={formData.subdomain} type="product" onUpload={(url) => updateProduct(index, "image_url", url)} onRemove={() => updateProduct(index, "image_url", "")} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" value={product.name} onChange={(e) => updateProduct(index, "name", e.target.value)} placeholder="Product name" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]" />
                      <input type="text" value={product.price} onChange={(e) => updateProduct(index, "price", e.target.value)} placeholder="Price" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]" />
                    </div>
                    <input type="text" value={product.description} onChange={(e) => updateProduct(index, "description", e.target.value)} placeholder="Description" className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]" />
                  </div>
                ))}

                <button onClick={addProduct} className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold hover:bg-[#FAF5EA] flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add Product
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#2B2419] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#C9A45C] fill-[#C9A45C]" /> Reviews
              </h3>

              <div className="space-y-3">
                {formData.reviews?.map((review, index) => (
                  <div key={index} className="p-4 bg-[#FAF5EA] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#2B2419]">Review {index + 1}</h4>
                      {formData.reviews && formData.reviews.length > 1 && (
                        <button onClick={() => removeReview(index)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" value={review.name} onChange={(e) => updateReview(index, "name", e.target.value)} placeholder="Customer name" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]" />
                      <input type="text" value={review.role} onChange={(e) => updateReview(index, "role", e.target.value)} placeholder="Role" className="px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47]" />
                    </div>
                    <textarea value={review.text} onChange={(e) => updateReview(index, "text", e.target.value)} placeholder="Review text" rows={2} className="w-full mt-3 px-3 py-2 bg-white border border-[#E8DEC8] rounded-lg outline-none focus:border-[#8B6F47] resize-none" />
                  </div>
                ))}

                <button onClick={addReview} className="w-full py-3 border-2 border-dashed border-[#D4C29E] text-[#8B6F47] rounded-xl font-bold hover:bg-[#FAF5EA] flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add Review
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">← Back</button>
              <button onClick={() => setStep(5)} className="flex-1 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl flex items-center justify-center gap-2">
                Next: Review <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 5: REVIEW & SAVE ============ */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-8 border border-[#E8DEC8] shadow-md">
            <h2 className="text-3xl font-bold text-[#2B2419] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Step 5: Review & <span className="italic gradient-text">Generate</span>
            </h2>

            <div className="space-y-4 mb-6">
              {/* Selected Plan Banner */}
              <div className={`p-5 rounded-2xl border-2 ${
                formData.plan_type === 'professional'
                  ? 'bg-gradient-to-br from-[#FFF9E6] to-[#FFF3CC] border-[#C9A45C]'
                  : 'bg-gradient-to-br from-[#FAF5EA] to-[#E8DCC4] border-[#8B6F47]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">
                      {formData.plan_type === 'professional' ? '👑' : '🌟'}
                    </div>
                    <div>
                      <div className="text-xs text-[#8B6F47] font-bold uppercase">Selected Plan</div>
                      <div className="text-2xl font-bold text-[#2B2419]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {formData.plan_type === 'professional' ? 'Professional' : 'Starter'}
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ₹{formData.plan_price}
                    <span className="text-sm text-[#6B5D4A]">/mo</span>
                  </div>
                </div>
              </div>

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
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">URL</div>
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {formData.plan_type === 'professional' && formData.custom_domain
                      ? formData.custom_domain
                      : `${formData.subdomain}.avbsoftware.com`}
                  </code>
                </div>
                <div>
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Phone</div>
                  <div className="text-[#2B2419] font-bold">{formData.phone}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-[#8B6F47] font-bold uppercase">Stats</div>
                  <div className="text-[#2B2419] font-bold">
                    📦 {formData.products?.length || 0} products • ⭐ {formData.reviews?.length || 0} reviews
                    {formData.logo_url && " • 🎨 Logo ✓"}
                    {formData.hero_image_url && " • 🖼️ Hero ✓"}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-700 font-bold">✅ Ready to generate website!</p>
                <p className="text-xs text-green-600 mt-1">
                  Plan: <strong>{formData.plan_type === 'professional' ? '👑 Professional ₹2,499/mo' : '🌟 Starter ₹799/mo'}</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(4)} className="flex-1 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl">← Edit</button>
              <button onClick={() => handleSave("draft")} disabled={saving} className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Draft
              </button>
              <button onClick={() => handleSave("live")} disabled={saving} className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                {saving ? <><Loader className="w-5 h-5 animate-spin" /> Generating...</> : <>🚀 Generate Website</>}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}