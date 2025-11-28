import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import FormRegister from '@/src/modules/auth/components/FormRegister'

export default function Page() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Crea tu cuenta en Apex Rivals
        </CardTitle>

        <CardDescription>Regístrate con tu cuenta de Google.</CardDescription>
      </CardHeader>

      <CardContent>
        <FormRegister />
      </CardContent>
    </Card>
  )
}
