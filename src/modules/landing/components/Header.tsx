import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 w-full border-b backdrop-blur-md h-20 flex flex-col justify-center transition-colors duration-300 bg-white/80 dark:bg-dark-bg/80">
      <nav className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/apex-rivals-logo.webp"
            alt="Apex Rivals Logo"
            className="w-17.5 h-8.75 sm:w-20 sm:h-11"
            width={80}
            height={45}
          />

          <h1 className="text-xl sm:text-2xl font-bold font-exo2">
            Apex Rivals
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Como funciona
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/register">Crear cuenta</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
