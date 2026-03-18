import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/src/lib/auth'

import { SessionProvider } from '@/src/modules/auth/context/session-context'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar'
import AppSidebar from '@/src/components/sidebar/app-sidebar'
import SiteHeader from '@/src/components/sidebar/site-header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <SessionProvider user={session.user ?? null}>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <TooltipProvider>{children}</TooltipProvider>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}
