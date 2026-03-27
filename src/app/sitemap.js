import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL || "https://blog.ezydigital.in";
  const currentDate = new Date();
  
  await connectDB();
  
  // Get all blogs with their categories
  const blogs = await Blog.find().populate('category').lean();
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt || currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  
  // Get all categories
  const categories = await Category.find().lean();
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.updatedAt || category.createdAt || currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  
  // Static pages with their priorities and frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
  
  return [
    ...staticPages,
    ...categoryUrls,
    ...blogUrls,
  ];
}