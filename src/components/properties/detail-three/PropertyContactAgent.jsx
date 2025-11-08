'use client'
import { useState } from 'react'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const PropertyContactAgent = ({ property }) => {
   const { t } = useSimpleTranslations('listing')
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
   })

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      // TODO: Handle form submission
      console.log('Form submitted:', formData)
   }

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h4 className="mb-40 text-center" style={{ fontSize: '24px', fontWeight: '700' }}>
            {t('contact-agent', 'Contact Agent')}
         </h4>

         {/* Agent Info */}
         <div className="d-flex align-items-center mb-40 pb-30" style={{ borderBottom: '1px solid #e0e0e0' }}>
            <div className="agent-avatar me-3">
               <img 
                  src="/assets/images/aboutus/Kwang.png" 
                  alt="Kwang"
                  style={{
                     width: '80px',
                     height: '80px',
                     borderRadius: '50%',
                     objectFit: 'cover'
                  }}
               />
            </div>
            <div>
               <h5 className="mb-1" style={{ fontSize: '20px', fontWeight: '600' }}>Kwang</h5>
               <p className="mb-0" style={{ fontSize: '16px', color: '#666' }}>+66(0) 89 253 0622</p>
            </div>
         </div>

         {/* Request Details */}
         <div className="text-center mb-30">
            <h5 className="mb-2" style={{ fontSize: '18px', fontWeight: '600' }}>
               {t('request-details', 'Request details')}
            </h5>
            <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
               {t('request-details-desc', 'Leave your contacts and we will send all details about this property')}
            </p>
         </div>

         {/* Contact Form */}
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={t('your-name', 'Your Name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                     padding: '12px 20px',
                     border: '1px solid #e0e0e0',
                     borderRadius: '8px',
                     fontSize: '14px'
                  }}
               />
            </div>

            <div className="mb-3">
               <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder={t('your-email', 'Your Email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                     padding: '12px 20px',
                     border: '1px solid #e0e0e0',
                     borderRadius: '8px',
                     fontSize: '14px'
                  }}
               />
            </div>

            <div className="mb-3">
               <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder={t('your-phone', 'Your Phone')}
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                     padding: '12px 20px',
                     border: '1px solid #e0e0e0',
                     borderRadius: '8px',
                     fontSize: '14px'
                  }}
               />
            </div>

            <div className="mb-4">
               <textarea
                  name="message"
                  className="form-control"
                  placeholder={t('your-message', 'Your Message')}
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  style={{
                     padding: '12px 20px',
                     border: '1px solid #e0e0e0',
                     borderRadius: '8px',
                     fontSize: '14px',
                     resize: 'none'
                  }}
               ></textarea>
            </div>

            <button
               type="submit"
               className="btn w-100 text-white"
               style={{
                  backgroundColor: '#8B0000',
                  padding: '14px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  transition: 'all 0.3s'
               }}
               onMouseEnter={(e) => e.target.style.backgroundColor = '#6B0000'}
               onMouseLeave={(e) => e.target.style.backgroundColor = '#8B0000'}
            >
               {t('send-message-now', 'Send a Message Now')}
            </button>
         </form>

         {/* Social Icons */}
         <div className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
            <a 
               href="mailto:info@12realestatepattaya.com"
               className="d-inline-flex align-items-center justify-content-center"
               style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #e0e0e0',
                  color: '#333',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex'
               }}
               onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#910000'
                  e.currentTarget.style.borderColor = '#910000'
                  e.currentTarget.style.color = '#fff'
               }}
               onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#e0e0e0'
                  e.currentTarget.style.color = '#333'
               }}
            >
               <i className="bi bi-envelope-fill" style={{ lineHeight: 1 }}></i>
            </a>

            <a 
               href="https://wa.me/66892530622"
               target="_blank"
               rel="noopener noreferrer"
               className="d-inline-flex align-items-center justify-content-center"
               style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #e0e0e0',
                  color: '#333',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex'
               }}
               onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#910000'
                  e.currentTarget.style.borderColor = '#910000'
                  e.currentTarget.style.color = '#fff'
               }}
               onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#e0e0e0'
                  e.currentTarget.style.color = '#333'
               }}
            >
               <i className="bi bi-whatsapp" style={{ lineHeight: 1 }}></i>
            </a>

            <a 
               href="https://m.me/12realestatepattaya"
               target="_blank"
               rel="noopener noreferrer"
               className="d-inline-flex align-items-center justify-content-center"
               style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #e0e0e0',
                  color: '#333',
                  fontSize: '22px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  display: 'inline-flex'
               }}
               onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#910000'
                  e.currentTarget.style.borderColor = '#910000'
                  e.currentTarget.style.color = '#fff'
               }}
               onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#e0e0e0'
                  e.currentTarget.style.color = '#333'
               }}
            >
               <i className="bi bi-messenger" style={{ lineHeight: 1 }}></i>
            </a>
         </div>
      </div>
   )
}

export default PropertyContactAgent
