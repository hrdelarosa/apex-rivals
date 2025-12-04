export type TypeAuth = 'login' | 'register'

export interface signInWithEmailProps {
  email: string
  password: string
}

export interface signUpWithEmailProps extends signInWithEmailProps {
  name: string
}

export interface sendEmailProps {
  email: string
}

export interface resetPasswordProps {
  newPassword: string
  token: string
}

export interface changePasswordProps {
  currentPassword: string
  newPassword: string
}
