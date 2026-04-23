export interface NextGrandPrixResponse {
  round: number
  race: Race[]
}

export interface Race {
  raceId: string
  raceName: string
  schedule: Schedule
  laps: number
  round: number
  circuit: Circuit
  winner: null
  teamWinner: null
}

export interface Session {
  date: Date | null
  time: null | string
}

export interface Schedule {
  race: Session
  qualy: Session
  fp1: Session
  fp2: Session
  fp3: Session
  sprintQualy: Session
  sprintRace: Session
}

export interface Circuit {
  circuitId: string
  circuitName: string
  country: string
  city: string
  circuitLength: string
  lapRecord: string
  firstParticipationYear: number
  corners: number
  fastestLapDriverId: string
  fastestLapTeamId: string
  fastestLapYear: number
}

export interface FastestLapResponse {
  total: number
  driver?: Driver[]
  team?: Team[]
}

export interface Driver {
  driverId: string
  name: string
  surname: string
  nationality: string
  birthday: Date
  number: number
  shortName: string
  url: string
}

export interface Team {
  teamId: string
  teamName: string
  teamNationality: string
  firstAppeareance: number
  constructorsChampionships: number
  driversChampionships: number
  url: string
}

export interface JolpiResponse {
  MRData?: {
    RaceTable?: {
      Races?: JolpiRace[]
    }
  }
}

export interface JolpiRace {
  season: string
  round: string
  raceName: string
  Circuit: JolpiCircuit
  date: Date
  time: string
  FirstPractice: jolpiSession
  SecondPractice?: jolpiSession
  ThirdPractice?: jolpiSession
  Qualifying: jolpiSession
  Sprint?: jolpiSession
  SprintQualifying?: jolpiSession
}

export interface JolpiCircuit {
  circuitId: string
  circuitName: string
  Location: Location
}

export interface Location {
  lat: string
  long: string
  locality: string
  country: string
}

export interface jolpiSession {
  date: Date
  time: string
}
