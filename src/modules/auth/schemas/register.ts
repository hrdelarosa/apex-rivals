import { z } from 'zod'

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: 'El nombre completo es demasiado corto' })
      .max(60, { message: 'El nombre es demasiado largo' }),
    email: z.email({ message: 'Correo electrónico inválido' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Por favor, confirme la contraseña. ' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export type RegisterTypes = z.infer<typeof RegisterSchema>
