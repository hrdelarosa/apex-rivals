import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import FormResetPassword from '@/src/modules/auth/components/FormResetPassword'

export default function Page() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          Restablecimiento de contraseña
        </CardTitle>

        <CardDescription className="text-pretty">
          Elija una contraseña segura para su cuenta. Asegúrese de que cumpla
          con los requisitos que se indican a continuación.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormResetPassword />
      </CardContent>
    </Card>
  )
}
