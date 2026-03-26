import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { generateBlog } from "@/lib/ai";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { topic, categoryId } = await request.json();
    
    // Validate input
    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }
    
    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Get category
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Generate blog content using AI
    let content;
    try {
      content = await generateBlog(topic, category.name);
    } catch (aiError) {
      console.error("AI generation error:", aiError);
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 500 }
      );
    }
    
    // Generate slug
    let slug = slugify(topic);
    let existingBlog = await Blog.findOne({ slug });
    let counter = 1;
    while (existingBlog) {
      slug = `${slugify(topic)}-${counter}`;
      existingBlog = await Blog.findOne({ slug });
      counter++;
    }
    
    // Create blog
    const blog = await Blog.create({
      title: topic,
      content: content,
      slug: slug,
      category: categoryId,
      thumbnail: "/thumbnail/template.png",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Populate category
    const populatedBlog = await Blog.findById(blog._id).populate('category');
    
    return NextResponse.json({
      success: true,
      blog: {
        _id: populatedBlog._id.toString(),
        title: populatedBlog.title,
        content: populatedBlog.content,
        slug: populatedBlog.slug,
        category: {
          _id: populatedBlog.category._id.toString(),
          name: populatedBlog.category.name,
          slug: populatedBlog.category.slug
        },
        thumbnail: populatedBlog.thumbnail,
        createdAt: populatedBlog.createdAt,
        updatedAt: populatedBlog.updatedAt
      },
      url: `/blog/${category.slug}/${slug}`
    }, { status: 201 });
    
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate blog" },
      { status: 500 }
    );
  }
}