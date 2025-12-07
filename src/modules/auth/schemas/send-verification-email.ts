import z from 'zod'

export const SendVerificationEmailSchema = z.object({
  email: z.email({ message: 'Correo electrónico inválido' }),
})

export type SendVerificationEmailTypes = z.infer<
  typeof SendVerificationEmailSchema
>
