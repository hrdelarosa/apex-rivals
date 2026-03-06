'use client'

import Link from 'next/link'
import { GoogleIcon } from '@/src/components/icons/googleIcon'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/src/components/ui/field'
import PasswordInput from '@/src/components/PasswordInput'

import { useAuth } from '../hooks/useAuth'
import { useValidatedForm } from '../hooks/useValidatedForm'
import { RegisterFormTypes, registerSchema } from '../schemas/auth.schemas'

export default function FormRegister() {
  const { signUp, signInWithGoogle, loading } = useAuth()
  const { register, handleSubmit, errors } =
    useValidatedForm<RegisterFormTypes>({
      formSchema: registerSchema,
      onSubmit: async ({ name, email, password }) => {
        await signUp({ name, email, password })
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input
                {...register('name')}
                id="name"
                type="text"
                placeholder="John Doe"
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <div className="grid sm:grid-cols-2 gap-3">
              <PasswordInput
                {...register('password')}
                id="password"
                label="Contraseña"
                error={errors.password?.message}
              />

              <PasswordInput
                {...register('confirmPassword')}
                id="confirm-password"
                label="Confirmar contraseña"
              />

              {errors.confirmPassword?.message ? (
                <FieldError className="sm:col-span-2">
                  {errors.confirmPassword?.message}
                </FieldError>
              ) : (
                <FieldDescription className="sm:col-span-2">
                  Debe tener al menos 8 caracteres.
                </FieldDescription>
              )}
            </div>
          </FieldGroup>
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Crear cuenta
          </Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          O continua con
        </FieldSeparator>

        <Field className="">
          <Button
            variant="outline"
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <GoogleIcon />
            Registrate con Google
          </Button>

          <FieldDescription className="text-center [&>a:hover]:text-foreground">
            ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
