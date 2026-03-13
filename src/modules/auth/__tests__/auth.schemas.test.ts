import { describe, it, expect } from 'vitest'
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
} from '../schemas/auth.schemas'

describe('Login Schema', () => {
  it('should validate the login schema correctly', () => {
    const validData = {
      email: 'user@example.com',
      password: 'password123',
    }

    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    }

    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for short password', () => {
    const invalidData = {
      email: 'user@example.com',
      password: 'short',
    }

    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('Register Schema', () => {
  it('should validate the register schema correctly', () => {
    const validData = {
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const result = registerSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const result = registerSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for short name', () => {
    const invalidData = {
      name: 'John',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const result = registerSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for short password', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'user@example.com',
      password: 'short',
      confirmPassword: 'short',
    }

    const result = registerSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for non-matching passwords', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'differentPassword123',
    }

    const result = registerSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('Request Password Reset Schema', () => {
  it('should validate the request password reset schema correctly', () => {
    const validData = {
      email: 'user@example.com',
    }

    const result = requestPasswordResetSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
    }

    const result = requestPasswordResetSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for empty email', () => {
    const invalidData = {
      email: '',
    }

    const result = requestPasswordResetSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('Change Password Schema', () => {
  it('should validate the change password schema correctly', () => {
    const validData = {
      token: 'valid-token',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    }

    const result = changePasswordSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for empty token', () => {
    const invalidData = {
      token: '',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    }

    const result = changePasswordSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for short new password', () => {
    const invalidData = {
      token: 'valid-token',
      newPassword: 'short',
      confirmPassword: 'short',
    }

    const result = changePasswordSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should fail validation for non-matching passwords', () => {
    const invalidData = {
      token: 'valid-token',
      newPassword: 'newPassword123',
      confirmPassword: 'differentPassword123',
    }

    const result = changePasswordSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
