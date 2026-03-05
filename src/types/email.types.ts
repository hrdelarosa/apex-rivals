import { ReactElement } from 'react'

export interface SendEmailParams {
  to: string
  subject: string
  react: ReactElement | string
}
