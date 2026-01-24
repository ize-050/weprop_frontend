'use client'

import React, { useState, useRef } from 'react'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const ExclusivePartners = () => {
  const { t: dynamicT } = useSimpleTranslations('home')

  const partners = [
    {
      name: 'Laguna Beach Resort Jomtien',
      images: [
        '/assets/images/laguna/Laguna%20Beach%201/Beach%201.jpg',
        '/assets/images/laguna/Laguna%20Beach%201/Building%20C%20%26%20Waterpark.jpg',
        '/assets/images/laguna/Laguna%20Beach%201/DSC07583-21.jpg',
        '/assets/images/laguna/Laguna%20Beach%201/DSC07589-25.jpg',
        '/assets/images/laguna/Laguna%20Beach%201/Lagoon%20Pool%20Between%20Buildings%20A%20%26%20B.jpg',
        '/assets/images/laguna/Laguna%20Beach%201/Lagoon%20Pool%20Perspective.jpg',
      ],
      link: 'https://www.lagunabeachpattaya.com/',
    },
    {
      name: 'Laguna Beach Resort 2',
      images: [
        '/assets/images/laguna/Laguna%20Beach%202/Beach%202.jpg',
        '/assets/images/laguna/Laguna%20Beach%202/view%201%20copy.jpg',
        '/assets/images/laguna/Laguna%20Beach%202/view%205%20copy.JPG',
      ],
      link: null,
    },
    {
      name: 'Laguna Beach Resort The Maldives',
      images: [
        '/assets/images/laguna/Laguna%20Beach%203/Laguna%203.jpg',
        '/assets/images/laguna/Laguna%20Beach%203/Approx%20View%20C%20730.jpg',
        '/assets/images/laguna/Laguna%20Beach%203/C004.jpg',
        '/assets/images/laguna/Laguna%20Beach%203/C005.jpg',
        '/assets/images/laguna/Laguna%20Beach%203/C008.jpg',
        '/assets/images/laguna/Laguna%20Beach%203/C009.jpg',
      ],
      link: 'https://www.lagunamaldivespattaya.com/',
    },
    {
      name: 'The Peak Towers',
      images: [
        '/assets/images/laguna/The%20Peak%20Towers/The%20Peak%20Towers.jpg',
        '/assets/images/laguna/The%20Peak%20Towers/The%20Peak%20Towers%20building_s.JPG',
        '/assets/images/laguna/The%20Peak%20Towers/building%20from%20top_s.JPG',
      ],
      link: 'https://www.thepeaktowerpattaya.com/',
    }
  ]

  return (
    <div className="block-feature-three mt-150 xl-mt-120" style={{ background: '#F5EDE8', paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="title-one text-center mb-75 xl-mb-50 md-mb-30 wow fadeInUp">
          <h3 style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '42px', lineHeight: '1.2' }}>
            {dynamicT('ExclusivePartners.title.part1', 'Exclusive')}{' '}
            <span style={{ color: '#eb6753' }}>
              {dynamicT('ExclusivePartners.title.part2', 'Partners')}
            </span>
          </h3>
        </div>

        <div className="row g-4">
          {partners.map((partner, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <PartnerCard partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PartnerCard = ({ partner }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % partner.images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + partner.images.length) % partner.images.length)
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentImageIndex((prev) => (prev + 1) % partner.images.length)
    }
    if (touchStart - touchEnd < -50) {
      setCurrentImageIndex((prev) => (prev - 1 + partner.images.length) % partner.images.length)
    }
  }

  const handleCardClick = () => {
    if (partner.link) {
      window.open(partner.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div 
      className="position-relative"
      style={{
        height: '400px',
        borderRadius: '15px',
        overflow: 'hidden',
        cursor: partner.link ? 'pointer' : 'default',
      }}
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${partner.images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.3s ease',
        }}
      />

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
      />

      {/* Navigation Arrows */}
      {partner.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333'
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 3,
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333'
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </>
      )}

      {/* Image Dots */}
      {partner.images.length > 1 && (
        <div 
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            gap: '6px'
          }}
        >
          {partner.images.map((_, idx) => (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex(idx)
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: idx === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Content - Bottom Left */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2, 
          padding: '20px',
          textAlign: 'left',
        }}
      >
        <h5 className="text-white fw-bold" style={{ fontSize: '18px', marginBottom: '8px', lineHeight: '1.3' }}>
          {partner.name}
        </h5>

        {partner.link && (
          <span style={{ 
            fontSize: '13px', 
            color: '#fff',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            Visit Website
          </span>
        )}
      </div>
    </div>
  )
}

export default ExclusivePartners
