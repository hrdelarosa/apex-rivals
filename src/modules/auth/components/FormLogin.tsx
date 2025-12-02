'use client'

import { useFormWithValidation } from '../hooks/useFormWithValidation'
import { LoginSchema, LoginTypes } from '../schemas/login'
import { useAuth } from '../hooks/useAuth'

import FormContainer from './FormContainer'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'

export default function FormLogin() {
  const { signInWithEmail, loading } = useAuth()
  const { register, handleSubmit, errors, onSubmit } =
    useFormWithValidation<LoginTypes>({
      formSchema: LoginSchema,
      onSubmit: async (data) => {
        await signInWithEmail({ email: data.email, password: data.password })
      },
    })

  return (
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
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
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
  )
}
