"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Globe,
  Server,
  Smartphone,
  MessageCircle,
  MapPin,
  RefreshCw,
  Check,
  ArrowRight,
  Star,
  Shield,
  Clock,
  ChevronDown,
  Zap,
  Crown,
  Sparkles,
  Eye,
  MousePointer,
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
  TrendingUp,
  CheckCircle2,
  X,
  Building2,
  ShoppingCart,
  Receipt,
  Database,
  BarChart3,
  Store,
  Stethoscope,
  GraduationCap,
  Truck,
  Wrench,
  MonitorSmartphone,
  Headphones,
  ArrowUpRight,
  Play,
  Quote,
  MapPinned,
  Award,
  Timer,
  ShieldCheck,
  FileText,
  Settings,
  Package,
  ClipboardList,
  Calculator,
  Banknote,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────── CONSTANTS ─────────────────────── */

const WHATSAPP_NUMBER = "918103558368";
const WHATSAPP_MSG_CTA = encodeURIComponent(
  "Hi AVB Software! I'm interested in getting a professional website / custom software for my business. Please share more details."
);
const WHATSAPP_MSG_TEMPLATE = (name: string) =>
  encodeURIComponent(
    `Hi AVB Software! I liked the "${name}" template. I'd like to get started.`
  );
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`;

/* ─────────────────────── ANIMATION VARIANTS ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
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
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}

function SectionBadge({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full border border-indigo-100 mb-6"
    >
      <Icon className="w-4 h-4" />
      {text}
    </motion.span>
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
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.h2
        variants={fadeUp}
        className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className="text-slate-500 text-lg">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* Floating particle */
function FloatingParticle({ delay, duration, x, y, size = 4 }: { delay: number; duration: number; x: string; y: string; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-indigo-400/30"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -40, 0],
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION — FULLY UPGRADED WITH TRUST
   ═══════════════════════════════════════════════════════════ */

/* Client logos / industries served ticker */
const industriesServed = [
  { name: "Retail & Shops", icon: Store },
  { name: "Restaurants & Cafes", icon: Coffee },
  { name: "Gyms & Fitness", icon: Dumbbell },
  { name: "Clinics & Doctors", icon: Stethoscope },
  { name: "Salons & Spa", icon: Scissors },
  { name: "Schools & Coaching", icon: GraduationCap },
  { name: "Logistics & Transport", icon: Truck },
  { name: "Service & Repair", icon: Wrench },
  { name: "E-Commerce", icon: ShoppingCart },
  { name: "Billing & POS", icon: Receipt },
];

/* Hero stats */
const heroStats = [
  { value: "50+", label: "Businesses Served", icon: Building2 },
  { value: "100%", label: "Client Satisfaction", icon: Star },
  { value: "3-5", label: "Days to Go Live", icon: Timer },
  { value: "24/7", label: "Support Available", icon: Headphones },
];

/* Quick testimonials for hero */
const quickTestimonials = [
  {
    name: "Rajesh Patel",
    business: "Patel Kirana Store, Indore",
    text: "AVB ne humare store ke liye billing software banaya. Ab sab kuch digital hai!",
    avatar: "RP",
    rating: 5,
  },
  {
    name: "Dr. Sneha Verma",
    business: "Verma Clinic, Bhopal",
    text: "Website aur appointment system dono ek saath mil gaya. Patients khush hain!",
    avatar: "SV",
    rating: 5,
  },
  {
    name: "Amit Sharma",
    business: "FitZone Gym, Indore",
    text: "₹799/month mein itni professional website! Competitors se aage nikal gaye.",
    avatar: "AS",
    rating: 5,
  },
];

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % quickTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-28 pb-8"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-8%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -30, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} duration={4} x="10%" y="20%" />
      <FloatingParticle delay={1} duration={5} x="85%" y="15%" size={6} />
      <FloatingParticle delay={2} duration={6} x="50%" y="70%" />
      <FloatingParticle delay={0.5} duration={4.5} x="30%" y="85%" size={5} />
      <FloatingParticle delay={1.5} duration={5.5} x="75%" y="45%" />
      <FloatingParticle delay={3} duration={4} x="15%" y="60%" size={3} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* ────── TOP: Main Content ────── */}
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* 🏷️ Trust Badge — Company Verification */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-xl text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100/60 shadow-lg shadow-indigo-100/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Verified Software Company — Indore & Bhopal, MP
            </span>
          </motion.div>

          {/* 📰 H1 — SEO + Keywords Rich */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-5 tracking-tight"
          >
            <span className="block mb-2">
              Custom Software, Billing & Inventory
            </span>
            <span className="block mb-2">
              Solutions for Local Businesses —
            </span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 blur-2xl" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Starting at Just ₹799/Month
              </span>
            </span>
          </motion.h1>

          {/* 📝 Subheadline — Trust building */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            We build <strong className="text-slate-700">Websites, Billing Software, Inventory Management, POS Systems</strong> & 
            <strong className="text-slate-700"> Custom Business Applications</strong> for Shops, Clinics, Gyms, 
            Restaurants & every local business in <strong className="text-slate-700">Indore, Bhopal & across India</strong>. 
            <span className="text-indigo-600 font-semibold"> No huge upfront cost — pay monthly!</span>
          </motion.p>

          {/* 🏆 Trust Indicators — Glassmorphism */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {[
              { icon: Globe, text: "Free Domain", color: "text-blue-500" },
              { icon: Server, text: "Free Hosting", color: "text-purple-500" },
              { icon: Shield, text: "SSL Secured", color: "text-green-500" },
              { icon: Receipt, text: "GST Billing Ready", color: "text-amber-500" },
              { icon: Database, text: "Inventory System", color: "text-pink-500" },
              { icon: RefreshCw, text: "Free Updates", color: "text-cyan-500" },
            ].map((item) => (
              <motion.span
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-100/80 text-sm text-slate-600 font-medium shadow-sm hover:shadow-md hover:bg-white/80 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                {item.text}
              </motion.span>
            ))}
          </motion.div>

          {/* 🔘 CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Get Free Consultation on WhatsApp
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </a>

            <a
              href="tel:+918103558368"
              className="group px-8 py-4 bg-white/70 backdrop-blur-sm text-slate-700 font-semibold rounded-2xl border-2 border-slate-200/50 shadow-lg hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                Call: +91 8103558368
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* ────── HERO STATS BAR ────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ────── LIVE TESTIMONIAL SLIDER ────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100/80 shadow-lg p-6 overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-4 right-4">
              <Quote className="w-8 h-8 text-indigo-100" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: quickTestimonials[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs text-slate-400 font-medium">Verified Client</span>
                </div>

                {/* Text */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                  &quot;{quickTestimonials[activeTestimonial].text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {quickTestimonials[activeTestimonial].avatar}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">
                        {quickTestimonials[activeTestimonial].name}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPinned className="w-3 h-3" />
                        {quickTestimonials[activeTestimonial].business}
                      </div>
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {quickTestimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === activeTestimonial
                            ? "bg-indigo-500 w-6"
                            : "bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ────── INDUSTRIES WE SERVE — SCROLLING TICKER ────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="mb-8"
        >
          <p className="text-center text-xs text-slate-400 font-medium tracking-[0.15em] uppercase mb-4">
            Trusted by Local Businesses Across Madhya Pradesh
          </p>
          <div className="industries-marquee">
            <div className="industries-marquee-content">
              {industriesServed.map((industry) => (
                <span key={`a-${industry.name}`} className="industry-pill">
                  <industry.icon className="w-4 h-4 text-indigo-500" />
                  {industry.name}
                </span>
              ))}
            </div>
            <div className="industries-marquee-content" aria-hidden="true">
              {industriesServed.map((industry) => (
                <span key={`b-${industry.name}`} className="industry-pill">
                  <industry.icon className="w-4 h-4 text-indigo-500" />
                  {industry.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ────── COMPANY CREDENTIALS BAR ────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 py-6 px-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100/50">
            {[
              { icon: ShieldCheck, text: "Registered Company", color: "text-green-600" },
              { icon: MapPinned, text: "Office in Bhopal, MP", color: "text-blue-600" },
              { icon: Award, text: "ISO Quality Standards", color: "text-amber-600" },
              { icon: Users, text: "Dedicated Team", color: "text-purple-600" },
              { icon: FileText, text: "Proper Agreement", color: "text-pink-600" },
            ].map((cred) => (
              <span
                key={cred.text}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium"
              >
                <cred.icon className={`w-4 h-4 ${cred.color}`} />
                {cred.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <style jsx>{`
        .industries-marquee {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .industries-marquee-content {
          display: flex;
          gap: 1rem;
          animation: industriesScroll 30s linear infinite;
          flex-shrink: 0;
          padding: 0 0.5rem;
        }
        .industries-marquee:hover .industries-marquee-content {
          animation-play-state: paused;
        }
        @keyframes industriesScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .industry-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          border: 1px solid rgba(226,232,240,0.8);
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .industry-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          background: white;
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. WHAT WE BUILD — SOFTWARE SERVICES SECTION (NEW!)
   ═══════════════════════════════════════════════════════════ */

const softwareServices = [
  {
    icon: MonitorSmartphone,
    title: "Business Website",
    price: "₹799/mo",
    description: "Professional website with domain, hosting & maintenance. Perfect for any local business.",
    features: ["Free Domain & Hosting", "Mobile Responsive", "WhatsApp Integration", "Google Maps"],
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
    tag: "Most Popular",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    icon: Receipt,
    title: "GST Billing Software",
    price: "Custom",
    description: "Complete billing solution with GST invoicing, customer management & payment tracking.",
    features: ["GST Invoice Generation", "Customer Database", "Payment Tracking", "Reports & Analytics"],
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
    tag: "For Shops",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Package,
    title: "Inventory Management",
    price: "Custom",
    description: "Track your stock, manage suppliers, get low-stock alerts & generate purchase orders.",
    features: ["Stock Tracking", "Low Stock Alerts", "Supplier Management", "Purchase Orders"],
    gradient: "from-purple-500 to-pink-600",
    bgGlow: "bg-purple-500/10",
    tag: "For Retailers",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: ClipboardList,
    title: "POS System",
    price: "Custom",
    description: "Point-of-Sale system for retail shops, restaurants & service businesses.",
    features: ["Quick Billing", "Barcode Scanner", "Daily Reports", "Multi-user Access"],
    gradient: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-500/10",
    tag: "For Retail",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    icon: Stethoscope,
    title: "Clinic / Hospital Software",
    price: "Custom",
    description: "Patient management, appointment scheduling, prescription generation & billing.",
    features: ["Patient Records", "Appointments", "Prescriptions", "Lab Reports"],
    gradient: "from-green-500 to-emerald-600",
    bgGlow: "bg-green-500/10",
    tag: "For Doctors",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    icon: Settings,
    title: "Custom Software",
    price: "Custom",
    description: "Any custom business application built specifically for YOUR unique requirements.",
    features: ["Tailored to You", "Scalable Design", "Cloud Based", "Mobile Friendly"],
    gradient: "from-indigo-500 to-blue-600",
    bgGlow: "bg-indigo-500/10",
    tag: "Any Business",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
];

function SoftwareServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden" id="solutions">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-pink-100/20 rounded-full blur-[100px] -translate-y-1/2" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Rocket} text="Our Solutions" />
          <SectionTitle subtitle="From a simple business website to complete custom billing & inventory software — we build it all for local businesses.">
            Custom Software &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Digital Solutions
            </span>{" "}
            for Every Business
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwareServices.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className="group relative p-7 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden"
            >
              {/* Glow */}
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${service.bgGlow}`} />

              <div className="relative z-10">
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.tagColor}`}>
                    {service.tag}
                  </span>
                </div>

                {/* Title + Price */}
                <h3 className="font-bold text-lg text-slate-800 mb-1">{service.title}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-xl font-black bg-clip-text text-transparent bg-gradient-to-r ${service.gradient}`}>
                    {service.price}
                  </span>
                  {service.price === "₹799/mo" && (
                    <span className="text-xs text-slate-400">all inclusive</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-600 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in ${service.title}. Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire Now
                </a>
              </div>

              {/* Bottom bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. CORE FEATURES — WEBSITE PLAN
   ═══════════════════════════════════════════════════════════ */

const websiteFeatures = [
  {
    icon: Globe,
    title: "Free .com or .in Domain",
    description: "Premium domain registered in YOUR name. Renewed free every year.",
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Server,
    title: "Blazing-Fast Hosting",
    description: "99.9% uptime on high-speed cloud servers. Loads under 2 seconds.",
    gradient: "from-purple-500 to-pink-600",
    bgGlow: "bg-purple-500/10",
  },
  {
    icon: Smartphone,
    title: "100% Responsive Design",
    description: "Looks stunning on mobile, tablet, laptop & desktop. Pixel-perfect.",
    gradient: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-500/10",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat Integration",
    description: "Customers reach you directly on WhatsApp with a single click.",
    gradient: "from-green-500 to-emerald-600",
    bgGlow: "bg-green-500/10",
  },
  {
    icon: MapPin,
    title: "Google Maps & Socials",
    description: "Embed location on Google Maps and link all social media profiles.",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
  },
  {
    icon: RefreshCw,
    title: "2 Free Monthly Updates",
    description: "Change photos, text, contact info — 2 free updates every month!",
    gradient: "from-cyan-500 to-teal-600",
    bgGlow: "bg-cyan-500/10",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-white relative overflow-hidden" id="features">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[100px] -translate-y-1/2" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Zap} text="₹799/Month Website Plan" />
          <SectionTitle subtitle="Everything your business needs to go online — included in one simple monthly subscription.">
            What You Get in the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Website Plan
            </span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${feature.bgGlow}`} />
              <div className="relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. TEMPLATES SECTION
   ═══════════════════════════════════════════════════════════ */

const templates = [
  {
    category: "Fitness & Gym",
    icon: Dumbbell,
    gradient: "from-orange-500 to-red-500",
    mockupBg: "from-orange-100 to-red-100",
    description: "Bold & energetic design for gyms, yoga studios, and fitness centers.",
    features: ["Class Schedules", "Trainer Profiles", "Join Now CTA"],
  },
  {
    category: "Cafes & Restaurants",
    icon: Coffee,
    gradient: "from-amber-500 to-yellow-600",
    mockupBg: "from-amber-100 to-yellow-100",
    description: "Warm & inviting layouts for restaurants, bakeries, and cloud kitchens.",
    features: ["Menu Display", "Online Ordering", "Reservation"],
  },
  {
    category: "Salons & Spa",
    icon: Scissors,
    gradient: "from-pink-500 to-purple-600",
    mockupBg: "from-pink-100 to-purple-100",
    description: "Elegant & soothing designs for beauty salons, spas, and wellness centers.",
    features: ["Service Menu", "Book Appointment", "Gallery"],
  },
  {
    category: "Professional Portfolio",
    icon: Pen,
    gradient: "from-indigo-500 to-blue-600",
    mockupBg: "from-indigo-100 to-blue-100",
    description: "Clean & minimal portfolios for freelancers, doctors, lawyers & consultants.",
    features: ["About Section", "Services List", "Contact Form"],
  },
];

function TemplatesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden" id="templates">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Eye} text="Ready Templates" />
          <SectionTitle subtitle="Choose a category — we'll customize it with your brand, photos & content.">
            Pick a Template,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Go Live in Days
            </span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.category}
              variants={scaleIn}
              custom={index}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-white border border-slate-100/80 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              {/* Mockup */}
              <div className={`relative h-56 bg-gradient-to-br ${template.mockupBg} flex items-center justify-center overflow-hidden`}>
                <div className="w-[85%] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200/50 transform group-hover:scale-105 transition-transform duration-700">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 flex-1 h-4 bg-white rounded-md border border-slate-200" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className={`h-20 rounded-lg bg-gradient-to-r ${template.gradient} opacity-20`} />
                    <div className="flex gap-2">
                      <div className="h-3 w-1/3 bg-slate-200 rounded-full" />
                      <div className="h-3 w-1/4 bg-slate-100 rounded-full" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-12 flex-1 bg-slate-100 rounded-lg" />
                      <div className="h-12 flex-1 bg-slate-100 rounded-lg" />
                      <div className="h-12 flex-1 bg-slate-100 rounded-lg" />
                    </div>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${template.gradient} flex items-center justify-center shadow-lg text-white`}>
                  <template.icon className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-slate-800 mb-2">{template.category}</h3>
                <p className="text-slate-500 text-sm mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.features.map((f) => (
                    <span key={f} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-100">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r ${template.gradient} text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm`}
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_TEMPLATE(template.category)}`, "_blank")}
                  >
                    <MousePointer className="w-4 h-4" />
                    Choose This
                  </button>
                  <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-600 font-semibold rounded-xl border-2 border-slate-200 hover:border-indigo-200 hover:text-indigo-600 transition-all text-sm">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="text-center text-slate-400 text-sm mt-10">
          💡 Don&apos;t see your business? We build custom designs too!{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
            Contact Us
          </a>
        </motion.p>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. PRICING + FAQ
   ═══════════════════════════════════════════════════════════ */

const faqs = [
  { question: "Who owns the domain name?", answer: "You do! We register it in YOUR name. Full ownership stays with you always." },
  { question: "Can I cancel anytime?", answer: "Yes! After 1-year commitment, cancel anytime. We hand over everything — domain, files, data." },
  { question: "How long does it take to go live?", answer: "Just 3-5 business days once you share text & images. We handle everything else." },
  { question: "What if I need more than 2 updates/month?", answer: "Additional updates at nominal charges. We're always flexible!" },
  { question: "Is there any setup fee?", answer: "Absolutely NOT! Zero hidden charges. ₹799/month covers everything." },
  { question: "Do you build custom billing/inventory software?", answer: "Yes! We build GST billing, inventory management, POS & any custom software. Contact us for pricing." },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "border-indigo-200 bg-indigo-50/30 shadow-lg shadow-indigo-100/30" : "border-slate-100 bg-white hover:border-slate-200"}`}>
      <button onClick={onToggle} className="flex items-center justify-between w-full p-5 text-left">
        <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? "text-indigo-700" : "text-slate-700"}`}>
          {faq.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="px-5 pb-5">
              <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const monthlyFeatures = [
    "Free .com / .in Domain",
    "High-Speed Cloud Hosting",
    "100% Responsive Design",
    "WhatsApp Chat Integration",
    "Google Maps & Social Links",
    "2 Free Monthly Updates",
    "SSL Certificate (HTTPS)",
    "Basic SEO Setup",
    "24/7 Website Monitoring",
  ];

  const yearlyFeatures = [
    "Everything in Monthly Plan",
    "Save ₹1,589 vs Monthly",
    "Priority Support",
    "3 Free Monthly Updates",
    "Annual Performance Report",
  ];

  return (
    <Section className="bg-white relative overflow-hidden" id="pricing">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-100/30 via-purple-100/30 to-pink-100/30 rounded-full blur-[100px]" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Crown} text="Simple Pricing" />
          <SectionTitle subtitle="Transparent pricing with zero hidden charges.">
            One Price,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Everything Included
            </span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Monthly */}
          <motion.div variants={scaleIn} custom={0} whileHover={{ y: -6 }} className="relative p-8 rounded-3xl bg-white border-2 border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="mb-6">
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Monthly Plan</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-5xl font-black text-slate-900">₹799</span>
                <span className="text-slate-400 font-medium">/month</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">Minimum 1-year commitment</p>
            </div>
            <ul className="space-y-3 mb-8">
              {monthlyFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 text-sm">
              <MessageCircle className="w-4 h-4" />
              Get Started on WhatsApp
            </a>
          </motion.div>

          {/* Yearly */}
          <motion.div variants={scaleIn} custom={1} whileHover={{ y: -6 }} className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl shadow-indigo-500/25 overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                BEST VALUE
              </span>
            </div>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }} />
            <div className="relative z-10">
              <div className="mb-6">
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Yearly Plan</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-black text-white">₹7,999</span>
                  <span className="text-white/60 font-medium">/year</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-white/60 line-through">₹9,588</span>
                  <span className="px-2 py-0.5 bg-green-400/20 text-green-200 text-xs font-bold rounded-full">SAVE ₹1,589</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {yearlyFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-0.5 text-sm">
                <MessageCircle className="w-4 h-4" />
                Get Started — Save ₹1,589!
              </a>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-slate-400 text-sm mt-2">Got questions? We&apos;ve got answers.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} isOpen={openFAQ === index} onToggle={() => setOpenFAQ(openFAQ === index ? null : index)} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. HOW IT WORKS
   ═══════════════════════════════════════════════════════════ */

const steps = [
  { step: "01", title: "Contact Us", description: "Reach out via WhatsApp or call. Tell us about your business.", icon: Phone, gradient: "from-blue-500 to-indigo-600" },
  { step: "02", title: "Share Content", description: "Send logo, photos, text content & business details.", icon: HeartHandshake, gradient: "from-purple-500 to-pink-600" },
  { step: "03", title: "We Build It", description: "Our team designs & develops your solution with premium quality.", icon: Rocket, gradient: "from-pink-500 to-rose-600" },
  { step: "04", title: "Go Live! 🚀", description: "Your website/software goes live in 3-5 days!", icon: BadgeCheck, gradient: "from-green-500 to-emerald-600" },
];

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden" id="process">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge icon={Rocket} text="How It Works" />
          <SectionTitle subtitle="From first message to live website — in just 4 simple steps.">
            Simple Process,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Amazing Results
            </span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              custom={index}
              whileHover={{ y: -8 }}
              className="group relative text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <span className={`inline-block text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.gradient} mb-2`}>
                STEP {step.step}
              </span>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-slate-200" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. TRUST SECTION
   ═══════════════════════════════════════════════════════════ */

const trustPoints = [
  { icon: Shield, title: "100% Ownership", description: "Domain & content ownership stays with you." },
  { icon: Clock, title: "3-5 Days Delivery", description: "Fast turnaround from content to live website." },
  { icon: HeartHandshake, title: "No Lock-in After Year 1", description: "Cancel anytime after commitment period." },
  { icon: BadgeCheck, title: "Zero Hidden Fees", description: "What you see is what you pay. Period." },
];

function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionBadge icon={Shield} text="Trust & Transparency" />
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Your Trust is Our Priority</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, index) => (
              <motion.div key={point.title} variants={fadeUp} custom={index} className="text-center p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{point.title}</h4>
                <p className="text-slate-400 text-xs">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. FINAL CTA
   ═══════════════════════════════════════════════════════════ */

function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section className="bg-white pb-28">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-[2rem] p-12 md:p-20 text-center"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" animate={{ x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/15 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/20 mb-8">
            <Rocket className="w-4 h-4" />
            Ready to Go Online?
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Let&apos;s Launch Your
            <br />
            Business Online 🚀
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
            Stop losing customers to competitors. Get a professional website at just{" "}
            <strong className="text-white">₹799/month</strong> or custom software for your business!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 text-lg">
              <MessageCircle className="w-5 h-5" />
              Let&apos;s Launch Your Business Online
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {["Free Consultation", "No Hidden Fees", "Live in 3-5 Days"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-white/70 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function WaaSPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <SoftwareServicesSection />
      <FeaturesSection />
      <ProcessSection />
      <TemplatesSection />
      <PricingSection />
      <TrustSection />
      <FinalCTA />
    </main>
  );
}