'use client'

import CardCountdown from './ui/CardCountdown'
import { useCountdown } from '../hooks/useCountdown'

interface Props {
  targetDate: Date
}

export default function NextGrandPrixCountdown({ targetDate }: Props) {
  const { days, hours, minutes, seconds } = useCountdown({ targetDate })
  const hasRaceStarted =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0

  return (
    <div className="grid grid-cols-4 gap-4" aria-live="polite">
      {hasRaceStarted ? (
        <div
          className="col-span-4 flex flex-col items-center justify-center gap-1 bg-card-primary border border-border/60 font-exo2 rounded-lg p-4 text-center"
          role="status"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            GRAN PREMIO
          </span>
          <span className="text-2xl font-bold text-primary">EN CURSO</span>
          <small className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            La carrera ha comenzado
          </small>
        </div>
      ) : (
        <>
          <CardCountdown value={days} label="DÍAS" />
          <CardCountdown value={hours} label="HORAS" />
          <CardCountdown value={minutes} label="MINUTOS" />
          <CardCountdown value={seconds} label="SEGUNDOS" />
        </>
      )}
    </div>
  )
}
