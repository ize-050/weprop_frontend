"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import usePropertyFilterStore from '@/store/usePropertyFilterStore';
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import AdvanceFilterContent from "@/components/properties/listing/AdvancedFilterContent";
import NiceSelect from "@/components/ui/NiceSelect";

export default function HeroSearchBar({
  onSearch,
  initialType = "CONDO",
  initialListingType = "SALE",
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const {advancedSearchVisible,setAdvancedSearchVisible} = usePropertyFilterStore();
 
  // ดึงค่า type จาก URL parameters
  const typeParam = searchParams.get('type');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [quota, setQuota] = useState('');
  const [zones, setZones] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // กำหนด initial listing type จาก URL parameter ถ้ามี
  const getInitialListingType = () => {
    if (typeParam === 'rent') return "RENT";
    if (typeParam === 'sale') return "SALE";
    return initialListingType;
  };

  const tabs = [
    { id: "buy", label: t('buy') },
    { id: "rent", label: t('rent') },
  ];

  const [listingType, setListingType] = useState(getInitialListingType());
  const [activeTab, setActiveTab] = useState(typeParam === 'rent' ? "rent" : "buy");

  // Fetch zones and property types from API
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zones`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        if (response.ok) {
          const result = await response.json();
          setZones(Array.isArray(result.data) ? result.data : []);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
        setZones([]); // Set empty array on error
      }
    };

    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/types`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        if (response.ok) {
          const result = await response.json();
          setPropertyTypes(Array.isArray(result.data) ? result.data : []);
        }
      } catch (error) {
        console.error('Error fetching property types:', error);
        setPropertyTypes([]); // Set empty array on error
      }
    };

    fetchZones();
    fetchPropertyTypes();
  }, []);

  // อัพเดต listingType เมื่อ URL parameters เปลี่ยน
  useEffect(() => {
    if (typeParam === 'rent') {
      setListingType("RENT");
      setActiveTab("rent");
    } else if (typeParam === 'buy') {
      setListingType("SALE");
      setActiveTab("buy");
    }
  }, [typeParam]);

  const handleSearch = () => {
    console.log('HeroSearchBar handleSearch called with:', {
      listingType,
      propertyType,
      priceRange,
      location,
      quota
    });
    
    // สร้าง URL parameters
    const params = new URLSearchParams();
    
    // เพิ่ม type (sale/rent)
    params.append('type', listingType === 'SALE' ? 'sale' : 'rent');
    
    // เพิ่ม property type ถ้ามี
    if (propertyType) {
      params.append('propertyTypeId', propertyType);
    }
    
    // เพิ่ม price range ถ้ามี
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
    }
    
    // เพิ่ม zone ถ้ามี
    if (location) {
      params.append('zoneId', location);
    }
    
    // เพิ่ม quota ถ้ามี
    if (quota) {
      params.append('quota', quota);
    }
    
    // Navigate to properties page with filters
    const localePrefix = locale !== 'th' ? `/${locale}` : '';
    router.push(`${localePrefix}/properties?${params.toString()}`);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    // Update listing type based on tab
    let newListingType;
    if (tab === "buy") {
      newListingType = "SALE";
      setListingType("SALE");
    } else if (tab === "rent") {
      newListingType = "RENT";
      setListingType("RENT");
    }
    
    // Automatically trigger search when tab changes
    if (newListingType) {
      console.log('Tab changed, triggering search with listingType:', newListingType);
      onSearch({
        listingType: newListingType,
        searchQuery,
      });
    }
  };

  return (
    <>
      {/* Title Section */}


      {/* Advanced Filter Modal */}
      {advancedSearchVisible && (
        <div className="advance-feature-modal">
          <div
            className="modal fade show d-block"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="false"
            style={{paddingRight: '15px'}}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg" style={{maxWidth: '800px'}}>
              <div className="modal-content">
                <AdvanceFilterContent 
                  onClose={() => setAdvancedSearchVisible(false)} 
                  onSearch={onSearch}
                  type={typeParam} 
                />
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {/* Filter Box - Custom Style */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Buy/Rent Tabs - Separate from filter box */}
        <div style={{ 
          display: 'inline-flex',
          gap: '0',
          marginBottom: '0',
          backgroundColor: '#ffffff',
          borderRadius: '8px 8px 0 0',
          padding: '0',
          overflow: 'hidden'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                backgroundColor: 'transparent',
                color: activeTab === tab.id ? '#1a1a1a' : '#999',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #1a1a1a' : '3px solid transparent',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Content */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '0 12px 12px 12px',
          padding: '25px 30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          {tabs.map((tab) => activeTab === tab.id && (
            <form key={tab.id} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <div className="filter-search-container" style={{ 
                display: 'flex', 
                alignItems: 'end', 
                gap: '0',
                flexWrap: 'wrap'
              }}>
                {/* Property Type */}
                <div className="filter-field" style={{ 
                  flex: 1, 
                  paddingRight: '15px', 
                  borderRight: '1px solid #e0e0e0',
                  minWidth: '200px'
                }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '11px', 
                    color: '#aaa', 
                    marginBottom: '8px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {t('propertyType')}
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: t('allTypes') },
                      ...propertyTypes.map(type => ({
                        value: type.id.toString(),
                        text: (() => {
                          switch (locale) {
                            case 'th': return type.nameTh || type.nameEn;
                            case 'zh': return type.nameZh || type.nameEn;
                            case 'ru': return type.nameRu || type.nameEn;
                            default: return type.nameEn;
                          }
                        })()
                      }))
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="fw-normal"
                    name="propertyType"
                  />
                </div>
                
                {/* Price */}
                <div className="filter-field" style={{ flex: 1, paddingRight: '15px', borderRight: '1px solid #e0e0e0', minWidth: '200px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '11px', 
                    color: '#aaa', 
                    marginBottom: '8px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {t('price')}
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: t('selectPrice') },
                      { value: "0-1000000", text: t('under1M') },
                      { value: "1000000-5000000", text: t('1M5M') },
                      { value: "5000000-10000000", text: t('5M10M') },
                      { value: "10000000-999999999", text: t('above10M') },
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="fw-normal"
                    name="price"
                  />
                </div>
                
                {/* Location */}
                <div className="filter-field" style={{ flex: 1, paddingRight: '15px', borderRight: '1px solid #e0e0e0', minWidth: '200px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '11px', 
                    color: '#aaa', 
                    marginBottom: '8px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {t('location')}
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: t('allLocations') },
                      ...zones.map(zone => ({
                        value: zone.id.toString(),
                        text: (() => {
                          switch (locale) {
                            case 'th': return zone.nameTh || zone.nameEn;
                            case 'zh': return zone.nameZh || zone.nameEn;
                            case 'ru': return zone.nameRu || zone.nameEn;
                            default: return zone.nameEn;
                          }
                        })()
                      }))
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setLocation(e.target.value)}
                    className="fw-normal location"
                    name="location"
                  />
                </div>
                
                {/* Property Quota */}
                <div className="filter-field" style={{ flex: 1, paddingRight: '15px', borderRight: '1px solid #e0e0e0', minWidth: '200px' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '11px', 
                    color: '#aaa', 
                    marginBottom: '8px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {t('propertyQuota')}
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: t('allQuota') },
                      { value: "thai", text: t('thaiQuota') },
                      { value: "foreign", text: t('foreignQuota') },
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setQuota(e.target.value)}
                    className="fw-normal"
                    name="quota"
                  />
                </div>
                
                {/* Buttons */}
                <div className="filter-buttons" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', minWidth: '200px' }}>
                    <button 
                      type="button"
                      onClick={() => setAdvancedSearchVisible(true)}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: '1px solid #e0e0e0',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#666',
                        flexShrink: 0
                      }}
                    >
                      <i className="fa-light fa-sliders-up"></i>
                    </button>
                    <button 
                      type="submit"
                      style={{
                        backgroundColor: '#AF1A1E',
                        color: 'white',
                        border: 'none',
                        padding: '12px 40px',
                        borderRadius: '25px',
                        fontSize: '13px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {t('search')}
                    </button>
                  </div>
                </div>
              
            </form>
          ))}
        </div>
      </div>
    </>
  );
}
