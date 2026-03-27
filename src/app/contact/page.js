import Link from "next/link";
import ContactForm from "./ContactForm";
import "./contact.css";

export const metadata = {
  title: "Contact Ezy Digital - Get in Touch | Digital Marketing Agency",
  description: "Have questions about digital marketing? Contact Ezy Digital for inquiries, collaborations, or support. We're here to help you grow your online presence.",
  keywords: "contact digital marketing agency, Ezy Digital contact, digital marketing help, SEO consultation, business growth",
  openGraph: {
    title: "Contact Ezy Digital - Get in Touch",
    description: "Have questions about digital marketing? Contact us for inquiries, collaborations, or support.",
    url: "https://blog.ezydigital.in/contact",
    siteName: "Ezy Digital Blog",
    images: [
      {
        url: "/thumbnail/template.png",
        width: 1200,
        height: 630,
        alt: "Contact Ezy Digital"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ezy Digital - Get in Touch",
    description: "Have questions about digital marketing? Contact us for inquiries, collaborations, or support.",
    images: ["/thumbnail/template.png"],
    creator: "@ezydigital",
  },
  alternates: {
    canonical: "https://blog.ezydigital.in/contact",
  },
};

export default function ContactPage() {
  const contactInfo = {
    address: "212, 3rd Floor, Nilkamal Complex, Adarsh Street, Upleta - 360490",
    phone: "+91 9512648085",
    email: "kansaramilan1710@gmail.com",
    hours: "Monday - Saturday: 10:00 AM - 7:00 PM",
    whatsapp: "+91 9512648085"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Ezy Digital",
    "description": "Get in touch with Ezy Digital for digital marketing inquiries and support.",
    "url": "https://blog.ezydigital.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Ezy Digital",
      "url": "https://blog.ezydigital.in",
      "logo": "https://blog.ezydigital.in/thumbnail/template.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919512648085",
        "contactType": "customer service",
        "email": "kansaramilan1710@gmail.com",
        "availableLanguage": ["English", "Hindi"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "212, 3rd Floor, Nilkamal Complex, Adarsh Street",
        "addressLocality": "Upleta",
        "postalCode": "360490",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <h1 className="contact-hero-title">Get in <span className="highlight">Touch</span></h1>
              <p className="contact-hero-description">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Info */}
              <div className="contact-info">
                <h2 className="contact-info-title">Let's Talk</h2>
                <p className="contact-info-description">
                  Whether you have a question about digital marketing, want to collaborate, or just want to say hi, we're here for you.
                </p>
                
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Visit Us</h3>
                      <p>{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.352 21.4019C21.1467 21.5901 20.904 21.7335 20.6397 21.8227C20.3754 21.9119 20.095 21.9451 19.818 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77396 17.3147 6.72533 15.2661 5.19 12.85C3.49959 10.2411 2.44859 7.27114 2.12 4.182C2.09498 3.905 2.12818 3.62465 2.2174 3.36032C2.30661 3.096 2.44997 2.85334 2.63821 2.64805C2.82645 2.44276 3.05556 2.27915 3.31071 2.16754C3.56587 2.05594 3.8416 1.99895 4.12 2H7.12C7.67021 1.99419 8.20455 2.172 8.64049 2.49861C9.07643 2.82523 9.38745 3.28082 9.52 3.8C9.71754 4.6737 9.94384 5.54056 10.2 6.4C10.3282 6.85984 10.3342 7.3442 10.2175 7.80696C10.1008 8.26973 9.86578 8.69446 9.54 9.03L8.14 10.43C9.77479 13.3546 12.0554 15.6352 14.98 17.27L16.38 15.87C16.7155 15.5442 17.1403 15.3092 17.603 15.1925C18.0658 15.0758 18.5502 15.0818 19.01 15.21C19.8694 15.4662 20.7363 15.6925 21.61 15.89C22.1325 16.0233 22.5892 16.337 22.9151 16.7749C23.241 17.2127 23.4168 17.7484 23.41 18.3V21.3C23.4101 21.3115 23.4101 21.3229 23.41 21.3344" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Call Us</h3>
                      <p>{contactInfo.phone}</p>
                      <a href={`tel:${contactInfo.phone}`} className="info-link">Call Now</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Email Us</h3>
                      <p>{contactInfo.email}</p>
                      <a href={`mailto:${contactInfo.email}`} className="info-link">Send Email</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h3>Working Hours</h3>
                      <p>{contactInfo.hours}</p>
                      <p className="info-note">Sunday Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="whatsapp-btn-container">
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.449l-6.305 1.655zM12.04 2.016c-5.3 0-9.61 4.307-9.611 9.602-.001 1.693.444 3.35 1.284 4.789l-.837 3.057 3.143-.823c1.386.756 2.956 1.155 4.586 1.155 5.293 0 9.601-4.307 9.602-9.598.001-2.564-.997-4.973-2.809-6.785-1.81-1.81-4.218-2.807-6.78-2.807z"/>
                      <path d="M17.825 14.521c-.101-.162-.367-.26-.767-.455-.4-.195-2.364-1.166-2.73-1.299-.366-.133-.632-.199-.898.195-.266.394-1.03 1.299-1.263 1.565-.233.266-.465.299-.865.104-.4-.195-1.687-.622-3.212-1.982-1.188-1.057-1.99-2.364-2.224-2.764-.233-.4-.025-.615.175-.813.179-.179.398-.467.598-.7.2-.234.266-.4.399-.666.133-.267.066-.5-.033-.7-.1-.2-.897-2.162-1.23-2.96-.324-.78-.652-.674-.897-.686-.233-.013-.5-.013-.766-.013-.267 0-.7.1-1.065.5-.365.4-1.394 1.362-1.394 3.322 0 1.96 1.428 3.854 1.627 4.12.2.266 2.808 4.286 6.802 6.01.95.41 1.692.655 2.271.838.954.303 1.823.26 2.51.158.766-.114 2.364-.966 2.697-1.899.333-.933.333-1.732.233-1.899z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              
              {/* Contact Form - Client Component */}
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <div className="container">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.234567890123!2d70.283123456789!3d21.740123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDQ0JzI0LjQiTiA3MMKwMTYnNTkuOSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ezy Digital Office Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Find answers to common questions</p>
            </div>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How quickly can I expect a response?</h3>
                <p>We typically respond within 24 hours during business days. For urgent inquiries, please call us directly.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer free consultations?</h3>
                <p>Yes, we offer a free 15-minute consultation to understand your needs and discuss how we can help.</p>
              </div>
              <div className="faq-item">
                <h3>What services do you provide?</h3>
                <p>We specialize in digital marketing education, SEO strategies, content marketing, and AI-powered blog content.</p>
              </div>
              <div className="faq-item">
                <h3>Can I collaborate with you?</h3>
                <p>Absolutely! We're always open to collaborations, guest posts, and partnerships. Reach out to us via email.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}