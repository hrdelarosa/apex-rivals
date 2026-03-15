import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FormResetPassword from '../components/FormResetPassword'
import userEvent from '@testing-library/user-event'
import { useAuth } from '../hooks/useAuth'

const mockPush = vi.fn()
const mockResetPassword = vi.fn(async () => {
  mockPush('/login')
})
let mockSearchParamsReturn = { get: () => 'kUpifXIa4SHVL9RbrRfX0Sza' }

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParamsReturn,
}))
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    resetPassword: mockResetPassword,
    loading: false,
  })),
}))

describe('FormResetPassword', () => {
  it('should prefill the token field from search params and disable it', () => {
    render(<FormResetPassword />)
    const tokenInput = screen.getByLabelText('Código') as HTMLInputElement

    expect(tokenInput).toBeInTheDocument()
    expect(tokenInput.value).toBe('kUpifXIa4SHVL9RbrRfX0Sza')
    expect(tokenInput).toBeDisabled()
  })

  it('should render the form fields', () => {
    render(<FormResetPassword />)

    expect(screen.getByLabelText('Código')).toBeInTheDocument()
    expect(screen.getByLabelText('Nueva contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    ).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<FormResetPassword />)

    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(
      await screen.findByText('La contraseña debe tener al menos 8 caracteres'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Por favor, confirme la contraseña'),
    ).toBeInTheDocument()
  })

  it('should show error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<FormResetPassword />)

    await user.type(screen.getByLabelText('Nueva contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'differentPassword',
    )
    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(
      await screen.findByText('Las contraseñas no coinciden'),
    ).toBeInTheDocument()
  })

  it('should call resetPassword with correct data on valid form submission', async () => {
    const user = userEvent.setup()
    render(<FormResetPassword />)

    await user.type(screen.getByLabelText('Nueva contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'password123',
    )
    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(mockResetPassword).toHaveBeenCalledWith({
      newPassword: 'password123',
      token: 'kUpifXIa4SHVL9RbrRfX0Sza',
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should navigate to login page on successful password reset', async () => {
    const user = userEvent.setup()
    render(<FormResetPassword />)

    await user.type(screen.getByLabelText('Nueva contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'password123',
    )
    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should show validation error for token empty', async () => {
    const user = userEvent.setup()

    mockSearchParamsReturn = { get: () => '' }

    render(<FormResetPassword />)

    await user.type(screen.getByLabelText('Nueva contraseña'), 'password123')
    await user.type(
      screen.getByLabelText('Confirmar contraseña'),
      'password123',
    )
    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(
      await screen.findByText('Token de restablecimiento es requerido'),
    ).toBeInTheDocument()
  })

  it('should show validation errors for token and short password', async () => {
    const user = userEvent.setup()
    render(<FormResetPassword />)

    mockSearchParamsReturn = { get: () => '' }

    await user.type(screen.getByLabelText('Nueva contraseña'), 'short')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'short')
    await user.click(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    )

    expect(
      await screen.findByText('Token de restablecimiento es requerido'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('La contraseña debe tener al menos 8 caracteres'),
    ).toBeInTheDocument()
  })

  it('should disable submit button when loading is true', async () => {
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: true,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
    })
    render(<FormResetPassword />)

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.getAttribute('type') === 'submit')
    expect(submitButton).toBeDisabled()
  })

  it('should enable submit button when loading is false', async () => {
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      requestPasswordReset: vi.fn(),
      changePassword: vi.fn(),
    })
    render(<FormResetPassword />)

    expect(
      screen.getByRole('button', { name: 'Restablecer contraseña' }),
    ).toBeEnabled()
  })
})
