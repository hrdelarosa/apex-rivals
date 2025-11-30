import { ComponentProps } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mainRoutes, secondaryRoutes } from '../config/routes'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import NavUser from './NavUser'
import NavSecondary from './NavSecondary'
import NavMain from './NavMain'

export default function AppSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <Image
                  src="/apex-rivals-logo.webp"
                  alt="Acme Inc. Logo"
                  height={32}
                  width={62}
                />
                <span className="text-lg font-semibold font-exo2">
                  Apex Rivals
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainRoutes} />
        <NavSecondary items={secondaryRoutes} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
