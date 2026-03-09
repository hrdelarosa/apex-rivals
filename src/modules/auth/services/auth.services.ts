import {
  ChangePasswordData,
  RequestPasswordResetData,
  ResetPasswordData,
  SignInData,
  SignUpData,
} from '../types/auth.types'
import { authClient } from '@/src/lib/auth-client'

interface ServicesResponse {
  success: boolean
  message?: string
  status?: number
}

export async function signUpService({
  email,
  password,
  name,
}: SignUpData): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () =>
          resolve({
            success: true,
            message:
              'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
          }),
        onError: (ctx) =>
          resolve({
            success: false,
            message: ctx.error.message || 'An error occurred while signing up.',
          }),
      },
    )
  })
}

export async function signInSevice({
  email,
  password,
}: SignInData): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message: ctx.error.message || 'An error occurred while signing in.',
            status: ctx.error.status,
          }),
      },
    )
  })
}

export async function signInWithGoogleService(): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/dashboard',
      },
      {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message:
              ctx.error.message ||
              'An error occurred while signing in with Google.',
          }),
      },
    )
  })
}

export async function signOutService(): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message:
              ctx.error.message || 'An error occurred while signing out.',
            status: ctx.error.status,
          }),
      },
    })
  })
}

export async function requestPasswordResetService({
  email,
}: RequestPasswordResetData): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.requestPasswordReset(
      {
        email,
        redirectTo: '/reset-password',
      },
      {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message:
              ctx.error.message ||
              'An error occurred while requesting password reset.',
            status: ctx.error.status,
          }),
      },
    )
  })
}

export async function resetPasswordService({
  newPassword,
  token,
}: ResetPasswordData): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.resetPassword(
      {
        newPassword,
        token,
      },
      {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message:
              ctx.error.message ||
              'An error occurred while resetting the password.',
            status: ctx.error.status,
          }),
      },
    )
  })
}

export async function changePasswordService({
  newPassword,
  currentPassword,
}: ChangePasswordData): Promise<ServicesResponse> {
  return new Promise((resolve) => {
    authClient.changePassword(
      {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => resolve({ success: true }),
        onError: (ctx) =>
          resolve({
            success: false,
            message:
              ctx.error.message ||
              'An error occurred while changing the password.',
            status: ctx.error.status,
          }),
      },
    )
  })
}
