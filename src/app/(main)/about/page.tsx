import type { Metadata } from "next";
import Script from "next/script";
import AboutPage from "./AboutPage";

// ✅ Complete SEO Metadata
export const metadata: Metadata = {
  title: "About AVB Software — Best IT Company in Indore & Bhopal, MP",
  description:
    "Learn about AVB Software — top software development company in Indore & Bhopal. Meet our founders, story, values & why we're the trusted IT partner for businesses in Madhya Pradesh.",
  keywords: [
    "about avb software",
    "software company indore",
    "software company bhopal",
    "it company indore",
    "it company bhopal",
    "best software company madhya pradesh",
    "web development company indore",
    "app development company bhopal",
    "founders avb software",
    "team avb software",
    "abhinandan meena",
    "varsha thakre",
    "bharti dhote",
    "remote software company india",
    "freelance developers indore",
  ],
  authors: [{ name: "AVB Software" }],
  
  openGraph: {
    title: "About AVB Software — IT Company in Indore & Bhopal",
    description:
      "Meet the team behind AVB Software. Top software company in Indore & Bhopal delivering quality web & app development across Madhya Pradesh.",
    url: "https://avbsoftware.com/about",
    siteName: "AVB Software",
    images: [
      {
        url: "https://avbsoftware.com/og-about.png",
        width: 1200,
        height: 630,
        alt: "About AVB Software - IT Company in Indore & Bhopal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "About AVB Software — Best IT Company in Indore & Bhopal",
    description: "Meet the team behind AVB Software, your trusted IT partner in Madhya Pradesh.",
    images: ["https://avbsoftware.com/og-about.png"],
  },
  
  alternates: {
    canonical: "https://avbsoftware.com/about",
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

export default function About() {
  // ✅ Organization Schema - About page ke liye perfect
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AVB Software",
    alternateName: "AVB",
    url: "https://avbsoftware.com",
    logo: "https://avbsoftware.com/logo.png",
    description:
      "Leading software development company in Indore & Bhopal, India. Specializing in web development, mobile apps, custom software, and SEO services.",
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Bhopal, Madhya Pradesh, India",
    },
    founders: [
      {
        "@type": "Person",
        name: "Abhinandan Meena",
        jobTitle: "Co-Founder & CEO",
        sameAs: "https://linkedin.com/in/abhinandan-meena",
      },
      {
        "@type": "Person",
        name: "Varsha Thakre",
        jobTitle: "Co-Founder & COO",
        sameAs: "https://linkedin.com/in/varsha-thakre",
      },
      {
        "@type": "Person",
        name: "Bharti Dhote",
        jobTitle: "Co-Founder & Design Lead",
        sameAs: "https://linkedin.com/in/bharti-dhote",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXXXXXXXXX", // ✅ Apna number daalein
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    areaServed: [
      { "@type": "City", name: "Indore" },
      { "@type": "City", name: "Bhopal" },
      { "@type": "City", name: "Ujjain" },
      { "@type": "City", name: "Dewas" },
      { "@type": "City", name: "Jabalpur" },
      { "@type": "City", name: "Gwalior" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [
      "https://www.facebook.com/avbsoftware",
      "https://www.instagram.com/avbsoftware",
      "https://www.linkedin.com/company/avbsoftware",
      "https://twitter.com/avbsoftware",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 3,
      maxValue: 10,
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "Custom Software Development",
      "ERP Development",
      "SEO Services",
      "Digital Marketing",
      "UI/UX Design",
      "React.js",
      "Next.js",
      "React Native",
      "Node.js",
    ],
  };

  // ✅ Breadcrumb Schema
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
        name: "About Us",
        item: "https://avbsoftware.com/about",
      },
    ],
  };

  // ✅ About Page Schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About AVB Software",
    description: "Learn about AVB Software, the top software company in Indore & Bhopal serving businesses across Madhya Pradesh and India.",
    url: "https://avbsoftware.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "AVB Software",
    },
  };

  // ✅ FAQ Schema - About specific questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is AVB Software located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software is based in Bhopal & Indore, Madhya Pradesh, India. We operate remotely and serve clients across Indore, Bhopal, Ujjain, and all of India.",
        },
      },
      {
        "@type": "Question",
        name: "Who are the founders of AVB Software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software was founded in 2023 by three passionate professionals - Abhinandan Meena (CEO & Lead Developer), Varsha Thakre (COO & Project Manager), and Bharti Dhote (Design Lead & UI/UX Designer).",
        },
      },
      {
        "@type": "Question",
        name: "What services does AVB Software offer in Indore & Bhopal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software offers web development, mobile app development, custom software solutions, ERP development, UI/UX design, SEO services, and digital marketing to businesses in Indore, Bhopal, and across India.",
        },
      },
      {
        "@type": "Question",
        name: "Why choose AVB Software over big agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software offers 40% lower costs than big city agencies, 2x faster delivery with agile sprints, transparent pricing, and dedicated local support for Indore & Bhopal businesses. We deliver enterprise-quality work at startup-friendly prices.",
        },
      },
      {
        "@type": "Question",
        name: "Does AVB Software work with businesses outside Madhya Pradesh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! While we're based in Bhopal & Indore, our remote-first model allows us to serve clients across India and worldwide. We've worked with businesses in Mumbai, Delhi, Bangalore, and beyond.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ All Schema Markups */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AboutPage />
    </>
  );
}