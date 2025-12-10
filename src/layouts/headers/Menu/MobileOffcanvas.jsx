'use client'
import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const LanguageSwitcher = dynamic(() => import("@/components/common/LanguageSwitcher"), {
  ssr: false,
})

const CurrencySwitcher = dynamic(() => import("@/components/common/CurrencySwitcher"), {
  ssr: false,
})

const MobileOffcanvas = () => {
   const locale = useLocale()
   const t = useTranslations()
   const [navTitle, setNavTitle] = useState("")
   const [menuItems, setMenuItems] = useState([])

   useEffect(() => {
      setMenuItems([
         { id: "home", title: t('header.home'), link: `/${locale !== 'th' ? locale + '/' : ''}` },
         { id: "forSale", title: t('header.buy'), link: `/${locale !== 'th' ? locale + '/' : ''}properties?type=sale` },
         { id: "forRent", title: t('header.rent'), link: `/${locale !== 'th' ? locale + '/' : ''}properties?type=rent` },
         { id: "blog", title: t('header.blog'), link: `/${locale !== 'th' ? locale + '/' : ''}blog` },
         { id: "about", title: t('header.about'), link: `/${locale !== 'th' ? locale + '/' : ''}about` },
         { id: "contact", title: t('header.contact'), link: `/${locale !== 'th' ? locale + '/' : ''}contact-us` },
      ])
   }, [locale, t])

   const openMobileMenu = (menu) => {
      if (navTitle === menu) {
         setNavTitle("")
      } else {
         setNavTitle(menu)
      }
   }

   return (
      <>
         <div 
            className="offcanvas offcanvas-start sidebar-nav" 
            tabIndex={-1}
            id="mobileOffcanvas"
            aria-labelledby="mobileOffcanvasLabel"
         >
            <div className="offcanvas-header">
               <div className="logo order-lg-0">
                  <Link href={`/${locale !== 'th' ? locale + '/' : ''}`} className="d-flex align-items-center">
                     <img src="/assets/images/logo/logoweare.png" alt="12 Real Estate" style={{ height: '40px' }} />
                  </Link>
               </div>
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="wrapper mt-40">
               <div className="d-flex flex-column h-100">
                  {/* Mobile Menu */}
                  <div className="mobile-menu">
                     <ul className="navbar-nav align-items-lg-center">
                        {menuItems.map((item) => (
                           <li key={item.id} className="nav-item">
                              <Link 
                                 href={item.link} 
                                 className="nav-link"
                                 onClick={() => setOffCanvas(false)}
                                 style={{
                                    fontSize: '18px',
                                    padding: '12px 0',
                                    color: '#333',
                                    fontWeight: '500'
                                 }}
                              >
                                 {item.title}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Language & Currency Switchers */}
                  <div className="switchers-block mt-40 pt-40" style={{ borderTop: '1px solid #e0e0e0' }}>
                     <div className="mb-30">
                        <h6 className="mb-15" style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
                           {t('backoffice.menu.language')}
                        </h6>
                        <LanguageSwitcher />
                     </div>
                     <div className="mb-30">
                        <h6 className="mb-15" style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
                           {t('backoffice.menu.currency')}
                        </h6>
                        <CurrencySwitcher />
                     </div>
                  </div>

                  {/* Contact Info */}
                  {/* <div className="address-block mt-40 pt-40" style={{ borderTop: '1px solid #e0e0e0' }}>
                     <h5 className="mb-20" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {t('contact-us')}
                     </h5>
                     <p className="mb-15">
                        <strong>12 Real Estate CO., LTD.</strong><br />
                        165/545, Thep Prasat 17 Alley<br />
                        Nongprue, Bang Lamung District<br />
                        Chon Buri 20150 Thailand
                     </p>
                     <p className="mb-15">
                        <i className="bi bi-telephone-fill me-2" style={{ color: '#8B0000' }}></i>
                        <Link href="tel:+66892530622" style={{ color: '#333' }}>+66 (0) 89 253 0622</Link>
                     </p>
                     <p className="mb-15">
                        <i className="bi bi-envelope-fill me-2" style={{ color: '#8B0000' }}></i>
                        <Link href="mailto:info@12realestatepattaya.com" style={{ color: '#333' }}>
                           info@12realestatepattaya.com
                        </Link>
                     </p>
                  </div> */}

                  {/* Social Icons */}
                  {/* <ul className="style-none d-flex flex-wrap w-100 justify-content-start align-items-center social-icon pt-30 mt-auto" style={{ gap: '15px' }}>
                     <li>
                        <Link href="https://wa.me/66892530622" target="_blank" style={{
                           width: '40px',
                           height: '40px',
                           borderRadius: '50%',
                           backgroundColor: '#f0f0f0',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#333',
                           fontSize: '18px'
                        }}>
                           <i className="bi bi-whatsapp"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="#" style={{
                           width: '40px',
                           height: '40px',
                           borderRadius: '50%',
                           backgroundColor: '#f0f0f0',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#333',
                           fontSize: '18px'
                        }}>
                           <i className="bi bi-facebook"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="#" style={{
                           width: '40px',
                           height: '40px',
                           borderRadius: '50%',
                           backgroundColor: '#f0f0f0',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#333',
                           fontSize: '18px'
                        }}>
                           <i className="bi bi-instagram"></i>
                        </Link>
                     </li>
                     <li>
                        <Link href="#" style={{
                           width: '40px',
                           height: '40px',
                           borderRadius: '50%',
                           backgroundColor: '#f0f0f0',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#333',
                           fontSize: '18px'
                        }}>
                           <i className="bi bi-line"></i>
                        </Link>
                     </li>
                  </ul> */}
               </div>
            </div>
         </div>
      </>
   )
}

export default MobileOffcanvas
