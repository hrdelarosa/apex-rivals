import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuth } from '../hooks/useAuth'
import { act, renderHook } from '@testing-library/react'
import { toast } from 'sonner'
import * as authServices from '../services/auth.services'

vi.mock('sonner')
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signUp', () => {
    it('should call signUpService with correct data and show success toast on successful sign up', async () => {
      vi.spyOn(authServices, 'signUpService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signUp({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
        })
      })

      expect(toast.message).toHaveBeenCalledWith('¡Bienvenido a la grilla!', {
        description:
          'Sistema de telemetría activado. Se ha enviado un correo de verificación a tu bandeja de entrada. Por favor, revisa tu correo para completar la activación.',
      })
      expect(mockPush).toHaveBeenCalledWith('/login')
    })

    it('should show error toast on failed sign up', async () => {
      vi.spyOn(authServices, 'signUpService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signUp({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al registrarse. Por favor, inténtalo de nuevo.',
      )
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('signIn', () => {
    it('should call signInService with correct data and show success toast on successful sign in', async () => {
      vi.spyOn(authServices, 'signInSevice').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signIn({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(toast.message).toHaveBeenCalledWith(
        '¡Bienvenido de nuevo a la pista!',
        {
          description: 'Tu equipo Apex Rivals te esperaba.',
        },
      )
      expect(mockPush).not.toHaveBeenCalledWith()
    })

    it('should show error toast on failed sign in due to unverified email', async () => {
      vi.spyOn(authServices, 'signInSevice').mockResolvedValue({
        success: false,
        status: 403,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signIn({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Tu correo electrónico no ha sido verificado. Por favor, revisa tu bandeja de entrada y verifica tu correo para poder iniciar sesión.',
      )
      expect(mockPush).not.toHaveBeenCalledWith()
    })

    it('should show error toast on failed sign in due to invalid credentials', async () => {
      vi.spyOn(authServices, 'signInSevice').mockResolvedValue({
        success: false,
        message: 'Invalid email or password',
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signIn({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.',
      )
      expect(mockPush).not.toHaveBeenCalledWith()
    })

    it('should show generic error toast on failed sign in', async () => {
      vi.spyOn(authServices, 'signInSevice').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signIn({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
      )
      expect(mockPush).not.toHaveBeenCalledWith()
    })
  })

  describe('signInWithGoogle', async () => {
    it('should call signInWithGoogleService and show success toast on successful sign in with Google', async () => {
      vi.spyOn(authServices, 'signInWithGoogleService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signInWithGoogle()
      })

      expect(toast.message).toHaveBeenCalledWith('¡Bienvenido a Apex Rivals!', {
        description: 'Tu equipo Apex Rivals te esperaba.',
      })
      expect(mockPush).not.toHaveBeenCalledWith()
    })

    it('should show error toast on failed sign in with Google', async () => {
      vi.spyOn(authServices, 'signInWithGoogleService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signInWithGoogle()
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.',
      )
      expect(mockPush).not.toHaveBeenCalledWith()
    })
  })

  describe('signOut', () => {
    it('should call signOutService and redirect to home on successful sign out', async () => {
      vi.spyOn(authServices, 'signOutService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signOut()
      })

      expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('should show error toast on failed sign out', async () => {
      vi.spyOn(authServices, 'signOutService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signOut()
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al cerrar sesión. Por favor, inténtalo de nuevo.',
      )
      expect(mockPush).not.toHaveBeenCalledWith('/')
    })
  })

  describe('requestPasswordReset', () => {
    it('should call requestPasswordResetService and show success toast on successful password reset request', async () => {
      vi.spyOn(authServices, 'requestPasswordResetService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.requestPasswordReset({ email: 'test@example.com' })
      })

      expect(toast.message).toHaveBeenCalledWith(
        'Solicitud de restablecimiento de contraseña enviada',
        {
          description:
            'Si existe una cuenta con ese correo electrónico, recibirás un email con instrucciones para restablecer tu contraseña.',
        },
      )
    })

    it('should show specific error toast on failed password reset request due to non-existent email', async () => {
      vi.spyOn(authServices, 'requestPasswordResetService').mockResolvedValue({
        success: false,
        message: 'No user found with the provided email',
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.requestPasswordReset({ email: 'test@example.com' })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'No se encontró una cuenta con ese correo electrónico. Por favor, verifica el correo ingresado e inténtalo de nuevo.',
      )
    })

    it('should show specific error toast on failed password reset request due to unknown error', async () => {
      vi.spyOn(authServices, 'requestPasswordResetService').mockResolvedValue({
        success: false,
        message: 'Unknown error occurred while requesting password reset',
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.requestPasswordReset({ email: 'test@example.com' })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error desconocido al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.',
      )
    })

    it('should show generic error toast on failed password reset request', async () => {
      vi.spyOn(authServices, 'requestPasswordResetService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.requestPasswordReset({ email: 'test@example.com' })
      })

      expect(toast.error).toHaveBeenCalledWith(
        `Error al solicitar restablecimiento de contraseña. Por favor, inténtalo de nuevo.`,
      )
    })
  })

  describe('resetPassword', () => {
    it('should call resetPasswordService and show success toast on successful password reset', async () => {
      vi.spyOn(authServices, 'resetPasswordService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.resetPassword({
          token: 'test-token',
          newPassword: 'newPassword123',
        })
      })

      expect(toast.message).toHaveBeenCalledWith('Contraseña restablecida', {
        description:
          'Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
      })
      expect(mockPush).toHaveBeenCalledWith('/login')
    })

    it('should show error toast on failed password reset', async () => {
      vi.spyOn(authServices, 'resetPasswordService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.resetPassword({
          token: 'test-token',
          newPassword: 'newPassword123',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.',
      )
    })
  })

  describe('changePassword', () => {
    it('should call changePasswordService and show success toast on successful password change', async () => {
      vi.spyOn(authServices, 'changePasswordService').mockResolvedValue({
        success: true,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.changePassword({
          currentPassword: 'currentPassword123',
          newPassword: 'newPassword123',
        })
      })

      expect(toast.message).toHaveBeenCalledWith('Contraseña cambiada', {
        description:
          'Tu contraseña ha sido cambiada exitosamente. Se han revocado todas las demás sesiones para proteger tu cuenta.',
      })
    })

    it('should show error toast on failed password change', async () => {
      vi.spyOn(authServices, 'changePasswordService').mockResolvedValue({
        success: false,
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.changePassword({
          currentPassword: 'currentPassword123',
          newPassword: 'newPassword123',
        })
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Error al cambiar la contraseña. Por favor, inténtalo de nuevo.',
      )
    })
  })

  describe('loading state', () => {
    it('should set loading to true while signUp is in progress and false after it finishes', async () => {
      let signUpPromise!: (value: { success: boolean }) => void

      vi.spyOn(authServices, 'signUpService').mockReturnValue(
        new Promise((resolve) => {
          signUpPromise = resolve
        }),
      )

      const { result } = renderHook(() => useAuth())

      expect(result.current.loading).toBe(false)

      act(() => {
        result.current.signUp({
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User',
        })
      })

      expect(result.current.loading).toBe(true)

      await act(async () => {
        signUpPromise({ success: true })
      })

      expect(result.current.loading).toBe(false)
    })
  })
})
