import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  
  await connectDB();
  
  // Get all blogs with their categories
  const blogs = await Blog.find().populate('category').lean();
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.category?.slug}/${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  
  // Get all categories
  const categories = await Category.find().lean();
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryUrls,
    ...blogUrls,
  ];
}