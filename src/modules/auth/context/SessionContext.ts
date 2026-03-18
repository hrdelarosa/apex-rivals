'use client'

import { createContext, useContext } from 'react'
import { SessionContextType } from '../types/user.types'

export const SessionContext = createContext<SessionContextType>({
  user: null,
})

export function useSessionContext() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }

  return context
}
