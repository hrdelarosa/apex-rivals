import { useState } from 'react'

export function useDialog() {
  const [open, setOpen] = useState<boolean>(false)
  const onOpenChange = (isOpen: boolean) => setOpen(isOpen)
  const onClose = () => setOpen(false)

  return { open, onOpenChange, onClose }
}
