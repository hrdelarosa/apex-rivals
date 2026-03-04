import FormRegister from '@/src/modules/auth/components/FormRegister'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

export default function Page() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Crea tu cuenta</CardTitle>

        <CardDescription>
          Ingrese su información a continuación para crear su cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormRegister />
      </CardContent>
    </Card>
  )
}
