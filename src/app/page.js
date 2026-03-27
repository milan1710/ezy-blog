import BlogCard from "@/components/BlogCard/BlogCard";
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import { Suspense } from "react";
import "./homepage.css";

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

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";
  
  return {
    title: "Ezy Digital Blog - AI Powered Digital Marketing & SEO Blog",
    description: "Discover expert insights on digital marketing, SEO strategies, business growth, and AI-powered content. Boost your online presence with our latest blogs and guides.",
    keywords: "digital marketing, SEO blog, business growth, AI content, marketing tips, SEO strategies, Indian business blog",
    authors: [{ name: "Ezy Digital" }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Ezy Digital Blog - Grow Your Business with AI Content",
      description: "Expert digital marketing blogs, SEO strategies, and business growth tips for Indian businesses.",
      url: baseUrl,
      siteName: "Ezy Digital Blog",
      images: [
        {
          url: "/thumbnail/template.png",
          width: 1200,
          height: 630,
          alt: "Ezy Digital Blog - Digital Marketing Insights"
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ezy Digital Blog - AI Powered SEO Content",
      description: "Expert digital marketing insights for business growth",
      images: ["/thumbnail/template.png"],
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
      canonical: baseUrl,
    },
  };
}

export default async function Home({ searchParams }) {
  // Get page from URL params
  const { page: pageParam } = await searchParams;
  const currentPage = parseInt(pageParam) || 1;
  const postsPerPage = 12;
  
  // Dynamically import DB and models after connection
  const connectDB = (await import("@/lib/mongodb")).default;
  await connectDB();
  const Blog = (await import("@/models/Blog")).default;
  const Category = (await import("@/models/Category")).default;

  // Get total count for pagination
  const totalBlogs = await Blog.countDocuments({});
  const totalPages = Math.ceil(totalBlogs / postsPerPage);
  
  // Get blogs with pagination
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .populate("category")
    .skip((currentPage - 1) * postsPerPage)
    .limit(postsPerPage)
    .lean();
    
  const categories = await Category.find({}).sort({ name: 1 }).lean();

  // Convert MongoDB objects to plain JSON
  const serializedBlogs = JSON.parse(JSON.stringify(blogs));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  const featuredBlogs = serializedBlogs.filter(blog => blog.isFeatured).slice(0, 3);
  const latestBlogs = serializedBlogs;
  const popularBlogs = serializedBlogs.filter(blog => blog.isPopular).slice(0, 6);

  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";

  // JSON-LD Schema for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ezy Digital Blog",
    "description": "AI-powered digital marketing blog for business growth and SEO success",
    "url": baseUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Ezy Digital",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/thumbnail/template.png`
      },
      "url": "https://ezydigital.in",
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": serializedBlogs.slice(0, 10).map((blog, index) => ({
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
      
      <div className="homepage">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Grow Your Business with <span className="highlight">AI-Powered</span> Digital Marketing
              </h1>
              <p className="hero-description">
                Get high-quality, SEO-optimized blogs that drive traffic, generate leads, and boost your online presence. 
                Join thousands of businesses growing with Ezy Digital.
              </p>
              <div className="hero-search">
                <form action="/search" method="GET" className="search-form">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search articles, topics, or guides..."
                    className="search-input"
                    aria-label="Search blogs"
                  />
                  <button type="submit" className="search-btn" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY SECTION WITH AUTO CAROUSEL */}
        {serializedCategories.length > 0 && (
          <section className="category-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Explore Topics</h2>
                <p className="section-subtitle">Find the best content in your area of interest</p>
              </div>
              <CategoryCarousel categories={serializedCategories} />
            </div>
          </section>
        )}

        {/* FEATURED BLOGS SECTION */}
        {featuredBlogs.length > 0 && (
          <section className="featured-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Featured Articles</h2>
                <p className="section-subtitle">Hand-picked content for maximum impact</p>
              </div>
              <Suspense fallback={<LoadingSkeleton />}>
                <div className="blog-grid featured-grid">
                  {featuredBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} featured={true} />
                  ))}
                </div>
              </Suspense>
            </div>
          </section>
        )}

        {/* LATEST BLOGS SECTION WITH PAGINATION */}
        <section className="latest-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest Updates</h2>
              <p className="section-subtitle">Fresh content to keep you ahead</p>
            </div>
            <Suspense fallback={<LoadingSkeleton />}>
              <div className="blog-grid">
                {latestBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </Suspense>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <a href={`/?page=${currentPage - 1}`} className="pagination-prev">
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
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    ) {
                      return (
                        <a
                          key={i}
                          href={`/?page=${pageNum}`}
                          className={`pagination-page ${pageNum === currentPage ? 'active' : ''}`}
                        >
                          {pageNum}
                        </a>
                      );
                    }
                    // Show ellipsis for gaps
                    if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                      return <span key={i} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                {currentPage < totalPages && (
                  <a href={`/?page=${currentPage + 1}`} className="pagination-next">
                    Next
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
            
            <div className="pagination-info">
              Showing {(currentPage - 1) * postsPerPage + 1} to {Math.min(currentPage * postsPerPage, totalBlogs)} of {totalBlogs} articles
            </div>
          </div>
        </section>

        {/* POPULAR BLOGS SECTION */}
        {popularBlogs.length > 0 && (
          <section className="popular-section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">Most Popular</h2>
                <p className="section-subtitle">Reader's favorite content</p>
              </div>
              <Suspense fallback={<LoadingSkeleton />}>
                <div className="blog-grid">
                  {popularBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} popular={true} />
                  ))}
                </div>
              </Suspense>
            </div>
          </section>
        )}

        {/* NEWSLETTER SECTION */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h3>Subscribe to Our Newsletter</h3>
              <p>Get the latest digital marketing insights delivered straight to your inbox</p>
              <form className="newsletter-form" action="/api/newsletter" method="POST">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  required 
                  aria-label="Email for newsletter"
                />
                <button type="submit">Subscribe</button>
              </form>
              <p className="newsletter-note">No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}