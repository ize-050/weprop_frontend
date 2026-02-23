import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ListingPropertiesPage from '@/components/properties/listing/ListingPropertiesPage';
import serverApi from '@/utils/serverApi';
import SidebarStickyBar from '@/components/home/home/SidebarStickyBar';

export const dynamic = 'force-dynamic';

async function searchProperties(searchParams) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('type', 'SALE');
    
    if (searchParams.propertyType) queryParams.append('propertyType', searchParams.propertyType);
    if (searchParams.minPrice) queryParams.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) queryParams.append('maxPrice', searchParams.maxPrice);
    if (searchParams.zoneId) queryParams.append('zoneId', searchParams.zoneId);
    if (searchParams.bedrooms) queryParams.append('bedrooms', searchParams.bedrooms);
    if (searchParams.bathrooms) queryParams.append('bathrooms', searchParams.bathrooms);
    if (searchParams.searchQuery) queryParams.append('keyword', searchParams.searchQuery);
    queryParams.append('page', searchParams.page || '1');
    queryParams.append('limit', searchParams.limit || '9');

    const response = await serverApi.get(`/search/properties?${queryParams.toString()}`, {
      headers: { 'x-api-key': 'dd-property-api-key-2025' }
    });

    if (response && response.data) {
      return { data: response.data.data || response.data, pagination: response.data.pagination || {} };
    }
    return { data: [], pagination: { total: 0, page: 1, limit: 9, pages: 0 } };
  } catch (error) {
    console.error('Error searching properties:', error);
    return { data: [], pagination: { total: 0, page: 1, limit: 9, pages: 0 } };
  }
}

async function getAllZones() {
  try {
    const response = await serverApi.get('/zones', {
      headers: { 'x-api-key': 'dd-property-api-key-2025' }
    });
    return response?.data || [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params: { locale } }) {
  const baseUrl = 'https://www.12realestatepattaya.com';

  const meta = {
    th: {
      title: 'ซื้ออสังหาฯ พัทยา: คอนโด บ้าน วิลล่า พูลวิลล่า | The 12 Real Estate Pattaya',
      description: 'ค้นหาอสังหาริมทรัพย์ขายในพัทยา คอนโด บ้าน วิลล่า พูลวิลล่า ทำเลดี ราคาคุ้มค่า โดย The 12 Real Estate Pattaya',
      h1: 'อสังหาริมทรัพย์ขายในพัทยา'
    },
    en: {
      title: 'Properties for Sale in Pattaya | Houses & Condos | The 12 Real Estate',
      description: 'Browse premium properties for sale in Pattaya. Find condos, houses, villas & pool villas with The 12 Real Estate Pattaya - your trusted property partner.',
      h1: 'Properties for Sale in Pattaya'
    },
    zh: {
      title: '芭提雅房产出售 | 公寓、别墅、泳池别墅 | The 12 Real Estate',
      description: '浏览芭提雅优质房产出售信息。The 12 Real Estate Pattaya 为您提供公寓、别墅、泳池别墅等多种选择。',
      h1: '芭提雅房产出售'
    },
    ru: {
      title: 'Недвижимость на продажу в Паттайе | Кондо, Виллы | The 12 Real Estate',
      description: 'Найдите лучшую недвижимость на продажу в Паттайе. Кондо, дома, виллы с бассейном от The 12 Real Estate Pattaya.',
      h1: 'Недвижимость на продажу в Паттайе'
    }
  };

  const current = meta[locale] || meta.en;
  const localizedUrl = locale === 'th' ? `${baseUrl}/properties-for-sale-pattaya` : `${baseUrl}/${locale}/properties-for-sale-pattaya`;

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: localizedUrl,
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: localizedUrl,
      siteName: 'The 12 Real Estate Pattaya',
      type: 'website',
    },
  };
}

export default async function PropertiesForSalePattaya({ params, searchParams }) {
  const { locale } = params;
  const baseUrl = 'https://www.12realestatepattaya.com';
  const searchResults = await searchProperties(searchParams || {});
  const zones = await getAllZones();

  const properties = searchResults.data || [];

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${baseUrl}/` },
      { '@type': 'ListItem', 'position': 2, 'name': 'Properties', 'item': `${baseUrl}/properties` },
      { '@type': 'ListItem', 'position': 3, 'name': 'For Sale', 'item': `${baseUrl}/properties-for-sale-pattaya` }
    ]
  };

  // ItemList Schema — top 10 properties
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Pattaya Properties for Sale',
    'itemListElement': properties.slice(0, 10).map((property, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': property.title || property.projectName || 'Property',
      'url': `${baseUrl}/${locale}/property-detail-three/${property.id}/${property.slug || property.id}`
    }))
  };

  return (
    <div className="main-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Suspense fallback={<div className="text-center py-5"><div className="spinner-border" /></div>}>
        <ListingPropertiesPage
          properties={properties}
          pagination={searchResults.pagination || {}}
          zones={zones || []}
          searchParams={{ ...searchParams, type: 'sale' }}
        />
      </Suspense>
    </div>
  );
}
