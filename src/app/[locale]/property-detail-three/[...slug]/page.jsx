import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import serverApi from '@/utils/serverApi'
import PropertyDetailThree from '@/components/properties/detail-three/PropertyDetailThree'
import LoadingAnimation from '@/components/common/LoadingAnimation'

// Force dynamic rendering
export const fetchCache = 'force-no-store'
export const revalidate = 0
export const dynamic = 'force-dynamic'

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug, locale } = params
  const id = slug[0] // ID is the first part of slug
  const t = await getTranslations({ locale })

  try {
    const property = await getPropertyById(id)

    if (!property) {
      return {
        title: t('propertyNotFound'),
        description: t('propertyNotFoundDesc')
      }
    }

    // Get localized title
    let propertyTitle = property?.title || ''
    try {
      const translatedTitles = JSON.parse(property?.translatedTitles || '{}')
      propertyTitle = translatedTitles[locale] || translatedTitles['en'] || property?.title || ''
    } catch {
      propertyTitle = property?.title || ''
    }

    // Get localized description
    let description = ''
    try {
      const translatedDescriptions = JSON.parse(property?.translatedDescriptions || '{}')
      description = translatedDescriptions[locale] || translatedDescriptions['en'] || property?.description || ''
    } catch {
      description = property?.description || ''
    }

    const baseUrl = 'https://www.12realestatepattaya.com'
    const localizedUrl = locale === 'th' ? baseUrl : `${baseUrl}/${locale}`
    const propertyUrl = `${localizedUrl}/property-detail-three/${id}`

    return {
      title: `${propertyTitle} | 12 Real Estate Pattaya`,
      description: description.substring(0, 160),
      openGraph: {
        title: `${propertyTitle} | 12 Real Estate Pattaya`,
        description: description.substring(0, 160),
        url: propertyUrl,
        siteName: "12 Real Estate Pattaya",
        images: [
          {
            url: property?.mainImage || `${baseUrl}/images/logo.png`,
            width: 1200,
            height: 630,
            alt: propertyTitle,
          },
        ],
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: propertyTitle,
        description: description.substring(0, 160),
        images: [property?.mainImage || `${baseUrl}/images/logo.png`],
      },
      alternates: {
        canonical: propertyUrl,
        languages: {
          'th': `${baseUrl}/property-detail-three/${id}`,
          'en': `${baseUrl}/en/property-detail-three/${id}`,
          'zh': `${baseUrl}/zh/property-detail-three/${id}`,
          'ru': `${baseUrl}/ru/property-detail-three/${id}`,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: `${t('propertyDetail')} | 12 Real Estate Pattaya`,
      description: t('viewPropertyDetails')
    }
  }
}

// Fetch property data (เหมือนหน้าเดิม)
async function getPropertyById(id) {
  try {
    const property = await serverApi.get(`/properties/${id}`)
    return property
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

// Main page component
export default async function PropertyDetailThreePage({ params }) {
  const { slug, locale } = params
  const id = slug[0] // ID is the first part of slug
  const t = await getTranslations({ locale })

  try {
    const property = await getPropertyById(id)

    if (!property) {
      return (
        <div className="error-page d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1>404</h1>
            <h3>{t('propertyNotFound')}</h3>
            <p>{t('propertyNotFoundMessage')}</p>
          </div>
        </div>
      )
    }

    // ดึงข้อมูลจาก property.data (เหมือนหน้าเดิม)
    const propertyData = property.data

    // Parse translated titles
    const translatedTitles = propertyData.translatedTitles || {}
    propertyData.displayTitle = translatedTitles[params.locale] || translatedTitles['en'] || propertyData.title

    return (
      <Suspense fallback={<LoadingAnimation />}>
        <PropertyDetailThree propertyData={propertyData} locale={locale} />
      </Suspense>
    )
  } catch (error) {
    console.error('Error loading property:', error)
    return (
      <div className="error-page d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1>{t('error')}</h1>
          <h3>{t('somethingWentWrong')}</h3>
          <p>{t('unableToLoadProperty')}</p>
        </div>
      </div>
    )
  }
}
