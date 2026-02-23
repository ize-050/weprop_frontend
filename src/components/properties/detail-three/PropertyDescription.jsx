'use client'

const PropertyDescription = ({ property, locale, t }) => {
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
            
            // Try current locale (check for non-empty string)
            if (locale && translatedDescriptions[locale] && translatedDescriptions[locale].trim()) {
               console.log(`PropertyDescription - Using ${locale} translation`)
               return translatedDescriptions[locale]
            }
            
            // Fallback: try English (non-empty)
            if (translatedDescriptions.en && translatedDescriptions.en.trim()) {
               console.log('PropertyDescription - Fallback to English')
               return translatedDescriptions.en
            }
            
            // Try Thai (non-empty)
            if (translatedDescriptions.th && translatedDescriptions.th.trim()) {
               console.log('PropertyDescription - Fallback to Thai')
               return translatedDescriptions.th
            }
            
            // Try any available language
            const availableLang = Object.keys(translatedDescriptions).find(
               key => translatedDescriptions[key] && translatedDescriptions[key].trim()
            )
            if (availableLang) {
               console.log(`PropertyDescription - Fallback to ${availableLang}`)
               return translatedDescriptions[availableLang]
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
         <h4 className="mb-20">{t('description')}</h4>
         <div 
            className="property-description" 
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
         />
      </div>
   )
}

export default PropertyDescription
