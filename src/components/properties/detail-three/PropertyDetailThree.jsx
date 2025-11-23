'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import '@/styles/property-detail.scss'
import '@/styles/property-detail-sections.scss'
import PropertyBanner from './PropertyBanner'
import PropertyMediaGallery from './PropertyMediaGallery'
import PropertyOverview from './PropertyOverview'
import PropertySidebar from './PropertySidebar'
import PropertyDescription from './PropertyDescription'
import PropertyHighlights from './PropertyHighlights'
import PropertyDetails from './PropertyDetails'
import PropertyAmenities from './PropertyAmenities'
import PropertyFacilities from './PropertyFacilities'
import PropertyNearby from './PropertyNearby'
import PropertyView from './PropertyView'
import PropertyFloorPlans from './PropertyFloorPlans'
import PropertyUnitPlan from './PropertyUnitPlan'
import PropertyVideo from './PropertyVideo'
import PropertySimilar from './PropertySimilar'
import PropertyContactAgent from './PropertyContactAgent'
// import PropertyPaymentPlan from './PropertyPaymentPlan'

const PropertyDetailThree = ({ propertyData }) => {
   const params = useParams()
   const locale = params?.locale || 'th'
   const t = useTranslations()

   return (
      <div className="listing-details-one theme-details-one bg-pink pt-50 lg-pt-50 pb-150 xl-pb-120">
         <div className="container">
            <PropertyBanner property={propertyData} locale={locale} t={t} />
            <PropertyMediaGallery property={propertyData} t={t} />
            
            <div className="property-feature-list bg-white shadow4 border-20 p-40 mt-50 mb-60">
               <h4 className="sub-title-one mb-40 lg-mb-20">{t('propertyOverview')}</h4>
               <PropertyOverview property={propertyData} locale={locale} t={t} />
            </div>

            {/* Highlights (แยก card) */}
            <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
               <PropertyHighlights property={propertyData} locale={locale} t={t} />
            </div>

            <div className="row">
               <div className="col-xl-8">
                  {/* Description (4 ภาษา) */}
                  <PropertyDescription property={propertyData} locale={locale} t={t} />
                  
                  {/* Property Details + Map */}
                  <PropertyDetails property={propertyData} locale={locale} t={t} />
                  
                  {/* Combined Card: Nearby, View, Facilities, Amenities */}
                  <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
                     {/* Nearby */}
                     <div className="mb-50">
                        <PropertyNearby property={propertyData} locale={locale} t={t} />
                     </div>
                     
                     {/* View */}
                     <PropertyView property={propertyData} locale={locale} t={t} />
                     
                     {/* Facilities */}
                     <div className="mb-50">
                        <PropertyFacilities property={propertyData} locale={locale} t={t} />
                     </div>
                     
                     {/* Amenities */}
                     <div>
                        <PropertyAmenities property={propertyData} locale={locale} t={t} />
                     </div>
                  </div>
                  
                  {/* 360 View */}
                  <PropertyVideo property={propertyData} t={t} />
                  
                  {/* Floor Plans */}
                   <PropertyFloorPlans property={propertyData} t={t} /> 
                  
                  {/* Payment Plan (4 ภาษา) - ไว้ล่าง Floor Plans */}
                  {/* <PropertyPaymentPlan property={propertyData} locale={locale} t={t} /> */}
                  
                  {/* Unit Plans */}
                   <PropertyUnitPlan property={propertyData} t={t} /> 
                  
                  {/* Similar Homes */}
                  <PropertySimilar property={propertyData} locale={locale} t={t} />
               </div>
               
               <div className="col-xl-4">
                  {/* Contact Agent */}
                  <PropertyContactAgent property={propertyData} />
                  
                  {/* Sidebar */}
                  <PropertySidebar property={propertyData} locale={locale} t={t} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default PropertyDetailThree
