import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/src/lib/auth'

import Image from 'next/image'
import Link from 'next/link'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-0.5 self-center font-bold font-exo2 text-xl"
        >
          <Image
            src="/apex-rivals-logo.webp"
            alt="Apex Rivals Logo"
            height={70}
            width={70}
            priority
          />
          Apex Rivals
        </Link>

        {children}
      </div>
    </div>
  )
}
