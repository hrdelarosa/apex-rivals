import { TypeAuth } from '../../types/auth'
import { useAuth } from '../../hooks/useAuth'

import { Button } from '@/src/components/ui/button'
import { GoogleIcon } from './google-icon'

export default function SocialButton({ type = 'login' }: { type: TypeAuth }) {
  const { signInWithGoogle } = useAuth()

  return (
    <Button
      variant="secondary"
      type="button"
      className="cursor-pointer"
      onClick={signInWithGoogle}
    >
      <GoogleIcon />
      {type === 'login' ? 'Iniciar sesión' : 'Registrarse'} con Google
    </Button>
  )
}
