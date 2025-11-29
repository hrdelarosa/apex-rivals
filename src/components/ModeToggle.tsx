'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface Props {
  size?: 'sm' | 'md'
}

export function ModeToggle({ size = 'md' }: Props) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size === 'md' ? 'icon' : 'icon-sm'}>
          <Sun
            className={`${
              size === 'md' ? 'size-4' : 'size-3.5'
            } scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90`}
          />
          <Moon
            className={`${
              size === 'md' ? 'size-4' : 'size-3.5'
            } absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="font-exo2"
          onClick={() => setTheme('light')}
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-exo2"
          onClick={() => setTheme('dark')}
        >
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-exo2"
          onClick={() => setTheme('system')}
        >
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
