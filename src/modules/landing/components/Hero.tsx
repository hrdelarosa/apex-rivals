import { IconPointFilled } from '@tabler/icons-react'
import { ArrowRightIcon } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] relative px-10 pt-8">
      <div className="h-full w-full px-10 pt-8 overflow-hidden -z-10 absolute top-0 left-0">
        <Image
          className="w-full h-full object-cover rounded-lg mask-l-from-70% mask-b-from-60% opacity-70"
          src="/hero-image.webp"
          alt="Formula 1 single-seater driven by Max Verstappen competing on the Singapore nighttime street circuit under artificial lights"
          width={1000}
          height={600}
        />
      </div>

      <div className="max-w-7xl mx-auto h-[calc(100vh-112px)] flex items-center">
        <div className="max-w-2xl">
          <Badge
            variant="default"
            className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 mb-6"
          >
            <IconPointFilled data-icon="inline-start" />
            La nueva temporada 2026 ya está aquí!
          </Badge>

          <h2 className="text-7xl font-bold font-exo2 mb-4">
            DOMINA LA <span className="text-warm-red">PARRILLA</span>
          </h2>

          <p className="text-lg text-gray-300 mb-6">
            Únete a la comunidad de Fantasy F1 más vibrante. Crea ligas privadas
            con tus amigos, compite en tiempo real y demuestra quién es el
            verdadero experto en la parrilla.
          </p>

          <div className="flex items-center gap-3">
            <Button variant="default" size="lg" className="group gap-1" asChild>
              <Link href="/register">
                Comenzar ahora
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">Como funciona</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
