'use client'

const PropertyOverview = ({ property, locale, t, dynamicT }) => {
   // Get localized property type (รองรับ 4 ภาษา: th, en, zh, ru)
   const getPropertyType = () => {
      const propertyType = property?.propertyType
      if (!propertyType) return 'N/A'
      
      if (locale === 'th') {
         return propertyType.name_th || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else if (locale === 'zh') {
         return propertyType.name_zh || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else if (locale === 'ru') {
         return propertyType.name_ru || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else {
         return propertyType.nameEn || propertyType.name_en || 'N/A'
      }
   }

   const overviewItems = [
      {
         icon: 'flaticon-home',
         label: dynamicT ? dynamicT('property-type', 'Property Type') : 'Property Type',
         value: getPropertyType()
      },
      {
         icon: 'flaticon-bed',
         label: dynamicT ? dynamicT('bedrooms', 'Bedroom') : 'Bedroom',
         value: property?.bedrooms || 'N/A'
      },
      {
         icon: 'flaticon-shower',
         label: dynamicT ? dynamicT('bathrooms', 'Bathroom') : 'Bathroom',
         value: property?.bathrooms || 'N/A'
      },
      {
         icon: 'flaticon-expand',
         label: dynamicT ? dynamicT('usable-area', 'Useable Area') : 'Useable Area',
         value: property?.usableArea || property?.usable_area ? `${property.usableArea || property.usable_area} sqm` : 'N/A'
      }
   ]

   return (
      <div className="property-overview-section">{/* ลบ wrapper card ออก */}
         <div className="row g-4">
            {overviewItems.map((item, index) => (
               <div key={index} className="col-6 col-md-3">
                  <div className="overview-card d-flex align-items-center p-3" style={{
                     backgroundColor: 'transparent',
                     borderRadius: '10px',
                     minHeight: '80px'
                  }}>
                     <div className="icon-box me-3" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#3c3c3c',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '22px',
                        flexShrink: 0
                     }}>
                        <i className={item.icon}></i>
                     </div>
                     <div className="content">
                        <div className="label" style={{
                           fontSize: '14px',
                           color: '#666',
                           marginBottom: '4px'
                        }}>
                           {item.label}
                        </div>
                        <div className="value" style={{
                           fontSize: '16px',
                           fontWeight: '600',
                           color: '#333'
                        }}>
                           {item.value}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default PropertyOverview
