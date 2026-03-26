import BlogCard from "@/components/BlogCard/BlogCard";
import "./blog-listing.css";

async function getBlogs(page = 1, limit = 12) {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/all?page=${page}&limit=${limit}`, {
      cache: "no-store"
    });
    
    if (!res.ok) return { blogs: [], totalPages: 0, totalBlogs: 0 };
    return res.json();
  } catch (error) {
    console.error("Blog fetch error:", error);
    return { blogs: [], totalPages: 0, totalBlogs: 0 };
  }
}

export async function generateMetadata() {
  return {
    title: "All Blogs - Ezy Digital | Latest Digital Marketing Insights",
    description: "Explore our collection of expert-written blogs on digital marketing, SEO, and business growth."
  };
}

export default async function BlogPage({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam) || 1;
  const data = await getBlogs(page);
  const blogs = data.blogs || [];
  const totalPages = data.totalPages || 0;
  const currentPage = data.currentPage || page;

  return (
    <div className="blog-listing-page">
      <section className="listing-hero">
        <div className="container">
          <h1 className="hero-title">All Blogs</h1>
          <p className="hero-description">Discover expert insights and strategies to grow your digital presence</p>
        </div>
      </section>

      <div className="container">
        {blogs.length > 0 ? (
          <>
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {currentPage > 1 && (
                  <a href={`/blog?page=${currentPage - 1}`} className="pagination-prev">Previous</a>
                )}
                <div className="pagination-pages">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <a key={i} href={`/blog?page=${pageNum}`} className={`pagination-page ${pageNum === currentPage ? 'active' : ''}`}>
                        {pageNum}
                      </a>
                    );
                  })}
                </div>
                {currentPage < totalPages && (
                  <a href={`/blog?page=${currentPage + 1}`} className="pagination-next">Next</a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="no-blogs">
            <h3>No Blogs Found</h3>
            <p>Check back soon for new articles!</p>
          </div>
        )}
      </div>
    </div>
  );
}