import Link from 'next/link'
import { TypeAuth } from '../types/auth'

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from '@/src/components/ui/field'
import { Button } from '@/src/components/ui/button'
import { Spinner } from '@/src/components/ui/spinner'
import SocialButton from './ui/social-button'

interface Props {
  children: React.ReactNode
  loading: boolean
  typeAuth: TypeAuth
}

export default function FormContainer({ children, loading, typeAuth }: Props) {
  return (
    <FieldGroup className="gap-6">
      <Field>
        <SocialButton type={typeAuth} />
      </Field>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        O continua con
      </FieldSeparator>

      {children}

      <Field className="gap-2.5">
        <Button type="submit" className="cursor-pointer">
          {loading ? (
            <>
              <Spinner />
              {typeAuth === 'login' ? 'Iniciando sesión...' : 'Registrando...'}
            </>
          ) : typeAuth === 'login' ? (
            'Iniciar sesión'
          ) : (
            'Registrarse'
          )}
        </Button>

        <FieldDescription className="text-center">
          ¿{typeAuth === 'login' ? 'No tienes' : 'Ya tienes'} una cuenta?{' '}
          <Link href={typeAuth === 'login' ? '/register' : '/login'}>
            {typeAuth === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </Link>
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
