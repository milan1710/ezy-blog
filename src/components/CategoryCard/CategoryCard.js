import Link from "next/link";
import "./category.css";

export default function CategoryCard({ category, blogCount = 0 }) {
  // Generate slug if not present
  const categorySlug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  // Generate category URL - this will show all blogs in this category
  const categoryUrl = `/category/${categorySlug}`;

  return (
    <Link href={categoryUrl} className="category-card-link">
      <article className="category-card">
        {/* Background Image with Lazy Loading */}
        <div className="category-card-image">
          <img 
            src={category.thumbnail || "/thumbnail/category.png"} 
            alt={category.name}
            loading="lazy"
            width="400"
            height="300"
          />
        </div>

        {/* Overlay with Category Info */}
        <div className="category-overlay">
          <div className="category-content">
            <h2 className="category-name">{category.name}</h2>
            
            {/* Show blog count if available */}
            {blogCount > 0 && (
              <span className="category-count">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {blogCount} Articles
              </span>
            )}
            
            {/* Explore Button - Now links to category page */}
            <div className="explore-btn">
              <span>Explore {category.name}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}