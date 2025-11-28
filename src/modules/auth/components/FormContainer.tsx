import { Field, FieldGroup, FieldSeparator } from '@/src/components/ui/field'
import { Button } from '@/src/components/ui/button'
import { Spinner } from '@/src/components/ui/spinner'
import SocialButton from './ui/social-button'

interface Props {
  children: React.ReactNode
  loading: boolean
}

export default function FormContainer({ children, loading }: Props) {
  return (
    <FieldGroup>
      <Field>
        <SocialButton type="login" />
      </Field>

      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
        O continua con
      </FieldSeparator>

      {children}

      <Field>
        <Button type="submit" className="btn-warm-red cursor-pointer">
          {loading ? (
            <>
              <Spinner />
              Iniciando sesión..
            </>
          ) : (
            'Iniciar sesión'
          )}
        </Button>
      </Field>
    </FieldGroup>
  )
}
