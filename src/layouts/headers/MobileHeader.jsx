'use client'
import Link from "next/link"
import { useLocale } from 'next-intl'
import MobileOffcanvas from "./Menu/MobileOffcanvas"

const MobileHeader = () => {
   const locale = useLocale()

   return (
      <>
         <header className="header-nav nav-innerpage-style main-menu mobile-header">
            <nav className="posr">
               <div className="container-fluid">
                  <div className="row align-items-center">
                     {/* Logo */}
                     <div className="col">
                        <div className="logos">
                           <Link className="header-logo" href={`/${locale !== 'th' ? locale + '/' : ''}`}>
                              <img 
                                 src="/assets/images/logo/logoweare.png" 
                                 alt="12 Real Estate" 
                                 style={{ height: '80px' }}
                              />
                           </Link>
                        </div>
                     </div>

                     {/* Mobile Menu Button - ติดขวาสุด */}
                     <div className="col-auto ms-auto">
                        <button 
                           className="navbar-toggler d-block d-lg-none" 
                           type="button" 
                           data-bs-toggle="offcanvas"
                           data-bs-target="#mobileOffcanvas"
                           aria-controls="mobileOffcanvas"
                           aria-expanded="false"
                           aria-label="Toggle navigation"
                           style={{
                              border: 'none',
                              background: 'transparent',
                              padding: 0
                           }}
                        >
                           <svg 
                              width="30" 
                              height="30" 
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <rect y="5" width="30" height="2" fill="#333"/>
                              <rect y="14" width="30" height="2" fill="#333"/>
                              <rect y="23" width="30" height="2" fill="#333"/>
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </nav>
         </header>

         {/* Mobile Offcanvas Menu */}
         <MobileOffcanvas />
      </>
   )
}

export default MobileHeader
