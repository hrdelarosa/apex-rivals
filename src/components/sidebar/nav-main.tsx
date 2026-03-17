'use client'

import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

import { useActiveRoute } from '@/src/hooks/useActiveRoute'
import { SIDEBAR_MAIN_ROUTES } from '@/src/config/routes'

export function NavMain() {
  const { isActive } = useActiveRoute()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {SIDEBAR_MAIN_ROUTES.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(route.href)}
                tooltip={route.label}
              >
                <Link
                  href={route.href}
                  className="text-lg font-semibold font-exo2"
                >
                  {route.icon && <route.icon />}
                  <span>{route.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
