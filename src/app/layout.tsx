// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter, Plus_Jakarta_Sans } from "next/font/google";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import WhatsAppButton from "./components/WhatsAppButton";
// import { Analytics } from "./components/Analytics";

// // ✅ Load fonts via next/font (faster, no layout shift, privacy-friendly)
// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   variable: "--font-jakarta",
//   display: "swap",
// });

// // ============ METADATA ============
// export const metadata: Metadata = {
//   metadataBase: new URL("https://avbsoftware.com"),
//   title: {
//     default: "AVB Software — Web & App Development Company in Bhopal",
//     template: "%s | AVB Software",
//   },
//   description:
//     "AVB Software is a Bhopal-based IT company offering web development, mobile apps, and custom software solutions at affordable prices.",
//   keywords: [
//     "web development Bhopal",
//     "mobile app development India",
//     "custom software Bhopal",
//     "IT company Bhopal",
//     "AVB Software",
//     "software development Madhya Pradesh",
//   ],
//   authors: [{ name: "AVB Software" }],
//   creator: "AVB Software",
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "https://avbsoftware.com",
//     siteName: "AVB Software",
//     title: "AVB Software — Web & App Development Company in Bhopal",
//     description:
//       "AVB Software is a Bhopal-based IT company offering web development, mobile apps, and custom software solutions at affordable prices.",
//     images: [
//       {
//         url: "/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "AVB Software — IT Solutions",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "AVB Software — Web & App Development Company in Bhopal",
//     description:
//       "Bhopal-based IT company offering web development, mobile apps, and custom software.",
//     images: ["/og-image.jpg"],
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   verification: {
//     google: "your-google-verification-code",
//   },
// };

// // ============ JSON-LD SCHEMA ============
// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "LocalBusiness",
//   name: "AVB Software",
//   url: "https://avbsoftware.com",
//   telephone: "+91-YOUR-NUMBER",
//   email: "contact@avbsoftware.com",
//   address: {
//     "@type": "PostalAddress",
//     addressLocality: "Bhopal",
//     addressRegion: "Madhya Pradesh",
//     addressCountry: "IN",
//     postalCode: "462001",
//   },
//   description:
//     "AVB Software is an IT company in Bhopal offering web development, mobile app development, and custom software solutions.",
//   priceRange: "₹₹",
//   openingHours: "Mo-Fr 09:00-18:00",
//   sameAs: [
//     "https://www.linkedin.com/company/avbsoftware",
//     "https://www.instagram.com/avbsoftware",
//   ],
// };

// // ============ ROOT LAYOUT ============
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={`scroll-smooth ${inter.variable} ${jakarta.variable}`}
//       // ✅ CSS variables are now available app-wide:
//       // var(--font-inter) and var(--font-jakarta)
//     >
//       <head>
//         {/* ✅ JSON-LD Structured Data for SEO */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//         {/* ✅ No more Google Fonts <link> tags needed — next/font handles it */}
//       </head>
//       <body className="min-h-screen bg-white">
//         <Analytics />
//         <Navbar />
//         <main>{children}</main>
//         <Footer />
//         <WhatsAppButton />
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avbsoftware.com"),
  title: "AVB Software — Premium Digital Studio in Bhopal",
  description: "Crafting digital excellence for ambitious brands. Web, mobile, and custom software solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}