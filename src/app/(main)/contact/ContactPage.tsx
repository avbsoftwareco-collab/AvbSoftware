"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

// ============ SCHEMA ============
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

// ============ ICONS ============
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-white" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// ============ DATA ============
const services = [
  "Web Development",
  "Mobile App Development",
  "Custom Software Development",
  "E-Commerce Website",
  "UI/UX Design",
  "SEO & Digital Marketing",
  "ERP Software Development",
  "IT Consulting",
  "Other",
];

const budgets = [
  "Under ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000 – ₹2,00,000",
  "₹2,00,000+",
  "Not sure yet",
];

const socialLinks = [
  { Icon: LinkedInIcon, href: "https://linkedin.com/company/avbsoftware", label: "LinkedIn" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/avb_software_com", label: "Instagram" },
  { Icon: XIcon, href: "https://x.com/avbsoftware", label: "X Twitter" },
  { Icon: FacebookIcon, href: "https://facebook.com/avbsoftware", label: "Facebook" },
];

const contactInfo = [
  {
    IconComponent: Mail,
    isCustom: false,
    label: "Email",
    value: "avbsoftware.co@gmail.com",
    href: "mailto:avbsoftware.co@gmail.com",
  },
  {
    IconComponent: Phone,
    isCustom: false,
    label: "Phone",
    value: "+91 8821962424",
    href: "tel:+918821962424",
  },
  {
    IconComponent: MessageCircle,
    isCustom: false,
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: "https://wa.me/918103558368?text=Hi%20AVB%20Software!%20I%20want%20to%20discuss%20a%20project.",
  },
  {
    IconComponent: MapPin,
    isCustom: false,
    label: "Service Areas",
    value: "Indore, Bhopal & All India",
    href: "https://maps.google.com/?q=Bhopal+Madhya+Pradesh",
  },
  {
    IconComponent: ClockIcon,
    isCustom: true,
    label: "Working Hours",
    value: "Mon–Sat, 9am–8pm IST",
    href: null,
  },
];

// ============ MAIN COMPONENT ============
export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch (err) {
      setError("Failed to send message. Please email us directly.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section 
        className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="contact-hero-heading"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-6">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              CONTACT US
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>

            <h1 
              id="contact-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let&apos;s Create Something
              <br />
              <span className="italic gradient-text">Extraordinary Together</span>
            </h1>
            <p className="text-lg text-[#6B5D4A] max-w-2xl mx-auto">
              Get a <strong className="text-[#2B2419]">free consultation</strong> for web development, mobile apps, or custom software. 
              Our team in <strong className="text-[#2B2419]">Indore & Bhopal</strong> responds within <strong className="text-[#2B2419]">24 hours</strong>.
            </p>

            {/* Quick Contact Options */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <a
                href="tel:+918821962424"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl text-sm font-semibold text-[#2B2419] hover:border-[#8B6F47] hover:shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#8B6F47]" />
                Call Us Now
              </a>
              <a
                href="https://wa.me/918821962424?text=Hi%20AVB%20Software!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#8B6F47] to-[#6B5535] text-white rounded-2xl text-sm font-semibold hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href="mailto:avbsoftware.co@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF5EA] border border-[#D4C29E] rounded-2xl text-sm font-semibold text-[#2B2419] hover:border-[#8B6F47] hover:shadow-md transition-all"
              >
                <Mail className="w-4 h-4 text-[#8B6F47]" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT CONTENT ===== */}
      <section className="section-padding bg-[#FAF5EA]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* LEFT: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 
                  className="text-3xl font-bold text-[#2B2419] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Get In <span className="italic gradient-text">Touch</span>
                </h2>
                <p className="text-[#6B5D4A] text-sm leading-relaxed">
                  We&apos;re always happy to chat about your project in <strong className="text-[#2B2419]">Indore, Bhopal, or anywhere in India</strong>. 
                  Reach out via any channel below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3">
                {contactInfo.map((info) => {
                  const IconComp = info.IconComponent;
                  const isLink = info.href !== null;

                  if (isLink && info.href) {
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-[#8B6F47]">
                            <IconComp />
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-[#8B6F47] font-semibold uppercase tracking-wider">{info.label}</p>
                          <p className="text-[#2B2419] font-bold text-sm mt-0.5 group-hover:text-[#8B6F47] transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  }

                  return (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E8DEC8]"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E8DCC4] to-[#D4C29E] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-[#8B6F47]">
                          <IconComp />
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-[#8B6F47] font-semibold uppercase tracking-wider">{info.label}</p>
                        <p className="text-[#2B2419] font-bold text-sm mt-0.5">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Service Areas Card */}
              <div className="p-6 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl text-white">
                <h3 
                  className="font-bold text-lg mb-3 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  📍 We Serve Across India
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Indore", "Bhopal", "Ujjain", "Dewas", "Jabalpur", "Gwalior", "Sagar", "Ratlam"].map((city) => (
                    <span
                      key={city}
                      className="text-xs bg-[#C9A45C]/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white border border-[#C9A45C]/40 font-medium"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#E8DCC4] mt-3">
                  ✨ And all across India — we work remotely!
                </p>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-semibold text-[#8B6F47] mb-3 uppercase tracking-wider">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 bg-white hover:bg-gradient-to-br hover:from-[#8B6F47] hover:to-[#6B5535] hover:text-white border border-[#E8DEC8] rounded-xl flex items-center justify-center transition-all text-[#6B5D4A] hover:border-transparent hover:-translate-y-1"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-[#E8DEC8] h-48 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117838.78699879567!2d77.3294813!3d23.2584857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AVB Software Location"
                />
              </div>
            </motion.div>

            {/* RIGHT: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-3xl"
                >
                  <div className="w-20 h-20 bg-[#C9A45C] rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <CheckCircleIcon />
                  </div>
                  <h2 
                    className="text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message Sent! ✨
                  </h2>
                  <p className="text-[#E8DCC4] max-w-sm">
                    Thank you for reaching out to <strong className="text-white">AVB Software</strong>! 
                    Our team will get back to you within <strong className="text-white">24 hours</strong>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-8 py-3 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-xl hover:bg-white transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white border border-[#E8DEC8] rounded-3xl p-8 shadow-lg space-y-5"
                >
                  <div>
                    <h2 
                      className="text-3xl font-bold text-[#2B2419] mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Send Us a <span className="italic gradient-text">Message</span>
                    </h2>
                    <p className="text-sm text-[#6B5D4A]">
                      Fill in the details below and our team will prepare a custom proposal for your project.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#2B2419] mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        {...register("name")}
                        placeholder="Your Name"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA] text-[#2B2419]"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#2B2419] mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA] text-[#2B2419]"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#2B2419] mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 8821962424"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA] text-[#2B2419] text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-[#2B2419] mb-2">
                        Service Required *
                      </label>
                      <select
                        id="service"
                        {...register("service")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors text-[#2B2419] ${
                          errors.service
                            ? "border-red-300 bg-red-50"
                            : "border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA]"
                        }`}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-[#2B2419] mb-2">
                        Project Budget *
                      </label>
                      <select
                        id="budget"
                        {...register("budget")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors text-[#2B2419] ${
                          errors.budget
                            ? "border-red-300 bg-red-50"
                            : "border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA]"
                        }`}
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#2B2419] mb-2">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={5}
                      placeholder="Briefly describe your project, goals, and any specific requirements..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-[#E8DEC8] focus:border-[#8B6F47] bg-[#FAF5EA] text-[#2B2419]"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#8B7E6A]">
                    🔒 Your information is safe with us. We&apos;ll never share it.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="section-padding bg-[#F5F0E6]">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              FREQUENTLY ASKED
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Common <span className="italic gradient-text">Questions</span>
            </h2>
            <p className="text-[#6B5D4A]">
              Quick answers from our Indore & Bhopal clients
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does it take to get a response?",
                a: "We respond to all inquiries within 24 hours (usually faster). Our team works 6 days a week (Mon-Sat, 9am-8pm IST).",
              },
              {
                q: "Do you provide services outside Indore and Bhopal?",
                a: "Yes! While we're based in Indore & Bhopal, we serve clients across India and worldwide. Our remote-first model allows us to work with businesses anywhere.",
              },
              {
                q: "How much does a typical project cost?",
                a: "Project costs vary based on complexity. Websites start from ₹8,000, mobile apps from ₹25,000, and custom software from ₹25,000. We provide free quotes.",
              },
              {
                q: "Do you offer free consultation?",
                a: "Absolutely! We provide free 30-minute consultations to understand your project needs and suggest the best technology solution. No commitment required.",
              },
              {
                q: "What's the best way to contact for urgent projects?",
                a: "For urgent projects, WhatsApp us at +91-8821962424 for instant response. You can also call us directly during business hours.",
              },
              {
                q: "Do you sign NDAs to protect my project?",
                a: "Yes, we sign Non-Disclosure Agreements (NDAs) with all clients. Your project idea and business information are 100% confidential and secure.",
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl border border-[#E8DEC8] p-6 hover:border-[#D4C29E] hover:shadow-md transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 
                    className="font-bold text-[#2B2419] text-base pr-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {faq.q}
                  </h3>
                  <span className="text-[#8B6F47] text-2xl group-open:rotate-45 transition-transform font-light">+</span>
                </summary>
                <p className="text-[#6B5D4A] text-sm mt-4 leading-relaxed">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}