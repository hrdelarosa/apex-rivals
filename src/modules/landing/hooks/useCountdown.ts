import { useEffect, useState } from 'react'
import { getTimeRemaining } from '../lib/utils'

export function useCountdown({ targetDate }: { targetDate: Date }) {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining({ targetDate }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining({ targetDate }))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const { days, hours, minutes, seconds } = timeRemaining

  return { days, hours, minutes, seconds }
}
