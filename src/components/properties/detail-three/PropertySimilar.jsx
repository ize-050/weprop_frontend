'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { convertAndFormatPriceSync } from '@/utils/currencyUtils'
import ContactModal from '@/components/common/ContactModal/ContactModal'
import createSlug from '@/utils/slugify'
import Fancybox from '@/components/common/Fancybox'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PropertySimilar = ({ property, locale, t }) => {
   const router = useRouter()
   const [relatedProperties, setRelatedProperties] = useState([])
   const [loading, setLoading] = useState(true)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedProperty, setSelectedProperty] = useState(null)

   const getRelatedTitle = (prop) => {
      if (prop?.translatedTitles) {
         try {
            const titles = JSON.parse(prop.translatedTitles)
            return titles[locale] || titles['en'] || prop.title
         } catch (e) {
            return prop.title
         }
      }
      return prop?.title
   }

   useEffect(() => {
      const fetchRelatedProperties = async () => {
         if (!property?.zoneId) return

         try {
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zones/${property.zoneId}/properties?limit=9`, {
               headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
               },
            })

            if (!response.ok) {
               throw new Error('Failed to fetch related properties')
            }

            const data = await response.json()
            // Filter out the current property
            const filteredProperties = data.data.filter(r => r.id != property.id)
            setRelatedProperties(filteredProperties)
         } catch (error) {
            console.error('Error fetching related properties:', error)
         } finally {
            setLoading(false)
         }
      }

      fetchRelatedProperties()
   }, [property])

   if (loading) {
      return (
         <div className="related-listings-section mb-50">
            <h3 className="section-title mb-4">{t('similarHomes')}</h3>
            <div className="loading-spinner">{t('loading')}</div>
         </div>
      )
   }

   if (!relatedProperties.length) {
      return null
   }

   const handleContactClick = (e, prop) => {
      e.preventDefault()
      e.stopPropagation()
      setSelectedProperty(prop)
      setIsModalOpen(true)
   }

   return (
      <div className="similar-property mb-50">
         <h4 className="mb-40">{t('similarHomes')}</h4>
         
         <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
               nextEl: '.similar-next',
               prevEl: '.similar-prev',
            }}
            pagination={{
               el: '.similar-pagination',
               clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            breakpoints={{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               992: { slidesPerView: 3 },
            }}
            className="similar-listing-slider-one"
         >
            {relatedProperties.map((prop) => {
               const salePrice = prop.listings?.find(l => l.listingType === 'SALE')?.price || 0
               const rentPrice = prop.listings?.find(l => l.listingType === 'RENT')?.price || 0
               const slug = createSlug(prop.title)
               const propertyDetailUrl = `/${locale !== 'th' ? locale + '/' : ''}property_detail/${prop.id}/${slug}`
               const mainImage = prop.images && prop.images.length > 0 ? prop.images[0]?.url : null
               
               // Get listing type badge
               const getListingBadge = () => {
                  const hasSale = prop.listings?.some(l => l.listingType === 'SALE')
                  const hasRent = prop.listings?.some(l => l.listingType === 'RENT')
                  
                  if (hasSale && hasRent) {
                     return locale === 'th' ? 'ขาย/เช่า' : locale === 'zh' ? '出售/租赁' : locale === 'ru' ? 'Продажа/Аренда' : 'FOR SALE/RENT'
                  } else if (hasSale) {
                     return locale === 'th' ? 'ขาย' : locale === 'zh' ? '出售' : locale === 'ru' ? 'Продажа' : 'FOR SALE'
                  } else if (hasRent) {
                     return locale === 'th' ? 'เช่า' : locale === 'zh' ? '租赁' : locale === 'ru' ? 'Аренда' : 'FOR RENT'
                  }
                  return 'FOR SALE'
               }
               
               return (
                  <SwiperSlide key={prop.id}>
                     <div className="item">
                        <div className="listing-card-one shadow4 style-three border-30 mb-50">
                           <div className="img-gallery p-15">
                              <div className="position-relative border-20 overflow-hidden">
                                 <div className="tag bg-white text-dark fw-500 border-20">{getListingBadge()}</div>
                                 {mainImage && (
                                    <img 
                                       src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${mainImage}`}
                                       className="w-100 border-20" 
                                       alt={getRelatedTitle(prop)}
                                       style={{ height: '250px', objectFit: 'cover' }}
                                    />
                                 )}
                                 <Link 
                                    href={propertyDetailUrl}
                                    className="btn-four inverse rounded-circle position-absolute"
                                 >
                                    <i className="bi bi-arrow-up-right"></i>
                                 </Link>
                                 <div className="img-slider-btn">
                                    {prop.images?.length || 0} <i className="fa-regular fa-image"></i>
                                    <Fancybox
                                       options={{
                                          Carousel: {
                                             infinite: true,
                                          },
                                       }}
                                    >
                                       {prop.images?.map((img, index) => (
                                          <a 
                                             key={index} 
                                             className="d-block" 
                                             data-fancybox={`gallery-${prop.id}`}
                                             href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.url}`}
                                          ></a>
                                       ))}
                                    </Fancybox>
                                 </div>
                              </div>
                           </div>
                           <div className="property-info pe-4 ps-4">
                              <Link href={propertyDetailUrl} className="title tran3s">
                                 {getRelatedTitle(prop)}
                              </Link>
                              <div className="address m0 pb-5">
                                 {prop.zone?.[`name_${locale}`] || prop.zone?.name}
                              </div>
                              <ul className="style-none d-flex align-items-center justify-content-between mb-3">
                                 <li><i className="fa-light fa-bed-front me-2"></i>{prop.bedrooms || 0} {t('bed')}</li>
                                 <li><i className="fa-light fa-bath me-2"></i>{prop.bathrooms || 0} {t('bath')}</li>
                                 <li><i className="fa-light fa-ruler-combined me-2"></i>{prop.usableArea || 0} {t('sqm')}</li>
                              </ul>
                              <div className="pl-footer m0 d-flex align-items-center justify-content-between">
                                 <div className="price-container">
                                    {salePrice > 0 && (
                                       <strong className="price fw-500 color-dark d-block">
                                          {convertAndFormatPriceSync(salePrice, 'THB', locale)}
                                       </strong>
                                    )}
                                    {rentPrice > 0 && (
                                       <strong className="price fw-500 color-dark d-block">
                                          {convertAndFormatPriceSync(rentPrice, 'THB', locale)}{t('perMonth')}
                                       </strong>
                                    )}
                                 </div>
                                 <ul className="style-none d-flex action-icons">
                                    <li>
                                       <a 
                                          href="#" 
                                          onClick={(e) => handleContactClick(e, prop)}
                                          style={{ 
                                             width: '40px', 
                                             height: '40px', 
                                             backgroundColor: '#9e0b0f',
                                             borderRadius: '50%',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center',
                                             color: '#fff'
                                          }}
                                       >
                                          <i className="fa-light fa-phone"></i>
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               )
            })}
         </Swiper>

         {/* Navigation buttons */}
         <div className="similar-prev swiper-button-prev"></div>
         <div className="similar-next swiper-button-next"></div>
         <div className="similar-pagination swiper-pagination"></div>

         <ContactModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            property={selectedProperty}
         />
      </div>
   )
}

export default PropertySimilar
