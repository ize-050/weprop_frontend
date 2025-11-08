'use client'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import useSimpleTranslations from '@/hooks/useSimpleTranslations'

const CallToAction = () => {
   const locale = useLocale()
   const { t } = useSimpleTranslations('home')

   return (
      <div className="fancy-banner-three position-relative mt-150 xl-mt-120 md-mt-80 wow fadeInUp">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="cta-wrapper text-center" style={{
                     background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
                     borderRadius: '20px',
                     padding: '80px 40px',
                     position: 'relative',
                     overflow: 'hidden'
                  }}>
                     {/* Background Pattern */}
                     <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: 'url(/assets/images/pattern.png)',
                        backgroundSize: 'cover'
                     }}></div>

                     <div className="position-relative" style={{ zIndex: 1 }}>
                        <h2 className="text-white mb-30" style={{ fontSize: '42px', fontWeight: 700 }}>
                           {t('cta-title', 'Ready to Find Your Dream Property?')}
                        </h2>
                        <p className="text-white fs-20 mb-40" style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
                           {t('cta-subtitle', 'Let our expert team help you find the perfect property in Pattaya. Contact us today for a free consultation!')}
                        </p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                           <Link 
                              href={`/${locale !== 'th' ? locale + '/' : ''}contact-us`}
                              className="btn-ten text-uppercase fw-500"
                              style={{
                                 backgroundColor: '#fff',
                                 color: '#8B0000',
                                 padding: '18px 45px',
                                 borderRadius: '50px',
                                 fontSize: '16px',
                                 border: 'none',
                                 transition: 'all 0.3s',
                                 display: 'inline-block',
                                 textDecoration: 'none'
                              }}
                           >
                              <i className="bi bi-envelope-fill me-2"></i>
                              {t('cta-contact', 'Contact Us Now')}
                           </Link>
                           <Link 
                              href={`/${locale !== 'th' ? locale + '/' : ''}properties`}
                              className="btn-eleven text-uppercase fw-500"
                              style={{
                                 backgroundColor: 'transparent',
                                 color: '#fff',
                                 padding: '18px 45px',
                                 borderRadius: '50px',
                                 fontSize: '16px',
                                 border: '2px solid #fff',
                                 transition: 'all 0.3s',
                                 display: 'inline-block',
                                 textDecoration: 'none'
                              }}
                           >
                              <i className="bi bi-search me-2"></i>
                              {t('cta-browse', 'Browse Properties')}
                           </Link>
                        </div>

                        {/* Contact Info */}
                        <div className="d-flex justify-content-center gap-5 mt-50 flex-wrap">
                           <div className="text-white">
                              <i className="bi bi-telephone-fill fs-20 me-2"></i>
                              <span className="fs-18">+66 (0) 89 253 0622</span>
                           </div>
                           <div className="text-white">
                              <i className="bi bi-envelope-fill fs-20 me-2"></i>
                              <span className="fs-18">info@12realestatepattaya.com</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CallToAction
