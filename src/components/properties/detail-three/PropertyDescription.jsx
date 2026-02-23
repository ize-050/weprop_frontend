'use client'

import { useLocale } from 'next-intl'

const PropertyDescription = ({ property, locale: localeProp, t }) => {
   const localeFromHook = useLocale()
   const locale = localeFromHook || localeProp || 'th'

   // Get localized description (รองรับ 4 ภาษา: th, en, zh, ru)
   const getDescription = () => {
      if (!property) return ''
      
      try {
         // Parse translatedDescriptions if it's a string
         let translatedDescriptions = property?.translatedDescriptions
         
         if (typeof translatedDescriptions === 'string') {
            try {
               translatedDescriptions = JSON.parse(translatedDescriptions)
            } catch (e) {
               translatedDescriptions = {}
            }
         }
         
         // EN is the default locale — EN description is stored in property.description
         // Always use property.description for EN locale first
         if (locale === 'en') {
            return property?.description || ''
         }

         // For non-EN locales, try translatedDescriptions[locale] first
         if (translatedDescriptions && typeof translatedDescriptions === 'object') {
            if (locale && translatedDescriptions[locale] && translatedDescriptions[locale].trim()) {
               return translatedDescriptions[locale]
            }
            
            // Try any available non-EN language
            const availableLang = Object.keys(translatedDescriptions).find(
               key => key !== 'en' && translatedDescriptions[key] && translatedDescriptions[key].trim()
            )
            if (availableLang) {
               return translatedDescriptions[availableLang]
            }
         }
         
         // Final fallback: original description
         return property?.description || ''
         
      } catch (error) {
         return property?.description || ''
      }
   }

   const description = getDescription()
   
   if (!description) return null

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h4 className="mb-20">{t('description')}</h4>
         <div 
            className="property-description" 
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
         />
      </div>
   )
}

export default PropertyDescription
