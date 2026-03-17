import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import AppSidebar from '@/src/components/sidebar/app-sidebar'
import SiteHeader from '@/src/components/sidebar/site-header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <TooltipProvider>{children}</TooltipProvider>
      </SidebarInset>
    </SidebarProvider>
  )
}
