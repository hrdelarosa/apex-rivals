'use client'

import { useAuth } from '../hooks/useAuth'
import { LoginSchema, LoginTypes } from '../schemas/login'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import FormContainer from './FormContainer'

export default function FormLogin() {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useAuth<LoginTypes>({ formSchema: LoginSchema })

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
              <FieldError className="">{errors.password?.message}</FieldError>
            </Field>
          </FieldGroup>
        </Field>
      </FormContainer>
    </form>
  )
}
