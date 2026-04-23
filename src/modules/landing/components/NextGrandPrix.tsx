import {
  IconBorderCornerPill,
  IconFlag3,
  IconHistory,
  IconLineDashed,
  IconMapPin,
  IconRepeat,
  IconRoute,
} from '@tabler/icons-react'

import { Badge } from '@/src/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import DetailItem from './ui/DetailItem'
import NextGrandPrixCountdown from './NextGrandPrixCountdown'
import NextsRaces from './NextsRaces'
import NextGrandPrixMap from './NextGrandPrixMap'

import {
  getNextGrandPrixDetails,
  getNextRace,
  getNextsRaces,
} from '../services/race.service'
import { calculateRaceDistance } from '../lib/utils'

export default async function NextGrandPrix({
  children,
}: {
  children: React.ReactNode
}) {
  const race = await getNextRace()
  const [raceJolpi, fastestLapDriver, fastestLapTeam] =
    await getNextGrandPrixDetails({
      driverId: race?.circuit.fastestLapDriverId || 'none',
      teamId: race?.circuit.fastestLapTeamId || 'none',
    })
  const nextsRaces = await getNextsRaces({
    round: Number(raceJolpi?.round ?? 1),
  })

  return (
    <div>
      <div className="max-w-7xl mx-auto w-full">
        {children}
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-1 font-extrabold font-exo2">
          {raceJolpi ? raceJolpi.raceName : 'No hay carreras próximas'}
        </h2>
        <div className="mb-6 flex items-center gap-1 text-muted-foreground">
          <IconMapPin size={20} />
          <p className="text-lg">
            {raceJolpi?.Circuit.Location.locality},{' '}
            {raceJolpi?.Circuit.Location.country}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3">
              <DetailItem
                icon={IconFlag3}
                title="Ronda"
                description={raceJolpi?.round || 'No disponible'}
              />
              <DetailItem
                icon={IconRepeat}
                title="Vueltas"
                description={race?.laps || 'No disponible'}
              />
              <DetailItem
                icon={IconRoute}
                title="Distancia total"
                description={calculateRaceDistance({
                  circuitLength: race?.circuit?.circuitLength,
                  laps: race?.laps,
                })}
              />
            </div>

            <NextGrandPrixCountdown
              targetDate={new Date(`${raceJolpi?.date}T${raceJolpi?.time}`)}
            />

            <NextsRaces nextsRaces={nextsRaces} />
          </div>

          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-warm-red/10 blur-2xl" />

            <CardHeader>
              <div className="flex justify-between">
                <span className="text-xs font-semibold font-exo2 text-warm-red uppercase tracking-wide">
                  Circuito
                </span>

                {raceJolpi?.Sprint && <Badge>Sprint</Badge>}
              </div>
              <CardTitle className="font-exo2 text-2xl">
                {race?.circuit.circuitName || 'Circuito no disponible'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <DetailItem
                  icon={IconLineDashed}
                  title="Longitud"
                  description={race?.circuit.circuitLength || 'No disponible'}
                />
                <DetailItem
                  icon={IconBorderCornerPill}
                  title="Curvas"
                  description={race?.circuit.corners || 'No disponibles'}
                />
                <DetailItem
                  icon={IconHistory}
                  title="Primera aparición"
                  description={
                    race?.circuit.firstParticipationYear ||
                    'Ubicación no disponible'
                  }
                />
              </div>

              <NextGrandPrixMap
                long={raceJolpi?.Circuit.Location.long}
                lat={raceJolpi?.Circuit.Location.lat}
                locality={raceJolpi?.Circuit.Location.locality}
                country={raceJolpi?.Circuit.Location.country}
                raceName={raceJolpi?.Circuit.circuitName}
              />

              <section className="rounded-xl border border-border/60 bg-background/40 p-4">
                <span className="text-xs font-semibold font-exo2 text-warm-red uppercase tracking-wide">
                  Circuito
                </span>

                <p className="text-xl font-exo2 font-bold mt-0.5">
                  {race?.circuit.lapRecord || 'No disponible'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {`${fastestLapDriver?.name} ${fastestLapDriver?.surname} - ${fastestLapTeam?.teamName} (${race?.circuit.fastestLapYear || 'Año no disponible'})`}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
