'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import Slider from 'react-slick'
import createSlug from '@/utils/slugify'
import { convertAndFormatPriceSync, localeToCurrencySymbol } from '@/utils/currencyUtils'

const sliderSettings = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0',
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1
      }
    }
  ]
}

const PopularLocationListing = ({ randomProperties }) => {
  const locale = useLocale()
  const sliderRef = useRef(null)
  const [properties, setProperties] = useState([])
  const t = useTranslations()
  const currencySymbol = localeToCurrencySymbol(locale)

  useEffect(() => {
    if (randomProperties && Array.isArray(randomProperties) && randomProperties.length > 0) {
      // Remove duplicates by property ID
      const uniqueProperties = randomProperties.filter((property, index, self) =>
        index === self.findIndex((p) => p.id === property.id)
      )
      console.log('PopularLocationListing - Props received:', randomProperties.length, 'Unique:', uniqueProperties.length)
      setProperties(uniqueProperties.slice(0, 8))
    }
  }, [randomProperties])

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <div className="block-feature-three mt-50 xl-mt-120" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="title-one mb-75 xl-mb-50 md-mb-30 wow fadeInUp">
            <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '42px', lineHeight: '1.2' }}>
              {t('featuredPart1')}{' '}
              <span style={{ color: '#AF1A1E' }}>
                {t('featuredPart2')}
              </span>
            </h3>
            <p className="fs-22" style={{ color: '#6c757d', marginTop: '15px' }}>
              {t('featuredSubtitle')}
            </p>
        </div>

        <Slider {...sliderSettings} ref={sliderRef} className="property-location-slider-one">
          {properties.map((property) => {
            const title = property.translatedTitles?.[locale] || property.title || 'Property'
            const slug = createSlug(title)
            const zoneName = property.zone?.name || ''
            
            // Get first image
            const sortedImages = property.images?.sort((a, b) => a.order - b.order) || []
            const firstImage = sortedImages[0]
            const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''
            const imageUrl = firstImage 
              ? `${baseImageUrl}${firstImage.url}` 
              : '/images/listings/default-property.jpg'

            // Get price
            const saleListing = property.listings?.find(l => l.listingType === 'SALE')
            const rentListing = property.listings?.find(l => l.listingType === 'RENT')
            const listing = saleListing || rentListing
            const price = listing?.price || 0
            const formattedPrice = convertAndFormatPriceSync(price, locale, false)
            const listingType = saleListing ? 'SALE' : 'RENT'

            // Check labels
            const isHotOffer = property.labels.some(label => label.labelType === 'hot-offer');
            const isNewListing = property.labels.some(label => label.labelType === 'new-listing');
            const resale = property.labels.some(label => label.labelType === 'resale');
            const rented = property.labels.some(label => label.labelType === 'rented');
            const newDevelopment = property.labels.some(label => label.labelType === 'new-development');
            const reducePrice = property.labels.some(label => label.labelType === 'reduce-price');
            const sold = property.labels.some(label => label.labelType === 'sold');
            const underConstruction = property.labels.some(label => label.labelType === 'under-construction');
            const duplex = property.labels.some(label => label.labelType === 'duplex');

            
  

            return (
              <div key={property.id} className="item-first">
                <div 
                  className="location-card-one position-relative z-1 d-flex align-items-end"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    borderRadius: '15px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                      zIndex: 1
                    }}
                ></div>

                  {/* Labels - Top Left */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      zIndex: 2,
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Hot Offer Label */}
                    {isHotOffer && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FF5A3C',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('hotOffer')}
                      </div>
                    )}

                    {/* New Listing Label */}
                    {isNewListing && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('newListing')}
                      </div>
                    )}

                    {/* Resale Label */}
                    {resale && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('resale')}
                      </div>
                    )}

                    {/* Rented Label */}
                    {rented && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('rented')}
                      </div>
                    )}

                    {/* New Development Label */}
                    {newDevelopment && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('newDevelopment')}
                      </div>
                    )}

                    {/* Sold Label */}
                    {sold && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('sold')}
                      </div>
                    )}

                    {/* Reduce Price Label */}
                    {reducePrice && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: listingType === 'RENT' ? '#FF5A3C' : '#00B579',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('reducePrice')}
                      </div>
                    )}

                    {/* Under Construction Label */}
                    {underConstruction && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('underConstruction')}
                      </div>
                    )}

                    {/* Reduce Price Label */}
                    {duplex && (
                      <div 
                        className="tag border-25" 
                        style={{
                          backgroundColor: '#FFC107',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t('duplex')}
                      </div>
                    )}

                    {/* Reduce Price Label */}
                    <div 
                      className="tag border-25" 
                      style={{
                        backgroundColor: listingType === 'RENT' ? '#FF5A3C' : '#00B579',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}
                    >
                      {listingType === 'RENT' 
                        ? t('forRent') 
                        : t('forSale')
                      }
                    </div>
                  </div>

                  {/* Content - Bottom Left */}
                  <div 
                    className="content w-100 tran3s" 
                    style={{ 
                      position: 'relative', 
                      zIndex: 2, 
                      padding: '20px',
                      textAlign: 'left'
                    }}
                  >
                    {/* Price */}
                    <div className="text-white fw-bold" style={{ fontSize: '22px', marginBottom: '8px' }}>
                      {currencySymbol} {formattedPrice}
                      {listingType === 'RENT' && (
                        <span style={{ fontSize: '14px', fontWeight: '400' }}>
                          {t('perMonth')}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h5 className="text-white fw-normal" style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.4' }}>
                      {title}
                    </h5>

                    {/* Property Info */}
                    <div className="text-white" style={{ fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {property.bedrooms > 0 && (
                        <span>
                          <i className="fa-solid fa-bed" style={{ marginRight: '4px' }}></i>
                          {property.bedrooms} {t('bed')}
                        </span>
                      )}
                      {property.bathrooms > 0 && (
                        <span>
                          <i className="fa-solid fa-bath" style={{ marginRight: '4px' }}></i>
                          {property.bathrooms} {t('bath')}
                        </span>
                      )}
                      {property.usableArea > 0 && (
                        <span>
                          <i className="fa-solid fa-ruler-combined" style={{ marginRight: '4px' }}></i>
                          {property.usableArea} {t('sqm')}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link 
                    href={`/${locale !== 'th' ? locale + '/' : ''}property-detail-three/${property.id}/${slug}`} 
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            )
          })}
        </Slider>

        <ul className="slider-arrows slick-arrow-one d-flex justify-content-between style-none position-relative">
          <li onClick={handlePrevClick} className="prev_a slick-arrow">
            <i className="fa-sharp fa-light fa-angle-left"></i>
          </li>
          <li onClick={handleNextClick} className="next_a slick-arrow">
            <i className="fa-sharp fa-light fa-angle-right"></i>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PopularLocationListing
