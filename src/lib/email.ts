import { transporter } from '../config/mailer'
import { SendEmailParams } from '../types/email.types'
import { render } from '@react-email/components'

// Using Nodemailer to send emails
export async function sendEmail({ to, subject, react }: SendEmailParams) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ GMAIL_USER o GMAIL_PASS no están configuradas')
      throw new Error('Email service not configured')
    }

    if (!react)
      throw new Error('React element is required to generate email HTML')

    const html = await render(react)

    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    })

    return result
  } catch (error) {
    console.error('Error enviando email:', error)
    throw error
  }
}

// Using Resend to send emails
// import { SendEmailParams } from '../types/email.types'
// import { Resend } from 'resend'

// function getResendClient() {
//   const apiKey = process.env.RESEND_API_KEY
//   if (!apiKey) {
//     console.error('RESEND_API_KEY is not defined in environment variables')
//     throw new Error('RESEND_API_KEY is not defined in environment variables')
//   }
//   return new Resend(apiKey)
// }

// export async function sendEmail({ to, subject, react, html }: SendEmailParams) {
//   const resend = getResendClient()

//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Apex Rivals <onboarding@resend.dev>',
//       to,
//       subject,
//       react,
//       html,
//     })

//     if (error) {
//       console.error('Error sending email:', error)
//       throw new Error(`Error sending email: ${error.message}`)
//     }

//     return data
//   } catch (error) {
//     console.error('Error enviando email:', error)
//     throw error
//   }
// }
