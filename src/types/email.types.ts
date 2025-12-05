import type { ReactElement, ReactNode } from 'react'

export interface SendEmailParams {
  to: string
  subject: string
  react: ReactElement
}

export interface EmailTemplateProps {
  title: string
  children: ReactNode
  buttonText?: string
  buttonUrl?: string
  footerText?: string
}

export interface EmailVerificationProps {
  url: string
}

export interface RequestPasswordResetProps extends EmailVerificationProps {
  userName: string
  token: string
}
