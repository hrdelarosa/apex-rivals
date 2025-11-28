import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'

interface Props<T extends FieldValues> {
  formSchema: ZodType<T, T>
}

export function useAuth<T extends FieldValues>({ formSchema }: Props<T>) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<T> = (data) => {
    setLoading(true)
    console.log('submit', data)
    setLoading(false)
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
  }
}
