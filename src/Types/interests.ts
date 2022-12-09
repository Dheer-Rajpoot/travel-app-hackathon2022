export type Root = Root2[]

export interface Root2 {
  type: string
  id: string
  score: number
  dist: number
  info: string
  poi: Poi
  address: Address
  position: Position
  viewport: Viewport
  entryPoints: EntryPoint[]
}

export interface Poi {
  name: string
  categorySet: CategorySet[]
  categories: string[]
  classifications: Classification[]
  phone?: string
  url?: string
  brands?: Brand[]
}

export interface CategorySet {
  id: number
}

export interface Classification {
  code: string
  names: Name[]
}

export interface Name {
  nameLocale: string
  name: string
}

export interface Brand {
  name: string
}

export interface Address {
  streetNumber?: string
  streetName: string
  municipalitySubdivision: string
  municipality: string
  countrySecondarySubdivision: string
  countrySubdivision: string
  postalCode: string
  countryCode: string
  country: string
  countryCodeISO3: string
  freeformAddress: string
  localName: string
}

export interface Position {
  lat: number
  lon: number
}

export interface Viewport {
  topLeftPoint: TopLeftPoint
  btmRightPoint: BtmRightPoint
}

export interface TopLeftPoint {
  lat: number
  lon: number
}

export interface BtmRightPoint {
  lat: number
  lon: number
}

export interface EntryPoint {
  type: string
  position: Position2
}

export interface Position2 {
  lat: number
  lon: number
}
