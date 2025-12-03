import { SendEmailParams } from '../types/email.types'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined in environment variables')
    throw new Error('RESEND_API_KEY is not defined in environment variables')
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Apex Rivals <onboarding@resend.dev>',
      to,
      subject,
      react: html,
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
