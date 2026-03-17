'use client'

import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

import { SIDEBAR_MAIN_ROUTES } from '@/src/config/routes'

export default function SiteHeader() {
  const path = usePathname()
  const title = SIDEBAR_MAIN_ROUTES.find(
    (route) => route.href === `/${path.split('/')[1]}`,
  )?.label

  return (
    <header className="flex h-13 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-13">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold font-exo2">{title}</h1>
      </div>
    </header>
  )
}
