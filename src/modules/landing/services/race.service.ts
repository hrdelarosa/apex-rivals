import {
  Driver,
  FastestLapResponse,
  JolpiRace,
  JolpiResponse,
  NextGrandPrixResponse,
  Race,
  Team,
} from '../types/nextGranPrix.types'
import {
  FASTEST_LAP_ENDPOINT,
  NEXT_GRAND_PRIX_ENDPOINT,
  NEXTS_RACES_ENDPOINT,
  UPCOMING_RACES_ENDPOINT,
} from '../constants/endpoints'

export async function getNextRace(): Promise<Race | null> {
  const response = await fetch(NEXT_GRAND_PRIX_ENDPOINT, {
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) return null

  const data = (await response.json()) as NextGrandPrixResponse
  const race = data.race[0]

  if (!race) return null

  return race
}

export async function getNextsRaces({
  round,
}: {
  round: number
}): Promise<JolpiRace[] | null> {
  const response = await fetch(NEXTS_RACES_ENDPOINT, {
    next: { revalidate: 60 * 60 },
  })

  if (!response.ok) return null

  const data = (await response.json()) as JolpiResponse
  const races = data.MRData?.RaceTable?.Races

  if (!races) return null

  return races.splice(round, 3)
}

async function getNextRaceDetails(): Promise<JolpiRace | null> {
  const nextRace = await fetch(UPCOMING_RACES_ENDPOINT, {
    next: { revalidate: 60 * 60 },
  })

  if (!nextRace.ok) return null

  const data = (await nextRace.json()) as JolpiResponse
  const racesJolpi = data.MRData?.RaceTable?.Races?.[0]

  if (!racesJolpi) return null

  return racesJolpi
}

async function getFastedLapDriver(
  fastestLapDriverId: string,
): Promise<Driver | null> {
  const response = await fetch(
    `${FASTEST_LAP_ENDPOINT.driver}/${fastestLapDriverId}`,
    {
      next: { revalidate: 60 * 60 },
    },
  )

  if (!response.ok) return null

  const data = (await response.json()) as FastestLapResponse
  const driver = data.driver?.[0]

  if (!driver) return null

  return driver
}

async function getFastedLapTeam(
  fastestLapTeamId: string,
): Promise<Team | null> {
  const response = await fetch(
    `${FASTEST_LAP_ENDPOINT.team}/${fastestLapTeamId}`,
    {
      next: { revalidate: 60 * 60 },
    },
  )

  if (!response.ok) return null

  const data = (await response.json()) as FastestLapResponse
  const team = data.team?.[0]

  if (!team) return null

  return team
}

export async function getNextGrandPrixDetails({
  driverId,
  teamId,
}: {
  driverId: string
  teamId: string
}) {
  return await Promise.all([
    getNextRaceDetails(),
    getFastedLapDriver(driverId),
    getFastedLapTeam(teamId),
  ])
}
