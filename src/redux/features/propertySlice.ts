import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Property {
  id: number
  title: string
  price: number
  location: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  images?: string[]
}

interface PropertyState {
  properties: Property[]
  filteredProperties: Property[]
  loading: boolean
  error: string | null
}

const initialState: PropertyState = {
  properties: [],
  filteredProperties: [],
  loading: false,
  error: null
}

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload
      state.filteredProperties = action.payload
    },
    setFilteredProperties: (state, action: PayloadAction<Property[]>) => {
      state.filteredProperties = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setProperties, setFilteredProperties, setLoading, setError } = propertySlice.actions
export default propertySlice.reducer
