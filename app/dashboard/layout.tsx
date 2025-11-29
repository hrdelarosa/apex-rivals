import AppSidebar from '@/src/components/AppSidebar'
import { NavHeader } from '@/src/components/NavHeader'
import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <NavHeader title="Dashboard" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
