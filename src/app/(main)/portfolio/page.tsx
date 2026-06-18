import type { Metadata } from "next";
import Script from "next/script";
import PortfolioPage from "./PortfolioPage";

// ✅ Complete SEO Metadata
export const metadata: Metadata = {
  title: "Portfolio — Web, App & Software Projects in Indore & Bhopal | AVB Software",
  description:
    "Explore AVB Software's portfolio of web development, mobile apps, and custom software projects for businesses in Indore, Bhopal & across India. 50+ successful projects delivered.",
  keywords: [
    "avb software portfolio",
    "web development portfolio indore",
    "web development portfolio bhopal",
    "app development projects indore",
    "app development projects bhopal",
    "ecommerce website examples indore",
    "ecommerce website examples bhopal",
    "software projects madhya pradesh",
    "best web developers portfolio indore",
    "client work avb software",
    "case studies indore bhopal",
    "react native apps india",
    "next.js websites india",
    "custom erp examples",
    "portfolio software company indore",
    "portfolio it company bhopal",
  ],
  authors: [{ name: "AVB Software" }],

  openGraph: {
    title: "Portfolio — Our Projects in Indore & Bhopal | AVB Software",
    description:
      "50+ successful web, app & software projects for Indore & Bhopal businesses. View our portfolio of e-commerce, mobile apps, custom ERP & more.",
    url: "https://avbsoftware.com/portfolio",
    siteName: "AVB Software",
    images: [
      {
        url: "https://avbsoftware.com/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "AVB Software Portfolio - Projects in Indore & Bhopal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AVB Software Portfolio — Indore & Bhopal Projects",
    description:
      "50+ web, app & software projects delivered for businesses across Madhya Pradesh.",
    images: ["https://avbsoftware.com/og-portfolio.png"],
  },

  alternates: {
    canonical: "https://avbsoftware.com/portfolio",
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

export default function Portfolio() {
  // ✅ 1. CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AVB Software Portfolio",
    description: "Portfolio of web, app & software projects delivered by AVB Software for clients in Indore, Bhopal & across India",
    url: "https://avbsoftware.com/portfolio",
    publisher: {
      "@type": "Organization",
      name: "AVB Software",
      logo: "https://avbsoftware.com/logo.png",
    },
  };

  // ✅ 2. ItemList Schema - All Projects
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AVB Software Portfolio Projects",
    description: "Web, app & software projects for Indore & Bhopal businesses",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "CreativeWork",
          name: "E-Commerce Website for Indore Textile Business",
          description: "Modern e-commerce platform with payment gateway and inventory management",
          creator: {
            "@type": "Organization",
            name: "AVB Software",
          },
          dateCreated: "2024",
          genre: "Web Development",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "CreativeWork",
          name: "Service Booking Mobile App for Bhopal Salon Chain",
          description: "Cross-platform mobile app with real-time booking",
          creator: {
            "@type": "Organization",
            name: "AVB Software",
          },
          dateCreated: "2024",
          genre: "Mobile App Development",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "CreativeWork",
          name: "Brand Identity & UI/UX for Indore Startup",
          description: "Complete brand identity and UI/UX design",
          creator: {
            "@type": "Organization",
            name: "AVB Software",
          },
          dateCreated: "2024",
          genre: "Design",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "CreativeWork",
          name: "Custom ERP for Bhopal Manufacturing Business",
          description: "Custom ERP system with inventory, billing & staff management",
          creator: {
            "@type": "Organization",
            name: "AVB Software",
          },
          dateCreated: "2024",
          genre: "Custom Software",
        },
      },
    ],
  };

  // ✅ 3. Breadcrumb Schema
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
        name: "Portfolio",
        item: "https://avbsoftware.com/portfolio",
      },
    ],
  };

  // ✅ 4. Organization Schema with Portfolio
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AVB Software",
    url: "https://avbsoftware.com",
    logo: "https://avbsoftware.com/logo.png",
    description: "Leading software development company in Indore & Bhopal with 50+ successful projects",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "15",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      { "@type": "City", name: "Indore" },
      { "@type": "City", name: "Bhopal" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
  };

  // ✅ 5. FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of projects does AVB Software work on?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software has delivered 50+ projects across web development, mobile apps, custom software, ERP systems, e-commerce platforms, and UI/UX design for businesses in Indore, Bhopal, and across India.",
        },
      },
      {
        "@type": "Question",
        name: "Can I see examples of websites built for Indore businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our portfolio includes e-commerce websites for Indore textile businesses, custom ERPs for manufacturing companies, mobile apps for salons in Bhopal, and many more. View our full portfolio at avbsoftware.com/portfolio.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide case studies of completed projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide detailed case studies including project goals, technologies used, challenges faced, and measurable results achieved for each portfolio project.",
        },
      },
      {
        "@type": "Question",
        name: "How long does AVB Software take to complete a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project timelines vary - basic websites take 7-15 days, business websites 15-30 days, mobile apps 30-60 days, and custom ERP systems 60-90 days. We always deliver on time.",
        },
      },
      {
        "@type": "Question",
        name: "What industries has AVB Software worked with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We've worked with diverse industries including textile (Indore), manufacturing (Bhopal), healthcare, retail & e-commerce, education, real estate, restaurants, and beauty & wellness across Madhya Pradesh.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ All Schema Markups */}
      <Script
        id="collection-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <Script
        id="itemlist-portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="breadcrumb-portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="organization-portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="faq-portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PortfolioPage />
    </>
  );
}