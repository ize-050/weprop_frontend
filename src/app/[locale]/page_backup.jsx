// BACKUP - Original home page
// This file is a backup of the original home page before switching to home-three
// Date: 2025-11-08

import React, { Suspense } from "react";
import { lazy } from 'react';
import dynamic from 'next/dynamic';

import './loading-animation.css';
import './loading-placeholders.css';
import serverApi from '@/utils/serverApi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

//service
import LanguageApi from '@/utils/languageApi';

// Store


import TranslationInitializer from '@/components/Translation/page';

//component
const SidebarStickyBar = dynamic(() => import("@/components/home/home/SidebarStickyBar"), { ssr: false });
const PartnerDark = dynamic(() => import("@/components/common/PartnerDark"), { ssr: false });

const BannerWithPreload = lazy(() => import("@/components/home/home/BannerWithPreload"))
// บังคับให้โหลดข้อมูลใหม่ทุกครั้งที่เข้าหน้า รวมถึงตอนกดปุ่ม Back
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// ใช้ lazy import แบบมี suspense เพื่อแก้ไขปัญหา hydration error
const Page = lazy(() => import("@/components/home/page"));


// สร้าง metadata แบบ dynamic ตามภาษา
export async function generateMetadata({ params }) {
  const { locale } = params;

  // Force production URL และไม่พึ่งพา environment variables
  const baseUrl = 'https://www.d-luckproperty.com';
  const localizedUrl = locale === 'th' ? baseUrl : `${baseUrl}/${locale}`;

  // SEO-optimized metadata สำหรับแต่ละภาษา
  const metadataByLocale = {
    th: {
      title: 'คอนโด บ้าน วิลล่า พัทยา | ซื้อ ขาย เช่า ลงทุน | D-Luck Property',
      description: 'ดี-ลัค พร็อพเพอร์ตี้ ผู้เชี่ยวชาญด้านคอนโด บ้าน วิลล่า ให้เช่าและขายในพัทยาและ EEC ค้นหาอสังหาริมทรัพย์เพื่อลงทุน พร้อมผลตอบแทนสูง',
      keywords: ['ขายคอนโด พัทยา', 'ขายบ้าน พัทยา', 'ขายวิลล่า พัทยา', 'อสังหาริมทรัพย์ พัทยา','ซื้อบ้าน พัทยา','เช่าบ้าน พัทยา','ลงทุนอสังหา พัทยา','คอนโด พัทยา ให้เช่า','บ้าน พัทยา ให้เช่า','โครงการบ้านจัดสรร พัทยา','วิลล่าหรู พัทยา','คอนโดติดทะเล พัทยา','บ้านพร้อมสระว่ายน้ำ พัทยา','อสังหาริมทรัพย์ EEC','นายหน้าอสังหา พัทยา','คอนโดให้เช่ารายเดือน พัทยา','ซื้อคอนโด พัทยา ชาวต่างชาติ','บ้านเช่าพัทยา รายวัน','ขายที่ดิน พัทยา','ลงทุนคอนโด พัทยา ผลตอบแทนสูง','อสังหาริมทรัพย์ พัทยาเหนือ','บ้านพักตากอากาศ พัทยา']
    },
    en: {
      title: 'Pattaya Condo, House & Villa for Sale & Rent',
      description: 'D-Luck Property: Your trusted expert for condos, houses & villas for sale in Pattaya & EEC. We help you buy, sell & rent prime residential properties with high investment returns.',
      keywords: ['Pattaya condos for sale', 'Pattaya houses for sale', 'Pattaya villas for sale', 'Pattaya property for sale','Pattaya real estate for sale','Condos for rent Pattaya','Houses for rent Pattaya','Villas for rent Pattaya','Buy condo Pattaya','Buy house Pattaya','Buy villa Pattaya','Sell property Pattaya','Rent property Pattaya','Luxury villas Pattaya','Beachfront condos Pattaya','Pool villas for sale Pattaya','Investment properties Pattaya','Pattaya real estate investment','Property for sale Jomtien','Houses for sale East Pattaya','Condos for sale Na Jomtien','EEC property for sale','Property agents Pattaya','Expats buy property Pattaya','Foreign ownership condo Pattaya','High rental yield Pattaya property','New developments Pattaya condos']
    },
    zh: {
      title: '芭提雅公寓、别墅、房屋出售出租 | D-Luck Property',
      description: 'D-Luck Property：您在芭提雅及EEC地区的房产专家。查找高投资回报的公寓、别墅、房屋，提供买卖租赁一站式服务',
      keywords: ['芭提雅房产', '芭提雅公寓出售', '芭提雅别墅出售', '芭提雅房屋出售','芭提雅房产投资','芭提雅公寓出租','芭提雅房屋出租 ','泰国房产','芭提雅置业','芭提雅买房','芭提雅卖房','芭提雅海景公寓 ','芭提雅豪华别墅 ','芭提雅泳池别墅','芭提雅外国人买房','EEC房产','芭提雅房地产中介','芭提雅高回报投资','中天海滩公寓','芭提雅新楼盘','芭提雅民宿出租']
    },
    ru: {
      title: 'Кондо, Дома, Виллы в Паттайе | Продажа, Аренда, Инвестиции',
      description: 'D-Luck Property: Ваш эксперт по недвижимости в Паттайе и ЕЭС. Купите, продайте или арендуйте кондо, дом или виллу с высоким инвестиционным потенциалом. Помощь с оплатой.',
      keywords: ['недвижимость Паттайя', 'купить кондо Паттайя', 'купить дом Паттайя', 'купить виллу Паттайя','аренда кондо Паттайя','аренда дома Паттайя','инвестиции в недвижимость Паттайя','недвижимость Таиланд для русских ','продать недвижимость Паттайя','Buy элитная недвижимость Паттайя','виллы с бассейном Паттайя','кондо на берегу моря Паттайя','купить недвижимость в Таиланде россиянам','агентство недвижимости Паттайя','апартаменты Паттайя купить','недвижимость ЕЭС Таиланд','высокий доход от аренды Паттайя','Паттайя купить жилье','инвестиционные объекты Паттайя','недвижимость Джомтьен продажа','дома в Восточной Паттайе']
    }
  };

  const currentMetadata = metadataByLocale[locale] || metadataByLocale.th;

  // สร้าง alternates สำหรับ SEO
  const languages = {};
  ['th', 'en', 'zh', 'ru'].forEach(lang => {
    const langUrl = lang === 'th' ? baseUrl : `${baseUrl}/${lang}`;
    languages[lang] = langUrl;
  });
  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    alternates: {
      canonical: `${localizedUrl}`,
      languages
    },
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      url: localizedUrl,
      siteName: currentMetadata.title,
      images: [
        {
          url: `${baseUrl}/images/logo/logo.png`,
          width: 1200,
          height: 630,
          alt: 'D-Luck Property Logo',
        },
      ],
      locale: locale === 'th' ? 'th_TH' : locale === 'zh' ? 'zh_CN' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: [`${baseUrl}/images/logo/logo.png`],
    },
  };
}

// ... rest of the original file content
