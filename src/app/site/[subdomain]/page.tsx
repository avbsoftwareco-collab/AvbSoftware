import { notFound } from "next/navigation";
import { getClientBySubdomain } from "@/lib/supabase";
import DynamicTimberSite from "../../components/sites/DynamicTimberSite";
import DynamicCakeSite from "../../components/sites/DynamicCakeSite";
import type { Metadata } from "next";

interface PageProps {
  params: {
    subdomain: string;
  };
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const client = await getClientBySubdomain(params.subdomain);
  
  if (!client) {
    return {
      title: "Site Not Found",
    };
  }

  return {
    title: `${client.business_name} - ${client.tagline || 'Welcome'}`,
    description: client.about?.substring(0, 160) || `Visit ${client.business_name}`,
  };
}

export default async function ClientSitePage({ params }: PageProps) {
  // Fetch client data from database
  const client = await getClientBySubdomain(params.subdomain);

  // If no client found
  if (!client) {
    notFound();
  }

  // Render appropriate template based on client's template
  switch (client.template) {
    case "Timber Pro":
      return <DynamicTimberSite client={client} />;
    
    case "Cake Shop":
      return <DynamicCakeSite client={client} />;
    
    default:
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
}