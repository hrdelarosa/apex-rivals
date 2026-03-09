import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .email({ message: 'Correo electrónico no válido' })
    .min(1, { message: 'El correo electrónico es requerido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: 'El nombre debe tener al menos 5 caracteres' })
      .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),
    email: z
      .email({ message: 'Correo electrónico no válido' })
      .min(1, { message: 'El correo electrónico es requerido' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string().min(1, {
      message: 'Por favor, confirme la contraseña',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const requestPasswordResetSchema = z.object({
  email: z
    .email({ message: 'Correo electrónico no válido' })
    .min(1, { message: 'El correo electrónico es requerido' }),
})

export const changePasswordSchema = z
  .object({
    token: z
      .string()
      .min(1, { message: 'Token de restablecimiento es requerido' }),
    newPassword: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string().min(1, {
      message: 'Por favor, confirme la contraseña',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
  })

export type LoginFormTypes = z.infer<typeof loginSchema>
export type RegisterFormTypes = z.infer<typeof registerSchema>
export type RequestPasswordResetFormTypes = z.infer<
  typeof requestPasswordResetSchema
>
export type ChangePasswordFormTypes = z.infer<typeof changePasswordSchema>
