import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Blog from "@/models/Blog";
import { Suspense } from "react";
import "./categories.css";

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="skeleton-card"></div>
      ))}
    </div>
  );
}

async function getAllCategories() {
  await connectDB();
  
  // Get all categories
  const categories = await Category.find({})
    .sort({ name: 1 })
    .lean();
  
  // Convert to plain JSON
  const serializedCategories = JSON.parse(JSON.stringify(categories));
  
  // Get blog count for each category
  const categoriesWithCount = await Promise.all(
    serializedCategories.map(async (category) => {
      const blogCount = await Blog.countDocuments({ category: category._id });
      return {
        ...category,
        blogCount
      };
    })
  );
  
  return categoriesWithCount;
}

// Generate metadata for SEO
export async function generateMetadata() {
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";
  
  return {
    title: "All Categories - Ezy Digital Blog | Explore Digital Marketing Topics",
    description: "Explore all categories on Ezy Digital Blog. Find expert articles on SEO, Social Media, Content Marketing, Google Algorithm, and more digital marketing topics.",
    keywords: "digital marketing categories, SEO, social media marketing, content marketing, Google algorithm, blog categories",
    authors: [{ name: "Ezy Digital" }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "All Categories - Ezy Digital Blog",
      description: "Explore all digital marketing categories and find expert articles on SEO, Social Media, Content Marketing, and more.",
      url: `${baseUrl}/categories`,
      siteName: "Ezy Digital Blog",
      images: [
        {
          url: "/thumbnail/category.png",
          width: 1200,
          height: 630,
          alt: "Ezy Digital Blog Categories"
        }
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Categories - Ezy Digital Blog",
      description: "Explore all digital marketing categories and find expert articles.",
      images: ["/thumbnail/category.png"],
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
      canonical: `${baseUrl}/categories`,
    },
  };
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";

  // JSON-LD Schema for Categories Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Categories - Ezy Digital Blog",
    "description": "Explore all digital marketing categories and find expert articles",
    "url": `${baseUrl}/categories`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Ezy Digital Blog",
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": category.name,
        "url": `${baseUrl}/category/${category.slug}`,
        "description": `Explore ${category.name} articles on Ezy Digital Blog`
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
      
      <div className="categories-page">
        {/* Hero Section */}
        <section className="categories-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Explore All Categories</h1>
              <p className="hero-description">
                Discover expert insights and strategies across all digital marketing topics
              </p>
              <div className="hero-stats">
                <span className="stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {categories.length} Categories
                </span>
                <span className="stat">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Updated Daily
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid Section */}
        <section className="categories-grid-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Browse by Topic</h2>
              <p className="section-subtitle">Find the perfect category for your learning needs</p>
            </div>
            
            {categories.length > 0 ? (
              <Suspense fallback={<LoadingSkeleton />}>
                <div className="categories-grid">
                  {categories.map((category) => (
                    <Link 
                      href={`/category/${category.slug}`} 
                      key={category._id} 
                      className="category-card-link"
                    >
                      <div className="category-card">
                        <div className="category-card-image">
                          <img 
                            src={category.thumbnail || "/thumbnail/category.png"} 
                            alt={category.name}
                            loading="lazy"
                            width="400"
                            height="300"
                          />
                          <div className="category-card-overlay">
                            <div className="category-card-content">
                              <h3 className="category-card-title">{category.name}</h3>
                              <p className="category-card-count">
                                {category.blogCount} {category.blogCount === 1 ? 'Article' : 'Articles'}
                              </p>
                              <div className="category-card-explore">
                                <span>Explore</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Suspense>
            ) : (
              <div className="no-categories">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#dc2626" strokeWidth="1.5"/>
                  <path d="M22 6L12 13L2 6" stroke="#dc2626" strokeWidth="1.5"/>
                </svg>
                <h3>No Categories Found</h3>
                <p>Check back soon for new categories!</p>
                <a href="/" className="btn-primary">Go to Homepage</a>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
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