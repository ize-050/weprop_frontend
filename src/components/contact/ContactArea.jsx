'use client'
import Link from "next/link"
import Image from "next/image"
import ContactForm from "./ContactForm"
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const ContactArea = () => {
   const { t } = useSimpleTranslations('contact')

   const contact_data = [
      {
         id: 1,
         icon: "bi-telephone-fill",
         title: t('call-us', 'Call Us Now'),
         info: "+66 (0) 89 253 0622"
      },
      {
         id: 2,
         icon: "bi-envelope-fill",
         title: t('email-us', 'Drop a mail'),
         info: "info@12realestatepattaya.com"
      },
      {
         id: 3,
         icon: "bi-chat-dots-fill",
         title: t('add-friend', 'Add Friend'),
         info: "Line ID : @pattayarealestate"
      },
   ]
   return (
      <div className="contact-us   xl-mt-100 pt-80 lg-pt-60">
         <div className="container">
            <div className="row">
               <div className="col-xxl-9 col-xl-8 col-lg-10 m-auto">
                  <div className="title-one text-center wow fadeInUp">
                     <h3>{t('questions', 'Questions?')}</h3>
                     <p className="fs-20 mt-2">{t('reach-out', 'Feel Free to Reach Out Via Message.')}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Contact Info Cards */}
         <div className="wow fadeInUp mt-60 lg-mt-40">
            <div className="container">
               <div className="row justify-content-center g-4">
                  {contact_data.map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6">
                        <div className="text-center p-4" style={{
                           backgroundColor: '#fff',
                           borderRadius: '10px',
                           boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                        }}>
                           <div className="icon rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{
                              width: '70px',
                              height: '70px',
                              backgroundColor: '#000',
                              color: '#fff'
                           }}>
                              <i className={item.icon} style={{ fontSize: '28px' }}></i>
                           </div>
                           <h5 className="mb-2">{item.title}</h5>
                           <p className="mb-0 text-dark">{item.info}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Office Image and Address */}
         <div className="mt-100 xl-mt-80 md-mt-60">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-7">
                     <div className="wow fadeInLeft">
                        <img 
                           src="/assets/images/contact_us/12-realestate-office-686197.png" 
                           alt="12 Real Estate Office" 
                           className="w-100"
                           style={{ borderRadius: '15px' }}
                        />
                     </div>
                  </div>
                  <div className="col-lg-5">
                     <div className="wow fadeInRight ps-lg-5 mt-4 mt-lg-0">
                        <h3 className="mb-4">{t('address', 'Address')}</h3>
                        <div className="fs-18 lh-lg">
                           <p className="mb-2"><strong>12 Real Estate CO., LTD.</strong></p>
                           <p className="mb-2">165/545, Thep Prasat 17 Alley</p>
                           <p className="mb-2">Nongprue, Bang Lamung District</p>
                           <p className="mb-0">Chon Buri 20150 Thailand</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Map and Contact Form */}
         <div className=" mt-150 xl-mt-120 md-mt-80"
            style={{
               background: '#f1d9d9 0% 0% no-repeat padding-box',
            }}
         >
            <div className="row">
               <div className="col-xl-7 col-lg-6">
                  <div className="form-style-one wow fadeInUp">
                     <ContactForm />
                  </div>
               </div>
               <div className="col-xl-5 col-lg-6 d-flex order-lg-first">
                  <div className="contact-map-banner w-100">
                     <div className="gmap_canvas h-100 w-100">
                        <iframe 
                           className="gmap_iframe h-100 w-100"
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4699.371241044465!2d100.8786619!3d12.899051199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310297e04a328b91%3A0x2193ad061fcba40!2sAgent%20Team%20-%20The%2012%20Real%20Estate%20Co.%2C%20Ltd.!5e1!3m2!1sth!2sth!4v1773628900512!5m2!1sth!2sth"
                           allowFullScreen=""
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                           title="The 12 Real Estate Pattaya Location"
                        ></iframe>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactArea
