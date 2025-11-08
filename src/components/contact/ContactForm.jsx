'use client'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const ContactForm = () => {
   const formRef = useRef(null)
   const { t } = useSimpleTranslations('contact')
   const [formData, setFormData] = useState({
      user_name: '',
      user_email: '',
      phone: '',
      message: ''
   })
   const [errors, setErrors] = useState({})

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value
      }))
      // Clear error when user types
      if (errors[name]) {
         setErrors(prev => ({
            ...prev,
            [name]: ''
         }))
      }
   }

   const validate = () => {
      const newErrors = {}
      if (!formData.user_name.trim()) {
         newErrors.user_name = t('name-required', 'Name is required')
      }
      if (!formData.user_email.trim()) {
         newErrors.user_email = t('email-required', 'Email is required')
      } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
         newErrors.user_email = t('email-invalid', 'Email is invalid')
      }
      if (!formData.message.trim()) {
         newErrors.message = t('message-required', 'Message is required')
      }
      return newErrors
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      const validationErrors = validate()
      if (Object.keys(validationErrors).length > 0) {
         setErrors(validationErrors)
         return
      }

      try {
         // TODO: Implement actual email sending
         console.log('Form submitted:', formData)
         toast.success(t('message-sent', 'Message sent successfully!'), { position: 'top-center' })
         
         // Reset form
         setFormData({
            user_name: '',
            user_email: '',
            phone: '',
            message: ''
         })
      } catch (error) {
         console.error('Error sending message:', error)
         toast.error(t('message-failed', 'Failed to send message. Please try again.'), { position: 'top-center' })
      }
   }

   return (
      <form ref={formRef} onSubmit={handleSubmit}>
         <h3>{t('send-message', 'Send Message')}</h3>
         <p className="fs-16 mb-30">{t('form-description', 'Please fill in the form with your questions or comments and we will get back to you as soon as possible normally within 24 hours during working days.')}</p>
         <div className="messages"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="user_name">{t('name', 'Name')}*</label>
                  <input 
                     type="text" 
                     id="user_name"
                     name="user_name" 
                     value={formData.user_name}
                     onChange={handleChange}
                     placeholder=""
                  />
                  {errors.user_name && <p className="form_error">{errors.user_name}</p>}
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="user_email">{t('email', 'E-mails')}*</label>
                  <input 
                     type="email" 
                     id="user_email"
                     name="user_email" 
                     value={formData.user_email}
                     onChange={handleChange}
                     placeholder=""
                  />
                  {errors.user_email && <p className="form_error">{errors.user_email}</p>}
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="phone">{t('phone-number', 'Phone Number')}</label>
                  <input 
                     type="tel" 
                     id="phone"
                     name="phone" 
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder=""
                  />
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <label htmlFor="message">{t('message', 'Message')}</label>
                  <textarea 
                     id="message"
                     name="message" 
                     value={formData.message}
                     onChange={handleChange}
                     placeholder=""
                  ></textarea>
                  {errors.message && <p className="form_error">{errors.message}</p>}
               </div>
            </div>
            <div className="col-12">
               <button 
                  type='submit' 
                  className="btn-nine text-uppercase rounded-3 fw-normal w-100"
                  style={{
                     backgroundColor: '#8B0000',
                     borderColor: '#8B0000'
                  }}
               >
                  {t('send-message-btn', 'SEND MESSAGE')}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
