
// import type { Metadata } from "next";
// import HeroSection from "./components/home/HeroSection";
// import TrustBar from "./components/home/TrustBar";
// import ServicesOverview from "./components/home/ServicesOverview";
// import WhyChooseUs from "./components/home/WhyChooseUs";
// import StatsSection from "./components/home/StatsSection";
// import TestimonialsSection from "./components/home/TestimonialsSection";
// import CTABanner from "./components/home/CTABanner";



// import Script from "next/script";


// // ✅ SEO Metadata
// export const metadata: Metadata = {
//   title: "AVB Software — Best Web & App Development Company in Indore & Bhopal",
//   description: 
//     "Top software company in Indore & Bhopal offering web development, mobile apps, custom software, and SEO services. Affordable pricing, 100% on-time delivery. Get free quote!",
//   keywords: [
//     "software company indore",
//     "software company bhopal",
//     "web development indore",
//     "web development bhopal",
//     "app development indore",
//     "app development bhopal",
//     "best software company madhya pradesh",
//     "custom software indore",
//     "seo services bhopal",
//     "ecommerce website indore",
//     "website designer bhopal",
//     "AVB Software",
//   ],
//   authors: [{ name: "AVB Software" }],
//   creator: "AVB Software",
//   publisher: "AVB Software",
  
//   openGraph: {
//     title: "AVB Software — Best Web & App Development in Indore & Bhopal",
//     description: "Top software company in Indore & Bhopal. Web, Mobile Apps, Custom Software & SEO Services. Get free consultation today!",
//     url: "https://avbsoftware.com",
//     siteName: "AVB Software",
//     images: [
//       {
//         url: "https://avbsoftware.com/og-home.png",
//         width: 1200,
//         height: 630,
//         alt: "AVB Software - Best Software Company in Indore & Bhopal",
//       },
//     ],
//     locale: "en_IN",
//     type: "website",
//   },
  
//   twitter: {
//     card: "summary_large_image",
//     title: "AVB Software — Indore & Bhopal's Top Software Company",
//     description: "Web Development, Mobile Apps, Custom Software & SEO. Trusted by businesses across Madhya Pradesh.",
//     images: ["https://avbsoftware.com/og-home.png"],
//   },
  
//   alternates: {
//     canonical: "https://avbsoftware.com",
//   },
  
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
  
//   verification: {
//     google: "your-google-verification-code", // ✅ Google Search Console code
//   },
// };

// export default function HomePage() {
//   // ✅ Local Business Schema - SUPER IMPORTANT for local SEO!
//   const localBusinessSchema = {
//     "@context": "https://schema.org",
//     "@type": "LocalBusiness",
//     "@id": "https://avbsoftware.com",
//     name: "AVB Software",
//     image: "https://avbsoftware.com/logo.png",
//     url: "https://avbsoftware.com",
//     telephone: "+91-XXXXXXXXXX", // ✅ Apna number daalein
//     email: "contact@avbsoftware.com",
//     priceRange: "₹₹",
//     description: "Best software company in Indore & Bhopal offering web development, mobile apps, custom software & SEO services across Madhya Pradesh and India.",
//     address: {
//       "@type": "PostalAddress",
//       addressLocality: "Indore",
//       addressRegion: "Madhya Pradesh",
//       postalCode: "452001",
//       addressCountry: "IN",
//     },
//     geo: {
//       "@type": "GeoCoordinates",
//       latitude: 22.7196,
//       longitude: 75.8577,
//     },
//     openingHoursSpecification: [
//       {
//         "@type": "OpeningHoursSpecification",
//         dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//         opens: "09:00",
//         closes: "20:00",
//       },
//     ],
//     sameAs: [
//       "https://www.facebook.com/avbsoftware",
//       "https://www.instagram.com/avbsoftware",
//       "https://www.linkedin.com/company/avbsoftware",
//       "https://twitter.com/avbsoftware",
//     ],
//     areaServed: [
//       { "@type": "City", name: "Indore" },
//       { "@type": "City", name: "Bhopal" },
//       { "@type": "City", name: "Ujjain" },
//       { "@type": "City", name: "Dewas" },
//       { "@type": "State", name: "Madhya Pradesh" },
//       { "@type": "Country", name: "India" },
//     ],
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: "5.0",
//       reviewCount: "15",
//       bestRating: "5",
//       worstRating: "1",
//     },
//   };

//   // ✅ Organization Schema
//   const organizationSchema = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "AVB Software",
//     url: "https://avbsoftware.com",
//     logo: "https://avbsoftware.com/logo.png",
//     description: "Leading web & app development company in Indore & Bhopal, India.",
//     contactPoint: {
//       "@type": "ContactPoint",
//       telephone: "+91-XXXXXXXXXX",
//       contactType: "customer service",
//       areaServed: "IN",
//       availableLanguage: ["en", "hi"],
//     },
//     sameAs: [
//       "https://www.linkedin.com/company/avbsoftware",
//       "https://twitter.com/avbsoftware",
//     ],
//   };

//   // ✅ Website Schema with Search Box
//   const websiteSchema = {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     name: "AVB Software",
//     url: "https://avbsoftware.com",
//     potentialAction: {
//       "@type": "SearchAction",
//       target: {
//         "@type": "EntryPoint",
//         urlTemplate: "https://avbsoftware.com/search?q={search_term_string}",
//       },
//       "query-input": "required name=search_term_string",
//     },
//   };

//   // ✅ Services Schema
//   const servicesSchema = {
//     "@context": "https://schema.org",
//     "@type": "Service",
//     serviceType: "Software Development",
//     provider: {
//       "@type": "Organization",
//       name: "AVB Software",
//     },
//     areaServed: {
//       "@type": "State",
//       name: "Madhya Pradesh",
//     },
//     hasOfferCatalog: {
//       "@type": "OfferCatalog",
//       name: "Software Services",
//       itemListElement: [
//         {
//           "@type": "Offer",
//           itemOffered: {
//             "@type": "Service",
//             name: "Web Development",
//             description: "Custom website development for Indore & Bhopal businesses",
//           },
//         },
//         {
//           "@type": "Offer",
//           itemOffered: {
//             "@type": "Service",
//             name: "Mobile App Development",
//             description: "Android & iOS app development services",
//           },
//         },
//         {
//           "@type": "Offer",
//           itemOffered: {
//             "@type": "Service",
//             name: "Custom Software Development",
//             description: "Tailor-made business software solutions",
//           },
//         },
//         {
//           "@type": "Offer",
//           itemOffered: {
//             "@type": "Service",
//             name: "SEO Services",
//             description: "Search engine optimization for local businesses",
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <>
//       {/* ✅ All Schemas */}
//       <Script
//         id="local-business-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
//       />
//       <Script
//         id="organization-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
//       />
//       <Script
//         id="website-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
//       />
//       <Script
//         id="services-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
//       />

//       <main>
//         <HeroSection />
//         <TrustBar />
//         <ServicesOverview />
//         <WhyChooseUs />
//         <StatsSection />
//         <TestimonialsSection />
//         <CTABanner />
//       </main>
//     </>
//   );
// }



import type { Metadata } from "next";
import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import ServicesOverview from "../components/home/ServicesOverview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatsSection from "../components/home/StatsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTABanner from "../components/home/CTABanner";
import Script from "next/script";

// ✅ SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://avbsoftware.com"),
  title: "AVB Software — Best Web & App Development Company in Indore & Bhopal",
  description:
    "Top software company in Indore & Bhopal offering web development, mobile apps, custom software, and SEO services. Affordable pricing, 100% on-time delivery. Get free quote!",
  keywords: [
    "software company indore",
    "software company bhopal",
    "web development indore",
    "web development bhopal",
    "app development indore",
    "app development bhopal",
    "best software company madhya pradesh",
    "custom software indore",
    "seo services bhopal",
    "ecommerce website indore",
    "website designer bhopal",
    "AVB Software",
  ],
  authors: [{ name: "AVB Software" }],
  creator: "AVB Software",
  publisher: "AVB Software",

  openGraph: {
    title: "AVB Software — Best Web & App Development in Indore & Bhopal",
    description:
      "Top software company in Indore & Bhopal. Web, Mobile Apps, Custom Software & SEO Services. Get free consultation today!",
    url: "https://avbsoftware.com",
    siteName: "AVB Software",
    images: [
      {
        url: "/og-home.png", // metadataBase ke saath relative path
        width: 1200,
        height: 630,
        alt: "AVB Software - Best Software Company in Indore & Bhopal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AVB Software — Indore & Bhopal's Top Software Company",
    description:
      "Web Development, Mobile Apps, Custom Software & SEO. Trusted by businesses across Madhya Pradesh.",
    images: ["/og-home.png"],
  },

  alternates: {
    canonical: "https://avbsoftware.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ⚠️ Google Search Console se actual code lagayein
  verification: {
    google: "ACTUAL_GOOGLE_VERIFICATION_CODE_HERE",
  },
};

export default function HomePage() {
  // ✅ Local Business Schema (Primary Location: Indore)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // LocalBusiness se better for IT company
    "@id": "https://avbsoftware.com/#business",
    name: "AVB Software",
    image: "https://avbsoftware.com/logo.png",
    logo: "https://avbsoftware.com/logo.png",
    url: "https://avbsoftware.com",
    telephone: "+91-8821962424", // ⚠️ ACTUAL number daalein
    email: "avbsoftware.co@gmail.com",
    priceRange: "₹₹",
    description:
      "Best software company in Indore & Bhopal offering web development, mobile apps, custom software & SEO services across Madhya Pradesh and India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "govinpura near govindpura police thana ", // ⚠️ Add karein
      addressLocality: "bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462023",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.7196,
      longitude: 75.8577,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      // ⚠️ Sirf wahi URLs daalein jo actually exist karte hain
      "https://www.linkedin.com/company/avbsoftware",
      "https://www.instagram.com/avbsoftware",
    ],
    areaServed: [
      { "@type": "City", name: "Indore" },
      { "@type": "City", name: "Bhopal" },
      { "@type": "City", name: "Ujjain" },
      { "@type": "City", name: "Dewas" },
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    // ❌ aggregateRating HATA diya — fake reviews dene se Google penalty deta hai
    // Jab real clients reviews dein, tab GBP se automatic aayega
  };

  // ✅ Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://avbsoftware.com/#organization",
    name: "AVB Software",
    alternateName: "AVB",
    url: "https://avbsoftware.com",
    logo: {
      "@type": "ImageObject",
      url: "https://avbsoftware.com/logo.png",
      width: 200,
      height: 60,
    },
    description:
      "Leading web & app development company in Indore & Bhopal, India.",
    foundingDate: "2023", // ⚠️ Apni actual founding date daalein
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8821962424", // ⚠️ Actual number
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-8821962424",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/avbsoftware",
      "https://www.instagram.com/avbsoftware",
    ],
  };

  // ✅ Website Schema with Search Box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://avbsoftware.com/#website",
    name: "AVB Software",
    url: "https://avbsoftware.com",
    description:
      "Top software company in Indore & Bhopal for web, app & custom software development.",
    publisher: {
      "@id": "https://avbsoftware.com/#organization",
    },
    inLanguage: "en-IN",
    // ⚠️ Search functionality tabhi add karein jab actually /search page bana ho
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: {
    //     "@type": "EntryPoint",
    //     urlTemplate: "https://avbsoftware.com/search?q={search_term_string}",
    //   },
    //   "query-input": "required name=search_term_string",
    // },
  };

  // ✅ Services Schema
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@id": "https://avbsoftware.com/#organization",
    },
    areaServed: [
      { "@type": "State", name: "Madhya Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "Custom website development for Indore & Bhopal businesses",
            url: "https://avbsoftware.com/services/web-development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Android & iOS app development services",
            url: "https://avbsoftware.com/services/app-development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Tailor-made business software solutions",
            url: "https://avbsoftware.com/services/custom-software",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Search engine optimization for local businesses",
            url: "https://avbsoftware.com/services/seo",
          },
        },
      ],
    },
  };

  // ✅ BreadcrumbList Schema (Home page ke liye optional but good)
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
    ],
  };

  // ✅ FAQ Schema — BAHUT POWERFUL hai SEO ke liye!
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which is the best software company in Indore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVB Software is one of the top software companies in Indore, offering web development, mobile app development, custom software, and SEO services with affordable pricing and 100% on-time delivery.",
        },
      },
      {
        "@type": "Question",
        name: "How much does website development cost in Bhopal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Website development cost in Bhopal starts from ₹10,000 for basic websites and goes up to ₹1,00,000+ for advanced e-commerce or custom web applications. Contact AVB Software for a free quote.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide mobile app development services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AVB Software provides end-to-end Android and iOS mobile app development services for businesses in Indore, Bhopal, and across Madhya Pradesh.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to develop a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A basic business website takes 7-15 days, while complex e-commerce or custom web applications may take 30-60 days depending on the features and requirements.",
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ All Schemas — strategy="afterInteractive" performance ke liye better */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="services-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <HeroSection />
        <TrustBar />
        <ServicesOverview />
        <WhyChooseUs />
        <StatsSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
    </>
  );
}