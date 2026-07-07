'use client'

import {
  IconLogout,
  IconNotification,
  IconUserCircle,
} from '@tabler/icons-react'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { useAuth } from '../../auth/hooks/useAuth'
import { User } from '../../auth/types/user.types'

interface Props {
  user: User
}

export default function NavHeaderUser({ user }: Props) {
  const { signOut, loading } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user.image || ''}
            alt={`User Avatar for ${user.name}`}
          />
          <AvatarFallback>{user?.name.split(' ')[0].charAt(0)}</AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="left"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal group">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg grayscale group-hover:grayscale-0 transition">
              <AvatarImage
                src={user.image || ''}
                alt={`User Avatar for ${user.name}`}
              />
              <AvatarFallback>
                {user?.name.split(' ')[0].charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
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

        <DropdownMenuItem
          variant="destructive"
          onClick={signOut}
          disabled={loading}
        >
          <IconLogout />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
