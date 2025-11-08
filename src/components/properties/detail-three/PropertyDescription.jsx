'use client'

const PropertyDescription = ({ property, locale, t }) => {
   // Get localized description (รองรับ 4 ภาษา: th, en, zh, ru)
   const getDescription = () => {
      if (!property) return ''
      
      if (locale !== 'en' && locale !== 'th') {
         // สำหรับ zh, ru
         const descriptionObj = property?.translatedDescriptions?.[locale]
         return descriptionObj || property?.description || ''
      } else if (locale === 'th') {
         // สำหรับภาษาไทย
         const descriptionObj = property?.translatedDescriptions?.th
         return descriptionObj || property?.description || ''
      } else {
         // สำหรับภาษาอังกฤษ (default)
         return property?.description || ''
      }
   }

   const description = getDescription()
   
   if (!description) return null

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h4 className="mb-20">{t ? t('description', 'Description') : 'Description'}</h4>
         <div 
            className="property-description" 
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
         />
      </div>
   )
}

export default PropertyDescription
