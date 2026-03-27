"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate form submission - Replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Send us a Message</h2>
        
        {submitStatus === "success" && (
          <div className="form-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Thank you! Your message has been sent. We'll get back to you soon.
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="form-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Something went wrong. Please try again.
          </div>
        )}
        
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}