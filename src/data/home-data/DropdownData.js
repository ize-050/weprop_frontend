const dropdown_data = {
   propertyTypes: [
      { value: "", text: "All Types" },
      { value: "condo", text: "Condominium" },
      { value: "villa", text: "Pool Villa" },
      { value: "house", text: "House" },
      { value: "townhouse", text: "Townhouse" },
      { value: "land", text: "Land" },
      { value: "commercial", text: "Commercial" }
   ],
   priceRanges: [
      { value: "", text: "Select Price" },
      { value: "0-1000000", text: "Under 1M" },
      { value: "1000000-3000000", text: "1M - 3M" },
      { value: "3000000-5000000", text: "3M - 5M" },
      { value: "5000000-10000000", text: "5M - 10M" },
      { value: "10000000-999999999", text: "Above 10M" }
   ],
   locations: [
      { value: "", text: "All Locations" },
      { value: "jomtien", text: "Jomtien" },
      { value: "wongamat", text: "Wongamat" },
      { value: "naklua", text: "Naklua" },
      { value: "pratumnak", text: "Pratumnak" },
      { value: "central-pattaya", text: "Central Pattaya" },
      { value: "east-pattaya", text: "East Pattaya" },
      { value: "bang-saray", text: "Bang Saray" }
   ],
   bedrooms: [
      { value: "", text: "Any Bedrooms" },
      { value: "1", text: "1 Bedroom" },
      { value: "2", text: "2 Bedrooms" },
      { value: "3", text: "3 Bedrooms" },
      { value: "4", text: "4 Bedrooms" },
      { value: "5", text: "5+ Bedrooms" }
   ],
   bathrooms: [
      { value: "", text: "Any Bathrooms" },
      { value: "1", text: "1 Bathroom" },
      { value: "2", text: "2 Bathrooms" },
      { value: "3", text: "3 Bathrooms" },
      { value: "4", text: "4+ Bathrooms" }
   ],
   propertyQuota: [
      { value: "", text: "All Quota" },
      { value: "thai", text: "Thai Quota" },
      { value: "foreign", text: "Foreign Quota" }
   ]
}

export default dropdown_data
