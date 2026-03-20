import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/src/lib/auth'

import Header from '@/src/modules/landing/components/Header'
import Hero from '@/src/modules/landing/components/Hero'
import ContainerSection from '@/src/modules/landing/components/ui/ContainerSection'
import CTASection from '@/src/modules/landing/components/CTASection'
import Footer from '@/src/modules/landing/components/Footer'
import HowItWorks from '@/src/modules/landing/components/HowItWorks'
import TitleSection from '@/src/modules/landing/components/ui/TitleSection'
import FAQ from '@/src/modules/landing/components/FAQ'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <>
      <Header />
      <main>
        <Hero />

        <div className="space-y-24">
          <ContainerSection id="how-it-works">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm text-warm-red font-semibold font-exo2">
                ¿CÓMO FUNCIONA?
              </span>

              <TitleSection title="Maestro de la estrategia" className="mt-2" />

              <p className="text-lg leading-relaxed text-muted-foreground">
                Estrategia por encima de la complejidad. Gestiona tu presupuesto
                semana a semana y sé más listo que tus amigos en tres sencillos
                pasos.
              </p>
            </div>
            <HowItWorks />
          </ContainerSection>

          <ContainerSection id="faq">
            <TitleSection
              title="Preguntas frecuentes"
              className="text-center"
            />

            <FAQ />
          </ContainerSection>

          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  )
}
