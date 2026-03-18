'use client'

import { useContext } from 'react'
import { SessionContext } from '../context/session-context'

export function useSession() {
  const { user } = useContext(SessionContext)

  return { user }
}
