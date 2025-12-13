import { useEffect } from 'react'
import { useSidebar } from '../components/ui/sidebar'
import { useAuth } from '../modules/auth/hooks/useAuth'
import { authClient } from '../lib/auth-client'
import { redirect } from 'next/navigation'

export function useNavUser() {
  const { isMobile } = useSidebar()
  const { signOut } = useAuth()
  const { data: session, error, isPending } = authClient.useSession()
  const user = session?.user

  useEffect(() => {
    if (!isPending && (!session || error)) redirect('/login')
  }, [session, error, isPending])

  return { isMobile, signOut, session, error, isPending, user }
}
