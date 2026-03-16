"use client"
import { useState, useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import Slider from "react-slick"

const PropertyTypes = () => {
   const locale = useLocale()
   const [propertyTypes, setPropertyTypes] = useState([])
   const [loading, setLoading] = useState(true)
   const sliderRef = useRef(null)
   const t = useTranslations()

   // Slider settings
   const sliderSettings = {
      dots: true,
      arrows: false, // ปิด default arrows
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   }

   useEffect(() => {
      const fetchPropertyTypes = async () => {
         try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/property-types`)

         
            if (!response.ok) {
               throw new Error(`API Error: ${response.status}`)
            }
            
            const result = await response.json()
            
            const data = result.status === 'success' ? result.data : result
         
            // Priority types to show first: House, Condo, Commercial, Land
            const priorityTypes = ['House', 'Condo', 'Commercial', 'Land']
            
            // Separate priority types and others
            const priorityItems = []
            const otherItems = []
            
            data.forEach(type => {
               const typeName = type.name || type.nameEn
               const isPriority = priorityTypes.some(p => 
                  typeName?.toLowerCase() === p.toLowerCase()
               )
               if (isPriority) {
                  priorityItems.push(type)
               } else {
                  otherItems.push(type)
               }
            })
            
            // Sort priority items by the defined order
            priorityItems.sort((a, b) => {
               const nameA = a.name || a.nameEn
               const nameB = b.name || b.nameEn
               const orderA = priorityTypes.findIndex(t => t.toLowerCase() === nameA?.toLowerCase())
               const orderB = priorityTypes.findIndex(t => t.toLowerCase() === nameB?.toLowerCase())
               return orderA - orderB
            })
            
            // แสดงเฉพาะ 4 ประเภทที่ต้องการ (House, Condo, Commercial, Land)
            const filteredTypes = priorityItems
            
            // Map locale to field name (Prisma uses camelCase)
            const localeMap = {
               'en': 'nameEn',
               'th': 'nameTh',
               'zh': 'nameCh',
               'ru': 'nameRu'
            }
            const nameField = localeMap[locale] || 'nameEn'
            
            // Map to component format with CSS class names
            const bgClassMap = {
               'Condo': 'category-4-item-1',
               'Pool Villa': 'category-4-item-2', 
               'House': 'category-4-item-4',
               'Townhouse': 'category-4-item-5' // Reuse class if needed
            }
            
            
            
            const mappedTypes = filteredTypes.map((type, index) => {
               // Get image path with proper fallback
               const imagePath = type.p_image || type.pImage || type.z_image || '';
               const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
               const imageUrl = imagePath 
                  ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`)
                  : '/assets/images/listing/img_large_01.jpg';
               
               return {
                  id: type.id,
                  name: type[nameField] || type.nameEn || type.name,
                  slug: type.nameEn || type.name_en || type.name,
                  image: imageUrl,
                  bgClass: bgClassMap[type.nameEn || type.name_en] || '',
                  delay: `${index * 0.1}s`
               };
            })

            console.log("MappedTypes",mappedTypes)
            
            
            setPropertyTypes(mappedTypes)
            setLoading(false)
         } catch (error) {
            console.error('Error fetching property types:', error)
            // Fallback data
         
            setLoading(false)
         }
      }

      fetchPropertyTypes()
   }, [locale])

   if (loading) {
      return (
         <div className="category-section-two mt-170 xl-mt-120">
            <div className="container container-large">
               <div className="position-relative">
                  <div className="title-one text-center mb-60">
                     <h3>Loading...</h3>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="category-section-two mt-120 xl-mt-120">
         <div className="container container-large">
            <div className="position-relative">
               <div className="title-one text-center text-lg-start mb-60 xl-mb-40 lg-mb-20 wow fadeInUp">
                  <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: 'clamp(24px, 5vw, 42px)', lineHeight: '1.2', fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>{t('propertyTypesTitle')}</h3>
               </div>
               
               <Slider ref={sliderRef} {...sliderSettings} className="property-types-slider">
                  {propertyTypes.map((type) => (
                     <div key={type.id} className="px-2">
                        <div 
                           className={`card-style-seven position-relative z-1 rounded-circle overflow-hidden d-flex align-items-center justify-content-center ${type.bgClass || ''}`}
                           style={type.image ? {
                              backgroundImage:`url(${type.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              height: '280px',
                              width: '280px',
                              margin: '0 auto'
                           } : {
                              height: '280px',
                              width: '280px',
                              margin: '0 auto'
                           }}
                        >
                           <Link 
                              href={`/properties?type=sale&propertyType=${encodeURIComponent(type.slug)}`} 
                              className="title stretched-link"
                           >
                              <h4 className="text-white tran3s">{type.name}</h4>
                           </Link>
                        </div>
                     </div>
                  ))}
               </Slider>
               
               {/* Controls: Arrows */}
               <div className="property-types-controls">
                  <button 
                     onClick={() => sliderRef.current?.slickPrev()}
                     className="property-types-arrow"
                     aria-label="Previous"
                  >
                     <i className="bi bi-chevron-left"></i>
                  </button>
                  
                  <button 
                     onClick={() => sliderRef.current?.slickNext()}
                     className="property-types-arrow"
                     aria-label="Next"
                  >
                     <i className="bi bi-chevron-right"></i>
                  </button>
               </div>
               
               <style jsx global>{`
                  /* ซ่อน dots เดิม */
                  .property-types-slider .slick-dots {
                     display: none !important;
                  }
                  
                  /* Custom Arrow Buttons */
                  .property-types-arrow {
                     width: 40px;
                     height: 40px;
                     background: white;
                     border: 2px solid #e0e0e0;
                     border-radius: 50%;
                     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                     transition: all 0.3s ease;
                     cursor: pointer;
                     display: inline-flex;
                     align-items: center;
                     justify-content: center;
                     font-size: 18px;
                     color: #666;
                  }
                  .property-types-arrow:hover {
                     background: #910000;
                     border-color: #910000;
                     color: white;
                     box-shadow: 0 4px 12px rgba(145, 0, 0, 0.3);
                     transform: scale(1.1);
                  }
                  .property-types-arrow:active {
                     transform: scale(0.95);
                  }
                  .property-types-arrow:disabled {
                     opacity: 0.3;
                     cursor: not-allowed;
                  }
                  
                  /* Container สำหรับ arrows */
                  .property-types-controls {
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     margin-top: 60px;
                     gap: 15px;
                  }
                  
                  /* Mobile responsive */
                  @media (max-width: 768px) {
                     .property-types-arrow {
                        width: 35px;
                        height: 35px;
                        font-size: 16px;
                     }
                     .property-types-controls {
                        margin-top: 40px;
                        gap: 10px;
                     }
                  }
               `}</style>
            </div>
         </div>
      </div>
   )
}

export default PropertyTypes
