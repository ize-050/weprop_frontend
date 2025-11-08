'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const PropertyDetails = ({ property, locale, t, dynamicT }) => {
   // Format land size
   const formatLandSize = () => {
      const { landSizeRai, landSizeNgan, landSizeSqWah, landSizeSqm } = property || {}
      const parts = []
      if (landSizeRai > 0) parts.push(`${landSizeRai} ${dynamicT ? dynamicT('rai', 'Rai') : 'Rai'}`)
      if (landSizeNgan > 0) parts.push(`${landSizeNgan} ${dynamicT ? dynamicT('ngan', 'Ngan') : 'Ngan'}`)
      if (landSizeSqWah > 0) parts.push(`${landSizeSqWah} ${dynamicT ? dynamicT('sq-wah', 'Sq.Wah') : 'Sq.Wah'}`)
      if (landSizeSqm > 0) parts.push(`${landSizeSqm} ${dynamicT ? dynamicT('sqm', 'Sqm') : 'Sqm'}`)
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
         <h3 className="section-title mb-3">{dynamicT ? dynamicT('details', 'Property Details') : 'Property Details'}</h3>
         
         {/* Details Table */}
         <div className="table-responsive property-details-table border-0 mb-4">
            <table className="table table-borderless">
               <tbody style={{ borderStyle: 'hidden !important' }}>
                  <tr style={{ borderStyle: 'hidden !important' }}>
                     <th>{dynamicT ? dynamicT('property-code', 'Property ID') : 'Property ID'}</th>
                     <td>{property?.propertyCode || property?.property_code || 'N/A'}</td>
                     <th>{dynamicT ? dynamicT('ownership-quota', 'Ownership Quota') : 'Ownership Quota'}</th>
                     <td>{property?.ownershipQuota || property?.ownership_quota || 'N/A'}</td>
                  </tr>
                  <tr style={{ borderStyle: 'hidden !important' }}>
                     <th>{dynamicT ? dynamicT('land-size', 'Land Size') : 'Land Size'}</th>
                     <td>{formatLandSize()}</td>
                     <th></th>
                     <td></td>
                  </tr>
                  <tr>
                     <th>{dynamicT ? dynamicT('usable-area', 'Useable Area') : 'Useable Area'}</th>
                     <td>{property?.usableArea || property?.usable_area ? `${property.usableArea || property.usable_area} ${dynamicT ? dynamicT('sqm', 'sqm') : 'sqm'}` : 'N/A'}</td>
                     <th>{dynamicT ? dynamicT('floor', 'Floor') : 'Floor'}</th>
                     <td>{property?.floors ? `${property.floors} ${dynamicT ? dynamicT('floors-unit', 'Floors') : 'Floors'}` : 'N/A'}</td>
                  </tr>
                  <tr>
                     <th>{dynamicT ? dynamicT('furnishing', 'Furnishing') : 'Furnishing'}</th>
                     <td>{getFurnishingText(property?.furnishing)}</td>
                     <th>{dynamicT ? dynamicT('bedrooms', 'Bedrooms') : 'Bedrooms'}</th>
                     <td>{property?.bedrooms || 'N/A'}</td>
                  </tr>
                  <tr>
                     <th>{dynamicT ? dynamicT('bathrooms', 'Bathrooms') : 'Bathrooms'}</th>
                     <td>{property?.bathrooms || 'N/A'}</td>
                     <th>{dynamicT ? dynamicT('construction-year', 'Construction Year') : 'Construction Year'}</th>
                     <td>{property?.constructionYear || property?.construction_year || 'N/A'}</td>
                  </tr>
                  {(property?.communityFee || property?.community_fee) && (
                     <tr>
                        <th>{dynamicT ? dynamicT('community-fees', 'Community Fees') : 'Community Fees'}</th>
                        <td>{property?.communityFee || property?.community_fee}</td>
                        <th></th>
                        <td></td>
                     </tr>
                  )}
                  <tr>
                     <th>{dynamicT ? dynamicT('area', 'Area') : 'Area'}</th>
                     <td>{property?.district || 'N/A'}</td>
                     <th></th>
                     <td></td>
                  </tr>
                  <tr>
                     <th>{dynamicT ? dynamicT('address', 'Address') : 'Address'}</th>
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
