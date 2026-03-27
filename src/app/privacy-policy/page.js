import Link from "next/link";
import "./privacy-policy.css";

export const metadata = {
  title: "Privacy Policy - Ezy Digital Blog",
  description: "Read our privacy policy to understand how Ezy Digital collects, uses, and protects your personal information. We are committed to safeguarding your privacy.",
  keywords: "privacy policy, data protection, personal information, GDPR compliance, privacy practices",
  openGraph: {
    title: "Privacy Policy - Ezy Digital Blog",
    description: "Learn how Ezy Digital protects your personal information and respects your privacy.",
    url: "https://blog.ezydigital.in/privacy-policy",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Ezy Digital Blog"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Ezy Digital Blog",
    description: "Learn how Ezy Digital protects your personal information and respects your privacy.",
    images: ["/thumbnail/template.png"],
    creator: "@ezydigital",
  },
  alternates: {
    canonical: "https://blog.ezydigital.in/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 27, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Ezy Digital Blog",
    "description": "Privacy policy for Ezy Digital Blog explaining how we collect, use, and protect your personal information.",
    "url": "https://blog.ezydigital.in/privacy-policy",
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": "Ezy Digital Blog Privacy Policy",
      "datePublished": "2026-03-27",
      "dateModified": "2026-03-27"
    }
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="privacy-page">
        {/* Hero Section */}
        <section className="privacy-hero">
          <div className="container">
            <div className="privacy-hero-content">
              <h1 className="privacy-hero-title">Privacy <span className="highlight">Policy</span></h1>
              <p className="privacy-hero-description">
                Your privacy matters to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="last-updated">
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="privacy-content-section">
          <div className="container">
            <div className="privacy-content">
              
              {/* Introduction */}
              <div className="policy-section">
                <h2 className="section-title">Introduction</h2>
                <p>
                  Welcome to Ezy Digital Blog ("we," "our," or "us"). We are committed to protecting your 
                  personal information and your right to privacy. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
                  policy, please do not access the site.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="policy-section">
                <h2 className="section-title">Information We Collect</h2>
                <p>We collect personal information that you voluntarily provide to us when you:</p>
                <ul>
                  <li>Subscribe to our newsletter</li>
                  <li>Fill out a contact form</li>
                  <li>Leave comments on our blog posts</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>The personal information we collect may include:</p>
                <ul>
                  <li><strong>Name</strong> - To address you personally</li>
                  <li><strong>Email Address</strong> - To send newsletters and respond to inquiries</li>
                  <li><strong>Phone Number</strong> - For contact purposes (optional)</li>
                  <li><strong>IP Address</strong> - Automatically collected for security and analytics</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="policy-section">
                <h2 className="section-title">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li><strong>Send you marketing and promotional communications</strong> - We may send you emails about new blog posts, digital marketing tips, and updates.</li>
                  <li><strong>Respond to your inquiries</strong> - We use your information to answer your questions and provide support.</li>
                  <li><strong>Improve our website</strong> - We analyze usage patterns to enhance user experience.</li>
                  <li><strong>Protect our website</strong> - We use information to prevent fraudulent activity and ensure security.</li>
                  <li><strong>Comply with legal obligations</strong> - We may use your information to comply with applicable laws and regulations.</li>
                </ul>
              </div>

              {/* Cookies and Tracking Technologies */}
              <div className="policy-section">
                <h2 className="section-title">Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store 
                  certain information. Cookies are files with a small amount of data that may include an 
                  anonymous unique identifier.
                </p>
                <p>We use the following types of cookies:</p>
                <ul>
                  <li><strong>Essential Cookies</strong> - Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies</strong> - Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies</strong> - Remember your preferences and settings</li>
                </ul>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>

              {/* Third-Party Services */}
              <div className="policy-section">
                <h2 className="section-title">Third-Party Services</h2>
                <p>We may use third-party service providers to help us operate our website and deliver services:</p>
                <ul>
                  <li><strong>Google Analytics</strong> - To analyze website traffic and user behavior</li>
                  <li><strong>Email Marketing Services</strong> - To manage our newsletter subscriptions</li>
                  <li><strong>Hosting Services</strong> - To store and serve our website content</li>
                </ul>
                <p>
                  These third parties have access to your personal information only to perform specific tasks 
                  on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </div>

              {/* Data Security */}
              <div className="policy-section">
                <h2 className="section-title">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect the security 
                  of your personal information. However, please remember that no method of transmission over the 
                  internet or method of electronic storage is 100% secure. While we strive to use commercially 
                  acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </div>

              {/* Data Retention */}
              <div className="policy-section">
                <h2 className="section-title">Data Retention</h2>
                <p>
                  We will retain your personal information only for as long as necessary for the purposes set out 
                  in this Privacy Policy. We will retain and use your information to the extent necessary to 
                  comply with our legal obligations, resolve disputes, and enforce our policies.
                </p>
              </div>

              {/* Your Rights */}
              <div className="policy-section">
                <h2 className="section-title">Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul>
                  <li><strong>Right to Access</strong> - You can request a copy of the personal information we hold about you</li>
                  <li><strong>Right to Rectification</strong> - You can request that we correct any inaccurate information</li>
                  <li><strong>Right to Erasure</strong> - You can request that we delete your personal information</li>
                  <li><strong>Right to Restrict Processing</strong> - You can request that we limit how we use your data</li>
                  <li><strong>Right to Data Portability</strong> - You can request to receive your data in a structured format</li>
                  <li><strong>Right to Object</strong> - You can object to certain types of data processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at <a href="mailto:kansaramilan1710@gmail.com">kansaramilan1710@gmail.com</a>.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="policy-section">
                <h2 className="section-title">Children's Privacy</h2>
                <p>
                  Our website is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and you are aware 
                  that your child has provided us with personal information, please contact us. If we become 
                  aware that we have collected personal information from children under 13 without verification 
                  of parental consent, we will take steps to remove that information from our servers.
                </p>
              </div>

              {/* Updates to This Policy */}
              <div className="policy-section">
                <h2 className="section-title">Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. 
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              {/* Contact Us */}
              <div className="policy-section contact-section">
                <h2 className="section-title">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="contact-details">
                  <p><strong>Ezy Digital Blog</strong></p>
                  <p>📍 Address: 212, 3rd Floor, Nilkamal Complex, Adarsh Street, Upleta - 360490</p>
                  <p>📞 Phone: <a href="tel:+919512648085">+91 9512648085</a></p>
                  <p>📧 Email: <a href="mailto:kansaramilan1710@gmail.com">kansaramilan1710@gmail.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}