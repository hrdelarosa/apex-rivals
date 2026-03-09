import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../config/db'
import { sendEmail } from './email'
import { createElement } from 'react'
import EmailVerification from '@/src/components/emails/EmailVerification'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }) => {
      void sendEmail({
        to: user.email,
        subject: 'Intento de registro con tu correo electrónico en Apex Rivals',
        react: `¡Hola ${user.email}! Hemos detectado un intento de registro con tu correo electrónico en Apex Rivals. Si fuiste tú, por favor ignora este mensaje. Si no reconoces este intento, te recomendamos cambiar tu contraseña para proteger tu cuenta.`,
      })
    },
    sendResetPassword: async ({ user, url, token }) => {
      void sendEmail({
        to: user.email,
        subject: 'Restablece tu contraseña para Apex Rivals',
        react: `¡Hola ${user.email}! Hemos recibido una solicitud para restablecer tu contraseña en Apex Rivals. Si fuiste tú, por favor haz clic en el siguiente enlace para restablecer tu contraseña: ${url} o visita ${url} e ingresa tu token de restablecimiento: ${token}. Si no solicitaste este cambio, por favor ignora este mensaje y considera cambiar tu contraseña para proteger tu cuenta.`,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: 'Verifica tu correo electrónico para Apex Rivals',
        react: createElement(EmailVerification, { url, email: user.email }),
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
