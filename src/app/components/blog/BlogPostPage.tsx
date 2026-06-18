import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, getRelatedPosts } from "@/lib/blog-data";

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const postUrl = `https://avbsoftware.com/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post.slug, 3);

  // ✅ BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://avbsoftware.com${post.ogImage || post.thumbnail}`,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author,
      description: post.authorBio,
    },
    publisher: {
      "@type": "Organization",
      name: "AVB Software",
      logo: {
        "@type": "ImageObject",
        url: "https://avbsoftware.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  // ✅ FAQ Schema
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  // ✅ Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://avbsoftware.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://avbsoftware.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      {/* ✅ Schemas - SEO ke liye */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* ✅ Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{post.category}</span>
        </nav>

        {/* ✅ Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* ✅ Title - H1 */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {post.title}
        </h1>

        {/* ✅ Excerpt */}
        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

        {/* ✅ Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500 border-b pb-6">
          <div className="flex items-center gap-2">
            {post.authorImage && (
              <Image
                src={post.authorImage}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-xs">{post.dateDisplay} · {post.readTime}</p>
            </div>
          </div>
        </div>

        {/* ✅ Featured Image */}
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ✅ Content - Markdown ya HTML */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ✅ Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ✅ FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ Author Bio */}
        {post.authorBio && (
          <section className="mt-12 bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              {post.authorImage && (
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="font-bold text-lg">{post.author}</h3>
                <p className="text-gray-700 mt-1">{post.authorBio}</p>
              </div>
            </div>
          </section>
        )}

        {/* ✅ Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block bg-white border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={related.thumbnail}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-medium">
                      {related.category}
                    </span>
                    <h3 className="font-semibold mt-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ✅ CTA Section */}
        <section className="mt-16 bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="mb-6">
            Get a free consultation from AVB Software's expert team in Indore & Bhopal
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Us Now
          </Link>
        </section>
      </article>
    </>
  );
}