import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    
    const { title, content, categoryId, thumbnail } = await request.json();
    
    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { error: "Title, content, and category are required" },
        { status: 400 }
      );
    }
    
    // Get category to get its slug
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Generate slug from title
    let slug = slugify(title);
    
    // Check if slug exists and make it unique
    let existingBlog = await Blog.findOne({ slug });
    let counter = 1;
    while (existingBlog) {
      slug = `${slugify(title)}-${counter}`;
      existingBlog = await Blog.findOne({ slug });
      counter++;
    }
    
    // Create blog
    const blog = await Blog.create({
      title,
      content,
      slug,
      category: categoryId,
      thumbnail: thumbnail || "/thumbnail/template.png",
    });
    
    // Populate category for response
    const populatedBlog = await Blog.findById(blog._id).populate('category');
    
    return NextResponse.json({
      success: true,
      blog: {
        ...populatedBlog.toObject(),
        _id: populatedBlog._id.toString(),
        category: populatedBlog.category ? {
          ...populatedBlog.category.toObject(),
          _id: populatedBlog.category._id.toString()
        } : null
      },
      url: `/blog/${category.slug}/${slug}`
    }, { status: 201 });
    
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}