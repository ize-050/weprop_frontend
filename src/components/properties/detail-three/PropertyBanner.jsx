'use client'

import Link from 'next/link'
import { useState } from 'react'
import { convertAndFormatPriceSync } from '@/utils/currencyUtils'

const PropertyBanner = ({ property, locale, t }) => {
   const [isFavorite, setIsFavorite] = useState(false)

   // Get localized title
   const getTitle = () => {
      return property?.displayTitle || property?.title || ''
   }

   // Get listing types (เหมือนหน้าเดิม)
   const getListingTypes = () => {
      if (!property?.listings || property.listings.length === 0) return []
      
      const listingTypeTranslations = {
         'RENT': { 'en': 'RENT', 'th': 'เช่า', 'zh': '租赁', 'ru': 'АРЕНДА' },
         'SALE': { 'en': 'SALE', 'th': 'ขาย', 'zh': '出售', 'ru': 'ПРОДАЖА' },
         'SALE_RENT': { 'en': 'SALE/RENT', 'th': 'ขาย/เช่า', 'zh': '出售/租赁', 'ru': 'ПРОДАЖА/АРЕНДА' }
      }
      
      return property.listings.map(listing => 
         listingTypeTranslations[listing.listingType]?.[locale] || listing.listingType
      ).join(', ')
   }

   // Get primary listings (เหมือนหน้าเดิม)
   const getPrimaryListings = () => {
      if (!property?.listings || property.listings.length === 0) return []
      return property.listings
   }

   // Format price with currency (เหมือนหน้าเดิม)
   const formatPriceWithCurrency = (price) => {
      if (!price || isNaN(price)) return '-'
      return convertAndFormatPriceSync(price, locale, true)
   }

   const primaryListings = getPrimaryListings()

   // Get location
   const getLocation = () => {
      const parts = []
      if (property?.subdistrict) parts.push(property.subdistrict)
      if (property?.district) parts.push(property.district)
      if (property?.province) parts.push(property.province)
      return parts.join(', ') || 'Location not specified'
   }

   const handleShare = () => {
      if (navigator.share) {
         navigator.share({
            title: getTitle(),
            url: window.location.href
         })
      }
   }

   const toggleFavorite = () => {
      setIsFavorite(!isFavorite)
      // TODO: Add to favorites API
   }

   return (
      <div className="property-banner-xd mb-4">
         <div className="row align-items-center">
            {/* Left Side - Title, Status, Location */}
            <div className="col-lg-8">
               <div className="property-info-box" style={{
               
                  padding: '20px 25px',
                  borderRadius: '8px',
                
                  marginBottom: '15px'
               }}>
                  <h1 className="property-title mb-0" style={{ 
                     fontSize: '36px', 
                     fontWeight: '600', 
                     lineHeight: '1.3',
                     color: '#000',
                     fontFamily: 'inherit'
                  }}>
                     {getTitle()}
                  </h1>
               </div>
               <div className="d-flex align-items-center gap-3 flex-wrap">
                  <span className="badge px-3 py-2" style={{ 
                     fontSize: '11px', 
                     fontWeight: '700', 
                     textTransform: 'uppercase',
                     backgroundColor: '#00d4aa',
                     color: '#fff',
                     borderRadius: '20px',
                     letterSpacing: '0.5px'
                  }}>
                     {t('for')} {getListingTypes()}
                  </span>
                  <span style={{ 
                     fontSize: '15px',
                     color: '#666',
                     fontWeight: '400'
                  }}>
                     <i className="bi bi-geo-alt me-1" style={{ color: '#ff5a5f' }}></i>
                     {getLocation()}
                  </span>
               </div>
            </div>

            {/* Right Side - Price */}
            <div className="col-lg-4">
               <div className="property-prices text-lg-end text-start mt-3 mt-lg-0">
                  {primaryListings.map((listing, index) => {
                     const hasDiscount = listing.promotionalPrice && parseFloat(listing.promotionalPrice) < parseFloat(listing.price)
                     const displayPrice = hasDiscount ? listing.promotionalPrice : listing.price
                     const isRent = listing.listingType === 'RENT'

                     return (
                        <div key={listing.id || index} className="price-block mb-2">
                           {hasDiscount && (
                              <div className="original-price mb-1" style={{ 
                                 textDecoration: 'line-through', 
                                 opacity: 0.5, 
                                 fontSize: '20px',
                                 color: '#999',
                                 fontWeight: '500'
                              }}>
                                 {formatPriceWithCurrency(listing.price)}
                              </div>
                           )}
                           <div className="current-price">
                              <span style={{ 
                                 fontSize: '42px', 
                                 fontWeight: '700', 
                                 color: '#000',
                                 lineHeight: '1',
                                 fontFamily: 'inherit'
                              }}>
                                 {formatPriceWithCurrency(displayPrice)}
                              </span>
                           </div>
                           {isRent && (
                              <div className="text-muted" style={{ fontSize: '16px', fontWeight: '400' }}>
                                 {t('perMonth')}
                              </div>
                           )}
                        </div>
                     )
                  })}
                  {primaryListings.length === 0 && (
                     <div className="price-block">
                        <div className="current-price" style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>
                           Contact for price
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default PropertyBanner
