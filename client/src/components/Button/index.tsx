import './button.scss'
import { ChangeEvent, ReactNode } from 'react'

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  text: string
  onClick?: void | (() => void) | ((e: any) => Promise<void>)
  isLoading?: boolean
  height?: number
}

export const Button = ({
  type,
  text = '',
  onClick,
  isLoading,
  height,
}: IButtonProps) => {
  return (
    <button
      className="button"
      type={type}
      onClick={() => onClick}
      disabled={isLoading}
      style={{ height: `${height}px` }}
    >
      {isLoading ? <>Loading</> : <>{text}</>}
    </button>
  )
}
