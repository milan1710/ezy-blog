"use client";

import { useEffect, useState } from "react";
import "../../styles/admin.css";

export default function AdminPage() {
  const [topic, setTopic] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // 🔥 Fetch blogs
  const fetchBlogs = async () => {
    const res = await fetch("/api/blog/all");
    const data = await res.json();
    if (data.success) setBlogs(data.blogs);
  };

  // 🔥 Fetch categories
  const fetchCategories = async () => {
    const res = await fetch("/api/category/all");
    const data = await res.json();
    if (data.success) setCategories(data.categories);
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // 🔥 Add new category
  const addCategory = async () => {
    if (!newCategory) return alert("Enter category name");

    const res = await fetch("/api/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategory }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Category Added ✅");
      setNewCategory("");
      fetchCategories();
    } else {
      alert(data.error);
    }
  };

  // 🔥 Generate blog
  const generateBlog = async () => {
    if (!topic || !categoryId)
      return alert("Enter topic and select category");

    setLoading(true);

    const res = await fetch("/api/blog/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        categoryId,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      alert("Blog Generated ✅");
      setTopic("");
      setCategoryId("");
      fetchBlogs();
    } else {
      alert(data.error);
    }
  };

  // 🔥 Delete blog
  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`/api/blog/delete/${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      {/* 🔥 Generate Section */}
      <div className="generate-box">

        {/* Topic Input */}
        <input
          type="text"
          placeholder="Enter blog topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* Category Select */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Generate Button */}
        <button onClick={generateBlog} disabled={loading}>
          {loading ? "Generating..." : "Generate Blog"}
        </button>
      </div>

      {/* 🔥 Add Category */}
      <div className="generate-box">
        <input
          type="text"
          placeholder="New category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>

      {/* 🔥 Blog List */}
      <div className="blog-list">
        <h2>All Blogs</h2>

        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <div>
              <strong>{blog.title}</strong>
              <p style={{ fontSize: "12px", color: "red" }}>
                {blog.category?.name}
              </p>
            </div>

            <button onClick={() => deleteBlog(blog._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}