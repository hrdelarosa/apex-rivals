export interface ScrapedResult<T> {
  status: 'success' | 'error'
  message: string
  data: T[] | T
  meta: {
    source: string
    description: string
  }
}

export interface ConstructorScrape {
  id: string
  name: string
  branding: {
    logoUrl: string | null
    carImageUrl: string | null
  }
  colors: {
    primary: string
    contrast: string
  }
}

export interface DriverScrape {
  id: string
  firstName: string
  lastName: string
  fullName: string
  acronymName: string
  nationality: string
  driverNumber: string
  team: {
    id: string
    name: string
  }
  images: {
    portraitUrl: string | null
  }
}

export interface DotDDriverScrape {
  firstName: string
  lastName: string
  driverNumber: string
}
