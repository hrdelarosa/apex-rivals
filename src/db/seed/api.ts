import { ApiConstructor, ApiDriver, ApiRace } from '@/src/types/seed.types'
import type { races as racesTable } from '../schema'
import { CONSTRUCTOR_BRANDING, DRIVER_PORTRAITS } from '../data'

const DEFAULT_CONSTRUCTOR_BRANDING = {
  logoUrl: null,
  primaryColor: '#1F2937',
  contrastColor: '#FFFFFF',
}

const DEFAULT_DRIVER_PORTRAIT = {
  portraitUrl: null,
}

function getJolpicaBaseUrl() {
  const baseUrl = process.env.JOLPICA_URL

  if (!baseUrl) {
    throw new Error('JOLPICA_URL is required to seed season datasets')
  }

  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
}

async function fetchConstructors(year: number): Promise<ApiConstructor[]> {
  const response = await fetch(`${getJolpicaBaseUrl()}${year}/constructors`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch constructors for year ${year}: ${response.statusText}`,
    )
  }

  const data = await response.json()
  return data.MRData.ConstructorTable.Constructors
}

async function fetchDrivers(year: number): Promise<ApiDriver[]> {
  const response = await fetch(`${getJolpicaBaseUrl()}${year}/drivers`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch drivers for year ${year}: ${response.statusText}`,
    )
  }

  const data = await response.json()
  return data.MRData.DriverTable.Drivers
}

async function fetchRaces(year: number): Promise<ApiRace[]> {
  const response = await fetch(`${getJolpicaBaseUrl()}${year}/races`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch races for year ${year}: ${response.statusText}`,
    )
  }

  const data = await response.json()
  return data.MRData.RaceTable.Races
}

async function fetchSeasonRawData(year: number) {
  const [constructors, drivers, races] = await Promise.all([
    fetchConstructors(year),
    fetchDrivers(year),
    fetchRaces(year),
  ])

  return { constructors, drivers, races }
}

export async function fetchSeasonDatasets(year: number) {
  const { constructors, drivers, races } = await fetchSeasonRawData(year)

  const constructorsData = constructors.map((constructor) => {
    const branding =
      CONSTRUCTOR_BRANDING[constructor.constructorId] ??
      DEFAULT_CONSTRUCTOR_BRANDING

    return {
      id: constructor.constructorId,
      logoUrl: branding.logoUrl,
      primaryColor: branding.primaryColor,
      contrastColor: branding.contrastColor,
    }
  })

  const driversData = drivers.map((driver) => {
    const portrait =
      DRIVER_PORTRAITS[driver.driverId] ?? DEFAULT_DRIVER_PORTRAIT

    return {
      id: driver.driverId,
      portraitUrl: portrait.portraitUrl,
    }
  })

  const racesData: Array<typeof racesTable.$inferInsert> = races.map((race) => {
    const raceTime = race.time ?? '00:00:00Z'
    const raceDateTime = new Date(`${race.date}T${raceTime}`)
    const hasValidDate = !Number.isNaN(raceDateTime.getTime())
    const now = new Date()

    return {
      id: `${race.season}-${race.round}`,
      name: race.raceName,
      seasonYear: Number(race.season),
      round: Number(race.round),
      date: hasValidDate ? raceDateTime : null,
      weekendFormat: race.Sprint ? 'sprint' : 'normal',
      status: hasValidDate && now > raceDateTime ? 'completed' : 'scheduled',
      marketCloseAt: hasValidDate
        ? new Date(raceDateTime.getTime() - 2 * 60 * 60 * 1000)
        : null,
    }
  })

  return { constructorsData, driversData, racesData }
}
