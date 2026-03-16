'use client'

import React, { useState } from 'react';
import './ContactModal.css';

const COUNTRY_CODES = [
  { code: '+66', label: 'TH +66' },
  { code: '+1',  label: 'US +1'  },
  { code: '+44', label: 'UK +44' },
  { code: '+86', label: 'CN +86' },
  { code: '+7',  label: 'RU +7'  },
  { code: '+81', label: 'JP +81' },
  { code: '+82', label: 'KR +82' },
  { code: '+65', label: 'SG +65' },
  { code: '+60', label: 'MY +60' },
  { code: '+84', label: 'VN +84' },
  { code: '+91', label: 'IN +91' },
  { code: '+61', label: 'AU +61' },
  { code: '+49', label: 'DE +49' },
  { code: '+33', label: 'FR +33' },
];

const ContactModal = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+66', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${apiUrl}/contact-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'dd-property-api-key-2025' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone ? `${formData.countryCode}${formData.phone}` : '',
          message: formData.message,
          propertyId: property?.id,
          propertyTitle: property?.title,
          subject: `Property Inquiry: ${property?.title || 'Property'}`,
          to: 'info@12realestatepattaya.com',
          cc: 'krittiyakwang@gmail.com'
        }),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', countryCode: '+66', phone: '', message: '' });
        setTimeout(() => { onClose(); setFormStatus(null); }, 2000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-1" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="modal-header">
          <h3>Send us a Message</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                style={{ width: '90px', flexShrink: 0, padding: '15px 6px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }}
              >
                {COUNTRY_CODES.map(cc => (
                  <option key={cc.code} value={cc.code}>{cc.label}</option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ flex: 1, minWidth: 0 }}
              />
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          {formStatus === 'success' && <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px', padding: '0 0 8px' }}>Message sent successfully!</div>}
          {formStatus === 'error' && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px', padding: '0 0 8px' }}>Failed to send. Please try again.</div>}

          <button type="submit" className="send-button" disabled={isSubmitting}>
            <i className="far fa-comment-dots"></i> {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-options">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div className="contact-option-wrapper">
              <a href="tel:+66892530622" className="contact-option phone">
                <i className="fas fa-phone"></i>
              </a>
            </div>
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Call Now</span>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '15px' }}>
            <div className="contact-option-wrapper">
              <a href="https://lin.ee/dG5aGu4" target="_blank" rel="noopener noreferrer">
                <img src="/images/new_icons/line.svg" alt="Line" className="social-icon" />
              </a>
            </div>
            <div className="contact-option-wrapper">
              <a href="https://wa.me/+66888997944" target="_blank" rel="noopener noreferrer">
                <img src="/images/new_icons/whatapp.svg" alt="WhatsApp" className="social-icon" />
              </a>
            </div>
            <div className="contact-option-wrapper">
              <a href="https://m.me/222887021193075" target="_blank" rel="noopener noreferrer">
                <img src="/images/new_icons/message.svg" alt="Messenger" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
