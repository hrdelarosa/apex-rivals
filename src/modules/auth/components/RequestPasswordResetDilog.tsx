import { MailIcon } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/src/components/ui/field'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'

import { useAuth } from '../hooks/useAuth'
import { useValidatedForm } from '../hooks/useValidatedForm'
import {
  RequestPasswordResetFormTypes,
  requestPasswordResetSchema,
} from '../schemas/auth.schemas'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RequestPasswordResetDialog({
  open,
  onOpenChange,
}: Props) {
  const { requestPasswordReset, loading } = useAuth()
  const { register, handleSubmit, errors } =
    useValidatedForm<RequestPasswordResetFormTypes>({
      formSchema: requestPasswordResetSchema,
      onSubmit: async ({ email }) => {
        await requestPasswordReset({ email })
      },
    })

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="sm:max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <DialogHeader className="items-center">
            <div className="size-12 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
              <MailIcon />
            </div>
            <DialogTitle>Restablecer contraseña</DialogTitle>
            <DialogDescription className="text-center">
              Ingrese su correo electrónico asociado a su cuenta y le enviaremos
              un enlace para restablecer su contraseña.
            </DialogDescription>
          </DialogHeader>

          <Field>
            <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              autoFocus
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
