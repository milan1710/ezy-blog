import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { categorySlug, blogSlug } = await params;
    
    await connectDB();
    
    // Find category by slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Find blog by slug and category
    const blog = await Blog.findOne({ 
      slug: blogSlug,
      category: category._id 
    }).populate('category');
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      blog: {
        ...blog.toObject(),
        _id: blog._id.toString(),
        category: blog.category ? {
          ...blog.category.toObject(),
          _id: blog.category._id.toString()
        } : null,
        createdAt: blog.createdAt ? blog.createdAt.toISOString() : null,
        updatedAt: blog.updatedAt ? blog.updatedAt.toISOString() : null
      }
    });
    
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}