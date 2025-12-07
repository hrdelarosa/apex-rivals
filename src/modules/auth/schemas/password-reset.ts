import z from 'zod'

export const RequestPasswordResetSchema = z.object({
  email: z.email({ message: 'Correo electrónico inválido' }),
})

export type RequestPasswordResetTypes = z.infer<
  typeof RequestPasswordResetSchema
>
