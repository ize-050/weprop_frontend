'use client'

import Image from "next/image"
import Link from "next/link"
import { useLocale } from 'next-intl'

const breadcrumbShape_1 = '/assets/images/shape/shape_35.svg';
const breadcrumbShape_2 = '/assets/images/shape/shape_36.svg';

const BreadcrumbTwo = ({ title }) => {
   const locale = useLocale()

   const translations = {
      en: 'Get to Know about Us',
      th: 'ทำความรู้จักกับเรา',
      zh: '了解我们',
      ru: 'Узнайте о нас'
   }

   const displayTitle = title || translations[locale] || translations.en

   return (
      <div className="inner-banner-three inner-banner text-center z-1 position-relative">
         <div className="bg-wrapper overflow-hidden position-relative z-1" style={{ backgroundImage: `url(/assets/images/aboutus/banner.png)` }}>
            <div className="container position-relative z-2">
               <h2 className="mb-35 xl-mb-20 md-mb-10 pt-15 font-garamond text-white">{displayTitle}</h2>
            
            </div>
            <img src={breadcrumbShape_1} alt="" className="lazy-img shapes shape_01" />
            <img src={breadcrumbShape_2} alt="" className="lazy-img shapes shape_02" />
         </div>
      </div>
   )
}

export default BreadcrumbTwo
