export interface Root {
    categories: Category[]
    requestId: string
    metadata: Metadata
    modelVersion: string
  }
  
  export interface Category {
    name: string
    score: number
    detail: Detail
  }
  
  export interface Detail {
    landmarks: Landmark[]
  }
  
  export interface Landmark {
    name: string
    confidence: number
  }
  
  export interface Metadata {
    height: number
    width: number
    format: string
  }
  