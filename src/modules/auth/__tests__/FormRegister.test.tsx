import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useAuth } from '../hooks/useAuth'
import FormRegister from '../components/FormRegister'

const mockPush = vi.fn()
const mockSignUp = vi.fn(async () => {
  mockPush('/login')
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

describe('FormRegister', () => {
  beforeEach(() => {
    mockSignUp.mockClear()
    mockPush.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      signUp: mockSignUp,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signInWithGoogle: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
  })

  it('should render the form fields', () => {
    render(<FormRegister />)

    const nameInput = screen.getByLabelText('Nombre completo')
    const createAccountButton = screen.getByRole('button', {
      name: 'Crear cuenta',
    })

    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveFocus()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument()
    expect(createAccountButton).toBeInTheDocument()
    expect(createAccountButton).toBeEnabled()
    expect(screen.getByText('O continua con')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Continuar con Google' }),
    ).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<FormRegister />)

    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    await waitFor(() => {
      expect(mockSignUp).not.toHaveBeenCalled()
    })

    expect(
      await screen.findByText('El nombre debe tener al menos 5 caracteres'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Correo electrónico no válido'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('La contraseña debe tener al menos 8 caracteres'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Por favor, confirme la contraseña'),
    ).toBeInTheDocument()
  })

  it('should show error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<FormRegister />)

    await user.type(screen.getByLabelText('Nombre completo'), 'John Doe')
    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'john.doe@example.com',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'differentpassword',
    )
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(
      await screen.findByText('Las contraseñas no coinciden'),
    ).toBeInTheDocument()
  })

  it('should call signUp with correct data on valid form submission', async () => {
    const user = userEvent.setup()
    render(<FormRegister />)

    await user.type(screen.getByLabelText('Nombre completo'), 'John Doe')
    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'john.doe@example.com',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'password123',
    )
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      })
    })
  })

  it('should navigate to home page on successful registration', async () => {
    const user = userEvent.setup()
    render(<FormRegister />)

    await user.type(screen.getByLabelText('Nombre completo'), 'John Doe')
    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'john.doe@example.com',
    )
    await user.type(screen.getByLabelText('Contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'password123',
    )
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should disable submit button when loading is true', async () => {
    vi.mocked(useAuth).mockReturnValue({
      signUp: vi.fn(),
      loading: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signInWithGoogle: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
    render(<FormRegister />)

    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeDisabled()
  })

  it('should enable submit button when loading is false', async () => {
    vi.mocked(useAuth).mockReturnValueOnce({
      signUp: vi.fn(),
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signInWithGoogle: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
    render(<FormRegister />)

    expect(
      screen.getByRole('button', { name: 'Crear cuenta' }),
    ).not.toBeDisabled()
  })
})
