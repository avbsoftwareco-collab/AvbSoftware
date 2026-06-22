import { notFound } from "next/navigation";
import { getClientBySubdomain } from "@/lib/supabase";
import DynamicTimberSite from "../../components/sites/DynamicTimberSite";
import DynamicCakeSite from "../../components/sites/DynamicCakeSite";
import DynamicRestaurantSite from "../../components/sites/DynamicRestaurantSite";
import type { Metadata } from "next";

interface PageProps {
  params: {
    subdomain: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = await getClientBySubdomain(params.subdomain);
  
  if (!client) {
    return { title: "Site Not Found" };
  }

  return {
    title: `${client.business_name} - ${client.tagline || 'Welcome'}`,
    description: client.about?.substring(0, 160) || `Visit ${client.business_name}`,
  };
}

export default async function ClientSitePage({ params }: PageProps) {
  const client = await getClientBySubdomain(params.subdomain);

  if (!client) {
    notFound();
  }

  // Smart fallback for images
  const enrichedClient = {
    ...client,
    hero_image: client.hero_image || client.hero_image_url || null,
    about_short: client.about_short || client.about || null,
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

  if (template?.includes("timber")) {
    return <DynamicTimberSite client={client} />;
  }

  if (template?.includes("cake")) {
    return <DynamicCakeSite client={client} />;
  }

  if (template?.includes("restaurant")) {
    return <DynamicRestaurantSite client={enrichedClient} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-[#2B2419] mb-2">
          Template Not Found
        </h1>
        <p className="text-[#6B5D4A]">
          Template &quot;{client.template}&quot; is not configured yet
        </p>
      </div>
    </div>
  );
}