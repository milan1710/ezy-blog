import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 }).lean();
    
    const serializedCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString(),
      createdAt: cat.createdAt?.toISOString()
    }));
    
    return NextResponse.json({ success: true, categories: serializedCategories });
  } catch (error) {
    return NextResponse.json({ error: error.message, categories: [] }, { status: 500 });
  }
}