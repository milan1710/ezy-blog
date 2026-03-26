import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, thumbnail } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }
    
    // Generate slug from name
    let slug = slugify(name);
    
    // Check if slug exists and make it unique
    let existingCategory = await Category.findOne({ slug });
    let counter = 1;
    while (existingCategory) {
      slug = `${slugify(name)}-${counter}`;
      existingCategory = await Category.findOne({ slug });
      counter++;
    }
    
    const category = await Category.create({
      name,
      slug,
      thumbnail: thumbnail || "/thumbnail/category.png"
    });
    
    return NextResponse.json({
      success: true,
      category: {
        ...category.toObject(),
        _id: category._id.toString()
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error("Category creation error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}