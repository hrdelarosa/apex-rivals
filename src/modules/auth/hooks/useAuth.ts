import { useState } from 'react'
import {
  ChangePasswordData,
  RequestPasswordResetData,
  ResetPasswordData,
  SignInData,
  SignUpData,
} from '../types/auth.types'
import {
  signUpAction,
  signInAction,
  signInWithGoogleAction,
  signOutAction,
  requestPasswordResetAction,
  resetPasswordAction,
  changePasswordAction,
} from '../actions/auth.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signUp = async ({ email, password, name }: SignUpData) => {
    setLoading(true)
    const result = await signUpAction({ email, password, name })
    setLoading(false)

    if (!result.success) {
      toast.error('Error al registrarse. Por favor, inténtalo de nuevo.')
    } else {
      toast.message('¡Bienvenido a la grilla!', {
        description:
          'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
      })

      router.push('/login')
    }
  }

  const signIn = async ({ email, password }: SignInData) => {
    setLoading(true)
    const result = await signInAction({ email, password })
    setLoading(false)

    if (!result.success) {
      if (result.status === 403) {
        toast.error(
          'Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada y verifica tu correo para poder iniciar sesión.',
        )
      } else if (result.message?.includes('Invalid email or password')) {
        toast.error(
          'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.',
        )
      } else {
        toast.error('Error al iniciar sesión. Por favor, inténtalo de nuevo.')
      }
    } else {
      toast.message('¡Bienvenido de nuevo a la pista!', {
        description: 'Tu equipo Apex Rivals te esperaba.',
      })
    }

    router.push('/dashboard')
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    const result = await signInWithGoogleAction()
    setLoading(false)

    if (!result.success) {
      toast.error(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
      )
    } else {
      toast.message('¡Bienvenido a Apex Rivals!', {
        description: 'Tu equipo Apex Rivals te esperaba.',
      })
    }
  }

  const signOut = async () => {
    setLoading(true)
    const result = await signOutAction()
    setLoading(false)

    if (!result.success) {
      toast.error('Error al cerrar sesión. Por favor, inténtalo de nuevo.')
    } else {
      router.push('/')
    }
  }

  const requestPasswordReset = async ({ email }: RequestPasswordResetData) => {
    setLoading(true)
    const result = await requestPasswordResetAction({ email })
    setLoading(false)

    if (!result.success) {
      if (result.message?.includes('No user found with the provided email')) {
        toast.error(
          'No se encontró una cuenta con ese correo electrónico. Por favor, verifica el correo ingresado e inténtalo de nuevo.',
        )
      } else if (
        result.message?.includes(
          'Unknown error occurred while requesting password reset',
        )
      ) {
        toast.error(
          'Error desconocido al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.',
        )
      } else {
        toast.error(
          `Error al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.`,
        )
      }
    } else {
      toast.message('Solicitud de restablecimiento de contraseña enviada', {
        description:
          'Si existe una cuenta con ese correo electrónico, recibirás un email con instrucciones para restablecer tu contraseña.',
      })
    }
  }

  const resetPassword = async ({ newPassword, token }: ResetPasswordData) => {
    setLoading(true)
    const result = await resetPasswordAction({ newPassword, token })
    setLoading(false)

    if (!result.success) {
      toast.error(
        'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.',
      )
    } else {
      toast.message('Contraseña restablecida', {
        description:
          'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
      })
      router.push('/login')
    }
  }

  const changePassword = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordData) => {
    setLoading(true)
    const result = await changePasswordAction({ currentPassword, newPassword })
    setLoading(false)

    if (!result.success) {
      toast.error(
        'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
      )
    } else {
      toast.message('Contraseña cambiada', {
        description:
          'Tu contraseña ha sido cambiada exitosamente. Se han revocado todas las demás sesiones para proteger tu cuenta.',
      })
    }
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
