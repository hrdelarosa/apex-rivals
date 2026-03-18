'use client'

import { SessionContext } from '@/src/modules/auth/context/SessionContext'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { User } from 'better-auth'

export default function ProtectedProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) {
  return (
    <TooltipProvider>
      <SessionContext.Provider value={{ user }}>
        {children}
      </SessionContext.Provider>
    </TooltipProvider>
  )
}
