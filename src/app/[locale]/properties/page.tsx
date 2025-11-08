import PropertiesList from "@/components/properties/PropertiesList"

export const metadata = {
  title: "Properties - 12 Real Estate Pattaya",
  description: "Browse our collection of properties for sale and rent in Pattaya"
}

const PropertiesPage = async ({ params, searchParams }) => {
  return (
    <PropertiesList searchParams={searchParams} />
  )
}

export default PropertiesPage
