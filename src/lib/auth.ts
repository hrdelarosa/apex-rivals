import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@src/config/db/index'
import { sendEmail } from './email'
import EmailVerification from '@/emails/EmailVerification'
import RequestPasswordReset from '@/emails/RequestPasswordReset'
import { createElement } from 'react'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        to: user.email,
        subject: 'Restablece tu contraseña',
        react: createElement(RequestPasswordReset, {
          userName: user.name,
          url,
          token,
        }),
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verifica tu dirección de correo electrónico',
        react: createElement(EmailVerification, { url }),
      })
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
})
