'use client'

import {
  SendVerificationEmailSchema,
  SendVerificationEmailTypes,
} from '../schemas/send-verification-email'
import { useDialog } from './useDialog'
import { useAuth } from './useAuth'
import { useFormWithValidation } from './useFormWithValidation'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function SendVerificationEmailDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const { open, onOpenChange } = useDialog()
  const { sendVerificationEmail, loading } = useAuth()
  const { register, handleSubmit, errors, onSubmit, reset } =
    useFormWithValidation<SendVerificationEmailTypes>({
      formSchema: SendVerificationEmailSchema,
      onSubmit: async (data) => {
        await sendVerificationEmail({ email: data.email })
        reset()
        onOpenChange(false)
      },
    })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[490px]">
        <DialogHeader>
          <DialogTitle className="text-base">
            Reenviar correo de verificación
          </DialogTitle>

          <DialogDescription className="text-sm">
            Para reenviar el correo de verificación, por favor ingrese su correo
            electrónico asociado a su cuenta y le enviaremos un nuevo enlace
            para verificar su correo.
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
