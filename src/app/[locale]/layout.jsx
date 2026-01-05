import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from 'react';
import { lazy } from 'react';
import dynamic from 'next/dynamic';
import { headers } from "next/headers";
import AOSInit from "@/components/Aos/AosComponent";
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/utils/schemaGenerator';

// นำเข้า ErrorBoundary แบบ dynamic เพื่อให้ทำงานเฉพาะฝั่ง client
// import MobileMenu from '@/components/';

const HeaderBackoffice = dynamic(() => import('@/components/backoffice/layout/HeaderBackoffice'), {
  ssr: false
});

import Script from 'next/script';
import React from 'react';

// Import CSS ตามลำดับ priority (ต่ำไปสูง)
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import "rc-slider/assets/index.css";
import "@/styles/components/TopLoadingBar.scss";

import "@/styles/scss/main.scss"; // Homy theme + Swiper + Custom styles
import "../../styles/main.scss"; // Backoffice styles (admin pages only)
import "../../styles/index.scss"; // Bootstrap + Fonts + Icons + React Toastify
import "../../../public/assets/fonts/gordita/stylesheet.css"; // Gordita font
import "../../styles/globals.css"; // Global font override - Montserrat
import "../../styles/z-index-layers.css"; // Z-index management for libraries
import "../../styles/mobile-header.css"; // Mobile header styles
import "../../styles/header-custom.css"; // Custom header height
import { Montserrat } from "next/font/google";
import { supportedLocales } from '../../i18n';
// const Header = lazy(() => import("@/components/home/home/Header"));
// const Header = lazy(() => import("@/components/common/DefaultHeader"));
// const Header = lazy(() => import("@/components/home/home/Header"));
// const HeaderSSR = lazy(() => import("@/components/home/home/HeaderSSR"))
// ใช้ HeaderTwo จาก theme homy ใหม่ (Desktop)
const HeaderTwo = lazy(() => import("@/layouts/headers/HeaderTwo"));
// ใช้ DefaultHeader สำหรับ Mobile
const DefaultHeader = lazy(() => import("@/components/common/DefaultHeader"));
// ใช้ FooterHomeThree จาก home-three
const FooterHomeThree = lazy(() => import("@/components/homes/home-three/FooterHomeThree"));

// Component สำหรับ responsive header
const ResponsiveHeader = dynamic(() => import("@/components/common/ResponsiveHeader"), {
  ssr: false
});
const ScrollToTop = lazy(() => import("@/components/common/ScrollTop"));
const LoadingAnimation = lazy(() => import("@/components/common/LoadingAnimation"));
const MobileContactButtons = dynamic(() => import("@/components/common/MobileContactButtons"), {
  ssr: false
});

const TopLoadingBar = dynamic(() => import("@/components/common/TopLoadingBar"), {
  ssr: false
});

//backoffice
const BackofficeWrapper = lazy(() => import("@/components/backoffice/layout/BackofficeWrapper"));

// import AOSInitializer from "@/components/common/AOSInitializer";

// ฟังก์ชันสำหรับสร้าง static params สำหรับแต่ละภาษา
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

// Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: 'swap',
});



export default async function LocaleLayout({ children, params }) {
  // โหลดข้อความแปลภาษา
  const locale = params.locale || 'en';


  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  let isBackofficeFromHeader = pathname.includes('/backoffice');
  let isLoginPage = pathname.includes('/login');


  let isBackofficeFromPath = false;


  if (params.slug && Array.isArray(params.slug)) {
    isBackofficeFromPath = params.slug.includes('backoffice');
  } else if (params.locale && params.locale === 'backoffice') {
    isBackofficeFromPath = true;
  } else {
    const currentPath = `/${params.locale}${params.slug ? '/' + params.slug.join('/') : ''}`;
    isBackofficeFromPath = currentPath.includes('/backoffice');
  }
  const isBackoffice = isBackofficeFromHeader || isBackofficeFromPath;



  const messages = await getMessages({ locale })

  // สร้าง Schema.org markup สำหรับ SEO
  const organizationSchema = generateOrganizationSchema(locale);
  const websiteSchema = generateWebsiteSchema(locale);

  return (
    <html lang={locale}>
        
        <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <title>D&#39;LuckProperty</title> */}
        <meta name="description" content="D&#39;LuckProperty - Thailand Real Estate Portal" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
        {/* <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet" /> */}
        
        {/* Schema.org markup สำหรับ SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`body ${montserrat.variable}`}
        cz-shortcut-listen="false"
        style={{
          fontFamily: 'var(--font-montserrat), sans-serif'
        }}
      >
        <React.Fragment>
          <GoogleAnalytics />
          <AOSInit />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="wrapper ovh">
              <TopLoadingBar />
              {isBackoffice && !isLoginPage ? (
                <>
                  <HeaderBackoffice />
                  {/* <MobileMenu /> */}
                  <BackofficeWrapper>{children}</BackofficeWrapper>
                </>
              ) :
                isLoginPage ? (
                  <>
                    {children}
                  </>
                ) : (
                  <>
                    <Suspense fallback={<LoadingAnimation />}>
                      <ResponsiveHeader />
                    </Suspense>
                    <hr style={{ 
                      margin: 0, 
                      border: 'none', 
                      borderTop: '1px solid #e0e0e0',
                      opacity: 1
                    }} />
                    <div className="main-page-wrapper">
                      {children}
                    </div>
                    <Suspense fallback={null}>
                      <FooterHomeThree />
                    </Suspense>
                    <Suspense fallback={null}>
                      <ScrollToTop />
                    </Suspense>
                    <Suspense fallback={null}>
                      <MobileContactButtons />
                    </Suspense>
                  </>
                )}
            </div>
          </NextIntlClientProvider>
        </React.Fragment>

        <Script id="aos-script" src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" />
        <Script id="jquery-script" src="https://code.jquery.com/jquery-3.6.0.min.js" />
        <Script id="bootstrap-script" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />

        <Script id="init-scripts">
          {`
           
              window.addEventListener('load', function() {
      
                  AOS.init({
                    duration: 1200,
                    once: true,
                  });
                  console.log('AOS initialized');
              });
            
          `}
        </Script>
      </body>
    </html>
  );
}



