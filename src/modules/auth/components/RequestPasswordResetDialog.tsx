import {
  RequestPasswordResetSchema,
  RequestPasswordResetTypes,
} from '../schemas/password-reset'
import { useAuth } from '../hooks/useAuth'
import { useFormWithValidation } from '../hooks/useFormWithValidation'

import { IconLockOpen } from '@tabler/icons-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { Spinner } from '@/src/components/ui/spinner'

interface Props {
  open: boolean
  onClose: () => void
}

export default function RequestPasswordResetDialog({ open, onClose }: Props) {
  const { requestPasswordReset, loading } = useAuth()
  const { register, handleSubmit, errors, onSubmit, reset } =
    useFormWithValidation<RequestPasswordResetTypes>({
      formSchema: RequestPasswordResetSchema,
      onSubmit: async (data) => {
        await requestPasswordReset({ email: data.email })
        onClose()
        reset()
      },
    })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[490px]">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-1.5">
            <IconLockOpen size={16} />
            Solicitar restablecimiento de contraseña
          </DialogTitle>

          <DialogDescription className="text-sm">
            Ingrese su correo electrónico asociado a su cuenta y le enviaremos
            un enlace para restablecer su contraseña.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FieldGroup>
            <Field className="gap-1.5">
              <FieldLabel htmlFor="reset-email">Correo electrónico</FieldLabel>
              <Input
                {...register('email')}
                id="reset-email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  Enviando...
                </>
              ) : (
                'Enviar solicitud'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
