import Image from 'next/image'
import Link from 'next/link'

import { ModeToggle } from '@/src/components/ModeToggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-7 right-7">
        <ModeToggle />
      </div>

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
