export type TypeAuth = 'login' | 'register'

export interface signInWithEmailProps {
  email: string
  password: string
}

export interface signUpWithEmailProps extends signInWithEmailProps {
  name: string
}

export interface sendVerificationEmailProps {
  email: string
}
