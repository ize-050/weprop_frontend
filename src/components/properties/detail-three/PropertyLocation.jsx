'use client'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const PropertyLocation = ({ property, locale, t, dynamicT }) => {
   const mapContainerStyle = {
      width: '100%',
      height: '400px',
      borderRadius: '20px'
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

   // Get localized address (รองรับ 4 ภาษา)
   const getAddress = () => {
      if (locale !== 'en') {
         return property?.translatedAddresses?.[locale] || property?.address || 'Address not specified'
      } else {
         return property?.address || 'Address not specified'
      }
   }

   return (
      <div className="property-location mb-50">
         <div className="property-section bg-white shadow4 border-20 p-40">
            <h3 className="section-title mb-3">{dynamicT ? dynamicT('location', 'Location') : 'Location'}</h3>
            <p className="mb-4">
               {getAddress()}
            </p>
            
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

export default PropertyLocation
