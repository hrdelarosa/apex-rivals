export interface SendEmailParams {
  to: string
  subject: string
  html: React.ReactElement | string
}

export interface EmailTemplateProps {
  title: string
  children: React.ReactNode
  buttonText?: string
  buttonUrl?: string
  footerText?: string
}

export interface EmailVerificationProps {
  url: string
}
