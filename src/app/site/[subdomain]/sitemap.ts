import { MetadataRoute } from 'next';

// Note: Next.js 14 me per-route dynamic sitemap supported nahi hai properly
// Yeh file future use ke liye hai jab custom domain setup hoga
// Actual sitemap root level pe banegi

export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}