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
    title: "Web Development",
    description:
      "We build fast, modern, and SEO-optimized websites and web applications that help your business stand out online. From landing pages to complex web platforms, we use cutting-edge technologies to deliver exceptional user experiences. Our web solutions are built to be scalable, maintainable, and conversion-focused, ensuring your online presence works as hard as you do.",
    features: [
      "Custom website design & development",
      "React & Next.js web applications",
      "WordPress development & customization",
      "Landing pages with high conversion rates",
      "Progressive Web Apps (PWA)",
      "Website maintenance & updates",
    ],
    technologies: ["React", "Next.js", "WordPress", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    color: "bg-blue-50 text-blue-600",
    accent: "border-blue-200",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "We create powerful cross-platform mobile applications for iOS and Android that your users will love. Using React Native and Flutter, we deliver native-quality performance with a single codebase, reducing your development costs without compromising quality. Our mobile apps are designed with user experience at the forefront, ensuring high engagement and retention rates.",
    features: [
      "iOS & Android app development",
      "Cross-platform apps (React Native/Flutter)",
      "App UI/UX design",
      "App Store & Play Store submission",
      "Push notifications & analytics",
      "App maintenance & updates",
    ],
    technologies: ["React Native", "Flutter", "Firebase", "Redux", "REST APIs", "App Store", "Play Store"],
    color: "bg-purple-50 text-purple-600",
    accent: "border-purple-200",
  },
  {
    id: "custom",
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Off-the-shelf software rarely fits your unique business needs perfectly. We build custom software solutions from scratch, tailored exactly to your requirements. Whether it's an internal tool, a business management system, or a complex enterprise application, we architect solutions that solve your specific challenges and scale with your business growth.",
    features: [
      "Business process automation",
      "ERP & CRM systems",
      "Inventory management systems",
      "Custom admin dashboards",
      "API development & integration",
      "Database design & optimization",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST API", "GraphQL", "Docker"],
    color: "bg-indigo-50 text-indigo-600",
    accent: "border-indigo-200",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Great software starts with great design. Our UI/UX design process puts your users at the center, creating intuitive and visually stunning interfaces that are a pleasure to use. We follow a research-driven design process — from wireframes to high-fidelity prototypes — ensuring every design decision is backed by user insights and business goals.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "High-fidelity UI designs",
      "Design system creation",
      "Usability testing",
      "Handoff to developers",
    ],
    technologies: ["Figma", "Adobe XD", "Protopie", "Zeroheight", "Storybook", "Maze"],
    color: "bg-pink-50 text-pink-600",
    accent: "border-pink-200",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Launch or upgrade your online store with our e-commerce development expertise. We build high-converting online stores on Shopify, WooCommerce, or custom platforms that are optimized for sales. From product catalog to payment integration and order management, we handle every aspect of your e-commerce needs.",
    features: [
      "Shopify store setup & customization",
      "WooCommerce development",
      "Payment gateway integration",
      "Product catalog management",
      "Order & inventory management",
      "Mobile-optimized checkout",
    ],
    technologies: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "PayPal", "WordPress"],
    color: "bg-green-50 text-green-600",
    accent: "border-green-200",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO & Digital Marketing",
    description:
      "Being online is not enough — you need to be found. Our SEO and digital marketing services help your business rank higher on Google and reach your target audience effectively. We combine technical SEO, content strategy, and local SEO to drive organic traffic and generate quality leads for your business.",
    features: [
      "Technical SEO audit & fixes",
      "Local SEO for Bhopal businesses",
      "Keyword research & strategy",
      "Content marketing",
      "Google Ads management",
      "Monthly reporting",
    ],
    technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs", "Google Ads", "Meta Ads"],
    color: "bg-yellow-50 text-yellow-600",
    accent: "border-yellow-200",
  },
  {
    id: "consulting",
    icon: Headphones,
    title: "IT Consulting & Support",
    description:
      "Making the right technology decisions is crucial for your business. Our IT consulting service provides expert guidance on technology choices, architecture decisions, and digital transformation strategies. Whether you're a startup choosing your tech stack or an enterprise planning a digital transformation, we provide the expertise you need.",
    features: [
      "Technology stack consulting",
      "Project architecture review",
      "Digital transformation roadmap",
      "Team augmentation",
      "Code review & audit",
      "24/7 technical support",
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Linux", "DevOps", "CI/CD", "Agile"],
    color: "bg-orange-50 text-orange-600",
    accent: "border-orange-200",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface border-b border-slate-100">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge">What We Do</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
              Our IT Services
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Complete technology solutions for businesses of all sizes. From
              idea to launch and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl border-2 ${service.accent} p-8 md:p-12 bg-white shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  {/* Left content */}
                  <div>
                    <div
                      className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-navy mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/contact?service=${service.id}`}
                      className="btn-primary"
                    >
                      Request a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right: Features */}
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="font-jakarta font-bold text-navy mb-5 text-lg">
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-extrabold text-navy mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-muted mb-8">
            Contact us for a free consultation. We&apos;ll help you figure out
            the best solution for your business.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}