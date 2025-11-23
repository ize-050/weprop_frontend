'use client'

const PropertyVideo = ({ property, t }) => {
   // Get YouTube URL from propertyListings or socialMedia
   const getYoutubeUrl = () => {
      // Try propertyListings first
      if (property?.propertyListings && property.propertyListings.length > 0) {
         const url = property.propertyListings[0].youtube_url
         if (url) return convertToEmbedUrl(url)
      }
      
      // Try socialMedia
      if (property?.socialMedia?.youtubeUrl) {
         return convertToEmbedUrl(property.socialMedia.youtubeUrl)
      }
      
      return null
   }

   // Convert YouTube URL to embed format
   const convertToEmbedUrl = (url) => {
      if (!url) return null
      
      // Already embed URL
      if (url.includes('/embed/')) return url
      
      // Regular watch URL
      if (url.includes('watch?v=')) {
         try {
            const videoId = new URL(url).searchParams.get('v')
            return `https://www.youtube.com/embed/${videoId}`
         } catch (e) {
            return null
         }
      }
      
      // Short URL (youtu.be)
      if (url.includes('youtu.be/')) {
         const videoId = url.split('youtu.be/')[1]?.split('?')[0]
         if (videoId) return `https://www.youtube.com/embed/${videoId}`
      }
      
      return null
   }

   const youtubeUrl = getYoutubeUrl()

   if (!youtubeUrl) return null

   return (
      <div className="property-section bg-white shadow4 border-20 p-40 mb-50">
         <h3 className="section-title mb-4">{t('video')}</h3>
         <div className="video-container" style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
         }}>
            <iframe
               style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
               }}
               src={youtubeUrl}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               allowFullScreen
            ></iframe>
         </div>
      </div>
   )
}

export default PropertyVideo
