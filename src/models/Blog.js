import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  thumbnail: {
    type: String,
    default: "/thumbnail/template.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default (mongoose.models.Blog || mongoose.model("Blog", BlogSchema));