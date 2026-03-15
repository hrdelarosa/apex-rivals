'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Spinner } from '@/src/components/ui/spinner'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/src/components/ui/field'
import PasswordInput from './ui/password-input'
import RequestPasswordResetDialog from './RequestPasswordResetDilog'
import GoogleButton from './ui/google-button'

import { useAuth } from '../hooks/useAuth'
import { useValidatedForm } from '../hooks/useValidatedForm'
import { LoginFormTypes, loginSchema } from '../schemas/auth.schemas'

export default function FormLogin() {
  const { signIn, loading } = useAuth()
  const { register, handleSubmit, errors } = useValidatedForm<LoginFormTypes>({
    formSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      await signIn({ email, password })
    },
  })
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <RequestPasswordResetDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      />

      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          <Field>
            <GoogleButton />
          </Field>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            O continua con
          </FieldSeparator>

          <Field>
            <FieldGroup className="gap-3">
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

              <PasswordInput
                {...register('password')}
                id="password"
                error={errors.password?.message}
                autoComplete="current-password"
              >
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Button
                    variant="link"
                    type="button"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => setOpenDialog(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
              </PasswordInput>
            </FieldGroup>
          </Field>

          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : 'Iniciar sesión'}
            </Button>

            <FieldDescription className="text-center [&>a:hover]:text-foreground">
              ¿No tienes una cuenta? <Link href="/register">Regístrate</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  )
}
