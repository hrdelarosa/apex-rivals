import PublicHeader from '@/src/modules/public/components/PublicHeader'
import Footer from '@/src/modules/landing/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicHeader />
      {children}
      <Footer />
    </>
  )
}
