"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import usePropertyFilterStore from '@/store/usePropertyFilterStore';
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import AdvanceFilterContent from "@/components/properties/listing/AdvancedFilterContent";
import useDynamicTranslations from '@/hooks/useDynamicTranslations';
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
  const {advancedSearchVisible,setAdvancedSearchVisible} = usePropertyFilterStore();
 
  // ดึงค่า type จาก URL parameters
  const typeParam = searchParams.get('type');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [quota, setQuota] = useState('');

  // กำหนด initial listing type จาก URL parameter ถ้ามี
  const getInitialListingType = () => {
    if (typeParam === 'rent') return "RENT";
    if (typeParam === 'sale') return "SALE";
    return initialListingType;
  };

  const { t } = useDynamicTranslations('listing');

  const tabs = [
    { id: "buy", label: t('buy', 'Buy') },
    { id: "rent", label: t('rent', 'Rent') },
  ];

  const [listingType, setListingType] = useState(getInitialListingType());
  const [activeTab, setActiveTab] = useState(typeParam === 'rent' ? "rent" : "buy");

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
      params.append('propertyType', propertyType);
    }
    
    // เพิ่ม price range ถ้ามี
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
    }
    
    // เพิ่ม location ถ้ามี
    if (location) {
      params.append('location', location);
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
                    Property Type
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: "All Types" },
                      { value: "condo", text: "Condominium" },
                      { value: "villa", text: "Villa" },
                      { value: "house", text: "House" },
                      { value: "land", text: "Land" },
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
                    Price
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: "Select Price" },
                      { value: "0-1000000", text: "Under 1M" },
                      { value: "1000000-5000000", text: "1M - 5M" },
                      { value: "5000000-10000000", text: "5M - 10M" },
                      { value: "10000000-999999999", text: "Above 10M" },
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
                    Location
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: "All Locations" },
                      { value: "jomtien", text: "Jomtien" },
                      { value: "wongamat", text: "Wongamat" },
                      { value: "naklua", text: "Naklua" },
                      { value: "pratumnak", text: "Pratumnak" },
                      { value: "central-pattaya", text: "Central Pattaya" },
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
                    Property Quota
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: "All Quota" },
                      { value: "thai", text: "Thai Quota" },
                      { value: "foreign", text: "Foreign Quota" },
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
                      SEARCH
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
