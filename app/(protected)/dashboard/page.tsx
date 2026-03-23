import { Spinner } from '@/src/components/ui/spinner'

export default async function Page() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Bienvenido a tu panel de control, donde podrás gestionar tu cuenta y ver
        tus estadísticas.
      </p>

      <div>
        <h2 className="text-xl font-semibold mt-4">Spinner</h2>
        <Spinner />
      </div>
    </div>
  )
}
