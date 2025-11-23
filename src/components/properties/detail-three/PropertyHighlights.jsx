'use client'

const PropertyHighlights = ({ property, locale, t }) => {
   const highlights = property?.propertyHighlights || property?.highlights || []
   if (highlights.length === 0) return null

   const getLocalizedIconName = (icon) => {
      if (!icon) return ''
      return locale === 'th' ? icon.name_th : icon.name
   }

   return (
      <div>
         <h4 className="mb-20">{t('highlights')}</h4>
         <div className="property-highlights">
            <ul className="style-none d-flex flex-wrap">
               {highlights.map((item, index) => (
                  <li key={`highlight-${index}`} className="me-3 mb-3">
                     <div style={{
                        backgroundColor: 'rgb(232, 245, 233)',
                        borderColor: 'rgb(165, 214, 167)',
                        border: '1px solid',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}>
                        <span style={{ 
                           fontSize: '16px',
                           fontWeight: '500',
                           color: '#333',
                           margin: 0 
                        }}>
                           {getLocalizedIconName(item?.Icon || item?.icon)}
                        </span>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default PropertyHighlights
