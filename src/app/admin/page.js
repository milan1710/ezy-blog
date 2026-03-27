"use client";

import { useEffect, useState } from "react";
import "./admin.css";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [topic, setTopic] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Login credentials
  const VALID_EMAIL = "kansaramilan1710@gmail.com";
  const VALID_PASSWORD = "Milan@76137";

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === VALID_EMAIL && loginPassword === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
      // Store login state in session storage
      sessionStorage.setItem("adminAuthenticated", "true");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
  };

  // Check for existing session on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuthenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch blogs and categories when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
      fetchCategories();
    }
  }, [isAuthenticated]);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog/all");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category/all");
      const data = await res.json();
      if (data.success) setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add new category
  const addCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      const res = await fetch("/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Category Added Successfully ✅");
        setNewCategory("");
        fetchCategories();
      } else {
        alert(data.error || "Failed to add category");
      }
    } catch (error) {
      alert("Error adding category");
    }
  };

  // Generate blog
  const generateBlog = async () => {
    if (!topic.trim()) {
      alert("Please enter blog topic");
      return;
    }
    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), categoryId }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Blog Generated Successfully ✅");
        setTopic("");
        setCategoryId("");
        fetchBlogs();
      } else {
        alert(data.error || "Failed to generate blog");
      }
    } catch (error) {
      alert("Error generating blog");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (categorySlug, blogSlug, title) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch(
        `/api/blog/${categorySlug}/${blogSlug}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        alert("Deleted Successfully 🗑️");

        setBlogs((prev) =>
          prev.filter((b) => b.slug !== blogSlug)
        );

      } else {
        alert(data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Error deleting blog");
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="admin@ezydigital.in"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="login-footer">
            <p>Contact admin if you don't have access</p>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel content
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Generate Blog Section */}
        <div className="card generate-card">
          <h2>Generate New Blog</h2>
          <div className="form-group">
            <label>Blog Topic</label>
            <input
              type="text"
              placeholder="e.g., Google Algorithm Update 2026"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={generateBlog} disabled={loading} className="generate-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              "Generate Blog"
            )}
          </button>
        </div>

        {/* Add Category Section */}
        <div className="card category-card">
          <h2>Add New Category</h2>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              placeholder="e.g., SEO, Social Media, Content Marketing"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCategory()}
            />
          </div>
          <button onClick={addCategory} className="add-category-btn">
            Add Category
          </button>
          <div className="existing-categories">
            <h3>Existing Categories ({categories.length})</h3>
            <div className="category-tags">
              {categories.map((cat) => (
                <span key={cat._id} className="category-tag">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Blog List Section */}
        <div className="card blog-list-card">
          <h2>All Blogs ({blogs.length})</h2>
          {blogs.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#dc2626" strokeWidth="1.5"/>
                <path d="M22 6L12 13L2 6" stroke="#dc2626" strokeWidth="1.5"/>
              </svg>
              <p>No blogs yet. Generate your first blog above!</p>
            </div>
          ) : (
            <div className="blog-list">
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-item">
                  <div className="blog-info">
                    <div className="blog-title">{blog.title}</div>
                    <div className="blog-meta">
                      <span className="blog-category">{blog.category?.name || "Uncategorized"}</span>
                      <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                  <button onClick={() => {
                    console.log('DELETE CALL:', blog.category?.slug, blog.slug, blog.title);
                    console.log('DELETE FETCH URL:', `/api/blog/${blog.category?.slug}/${blog.slug}`);
                    deleteBlog(blog.category?.slug, blog.slug, blog.title);
                  }} className="delete-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}