'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import Fancybox from '@/components/common/Fancybox'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const PropertyMediaGallery = ({ property }) => {
   const [thumbsSwiper, setThumbsSwiper] = useState(null)
   // Get images from propertyImages or images array (รองรับทั้ง 2 แบบ)
   const getImages = () => {
      const imageArray = []
      
      // ลองดึงจาก propertyImages หรือ images
      const sourceImages = property?.propertyImages || property?.images || []
      
      if (Array.isArray(sourceImages) && sourceImages.length > 0) {
         sourceImages
            .sort((a, b) => (a.sortOrder || a.sort_order || 0) - (b.sortOrder || b.sort_order || 0))
            .forEach(img => {
               if (img.url) {
                  // ถ้า url เป็น full URL ใช้เลย ถ้าไม่ใช่ เพิ่ม backend URL
                  const imageUrl = img.url.startsWith('http') 
                     ? img.url 
                     : `${process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${img.url}`
                  imageArray.push(imageUrl)
               }
            })
      }
      
      // ถ้าไม่มีรูปเลย ใช้รูป default
      if (imageArray.length === 0) {
         imageArray.push('/assets/images/listing/img_large_01.jpg')
      }
      
      return imageArray
   }

   const images = getImages()

   return (
      <div className="media-gallery mt-100 xl-mt-80 lg-mt-60">
         <div className="row">
            <div className="col-lg-10">
               <div className="bg-white border-20 md-mb-20 shadow4 p-30">
                  <div className="position-relative z-1 overflow-hidden border-20">
                     {/* See all Photos Button with Fancybox */}
                     <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                        See all {images.length} Photos
                        <Fancybox
                           options={{
                              Carousel: {
                                 infinite: true,
                              },
                           }}
                        >
                           {images.map((img, index) => (
                              <a key={index} className="d-block" data-fancybox="property-gallery"
                                 href={img}
                              ></a>
                           ))}
                        </Fancybox>
                     </div>

                     {/* Main Swiper */}
                     <Swiper
                        modules={[Navigation, Thumbs]}
                        navigation={{
                           nextEl: '.property-gallery-next',
                           prevEl: '.property-gallery-prev',
                        }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        spaceBetween={10}
                        className="property-main-gallery"
                     >
                        {images.map((img, index) => (
                           <SwiperSlide key={index}>
                              <Image 
                                 src={img} 
                                 alt={`Property image ${index + 1}`} 
                                 width={1200}
                                 height={600}
                                 className="w-100 border-20" 
                                 style={{ objectFit: 'cover', height: '600px' }}
                              />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                     
                     {/* Navigation Arrows */}
                     {images.length > 1 && (
                        <>
                           <button 
                              className="property-gallery-prev" 
                              type="button"
                              style={{
                                 position: 'absolute',
                                 left: '20px',
                                 top: '50%',
                                 transform: 'translateY(-50%)',
                                 zIndex: 10,
                                 width: '50px',
                                 height: '50px',
                                 borderRadius: '50%',
                                 backgroundColor: 'white',
                                 border: 'none',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 cursor: 'pointer',
                                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                              }}
                           >
                              <i className="bi bi-chevron-left" style={{ fontSize: '24px' }}></i>
                           </button>
                           <button 
                              className="property-gallery-next" 
                              type="button"
                              style={{
                                 position: 'absolute',
                                 right: '20px',
                                 top: '50%',
                                 transform: 'translateY(-50%)',
                                 zIndex: 10,
                                 width: '50px',
                                 height: '50px',
                                 borderRadius: '50%',
                                 backgroundColor: 'white',
                                 border: 'none',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 cursor: 'pointer',
                                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                              }}
                           >
                              <i className="bi bi-chevron-right" style={{ fontSize: '24px' }}></i>
                           </button>
                        </>
                     )}
                  </div>
               </div>
               <style jsx global>{`
                  .img-fancy-btn {
                     position: absolute;
                     right: 25px;
                     top: 35px;
                     background: #fff;
                     line-height: 50px;
                     padding: 0 25px;
                     z-index: 2;
                     cursor: pointer;
                     transition: all 0.2s ease-in-out;
                     border-radius: 10px;
                     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                  }
                  
                  .img-fancy-btn:hover {
                     background: #910000;
                     color: #fff;
                  }
                  
                  .img-fancy-btn a {
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     opacity: 0;
                     z-index: 1;
                  }
                  
                  .img-fancy-btn a:first-of-type {
                     opacity: 1;
                     position: static;
                     display: inline-block;
                     width: 100%;
                     height: 100%;
                  }
               `}</style>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
               <div className="col-lg-2">
                  <div className="position-relative p-15 w-100 h-100 border-15 bg-white shadow4">
                     <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        direction="vertical"
                        watchSlidesProgress
                        className="property-thumb-gallery"
                        style={{ height: '600px' }}
                     >
                        {images.map((img, i) => (
                           <SwiperSlide key={i}>
                              <Image 
                                 src={img} 
                                 alt={`Thumbnail ${i + 1}`} 
                                 width={200}
                                 height={150}
                                 className="w-100 border-10" 
                                 style={{ objectFit: 'cover', height: '140px', cursor: 'pointer' }}
                              />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default PropertyMediaGallery
