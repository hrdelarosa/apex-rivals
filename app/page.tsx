import Header from '@/src/modules/landing/components/Header'
import Hero from '@/src/modules/landing/components/Hero'
import CTASection from '@/src/modules/landing/components/CTASection'
import Footer from '@/src/modules/landing/components/Footer'

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto space-y-20">
        <Hero />

        <CTASection />
      </main>

      <Footer />
    </>
  )
}
