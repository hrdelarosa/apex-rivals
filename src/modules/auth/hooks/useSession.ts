'use client'

import { useSessionContext } from '../context/SessionContext'

export function useSession() {
  const { user } = useSessionContext()

  return { user }
}
