import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RequestPasswordResetDialog from '../components/RequestPasswordResetDilog'
import userEvent from '@testing-library/user-event'
import { useAuth } from '../hooks/useAuth'

const mockPush = vi.fn()
const mockRequestPasswordReset = vi.fn(async () => {
  mockPush('/reset-password')
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}))

describe('RequestPasswordResetDialog', () => {
  beforeEach(() => {
    mockPush.mockClear()
    mockRequestPasswordReset.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      requestPasswordReset: mockRequestPasswordReset,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
  })

  it('should render the dialog content when open', () => {
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    expect(screen.getByText('Restablecer contraseña')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Ingrese su correo electrónico asociado a su cuenta y le enviaremos un enlace para restablecer su contraseña.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument()
  })

  it('should close the dialog when clicking cancel', async () => {
    const user = userEvent.setup()
    const mockOnOpenChange = vi.fn()
    render(
      <RequestPasswordResetDialog
        open={true}
        onOpenChange={mockOnOpenChange}
      />,
    )

    expect(screen.getByText('Restablecer contraseña')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it('should close the dialog when pressing Escape', async () => {
    const user = userEvent.setup()
    const mockOnOpenChange = vi.fn()
    render(
      <RequestPasswordResetDialog
        open={true}
        onOpenChange={mockOnOpenChange}
      />,
    )
    expect(screen.getByText('Restablecer contraseña')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it('should show validation error when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(
      await screen.findByText('Correo electrónico no válido'),
    ).toBeInTheDocument()
  })

  it('should call requestPasswordReset with correct email when submitting the form', async () => {
    const user = userEvent.setup()
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'test@example.com',
    )
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => {
      expect(mockRequestPasswordReset).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })
  })

  it('should navigate to reset password page on successful request', async () => {
    const user = userEvent.setup()
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    await user.type(
      screen.getByLabelText('Correo electrónico'),
      'test@example.com',
    )
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/reset-password')
    })
  })

  it('should disable the submit button when loading is true', async () => {
    vi.mocked(useAuth).mockReturnValue({
      requestPasswordReset: vi.fn(),
      loading: true,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  })

  it('should not call requestPasswordReset when loading is false', async () => {
    vi.mocked(useAuth).mockReturnValue({
      requestPasswordReset: vi.fn(),
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signInWithGoogle: vi.fn(),
      signOut: vi.fn(),
      changePassword: vi.fn(),
      resetPassword: vi.fn(),
    })
    render(<RequestPasswordResetDialog open={true} onOpenChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Enviar' })).not.toBeDisabled()
  })
})
