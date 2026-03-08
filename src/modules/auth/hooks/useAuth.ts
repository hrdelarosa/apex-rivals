import { useState } from 'react'
import {
  ChangePasswordData,
  RequestPasswordResetData,
  ResetPasswordData,
  SignInData,
  SignUpData,
} from '../types/auth.types'
import { authClient } from '@/src/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signUp = async ({ email, password, name }: SignUpData) => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('¡Bienvenido a la grilla!', {
            description:
              'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
          })
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error('Error al registrarse. Por favor, inténtalo de nuevo.')
          console.error('Error registering with email:', ctx.error.message)
        },
      },
    )
  }

  const signIn = async ({ email, password }: SignInData) => {
    await authClient.signIn.email(
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
        },
        onError: (ctx) => {
          setLoading(false)

          if (ctx.error.status === 403) {
            toast.error(
              'Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada y verifica tu correo para poder iniciar sesión.',
            )
          } else if (ctx.error.message === 'Invalid email or password') {
            toast.error(
              'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.',
            )
          } else {
            toast.error(
              'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
            )
          }
          console.warn('Error signing in with email:', ctx.error.message)
        },
      },
    )
  }

  const signInWithGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)

          toast.message('¡Bienvenido a Apex Rivals!', {
            description: 'Tu equipo Apex Rivals te esperaba.',
          })
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(
            'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
          )
          console.error('Error signing in with Google:', ctx.error.message)
        },
      },
    )
  }

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
          router.push('/')
        },
        onError: (ctx) => {
          setLoading(false)
          console.error('Error signing out:', ctx.error.message)
        },
      },
    })
  }

  const requestPasswordReset = async ({ email }: RequestPasswordResetData) => {
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: '/reset-password',
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
          toast.message('Solicitud de restablecimiento de contraseña enviada', {
            description:
              'Si existe una cuenta con ese correo electrónico, recibirás un email con instrucciones para restablecer tu contraseña.',
          })
        },
        onError: (ctx) => {
          setLoading(false)
          if (ctx.error.message === 'No user found with the provided email') {
            toast.error(
              'No se encontró una cuenta con ese correo electrónico. Por favor, verifica el correo ingresado e inténtalo de nuevo.',
            )
          } else if (
            ctx.error.message ===
            'Unknown error occurred while requesting password reset'
          ) {
            toast.error(
              'Error desconocido al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.',
            )
          } else {
            toast.error(
              `Error al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.`,
            )
          }
          console.warn('Error requesting password reset:', ctx.error.message)
        },
      },
    )
  }

  const resetPassword = async ({ newPassword, token }: ResetPasswordData) => {
    await authClient.resetPassword(
      {
        newPassword,
        token,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
          toast.message('Contraseña restablecida', {
            description:
              'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
          })
          router.push('/login')
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(
            'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.',
          )
          console.error('Error resetting password:', ctx.error.message)
        },
      },
    )
  }

  const changePassword = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordData) => {
    await authClient.changePassword(
      {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
          toast.message('Contraseña cambiada', {
            description:
              'Tu contraseña ha sido cambiada exitosamente. Se han revocado todas las demás sesiones para proteger tu cuenta.',
          })
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(
            'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
          )
          console.error('Error changing password:', ctx.error.message)
        },
      },
    )
  }

  return {
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    requestPasswordReset,
    resetPassword,
    changePassword,
  }
}
