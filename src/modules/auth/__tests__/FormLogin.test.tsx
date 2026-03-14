import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import FormLogin from '../components/FormLogin'
import userEvent from '@testing-library/user-event'
import { useAuth } from '../hooks/useAuth'

const mockPush = vi.fn()
const mockSignIn = vi.fn(async () => {
  mockPush('/dashboard')
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

describe('FormLogin', () => {
  beforeEach(() => {
    mockSignIn.mockClear()
    mockPush.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      signIn: mockSignIn,
      loading: false,
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
  })

  it('should render the form fields', () => {
    render(<FormLogin />)

    expect(
      screen.getByRole('button', { name: 'Continuar con Google' }),
    ).toBeInTheDocument()
    expect(screen.getByText('O continua con')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: '¿Olvidaste tu contraseña?' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Iniciar sesión' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeEnabled()
    expect(screen.getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => {
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    expect(screen.getByText('Correo electrónico no válido')).toBeInTheDocument()
    expect(
      screen.getByText('La contraseña debe tener al menos 8 caracteres'),
    ).toBeInTheDocument()
  })

  it('should open the password reset dialog when clicking "¿Olvidaste tu contraseña?"', async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.click(screen.getByText('¿Olvidaste tu contraseña?'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should call signIn with correct data when submitting the form', async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'test@example.com',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('should navigate to dashboard on successful sign in', async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'test@example.com',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should show validation errors for invalid email and short password', async () => {
    const user = userEvent.setup()
    render(<FormLogin />)

    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'invalid-email',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'short')
    await user.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(
      await screen.findByText('Correo electrónico no válido'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('La contraseña debe tener al menos 8 caracteres'),
    ).toBeInTheDocument()
  })

  it('Should disable submit button when loading is true', async () => {
    vi.mocked(useAuth).mockReturnValue({
      signIn: vi.fn(),
      loading: true,
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })

    render(<FormLogin />)

    expect(
      screen.getByRole('button', { name: 'Iniciar sesión' }),
    ).toBeDisabled()
  })

  it('should enable submit button when loading is false', async () => {
    vi.mocked(useAuth).mockReturnValue({
      signIn: vi.fn(),
      loading: false,
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })

    render(<FormLogin />)

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeEnabled()
  })
})
