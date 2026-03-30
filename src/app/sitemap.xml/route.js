import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";

// ✅ IMPORTANT (cache + stability fix)
export const revalidate = 86400; // 1 day cache
export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://blog.ezydigital.in";
  const currentDate = new Date().toISOString();

  let blogUrls = "";
  let categoryUrls = "";

  try {
    await connectDB();

    // ✅ BLOGS (populate working version)
    const blogs = await Blog.find()
      .select("slug category updatedAt createdAt")
      .populate("category", "slug")
      .lean();

    blogUrls = blogs
      .filter((blog) => blog?.slug && blog?.category?.slug)
      .map((blog) => {
        return `
        <url>
          <loc>${baseUrl}/blog/${blog.category.slug}/${blog.slug}</loc>
          <lastmod>${new Date(
            blog.updatedAt || blog.createdAt || currentDate
          ).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");

    // ✅ CATEGORIES
    const categories = await Category.find()
      .select("slug updatedAt createdAt")
      .lean();

    categoryUrls = categories
      .filter((cat) => cat?.slug)
      .map((category) => {
        return `
        <url>
          <loc>${baseUrl}/category/${category.slug}</loc>
          <lastmod>${new Date(
            category.updatedAt || category.createdAt || currentDate
          ).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`;
      })
      .join("");

  } catch (error) {
    console.error("Sitemap Error:", error);
  }

  // ✅ STATIC PAGES
  const staticUrls = `
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>${baseUrl}/blog</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>

    <url>
      <loc>${baseUrl}/categories</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>

    <url>
      <loc>${baseUrl}/about</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>

    <url>
      <loc>${baseUrl}/contact</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `;

  // ✅ FINAL XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${categoryUrls}
    ${blogUrls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=86400", // ✅ FIX
    },
  });
}