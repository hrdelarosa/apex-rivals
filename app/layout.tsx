import './globals.css'
import type { Metadata } from 'next'
import { inter } from '@/src/config/fonts'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Apex Rivals',
  description: 'Apex Legends Ranked Tracker and Stats Analyzer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers themeProps={{ defaultTheme: 'system' }}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
