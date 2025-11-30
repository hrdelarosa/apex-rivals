'use client'

import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
import {
  IconShield,
  IconTrophy,
  IconChartBar,
  IconMoneybag,
  IconUser,
} from '@tabler/icons-react'
import { useActiveRoute } from '../hooks/useActiveRoute'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'
import { SidebarRoute } from '../types/routes.types'

export default function NavMain({ items }: { items: SidebarRoute[] }) {
  const { isActive } = useActiveRoute()
  const iconMap: Record<string, React.ElementType> = {
    HomeIcon,
    IconShield,
    IconTrophy,
    IconChartBar,
    IconMoneybag,
    IconUser,
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {items.map((item) => {
              const IconComponent = iconMap[item.icon]
              return (
                <SidebarMenuButton
                  key={item.name}
                  asChild
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
