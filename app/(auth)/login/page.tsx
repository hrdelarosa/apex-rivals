import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/src/components/ui/card'
import FormLogin from '@/src/modules/auth/components/FormLogin'

export default function Page() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Bienvenido de nuevo a Apex Rivals
        </CardTitle>

        <CardDescription>
          Inicia sesión con su cuenta de Google.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormLogin />
      </CardContent>
    </Card>
  )
}
