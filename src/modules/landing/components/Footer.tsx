import { ROUTESFOOTER } from '@/src/config/routes'
import Link from 'next/link'
import Image from 'next/image'
import ListFooter from './ui/ListFooter'

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-screen-2xl mx-10 flex flex-wrap justify-between gap-6">
        <div className="flex flex-col items-stretch flex-initial gap-4 w-full md:max-w-md">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src="/apex-rivals-logo.webp"
              alt="Apex Rivals Logo"
              className=""
              width={70}
              height={40}
            />

            <span className="text-xl font-bold">Apex Rivals</span>
          </Link>

          <p className="text-muted-foreground">
            La próxima generación de fantasy de Fórmula 1. Minimalista,
            estratégico y creado para los aficionados.
          </p>
        </div>

        <ListFooter title="Recursos" listItems={ROUTESFOOTER.resources} />
        <ListFooter title="Reglas de juego" listItems={ROUTESFOOTER.rules} />
        <ListFooter title="Legal" listItems={ROUTESFOOTER.legal} />
      </div>

      <div className="mt-10 pt-10 border-t max-w-screen-2xl mx-6 sm:mx-10 flex flex-wrap justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Apex Rivals. Todos los derechos
          reservados.
        </p>

        <p className="text-sm text-muted-foreground">Redes / Toggle theme</p>
      </div>
    </footer>
  )
}
