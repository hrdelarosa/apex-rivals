import { useEffect, useState } from 'react'
import { getTimeRemaining } from '../lib/utils'

type TimeRemaining = ReturnType<typeof getTimeRemaining>

interface UseCountdownProps {
  targetDate: Date
  initialTimeRemaining: TimeRemaining
}

export function useCountdown({
  targetDate,
  initialTimeRemaining,
}: UseCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining({ targetDate }))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const { days, hours, minutes, seconds } = timeRemaining

  return { days, hours, minutes, seconds }
}
