import Image from 'next/image'
import Link from 'next/link'
import TitleSection from './ui/TitleSection'
import { Button } from '@/src/components/ui/button'

export default function CTASection() {
  return (
    <section className="relative h-112 w-full">
      <div className="w-full overflow-hidden -z-10 absolute top-0 left-0">
        <Image
          src="/cta-image-7.jpg"
          alt="Formula 1 show car in metallic red with Pirelli P Zero tires."
          className="w-full h-111 object-cover opacity-40 blur-[2px] mask-alpha mask-b-from-5%"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
          width={1200}
          height={600}
        />
      </div>

      <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center px-4 lg:px-0">
        <TitleSection title="Únete a la parrilla ahora mismo" />

        <p className="text-base md:text-lg text-gray-300 mb-6">
          Únete a miles de aficionados a la F1 que compiten en Apex Rivals.
          ¡Forma tu equipo antes de la próxima carrera!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href="/register">Empieza a correr ahora</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/rules">Ver reglas</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
