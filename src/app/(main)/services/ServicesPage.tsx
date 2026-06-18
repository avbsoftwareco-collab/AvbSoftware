"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Code2,
  Palette,
  Search,
  Headphones,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development in Indore & Bhopal",
    shortTitle: "Web Development",
    description:
      "We build fast, modern, and SEO-optimized websites and web applications for businesses in Indore, Bhopal, and across India. From landing pages to complex web platforms, we use cutting-edge technologies like React, Next.js, and WordPress to deliver exceptional user experiences. Our web solutions are built to be scalable, maintainable, and conversion-focused — ensuring your online presence works as hard as you do for your Madhya Pradesh business.",
    features: [
      "Custom website design & development",
      "React & Next.js web applications",
      "WordPress development & customization",
      "Landing pages with high conversion rates",
      "Progressive Web Apps (PWA)",
      "Website maintenance & updates",
      "Local SEO optimization for Indore/Bhopal",
    ],
    technologies: ["React", "Next.js", "WordPress", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    pricing: "Starting from ₹8,000",
    deliveryTime: "7-15 days",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    description:
      "We create powerful cross-platform mobile applications for iOS and Android that businesses in Indore, Bhopal, and Madhya Pradesh love. Using React Native and Flutter, we deliver native-quality performance with a single codebase, reducing your development costs by 50% without compromising quality. Our mobile apps are designed with user experience at the forefront, ensuring high engagement and retention rates for your customers across MP.",
    features: [
      "iOS & Android app development",
      "Cross-platform apps (React Native/Flutter)",
      "Native app UI/UX design",
      "App Store & Play Store submission",
      "Push notifications & analytics",
      "App maintenance & updates",
      "Backend API integration",
    ],
    technologies: ["React Native", "Flutter", "Firebase", "Redux", "REST APIs", "App Store", "Play Store"],
    pricing: "Starting from ₹25,000",
    deliveryTime: "30-60 days",
  },
  {
    id: "custom",
    icon: Code2,
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    description:
      "Off-the-shelf software rarely fits your unique business needs perfectly. We build custom software solutions from scratch for businesses in Indore, Bhopal, and across Madhya Pradesh — tailored exactly to your requirements. Whether it's an internal tool, a business management system, ERP for manufacturing, or a complex enterprise application, we architect solutions that solve your specific challenges and scale with your business growth.",
    features: [
      "Business process automation",
      "Custom ERP & CRM systems",
      "Inventory management for Indore textile businesses",
      "Hospital management for Bhopal healthcare",
      "Custom admin dashboards",
      "API development & integration",
      "Database design & optimization",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST API", "GraphQL", "Docker"],
    pricing: "Starting from ₹25,000",
    deliveryTime: "30-90 days",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design Services",
    shortTitle: "UI/UX Design",
    description:
      "Great software starts with great design. Our UI/UX design process puts your users at the center, creating intuitive and visually stunning interfaces for businesses in Indore, Bhopal & across India. We follow a research-driven design process — from wireframes to high-fidelity prototypes — ensuring every design decision is backed by user insights and business goals. Modern, conversion-focused designs that elevate your brand.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "High-fidelity UI designs",
      "Design system creation",
      "Usability testing",
      "Handoff to developers",
      "Brand identity design",
    ],
    technologies: ["Figma", "Adobe XD", "Protopie", "Zeroheight", "Storybook", "Maze"],
    pricing: "Starting from ₹15,000",
    deliveryTime: "10-30 days",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Website Development",
    shortTitle: "E-Commerce",
    description:
      "Launch or upgrade your online store with our e-commerce development expertise. We build high-converting online stores for Indore & Bhopal businesses on Shopify, WooCommerce, or custom platforms that are optimized for sales. From product catalog to payment integration (Razorpay, PayU) and order management, we handle every aspect of your e-commerce needs — perfect for Indore textile dealers, Bhopal retailers, and MP businesses.",
    features: [
      "Shopify store setup & customization",
      "WooCommerce development",
      "Payment gateway integration (Razorpay, PayU)",
      "Product catalog management",
      "Order & inventory management",
      "Mobile-optimized checkout",
      "GST-compliant invoicing",
    ],
    technologies: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "PayPal", "WordPress"],
    pricing: "Starting from ₹20,000",
    deliveryTime: "15-45 days",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Digital Marketing Services",
    shortTitle: "SEO Services",
    description:
      "Being online is not enough — you need to be found on Google. Our SEO and digital marketing services help your Indore & Bhopal business rank higher and reach your target audience effectively across Madhya Pradesh. We combine technical SEO, content strategy, and local SEO to drive organic traffic and generate quality leads. Local SEO experts for businesses in Indore, Bhopal, Ujjain, and across MP.",
    features: [
      "Technical SEO audit & fixes",
      "Local SEO for Indore & Bhopal businesses",
      "Google My Business optimization",
      "Keyword research & strategy",
      "Content marketing",
      "Google Ads management",
      "Monthly performance reporting",
    ],
    technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs", "Google Ads", "Meta Ads"],
    pricing: "Starting from ₹10,000/month",
    deliveryTime: "Ongoing (3-6 months for results)",
  },
  {
    id: "consulting",
    icon: Headphones,
    title: "IT Consulting & Support",
    shortTitle: "IT Consulting",
    description:
      "Making the right technology decisions is crucial for your business in Indore, Bhopal, and across India. Our IT consulting service provides expert guidance on technology choices, architecture decisions, and digital transformation strategies. Whether you're a startup in Indore choosing your tech stack or a Bhopal enterprise planning a digital transformation, we provide the expertise you need to make informed decisions.",
    features: [
      "Technology stack consulting",
      "Project architecture review",
      "Digital transformation roadmap",
      "Team augmentation",
      "Code review & audit",
      "24/7 technical support",
      "Cloud migration consulting",
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Linux", "DevOps", "CI/CD", "Agile"],
    pricing: "Starting from ₹5,000/hour",
    deliveryTime: "Flexible",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section 
        className="pt-32 pb-16 bg-[#F5F0E6] border-b border-[#D4C29E]/30 relative overflow-hidden"
        aria-labelledby="services-hero-heading"
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-6">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              WHAT WE DO
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>

            <h1 
              id="services-hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2419] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Complete Tech Solutions for
              <br />
              <span className="italic gradient-text">Ambitious Businesses</span>
            </h1>
            <p className="text-lg text-[#6B5D4A] max-w-2xl mx-auto">
              <strong className="text-[#2B2419]">Web development, mobile apps, custom software, SEO & more</strong> for 
              businesses in <strong className="text-[#2B2419]">Indore, Bhopal, and across Madhya Pradesh</strong>. 
              From idea to launch and beyond — affordable pricing, on-time delivery.
            </p>

            {/* Quick Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm">
              {[
                { color: "bg-[#8B6F47]", label: "100% On-Time Delivery" },
                { color: "bg-[#C9A45C]", label: "Affordable Pricing" },
                { color: "bg-[#A0825C]", label: "Local Indore/Bhopal Support" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${item.color} rounded-full animate-pulse`} aria-hidden="true"></span>
                  <span className="text-[#6B5D4A] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STICKY SERVICE NAVIGATION ===== */}
      <section className="py-4 bg-[#FAF5EA]/95 backdrop-blur-md border-b border-[#D4C29E]/30 sticky top-20 z-20">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="text-xs md:text-sm font-semibold text-[#6B5D4A] hover:text-white hover:bg-gradient-to-r hover:from-[#8B6F47] hover:to-[#6B5535] px-4 py-2 rounded-full transition-all border border-transparent hover:border-[#8B6F47]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {service.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES LIST ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-label="Detailed services list"
      >
        <div className="container-custom space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-[#E8DEC8] p-8 md:p-12 bg-white shadow-md hover:shadow-2xl hover:shadow-[#8B6F47]/15 hover:border-[#D4C29E] transition-all duration-500 scroll-mt-44 relative overflow-hidden group"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Decorative corner accent */}
                <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-40 h-40 bg-gradient-to-br from-[#E8DCC4]/40 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative z-10">
                  {/* LEFT CONTENT */}
                  <div>
                    {/* Service Number */}
                    <div className="flex items-center gap-3 mb-4">
                      <span 
                        className="text-xs font-bold text-[#8B6F47] uppercase tracking-[2px]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Service {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="w-12 h-px bg-[#8B6F47]"></span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#8B6F47]/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h2 
                      className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4 leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      itemProp="name"
                    >
                      {service.title}
                    </h2>
                    <p 
                      className="text-[#6B5D4A] leading-relaxed mb-6"
                      itemProp="description"
                    >
                      {service.description}
                    </p>

                    {/* Pricing & Delivery Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-[#FAF5EA] to-[#F0E8D4] rounded-2xl border border-[#E8DEC8]">
                        <p 
                          className="text-xs text-[#8B6F47] mb-1 font-bold uppercase tracking-wider"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          💰 Pricing
                        </p>
                        <p 
                          className="font-bold text-[#2B2419] text-sm" 
                          itemProp="offers"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {service.pricing}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-[#FAF5EA] to-[#F0E8D4] rounded-2xl border border-[#E8DEC8]">
                        <p 
                          className="text-xs text-[#8B6F47] mb-1 font-bold uppercase tracking-wider"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          ⏱️ Timeline
                        </p>
                        <p 
                          className="font-bold text-[#2B2419] text-sm"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {service.deliveryTime}
                        </p>
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div className="mb-6">
                      <p 
                        className="text-xs text-[#8B6F47] mb-3 font-bold uppercase tracking-wider"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Technologies We Use
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-[#FAF5EA] text-[#6B5D4A] text-xs font-semibold rounded-full border border-[#E8DEC8] hover:border-[#8B6F47] hover:text-[#8B6F47] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/contact?service=${service.id}`}
                      className="btn-primary"
                    >
                      Request a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* RIGHT FEATURES */}
                  <div className="bg-gradient-to-br from-[#F5F0E6] to-[#EFE8D8] rounded-2xl p-7 border border-[#E8DEC8]">
                    <h3 
                      className="font-bold text-[#2B2419] mb-5 text-xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      What&apos;s <span className="italic gradient-text">Included</span>
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 group/item">
                          <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                            <CheckCircle className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                          </span>
                          <span className="text-[#2B2419] text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Why Choose AVB */}
                    <div className="mt-6 pt-6 border-t border-[#D4C29E]/40">
                      <p 
                        className="text-xs font-bold text-[#8B6F47] mb-3 uppercase tracking-wider flex items-center gap-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        ✨ Why Choose AVB Software?
                      </p>
                      <ul className="space-y-2 text-xs text-[#6B5D4A]">
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#8B6F47] rounded-full"></span>
                          Local Indore & Bhopal team
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#8B6F47] rounded-full"></span>
                          3-month free post-launch support
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#8B6F47] rounded-full"></span>
                          Transparent pricing, no hidden costs
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section 
        className="section-padding bg-[#F5F0E6] relative overflow-hidden"
        aria-labelledby="process-heading"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E8DCC4]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A45C]/15 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              OUR PROCESS
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="process-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How We Deliver <span className="italic gradient-text">Excellence</span>
            </h2>
            <p className="text-[#6B5D4A]">
              Our proven 5-step process ensures every project is delivered on time and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { step: "01", icon: "💬", title: "Discovery", desc: "Understanding your business needs" },
              { step: "02", icon: "📋", title: "Planning", desc: "Detailed proposal & timeline" },
              { step: "03", icon: "🎨", title: "Design", desc: "UI/UX mockups for approval" },
              { step: "04", icon: "⚡", title: "Development", desc: "Building with weekly updates" },
              { step: "05", icon: "🚀", title: "Launch & Support", desc: "Deployment + 3-month support" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center p-6 bg-white rounded-3xl border border-[#E8DEC8] hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div 
                    className="px-4 py-1.5 bg-gradient-to-br from-[#8B6F47] to-[#6B5535] rounded-full text-white text-xs font-bold shadow-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.step}
                  </div>
                </div>

                <div className="text-4xl mb-3 mt-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 
                  className="font-bold text-[#2B2419] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B5D4A] leading-relaxed">{item.desc}</p>

                {/* Connecting dots */}
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-[#D4C29E]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section 
        className="section-padding bg-[#FAF5EA]"
        aria-labelledby="industries-heading"
      >
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#8B6F47] mb-4">
              <span className="w-8 h-px bg-[#8B6F47]"></span>
              INDUSTRIES
              <span className="w-8 h-px bg-[#8B6F47]"></span>
            </div>
            <h2 
              id="industries-heading"
              className="text-3xl md:text-4xl font-bold text-[#2B2419] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Industries We <span className="italic gradient-text">Serve</span>
            </h2>
            <p className="text-[#6B5D4A]">
              We&apos;ve built solutions for businesses across diverse industries in Indore, Bhopal & beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: "🏥", name: "Healthcare", city: "Bhopal" },
              { icon: "🛍️", name: "Retail & E-commerce", city: "Indore" },
              { icon: "🏭", name: "Manufacturing", city: "Indore" },
              { icon: "🧵", name: "Textile", city: "Indore" },
              { icon: "🎓", name: "Education", city: "Bhopal" },
              { icon: "🏘️", name: "Real Estate", city: "Indore & Bhopal" },
              { icon: "🍽️", name: "Restaurants", city: "Indore & Bhopal" },
              { icon: "⚖️", name: "Legal Services", city: "Bhopal" },
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white rounded-2xl border border-[#E8DEC8] text-center hover:border-[#D4C29E] hover:shadow-lg hover:shadow-[#8B6F47]/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{industry.icon}</div>
                <h3 
                  className="font-bold text-[#2B2419] text-sm mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {industry.name}
                </h3>
                <p className="text-xs text-[#8B6F47] font-semibold">📍 {industry.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section 
        className="section-padding bg-[#F5F0E6]"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-[#8B6F47] via-[#6B5535] to-[#2B2419]">
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #C9A45C 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A45C]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8DCC4]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-[#C9A45C] mb-6">
                <span className="w-8 h-px bg-[#C9A45C]"></span>
                READY TO START?
                <span className="w-8 h-px bg-[#C9A45C]"></span>
              </div>

              <h2 
                id="cta-heading"
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Not Sure Which <span className="italic" style={{ color: '#C9A45C' }}>Service?</span>
              </h2>

              <p className="text-[#E8DCC4] text-lg mb-10 max-w-xl mx-auto">
                Contact us for a <strong className="text-white">free consultation</strong>. Our team in <strong className="text-white">Indore & Bhopal</strong> will 
                help you figure out the best solution for your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAF5EA] text-[#8B6F47] font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918103558368?text=Hi%20AVB%20Software!%20I%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A45C] hover:bg-[#A88848] text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-xl"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}