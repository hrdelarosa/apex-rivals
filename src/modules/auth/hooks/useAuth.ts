import { useState } from 'react'
import { authClient } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  changePasswordProps,
  resetPasswordProps,
  sendEmailProps,
  signInWithEmailProps,
  signUpWithEmailProps,
} from '../types/auth'

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const signInWithGoogle = async () => {
    const { error } = await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
        },
      }
    )

    if (error) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred during Google sign-in'
      )
      console.warn('Error logging in with Google:', error.message)
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
          setLoading(false)

          toast.message('¡Bienvenido de nuevo a la pista!', {
            description: 'Tu equipo Apex Rivals te esperaba.',
          })
          router.push('/dashboard')
        },
        onError: (ctx) => {
          setLoading(false)

          if (ctx.error.status === 403) {
            toast.error(
              'Tu correo no está verificado. Te enviamos un nuevo correo de verificación.'
            )
            console.warn('Email not verified:', ctx.error.message)
          }
        },
      }
    )

    if (error || !data) {
      setLoading(false)

      if (error.message && !error.message.includes('Email not verified'))
        toast.error(
          error.message || 'Unknown error occurred during email sign-in'
        )
      console.warn('Error logging in with email:', error?.message)
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
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('¡Bienvenido a la grilla!', {
            description:
              'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
          })

          router.push('/login')
        },
      }
    )

    if (error || !data) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred during email registration'
      )
      console.warn('Error registering with email:', error.message)
      return
    }
  }

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        },
      },
    })
  }

  const sendVerificationEmail = async ({ email }: sendEmailProps) => {
    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: '/login',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('Correo de verificación enviado correctamente', {
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
          console.warn('Error sending verification email:', ctx.error.message)
        },
      }
    )
  }

  const requestPasswordReset = async ({ email }: sendEmailProps) => {
    const { error } = await authClient.requestPasswordReset(
      {
        email,
        redirectTo: '/reset-password',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('Solicitud enviada', {
            description:
              'Si este correo electrónico existe en nuestro sistema, comprueba tu correo electrónico para obtener el enlace de restablecimiento',
          })
        },
      }
    )

    if (error) {
      setLoading(false)
      toast.error(
        error.message ||
          'Unknown error occurred while requesting password reset'
      )
      console.warn('Error requesting password reset:', error.message)
      return
    }
  }

  const resetPassword = async ({ newPassword, token }: resetPasswordProps) => {
    if (!token || token.trim() === '') {
      toast.error('Token no proporcionado o inválido.')
      return
    }

    const { error } = await authClient.resetPassword(
      {
        newPassword,
        token,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('Contraseña restablecida con éxito', {
            description: 'Ya puedes iniciar sesión con tu nueva contraseña.',
          })
          router.push('/login')
        },
      }
    )

    if (error) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred while resetting password'
      )
      console.warn('Error resetting password:', error.message)
      return
    }
  }

  const changePassword = async ({
    currentPassword,
    newPassword,
  }: changePasswordProps) => {
    const { error } = await authClient.changePassword(
      {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('Contraseña cambiada con éxito', {
            description: 'Tu contraseña ha sido actualizada.',
          })
        },
      }
    )

    if (error) {
      setLoading(false)
      toast.error(
        error.message || 'Unknown error occurred while changing password'
      )
      console.warn('Error changing password:', error.message)
      return
    }
  }

  return {
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    sendVerificationEmail,
    requestPasswordReset,
    resetPassword,
    changePassword,
  }
}
