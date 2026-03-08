'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/src/components/ui/field'
import PasswordInput from '@/src/components/PasswordInput'

import { useAuth } from '../hooks/useAuth'
import { useValidatedForm } from '../hooks/useValidatedForm'
import {
  ChangePasswordFormTypes,
  changePasswordSchema,
} from '../schemas/auth.schemas'

export default function FormResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { resetPassword, loading } = useAuth()
  const { register, handleSubmit, errors } =
    useValidatedForm<ChangePasswordFormTypes>({
      formSchema: changePasswordSchema,
      onSubmit: async ({ newPassword, token }) => {
        await resetPassword({ newPassword, token })
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="new-password">Código</FieldLabel>
          <Input
            {...register('token', { value: token || '' })}
            id="token"
            type="text"
            disabled={!!token}
          />
        </Field>
        <div className="flex flex-col gap-3">
          <PasswordInput
            {...register('newPassword')}
            id="new-password"
            error={errors.newPassword?.message}
            label="Nueva contraseña"
            autoComplete="new-password"
            autoFocus
          />

          <PasswordInput
            {...register('confirmPassword')}
            id="confirm-password"
            error={errors.confirmPassword?.message}
            label="Confirmar contraseña"
            autoComplete="new-password"
          />
        </div>

        <Field>
          <Button type="submit" disabled={loading}>
            Restablecer contraseña
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
