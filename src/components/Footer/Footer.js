import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms-of-service", label: "Terms" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="logo-text">Ezy<span className="logo-highlight">Digital</span></span>
              <span className="logo-blog">Blog</span>
            </Link>
            <p className="footer-description">
              AI-powered digital marketing insights for business growth. Get expert blogs on SEO, 
              social media, content marketing, and more.
            </p>
            <div className="footer-social">
              <a 
                href="https://twitter.com/ezydigital" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Twitter"
                className="social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/ezydigital" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on LinkedIn"
                className="social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                </svg>
              </a>
              <a 
                href="https://ezydigital.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit main website"
                className="social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links-list">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Resources</h3>
            <ul className="footer-links-list">
              {footerLinks.slice(4, 7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/sitemap.xml" className="footer-link">Sitemap</a>
              </li>
              <li>
                <a href="/feed.xml" className="footer-link">RSS Feed</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Stay Updated</h3>
            <p className="footer-newsletter-text">
              Get the latest digital marketing insights delivered to your inbox.
            </p>
            <form className="footer-newsletter-form" action="/api/newsletter" method="POST">
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                required 
                aria-label="Email for newsletter"
                className="footer-newsletter-input"
              />
              <button type="submit" className="footer-newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="footer-newsletter-note">No spam, unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Ezy Digital Blog. All rights reserved.
          </p>
          <p className="footer-credit">
            Powered by <a href="https://ezydigital.in" target="_blank" rel="noopener noreferrer">Ezy Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
}