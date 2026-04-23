import { Fragment } from 'react'
import { JolpiRace } from '../types/nextGranPrix.types'

import { Separator } from '@/src/components/ui/separator'

interface Props {
  nextsRaces: JolpiRace[] | null
}

export default function NextsRaces({ nextsRaces }: Props) {
  return (
    <div className="mt-2">
      {nextsRaces === null || !nextsRaces.length ? (
        <div className="mt-2 py-6 text-center">
          <p className="text-lg font-exo2 font-bold text-foreground/90">
            No hay proximas carreras disponibles
          </p>
          <p className="mt-1 text-sm font-exo2 text-muted-foreground">
            El calendario se mostrara aqui cuando haya nuevas fechas.
          </p>
        </div>
      ) : (
        nextsRaces.map((race, index) => (
          <Fragment key={race.raceName || index}>
            <div className="flex items-center justify-between py-3.5 hover:bg-card-primary/50 transition-colors">
              <p className="text-lg font-exo2 font-semibold text-warm-red/80">
                MAY 22 - 24
              </p>

              <p className="text-2xl font-exo2 font-bold text-right">
                {race.raceName || 'Gran Premio no disponible'}
              </p>
            </div>

            {index < nextsRaces.length - 1 && <Separator className="" />}
          </Fragment>
        ))
      )}
    </div>
  )
}
