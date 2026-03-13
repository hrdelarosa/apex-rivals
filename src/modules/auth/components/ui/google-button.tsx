import { GoogleIcon } from '@/src/components/icons/googleIcon'

import { Button } from '@/src/components/ui/button'
import { useAuth } from '@/src/modules/auth/hooks/useAuth'

export default function GoogleButton() {
  const { signInWithGoogle, loading } = useAuth()

  return (
    <Button
      variant="outline"
      type="button"
      onClick={signInWithGoogle}
      disabled={loading}
    >
      <GoogleIcon />
      Iniciar sesión con Google
    </Button>
  )
}
