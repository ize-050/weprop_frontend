'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Slider from 'react-slick'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

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

const PopularLocation = ({ zones = [] }) => {
  const locale = useLocale()
  const sliderRef = useRef(null)
  const [popularZones, setPopularZones] = useState([])
  const { t: dynamicT } = useSimpleTranslations('home')

  useEffect(() => {
    if (zones && zones.length > 0) {
      setPopularZones(zones.slice(0, 8))
    }
  }, [zones])

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

  if (!popularZones || popularZones.length === 0) {
    return null
  }

  return (
    <div className="block-feature-three mt-150 xl-mt-120" style={{ background: '#F5EDE8', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="title-one text-center mb-75 xl-mb-50 md-mb-30 wow fadeInUp">
          <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '42px', lineHeight: '1.2' }}>
            {dynamicT('ExploreLocations.title.part1', 'Explore Popular')}{' '}
            <span style={{ color: '#eb6753' }}>
              {dynamicT('ExploreLocations.title.part2', 'Location')}
            </span>
          </h3>
          {/* <p className="fs-22" style={{ color: '#6c757d', marginTop: '15px' }}>
            {dynamicT('ExploreLocations.subtitle.short', 'Explore latest & featured properties for sale.')}
          </p> */}
        </div>

        <Slider {...sliderSettings} ref={sliderRef} className="property-location-slider-one">
          {popularZones.map((zone) => {
            // Get zone name based on locale
            const zoneName = (() => {
              switch (locale) {
                case 'th':
                  return zone.nameTh || zone.nameEn || zone.name
                case 'zh':
                  return zone.nameCh || zone.nameEn || zone.name
                case 'ru':
                  return zone.nameRu || zone.nameEn || zone.name
                default:
                  return zone.nameEn || zone.name
              }
            })()

            // Get property count
            const count = zone.propertyCount || zone._count?.properties || 0
            const propertyCountText = `${count} ${dynamicT('ExploreLocations.properties', 'Properties')}`

            // Get zone image
            let zoneImage = zone.imagePath || '/images/zones/default-zone.jpg'
            if (zoneImage && !zoneImage.startsWith('http')) {
              zoneImage = `http://localhost:5001${zoneImage}`
            }

            return (
              <div key={zone.id} className="item-first">
                <div 
                  className="location-card-one position-relative z-1 d-flex align-items-end"
                  style={{
                    backgroundImage: `url(${zoneImage})`,
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
                    {/* Zone Name */}
                    <h5 className="text-white fw-bold" style={{ fontSize: '24px', marginBottom: '8px', lineHeight: '1.4' }}>
                      {zoneName}
                    </h5>

                    {/* Property Count */}
                    <p className="text-white" style={{ fontSize: '14px', marginBottom: '0', opacity: 0.9 }}>
                      {propertyCountText}
                    </p>
                  </div>

                  <Link 
                    href={`/${locale !== 'th' ? locale + '/' : ''}properties?zoneId=${zone.id}`} 
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

export default PopularLocation
