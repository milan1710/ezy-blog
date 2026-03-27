import Link from "next/link";
import "./terms-of-service.css";

export const metadata = {
  title: "Terms of Service - Ezy Digital Blog",
  description: "Read our Terms of Service to understand the rules and guidelines for using Ezy Digital Blog. Learn about user responsibilities, content usage, and legal policies.",
  keywords: "terms of service, terms and conditions, user agreement, website terms, legal policy",
  openGraph: {
    title: "Terms of Service - Ezy Digital Blog",
    description: "Read our Terms of Service to understand the rules and guidelines for using Ezy Digital Blog.",
    url: "https://blog.ezydigital.in/terms-of-service",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "Terms of Service - Ezy Digital Blog"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Ezy Digital Blog",
    description: "Read our Terms of Service to understand the rules and guidelines for using Ezy Digital Blog.",
    images: ["/thumbnail/template.png"],
    creator: "@ezydigital",
  },
  alternates: {
    canonical: "https://blog.ezydigital.in/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "March 27, 2026";
  const effectiveDate = "March 27, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Ezy Digital Blog",
    "description": "Terms of Service for Ezy Digital Blog outlining user responsibilities and website policies.",
    "url": "https://blog.ezydigital.in/terms-of-service",
    "mainEntity": {
      "@type": "TermsOfService",
      "name": "Ezy Digital Blog Terms of Service",
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
      
      <div className="terms-page">
        {/* Hero Section */}
        <section className="terms-hero">
          <div className="container">
            <div className="terms-hero-content">
              <h1 className="terms-hero-title">Terms of <span className="highlight">Service</span></h1>
              <p className="terms-hero-description">
                Please read these terms carefully before using our website. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <div className="last-updated">
                Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="terms-content-section">
          <div className="container">
            <div className="terms-content">
              
              {/* Agreement to Terms */}
              <div className="policy-section">
                <h2 className="section-title">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Ezy Digital Blog website ("Website"), you agree to be bound by these Terms of Service 
                  ("Terms"). If you do not agree to these Terms, please do not use our Website. These Terms apply to all visitors, 
                  users, and others who access or use the Website.
                </p>
                <p>
                  Ezy Digital Blog reserves the right to update, change, or replace any part of these Terms at any time. It is your 
                  responsibility to check this page periodically for changes. Your continued use of the Website following the posting 
                  of any changes constitutes acceptance of those changes.
                </p>
              </div>

              {/* Use of Website */}
              <div className="policy-section">
                <h2 className="section-title">2. Use of Website</h2>
                <p>By using our Website, you agree that you will not:</p>
                <ul>
                  <li>Use the Website in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to any portion of the Website</li>
                  <li>Interfere with or disrupt the security, integrity, or performance of the Website</li>
                  <li>Use the Website to transmit any viruses, malware, or other harmful code</li>
                  <li>Engage in any activity that could damage, disable, or impair the Website</li>
                  <li>Harvest or collect personal information of other users without their consent</li>
                  <li>Use automated systems to access the Website (bots, spiders, etc.)</li>
                  <li>Post or transmit any content that is illegal, offensive, or violates third-party rights</li>
                </ul>
                <p>
                  We reserve the right to terminate or suspend your access to the Website immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="policy-section">
                <h2 className="section-title">3. Intellectual Property</h2>
                <p>
                  The content on this Website, including but not limited to text, graphics, images, logos, videos, and software, 
                  is the property of Ezy Digital Blog or its content suppliers and is protected by Indian and international 
                  copyright laws.
                </p>
                <p>You may not:</p>
                <ul>
                  <li>Republish, reproduce, or duplicate any content without our written permission</li>
                  <li>Sell, rent, or sublicense any content from our Website</li>
                  <li>Modify, adapt, or create derivative works from our content</li>
                  <li>Use our trademarks, logos, or service marks without prior written consent</li>
                </ul>
                <p>
                  However, you may share our blog posts via social media or link to our content as long as you provide proper 
                  attribution and do not modify the content.
                </p>
              </div>

              {/* User Content */}
              <div className="policy-section">
                <h2 className="section-title">4. User Content</h2>
                <p>
                  When you submit comments, feedback, or other content ("User Content") to our Website, you grant us a 
                  non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publish, and distribute such 
                  content in any media.
                </p>
                <p>By submitting User Content, you represent and warrant that:</p>
                <ul>
                  <li>You own or have the necessary rights to the content you submit</li>
                  <li>Your content does not violate any third-party rights or applicable laws</li>
                  <li>Your content is not defamatory, obscene, or otherwise objectionable</li>
                  <li>Your content does not contain viruses or malicious code</li>
                </ul>
                <p>
                  We reserve the right to remove or edit any User Content that violates these Terms or is otherwise 
                  inappropriate, without prior notice.
                </p>
              </div>

              {/* Disclaimer of Warranties */}
              <div className="policy-section">
                <h2 className="section-title">5. Disclaimer of Warranties</h2>
                <p>
                  The information provided on this Website is for general informational purposes only. While we strive to 
                  provide accurate and up-to-date information, we make no representations or warranties of any kind, express 
                  or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.
                </p>
                <p>
                  Your use of the Website is at your sole risk. The Website is provided on an "AS IS" and "AS AVAILABLE" basis. 
                  We disclaim all warranties, whether express, implied, or statutory, including but not limited to implied 
                  warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                  We do not warrant that the Website will be uninterrupted, error-free, secure, or free from viruses or other 
                  harmful components. We may remove the Website for indefinite periods or cancel it at any time without notice.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="policy-section">
                <h2 className="section-title">6. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Ezy Digital Blog and its affiliates, officers, employees, agents, 
                  and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive 
                  damages arising out of or relating to:
                </p>
                <ul>
                  <li>Your use or inability to use the Website</li>
                  <li>Any content obtained from the Website</li>
                  <li>Unauthorized access to or alteration of your transmissions or data</li>
                  <li>Any other matter relating to the Website</li>
                </ul>
                <p>
                  This limitation applies regardless of whether the alleged liability is based on contract, tort, negligence, 
                  strict liability, or any other basis, even if we have been advised of the possibility of such damages.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="policy-section">
                <h2 className="section-title">7. Third-Party Links</h2>
                <p>
                  Our Website may contain links to third-party websites or services that are not owned or controlled by us. 
                  We have no control over, and assume no responsibility for, the content, privacy policies, or practices of 
                  any third-party websites.
                </p>
                <p>
                  By using the Website, you acknowledge and agree that we shall not be responsible or liable, directly or 
                  indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or 
                  reliance on any such content, goods, or services available on or through any such third-party websites.
                </p>
              </div>

              {/* Indemnification */}
              <div className="policy-section">
                <h2 className="section-title">8. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Ezy Digital Blog and its officers, directors, employees, 
                  agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses 
                  (including reasonable attorneys' fees) arising out of or relating to:
                </p>
                <ul>
                  <li>Your use of the Website</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party rights, including intellectual property rights</li>
                  <li>Any content you submit to the Website</li>
                </ul>
              </div>

              {/* Termination */}
              <div className="policy-section">
                <h2 className="section-title">9. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Website immediately, without prior notice or liability, for 
                  any reason, including without limitation if you breach these Terms. Upon termination, your right to use the 
                  Website will cease immediately.
                </p>
                <p>
                  All provisions of these Terms which by their nature should survive termination shall survive termination, 
                  including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </div>

              {/* Governing Law */}
              <div className="policy-section">
                <h2 className="section-title">10. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its 
                  conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall 
                  be brought exclusively in the courts located in Gujarat, India.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                  of these Terms will remain in effect.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="policy-section">
                <h2 className="section-title">11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will make 
                  reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                  a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Website after those revisions become effective, you agree to be bound by 
                  the revised terms. If you do not agree to the new terms, please stop using the Website.
                </p>
              </div>

              {/* Contact Us */}
              <div className="policy-section contact-section">
                <h2 className="section-title">12. Contact Us</h2>
                <p>If you have any questions about these Terms of Service, please contact us:</p>
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