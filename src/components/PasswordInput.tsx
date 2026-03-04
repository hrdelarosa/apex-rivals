'use client'

import { EyeOffIcon, EyeIcon } from 'lucide-react'

import { useState } from 'react'
import { Field, FieldLabel } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface Props extends React.ComponentProps<typeof Input> {
  label?: string
  htmlFor?: string
  children?: React.ReactNode
}

export default function PasswordInput({ label, children, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field>
      {label && <FieldLabel htmlFor={props.htmlFor}>{label}</FieldLabel>}
      {children}

      <InputGroup>
        <InputGroupInput
          {...props}
          id={props.htmlFor}
          type={showPassword ? 'text' : 'password'}
        />
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon-xs"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
