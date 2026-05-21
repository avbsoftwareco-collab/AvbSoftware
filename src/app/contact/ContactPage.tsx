"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// ✅ Sirf yeh icons lucide se lo — sab available hain
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

// ============ ZOD SCHEMA ============

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

// ============ CUSTOM SVG ICONS ============

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-white">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ============ DATA ============

const services = [
  "Web Development",
  "Mobile App Development",
  "Custom Software",
  "UI/UX Design",
  "E-Commerce",
  "SEO & Digital Marketing",
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
  {
    Icon: LinkedInIcon,
    href: "https://linkedin.com/company/avbsoftware",
    label: "LinkedIn",
  },
  {
    Icon: InstagramIcon,
    href: "https://instagram.com/avbsoftware",
    label: "Instagram",
  },
  {
    Icon: XIcon,
    href: "https://x.com/avbsoftware",
    label: "X (Twitter)",
  },
];

// contactInfo — lucide icons jo available hain woh use karo
const contactInfo = [
  {
    IconComponent: Mail,
    isCustom: false,
    label: "Email",
    value: "contact@avbsoftware.com",
    href: "mailto:contact@avbsoftware.com",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    IconComponent: Phone,
    isCustom: false,
    label: "Phone",
    value: "+91 XXXX XXX XXX",
    href: "tel:+91XXXXXXXXXX",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    IconComponent: MessageCircle,
    isCustom: false,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/91XXXXXXXXXX?text=Hi%20AVB%20Software!",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    IconComponent: MapPin,
    isCustom: false,
    label: "Location",
    value: "Bhopal, Madhya Pradesh, India",
    href: "https://maps.google.com/?q=Bhopal+Madhya+Pradesh",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    IconComponent: ClockIcon,
    isCustom: true,
    label: "Working Hours",
    value: "Mon–Sat, 9am–7pm IST",
    href: null,
    color: "text-purple-500",
    bg: "bg-purple-50",
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
       console.error("Error occurred:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface border-b border-slate-100">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
              Let&apos;s Build Something Amazing
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Tell us about your project. We&apos;ll get back to you within 24
              hours with a detailed response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-navy mb-2">
                  Get In Touch
                </h2>
                <p className="text-muted text-sm">
                  We&apos;re always happy to chat about your project. Reach out
                  via any channel below.
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
                        className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                      >
                        <div className={`w-10 h-10 ${info.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <span className={info.color}>
                            <IconComp />
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted font-medium">{info.label}</p>
                          <p className="text-navy font-semibold text-sm group-hover:text-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  }

                  return (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-slate-100"
                    >
                      <div className={`w-10 h-10 ${info.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <span className={info.color}>
                          <IconComp />
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-muted font-medium">{info.label}</p>
                        <p className="text-navy font-semibold text-sm">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm font-medium text-muted mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-slate-100 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all text-slate-600"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117838.78699879567!2d77.3294813!3d23.2584857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AVB Software Location - Bhopal"
                />
              </div>
            </motion.div>

            {/* Right: Contact Form */}
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
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-green-50 rounded-3xl border border-green-100"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircleIcon />
                  </div>
                  <h2 className="text-2xl font-extrabold text-navy mb-3">
                    Message Sent! 🎉
                  </h2>
                  <p className="text-slate-600 max-w-sm">
                    Thank you for reaching out! We&apos;ll get back to you
                    within <strong>24 hours</strong> with a detailed response.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-5"
                >
                  <h2 className="text-2xl font-extrabold text-navy mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-muted mb-6">
                    Fill in the details below and we&apos;ll prepare a custom
                    proposal for you.
                  </p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Rahul Sharma"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-slate-200 focus:border-primary bg-white"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="rahul@company.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.email
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-slate-200 focus:border-primary bg-white"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 9876 543 210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary text-sm outline-none transition-colors"
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Service Required *
                      </label>
                      <select
                        {...register("service")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white ${
                          errors.service
                            ? "border-red-300"
                            : "border-slate-200 focus:border-primary"
                        }`}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.service.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5">
                        Project Budget *
                      </label>
                      <select
                        {...register("budget")}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white ${
                          errors.budget
                            ? "border-red-300"
                            : "border-slate-200 focus:border-primary"
                        }`}
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.budget.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Briefly describe your project, goals, and any specific requirements..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-slate-200 focus:border-primary bg-white"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
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

                  <p className="text-center text-xs text-muted">
                    🔒 Your information is safe with us. We&apos;ll never share
                    it with anyone.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}