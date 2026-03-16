'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const COUNTRY_CODES = [
   { code: '+66', label: 'TH +66' },
   { code: '+1', label: 'US +1' },
   { code: '+44', label: 'UK +44' },
   { code: '+86', label: 'CN +86' },
   { code: '+7', label: 'RU +7' },
   { code: '+81', label: 'JP +81' },
   { code: '+82', label: 'KR +82' },
   { code: '+49', label: 'DE +49' },
   { code: '+33', label: 'FR +33' },
   { code: '+61', label: 'AU +61' },
   { code: '+65', label: 'SG +65' },
   { code: '+60', label: 'MY +60' },
   { code: '+91', label: 'IN +91' },
   { code: '+971', label: 'AE +971' },
   { code: '+46', label: 'SE +46' },
   { code: '+47', label: 'NO +47' },
   { code: '+45', label: 'DK +45' },
   { code: '+358', label: 'FI +358' },
]

const PropertyContactAgent = ({ property }) => {
   const t = useTranslations()
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      countryCode: '+66',
      phone: '',
      message: ''
   })
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [submitStatus, setSubmitStatus] = useState(null)

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      setSubmitStatus(null)

      const fullPhone = formData.phone ? `${formData.countryCode}${formData.phone}` : ''

      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'
         const response = await fetch(`${apiUrl}/contact-form`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'dd-property-api-key-2025'
            },
            body: JSON.stringify({
               name: formData.name,
               email: formData.email,
               phone: fullPhone,
               message: formData.message,
               propertyId: property?.id,
               propertyTitle: property?.title,
               subject: `Property Inquiry: ${property?.title || 'Property'}`,
               to: 'info@12realestatepattaya.com',
               cc: 'krittiyakwang@gmail.com'
            }),
         })

         if (response.ok) {
            setSubmitStatus('success')
            setFormData({ name: '', email: '', countryCode: '+66', phone: '', message: '' })
            setTimeout(() => setSubmitStatus(null), 5000)
         } else {
            const errorData = await response.json().catch(() => null)
            console.error('Form submission failed:', errorData)
            setSubmitStatus('error')
         }
      } catch (error) {
         console.error('Form submission error:', error)
         setSubmitStatus('error')
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h4 className="mb-40 text-center" style={{ fontSize: '24px', fontWeight: '700' }}>
            {t('contactAgent')}
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
               <p className="mb-0" style={{ fontSize: '16px', color: '#666' }}>+66 89 253 0622</p>
            </div>
         </div>

         {/* Request Details */}
         <div className="text-center mb-30">
            <h5 className="mb-2" style={{ fontSize: '18px', fontWeight: '600' }}>
               {t('requestDetails')}
            </h5>
            <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
               {t('requestDetailsDesc')}
            </p>
         </div>

         {/* Contact Form */}
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={t('yourName')}
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
                  placeholder={t('yourEmail')}
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
               <div className="d-flex gap-2">
                  <select
                     name="countryCode"
                     className="form-select"
                     value={formData.countryCode}
                     onChange={handleChange}
                     style={{
                        padding: '12px 8px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '13px',
                        width: '100px',
                        minWidth: '90px',
                        flexShrink: 0
                     }}
                  >
                     {COUNTRY_CODES.map(cc => (
                        <option key={cc.code} value={cc.code}>{cc.label}</option>
                     ))}
                  </select>
                  <input
                     type="tel"
                     name="phone"
                     className="form-control"
                     placeholder={t('yourPhone')}
                     value={formData.phone}
                     onChange={handleChange}
                     style={{
                        padding: '12px 20px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        flex: 1
                     }}
                  />
               </div>
            </div>

            <div className="mb-4">
               <textarea
                  name="message"
                  className="form-control"
                  placeholder={t('yourMessage')}
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

            {submitStatus === 'success' && (
               <div className="alert alert-success mb-3" style={{ fontSize: '14px' }}>
                  {t('messageSentSuccess') || 'Message sent successfully!'}
               </div>
            )}
            
            {submitStatus === 'error' && (
               <div className="alert alert-danger mb-3" style={{ fontSize: '14px' }}>
                  {t('messageSentError') || 'Failed to send message. Please try again.'}
               </div>
            )}

            <button
               type="submit"
               className="btn w-100 text-white"
               disabled={isSubmitting}
               style={{
                  backgroundColor: isSubmitting ? '#999' : '#8B0000',
                  padding: '14px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  transition: 'all 0.3s',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
               }}
               onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#6B0000')}
               onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#8B0000')}
            >
               {isSubmitting ? (t('sending') || 'Sending...') : (t('sendMessageNow') || 'Send a Message Now')}
            </button>
         </form>

         {/* Social Icons */}
         <div className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
            {/* Call */}
            <a 
               href="tel:+66892530622"
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
               <i className="bi bi-telephone-fill" style={{ lineHeight: 1 }}></i>
            </a>

            {/* WhatsApp */}
            <a 
               href="https://wa.me/+66888997944"
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

            {/* LINE */}
            <a 
               href="https://lin.ee/dG5aGu4"
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
               <i className="bi bi-line" style={{ lineHeight: 1 }}></i>
            </a>
         </div>
      </div>
   )
}

export default PropertyContactAgent
