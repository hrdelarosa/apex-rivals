import { authClient } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { signInWithEmailProps, signUpWithEmailProps } from '../types/auth'

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const signInWithGoogle = async () => {
    setLoading(true)

    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })

    if (error) {
      toast.error(
        error.message || 'Unknown error occurred during Google sign-in'
      )
      console.error('Error logging in with Google:', error.message)
      setLoading(false)
      return
    }
  }

  const signInWithEmail = async ({ email, password }: signInWithEmailProps) => {
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.message('¡Bienvenido de nuevo a la pista!', {
            description: 'Tu equipo Apex Rivals te esperaba.',
          })
          router.push('/dashboard')
        },
      }
    )

    if (error || !data) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred during email sign-in'
      )
      console.error('Error logging in with email:', error.message)
      return
    }
  }

  const signUpWithEmail = async ({
    email,
    password,
    name,
  }: signUpWithEmailProps) => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.message('¡Bienvenido a la grilla!', {
            description:
              'Sistema de telemetría activado. Bienvenido a Apex Rivals.',
          })
          router.push('/dashboard')
        },
      }
    )

    if (error || !data) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred during email registration'
      )
      console.error('Error registering with email:', error.message)
      return
    }
  }

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
      },
    })
  }

  return {
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  }
}
