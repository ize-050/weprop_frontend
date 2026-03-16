'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaPhone, FaCommentDots, FaEnvelope, FaLine, FaWeixin, FaWhatsapp, FaFacebookMessenger, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { getMessagingSettings, transformSettingsToObject, generatePlatformLink, getDefaultSettings } from '@/services/messagingSettings';

const MobileContactButtons = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const [settings, setSettings] = useState(getDefaultSettings());
    const [isLoading, setIsLoading] = useState(true);
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', countryCode: '+66', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extract property ID from URL if on property detail page
    const getPropertyIdFromPath = () => {
        const match = pathname?.match(/property-detail(?:-three)?\/(\d+)/)
        return match ? match[1] : null
    }
    const propertyId = getPropertyIdFromPath()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${apiUrl}/contact-form`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone ? `${formData.countryCode}${formData.phone}` : '',
                    message: formData.message,
                    subject: propertyId ? `Property Inquiry #${propertyId}` : 'Quick Message from Website',
                    propertyId: propertyId || undefined,
                    to: 'info@12realestatepattaya.com',
                    cc: 'krittiyakwang@gmail.com'
                }),
            });
            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', countryCode: '+66', phone: '', message: '' });
                setTimeout(() => { setShowMessageForm(false); setFormStatus(null); }, 2000);
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            setFormStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleContactPanel = () => {
        setIsOpen(!isOpen);
    };

    // Fetch messaging settings on component mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setIsLoading(true);
                const response = await getMessagingSettings();
                const settingsObj = transformSettingsToObject(response.data);
                
                // Merge with defaults to ensure all platforms have values
                const mergedSettings = { ...getDefaultSettings(), ...settingsObj };
                setSettings(mergedSettings);
            } catch (error) {
                console.error('Failed to fetch messaging settings:', error);
                // Keep default settings on error
                setSettings(getDefaultSettings());
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <>
            {/* Message Popup Form */}
            {showMessageForm && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setShowMessageForm(false)}>
                    <div style={{
                        background: '#fff', borderRadius: '16px', padding: '30px',
                        width: '100%', maxWidth: '420px', position: 'relative',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowMessageForm(false)} style={{
                            position: 'absolute', top: '12px', right: '16px',
                            background: 'none', border: 'none', fontSize: '22px',
                            cursor: 'pointer', color: '#666'
                        }}>&times;</button>
                        <h5 style={{ marginBottom: '20px', fontWeight: '700', fontSize: '20px' }}>Send us a Message</h5>
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" placeholder="Your Name" required value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                style={{ width: '100%', padding: '10px 14px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                            <input type="email" placeholder="Your Email" required value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                style={{ width: '100%', padding: '10px 14px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                <select value={formData.countryCode}
                                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                                    style={{ width: '90px', flexShrink: 0, padding: '10px 4px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '13px' }}>
                                    <option value="+66">TH +66</option>
                                    <option value="+1">US +1</option>
                                    <option value="+44">UK +44</option>
                                    <option value="+86">CN +86</option>
                                    <option value="+7">RU +7</option>
                                    <option value="+81">JP +81</option>
                                    <option value="+82">KR +82</option>
                                    <option value="+65">SG +65</option>
                                    <option value="+60">MY +60</option>
                                    <option value="+84">VN +84</option>
                                    <option value="+91">IN +91</option>
                                    <option value="+61">AU +61</option>
                                    <option value="+49">DE +49</option>
                                    <option value="+33">FR +33</option>
                                </select>
                                <input type="tel" placeholder="Your Phone" value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    style={{ flex: 1, minWidth: 0, padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
                            </div>
                            <textarea placeholder="Your Message" required rows="3" value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{ width: '100%', padding: '10px 14px', marginBottom: '14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', resize: 'none' }} />
                            {formStatus === 'success' && <div style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>Message sent successfully!</div>}
                            {formStatus === 'error' && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>Failed to send. Please try again.</div>}
                            <button type="submit" disabled={isSubmitting} style={{
                                width: '100%', padding: '12px', background: isSubmitting ? '#999' : '#8B0000',
                                color: '#fff', border: 'none', borderRadius: '8px',
                                fontSize: '16px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile contact container */}
            <div className="mobile-contact-container">

                {/* Floating Social Media Icons - Only visible when open */}
                {isOpen && (
                    <div className="social-float-buttons">
                        {/* WhatsApp */}
                        <a href="https://wa.me/+66888997944" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <img src="/images/icons/whatapp.svg" alt="whatsapp" width={20} height={20} />
                        </a>
                        
                        {/* LINE */}
                        <a href="https://lin.ee/dG5aGu4" target="_blank" rel="noopener noreferrer" aria-label="Line">
                            <img src="/images/icons/line.svg" alt="line" width={20} height={20} />
                        </a>
                        
                        {/* Messenger */}
                        <a href="https://m.me/222887021193075" target="_blank" rel="noopener noreferrer" aria-label="Facebook Messenger">
                            <img src="/images/icons/message.svg" alt="messenger" width={20} height={20} />
                        </a>
                    </div>
                )}

                {/* Fixed Mobile Contact Buttons */}
                <div className="mobile-contact-fixed">
                    <div className="mobile-contact-inner">
                        <div className="contact-question">Got any questions? I&#39;m happy to help.</div>
                        <div className="contact-actions">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50%',
                                }}
                            >
                                <div className="contact-option-wrapper">
                                    <a href="tel:+66888997944" className="contact-option phone">
                                        <img src="/images/icon/call.svg" alt="call" width={24} height={24} />
                                    </a>
                                </div>
                                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Call Now</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '50%',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setShowMessageForm(true)}
                            >
                                <div className="contact-option-wrapper">
                                    <span className="contact-option phone">
                                        <img src="/images/icon/message.svg" alt="message" width={24} height={24} />
                                    </span>
                                </div>
                                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>Send Message</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-avatar" onClick={toggleContactPanel} style={{ cursor: 'pointer' }}>
                        <img
                            src="/assets/images/aboutus/Kwang.png"
                            alt="Contact Agent"
                            width={50}
                            height={50}
                            style={{
                                borderRadius: '50%',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '2px solid #fff'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.1)';
                                e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                                e.target.style.border = '2px solid #007bff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                e.target.style.border = '2px solid #fff';
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileContactButtons;
