import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ListingPropertiesPage from '@/components/properties/listing/ListingPropertiesPage';
import serverApi from '@/utils/serverApi';
import SidebarStickyBar from '@/components/home/home/SidebarStickyBar';

export const dynamic = 'force-dynamic';

async function searchProperties(searchParams) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('type', 'RENT');
    
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
      return { data: response.data, pagination: response.pagination };
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
      title: 'เช่าอสังหาฯ พัทยา: คอนโด บ้าน วิลล่า พูลวิลล่า | The 12 Real Estate Pattaya',
      description: 'ค้นหาอสังหาริมทรัพย์ให้เช่าในพัทยา คอนโด บ้าน วิลล่า พูลวิลล่า รายเดือน รายปี โดย The 12 Real Estate Pattaya',
    },
    en: {
      title: 'Pattaya Property Rentals | Condos & Villas for Rent | The 12 Real Estate',
      description: 'Find the best rental properties in Pattaya. Condos, houses, villas & pool villas for short or long-term rent with The 12 Real Estate Pattaya.',
    },
    zh: {
      title: '芭提雅房产租赁 | 公寓、别墅出租 | The 12 Real Estate',
      description: '在芭提雅寻找理想的租赁房产。The 12 Real Estate Pattaya 提供公寓、别墅、泳池别墅的短租和长租服务。',
    },
    ru: {
      title: 'Аренда недвижимости в Паттайе | Кондо, Виллы | The 12 Real Estate',
      description: 'Лучшая аренда недвижимости в Паттайе. Кондо, дома, виллы с бассейном для краткосрочной и долгосрочной аренды от The 12 Real Estate Pattaya.',
    }
  };

  const current = meta[locale] || meta.en;
  const localizedUrl = locale === 'th' ? `${baseUrl}/pattaya-property-rentals` : `${baseUrl}/${locale}/pattaya-property-rentals`;

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

export default async function PattayaPropertyRentals({ params, searchParams }) {
  const searchResults = await searchProperties(searchParams || {});
  const zones = await getAllZones();

  return (
    <div className="main-wrapper">
      <Suspense fallback={<div className="text-center py-5"><div className="spinner-border" /></div>}>
        <ListingPropertiesPage
          properties={searchResults.data || []}
          pagination={searchResults.pagination || {}}
          zones={zones || []}
          searchParams={{ ...searchParams, type: 'rent' }}
        />
      </Suspense>
    </div>
  );
}
