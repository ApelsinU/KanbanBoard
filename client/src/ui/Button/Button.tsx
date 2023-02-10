import React from 'react'
import './button.scss'

import { Loader } from '@App/ui/Loader/Loader'

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  text: string | Element
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  //  onClick?: void | (() => void) | ((e: any) => Promise<void>)
  isLoading?: boolean
  height?: number
  theme?: string
}

export const Button = ({
  type,
  text = '',
  onClick,
  isLoading,
  height,
  theme,
}: IButtonProps) => {
  return (
    <button
      className={`button theme-${theme}`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
      style={{ height: `${height}px` }}
    >
      {isLoading ? (
        <>
          {text}
          <Loader color="white" size={2} />
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  )
}
