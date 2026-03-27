import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: "/thumbnail/category.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default (mongoose.models.Category || mongoose.model("Category", CategorySchema));