import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../config/db'
import { sendEmail } from './email'

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
        react: `¡Hola ${user.email}! Gracias por registrarte en Apex Rivals. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el siguiente enlace: ${url}`,
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
