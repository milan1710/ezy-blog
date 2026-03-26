import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import BlogCard from "@/components/BlogCard/BlogCard";
import Thumbnail from "@/components/Thumbnail/Thumbnail";
import { notFound } from "next/navigation";
import "./blog-detail.css";

// Fetch single blog by category slug and blog slug
async function getBlog(categorySlug, slug) {
  await connectDB();
  
  const category = await Category.findOne({ slug: categorySlug });
  if (!category) return null;
  
  const blog = await Blog.findOne({ 
    slug: slug,
    category: category._id 
  }).populate("category");
  
  return blog ? JSON.parse(JSON.stringify(blog)) : null;
}

// Fetch related blogs
async function getRelatedBlogs(currentSlug, categoryId, currentBlogId) {
  if (!categoryId) return [];
  
  await connectDB();
  const related = await Blog.find({ 
    slug: { $ne: currentSlug },
    category: categoryId,
    _id: { $ne: currentBlogId }
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("category")
    .lean();
  
  return JSON.parse(JSON.stringify(related));
}

function extractText(html, maxLength = 160) {
  if (!html) return "";
  const plainText = html.replace(/<[^>]+>/g, "").trim();
  return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
}

function getReadTime(html) {
  if (!html) return "2 min read";
  const plainText = html.replace(/<[^>]+>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  return `${readTime} min read`;
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function generateArticleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: extractText(blog.content, 200),
    image: blog.thumbnail || "/thumbnail/template.png",
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: "Ezy Digital",
      url: process.env.BASE_URL
    },
    publisher: {
      "@type": "Organization",
      name: "Ezy Digital",
      logo: { "@type": "ImageObject", url: "/thumbnail/template.png" }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`
    }
  };
}

function generateBreadcrumbSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": process.env.BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${process.env.BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": blog.category?.name, "item": `${process.env.BASE_URL}/category/${blog.category?.slug}` },
      { "@type": "ListItem", "position": 4, "name": blog.title, "item": `${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}` }
    ]
  };
}

function generateFAQSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is this blog about?",
        "acceptedAnswer": { "@type": "Answer", "text": extractText(blog.content, 150) }
      },
      {
        "@type": "Question",
        "name": `How can I learn more about ${blog.category?.name || "digital marketing"}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Check out our other articles in the ${blog.category?.name} category.` }
      }
    ]
  };
}

export async function generateMetadata({ params }) {
  const { categorySlug, slug } = await params;
  const blog = await getBlog(categorySlug, slug);

  if (!blog) {
    return { title: "Blog Not Found", description: "The requested blog post could not be found." };
  }

  const description = extractText(blog.content, 160);
  const imageUrl = blog.thumbnail || "/thumbnail/template.png";

  return {
    title: `${blog.title} | Ezy Digital Blog`,
    description: description,
    openGraph: {
      title: blog.title,
      description: description,
      url: `${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
      type: "article",
      publishedTime: blog.createdAt
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: description,
      images: [imageUrl]
    }
  };
}

export default async function BlogDetail({ params }) {
  const { categorySlug, slug } = await params;
  const blog = await getBlog(categorySlug, slug);

  if (!blog) {
    notFound();
  }

  const readTime = getReadTime(blog.content);
  const publishDate = formatDate(blog.createdAt);
  const relatedBlogs = await getRelatedBlogs(slug, blog.category?._id, blog._id);

  const articleSchema = generateArticleSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema(blog);
  const faqSchema = generateFAQSchema(blog);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="blog-detail-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href={`/category/${blog.category?.slug}`}>{blog.category?.name}</a></li>
              <li aria-current="page">{blog.title}</li>
            </ol>
          </nav>

          <article className="blog-article">
            <div className="blog-detail-thumbnail">
              <Thumbnail title={blog.title} />
            </div>

            <header className="blog-header">
              {blog.category && (
                <a href={`/category/${blog.category.slug}`} className="blog-category">
                  {blog.category.name}
                </a>
              )}
              <h1 className="blog-title">{blog.title}</h1>
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

            <div className="ad-container ad-top">
              <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-xxxxxxxxxxxxx" data-ad-slot="xxxxxxxxxx"></ins>
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

            <div className="ad-container ad-middle">
              <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-xxxxxxxxxxxxx" data-ad-slot="xxxxxxxxxx"></ins>
            </div>

            <div className="share-section">
              <h3>Share this article</h3>
              <div className="share-buttons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">Twitter</a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`)}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">LinkedIn</a>
              </div>
            </div>
          </article>

          {relatedBlogs && relatedBlogs.length > 0 && (
            <section className="related-blogs">
              <div className="section-header">
                <h2 className="section-title">Related Articles</h2>
                <p className="section-subtitle">You might also find these interesting</p>
              </div>
              <div className="related-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>
            </section>
          )}

          <div className="ad-container ad-bottom">
            <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-xxxxxxxxxxxxx" data-ad-slot="xxxxxxxxxx"></ins>
          </div>
        </div>
      </div>
    </>
  );
}