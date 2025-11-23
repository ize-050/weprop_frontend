'use client'

const PropertyNearby = ({ property, locale, t }) => {
   const nearby = property?.propertyNearby || property?.nearbyPlaces || property?.nearby || []
   if (nearby.length === 0) return null

   const getLocalizedIconName = (icon) => {
      if (!icon) return ''
      return locale === 'th' ? icon.name_th : icon.name
   }

   return (
      <div>
         <h3 className="section-title mb-3">{t('nearBy')}</h3>
         <div className="nearby-items">
            <div className="row g-3">
               {nearby.map((item, index) => (
                  <div className="col-6 col-md-4" key={`nearby-${index}`}>
                     <div className="nearby-item">
                        {(item?.Icon?.iconPath || item?.icon?.icon_path) && (
                           <img 
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${item?.Icon?.iconPath || item?.icon?.icon_path}`} 
                              alt={getLocalizedIconName(item?.Icon || item?.icon)} 
                              className="img-fluid" 
                              width={25} 
                              height={25} 
                           />
                        )}
                        <span className="span-items" style={{ marginLeft: '10px' }}>
                           {getLocalizedIconName(item?.Icon || item?.icon)}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default PropertyNearby
