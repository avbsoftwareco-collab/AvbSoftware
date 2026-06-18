import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/lib/blog-data";
import BlogPostPage from "../[slug]/BlogPage";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `https://avbsoftware.com/blog/${post.slug}`;
  const imageUrl = post.ogImage || post.thumbnail;

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "AVB Software",
      images: [
        {
          url: `https://avbsoftware.com${imageUrl}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      tags: post.tags,
    },
    
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`https://avbsoftware.com${imageUrl}`],
    },
    
    alternates: {
      canonical: postUrl,
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
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return <BlogPostPage post={post} />;
}