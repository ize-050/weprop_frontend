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

   const center = {
      lat: property?.lat || 12.9236,
      lng: property?.lng || 100.8825
   }

   const mapOptions = {
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
   }

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h3 className="section-title mb-3">{t('propertyDetails')}</h3>
         
         {/* Details Table */}
         <div className="table-responsive property-details-table border-0 mb-4">
            <table className="table table-borderless">
               <tbody style={{ borderStyle: 'hidden !important' }}>
                  <tr style={{ borderStyle: 'hidden !important' }}>
                     <th>{t('propertyCode')}</th>
                     <td>{property?.propertyCode || property?.property_code || 'N/A'}</td>
                     <th>{t('ownershipQuota')}</th>
                     <td>{property?.ownershipQuota || property?.ownership_quota || 'N/A'}</td>
                  </tr>
                  <tr style={{ borderStyle: 'hidden !important' }}>
                     <th>{t('landSize')}</th>
                     <td>{formatLandSize()}</td>
                     <th></th>
                     <td></td>
                  </tr>
                  <tr>
                     <th>{t('usableArea')}</th>
                     <td>{property?.usableArea || property?.usable_area ? `${property.usableArea || property.usable_area} ${t('sqm')}` : 'N/A'}</td>
                     <th>{t('floor')}</th>
                     <td>{property?.floors ? `${property.floors} ${t('floors')}` : 'N/A'}</td>
                  </tr>
                  <tr>
                     <th>{t('furnishing')}</th>
                     <td>{getFurnishingText(property?.furnishing)}</td>
                     <th>{t('bedrooms')}</th>
                     <td>{property?.bedrooms || 'N/A'}</td>
                  </tr>
                  <tr>
                     <th>{t('bathrooms')}</th>
                     <td>{property?.bathrooms || 'N/A'}</td>
                     <th>{t('constructionYear')}</th>
                     <td>{property?.constructionYear || property?.construction_year || 'N/A'}</td>
                  </tr>
                  {(property?.communityFee || property?.community_fee) && (
                     <tr>
                        <th>{t('communityFees')}</th>
                        <td>{property?.communityFee || property?.community_fee}</td>
                        <th></th>
                        <td></td>
                     </tr>
                  )}
                  <tr>
                     <th>{t('area')}</th>
                     <td>{property?.district || 'N/A'}</td>
                     <th></th>
                     <td></td>
                  </tr>
                  <tr>
                     <th>{t('address')}</th>
                     <td colSpan="3">{getAddress()}</td>
                  </tr>
               </tbody>
            </table>
         </div>

         {/* Responsive Styles */}
         <style jsx>{`
            .property-details-table {
               overflow-x: auto;
               -webkit-overflow-scrolling: touch;
               scrollbar-width: thin;
               scrollbar-color: #910000 #f0f0f0;
            }
            
            .property-details-table::-webkit-scrollbar {
               height: 8px;
            }
            
            .property-details-table::-webkit-scrollbar-track {
               background: #f0f0f0;
               border-radius: 10px;
            }
            
            .property-details-table::-webkit-scrollbar-thumb {
               background: #910000;
               border-radius: 10px;
            }
            
            .property-details-table::-webkit-scrollbar-thumb:hover {
               background: #750000;
            }
            
            .property-details-table table {
               min-width: 800px;
               margin-bottom: 0;
            }
            
            .property-details-table th {
               white-space: nowrap;
               font-weight: 600;
               color: #666;
               padding: 12px 15px;
               font-size: 14px;
            }
            
            .property-details-table td {
               padding: 12px 15px;
               color: #333;
               font-size: 14px;
            }
            
            @media (max-width: 768px) {
               .property-section {
                  padding: 20px !important;
               }
               
               .property-details-table th,
               .property-details-table td {
                  padding: 10px 12px;
                  font-size: 13px;
               }
               
               .section-title {
                  font-size: 20px !important;
               }
            }
            
            @media (max-width: 576px) {
               .property-section {
                  padding: 15px !important;
               }
               
               .property-details-table th,
               .property-details-table td {
                  padding: 8px 10px;
                  font-size: 12px;
               }
               
               .section-title {
                  font-size: 18px !important;
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
