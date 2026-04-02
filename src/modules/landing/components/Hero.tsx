import { IconPointFilled } from '@tabler/icons-react'
import { ArrowRightIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'

export default function Hero() {
  return (
    <section
      className="relative mb-24 min-h-[calc(100dvh-80px)] sm:px-4 lg:px-10 sm:pt-4 lg:pt-8"
      data-section="hero"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden sm:inset-4 lg:inset-8">
        <Image
          className="w-full h-full object-cover rounded-2xl sm:mask-l-from-70% mask-b-from-45% sm:mask-b-from-60% opacity-65 sm:opacity-80"
          src="/hero-image.webp"
          alt="Formula 1 single-seater driven by Max Verstappen competing on the Singapore nighttime street circuit under artificial lights"
          width={1000}
          height={600}
          priority
          sizes="100vw"
        />
      </div>

      <div className="mx-auto flex min-h-[calc(100dvh-112px)] max-w-7xl items-center px-6 lg:px-10 2xl:px-0">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="mb-6 border-white/15 bg-white/10 text-white backdrop-blur-md"
          >
            <IconPointFilled data-icon="inline-start" />
            ¡La nueva temporada 2026 ya está aquí!
          </Badge>

          <h1 className="mb-4 font-exo2 text-5xl font-bold tracking-tight text-white sm:text-left sm:text-7xl">
            DOMINA LA <span className="text-warm-red">PARRILLA</span>
          </h1>

          <p className="mb-8 max-w-prose text-base text-white/80 sm:text-left sm:text-lg">
            Únete a la comunidad de Fantasy F1 más vibrante. Crea ligas privadas
            con tus amigos, compite en tiempo real y demuestra quién es el
            verdadero experto en la parrilla.
          </p>

          <div className="flex flex-row items-center gap-3">
            <Button
              variant="default"
              size="lg"
              className="group gap-1 active:scale-[0.98]"
              asChild
            >
              <Link href="/register">
                Comenzar ahora
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="hidden transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:inline-block"
                />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 active:scale-[0.98]"
              asChild
            >
              <Link href="#how-it-works">Cómo funciona</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
