import './globals.css'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/src/lib/auth'
import { inter } from '@/src/config/fonts'
import Providers from './providers'
import { Toaster } from '@/src/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Apex Rivals',
  description: 'Apex Legends Ranked Tracker and Stats Analyzer',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers themeProps={{ defaultTheme: 'system' }}>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
