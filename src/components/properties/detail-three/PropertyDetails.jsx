'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const PropertyDetails = ({ property, locale, t }) => {
   // Format land size
   const formatLandSize = () => {
      const { landSizeRai, landSizeNgan, landSizeSqWah, landSizeSqm } = property || {}
      const parts = []
      if (landSizeRai > 0) parts.push(`${landSizeRai} ${t('rai')}`)
      if (landSizeNgan > 0) parts.push(`${landSizeNgan} ${t('ngan')}`)
      if (landSizeSqWah > 0) parts.push(`${landSizeSqWah} ${t('sqWah')}`)
      if (landSizeSqm > 0) parts.push(`${landSizeSqm} ${t('sqm')}`)
      return parts.length > 0 ? parts.join(' ') : 'N/A'
   }

   // Get furnishing text
   const getFurnishingText = (furnishing) => {
      if (!furnishing) return 'N/A'
      return furnishing.replace(/_/g, ' ')
   }

   // Get localized address
   const getAddress = () => {
      if (locale !== 'en') {
         return property?.translatedAddresses?.[locale] || property?.address || 'N/A'
      } else {
         return property?.address || 'N/A'
      }
   }

   // Google Map settings
   const mapContainerStyle = {
      width: '100%',
      height: '400px',
      borderRadius: '10px'
   }

   // Debug: log lat/lng from property
   console.log('Property lat/lng:', { lat: property?.latitude, lng: property?.longitude, property })

   const center = {
      lat: parseFloat(property?.latitude) ,
      lng: parseFloat(property?.longitude)
   }

   const mapOptions = {
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
   }

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h3 className="section-title mb-3">{t('propertyDetails')}</h3>
         
         {/* Details - Responsive Grid */}
         <div className="property-details-grid mb-4">
            <div className="row g-3">
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('propertyCode')}</span>
                     <span className="detail-value">{property?.propertyCode || property?.property_code || 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('ownershipQuota')}</span>
                     <span className="detail-value">{property?.ownershipQuota || property?.ownership_quota || 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('landSize')}</span>
                     <span className="detail-value">{formatLandSize()}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('usableArea')}</span>
                     <span className="detail-value">{property?.usableArea || property?.usable_area ? `${property.usableArea || property.usable_area} ${t('sqm')}` : 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('furnishing')}</span>
                     <span className="detail-value">{getFurnishingText(property?.furnishing)}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('bedrooms')}</span>
                     <span className="detail-value">{property?.bedrooms || 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('bathrooms')}</span>
                     <span className="detail-value">{property?.bathrooms || 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('floor')}</span>
                     <span className="detail-value">{property?.floors ? `${property.floors}` : 'N/A'}</span>
                  </div>
               </div>
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('constructionYear')}</span>
                     <span className="detail-value">{property?.constructionYear || property?.construction_year || 'N/A'}</span>
                  </div>
               </div>
               {(property?.communityFee || property?.community_fee) && (
                  <div className="col-6 col-md-3">
                     <div className="detail-item">
                        <span className="detail-label">{t('communityFees')}</span>
                        <span className="detail-value">{property?.communityFee || property?.community_fee}</span>
                     </div>
                  </div>
               )}
               <div className="col-6 col-md-3">
                  <div className="detail-item">
                     <span className="detail-label">{t('area')}</span>
                     <span className="detail-value">{property?.district || 'N/A'}</span>
                  </div>
               </div>
               <div className="col-12">
                  <div className="detail-item">
                     <span className="detail-label">{t('address')}</span>
                     <span className="detail-value">{getAddress()}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Responsive Styles */}
         <style jsx>{`
            .property-details-grid .detail-item {
               display: flex;
               flex-direction: column;
               padding: 12px;
               background: #f8f9fa;
               border-radius: 8px;
               height: 100%;
            }
            
            .property-details-grid .detail-label {
               font-size: 12px;
               color: #666;
               font-weight: 600;
               margin-bottom: 4px;
               text-transform: uppercase;
            }
            
            .property-details-grid .detail-value {
               font-size: 14px;
               color: #333;
               font-weight: 500;
            }
            
            @media (max-width: 768px) {
               .property-section {
                  padding: 20px !important;
               }
               
               .section-title {
                  font-size: 20px !important;
               }
               
               .property-details-grid .detail-item {
                  padding: 10px;
               }
               
               .property-details-grid .detail-label {
                  font-size: 11px;
               }
               
               .property-details-grid .detail-value {
                  font-size: 13px;
               }
            }
            
            @media (max-width: 576px) {
               .property-section {
                  padding: 15px !important;
               }
               
               .section-title {
                  font-size: 18px !important;
               }
               
               .property-details-grid .detail-item {
                  padding: 8px;
               }
               
               .property-details-grid .detail-label {
                  font-size: 10px;
               }
               
               .property-details-grid .detail-value {
                  font-size: 12px;
               }
            }
         `}</style>

         {/* Google Map */}
         <div className="property-map">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
               <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                  options={mapOptions}
               >
                  <Marker position={center} />
               </GoogleMap>
            </LoadScript>
         </div>
      </div>
   )
}

export default PropertyDetails
