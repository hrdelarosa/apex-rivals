import Link from 'next/link'
import { GoogleIcon } from '@/src/components/icons/googleIcon'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/src/components/ui/field'
import PasswordInput from '@/src/components/PasswordInput'

export default function FormRegister() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" />
            </Field>

            <div className="grid sm:grid-cols-2 gap-3">
              <PasswordInput label="Contraseña" htmlFor="password" />

              <PasswordInput
                label="Confirmar contraseña"
                htmlFor="confirm-password"
              />

              <FieldDescription className="sm:col-span-2">
                Debe tener al menos 8 caracteres.
              </FieldDescription>
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
          <Button variant="outline" type="button">
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
