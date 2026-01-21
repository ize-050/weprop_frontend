'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

const ExclusivePartners = () => {
  const t = useTranslations()

  const partners = [
    {
      name: 'Laguna Beach Resort Jomtien',
      image: '/images/partners/laguna-beach-jomtien.jpg',
      link: 'https://www.lagunabeachpattaya.com/',
      description: 'Premium beachfront resort in Jomtien'
    },
    {
      name: 'Laguna Beach Resort 2',
      image: '/images/partners/laguna-beach-2.jpg',
      link: null,
      description: 'Luxury living in Pattaya'
    },
    {
      name: 'Laguna Beach Resort The Maldives',
      image: '/images/partners/laguna-maldives.jpg',
      link: 'https://www.lagunamaldivespattaya.com/',
      description: 'Maldives-inspired resort experience'
    },
    {
      name: 'The Peak Towers',
      image: '/images/partners/peak-towers.jpg',
      link: 'https://www.thepeaktowerpattaya.com/',
      description: 'Iconic high-rise living'
    }
  ]

  return (
    <div className="exclusive-partners-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 style={{ 
            fontSize: 'clamp(28px, 5vw, 42px)', 
            fontWeight: '600', 
            color: '#1a1a1a',
            marginBottom: '15px'
          }}>
            {t('exclusivePartners') || 'Exclusive'}{' '}
            <span style={{ color: '#AF1A1E' }}>
              {t('partners') || 'Partners'}
            </span>
          </h2>
          <p style={{ 
            color: '#6c757d', 
            fontSize: 'clamp(14px, 3vw, 18px)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t('exclusivePartnersSubtitle') || 'Trusted developers we work with'}
          </p>
        </div>

        <div className="row g-4">
          {partners.map((partner, index) => (
            <div key={index} className="col-6 col-md-3">
              <div 
                className="partner-card h-100"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
                }}
              >
                <div 
                  className="partner-image"
                  style={{
                    height: '160px',
                    backgroundColor: '#e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<div style="padding: 20px; text-align: center; color: #666; font-size: 14px;">${partner.name}</div>`
                    }}
                  />
                </div>
                <div className="partner-info p-3">
                  <h5 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: '#333',
                    lineHeight: '1.3'
                  }}>
                    {partner.name}
                  </h5>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>
                    {partner.description}
                  </p>
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#AF1A1E',
                        color: '#fff',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      {t('visitWebsite') || 'Visit Website'}
                    </a>
                  ) : (
                    <span 
                      className="badge"
                      style={{
                        backgroundColor: '#e9ecef',
                        color: '#666',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {t('comingSoon') || 'Coming Soon'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExclusivePartners
