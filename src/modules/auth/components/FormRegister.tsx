'use client'

import { useAuth } from '../hooks/useAuth'
import { RegisterSchema, RegisterTypes } from '../schemas/register'

import FormContainer from './FormContainer'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'

export default function FormRegister() {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useAuth<RegisterTypes>({ formSchema: RegisterSchema })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer loading={loading} typeAuth="register">
        <Field>
          <FieldGroup className="gap-3">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input
                {...register('name')}
                id="name"
                type="text"
                placeholder="Juan Pérez"
                required
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

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
              <Field className="grid grid-cols-2 gap-3">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    {...register('password')}
                    id="password"
                    type="password"
                    required
                  />
                </Field>

                <Field className="gap-1.5">
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar contraseña
                  </FieldLabel>
                  <Input
                    {...register('confirmPassword')}
                    id="confirm-password"
                    type="password"
                    required
                  />
                </Field>
              </Field>

              <FieldDescription
                className={`${
                  errors.password && 'text-destructive'
                } text-[13px]`}
              >
                Debe tener al menos 8 caracteres.
              </FieldDescription>
              <FieldError className="text-[13px]">
                {errors.confirmPassword?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </Field>
      </FormContainer>
    </form>
  )
}
