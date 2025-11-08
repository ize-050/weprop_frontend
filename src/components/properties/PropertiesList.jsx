'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'
import HeaderTwo from '@/layouts/headers/HeaderTwo'
import FooterHomeThree from '@/components/homes/home-three/FooterHomeThree'
import HeroSearchBar from '@/components/properties/listing/HeroSearchBar'
import createSlug from '@/utils/slugify'
import { convertAndFormatPriceSync, localeToCurrencySymbol } from '@/utils/currencyUtils'
import ContactModal from '../common/ContactModal/ContactModal'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

// Property Card Component with Modal
const PropertyCard = ({ property, locale, slug, title, zoneName, sortedImages, baseImageUrl, currencySymbol, formattedSalePrice, formattedRentPrice, isForSale, isForRent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t: dynamicT } = useSimpleTranslations('listing')

  const isHotOffer = property.labels.some(label => label.labelType === 'hot-offer');
  const isNewListing = property.labels.some(label => label.labelType === 'new-listing');
  const resale = property.labels.some(label => label.labelType === 'resale');
  const rented = property.labels.some(label => label.labelType === 'rented');
  const newDevelopment = property.labels.some(label => label.labelType === 'new-development');
  const reducePrice = property.labels.some(label => label.labelType === 'reduce-price');
  const sold = property.labels.some(label => label.labelType === 'sold');
  const underConstruction = property.labels.some(label => label.labelType === 'under-construction');

  return (
    <>
      <div className="col-lg-4 col-md-6 d-flex mb-50 wow fadeInUp">
        <div className="listing-card-one border-25 h-100 w-100 border-layout">
          <div className="img-gallery p-15">
            <div className="position-relative border-25 overflow-hidden">
              {/* Listing Type Tag */}
              {(isForSale || isForRent) && (
                <div style={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                  zIndex: 2
                }}>
                  <div className="tag border-25" style={{
                    backgroundColor: isForRent ? '#FF5A3C' : '#00B579',
                    color: 'white',
                    borderRadius: '14px',
                    width: '90px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    height: '27px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    display: 'inline-block'
                  }}>
                    {isForRent ? dynamicT('for-rent', 'FOR RENT') : dynamicT('for-sale', 'FOR SALE')}
                  </div>
                </div>
              )}

              {/* Favorite Button */}
              <button className="fav-btn tran3s" style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                fontSize: '18px',
                color: '#666'
              }}>
                <i className="fa-light fa-heart"></i>
              </button>

              {/* Image Carousel */}
              <div id={`carousel${property.id}`} className="carousel slide" data-bs-ride="false">
                {/* Additional Labels (HOT OFFER, NEW LISTING) */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  zIndex: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {isHotOffer && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#DC3545',
                      color: 'white',
                      borderRadius: '14px',
                      width: '90px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('hot-offer', 'HOT OFFER')}
                    </div>
                  )}
                  {isNewListing && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#FFC107',
                      color: 'white',
                      borderRadius: '14px',
                      width: '90px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('new-listing', 'NEW LISTING')}
                    </div>
                  )}
                  {reducePrice && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#FF5A3C',
                      color: 'white',
                      borderRadius: '14px',
                      width: '110px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('reduce-price', 'REDUCE PRICE')}
                    </div>
                  )}
                  {resale && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      borderRadius: '14px',
                      width: '90px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('resale', 'RESALE')}
                    </div>
                  )}
                  {rented && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#6c757d',
                      color: 'white',
                      borderRadius: '14px',
                      width: '90px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('rented', 'RENTED')}
                    </div>
                  )}
                  {sold && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#343a40',
                      color: 'white',
                      borderRadius: '14px',
                      width: '90px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {dynamicT('sold', 'SOLD')}
                    </div>
                  )}
                  {newDevelopment && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      borderRadius: '14px',
                      padding: '0 12px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap'
                    }}>
                      {dynamicT('new-development', 'NEW DEVELOPMENT')}
                    </div>
                  )}
                  {underConstruction && (
                    <div className="tag border-25" style={{
                      backgroundColor: '#ffc107',
                      color: 'white',
                      borderRadius: '14px',
                      padding: '0 12px',
                      height: '27px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap'
                    }}>
                      {dynamicT('under-construction', 'UNDER CONSTRUCTION')}
                    </div>
                  )}
                </div>
                <div className="carousel-inner">
                  {sortedImages.length > 0 ? (
                    sortedImages.map((image, index) => (
                      <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="1000000">
                        <Link href={`/${locale !== 'th' ? locale + '/' : ''}property-detail-three/${property.id}/${slug}`} className="d-block">
                          <img
                            src={`${baseImageUrl}${image.url}`}
                            className="w-100"
                            alt={title}
                            style={{ height: '280px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = '/images/listings/default-property.jpg'
                            }}
                          />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="carousel-item active">
                      <Link href={`/${locale !== 'th' ? locale + '/' : ''}property-detail-three/${property.id}/${slug}`} className="d-block">
                        <img
                          src="/images/listings/default-property.jpg"
                          className="w-100"
                          alt={title}
                          style={{ height: '280px', objectFit: 'cover' }}
                        />
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Carousel Controls */}
                {sortedImages.length > 1 && (
                  <>
                    <button 
                      className="carousel-control-prev"
                      type="button" 
                      data-bs-target={`#carousel${property.id}`}
                      data-bs-slide="prev"
                      style={{
                        position: 'absolute',
                        width: '35px',
                        height: '35px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '50%',
                        border: 'none',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '15px',
                        zIndex: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        opacity: 1
                      }}
                    >
                      <i className="fa-solid fa-chevron-left" style={{ fontSize: '14px', color: '#333', pointerEvents: 'none' }}></i>
                    </button>
                    <button 
                      className="carousel-control-next"
                      type="button" 
                      data-bs-target={`#carousel${property.id}`}
                      data-bs-slide="next"
                      style={{
                        position: 'absolute',
                        width: '35px',
                        height: '35px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '50%',
                        border: 'none',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '15px',
                        zIndex: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        opacity: 1
                      }}
                    >
                      <i className="fa-solid fa-chevron-right" style={{ fontSize: '14px', color: '#333', pointerEvents: 'none' }}></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="property-info p-25">
            <Link
              href={`/${locale !== 'th' ? locale + '/' : ''}property-detail-three/${property.id}/${slug}`}
              className="title tran3s"
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1a1a1a',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              {title}
            </Link>
            <div className="address" style={{ color: '#6c757d', fontSize: '14px', marginBottom: '15px' }}>
              {zoneName}
            </div>

            <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between mb-3">
              <li className="d-flex align-items-center">
                <i className="flaticon-expand me-2" style={{ color: '#6c757d' }}></i>
                <span className="fs-16">{property.usableArea || 0} {dynamicT('sqm', 'sqm')}</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="flaticon-bed me-2" style={{ color: '#6c757d' }}></i>
                <span className="fs-16">{property.bedrooms || 0} {dynamicT('bed', 'bed')}</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="flaticon-shower me-2" style={{ color: '#6c757d' }}></i>
                <span className="fs-16">{property.bathrooms || 0} {dynamicT('bath', 'bath')}</span>
              </li>
            </ul>

            <div className="pl-footer top-border d-flex align-items-center justify-content-between pt-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              <div className="price-section">
                {isForSale && formattedSalePrice && (
                  <strong className="price fw-500 color-dark" style={{ fontSize: '20px', color: '#1a1a1a', display: 'block' }}>
                    {formattedSalePrice}
                  </strong>
                )}
                {isForRent && formattedRentPrice && (
                  <strong className="price fw-500 color-dark" style={{ fontSize: isForSale ? '16px' : '20px', color: '#1a1a1a', display: 'block' }}>
                    {formattedRentPrice}<sub style={{ fontSize: '14px', fontWeight: '400' }}>{dynamicT('mo', '/mo')}</sub>
                  </strong>
                )}
              </div>
              <a
                href="tel:+66123456789"
                className="contact-option phone"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsModalOpen(true)
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#AF1A1E',
                  color: 'white',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={property}
      />
    </>
  )
}

const PropertiesList = ({ searchParams }) => {
  const locale = useLocale()
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9

  // Initialize filters from URL params
  const typeParam = urlSearchParams.get('type')?.toUpperCase() || ''
  const [filters, setFilters] = useState({
    propertyType: urlSearchParams.get('propertyType') || '',
    minPrice: urlSearchParams.get('minPrice') || '',
    maxPrice: urlSearchParams.get('maxPrice') || '',
    zoneId: urlSearchParams.get('zoneId') || '',
    listingType: typeParam,
    bedrooms: urlSearchParams.get('bedrooms') || '',
    bathrooms: urlSearchParams.get('bathrooms') || '',
    propertyQuota: urlSearchParams.get('propertyQuota') || ''
  })

  // Update filters when URL params change
  useEffect(() => {
    const newTypeParam = urlSearchParams.get('type')?.toUpperCase() || ''
    const newFilters = {
      propertyType: urlSearchParams.get('propertyType') || '',
      minPrice: urlSearchParams.get('minPrice') || '',
      maxPrice: urlSearchParams.get('maxPrice') || '',
      zoneId: urlSearchParams.get('zoneId') || '',
      listingType: newTypeParam,
      bedrooms: urlSearchParams.get('bedrooms') || '',
      bathrooms: urlSearchParams.get('bathrooms') || '',
      propertyQuota: urlSearchParams.get('propertyQuota') || ''
    }
    setFilters(newFilters)
  }, [urlSearchParams])

  useEffect(() => {
    fetchProperties()
  }, [currentPage, filters.propertyType, filters.minPrice, filters.maxPrice, filters.zoneId, filters.listingType, filters.bedrooms, filters.bathrooms, filters.propertyQuota])

  const fetchProperties = async () => {
    try {
      setLoading(true)

      // Build query params from filters
      const params = new URLSearchParams()

      // Add filters to params
      if (filters.propertyType) params.append('propertyType', filters.propertyType)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.zoneId) params.append('zoneId', filters.zoneId)
      if (filters.listingType) params.append('listingType', filters.listingType)
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms)
      if (filters.bathrooms) params.append('bathrooms', filters.bathrooms)
      if (filters.propertyQuota) params.append('propertyQuota', filters.propertyQuota)

      // Add pagination
      params.append('limit', itemsPerPage.toString())
      params.append('offset', (currentPage * itemsPerPage).toString())

      // Add includes for related data
      params.append('include', 'images,zone,listings,labels')

      console.log('Fetching properties with params:', params.toString())

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties?${params.toString()}`, {
        headers: {
          'x-api-key': 'dd-property-api-key-2025'
        }
      })

      const data = await response.json()



      // Log all properties labels
      if (data.properties && data.properties.length > 0) {
        data.properties.forEach((prop, idx) => {
          console.log(`Property ${idx} (${prop.id}):`, {
            title: prop.titleEn,
            labels: prop.labels,
            propertyLabel: prop.propertyLabel
          })
        })
      }

      setProperties(data.properties || [])
      setTotalCount(data.total || 0)

    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (searchData) => {
    console.log('handleSearch called with:', searchData)

    // Update filters from searchData
    const newFilters = {
      ...filters,
      listingType: searchData.listingType || filters.listingType,
      propertyType: searchData.propertyType || filters.propertyType,
      zoneId: searchData.zoneId || filters.zoneId,
      minPrice: searchData.minPrice || filters.minPrice,
      maxPrice: searchData.maxPrice || filters.maxPrice,
      propertyQuota: searchData.propertyQuota || filters.propertyQuota,
      searchQuery: searchData.searchQuery || ''
    }

    setFilters(newFilters)
    setCurrentPage(0)

    // Update URL params
    const params = new URLSearchParams()
    if (newFilters.listingType) params.set('type', newFilters.listingType === 'RENT' ? 'rent' : 'sale')
    if (newFilters.propertyType) params.set('propertyType', newFilters.propertyType)
    if (newFilters.zoneId) params.set('zoneId', newFilters.zoneId)
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice)
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice)
    if (newFilters.propertyQuota) params.set('propertyQuota', newFilters.propertyQuota)
    if (newFilters.searchQuery) params.set('search', newFilters.searchQuery)

    router.push(`/${locale !== 'th' ? locale + '/' : ''}properties?${params.toString()}`)
  }

  const pageCount = Math.ceil(totalCount / itemsPerPage)

  // Get property title based on locale
  const getPropertyTitle = (property) => {
    switch (locale) {
      case 'th':
        return property.titleTh || property.titleEn || property.title
      case 'zh':
        return property.titleCh || property.titleEn || property.title
      case 'ru':
        return property.titleRu || property.titleEn || property.title
      default:
        return property.titleEn || property.title
    }
  }

  // Get zone name based on locale
  const getZoneName = (zone) => {
    if (!zone) return ''
    switch (locale) {
      case 'th':
        return zone.name_th || zone.name_en || zone.name
      case 'zh':
        return zone.name_ch || zone.name_en || zone.name
      case 'ru':
        return zone.name_ru || zone.name_en || zone.name
      default:
        return zone.name_en || zone.name
    }
  }

  return (
    <>


      {/* Hero Search Bar Section with Background */}
      <div className="inner-banner-one pt-180 lg-pt-150 pb-150 xl-pb-120 position-relative " style={{
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/images/listing/banner-listing.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
      }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <HeroSearchBar
                onSearch={handleSearch}
                initialListingType={filters.listingType}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="property-listing-six pt-50 pb-170 xl-pb-120">
        <div className="container">
          {/* Results Header */}
          <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
            <div>
              Showing <span className="color-dark fw-500">{currentPage * itemsPerPage + 1}–{Math.min((currentPage + 1) * itemsPerPage, totalCount)}</span> of{' '}
              <span className="color-dark fw-500">{totalCount}</span> results
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-5">
              <p>No properties found.</p>
            </div>
          ) : (
            <div className="row gx-xxl-5">
              {properties.map((property) => {
                const title = getPropertyTitle(property)
                const zoneName = getZoneName(property.zone)
                const slug = createSlug(title, property.id)

                // Get images with base URL
                const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || ''
                const sortedImages = property.images && property.images.length > 0
                  ? property.images.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                  : []

                // Get listing type and prices
                const listingTypes = property.listings?.map(l => l.listingType) || []
                const isForSale = listingTypes.includes('SALE')
                const isForRent = listingTypes.includes('RENT')

                // Get sale and rent prices
                const salePrice = property.listings?.find(l => l.listingType === 'SALE')?.price || 0
                const rentPrice = property.listings?.find(l => l.listingType === 'RENT')?.price || 0

                // Format prices
                const currencySymbol = localeToCurrencySymbol(locale)
                const formattedSalePrice = salePrice ? convertAndFormatPriceSync(salePrice, locale) : ''
                const formattedRentPrice = rentPrice ? convertAndFormatPriceSync(rentPrice, locale) : ''


                const labels = property.labels?.map(l => l.labelType) || []



                return (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    locale={locale}
                    slug={slug}
                    title={title}
                    zoneName={zoneName}
                    sortedImages={sortedImages}
                    baseImageUrl={baseImageUrl}
                    currencySymbol={currencySymbol}
                    formattedSalePrice={formattedSalePrice}
                    formattedRentPrice={formattedRentPrice}
                    isForSale={isForSale}
                    isForRent={isForRent}
                  />
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="pt-50 md-pt-20 text-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fa-regular fa-chevron-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={pageCount}
                pageCount={pageCount}
                previousLabel={<i className="fa-regular fa-chevron-left"></i>}
                renderOnZeroPageCount={null}
                className="pagination-two d-inline-flex align-items-center justify-content-center style-none"
                forcePage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PropertiesList
