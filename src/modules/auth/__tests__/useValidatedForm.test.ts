import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useValidatedForm } from '../hooks/useValidatedForm'
import { loginSchema } from '../schemas/auth.schemas'

describe('useValidatedForm', () => {
  it('should return the expected form utilities', () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    expect(result.current).toHaveProperty('register')
    expect(result.current).toHaveProperty('handleSubmit')
    expect(result.current).toHaveProperty('errors')
    expect(result.current).toHaveProperty('reset')
  })

  it('should call onSubmit with valid data when the form is submitted', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.BaseSyntheticEvent

    await act(async () => {
      result.current.register('email').onChange({
        target: { name: 'email', value: 'test@example.com' },
      })
      result.current.register('password').onChange({
        target: { name: 'password', value: 'password123' },
      })
    })

    await act(async () => {
      await (
        result.current.handleSubmit as (
          e: React.BaseSyntheticEvent,
        ) => Promise<void>
      )(fakeEvent)
    })

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should NOT call onSubmit when submitted with invalid data', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.BaseSyntheticEvent

    await act(async () => {
      await (
        result.current.handleSubmit as (
          e: React.BaseSyntheticEvent,
        ) => Promise<void>
      )(fakeEvent)
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should set validation errors when submitted with invalid data', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.BaseSyntheticEvent

    await act(async () => {
      await (
        result.current.handleSubmit as (
          e: React.BaseSyntheticEvent,
        ) => Promise<void>
      )(fakeEvent)
    })

    expect(result.current.errors.email).toBeDefined()
    expect(result.current.errors.password).toBeDefined()
  })

  it('should clear errors and values after calling reset', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.BaseSyntheticEvent

    await act(async () => {
      await (
        result.current.handleSubmit as (
          e: React.BaseSyntheticEvent,
        ) => Promise<void>
      )(fakeEvent)
    })

    expect(result.current.errors.email).toBeDefined()

    await act(async () => {
      result.current.reset()
    })

    expect(result.current.errors.email).toBeUndefined()
    expect(result.current.errors.password).toBeUndefined()
  })

  it('should not throw when onSubmit rejects', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const onSubmit = vi.fn().mockRejectedValue(new Error('Server error'))

    const { result } = renderHook(() =>
      useValidatedForm({
        formSchema: loginSchema,
        onSubmit,
      }),
    )

    await act(async () => {
      result.current.register('email').onChange({
        target: { name: 'email', value: 'test@example.com' },
      })
      result.current.register('password').onChange({
        target: { name: 'password', value: 'password123' },
      })
    })

    const fakeEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as React.BaseSyntheticEvent

    await act(async () => {
      await (
        result.current.handleSubmit as (
          e: React.BaseSyntheticEvent,
        ) => Promise<void>
      )(fakeEvent)
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Form submission error:',
      expect.any(Error),
    )

    consoleErrorSpy.mockRestore()
  })
})
