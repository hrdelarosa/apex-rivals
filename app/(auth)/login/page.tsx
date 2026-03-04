import { Button } from '@/src/components/ui/button'
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import FormLogin from '@/src/modules/auth/components/FormLogin'
import ResendVerificationDialog from '@/src/modules/auth/components/ResendVerificationDialog'

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>

          <CardDescription>
            Inicia sesión con su cuenta de Google
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormLogin />
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            type="button"
            size="sm"
            className="text-muted-foreground"
          >
            ¿No has recibido el correo de verificación?
          </Button>
        </DialogTrigger>

        <ResendVerificationDialog />
      </Dialog>
    </>
  )
}
