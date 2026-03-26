import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    // Await params in Next.js 15
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully"
    });
    
  } catch (error) {
    console.error("Blog deletion error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}