import { render } from '@react-email/components'
import { SendEmailParams } from '../types/email.types'
import { transporter } from '../config/mailer'

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Gmail credentials are not set in environment variables.')
    throw new Error('Email service is not configured.')
  }

  const emailHtml = await render(react)

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: emailHtml,
  })
}
