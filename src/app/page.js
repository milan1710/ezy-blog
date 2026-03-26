import BlogCard from "@/components/BlogCard/BlogCard";
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import { Suspense } from "react";
import "./homepage.css";

async function getBlogs() {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/all?limit=12`, { cache: "no-store" });
    if (!res.ok) return { blogs: [] };
    const data = await res.json();
    return { blogs: data.blogs || [] };
  } catch (error) {
    return { blogs: [] };
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/category/all`, { cache: "no-store" });
    if (!res.ok) return { categories: [] };
    const data = await res.json();
    return { categories: data.categories || [] };
  } catch (error) {
    return { categories: [] };
  }
}

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Ezy Digital Blog - AI Powered SEO Blogs for Business Growth",
    description: "Discover expert insights, digital marketing tips, and business growth strategies."
  };
}

export default async function Home() {
  const blogData = await getBlogs();
  const blogs = blogData.blogs || [];
  const categoryData = await getCategories();
  const categories = categoryData.categories || [];

  const featuredBlogs = blogs.filter(blog => blog.isFeatured === true).slice(0, 3);
  const latestBlogs = blogs.slice(0, 6);
  const popularBlogs = blogs.filter(blog => blog.isPopular === true).slice(0, 6);

  return (
    <div className="homepage">
      <div className="ad-container ad-top">AdSense Top</div>

      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Grow Your Business with <span className="highlight">AI-Powered</span> Digital Marketing</h1>
            <p className="hero-description">Get high-quality, SEO-optimized blogs that drive traffic and boost your online presence.</p>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="category-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Explore Topics</h2>
              <p className="section-subtitle">Find the best content in your area of interest</p>
            </div>
            <CategoryCarousel categories={categories} />
          </div>
        </section>
      )}

      {featuredBlogs.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Articles</h2>
            </div>
            <Suspense fallback={<LoadingSkeleton />}>
              <div className="blog-grid featured-grid">
                {featuredBlogs.map(blog => <BlogCard key={blog._id} blog={blog} featured={true} />)}
              </div>
            </Suspense>
          </div>
        </section>
      )}

      <div className="ad-container ad-middle">AdSense Middle</div>

      {latestBlogs.length > 0 && (
        <section className="latest-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest Updates</h2>
            </div>
            <div className="blog-grid">
              {latestBlogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          </div>
        </section>
      )}

      <div className="ad-container ad-bottom">AdSense Bottom</div>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest digital marketing insights delivered straight to your inbox</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}