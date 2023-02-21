import './input.scss'
import { useEffect, useState } from 'react'

interface IInput {
  name: string
  type: string
  placeholder?: string
  onChange?: any
  required?: boolean
  value?: string | number | readonly string[] | undefined
}

export const Input = ({ name, type, placeholder, onChange, value, required = false }: IInput) => {
  const [inputValue, setInputValue] = useState<IInput['value']>()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <input
      name={name}
      className="input"
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={(e) => onChange(e)}
      value={inputValue}
    />
  )
}
