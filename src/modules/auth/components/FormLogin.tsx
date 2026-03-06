'use client'

import { MailIcon } from 'lucide-react'
import { GoogleIcon } from '@/src/components/icons/googleIcon'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/src/components/ui/field'
import PasswordInput from '@/src/components/PasswordInput'

import { LoginFormTypes, loginSchema } from '../schemas/auth.schemas'
import { useAuth } from '../hooks/useAuth'
import { useValidatedForm } from '../hooks/useValidatedForm'

export default function FormLogin() {
  const { signIn, signInWithGoogle, loading } = useAuth()
  const { register, handleSubmit, errors } = useValidatedForm<LoginFormTypes>({
    formSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      await signIn({ email, password })
    },
  })

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <GoogleIcon />
            Iniciar sesión con Google
          </Button>
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
                tabIndex={0}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <PasswordInput
              {...register('password')}
              id="password"
              tabIndex={1}
              error={errors.password?.message}
            >
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      type="button"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <form className="flex flex-col gap-4">
                      <DialogHeader className="items-center">
                        <div className="size-12 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                          <MailIcon />
                        </div>
                        <DialogTitle>Restablecer contraseña</DialogTitle>
                        <DialogDescription className="text-center">
                          Ingrese su correo electrónico asociado a su cuenta y
                          le enviaremos un enlace para restablecer su
                          contraseña.
                        </DialogDescription>
                      </DialogHeader>

                      <Field>
                        <FieldLabel htmlFor="email">
                          Correo electrónico
                        </FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                        />
                      </Field>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>

                        <Button type="submit">Enviar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </PasswordInput>
          </FieldGroup>
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            Iniciar sesión
          </Button>

          <FieldDescription className="text-center [&>a:hover]:text-foreground">
            ¿No tienes una cuenta? <Link href="/register">Regístrate</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
