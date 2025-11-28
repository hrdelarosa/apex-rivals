import { TypeAuth } from '../../types/auth'

import { Button } from '@/src/components/ui/button'
import { GoogleIcon } from './google-icon'

export default function SocialButton({ type = 'login' }: { type: TypeAuth }) {
  return (
    <Button variant="secondary" className="cursor-pointer">
      <GoogleIcon />
      {type === 'login' ? 'Iniciar sesión' : 'Registrarse'} con Google
    </Button>
  )
}
