'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const Testimonials = () => {
   const { t } = useSimpleTranslations('home')

   const testimonials = [
      {
         id: 1,
         name: 'John Smith',
         role: t('testimonial-role-1', 'Property Investor'),
         image: '/assets/images/aboutus/Frank.png',
         rating: 5,
         text: t('testimonial-1', 'Excellent service! The team helped me find the perfect condo in Pattaya. Professional, responsive, and very knowledgeable about the local market.')
      },
      {
         id: 2,
         name: 'Maria Garcia',
         role: t('testimonial-role-2', 'Homeowner'),
         image: '/assets/images/aboutus/Mind.png',
         rating: 5,
         text: t('testimonial-2', 'I was impressed by their attention to detail and dedication. They made the entire buying process smooth and stress-free. Highly recommended!')
      },
      {
         id: 3,
         name: 'David Chen',
         role: t('testimonial-role-3', 'Real Estate Investor'),
         image: '/assets/images/aboutus/Gavin.png',
         rating: 5,
         text: t('testimonial-3', 'Outstanding experience from start to finish. Their market knowledge and negotiation skills saved me a lot of money. Best real estate agency in Pattaya!')
      },
      {
         id: 4,
         name: 'Anna Ivanova',
         role: t('testimonial-role-4', 'Expat Resident'),
         image: '/assets/images/aboutus/Nok.png',
         rating: 5,
         text: t('testimonial-4', 'As a foreigner, I was worried about the process, but they guided me through everything. Very patient and helpful. Thank you!')
      }
   ]

   return (
      <div className="feedback-section-three mt-150 xl-mt-120 md-mt-80">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="title-one text-center mb-60 lg-mb-40 wow fadeInUp">
                     <h3>{t('testimonial-title', 'What Our Clients Say')}</h3>
                     <p className="fs-22 mt-20">
                        {t('testimonial-subtitle', 'Real reviews from our satisfied clients')}
                     </p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-12">
                  <Swiper
                     modules={[Navigation, Pagination, Autoplay]}
                     spaceBetween={30}
                     slidesPerView={1}
                     navigation
                     pagination={{ clickable: true }}
                     autoplay={{ delay: 5000, disableOnInteraction: false }}
                     breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                     }}
                     className="testimonial-slider"
                  >
                     {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                           <div className="feedback-block-three" style={{
                              backgroundColor: '#fff',
                              padding: '40px 30px',
                              borderRadius: '15px',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column'
                           }}>
                              <div className="d-flex align-items-center mb-25">
                                 <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="rounded-circle"
                                    style={{ 
                                       width: '70px', 
                                       height: '70px',
                                       objectFit: 'cover',
                                       marginRight: '20px'
                                    }}
                                 />
                                 <div>
                                    <h5 className="mb-1">{testimonial.name}</h5>
                                    <p className="fs-16 mb-0" style={{ color: '#666' }}>{testimonial.role}</p>
                                 </div>
                              </div>
                              <div className="rating mb-20">
                                 {[...Array(testimonial.rating)].map((_, i) => (
                                    <i key={i} className="bi bi-star-fill" style={{ color: '#FFD700', fontSize: '16px', marginRight: '3px' }}></i>
                                 ))}
                              </div>
                              <p className="fs-18 lh-lg mb-0" style={{ 
                                 color: '#333',
                                 fontStyle: 'italic',
                                 flex: 1
                              }}>
                                 &ldquo;{testimonial.text}&rdquo;
                              </p>
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Testimonials
