import Thumbnail from "../Thumbnail/Thumbnail";
import "./blogcard.css";
import Link from "next/link";

export default function BlogCard({ blog, featured = false, popular = false }) {
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Strip HTML tags and get plain text preview
  const getPlainTextPreview = (htmlContent, maxLength = 120) => {
    if (!htmlContent) return "";
    const plainText = htmlContent.replace(/<[^>]+>/g, "").trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + "..." 
      : plainText;
  };

  // Calculate read time (average 200 words per minute)
  const getReadTime = (htmlContent) => {
    if (!htmlContent) return "2 min read";
    const plainText = htmlContent.replace(/<[^>]+>/g, "");
    const wordCount = plainText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return `${readTime} min read`;
  };

  const previewText = getPlainTextPreview(blog.content, 120);
  const readTime = getReadTime(blog.content);
  const blogDate = formatDate(blog.createdAt);

  return (
    <article className={`blog-card ${featured ? "featured-card" : ""} ${popular ? "popular-card" : ""}`}>
      <Link href={`/blog/${blog.category?.slug}/${blog.slug}`}>
        {/* Thumbnail Section */}
        <div className="blog-card-thumbnail">
          <Thumbnail title={blog.title} />
          {featured && (
            <span className="featured-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Featured
            </span>
          )}
          {popular && !featured && (
            <span className="popular-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Popular
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="blog-card-content">
          {/* Category Tag */}
          {blog.category && (
            <div className="blog-category">
              <span className="category-tag">
                {blog.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="blog-title">{blog.title}</h3>

          {/* Meta Info */}
          <div className="blog-meta">
            {blogDate && (
              <span className="meta-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 2V6M16 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {blogDate}
              </span>
            )}
            <span className="meta-readtime">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {readTime}
            </span>
          </div>

          {/* Description */}
          <p className="blog-description">
            {previewText}
          </p>

          {/* Read More Link */}
          <div className="read-more">
            <span>Read Article</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}