'use client'

import { createContext } from 'react'
import { SessionContextType, User } from '../types/user.types'

export const SessionContext = createContext<SessionContextType>({
  user: null,
})

export function SessionProvider({
  user,
  children,
}: {
  user: User | null
  children: React.ReactNode
}) {
  return <SessionContext value={{ user }}>{children}</SessionContext>
}
