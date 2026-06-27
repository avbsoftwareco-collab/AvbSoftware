// import { notFound } from "next/navigation";
// import { getClientBySubdomain, Client } from "@/lib/supabase";
// import DynamicTimberSite from "../../components/sites/DynamicTimberSite";
// import DynamicCakeSite from "../../components/sites/DynamicCakeSite";
// import DynamicRestaurantSite from "../../components/sites/DynamicRestaurantSite";
// import type { Metadata } from "next";

// interface PageProps {
//   params: {
//     subdomain: string;
//   };
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const client = await getClientBySubdomain(params.subdomain);
  
//   if (!client) {
//     return { title: "Site Not Found" };
//   }

//   return {
//     title: `${client.business_name} - ${client.tagline || 'Welcome'}`,
//     description: client.about?.substring(0, 160) || `Visit ${client.business_name}`,
//   };
// }

// export default async function ClientSitePage({ params }: PageProps) {
//   const client = await getClientBySubdomain(params.subdomain);

//   if (!client) {
//     notFound();
//   }

//   // ══════════════════════════════════════════════════
//   // Smart fallback - FIXED with proper Client type
//   // ══════════════════════════════════════════════════
//   const enrichedClient: Client = {
//     ...client,
//     hero_image: client.hero_image || client.hero_image_url || undefined,
//     about_short: client.about_short || client.about || undefined,
//     reviews: client.reviews || [],
//     gallery_images_detailed: 
//       client.gallery_images_detailed && client.gallery_images_detailed.length > 0
//         ? client.gallery_images_detailed
//         : (client.gallery_images || []).map((src: string, i: number) => ({
//             src,
//             alt: `${client.business_name} Gallery ${i + 1}`,
//             category: "Gallery",
//           })),
//   };

//   const template = client.template?.toLowerCase();

//   if (template?.includes("timber")) {
//     return <DynamicTimberSite client={client} />;
//   }

//   if (template?.includes("cake")) {
//     return <DynamicCakeSite client={client} />;
//   }

//   if (template?.includes("restaurant")) {
//     return <DynamicRestaurantSite client={enrichedClient} />;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
//       <div className="text-center">
//         <div className="text-6xl mb-4">⚠️</div>
//         <h1 className="text-3xl font-bold text-[#2B2419] mb-2">
//           Template Not Found
//         </h1>
//         <p className="text-[#6B5D4A]">
//           Template &quot;{client.template}&quot; is not configured yet
//         </p>
//       </div>
//     </div>
//   );
// }






import { notFound } from "next/navigation";
import { getClientBySubdomain, Client } from "@/lib/supabase";
import DynamicTimberSite from "../../components/sites/DynamicTimberSite";
import DynamicCakeSite from "../../components/sites/DynamicCakeSite";
import DynamicRestaurantSite from "../../components/sites/DynamicRestaurantSite";
import DynamicResortSite from "../../components/sites/DynamicResortSite";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";


interface PageProps {
  params: {
    subdomain: string;
  };
}

// ═══════════════════════════════════════════════════
// SEO METADATA - DYNAMIC PER CLIENT
// Professional plan = Full SEO
// Starter plan = Basic only (no indexing)
// ═══════════════════════════════════════════════════
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = await getClientBySubdomain(params.subdomain);
  
  if (!client) {
    return { title: "Site Not Found" };
  }

  const isPro = client.plan_type === 'professional';
  const siteUrl = client.custom_domain 
    ? `https://${client.custom_domain}` 
    : `https://${client.subdomain}.avbsoftware.com`;
  
  const title = `${client.business_name} - ${client.tagline || client.city || 'Welcome'}`;
  const description = client.about?.substring(0, 160) || `Visit ${client.business_name} in ${client.city || 'your city'}. ${client.tagline || ''}`;
  const image = client.hero_image_url || client.hero_image || client.logo_url || '';

  // ═══════════════════════════════════════
  // STARTER PLAN = Basic metadata only
  // ═══════════════════════════════════════
  if (!isPro) {
    return {
      title,
      description,
      robots: {
        index: false,      // ❌ Google me NAHI aayega
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  // ═══════════════════════════════════════
  // PROFESSIONAL PLAN = FULL SEO 🚀
  // ═══════════════════════════════════════
  return {
    title,
    description,
    
    // Keywords
    keywords: [
      client.business_name,
      client.tagline || '',
      client.city || '',
      client.template?.toLowerCase().includes('cake') ? 'cake shop' : '',
      client.template?.toLowerCase().includes('cake') ? 'bakery' : '',
      client.template?.toLowerCase().includes('cake') ? 'custom cakes' : '',
      client.template?.toLowerCase().includes('cake') ? 'birthday cake' : '',
      client.template?.toLowerCase().includes('cake') ? 'wedding cake' : '',
      client.template?.toLowerCase().includes('restaurant') ? 'restaurant' : '',
      client.template?.toLowerCase().includes('restaurant') ? 'fine dining' : '',
      client.template?.toLowerCase().includes('restaurant') ? 'food' : '',
      client.template?.toLowerCase().includes('timber') ? 'timber' : '',
      client.template?.toLowerCase().includes('timber') ? 'wood' : '',
      `best ${client.template?.toLowerCase().includes('cake') ? 'bakery' : 'restaurant'} in ${client.city || 'india'}`,
    ].filter(Boolean),

    // Canonical URL
    alternates: {
      canonical: siteUrl,
    },

    // Robots - ALLOW indexing
    robots: {
      index: true,        // ✅ Google me AAYEGA
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },

    // Open Graph (Facebook / WhatsApp preview)
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: siteUrl,
      title,
      description,
      siteName: client.business_name,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: client.business_name,
          type: 'image/jpeg',
        },
      ] : [],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },

    // Favicon
    icons: {
      icon: client.logo_url || '/favicon.png',
      apple: client.logo_url || '/favicon.png',
    },

    // Verification (Google Search Console)
    verification: {
      google: (client as any).google_verification || undefined,
    },

    // Other
    category: client.template?.toLowerCase().includes('cake') 
      ? 'Food & Drink' 
      : client.template?.toLowerCase().includes('restaurant') 
        ? 'Restaurant' 
        : 'Business',
  };
}

export default async function ClientSitePage({ params }: PageProps) {
  const client = await getClientBySubdomain(params.subdomain);

  if (!client) {
    notFound();
  }

  const isPro = client.plan_type === 'professional';

  const enrichedClient: Client = {
    ...client,
    hero_image: client.hero_image || client.hero_image_url || undefined,
    about_short: client.about_short || client.about || undefined,
    reviews: client.reviews || [],
    gallery_images_detailed: 
      client.gallery_images_detailed && client.gallery_images_detailed.length > 0
        ? client.gallery_images_detailed
        : (client.gallery_images || []).map((src: string, i: number) => ({
            src,
            alt: `${client.business_name} Gallery ${i + 1}`,
            category: "Gallery",
          })),
  };

  const template = client.template?.toLowerCase();

  // ═══════════════════════════════════════
  // SCHEMA.ORG STRUCTURED DATA (Pro Only)
  // Google Rich Results ke liye
  // ═══════════════════════════════════════
  const schemaData = isPro ? generateSchemaMarkup(client) : null;

  return (
    <>
      {/* Schema.org JSON-LD (Pro Plan Only) */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* Google Analytics (Pro Plan Only) */}
      {isPro && (client as any).google_analytics_id && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${(client as any).google_analytics_id}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${(client as any).google_analytics_id}');
              `,
            }}
          />
        </>
      )}

   {/* Render Template */}
{template?.includes("timber") && <DynamicTimberSite client={client} />}
{template?.includes("cake") && <DynamicCakeSite client={enrichedClient} />}
{template?.includes("restaurant") && <DynamicRestaurantSite client={enrichedClient} />}
{template?.includes("resort") && <DynamicResortSite client={enrichedClient} />}

{!template?.includes("timber") && 
 !template?.includes("cake") && 
 !template?.includes("restaurant") && 
 !template?.includes("resort") && (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
    <div className="text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-3xl font-bold text-[#2B2419] mb-2">Template Not Found</h1>
      <p className="text-[#6B5D4A]">Template &quot;{client.template}&quot; is not configured yet</p>
    </div>
  </div>
)}
    </>
  );
}

// ═══════════════════════════════════════════════════
// SCHEMA.ORG MARKUP GENERATOR
// Google Rich Results ke liye (stars, hours, etc.)
// ═══════════════════════════════════════════════════
function generateSchemaMarkup(client: Client) {
  const template = client.template?.toLowerCase() || '';
  const siteUrl = client.custom_domain 
    ? `https://${client.custom_domain}` 
    : `https://${client.subdomain}.avbsoftware.com`;

  // Calculate average rating
  const avgRating = client.reviews && client.reviews.length > 0
    ? (client.reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / client.reviews.length).toFixed(1)
    : "4.8";

  // Base schema for all templates
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": template.includes('restaurant') ? "Restaurant" 
           : template.includes('cake') ? "Bakery" 
           : "LocalBusiness",
    "name": client.business_name,
    "description": client.about?.substring(0, 300) || `${client.business_name} - ${client.tagline || 'Welcome'}`,
    "url": siteUrl,
    "telephone": client.phone || undefined,
    "email": client.email || undefined,
    "image": client.hero_image_url || client.hero_image || client.logo_url || undefined,
    "logo": client.logo_url || undefined,
    "priceRange": "₹₹",
  };

  // Address
  if (client.address || client.city) {
    baseSchema.address = {
      "@type": "PostalAddress",
      "streetAddress": client.address || undefined,
      "addressLocality": client.city || undefined,
      "addressCountry": "IN",
    };
  }

  // Aggregate Rating
  if (client.reviews && client.reviews.length > 0) {
    baseSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": String(client.reviews.length),
      "reviewCount": String(client.reviews.length),
    };
  }

  // Individual Reviews
  if (client.reviews && client.reviews.length > 0) {
    baseSchema.review = client.reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name,
      },
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": String(review.rating || 5),
        "bestRating": "5",
      },
    }));
  }

  // Opening Hours
  if (client.opening_hours && client.opening_hours.length > 0) {
    baseSchema.openingHours = client.opening_hours.map(
      (h) => `${h.days} ${h.hours}`
    );
  } else if (client.working_hours) {
    baseSchema.openingHours = client.working_hours;
  }

  // Social Media
  const sameAs = [];
  if (client.instagram) sameAs.push(client.instagram);
  if (client.facebook) sameAs.push(client.facebook);
  if (sameAs.length > 0) baseSchema.sameAs = sameAs;

  // Menu (for restaurant/cake)
  if (client.products && client.products.length > 0) {
    baseSchema.hasMenu = {
      "@type": "Menu",
      "hasMenuSection": [{
        "@type": "MenuSection",
        "name": "Our Menu",
        "hasMenuItem": client.products.slice(0, 10).map((p) => ({
          "@type": "MenuItem",
          "name": p.name,
          "description": p.description || undefined,
          "offers": p.price ? {
            "@type": "Offer",
            "price": p.price.replace(/[^0-9.]/g, ''),
            "priceCurrency": "INR",
          } : undefined,
          "image": p.image_url || undefined,
        })),
      }],
    };
  }

  // Geo coordinates (from map embed URL)
  if (client.maps_link || (client as any).map_embed_url) {
    baseSchema.geo = {
      "@type": "GeoCoordinates",
      "url": client.maps_link || (client as any).map_embed_url,
    };
  }

  // Founded year
  if (client.year_established || client.established_year) {
    baseSchema.foundingDate = client.year_established || client.established_year;
  }

  return baseSchema;
}