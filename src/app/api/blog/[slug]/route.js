import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    return Response.json({ success: true, blog });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}