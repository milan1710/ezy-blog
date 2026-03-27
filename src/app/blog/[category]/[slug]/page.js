import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard/BlogCard";
import Thumbnail from "@/components/Thumbnail/Thumbnail";
import { Suspense } from "react";
import "./blog-detail.css";

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-hero"></div>
      <div className="skeleton-content"></div>
    </div>
  );
}

async function getBlog(category, slug) {
  await connectDB();
  const blog = await Blog.findOne({ slug })
    .populate("category")
    .lean();
  
  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

// ✅ FIXED: Get only 3 latest blogs from the same category (excluding current blog)
async function getRelatedBlogs(currentBlogId, categoryId) {
  if (!categoryId) return [];
  
  await connectDB();
  const related = await Blog.find({ 
    _id: { $ne: currentBlogId },  // Exclude current blog
    category: categoryId           // Same category only
  })
    .sort({ createdAt: -1 })       // Latest first
    .limit(3)                      // Only 3 blogs
    .populate("category")
    .lean();
  
  return JSON.parse(JSON.stringify(related));
}

// Extract description from HTML
function extractText(html, maxLength = 160) {
  if (!html) return "";
  const plainText = html.replace(/<[^>]+>/g, "").trim();
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + "..." 
    : plainText;
}

// Calculate read time
function getReadTime(html) {
  if (!html) return "2 min read";
  const plainText = html.replace(/<[^>]+>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  return `${readTime} min read`;
}

// Format date
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Generate Article Schema
function generateArticleSchema(blog, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: extractText(blog.content, 200),
    image: blog.thumbnail || `${baseUrl}/thumbnail/template.png`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: "Ezy Digital",
      url: "https://ezydigital.in"
    },
    publisher: {
      "@type": "Organization",
      name: "Ezy Digital",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/thumbnail/template.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`
    },
    keywords: blog.category?.name || "digital marketing",
    articleSection: blog.category?.name || "Blog"
  };
}

// Generate Breadcrumb Schema
function generateBreadcrumbSchema(blog, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.category?.name || "Category",
        "item": `${baseUrl}/category/${blog.category?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": blog.title,
        "item": `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`
      }
    ]
  };
}

// Generate FAQ Schema
function generateFAQSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is this blog about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": extractText(blog.content, 150)
        }
      },
      {
        "@type": "Question",
        "name": `How can I learn more about ${blog.category?.name || "digital marketing"}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Check out our other articles in the ${blog.category?.name || "digital marketing"} category for more insights and tips.`
        }
      },
      {
        "@type": "Question",
        "name": "How can this blog help my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This blog provides expert insights and strategies to help you grow your digital presence and achieve business goals."
        }
      }
    ]
  };
}

// Generate Metadata (Next.js 15 compatible)
export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const blog = await getBlog(category, slug);
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";

  if (!blog || blog.category?.slug !== category) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found."
    };
  }

  const description = extractText(blog.content, 160);
  const imageUrl = blog.thumbnail || `${baseUrl}/thumbnail/template.png`;

  return {
    title: `${blog.title} | Ezy Digital Blog`,
    description: description,
    keywords: `${blog.category?.name}, digital marketing, SEO tips, business growth, ${blog.title}`,
    authors: [{ name: "Ezy Digital" }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: blog.title,
      description: description,
      url: `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`,
      siteName: "Ezy Digital Blog",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title
        }
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      authors: ["Ezy Digital"],
      section: blog.category?.name,
      tags: [blog.category?.name, "digital marketing", "SEO"]
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: description,
      images: [imageUrl],
      creator: "@ezydigital",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`,
    },
  };
}

// Main Page Component
export default async function BlogDetail({ params }) {
  const { category, slug } = await params;
  const blog = await getBlog(category, slug);
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";

  if (!blog || blog.category?.slug !== category) {
    notFound();
  }

  const readTime = getReadTime(blog.content);
  const publishDate = formatDate(blog.createdAt);
  // ✅ FIXED: Pass only current blog ID and category ID
  const relatedBlogs = await getRelatedBlogs(blog._id, blog.category?._id);

  // Generate all schemas
  const articleSchema = generateArticleSchema(blog, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(blog, baseUrl);
  const faqSchema = generateFAQSchema(blog);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="blog-detail-page">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href={`/category/${blog.category?.slug}`}>{blog.category?.name}</a></li>
              <li aria-current="page">{blog.title}</li>
            </ol>
          </nav>

          {/* Article */}
          <article className="blog-article">
            {/* Thumbnail Section */}
            <div className="blog-detail-thumbnail">
              <Thumbnail title={blog.title} />
            </div>

            <header className="blog-header">
              {/* Category Tag */}
              {blog.category && (
                <a href={`/category/${blog.category.slug}`} className="blog-category">
                  {blog.category.name}
                </a>
              )}

              {/* Title - H1 */}
              <h1 className="blog-title">{blog.title}</h1>

              {/* Meta Info */}
              <div className="blog-meta">
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{readTime}</span>
                </div>
                <div className="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 2V6M16 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>{publishDate}</span>
                </div>
              </div>
            </header>

            {/* Blog Content */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />

            {/* Share Buttons */}
            <div className="share-section">
              <h3>Share this article</h3>
              <div className="share-buttons">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`)}&text=${encodeURIComponent(blog.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn twitter"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                  Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`)}&title=${encodeURIComponent(blog.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn linkedin"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Related Blogs Section - Only from same category */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <section className="related-blogs">
              <div className="section-header">
                <h2 className="section-title">Related Articles</h2>
                <p className="section-subtitle">More articles from {blog.category?.name} category</p>
              </div>
              <Suspense fallback={<LoadingSkeleton />}>
                <div className="related-grid">
                  {relatedBlogs.map((relatedBlog) => (
                    <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                  ))}
                </div>
              </Suspense>
            </section>
          )}
        </div>
      </div>
    </>
  );
}