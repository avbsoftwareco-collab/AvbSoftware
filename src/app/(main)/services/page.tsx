import type { Metadata } from "next";
import Script from "next/script";
import ServicesPage from "./ServicesPage";

// ✅ Complete SEO Metadata
export const metadata: Metadata = {
  title: "IT Services in Indore & Bhopal — Web, App, Software Development | AVB Software",
  description:
    "Complete IT services in Indore & Bhopal — web development, mobile apps, custom software, ERP, e-commerce, UI/UX design & SEO. Affordable pricing, on-time delivery. Get free quote!",
  keywords: [
    "it services indore",
    "it services bhopal",
    "web development services indore",
    "web development services bhopal",
    "mobile app development indore",
    "mobile app development bhopal",
    "custom software development indore",
    "custom software development bhopal",
    "ecommerce website development indore",
    "ecommerce website development bhopal",
    "seo services indore",
    "seo services bhopal",
    "ui ux design indore bhopal",
    "it consulting madhya pradesh",
    "software services indore bhopal",
    "react native developer indore",
    "next.js developer bhopal",
    "wordpress developer indore",
    "shopify developer bhopal",
    "ERP development indore",
    "AVB Software services",
  ],
  authors: [{ name: "AVB Software" }],

  openGraph: {
    title: "IT Services in Indore & Bhopal — Complete Tech Solutions | AVB Software",
    description:
      "Web Development, Mobile Apps, Custom Software, SEO & more for Indore & Bhopal businesses. Affordable pricing. Get free consultation!",
    url: "https://avbsoftware.com/services",
    siteName: "AVB Software",
    images: [
      {
        url: "https://avbsoftware.com/og-services.png",
        width: 1200,
        height: 630,
        alt: "IT Services in Indore & Bhopal - AVB Software",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "IT Services in Indore & Bhopal | AVB Software",
    description:
      "Complete IT solutions - Web, Mobile Apps, Custom Software & SEO for Madhya Pradesh businesses.",
    images: ["https://avbsoftware.com/og-services.png"],
  },

  alternates: {
    canonical: "https://avbsoftware.com/services",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Services() {
  // ✅ 1. Services Schema - Complete OfferCatalog
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development & IT Services",
    provider: {
      "@type": "Organization",
      name: "AVB Software",
      url: "https://avbsoftware.com",
      logo: "https://avbsoftware.com/logo.png",
    },
    areaServed: [
      { "@type": "City", name: "Indore" },
      { "@type": "City", name: "Bhopal" },
      { "@type": "City", name: "Ujjain" },
      { "@type": "City", name: "Dewas" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services in Indore & Bhopal",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development in Indore & Bhopal",
            description: "Custom website development using React, Next.js, WordPress for businesses in Indore & Bhopal",
            url: "https://avbsoftware.com/services#web",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "8000",
            priceCurrency: "INR",
            description: "Starting from ₹8,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Cross-platform Android & iOS apps using React Native and Flutter",
            url: "https://avbsoftware.com/services#mobile",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "25000",
            priceCurrency: "INR",
            description: "Starting from ₹25,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Tailor-made ERP, CRM & business software for Indore & Bhopal businesses",
            url: "https://avbsoftware.com/services#custom",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "25000",
            priceCurrency: "INR",
            description: "Starting from ₹25,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design Services",
            description: "Beautiful, user-friendly interfaces designed in Figma",
            url: "https://avbsoftware.com/services#design",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "15000",
            priceCurrency: "INR",
            description: "Starting from ₹15,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Website Development",
            description: "Shopify, WooCommerce & custom e-commerce solutions for Indore & Bhopal businesses",
            url: "https://avbsoftware.com/services#ecommerce",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "20000",
            priceCurrency: "INR",
            description: "Starting from ₹20,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Digital Marketing Services",
            description: "Local SEO experts for Indore & Bhopal businesses - rank higher on Google",
            url: "https://avbsoftware.com/services#seo",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "10000",
            priceCurrency: "INR",
            description: "Starting from ₹10,000/month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Consulting & Support",
            description: "Expert technology consulting for businesses across Madhya Pradesh",
            url: "https://avbsoftware.com/services#consulting",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "5000",
            priceCurrency: "INR",
            description: "Starting from ₹5,000/hour",
          },
        },
      ],
    },
  };

  // ✅ 2. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://avbsoftware.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://avbsoftware.com/services",
      },
    ],
  };

  // ✅ 3. FAQ Schema - Service Related Questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What IT services does AVB Software offer in Indore & Bhopal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software offers complete IT services in Indore & Bhopal including web development, mobile app development, custom software, ERP solutions, e-commerce websites, UI/UX design, and SEO services starting from ₹8,000.",
        },
      },
      {
        "@type": "Question",
        name: "How much does web development cost in Indore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Web development in Indore at AVB Software starts from ₹8,000 for basic websites. Business websites range from ₹15,000-₹50,000, while custom web applications start from ₹50,000+. Get free quote today!",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to develop a mobile app in Bhopal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mobile app development in Bhopal typically takes 30-60 days. Simple apps take 30 days, while complex apps with backend integration take 45-60 days. We use React Native for faster cross-platform development.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide custom ERP software for Madhya Pradesh businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! AVB Software specializes in custom ERP software for Madhya Pradesh businesses including textile (Indore), manufacturing, healthcare (Bhopal), and trading. Starting from ₹50,000 with full customization.",
        },
      },
      {
        "@type": "Question",
        name: "What SEO services do you provide for Indore & Bhopal businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer complete SEO services for Indore & Bhopal businesses including local SEO, Google My Business optimization, keyword research, content marketing, technical SEO, and Google Ads. Starting from ₹10,000/month with monthly reporting.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer e-commerce website development in Indore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We build Shopify, WooCommerce, and custom e-commerce stores for Indore businesses including textile dealers, retailers, and online sellers. Starting from ₹20,000 with payment gateway integration and GST-compliant invoicing.",
        },
      },
    ],
  };

  // ✅ 4. Item List Schema (All Services)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT Services in Indore & Bhopal",
    description: "Complete list of IT services offered by AVB Software in Indore, Bhopal & across Madhya Pradesh",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Web Development",
        url: "https://avbsoftware.com/services#web",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mobile App Development",
        url: "https://avbsoftware.com/services#mobile",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Custom Software Development",
        url: "https://avbsoftware.com/services#custom",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "UI/UX Design",
        url: "https://avbsoftware.com/services#design",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "E-Commerce Development",
        url: "https://avbsoftware.com/services#ecommerce",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "SEO & Digital Marketing",
        url: "https://avbsoftware.com/services#seo",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "IT Consulting",
        url: "https://avbsoftware.com/services#consulting",
      },
    ],
  };

  return (
    <>
      {/* ✅ All Schema Markups */}
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Script
        id="breadcrumb-schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="itemlist-schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <ServicesPage />
    </>
  );
}