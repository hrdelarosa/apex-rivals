'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { TooltipProvider } from '@/src/components/ui/tooltip'

interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export default function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemeProvider
      attribute="class"
      enableSystem
      disableTransitionOnChange
      {...themeProps}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemeProvider>
  )
}
