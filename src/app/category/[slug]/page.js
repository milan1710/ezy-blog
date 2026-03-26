import BlogCard from "@/components/BlogCard/BlogCard";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { notFound } from "next/navigation";
import "./category-page.css";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  // Await the params promise
  const { slug } = await params;
  
  await dbConnect();
  const category = await Category.findOne({ slug });
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found."
    };
  }
  
  return {
    title: `${category.name} - Ezy Digital Blog`,
    description: `Explore all ${category.name} articles. Get expert insights, tips, and strategies about ${category.name} on Ezy Digital Blog.`,
    keywords: `${category.name}, ${category.name} blog, ${category.name} articles, digital marketing`,
    openGraph: {
      title: `${category.name} - Ezy Digital Blog`,
      description: `Explore all ${category.name} articles. Get expert insights and strategies.`,
      url: `${process.env.BASE_URL}/category/${slug}`,
      siteName: "Ezy Digital Blog",
      images: [
        {
          url: category.thumbnail || "/thumbnail/category.png",
          width: 1200,
          height: 630,
          alt: category.name
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Ezy Digital Blog`,
      description: `Explore all ${category.name} articles. Get expert insights and strategies.`,
      images: [category.thumbnail || "/thumbnail/category.png"],
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
      canonical: `${process.env.BASE_URL}/category/${slug}`,
    },
  };
}

// Fetch category and its blogs
async function getCategoryData(slug, page = 1, limit = 12) {
  await dbConnect();
  
  const category = await Category.findOne({ slug });
  
  if (!category) {
    return null;
  }
  
  const skip = (page - 1) * limit;
  
  const blogs = await Blog.find({ category: category._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('category', 'name slug');
  
  const totalBlogs = await Blog.countDocuments({ category: category._id });
  const totalPages = Math.ceil(totalBlogs / limit);
  
  return {
    category: JSON.parse(JSON.stringify(category)),
    blogs: JSON.parse(JSON.stringify(blogs)),
    pagination: {
      currentPage: page,
      totalPages,
      totalBlogs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

export default async function CategoryPage({ params, searchParams }) {
  // Await both params and searchParams
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam) || 1;
  
  const data = await getCategoryData(slug, page);
  
  if (!data) {
    notFound();
  }
  
  const { category, blogs, pagination } = data;
  
  // JSON-LD Schema for Category Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Ezy Digital Blog`,
    "description": `Explore all ${category.name} articles on Ezy Digital Blog`,
    "url": `${process.env.BASE_URL}/category/${slug}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Ezy Digital Blog",
      "url": process.env.BASE_URL
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${process.env.BASE_URL}/blog/${blog.slug}`,
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
                  src={category.thumbnail || "/thumbnail/category.png"} 
                  alt={category.name}
                  loading="eager"
                />
              </div>
              <div className="category-hero-info">
                <h1 className="category-hero-title">{category.name}</h1>
                <p className="category-hero-description">
                  {category.description || `Explore all ${category.name} articles. Get expert insights, tips, and strategies to grow your knowledge.`}
                </p>
                <div className="category-stats">
                  <span className="stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {pagination.totalBlogs} Articles
                  </span>
                  <span className="stat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Updated Recently
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 🔥 TOP AD */}
        <div className="ad-container ad-top">
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        
        {/* Blog Listing Section */}
        <section className="category-blogs-section">
          <div className="container">
            {blogs.length > 0 ? (
              <>
                <div className="section-header">
                  <h2 className="section-title">All {category.name} Articles</h2>
                  <p className="section-subtitle">
                    Showing {blogs.length} of {pagination.totalBlogs} articles
                  </p>
                </div>
                
                <div className="blogs-grid">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    {pagination.hasPrevPage && (
                      <a href={`/category/${slug}?page=${pagination.currentPage - 1}`} className="pagination-prev">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Previous
                      </a>
                    )}
                    
                    <div className="pagination-pages">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === pagination.currentPage;
                        return (
                          <a
                            key={i}
                            href={`/category/${slug}?page=${pageNum}`}
                            className={`pagination-page ${isActive ? 'active' : ''}`}
                          >
                            {pageNum}
                          </a>
                        );
                      })}
                    </div>
                    
                    {pagination.hasNextPage && (
                      <a href={`/category/${slug}?page=${pagination.currentPage + 1}`} className="pagination-next">
                        Next
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="no-blogs">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#dc2626" strokeWidth="1.5"/>
                  <path d="M22 6L12 13L2 6" stroke="#dc2626" strokeWidth="1.5"/>
                </svg>
                <h3>No Articles Yet</h3>
                <p>Check back soon for new {category.name} articles!</p>
                <a href="/" className="btn-primary">Browse Other Categories</a>
              </div>
            )}
          </div>
        </section>
        
        {/* 🔥 BOTTOM AD */}
        <div className="ad-container ad-bottom">
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>
    </>
  );
}