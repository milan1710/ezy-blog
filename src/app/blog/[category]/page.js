import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import BlogCard from "@/components/BlogCard/BlogCard";
import { Suspense } from "react";
import "./category-page.css";

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="skeleton-card"></div>
      ))}
    </div>
  );
}

async function getCategoryPosts(categorySlug, page = 1, limit = 12) {
  await connectDB();

  const category = await Category.findOne({ slug: categorySlug }).lean();
  if (!category) {
    return null;
  }

  const skip = (page - 1) * limit;
  
  const [blogs, totalBlogs] = await Promise.all([
    Blog.find({ category: category._id })
      .sort({ createdAt: -1 })
      .populate("category")
      .skip(skip)
      .limit(limit)
      .lean(),
    Blog.countDocuments({ category: category._id })
  ]);

  const totalPages = Math.ceil(totalBlogs / limit);

  return { 
    category: JSON.parse(JSON.stringify(category)), 
    blogs: JSON.parse(JSON.stringify(blogs)),
    totalBlogs,
    totalPages,
    currentPage: page
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  await connectDB();
  const categoryData = await Category.findOne({ slug }).lean();
  
  if (!categoryData) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found."
    };
  }
  
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";
  
  return {
    title: `${categoryData.name} - Ezy Digital Blog | Expert Insights & Tips`,
    description: `Explore all ${categoryData.name} articles on Ezy Digital Blog. Get expert insights, practical tips, and strategies about ${categoryData.name} for business growth.`,
    keywords: `${categoryData.name}, ${categoryData.name} blog, ${categoryData.name} articles, digital marketing, SEO tips, business growth`,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${categoryData.name} - Ezy Digital Blog`,
      description: `Explore all ${categoryData.name} articles. Get expert insights and strategies for business growth.`,
      url: `${baseUrl}/category/${slug}`,
      siteName: "Ezy Digital Blog",
      images: [
        {
          url: categoryData.thumbnail || "/thumbnail/category.png",
          width: 1200,
          height: 630,
          alt: categoryData.name
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryData.name} - Ezy Digital Blog`,
      description: `Explore all ${categoryData.name} articles. Get expert insights and strategies.`,
      images: [categoryData.thumbnail || "/thumbnail/category.png"],
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
      canonical: `${baseUrl}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  // ✅ FIX: Await both params and searchParams (Next.js 15 requirement)
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam) || 1;
  
  const data = await getCategoryPosts(slug, currentPage);

  if (!data) {
    notFound();
  }

  const { category: categoryData, blogs, totalBlogs, totalPages, currentPage: page } = data;
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";

  // JSON-LD Schema for Category Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryData.name} - Ezy Digital Blog`,
    "description": `Explore all ${categoryData.name} articles on Ezy Digital Blog`,
    "url": `${baseUrl}/category/${slug}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Ezy Digital Blog",
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}/blog/${blog.slug}`,
        "name": blog.title
      }))
    }
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="category-page">
        {/* Category Hero Section */}
        <section className="category-hero">
          <div className="container">
            <div className="category-hero-content">
              <div className="category-hero-image">
                <img 
                  src={categoryData.thumbnail || "/thumbnail/category.png"} 
                  alt={categoryData.name}
                  loading="eager"
                />
              </div>
              <div className="category-hero-info">
                <h1 className="category-hero-title">{categoryData.name}</h1>
                <p className="category-hero-description">
                  Explore all {categoryData.name} articles. Get expert insights, tips, and strategies to grow your knowledge.
                </p>
                <div className="category-stats">
                  <span className="stat-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {totalBlogs} Articles
                  </span>
                  <span className="stat-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Updated Recently
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Listing Section */}
        <section className="category-blogs-section">
          <div className="container">
            {blogs.length > 0 ? (
              <>
                <div className="section-header">
                  <h2 className="section-title">All {categoryData.name} Articles</h2>
                  <p className="section-subtitle">
                    Showing {blogs.length} of {totalBlogs} articles
                  </p>
                </div>
                
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className="blogs-grid">
                    {blogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </Suspense>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination">
                      {page > 1 && (
                        <a href={`/category/${slug}?page=${page - 1}`} className="pagination-prev">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Previous
                        </a>
                      )}
                      
                      <div className="pagination-pages">
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          // Show first, last, and pages around current
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= page - 2 && pageNum <= page + 2)
                          ) {
                            return (
                              <a
                                key={i}
                                href={`/category/${slug}?page=${pageNum}`}
                                className={`pagination-page ${pageNum === page ? 'active' : ''}`}
                              >
                                {pageNum}
                              </a>
                            );
                          }
                          // Show ellipsis for gaps
                          if (pageNum === page - 3 || pageNum === page + 3) {
                            return <span key={i} className="pagination-ellipsis">...</span>;
                          }
                          return null;
                        })}
                      </div>
                      
                      {page < totalPages && (
                        <a href={`/category/${slug}?page=${page + 1}`} className="pagination-next">
                          Next
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    
                    <div className="pagination-info">
                      Page {page} of {totalPages} • {totalBlogs} total articles
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-blogs">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#dc2626" strokeWidth="1.5"/>
                  <path d="M22 6L12 13L2 6" stroke="#dc2626" strokeWidth="1.5"/>
                </svg>
                <h3>No Articles Yet</h3>
                <p>Check back soon for new {categoryData.name} articles!</p>
                <a href="/" className="btn-primary">Browse Other Categories</a>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}