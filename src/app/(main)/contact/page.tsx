import type { Metadata } from "next";
import Script from "next/script";
import ContactPage from "./ContactPage";

// ✅ Complete SEO Metadata
export const metadata: Metadata = {
  title: "Contact AVB Software — Best IT Company in Indore & Bhopal | Free Quote",
  description:
    "Contact AVB Software in Indore & Bhopal for free consultation. Web development, mobile apps, custom software & SEO services. Response within 24 hours. Call, WhatsApp or email us today!",
  keywords: [
    "contact avb software",
    "software company contact indore",
    "software company contact bhopal",
    "web development company indore contact",
    "web development company bhopal contact",
    "free quote web development indore",
    "free quote app development bhopal",
    "it company phone number indore",
    "it company email bhopal",
    "hire developer indore",
    "hire developer bhopal",
    "software services madhya pradesh",
    "free consultation indore bhopal",
    "AVB Software phone",
    "AVB Software email",
    "AVB Software address",
  ],
  authors: [{ name: "AVB Software" }],

  openGraph: {
    title: "Contact AVB Software — Indore & Bhopal&apos;s Top IT Company",
    description:
      "Get free consultation for web development, mobile apps & custom software. Response within 24 hours. Serving Indore, Bhopal & all of India.",
    url: "https://avbsoftware.com/contact",
    siteName: "AVB Software",
    images: [
      {
        url: "https://avbsoftware.com/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact AVB Software - IT Company in Indore & Bhopal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact AVB Software — Free Quote in 24 Hours",
    description:
      "Web Development, Mobile Apps, Custom Software & SEO. Serving Indore, Bhopal & all India.",
    images: ["https://avbsoftware.com/og-contact.png"],
  },

  alternates: {
    canonical: "https://avbsoftware.com/contact",
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

export default function Contact() {
  // ✅ 1. Contact Page Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AVB Software",
    description: "Get in touch with AVB Software for IT services in Indore & Bhopal",
    url: "https://avbsoftware.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "AVB Software",
    },
  };

  // ✅ 2. Local Business Schema with full contact details
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://avbsoftware.com/#localbusiness",
    name: "AVB Software",
    image: "https://avbsoftware.com/logo.png",
    url: "https://avbsoftware.com",
    telephone: "+91-XXXXXXXXXX", // ✅ APNA NUMBER DAALEIN
    email: "contact@avbsoftware.com", // ✅ APNI EMAIL DAALEIN
    priceRange: "₹₹",
    description:
      "Top software company in Indore & Bhopal offering web development, mobile apps, custom software & SEO services.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address", // ✅ APNA ADDRESS
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.2599,
      longitude: 77.4126,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-XXXXXXXXXX",
        contactType: "customer service",
        areaServed: ["IN"],
        availableLanguage: ["English", "Hindi"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-XXXXXXXXXX",
        contactType: "sales",
        areaServed: ["IN"],
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        email: "contact@avbsoftware.com",
        contactType: "customer support",
        areaServed: ["IN"],
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/avbsoftware",
      "https://www.instagram.com/avbsoftware",
      "https://www.linkedin.com/company/avbsoftware",
      "https://twitter.com/avbsoftware",
    ],
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
        name: "Contact",
        item: "https://avbsoftware.com/contact",
      },
    ],
  };

  // ✅ 4. FAQ Schema (matches FAQ section content)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does it take to get a response from AVB Software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We respond to all inquiries within 24 hours (usually faster). Our Indore & Bhopal team works 6 days a week (Mon-Sat, 9am-8pm IST).",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide services outside Indore and Bhopal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! While we're based in Indore & Bhopal, we serve clients across India and worldwide. Our remote-first model allows us to work with businesses anywhere.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a typical project cost at AVB Software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project costs vary based on complexity. Websites start from ₹8,000, mobile apps from ₹25,000, and custom software from ₹25,000. We provide free quotes after understanding your requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Does AVB Software offer free consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! We provide free 30-minute consultations to understand your project needs and suggest the best technology solution. No commitment required.",
        },
      },
      {
        "@type": "Question",
        name: "What's the best way to contact AVB Software for urgent projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For urgent projects, WhatsApp us at +91-XXXXXXXXXX for instant response. You can also call us directly during business hours (9am-8pm IST).",
        },
      },
      {
        "@type": "Question",
        name: "Do you sign NDAs to protect project ideas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we sign Non-Disclosure Agreements (NDAs) with all clients. Your project idea and business information are 100% confidential and secure with us.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ All Schema Markups */}
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Script
        id="local-business-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="breadcrumb-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ContactPage />
    </>
  );
}