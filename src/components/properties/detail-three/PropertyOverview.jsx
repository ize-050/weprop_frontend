'use client'

const PropertyOverview = ({ property, locale, t }) => {
   // Get localized property type (รองรับ 4 ภาษา: th, en, zh, ru)
   const getPropertyType = () => {
      const propertyType = property?.propertyType
      if (!propertyType) return 'N/A'
      
      if (locale === 'th') {
         return propertyType.nameTh || propertyType.name_th || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else if (locale === 'zh') {
         return propertyType.nameCh || propertyType.name_ch || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else if (locale === 'ru') {
         return propertyType.nameRu || propertyType.name_ru || propertyType.nameEn || propertyType.name_en || 'N/A'
      } else {
         return propertyType.nameEn || propertyType.name_en || 'N/A'
      }
   }

   const overviewItems = [
      {
         icon: 'flaticon-home',
         label: t('propertyType'),
         value: getPropertyType()
      },
      {
         icon: 'flaticon-bed',
         label: t('bedrooms'),
         value: property?.bedrooms || 'N/A'
      },
      {
         icon: 'flaticon-shower',
         label: t('bathrooms'),
         value: property?.bathrooms || 'N/A'
      },
      {
         icon: 'flaticon-expand',
         label: t('usableArea'),
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
                     <div className="icon-box me-2 me-md-3" style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#3c3c3c',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '20px',
                        flexShrink: 0
                     }}>
                        <i className={item.icon}></i>
                     </div>
                     <div className="content" style={{ 
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden'
                     }}>
                        <div className="label" style={{
                           fontSize: '11px',
                           color: '#666',
                           marginBottom: '2px',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis'
                        }}>
                           {item.label}
                        </div>
                        <div className="value" style={{
                           fontSize: '14px',
                           fontWeight: '600',
                           color: '#333',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis'
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
