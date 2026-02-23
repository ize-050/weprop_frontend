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
         
         // Check if it's an object
         if (translatedDescriptions && typeof translatedDescriptions === 'object') {
            // Try current locale (check for non-empty string)
            if (locale && translatedDescriptions[locale] && translatedDescriptions[locale].trim()) {
               return translatedDescriptions[locale]
            }
            
            // Fallback: try English (non-empty)
            if (translatedDescriptions.en && translatedDescriptions.en.trim()) {
               return translatedDescriptions.en
            }
            
            // Try Thai (non-empty)
            if (translatedDescriptions.th && translatedDescriptions.th.trim()) {
               return translatedDescriptions.th
            }
            
            // Try any available language
            const availableLang = Object.keys(translatedDescriptions).find(
               key => translatedDescriptions[key] && translatedDescriptions[key].trim()
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
