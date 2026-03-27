import BlogCard from "@/components/BlogCard/BlogCard";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { notFound } from "next/navigation";
import "./category-page.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();

  const category = await Category.findOne({ slug });
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} - Ezy Digital Blog`,
    description: `Explore all ${category.name} articles. Get expert insights, tips, and strategies about ${category.name} on Ezy Digital Blog.`,
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
          alt: category.name,
        },
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
  };
}

async function getCategoryData(slug, page = 1, limit = 12) {
  await dbConnect();

  const category = await Category.findOne({ slug }).lean();
  if (!category) {
    return null;
  }

  const skip = (page - 1) * limit;
  const blogs = await Blog.find({ category: category._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("category", "name slug")
    .lean();

  const totalBlogs = await Blog.countDocuments({ category: category._id });
  const totalPages = Math.ceil(totalBlogs / limit);

  return {
    category,
    blogs,
    pagination: {
      currentPage: page,
      totalPages,
      totalBlogs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { page: pageParam } = searchParams || {};
  const page = parseInt(pageParam, 10) || 1;

  const data = await getCategoryData(slug, page);

  if (!data) {
    notFound();
  }

  const { category, blogs, pagination } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Ezy Digital Blog`,
    "description": `Explore all ${category.name} articles on Ezy Digital Blog`,
    "url": `${process.env.BASE_URL}/category/${slug}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Ezy Digital Blog",
      "url": process.env.BASE_URL,
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${process.env.BASE_URL}/blog/${blog.category?.slug}/${blog.slug}`,
        "name": blog.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="category-page">
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
              </div>
            </div>
          </div>
        </section>
        <section className="category-blogs-section">
          <div className="container">
            {blogs.length > 0 ? (
              <>
                <div className="blogs-grid">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    {pagination.hasPrevPage && (
                      <a href={`/category/${slug}?page=${pagination.currentPage - 1}`} className="pagination-prev">Previous</a>
                    )}
                    <div className="pagination-pages">
                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNum === pagination.currentPage;
                        return (
                          <a key={i} href={`/category/${slug}?page=${pageNum}`} className={`pagination-page ${isActive ? "active" : ""}`}>
                            {pageNum}
                          </a>
                        );
                      })}
                    </div>
                    {pagination.hasNextPage && (
                      <a href={`/category/${slug}?page=${pagination.currentPage + 1}`} className="pagination-next">Next</a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="no-blogs">
                <h3>No Articles Yet</h3>
                <p>Check back soon for new {category.name} articles!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
