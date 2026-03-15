import { zodResolver } from '@hookform/resolvers/zod'
import {
  FieldValues,
  SubmitHandler,
  useForm,
  DefaultValues,
} from 'react-hook-form'
import { ZodType } from 'zod'

interface Props<T extends FieldValues> {
  formSchema: ZodType<T, T>
  defaultValues?: DefaultValues<T>
  onSubmit: SubmitHandler<T>
}

export function useValidatedForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    reset,
  }
}
