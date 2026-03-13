import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/src/lib/auth-client'
import * as authServices from '../services/auth.services'
import { ErrorContext, SuccessContext } from 'better-auth/react'

vi.mock('@/src/lib/auth-client', () => ({
  authClient: {
    signUp: {
      email: vi.fn(),
    },
    signIn: {
      email: vi.fn(),
      social: vi.fn(),
    },
    signOut: vi.fn(),
    requestPasswordReset: vi.fn(),
    resetPassword: vi.fn(),
    changePassword: vi.fn(),
  },
}))

describe('SignUp Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sign up a new user', async () => {
    vi.mocked(authClient.signUp.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.signUpService({
      email: 'test@test.com',
      password: '123456',
      name: 'Test User',
    })

    expect(result.success).toBe(true)
    expect(authClient.signUp.email).toHaveBeenCalledWith(
      { email: 'test@test.com', password: '123456', name: 'Test User' },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle sign up errors', async () => {
    vi.mocked(authClient.signUp.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Sign up failed' },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signUpService({
      email: 'test@test.com',
      password: '123456',
      name: 'Test User',
    })
    expect(result.success).toBe(false)
    expect(result.message).toBe('Sign up failed')
  })

  it('should use fallback message when sign up error has no message', async () => {
    vi.mocked(authClient.signUp.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '' },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signUpService({
      email: 'test@test.com',
      password: '123456',
      name: 'Test User',
    })

    expect(result.success).toBe(false)
    expect(result.message).toBe('An error occurred while signing up.')
  })
})

describe('SignIn Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sign in a user', async () => {
    vi.mocked(authClient.signIn.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.signInSevice({
      email: 'test@test.com',
      password: '123456',
    })

    expect(result).toEqual({ success: true })
    expect(authClient.signIn.email).toHaveBeenCalledWith(
      {
        email: 'test@test.com',
        password: '123456',
        callbackURL: '/dashboard',
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle sign in errors and propagate status', async () => {
    vi.mocked(authClient.signIn.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Invalid credentials', status: 401 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signInSevice({
      email: 'test@test.com',
      password: '123456',
    })

    expect(result).toEqual({
      success: false,
      message: 'Invalid credentials',
      status: 401,
    })
  })

  it('should use fallback message when sign in error has no message', async () => {
    vi.mocked(authClient.signIn.email).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '', status: 400 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signInSevice({
      email: 'test@test.com',
      password: '123456',
    })

    expect(result).toEqual({
      success: false,
      message: 'An error occurred while signing in.',
      status: 400,
    })
  })
})

describe('SignIn With Google Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sign in with Google', async () => {
    vi.mocked(authClient.signIn.social).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.signInWithGoogleService()

    expect(result).toEqual({ success: true })
    expect(authClient.signIn.social).toHaveBeenCalledWith(
      {
        provider: 'google',
        callbackURL: '/dashboard',
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle Google sign in errors', async () => {
    vi.mocked(authClient.signIn.social).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Google sign in failed' },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signInWithGoogleService()
    expect(result).toEqual({
      success: false,
      message: 'Google sign in failed',
    })
  })

  it('should use fallback message for Google sign in error without message', async () => {
    vi.mocked(authClient.signIn.social).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '' },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.signInWithGoogleService()
    expect(result).toEqual({
      success: false,
      message: 'An error occurred while signing in with Google.',
    })
  })
})

describe('SignOut Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should sign out the user', async () => {
    vi.mocked(authClient.signOut).mockImplementation(async (args?) => {
      await args?.fetchOptions?.onSuccess?.({ data: {} } as SuccessContext)
    })

    const result = await authServices.signOutService()

    expect(result).toEqual({ success: true })
    expect(authClient.signOut).toHaveBeenCalledWith({
      fetchOptions: expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    })
  })

  it('should handle sign out errors and propagate status', async () => {
    vi.mocked(authClient.signOut).mockImplementation(async (args?) => {
      await args?.fetchOptions?.onError?.({
        error: { message: 'Sign out failed', status: 500 },
      } as ErrorContext)
    })

    const result = await authServices.signOutService()

    expect(result).toEqual({
      success: false,
      message: 'Sign out failed',
      status: 500,
    })
  })

  it('should use fallback message when sign out error has no message', async () => {
    vi.mocked(authClient.signOut).mockImplementation(async (args?) => {
      await args?.fetchOptions?.onError?.({
        error: { message: '', status: 400 },
      } as ErrorContext)
    })

    const result = await authServices.signOutService()

    expect(result).toEqual({
      success: false,
      message: 'An error occurred while signing out.',
      status: 400,
    })
  })
})

describe('Request Password Reset Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should request password reset', async () => {
    vi.mocked(authClient.requestPasswordReset).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.requestPasswordResetService({
      email: 'test@test.com',
    })

    expect(result).toEqual({ success: true })
    expect(authClient.requestPasswordReset).toHaveBeenCalledWith(
      {
        email: 'test@test.com',
        redirectTo: '/reset-password',
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle request password reset errors and propagate status', async () => {
    vi.mocked(authClient.requestPasswordReset).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Reset request failed', status: 429 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.requestPasswordResetService({
      email: 'test@test.com',
    })

    expect(result).toEqual({
      success: false,
      message: 'Reset request failed',
      status: 429,
    })
  })

  it('should use fallback message when reset request error has no message', async () => {
    vi.mocked(authClient.requestPasswordReset).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '', status: 400 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.requestPasswordResetService({
      email: 'test@test.com',
    })

    expect(result).toEqual({
      success: false,
      message: 'An error occurred while requesting password reset.',
      status: 400,
    })
  })
})

describe('Reset Password Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reset password', async () => {
    vi.mocked(authClient.resetPassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.resetPasswordService({
      newPassword: 'new-password-123',
      token: 'reset-token',
    })

    expect(result).toEqual({ success: true })
    expect(authClient.resetPassword).toHaveBeenCalledWith(
      {
        newPassword: 'new-password-123',
        token: 'reset-token',
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle reset password errors and propagate status', async () => {
    vi.mocked(authClient.resetPassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Reset failed', status: 400 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.resetPasswordService({
      newPassword: 'new-password-123',
      token: 'reset-token',
    })

    expect(result).toEqual({
      success: false,
      message: 'Reset failed',
      status: 400,
    })
  })

  it('should use fallback message when reset password error has no message', async () => {
    vi.mocked(authClient.resetPassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '', status: 401 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.resetPasswordService({
      newPassword: 'new-password-123',
      token: 'reset-token',
    })

    expect(result).toEqual({
      success: false,
      message: 'An error occurred while resetting the password.',
      status: 401,
    })
  })
})

describe('Change Password Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should change password and revoke other sessions', async () => {
    vi.mocked(authClient.changePassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onSuccess?.({ data: {} } as Parameters<
          typeof callbacks.onSuccess
        >[0])
      },
    )

    const result = await authServices.changePasswordService({
      newPassword: 'new-password-123',
      currentPassword: 'current-password-123',
    })

    expect(result).toEqual({ success: true })
    expect(authClient.changePassword).toHaveBeenCalledWith(
      {
        newPassword: 'new-password-123',
        currentPassword: 'current-password-123',
        revokeOtherSessions: true,
      },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('should handle change password errors and propagate status', async () => {
    vi.mocked(authClient.changePassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: 'Change password failed', status: 403 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.changePasswordService({
      newPassword: 'new-password-123',
      currentPassword: 'current-password-123',
    })

    expect(result).toEqual({
      success: false,
      message: 'Change password failed',
      status: 403,
    })
  })

  it('should use fallback message when change password error has no message', async () => {
    vi.mocked(authClient.changePassword).mockImplementation(
      async (_data, callbacks) => {
        await callbacks?.onError?.({
          error: { message: '', status: 500 },
        } as Parameters<typeof callbacks.onError>[0])
      },
    )

    const result = await authServices.changePasswordService({
      newPassword: 'new-password-123',
      currentPassword: 'current-password-123',
    })

    expect(result).toEqual({
      success: false,
      message: 'An error occurred while changing the password.',
      status: 500,
    })
  })
})
