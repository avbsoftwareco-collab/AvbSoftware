"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Globe,
  Server,
  Smartphone,
  MessageCircle,
  MapPin,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Clock,
  ChevronDown,
  Zap,
  Crown,
  Sparkles,
  Eye,
  IndianRupee,
  Phone,
  Dumbbell,
  Coffee,
  Scissors,
  Pen,
  BadgeCheck,
  Rocket,
  HeartHandshake,
  Users,
  Award,
  TrendingUp,
  Quote,
  Lock,
  Headphones,
  Gift,
  Timer,
  ShieldCheck,
  FileText,
  Package,
  Stethoscope,
  GraduationCap,
  Truck,
  Store,
  ShoppingCart,
  Receipt,
  Settings,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────── CONSTANTS ─────────────────────── */
const WHATSAPP_NUMBER = "918103558368";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi AVB Software! I'm interested in the ₹799/month website plan. Please share more details."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

/* ─────────────────────── ANIMATIONS ─────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ─────────────────────── HELPER COMPONENTS ─────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container-custom">{children}</div>
    </section>
  );
}

function SectionBadge({ text }: { text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4"
    >
      <span className="w-8 h-px bg-[#8B6F47]"></span>
      {text}
      <span className="w-8 h-px bg-[#8B6F47]"></span>
    </motion.div>
  );
}

function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-5xl font-bold text-[#2B2419] mb-4 tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="text-[#6B5D4A] text-lg">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   1. HERO SECTION — POWERFUL & TRUST BUILDING
   ═══════════════════════════════════════════════ */

const heroStats = [
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "100%", label: "Satisfaction", icon: Star },
  { value: "3-5 Days", label: "Go Live", icon: Timer },
  { value: "24/7", label: "Support", icon: Headphones },
];

const quickTestimonials = [
  {
    name: "Rajesh Patel",
    business: "Patel Kirana, Indore",
    text: "AVB ne humare business ke liye website banayi. Bahut professional aur fast service!",
    avatar: "RP",
  },
  {
    name: "Dr. Sneha Verma",
    business: "Verma Clinic, Bhopal",
    text: "Website aur appointment system dono ek saath. Patients khush hain!",
    avatar: "SV",
  },
  {
    name: "Amit Sharma",
    business: "FitZone Gym, Indore",
    text: "₹799/month mein itni premium website! Best investment!",
    avatar: "AS",
  },
];

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % quickTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F5F0E6] pt-28 pb-16"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-[#E8DCC4]/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#C9A45C]/20 rounded-full blur-3xl" />
      <div className="absolute top-40 left-1/2 w-[400px] h-[400px] bg-[#D4C29E]/30 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,111,71,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,111,71,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Trust Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-xl text-[#8B6F47] text-sm font-semibold rounded-full border border-[#D4C29E] shadow-lg shadow-[#8B6F47]/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A45C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B6F47]" />
              </span>
              <ShieldCheck className="w-4 h-4 text-[#8B6F47]" />
              Trusted by 50+ Businesses in Indore & Bhopal
            </span>
          </motion.div>

          {/* Section Mini Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-[#8B6F47]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="w-12 h-px bg-[#8B6F47]"></span>
              PREMIUM WEBSITE PLAN
              <span className="w-12 h-px bg-[#8B6F47]"></span>
            </span>
          </motion.div>

          {/* H1 - Magnetic Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2B2419] leading-[1.05] mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional Website
            <br />
            for Just{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#C9A45C]/20 blur-2xl"></span>
              <span className="relative italic gradient-text">₹799/Month</span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[#6B5D4A] max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            <strong className="text-[#2B2419]">Premium design, free domain, free hosting, mobile-friendly</strong>, 
            and complete maintenance — all in one affordable monthly plan. 
            <span className="text-[#8B6F47] font-bold"> No huge upfront cost. Just ₹799/month!</span>
          </motion.p>

          {/* Trust Feature Pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {[
              { icon: Globe, text: "Free Domain" },
              { icon: Server, text: "Free Hosting" },
              { icon: Shield, text: "SSL Secured" },
              { icon: Smartphone, text: "Mobile Responsive" },
              { icon: RefreshCw, text: "Free Updates" },
              { icon: Headphones, text: "24/7 Support" },
            ].map((item) => (
              <motion.span
                key={item.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-[#E8DEC8] text-sm text-[#6B5D4A] font-medium shadow-sm hover:shadow-md hover:bg-white hover:border-[#D4C29E] transition-all"
              >
                <item.icon className="w-4 h-4 text-[#8B6F47]" />
                {item.text}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-2xl shadow-2xl shadow-[#8B6F47]/30 hover:shadow-[#8B6F47]/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="relative z-10 flex items-center gap-2 text-base">
                <MessageCircle className="w-5 h-5" />
                Get Started @ ₹799
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </a>

            <a
              href="tel:+918103558368"
              className="group px-8 py-5 bg-white text-[#8B6F47] font-bold rounded-2xl border-2 border-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call: +91 8103558368
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-sm hover:shadow-lg hover:border-[#D4C29E] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center flex-shrink-0 shadow-md">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div 
                    className="text-2xl font-bold text-[#2B2419]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6B5D4A] font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl border border-[#E8DEC8] shadow-xl p-7 overflow-hidden">
            <div className="absolute top-4 right-4">
              <Quote className="w-10 h-10 text-[#E8DCC4]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                  ))}
                  <span className="ml-2 text-xs text-[#8B6F47] font-bold bg-[#E8DCC4] px-2 py-0.5 rounded-full">
                    ✓ Verified Client
                  </span>
                </div>

                <p 
                  className="text-[#6B5D4A] text-base leading-relaxed mb-4 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &quot;{quickTestimonials[activeTestimonial].text}&quot;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center text-white font-bold shadow-md"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {quickTestimonials[activeTestimonial].avatar}
                    </div>
                    <div>
                      <div 
                        className="font-bold text-[#2B2419] text-sm"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {quickTestimonials[activeTestimonial].name}
                      </div>
                      <div className="text-xs text-[#8B6F47] flex items-center gap-1 font-semibold">
                        <MapPin className="w-3 h-3" />
                        {quickTestimonials[activeTestimonial].business}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    {quickTestimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === activeTestimonial
                            ? "bg-[#8B6F47] w-8"
                            : "bg-[#E8DCC4] w-2 hover:bg-[#D4C29E]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. WHY ₹799 - VALUE PROPOSITION
   ═══════════════════════════════════════════════ */

function WhyValueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const comparisons = [
    {
      title: "Regular Web Agencies",
      price: "₹50,000+",
      type: "bad",
      points: [
        "❌ Huge upfront payment",
        "❌ Hidden extra charges",
        "❌ Slow delivery (1-3 months)",
        "❌ Extra cost for hosting",
        "❌ Pay extra for updates",
        "❌ No ongoing support",
      ],
    },
    {
      title: "AVB Software @ ₹799/month",
      price: "₹799",
      type: "good",
      points: [
        "✓ Just ₹799 per month",
        "✓ ZERO hidden charges",
        "✓ Live in just 3-5 days",
        "✓ FREE domain & hosting",
        "✓ FREE monthly updates",
        "✓ 24/7 support included",
      ],
    },
  ];

  return (
    <Section className="bg-[#FAF5EA] relative overflow-hidden" id="why-value">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10"
      >
        <SectionBadge text="Why Choose Us" />
        <SectionTitle subtitle="See why hundreds of businesses choose us over expensive agencies.">
          The Smart Choice for <span className="italic gradient-text">Modern Businesses</span>
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              variants={scaleIn}
              custom={index}
              className={`p-8 rounded-3xl border-2 ${
                item.type === "good"
                  ? "bg-gradient-to-br from-[#8B6F47] to-[#6B5535] border-[#C9A45C] shadow-2xl shadow-[#8B6F47]/30 transform lg:scale-105 relative"
                  : "bg-white border-[#E8DEC8]"
              }`}
            >
              {item.type === "good" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-[#C9A45C] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    BEST VALUE
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 
                  className={`text-2xl font-bold mb-2 ${item.type === "good" ? "text-white" : "text-[#2B2419]"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span 
                    className={`text-5xl font-bold ${
                      item.type === "good" ? "text-[#C9A45C]" : "text-[#8B7E6A]"
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.price}
                  </span>
                  {item.type === "good" && (
                    <span className="text-[#E8DCC4] font-semibold">/month</span>
                  )}
                  {item.type === "bad" && (
                    <span className="text-[#8B7E6A] font-semibold">upfront</span>
                  )}
                </div>
              </div>

              <ul className={`space-y-3 ${item.type === "good" ? "text-[#FAF5EA]" : "text-[#6B5D4A]"}`}>
                {item.points.map((point) => (
                  <li key={point} className="text-sm font-medium">
                    {point}
                  </li>
                ))}
              </ul>

              {item.type === "good" && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-white transition-all shadow-lg hover:-translate-y-0.5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Choose This Plan
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   3. WHAT'S INCLUDED - FEATURES
   ═══════════════════════════════════════════════ */

const websiteFeatures = [
  {
    icon: Globe,
    title: "Free Premium Domain",
    description: "Get a free .com or .in domain registered in YOUR name. Yearly renewal free!",
  },
  {
    icon: Server,
    title: "Blazing-Fast Hosting",
    description: "99.9% uptime on premium cloud servers. Website loads in under 2 seconds.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Pixel-perfect display on mobile, tablet, laptop & desktop. Looks stunning everywhere.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description: "Customers reach you directly on WhatsApp with a single click. Boost conversions!",
  },
  {
    icon: MapPin,
    title: "Google Maps & Social",
    description: "Embed your location on Google Maps and link all your social media profiles.",
  },
  {
    icon: RefreshCw,
    title: "Free Monthly Updates",
    description: "Change photos, text, contact info — 2 free updates every month included!",
  },
  {
    icon: Shield,
    title: "SSL Certificate (HTTPS)",
    description: "Bank-level security with free SSL certificate. Google trust + customer confidence.",
  },
  {
    icon: TrendingUp,
    title: "Basic SEO Setup",
    description: "Optimized for Google search from day one. Get found by local customers easily.",
  },
  {
    icon: Headphones,
    title: "24/7 Priority Support",
    description: "WhatsApp, email, phone support whenever you need help. We're always here!",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#F5F0E6] relative overflow-hidden" id="features">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl -translate-y-1/2" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative z-10"
      >
        <SectionBadge text="What You Get" />
        <SectionTitle subtitle="Everything your business needs to succeed online — included in one simple monthly plan.">
          9 Premium Features in <span className="italic gradient-text">Every Plan</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className="group relative p-7 rounded-3xl bg-white border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-2xl hover:shadow-[#8B6F47]/15 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8DCC4]/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center mb-5 shadow-lg shadow-[#8B6F47]/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 
                  className="font-bold text-lg text-[#2B2419] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#6B5D4A] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6F47] to-[#C9A45C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   4. TEMPLATES SECTION
   ═══════════════════════════════════════════════ */

const templates = [
  {
    category: "Gym & Fitness",
    icon: Dumbbell,
    description: "Bold & energetic designs for gyms, yoga studios, and fitness centers.",
    features: ["Class Schedules", "Trainer Profiles", "Join Now CTA"],
  },
  {
    category: "Restaurants & Cafes",
    icon: Coffee,
    description: "Warm & inviting layouts for restaurants, bakeries, and cloud kitchens.",
    features: ["Menu Display", "Online Ordering", "Reservation System"],
  },
  {
    category: "Salons & Spa",
    icon: Scissors,
    description: "Elegant designs for beauty salons, spas, and wellness centers.",
    features: ["Service Menu", "Book Appointment", "Photo Gallery"],
  },
  {
    category: "Doctors & Clinics",
    icon: Stethoscope,
    description: "Professional designs for doctors, clinics, and healthcare practices.",
    features: ["Doctor Profile", "Appointment Booking", "Services List"],
  },
  {
    category: "Retail Shops",
    icon: Store,
    description: "Clean designs for retail shops, kirana stores, and showrooms.",
    features: ["Product Catalog", "Store Location", "Contact Info"],
  },
  {
    category: "Education",
    icon: GraduationCap,
    description: "Modern designs for schools, coaching centers, and tutors.",
    features: ["Course Listings", "Faculty Profiles", "Admission Form"],
  },
];

function TemplatesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#FAF5EA] relative overflow-hidden" id="templates">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10"
      >
        <SectionBadge text="Ready Templates" />
        <SectionTitle subtitle="Choose a design, share your details, and we'll customize it for your brand.">
          Pick Your <span className="italic gradient-text">Perfect Template</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.category}
              variants={scaleIn}
              custom={index}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-white border border-[#E8DEC8] overflow-hidden hover:shadow-2xl hover:shadow-[#8B6F47]/15 hover:border-[#D4C29E] transition-all duration-500"
            >
              {/* Mockup Preview */}
              <div className="relative h-52 bg-gradient-to-br from-[#E8DCC4] via-[#D4C29E] to-[#C9A45C] flex items-center justify-center overflow-hidden">
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, #FAF5EA 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Mock Website Frame */}
                <div className="w-[85%] bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8DEC8] transform group-hover:scale-105 transition-transform duration-700">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F5F0E6] border-b border-[#E8DEC8]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD93D]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6BCB77]" />
                    <span className="ml-2 flex-1 h-4 bg-white rounded-md border border-[#E8DEC8]" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="h-12 rounded-lg bg-gradient-to-r from-[#8B6F47] to-[#C9A45C] opacity-50" />
                    <div className="flex gap-2">
                      <div className="h-2 w-1/3 bg-[#E8DEC8] rounded-full" />
                      <div className="h-2 w-1/4 bg-[#F0E8D4] rounded-full" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-8 flex-1 bg-[#F5F0E6] rounded" />
                      <div className="h-8 flex-1 bg-[#F5F0E6] rounded" />
                      <div className="h-8 flex-1 bg-[#F5F0E6] rounded" />
                    </div>
                  </div>
                </div>

                {/* Category Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center shadow-lg text-white">
                  <template.icon className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6">
                <h3 
                  className="font-bold text-xl text-[#2B2419] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {template.category}
                </h3>
                <p className="text-[#6B5D4A] text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {template.features.map((f) => (
                    <span 
                      key={f} 
                      className="px-3 py-1 bg-[#FAF5EA] text-[#8B6F47] text-xs font-semibold rounded-full border border-[#E8DEC8]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the "${template.category}" template. Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Choose This Template
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="text-center text-[#6B5D4A] text-sm mt-10 italic">
          💡 Don&apos;t see your business?{" "}
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#8B6F47] font-bold hover:underline not-italic"
          >
            We build custom designs too!
          </a>
        </motion.p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   5. PROCESS SECTION
   ═══════════════════════════════════════════════ */

const steps = [
  { 
    step: "01", 
    title: "Contact Us", 
    description: "WhatsApp or call us. Tell us about your business and requirements.", 
    icon: Phone,
  },
  { 
    step: "02", 
    title: "Share Content", 
    description: "Send your logo, photos, business info, and content to us.", 
    icon: FileText,
  },
  { 
    step: "03", 
    title: "We Build It", 
    description: "Our team designs & develops your website with premium quality.", 
    icon: Rocket,
  },
  { 
    step: "04", 
    title: "Go Live! 🚀", 
    description: "Your website goes LIVE in just 3-5 business days!", 
    icon: BadgeCheck,
  },
];

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#F5F0E6] relative overflow-hidden" id="process">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10"
      >
        <SectionBadge text="How It Works" />
        <SectionTitle subtitle="From first message to live website — in just 4 simple steps.">
          Simple Process, <span className="italic gradient-text">Amazing Results</span>
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className="group relative text-center p-7 rounded-3xl bg-white border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/15 transition-all duration-500"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div 
                  className="px-4 py-1.5 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full text-white text-xs font-bold shadow-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  STEP {step.step}
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] flex items-center justify-center mx-auto mb-5 mt-3 group-hover:scale-110 transition-transform duration-500">
                <step.icon className="w-8 h-8 text-[#8B6F47]" />
              </div>

              <h3 
                className="font-bold text-xl text-[#2B2419] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[#6B5D4A] text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-[#D4C29E]" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   6. PRICING SECTION
   ═══════════════════════════════════════════════ */

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const monthlyFeatures = [
    "Free .com / .in Domain",
    "High-Speed Cloud Hosting",
    "100% Responsive Design",
    "WhatsApp Chat Integration",
    "Google Maps & Social Links",
    "2 Free Monthly Updates",
    "SSL Certificate (HTTPS)",
    "Basic SEO Setup",
    "24/7 Priority Support",
  ];

  const yearlyFeatures = [
    "Everything in Monthly Plan",
    "Save ₹1,589 vs Monthly",
    "Priority Premium Support",
    "3 Free Monthly Updates",
    "Annual Performance Report",
    "Free Logo Touch-ups",
  ];

  return (
    <Section className="bg-[#FAF5EA] relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#E8DCC4]/40 via-[#D4C29E]/40 to-[#C9A45C]/30 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10"
      >
        <SectionBadge text="Simple Pricing" />
        <SectionTitle subtitle="Transparent pricing with zero hidden charges. Choose what works for you.">
          One Price, <span className="italic gradient-text">Everything Included</span>
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* MONTHLY PLAN */}
          <motion.div 
            variants={scaleIn} 
            custom={0} 
            whileHover={{ y: -6 }} 
            className="relative p-8 rounded-3xl bg-white border-2 border-[#E8DEC8] hover:border-[#D4C29E] shadow-lg hover:shadow-2xl hover:shadow-[#8B6F47]/15 transition-all duration-500"
          >
            <div className="mb-6">
              <div 
                className="text-xs font-bold text-[#8B6F47] uppercase tracking-[2px] mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                — MONTHLY PLAN
              </div>
              <div className="flex items-baseline gap-1">
                <span 
                  className="text-6xl font-bold text-[#2B2419]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ₹799
                </span>
                <span className="text-[#6B5D4A] font-semibold text-lg">/month</span>
              </div>
              <p className="text-[#6B5D4A] text-sm mt-3 italic">Minimum 1-year commitment</p>
            </div>

            <ul className="space-y-3 mb-8">
              {monthlyFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-sm text-[#6B5D4A]">{f}</span>
                </li>
              ))}
            </ul>

            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#2B2419] hover:bg-[#1a1611] text-white font-bold rounded-2xl transition-all shadow-lg hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <MessageCircle className="w-4 h-4" />
              Get Started Monthly
            </a>
          </motion.div>

          {/* YEARLY PLAN (BEST VALUE) */}
          <motion.div 
            variants={scaleIn} 
            custom={1} 
            whileHover={{ y: -6 }} 
            className="relative p-8 rounded-3xl bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419] shadow-2xl shadow-[#8B6F47]/40 overflow-hidden border-2 border-[#C9A45C]"
          >
            {/* Best Value Badge */}
            <div className="absolute -top-4 right-8">
              <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#C9A45C] text-white text-xs font-bold rounded-full shadow-lg">
                <Star className="w-3 h-3 fill-white" />
                BEST VALUE
              </span>
            </div>

            {/* Pattern */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)`,
                backgroundSize: "30px 30px",
              }} 
            />

            <div className="relative z-10">
              <div className="mb-6">
                <div 
                  className="text-xs font-bold text-[#C9A45C] uppercase tracking-[2px] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  — YEARLY PLAN
                </div>
                <div className="flex items-baseline gap-2">
                  <span 
                    className="text-6xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ₹7,999
                  </span>
                  <span className="text-[#E8DCC4] font-semibold text-lg">/year</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-[#E8DCC4]/70 line-through">₹9,588</span>
                  <span className="px-3 py-0.5 bg-[#C9A45C]/30 text-[#C9A45C] text-xs font-bold rounded-full border border-[#C9A45C]/50">
                    SAVE ₹1,589
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {yearlyFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#C9A45C] rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-sm text-[#FAF5EA]">{f}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" />
                Get Yearly — Save ₹1,589!
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   7. TRUST SECTION
   ═══════════════════════════════════════════════ */

const trustPoints = [
  { icon: Shield, title: "100% Ownership", description: "Domain & content ownership stays with you forever." },
  { icon: Clock, title: "3-5 Days Delivery", description: "Fast turnaround from content to live website." },
  { icon: HeartHandshake, title: "No Lock-in After Year 1", description: "Cancel anytime after commitment period." },
  { icon: BadgeCheck, title: "Zero Hidden Fees", description: "What you see is what you pay. Period." },
  { icon: Lock, title: "Money-Back Guarantee", description: "Not satisfied? Get refund within 7 days." },
  { icon: Award, title: "Premium Quality", description: "Same quality as ₹50,000+ agency websites." },
];

function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#F5F0E6] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10"
      >
        <SectionBadge text="Why Trust Us" />
        <SectionTitle subtitle="Your trust is our priority. Here's why hundreds of businesses choose AVB Software.">
          Built on <span className="italic gradient-text">Trust & Transparency</span>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustPoints.map((point, index) => (
            <motion.div 
              key={point.title} 
              variants={fadeUp} 
              custom={index} 
              className="p-7 rounded-3xl bg-white border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-xl hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B6F47] to-[#6B5535] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8B6F47]/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <point.icon className="w-7 h-7 text-white" />
              </div>
              <h4 
                className="font-bold text-[#2B2419] text-lg mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {point.title}
              </h4>
              <p className="text-[#6B5D4A] text-sm leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   8. FAQ SECTION
   ═══════════════════════════════════════════════ */

const faqs = [
  { 
    question: "Who owns the domain name?", 
    answer: "You do! We register the domain in YOUR name. Full ownership stays with you always — no exceptions." 
  },
  { 
    question: "Can I cancel anytime?", 
    answer: "Yes! After the 1-year minimum commitment, you can cancel anytime. We hand over everything — domain, files, and data — to you." 
  },
  { 
    question: "How long does it take to go live?", 
    answer: "Just 3-5 business days once you share text & images. We handle everything else — design, development, hosting setup, and deployment." 
  },
  { 
    question: "What if I need more than 2 updates per month?", 
    answer: "Additional updates are available at nominal charges. We're always flexible to accommodate your needs!" 
  },
  { 
    question: "Is there any setup or hidden fee?", 
    answer: "Absolutely NOT! Zero setup charges, zero hidden fees. ₹799/month covers everything — domain, hosting, design, development, and support." 
  },
  { 
    question: "What if I want to upgrade my website later?", 
    answer: "You can upgrade anytime. We offer additional features like online ordering, payment gateway, blog, etc., at affordable rates." 
  },
  { 
    question: "Do you provide content writing?", 
    answer: "We work with your content. However, we can help refine your text and provide guidance on what to write for maximum impact." 
  },
  { 
    question: "What if I'm not satisfied?", 
    answer: "We offer a 7-day money-back guarantee. If you're not 100% satisfied with the initial design, we'll refund your payment." 
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen 
          ? "border-[#D4C29E] bg-[#FAF5EA] shadow-lg shadow-[#8B6F47]/10" 
          : "border-[#E8DEC8] bg-white hover:border-[#D4C29E]"
      }`}
    >
      <button 
        onClick={onToggle} 
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <span 
          className={`font-bold text-base transition-colors ${isOpen ? "text-[#8B6F47]" : "text-[#2B2419]"}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {faq.question}
        </span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }} 
          className={`flex-shrink-0 ml-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isOpen ? "bg-[#8B6F47] text-white" : "bg-[#E8DCC4] text-[#8B6F47]"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5">
              <p className="text-[#6B5D4A] text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#FAF5EA]" id="faq">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-3xl mx-auto"
      >
        <SectionBadge text="FAQs" />
        <SectionTitle subtitle="Got questions? We've got answers. Find everything you need to know below.">
          Frequently Asked <span className="italic gradient-text">Questions</span>
        </SectionTitle>

        <motion.div variants={fadeUp} className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openFAQ === index} 
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)} 
            />
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   9. FINAL CTA SECTION
   ═══════════════════════════════════════════════ */

function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-[#F5F0E6] pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419]"
      >
        {/* Pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} 
        />

        {/* Floating orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-72 h-72 bg-[#C9A45C]/20 rounded-full blur-3xl" 
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl" 
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#C9A45C]/20 backdrop-blur-md text-[#C9A45C] text-sm font-semibold rounded-full border border-[#C9A45C]/30 mb-8">
            <Rocket className="w-4 h-4" />
            Ready to Go Online?
          </div>

          <h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Launch Your Business Online
            <br />
            for Just <span className="italic" style={{ color: '#C9A45C' }}>₹799/Month!</span>
          </h2>

          <p className="text-[#E8DCC4] text-lg max-w-xl mx-auto mb-10">
            Stop losing customers to competitors. Get a stunning professional website 
            with everything included. Live in just 3-5 days!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-2 px-10 py-5 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 text-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <MessageCircle className="w-5 h-5" />
              Get My Website @ ₹799
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="tel:+918103558368" 
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#C9A45C] text-white font-bold rounded-2xl hover:bg-[#A88848] transition-all hover:-translate-y-1 text-lg"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {["Free Consultation", "No Hidden Fees", "Live in 3-5 Days", "Money-Back Guarantee"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-[#E8DCC4] text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function WebsitePlanPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <WhyValueSection />
      <FeaturesSection />
      <TemplatesSection />
      <ProcessSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}