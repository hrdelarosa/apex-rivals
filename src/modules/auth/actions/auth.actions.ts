'use server'

import {
  ChangePasswordData,
  RequestPasswordResetData,
  ResetPasswordData,
  SignInData,
  SignUpData,
} from '../types/auth.types'
import { auth } from '@/src/lib/auth'

interface ActionResponse<T = null> {
  success: boolean
  message?: string
  status?: number
  data?: T
}

export async function signUpAction({
  email,
  password,
  name,
}: SignUpData): Promise<ActionResponse> {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    return {
      success: true,
      message:
        'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al registrarse.',
    }
  }
}

export async function signInAction({
  email,
  password,
}: SignInData): Promise<ActionResponse> {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: '/dashboard',
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al iniciar sesión.',
      status:
        error instanceof Error && 'status' in error
          ? (error as Error & { status: number }).status
          : undefined,
    }
  }
}

export async function signInWithGoogleAction(): Promise<ActionResponse> {
  try {
    await auth.api.signInSocial({
      body: {
        provider: 'google',
        callbackURL: '/dashboard',
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al continuar con Google.',
    }
  }
}

export async function signOutAction(): Promise<ActionResponse> {
  try {
    await auth.api.signOut()

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al cerrar sesión.',
    }
  }
}

export async function requestPasswordResetAction({
  email,
}: RequestPasswordResetData): Promise<ActionResponse> {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: '/reset-password',
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al solicitar el restablecimiento de la contraseña.',
    }
  }
}

export async function resetPasswordAction({
  newPassword,
  token,
}: ResetPasswordData): Promise<ActionResponse> {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al restablecer la contraseña.',
    }
  }
}

export async function changePasswordAction({
  newPassword,
  currentPassword,
}: ChangePasswordData): Promise<ActionResponse> {
  try {
    await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Se ha producido un error al cambiar la contraseña.',
    }
  }
}
