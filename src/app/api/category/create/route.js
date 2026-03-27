import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const name = (body.name || "").trim();

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    const slug = slugify(name);
    const exists = await Category.findOne({ slug });

    if (exists) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 409 });
    }

    const category = await Category.create({ name, slug });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Unable to create category" }, { status: 500 });
  }
}