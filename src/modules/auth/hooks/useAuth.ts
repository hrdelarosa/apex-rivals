import { authClient } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  sendVerificationEmailProps,
  signInWithEmailProps,
  signUpWithEmailProps,
} from '../types/auth'

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
        onError: (ctx) => {
          setLoading(false)

          if (ctx.error.status === 403) {
            toast.error(
              'Por favor, verifica tu correo electrónico antes de iniciar sesión.'
            )
            console.error('Email not verified:', ctx.error.message)
          }
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
          router.push('/verify-email')
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

  const sendVerificationEmail = async ({
    email,
  }: sendVerificationEmailProps) => {
    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: '/login',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('Correo de verificación enviado', {
            description:
              'Revisa tu bandeja de entrada para verificar tu dirección de correo electrónico.',
          })
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(
            ctx.error.message ||
              'Unknown error occurred while sending verification email'
          )
          console.error('Error sending verification email:', ctx.error.message)
        },
      }
    )
  }

  return {
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    sendVerificationEmail,
  }
}
