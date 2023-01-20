import './button.scss'
import {ChangeEvent, ReactNode} from "react";

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  text: string
  onClick?: () => void
  isLoading?: boolean
}

export const Button = ({
  type,
  text = '',
  onClick,
  isLoading,
}: IButtonProps) => {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <>Loading</> : <>{text}</>}
    </button>
  )
}