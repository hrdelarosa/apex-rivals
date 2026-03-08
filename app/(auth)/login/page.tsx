import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import FormLogin from '@/src/modules/auth/components/FormLogin'

export default function Page() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>

        <CardDescription>Inicia sesión con su cuenta de Google</CardDescription>
      </CardHeader>

      <CardContent>
        <FormLogin />
      </CardContent>
    </Card>
  )
}
