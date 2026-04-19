export interface ApiConstructor {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export interface ApiDriver {
  driverId: string
  permanentNumber?: string
  code?: string
  url?: string
  givenName: string
  familyName: string
  dateOfBirth?: Date
  nationality?: string
}

export interface ApiRace {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  FirstPractice: FirstPractice
  SecondPractice?: FirstPractice
  ThirdPractice?: FirstPractice
  Qualifying: FirstPractice
  Sprint?: FirstPractice
  SprintQualifying?: FirstPractice
}

export interface Circuit {
  circuitId: string
  url: string
  circuitName: string
  Location: Location
}

export interface Location {
  lat: string
  long: string
  locality: string
  country: string
}

export interface FirstPractice {
  date: string
  time: string
}
