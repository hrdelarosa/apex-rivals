export function calculateRaceDistance({
  circuitLength,
  laps,
}: {
  circuitLength: string | null | undefined
  laps: number | null | undefined
}) {
  if (!circuitLength || !laps) return 'No disponible'

  const lengthKm = parseFloat(circuitLength) / 1000

  return `${(lengthKm * laps).toFixed(3)} km`
}

export function getTimeRemaining({ targetDate }: { targetDate: Date }) {
  const now = new Date()
  const total = targetDate.getTime() - now.getTime()

  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}
