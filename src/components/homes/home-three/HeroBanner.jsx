"use client"
import Image from "next/image";
import Slider from "react-slick";
import DropdownOne from "../../search-dropdown/home-dropdown/DropdownWithTabs";
import { useLocale } from "next-intl";
import useSimpleTranslations from "@/hooks/useSimpleTranslations";

const titleShape = "/assets/images/shape/shape_34.svg";
const bannerShape_1 = "/assets/images/shape/shape_35.svg";
const bannerShape_2 = "/assets/images/shape/shape_36.svg";

import HeroSearchBar from "@/components/homes/home-three/search/FilterSearch";

const setting = {
   dots: false,
   arrows: false,
   centerPadding: '0px',
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
   fade: true,
   autoplaySpeed: 7000,
}

const onSearch = () => {

}

const HeroBanner = () => {
   const locale = useLocale();
   const { t } = useSimpleTranslations('hero');

   return (
      <div className="hero-banner-three position-relative z-1 pt-130 lg-pt-100 pb-170 xl-pb-130 lg-pb-100">
         <Slider {...setting} className="hero-slider-one m0">
            <div className="item m0"><div className="hero-img" style={{ backgroundImage: `url(/assets/images/home/banner.png)` }}></div></div>
            {/* <div className="item m0"><div className="hero-img" style={{ backgroundImage: `url(/assets/images/media/img_27.jpg)` }}></div></div>
            <div className="item m0"><div className="hero-img" style={{ backgroundImage: `url(/assets/images/media/img_28.jpg)` }}></div></div> */}
         </Slider>

         <div className="container position-relative z-2">
            <div className="row">
               <div className="col-lg-10 m-auto">
                  <h2 
                     className="text-center text-white wow fadeInUp hero-title-small" 
                     style={{ 
                        fontSize: '60px', 
                        fontWeight: '600', 
                        lineHeight: '1.2',
                        marginBottom: '10px',
                        letterSpacing: '1px'
                     }}
                  >
                     {t('hero.title.part1', 'Find the Right')}
                  </h2>
                  <h1 
                     className="text-center text-white wow fadeInUp hero-title-large" 
                     style={{ 
                        fontSize: '80px', 
                        fontWeight: '700', 
                        lineHeight: '1.2',
                        marginTop: '0',
                        letterSpacing: '2px'
                     }}
                  >
                     {t('hero.title.part2', 'Property for Your Dream')}
                  </h1>
                  
                  <style jsx>{`
                     @media (max-width: 991px) {
                        .hero-title-small {
                           font-size: 32px !important;
                           letter-spacing: 0.5px !important;
                           margin-bottom: 5px !important;
                        }
                        .hero-title-large {
                           font-size: 42px !important;
                           letter-spacing: 1px !important;
                        }
                     }
                     @media (max-width: 575px) {
                        .hero-title-small {
                           font-size: 24px !important;
                           letter-spacing: 0.5px !important;
                        }
                        .hero-title-large {
                           font-size: 32px !important;
                           letter-spacing: 0.5px !important;
                        }
                     }
                  `}</style>
               </div>
            </div>
            <div className="row">
               <div className="col-xxl-10 m-auto pt-30">
                  <HeroSearchBar
                     onSearch={onSearch}
                     initialListingType={"for-sale"}
                  />
               </div>
            </div>
         </div>
         {/* <Image src={bannerShape_1} alt="" className="lazy-img shapes shape_01" />
            <Image src={bannerShape_2} alt="" className="lazy-img shapes shape_02" /> */}
      </div>
   )
}

export default HeroBanner
