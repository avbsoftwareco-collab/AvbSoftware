// import { MetadataRoute } from "next";
// import { blogPosts } from "@/lib/blog-data";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = "https://avbsoftware.com";

//   const staticPages = [
//     { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
//     { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
//     { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
//     { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
//     { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
//     { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.8 },
//     { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
//   ];

//   const blogPages = blogPosts.map((post) => ({
//     url: `${baseUrl}/blog/${post.slug}`,
//     lastModified: new Date(),
//     changeFrequency: "monthly" as const,
//     priority: 0.7,
//   }));

//   return [...staticPages, ...blogPages];
// }




import { MetadataRoute } from 'next';
import { getAllClients } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // AVB Software main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: 'https://avbsoftware.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://avbsoftware.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://avbsoftware.com/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://avbsoftware.com/templates',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://avbsoftware.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Client sites (ONLY Professional plan - indexed)
  try {
    const clients = await getAllClients();
    const proClients = clients.filter(
      (c) => c.plan_type === 'professional' && c.status === 'live'
    );

    const clientPages: MetadataRoute.Sitemap = proClients.map((client) => {
      const url = client.custom_domain
        ? `https://${client.custom_domain}`
        : `https://${client.subdomain}.avbsoftware.com`;

      return {
        url,
        lastModified: new Date(client.updated_at || client.created_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

    return [...mainPages, ...clientPages];
  } catch {
    return mainPages;
  }
}