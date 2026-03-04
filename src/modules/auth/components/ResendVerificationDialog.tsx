import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Field, FieldLabel } from '@/src/components/ui/field'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'

export default function ResendVerificationDialog() {
  return (
    <DialogContent className="sm:max-w-md">
      <form className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Reenviar correo de verificación</DialogTitle>
          <DialogDescription>
            Ingresa la dirección de correo electrónico asociado a su cuenta y le
            enviaremos un nuevo enlace de verificación.
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" />
        </Field>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button type="submit">Enviar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
