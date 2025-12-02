import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

interface Props<T extends FieldValues> {
  formSchema: ZodType<T, T>
  onSubmit: SubmitHandler<T>
}

export function useFormWithValidation<T extends FieldValues>({
  formSchema,
  onSubmit: onSubmitCallback,
}: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmitCallback(data)
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    reset,
  }
}
