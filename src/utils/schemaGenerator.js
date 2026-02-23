// Schema.org markup generator สำหรับ SEO
export const generateOrganizationSchema = (locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  const organizationNames = {
    th: 'The 12 Real Estate Pattaya',
    en: 'The 12 Real Estate Pattaya',
    zh: 'The 12 Real Estate Pattaya',
    ru: 'The 12 Real Estate Pattaya'
  };

  const descriptions = {
    th: 'ผู้เชี่ยวชาญด้านคอนโด บ้าน วิลล่า ให้เช่าและขายในพัทยาและ EEC ค้นหาอสังหาริมทรัพย์เพื่อลงทุน พร้อมผลตอบแทนสูง',
    en: 'Your trusted expert for condos, houses & villas for sale in Pattaya & EEC. We help you buy, sell & rent prime residential properties with high investment returns.',
    zh: '芭提雅房地产服务的首选平台。无论您是寻找芭提雅公寓出售还是芭提雅公寓出租，我们都提供关于泰国动态房地产市场的全面、最新信息。',
    ru: 'Ваш надежный эксперт по кондоминиумам, домам и виллам для продажи в Паттайе и EEC. Мы помогаем покупать, продавать и арендовать недвижимость с высокой доходностью.'
  };

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": organizationNames[locale] || organizationNames.en,
    "description": descriptions[locale] || descriptions.en,
    "url": `${baseUrl}/${locale}`,
    "logo": `${baseUrl}/images/logo.png`,
    "image": `${baseUrl}/images/logo.png`,
    "telephone": "+66-88-899-7944",
    "email": "info@12realestatepattaya.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Pattaya Beach Road",
      "addressLocality": "Pattaya",
      "addressRegion": "Chonburi",
      "postalCode": "20150",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9236",
      "longitude": "100.8825"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Pattaya"
      },
      {
        "@type": "City", 
        "name": "Bangkok"
      }
    ],
    "serviceType": [
      "Real Estate Sales",
      "Real Estate Rental",
      "Property Investment",
      "Property Management"
    ],
    "sameAs": [
      "https://m.me/222887021193075",
      "https://wa.me/+66888997944",
      "https://lin.ee/dG5aGu4"
    ]
  };
};

export const generateWebsiteSchema = (locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  const names = {
    th: 'The 12 Real Estate Pattaya - คอนโด บ้าน วิลล่า พัทยา',
    en: 'The 12 Real Estate Pattaya - Pattaya Real Estate',
    zh: 'The 12 Real Estate Pattaya - 芭提雅房地产',
    ru: 'The 12 Real Estate Pattaya - Недвижимость Паттайи'
  };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": names[locale] || names.en,
    "url": `${baseUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}/properties/list?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": names[locale] || names.en,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    }
  };
};

export const generateBreadcrumbSchema = (breadcrumbs, locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  };
};

export const generatePropertySchema = (property, locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title || property.name,
    "description": property.description,
    "url": `${baseUrl}/${locale}/property_detail/${property.slug}`,
    "image": property.images?.map(img => `${baseUrl}${img.url}`) || [],
    "price": {
      "@type": "PriceSpecification",
      "price": property.price,
      "priceCurrency": "THB"
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.usableArea,
      "unitText": "SQM"
    },
    "numberOfRooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.zone?.name || "Pattaya",
      "addressRegion": property.province || "Chonburi",
      "addressCountry": "TH"
    },
    "geo": property.latitude && property.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": property.latitude,
      "longitude": property.longitude
    } : undefined,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "THB",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "The 12 Real Estate Pattaya"
      }
    }
  };
};

export const generateBlogSchema = (blog, locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt || blog.description,
    "image": blog.featuredImage ? `${baseUrl}${blog.featuredImage}` : undefined,
    "author": {
      "@type": "Organization",
      "name": "The 12 Real Estate Pattaya"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The 12 Real Estate Pattaya",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    },
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${blog.id}`
    },
    "articleSection": "Real Estate",
    "keywords": blog.tags || ["real estate", "pattaya", "property"]
  };
};

export const generateContactSchema = (locale = 'th') => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.12realestatepattaya.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": locale === 'th' ? 'ติดต่อเรา' : 'Contact Us',
    "description": locale === 'th' ? 'ติดต่อ The 12 Real Estate Pattaya สำหรับคำปรึกษาด้านอสังหาริมทรัพย์' : 'Contact The 12 Real Estate Pattaya for real estate consultation',
    "url": `${baseUrl}/${locale}/contact`,
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "The 12 Real Estate Pattaya",
      "telephone": "+66-88-899-7944",
      "email": "info@12realestatepattaya.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Pattaya Beach Road",
        "addressLocality": "Pattaya",
        "addressRegion": "Chonburi",
        "postalCode": "20150",
        "addressCountry": "TH"
      }
    }
  };
};
