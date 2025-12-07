'use client'

import { useFormWithValidation } from '../hooks/useFormWithValidation'
import { LoginSchema, LoginTypes } from '../schemas/login'
import { useAuth } from '../hooks/useAuth'
import { useDialog } from '../hooks/useDialog'

import FormContainer from './FormContainer'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import RequestPasswordResetDialog from './RequestPasswordResetDialog'

export default function FormLogin() {
  const { signInWithEmail, loading } = useAuth()
  const { register, handleSubmit, errors, onSubmit } =
    useFormWithValidation<LoginTypes>({
      formSchema: LoginSchema,
      onSubmit: async (data) => {
        await signInWithEmail({ email: data.email, password: data.password })
      },
    })
  const { open, onOpenChange, onClose } = useDialog()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer loading={loading} typeAuth="login">
          <Field>
            <FieldGroup className="gap-3">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="email">Correo</FieldLabel>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <FieldError>{errors.email?.message}</FieldError>
              </Field>

              <Field className="gap-1.5">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                  <button
                    onClick={() => onOpenChange(true)}
                    type="button"
                    className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer text-foreground"
                  >
                    ¿Olvidó su contraseña?
                  </button>
                </div>

                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  required
                />
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
            </FieldGroup>
          </Field>
        </FormContainer>
      </form>

      <RequestPasswordResetDialog open={open} onClose={onClose} />
    </>
  )
}
