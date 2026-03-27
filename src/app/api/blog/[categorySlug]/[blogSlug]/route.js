import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// ✅ GET BLOG
export async function GET(request, { params }) {
  try {
    const { categorySlug, blogSlug } = params;

    await connectDB();

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const blog = await Blog.findOne({
      slug: blogSlug,
      category: category._id,
    }).populate("category");

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: {
        ...blog.toObject(),
        _id: blog._id.toString(),
        category: blog.category
          ? {
              ...blog.category.toObject(),
              _id: blog.category._id.toString(),
            }
          : null,
        createdAt: blog.createdAt?.toISOString(),
        updatedAt: blog.updatedAt?.toISOString(),
      },
    });

  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// ✅ DELETE BLOG
export async function DELETE(request, context) {
  try {
    // Next.js App Router: params may be a Promise, must await
    const params = context?.params ? await context.params : {};
    const { categorySlug, blogSlug } = params;

    console.log("DELETE PARAMS:", params);

    if (!categorySlug || !blogSlug) {
      return NextResponse.json(
        { success: false, error: "CategorySlug and BlogSlug required" },
        { status: 400 }
      );
    }

    await connectDB();

    // 🔍 Find category
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    // 🔥 Find and delete blog
    const blog = await Blog.findOneAndDelete({
      slug: blogSlug,
      category: category._id,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      deletedBlog: {
        _id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
      },
    });

  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}