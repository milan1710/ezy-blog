import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find()
      .populate('category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);
    
    const serializedBlogs = blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      category: blog.category ? {
        ...blog.category,
        _id: blog.category._id.toString()
      } : null,
      createdAt: blog.createdAt?.toISOString(),
      updatedAt: blog.updatedAt?.toISOString()
    }));
    
    return NextResponse.json({
      success: true,
      blogs: serializedBlogs,
      totalPages,
      currentPage: page,
      totalBlogs
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message, blogs: [], totalPages: 0 }, { status: 500 });
  }
}