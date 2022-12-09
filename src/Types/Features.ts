export interface FeaturesRoot {
    type: string
    features: Feature[]
  }
  
  export interface Feature {
    type: string
    properties: Properties
    geometry: Geometry2
    bbox: number[]
  }
  
  export interface Properties {
    address: Address
    type: string
    confidence: string
    matchCodes: string[]
    geocodePoints: GeocodePoint[]
  }
  
  export interface Address {
    countryRegion: CountryRegion
    adminDistricts: AdminDistrict[]
    formattedAddress: string
    locality?: string
    neighborhood?: string
  }
  
  export interface CountryRegion {
    ISO: string
    name: string
  }
  
  export interface AdminDistrict {
    shortName: string
  }
  
  export interface GeocodePoint {
    geometry: Geometry
    calculationMethod: string
    usageTypes: string[]
  }
  
  export interface Geometry {
    type: string
    coordinates: number[]
  }
  
  export interface Geometry2 {
    type: string
    coordinates: number[]
  }
  