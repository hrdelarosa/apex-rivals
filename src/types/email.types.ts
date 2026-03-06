import { ReactElement } from 'react'

export interface SendEmailParams {
  to: string
  subject: string
  react: ReactElement | string
}

export interface SendEmailVerificationParams {
  url: string
  email: string
}
