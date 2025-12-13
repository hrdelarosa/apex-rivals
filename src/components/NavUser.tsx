'use client'

import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react'
import { useNavUser } from '../hooks/useNavUser'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import SkeletonNavUser from './skeletons/SkeletonNavUser'

export default function NavUser() {
  const { isMobile, signOut, user, isPending } = useNavUser()

  if (isPending) return <SkeletonNavUser />
  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg grayscale hover:grayscale-0 transition">
                <AvatarImage
                  src={
                    user?.image
                      ? user.image
                      : 'https://ui.shadcn.com/avatars/shadcn.jpg'
                  }
                  alt={`User Avatar ${user?.name}`}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name.split(' ')[0].charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium font-exo2">
                  {user?.name.split(' ')[0]}
                </span>
                <span className="text-muted-foreground truncate text-xs font-exo2">
                  {user?.email}
                </span>
              </div>

              <IconDotsVertical className="size-4 ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.image
                        ? user.image
                        : 'https://ui.shadcn.com/avatars/shadcn.jpg'
                    }
                    alt={`User Avatar ${user?.name}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name.split(' ')[0].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium font-exo2">
                    {user?.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-exo2">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Perfil
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconNotification />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={signOut}>
              <IconLogout />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
