import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/src/components/ui/card'
import FormLogin from '@/src/modules/auth/components/FormLogin'
import SendVerificationEmailDialog from '@/src/modules/auth/hooks/sendVerificationEmailDialog'

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

      <CardFooter className="justify-center">
        <SendVerificationEmailDialog>
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground cursor-pointer"
          >
            Reenviar correo de verificación
          </Button>
        </SendVerificationEmailDialog>
      </CardFooter>
    </Card>
  )
}
