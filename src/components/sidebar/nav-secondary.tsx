'use client'

import { ComponentProps } from 'react'
import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

import { useActiveRoute } from '@/src/hooks/useActiveRoute'
import { SIDEBAR_SECONDARY_ROUTES } from '@/src/config/routes'

export function NavSecondary({
  ...props
}: ComponentProps<typeof SidebarGroup>) {
  const { isActive } = useActiveRoute()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {SIDEBAR_SECONDARY_ROUTES.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                size="sm"
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
