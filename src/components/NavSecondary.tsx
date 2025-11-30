'use client'

import { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { IconListCheck, IconStar } from '@tabler/icons-react'
import { useActiveRoute } from '../hooks/useActiveRoute'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import { SidebarRoute } from '../types/routes.types'

interface Props extends ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SidebarRoute[]
}

export default function NavSecondary({ items, ...props }: Props) {
  const { isActive } = useActiveRoute()
  const iconMap: Record<string, React.ElementType> = {
    IconListCheck,
    IconStar,
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {items.map((item) => {
              const IconComponent = iconMap[item.icon]
              return (
                <SidebarMenuButton
                  key={item.name}
                  asChild
                  size="sm"
                  isActive={isActive({ path: item.path })}
                  tooltip={item.name}
                >
                  <Link href={item.path}>
                    {IconComponent && <IconComponent />}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )
            })}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
