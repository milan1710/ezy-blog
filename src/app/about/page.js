import Link from "next/link";
import "./about.css";

export const metadata = {
  title: "About Ezy Digital - AI Powered Digital Marketing Agency & Blog",
  description: "Learn about Ezy Digital, a digital marketing agency dedicated to helping businesses grow through AI-powered content, SEO strategies, and expert insights. Founded by Milan Kansara.",
  keywords: "digital marketing agency, Ezy Digital, Milan Kansara, SEO agency, content marketing, AI blog, digital marketing education",
  openGraph: {
    title: "About Ezy Digital - Digital Marketing Agency & Blog",
    description: "Learn about Ezy Digital, your trusted partner for digital marketing education and AI-powered content. We help businesses grow online.",
    url: "https://blog.ezydigital.in/about",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "About Ezy Digital - Digital Marketing Agency"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ezy Digital - Digital Marketing Agency",
    description: "Learn about Ezy Digital, your trusted partner for digital marketing education.",
    images: ["/thumbnail/template.png"],
    creator: "@ezydigital",
  },
  alternates: {
    canonical: "https://blog.ezydigital.in/about",
  },
};

export default function AboutPage() {
  const founder = {
    name: "Milan Kansara",
    phone: "+91 9512648085",
    email: "kansaramilan1710@gmail.com",
    address: "212, 3rd Floor, Nilkamal Complex, Adarsh Street, Upleta - 360490",
    role: "Founder & Digital Marketing Expert",
    experience: "5+ Years in Digital Marketing",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Ezy Digital",
    "description": "Ezy Digital is a digital marketing agency dedicated to helping businesses grow through AI-powered content and expert insights.",
    "url": "https://blog.ezydigital.in/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Ezy Digital",
      "url": "https://blog.ezydigital.in",
      "logo": "https://blog.ezydigital.in/thumbnail/template.png",
      "founder": {
        "@type": "Person",
        "name": "Milan Kansara",
        "email": "kansaramilan1710@gmail.com",
        "telephone": "+919512648085",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "212, 3rd Floor, Nilkamal Complex, Adarsh Street",
          "addressLocality": "Upleta",
          "postalCode": "360490",
          "addressCountry": "IN"
        }
      },
      "sameAs": [
        "https://twitter.com/ezydigital",
        "https://www.linkedin.com/company/ezydigital"
      ]
    }
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <div className="about-hero-content">
              <h1 className="about-hero-title">About <span className="highlight">Ezy Digital</span></h1>
              <p className="about-hero-description">
                Your trusted partner for digital marketing education and AI-powered content
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-text">
                <h2 className="section-title">Our Mission</h2>
                <p>
                  At Ezy Digital, we believe that everyone deserves to understand and leverage 
                  the power of digital marketing. Our mission is to simplify complex digital 
                  marketing concepts and provide actionable insights that help businesses grow.
                </p>
                <p>
                  Whether you're a beginner just starting your digital marketing journey or an 
                  experienced professional looking to stay updated with the latest trends, 
                  we're here to guide you every step of the way.
                </p>
              </div>
              <div className="mission-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#dc2626" stroke="#dc2626" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What We Do</h2>
              <p className="section-subtitle">Empowering businesses through education and AI-powered content</p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3>AI-Powered Blog Content</h3>
                <p>High-quality, SEO-optimized blogs that drive traffic and engage readers.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M21 16V20H3V16M16 8L12 4L8 8M12 4V16" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3>Digital Marketing Education</h3>
                <p>Learn SEO, social media, content marketing, and more from industry experts.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2V4M12 20V22M4 12H2M6.5 6.5L5 5M17.5 6.5L19 5M6.5 17.5L5 19M17.5 17.5L19 19M22 12H20" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3>SEO Strategies</h3>
                <p>Proven SEO techniques to improve your website ranking and visibility.</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3>Latest Trends & Updates</h3>
                <p>Stay ahead with the latest digital marketing trends and algorithm updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Help Section */}
        <section className="audience-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Who We Help</h2>
              <p className="section-subtitle">We're here for everyone passionate about digital marketing</p>
            </div>
            <div className="audience-grid">
              <div className="audience-card">
                <h3>🎯 Beginners</h3>
                <p>Just starting your digital marketing journey? We'll help you build a strong foundation with easy-to-understand guides and tutorials.</p>
              </div>
              <div className="audience-card">
                <h3>📈 Professionals</h3>
                <p>Experienced marketers looking to stay updated with the latest trends, strategies, and industry insights.</p>
              </div>
              <div className="audience-card">
                <h3>🏢 Business Owners</h3>
                <p>Grow your business online with our actionable tips, SEO strategies, and content marketing guides.</p>
              </div>
              <div className="audience-card">
                <h3>💡 Students</h3>
                <p>Learn digital marketing from industry experts and prepare for a successful career in the field.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="founder-section">
          <div className="container">
            <div className="founder-content">
              <div className="founder-info">
                <h2 className="section-title">Meet Our Founder</h2>
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-experience">{founder.experience}</p>
                <div className="founder-contact">
                  <div className="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.352 21.4019C21.1467 21.5901 20.904 21.7335 20.6397 21.8227C20.3754 21.9119 20.095 21.9451 19.818 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77396 17.3147 6.72533 15.2661 5.19 12.85C3.49959 10.2411 2.44859 7.27114 2.12 4.182C2.09498 3.905 2.12818 3.62465 2.2174 3.36032C2.30661 3.096 2.44997 2.85334 2.63821 2.64805C2.82645 2.44276 3.05556 2.27915 3.31071 2.16754C3.56587 2.05594 3.8416 1.99895 4.12 2H7.12C7.67021 1.99419 8.20455 2.172 8.64049 2.49861C9.07643 2.82523 9.38745 3.28082 9.52 3.8C9.71754 4.6737 9.94384 5.54056 10.2 6.4C10.3282 6.85984 10.3342 7.3442 10.2175 7.80696C10.1008 8.26973 9.86578 8.69446 9.54 9.03L8.14 10.43C9.77479 13.3546 12.0554 15.6352 14.98 17.27L16.38 15.87C16.7155 15.5442 17.1403 15.3092 17.603 15.1925C18.0658 15.0758 18.5502 15.0818 19.01 15.21C19.8694 15.4662 20.7363 15.6925 21.61 15.89C22.1325 16.0233 22.5892 16.337 22.9151 16.7749C23.241 17.2127 23.4168 17.7484 23.41 18.3V21.3C23.4101 21.3115 23.4101 21.3229 23.41 21.3344" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>{founder.phone}</span>
                  </div>
                  <div className="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>{founder.email}</span>
                  </div>
                  <div className="contact-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <span>{founder.address}</span>
                  </div>
                </div>
              </div>
              <div className="founder-quote">
                <div className="quote-icon">"</div>
                <p className="quote-text">
                  My vision is to make digital marketing accessible to everyone. 
                  Through Ezy Digital, I want to empower beginners and professionals 
                  alike with the knowledge and tools they need to succeed in the 
                  digital world.
                </p>
                <p className="quote-author">- Milan Kansara</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Start Your Digital Marketing Journey?</h2>
              <p className="cta-description">
                Explore our blogs, learn from experts, and take your digital presence to the next level.
              </p>
              <div className="cta-buttons">
                <Link href="/blog" className="btn-primary">Explore Blogs</Link>
                <Link href="/contact" className="btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}