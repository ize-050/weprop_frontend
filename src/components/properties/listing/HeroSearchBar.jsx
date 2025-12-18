import React, { useState, useEffect } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import usePropertyFilterStore from '@/store/usePropertyFilterStore';
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import AdvanceFilterContent from "./AdvancedFilterContent";
import propertyTypeService from '@/services/propertyTypeService';
import zoneService from '@/services/zoneService';
import NiceSelect from "@/components/ui/NiceSelect";

export default function HeroSearchBar({
  onSearch,
  initialType = "CONDO",
  initialListingType = "SALE",
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const searchParams = useSearchParams();
  const {advancedSearchVisible,setAdvancedSearchVisible} = usePropertyFilterStore();
  const router = useRouter();
  const locale = useLocale();
 
  // ดึงค่า type จาก URL parameters
  const typeParam = searchParams.get('type');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filters
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedQuota, setSelectedQuota] = useState("");

  // กำหนด initial listing type จาก URL parameter ถ้ามี
  const getInitialListingType = () => {
    if (typeParam === 'rent') return "RENT";
    if (typeParam === 'sale') return "SALE";
    return initialListingType;
  };

  const t = useTranslations();

  const tabs = [
    { id: "buy", label: t('buy') },
    { id: "rent", label: t('rent') },
  ];

  const [listingType, setListingType] = useState(getInitialListingType());

  // Fetch Property Types
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await propertyTypeService.getPropertyTypesForFilter();
        // Filter และเรียงลำดับ: Condo, House, Commercial, Land
        const typeOrder = ['Condo', 'House', 'Commercial', 'Land'];
        const filteredData = response.data
          .filter(type => 
            typeOrder.some(allowed => allowed.toLowerCase() === (type.name || type.nameEn || '').toLowerCase())
          )
          .sort((a, b) => {
            const aName = (a.name || a.nameEn || '').toLowerCase();
            const bName = (b.name || b.nameEn || '').toLowerCase();
            const aIndex = typeOrder.findIndex(t => t.toLowerCase() === aName);
            const bIndex = typeOrder.findIndex(t => t.toLowerCase() === bName);
            return aIndex - bIndex;
          });
        const types = filteredData.map((type) => {
          let label = type.name;
          switch (locale) {
            case 'th': label = type.nameTh || type.nameEn || type.name; break;
            case 'zh': label = type.nameCh || type.nameEn || type.name; break;
            case 'ru': label = type.nameRu || type.nameEn || type.name; break;
            default: label = type.nameEn || type.name;
          }
          return { value: type.name, text: label };
        });
        setPropertyTypes(types);
      } catch (error) {
        console.error('Error fetching property types:', error);
      }
    };
    fetchPropertyTypes();
  }, [locale]);

  // Fetch Zones from API
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await zoneService.getAllZones();
        const mappedLocations = response.data.map((zone) => {
          let label = zone.nameEn || zone.name;
          switch (locale) {
            case 'th': label = zone.nameTh || zone.nameEn || zone.name; break;
            case 'zh': label = zone.nameCh || zone.nameEn || zone.name; break;
            case 'ru': label = zone.nameRu || zone.nameEn || zone.name; break;
            default: label = zone.nameEn || zone.name;
          }
          return { value: zone.id.toString(), text: label };
        });
        setLocations(mappedLocations);
      } catch (error) {
        console.error('Error fetching zones:', error);
      }
    };
    fetchZones();
  }, [locale]);

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

  // Sync listingType with filter store if needed
  // (ถ้าต้องการเก็บ listingType ใน filter store ให้เพิ่ม field และ setter ใน usePropertyFilterStore)

  const handleSearch = () => {
    console.log('Search button clicked!');
    console.log('Selected values:', {
      propertyType: selectedPropertyType,
      location: selectedLocation,
      price: selectedPrice,
      quota: selectedQuota,
      activeTab
    });

    // สร้าง search parameters
    const searchData = {
      listingType: activeTab === "buy" ? "SALE" : "RENT",
      propertyType: selectedPropertyType || undefined,
      zoneId: selectedLocation || undefined,
      propertyQuota: selectedQuota || undefined,
    };

    // เพิ่ม price range
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-');
      if (min) searchData.minPrice = min;
      if (max) searchData.maxPrice = max;
    }

    console.log('Calling onSearch with:', searchData);
    
    // เรียก onSearch callback
    if (onSearch) {
      onSearch(searchData);
    }
  };

 

  

  const [activeTab, setActiveTab] = useState(typeParam === 'rent' ? "rent" : "buy");

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
      <div className="text-center mb-40">
        <h2 className="hero-title" style={{ 
          fontSize: '48px', 
          fontWeight: '700', 
          color: 'white',
          marginBottom: '15px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {t('findYourProperty')}
        </h2>
        <p className="hero-text" style={{ 
          fontSize: '16px', 
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}>
          {t('apartmentsAvailableText')}
        </p> 
      </div>

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
          backgroundColor: 'white',
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
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          overflow: 'visible',
          position: 'relative',
          zIndex: 100
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
                    {t('propertyType')}
                  </label>
                  <NiceSelect
                    options={[
                      { value: "", text: t('allTypes') },
                      ...propertyTypes
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setSelectedPropertyType(e.target.value)}
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
                    options={
                      activeTab === "rent" ? [
                        { value: "", text: t('selectPrice') },
                        { value: "0-10000", text: '฿0 - ฿10,000' },
                        { value: "10000-20000", text: '฿10,000 - ฿20,000' },
                        { value: "20000-30000", text: '฿20,000 - ฿30,000' },
                        { value: "30000-50000", text: '฿30,000 - ฿50,000' },
                        { value: "50000-100000", text: '฿50,000+' },
                      ] : [
                        { value: "", text: t('selectPrice') },
                        { value: "0-1000000", text: '฿0 - ฿1M' },
                        { value: "2000000-5000000", text: '฿2M - ฿5M' },
                        { value: "5000000-10000000", text: '฿5M - ฿10M' },
                        { value: "10000000-999999999", text: '฿10M+' },
                      ]
                    }
                    defaultCurrent={0}
                    onChange={(e) => setSelectedPrice(e.target.value)}
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
                      ...locations
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setSelectedLocation(e.target.value)}
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
                      { value: "", text: t('allQuotas') },
                      { value: "THAI", text: t('thaiQuota') },
                      { value: "FOREIGN", text: t('foreignQuota') },
                    ]}
                    defaultCurrent={0}
                    onChange={(e) => setSelectedQuota(e.target.value)}
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
                      fontSize: '18px',
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
                      padding: '14px 32px',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
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
