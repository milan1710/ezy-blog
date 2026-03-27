"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home", title: "Ezy Digital Blog - Home" },
    { href: "/categories", label: "Categories", title: "Browse All Categories - Ezy Digital Blog" },
    { href: "/blog", label: "Blog", title: "All Blogs - Ezy Digital Blog" },
    { href: "/about", label: "About", title: "About Ezy Digital - Digital Marketing Agency" },
    { href: "/contact", label: "Contact", title: "Contact Ezy Digital - Get in Touch" },
    { href: "/privacy-policy", label: "Privacy", title: "Privacy Policy - Ezy Digital Blog" },
    { href: "/terms-of-service", label: "Terms", title: "Terms of Service - Ezy Digital Blog" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <span className="logo-text">Ezy<span className="logo-highlight">Digital</span></span>
            <span className="logo-blog">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                title={link.title}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}></div>
      
      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-logo" onClick={() => setIsOpen(false)}>
            <span className="logo-text">Ezy<span className="logo-highlight">Digital</span></span>
            <span className="logo-blog">Blog</span>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${isActive(link.href) ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
              title={link.title}
            >
              <span className="mobile-link-text">{link.label}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <p>© {new Date().getFullYear()} Ezy Digital Blog</p>
          <div className="mobile-social-links">
            <a href="https://twitter.com/ezydigital" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/ezydigital" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}