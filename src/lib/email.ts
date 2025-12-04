import { SendEmailParams } from '../types/email.types'
import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables')
    throw new Error('RESEND_API_KEY is not defined in environment variables')
  }
  return new Resend(apiKey)
}

export async function sendEmail({ to, subject, react, html }: SendEmailParams) {
  const resend = getResendClient()

  try {
    const { data, error } = await resend.emails.send({
      from: 'Apex Rivals <onboarding@resend.dev>',
      to,
      subject,
      react,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      throw new Error(`Error sending email: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error enviando email:', error)
    throw error
  }
}
