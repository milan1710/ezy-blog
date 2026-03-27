import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().lean();

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to get categories" },
      { status: 500 }
    );
  }
}

