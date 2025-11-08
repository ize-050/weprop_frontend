'use client'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const PropertyDescription = ({ property, locale, t }) => {
   const { t: dynamicT } = useSimpleTranslations('property-detail')
   // Get localized description (รองรับ 4 ภาษา: th, en, zh, ru)
   const getDescription = () => {
      if (!property) {
         console.log('PropertyDescription: No property data')
         return ''
      }
      
      console.log('PropertyDescription - Current locale:', locale)
      console.log('PropertyDescription - Property data:', {
         hasTranslatedDescriptions: !!property.translatedDescriptions,
         translatedDescriptionsType: typeof property.translatedDescriptions,
         hasDescription: !!property.description
      })
      
      try {
         // Parse translatedDescriptions if it's a string
         let translatedDescriptions = property?.translatedDescriptions
         
         if (typeof translatedDescriptions === 'string') {
            try {
               translatedDescriptions = JSON.parse(translatedDescriptions)
               console.log('PropertyDescription - Parsed translations:', Object.keys(translatedDescriptions))
            } catch (e) {
               console.error('PropertyDescription - Error parsing JSON:', e)
               translatedDescriptions = {}
            }
         }
         
         // Check if it's an object
         if (translatedDescriptions && typeof translatedDescriptions === 'object') {
            console.log('PropertyDescription - Available languages:', Object.keys(translatedDescriptions))
            
            // Try current locale
            if (locale && translatedDescriptions[locale]) {
               console.log(`PropertyDescription - Using ${locale} translation`)
               return translatedDescriptions[locale]
            }
            
            // Fallback: try English
            if (translatedDescriptions.en) {
               console.log('PropertyDescription - Fallback to English')
               return translatedDescriptions.en
            }
            
            // Try Thai
            if (translatedDescriptions.th) {
               console.log('PropertyDescription - Fallback to Thai')
               return translatedDescriptions.th
            }
         }
         
         // Final fallback: original description
         console.log('PropertyDescription - Using original description')
         return property?.description || ''
         
      } catch (error) {
         console.error('PropertyDescription - Error:', error)
         return property?.description || ''
      }
   }

   const description = getDescription()
   
   if (!description) return null

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h4 className="mb-20">{dynamicT('description', 'Description')}</h4>
         <div 
            className="property-description" 
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
         />
      </div>
   )
}

export default PropertyDescription
