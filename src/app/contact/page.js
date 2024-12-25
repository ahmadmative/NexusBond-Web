'use client';
import { useState } from 'react';
import styles from './contact.module.css';

import { FaLinkedin, FaFacebookF, FaRedditAlien, FaInstagram, FaTiktok, FaQuora } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } catch (error) {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Contact <span className={styles.highlight}>Us</span>
        </h1>
        <p className={styles.subtitle}>
          At NexusBond.AI, we are dedicated to providing top-notch AI chatbot services and personalized
          support to help you succeed. Reach out to us, and let&apos;s unlock the full potential of AI together.
        </p>

        <div className={styles.contentWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.infoSection}>
              <h2>Email Us: <span className={styles.highlight}>info@nexusbond.ai</span></h2>
              <p>Our expert team is here to assist you with any questions,
                suggestions, or issues. We aim to respond within 24-48 hours.</p>
            </div>

            <div className={styles.infoSection}>
              <h2>Support Hours</h2>
              <p>Need assistance? Our support team is available:</p>
              <p className={styles.highlight}>Monday to Friday: 9:00 AM – 5:00 PM (EST)</p>
            </div>

            <div className={styles.infoSection}>
              <h2>Let&apos;s Connect</h2>
              <p>We&apos;re here to help! Contact us today to explore the endless
                possibilities of AI-powered solutions.</p>
            </div>

            <div className={styles.socialSection}>
              <h2>Follow us on our social media platforms 👋</h2>
              <div className={styles.socialIcons}>
                <a href="https://www.linkedin.com/company/nexusbond-ai/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/NexusBondAI/" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://x.com/NexusBondAI" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
                <a href="https://www.instagram.com/NexusBond.AI" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.tiktok.com/@nexusbond.ai" target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                </a>
                <a href="https://www.reddit.com/r/NexusBondAI/" target="_blank" rel="noopener noreferrer">
                  <FaRedditAlien />
                </a>
                <a href="https://nexusbondai.quora.com/" target="_blank" rel="noopener noreferrer">
                  <FaQuora />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2>Send a Message :)</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? styles.error : ''}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? styles.error : ''}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>
              <div className={styles.inputWrapper}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.error : ''}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
              <button 
                type="submit" 
                className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
              
              {errors.submit && (
                <div className={styles.errorMessage}>
                  {errors.submit}
                </div>
              )}
              
              {isSubmitted && (
                <div className={styles.successMessage}>
                  Message sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}