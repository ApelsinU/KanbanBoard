import React from 'react'
import './button.scss'

import { Loader } from '@App/ui/Loader/Loader'

export interface IButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  //  onClick?: void | (() => void) | ((e: any) => Promise<void>)
  isLoading?: boolean
  height?: number
  theme?: ''
  disable?: boolean
  url?: string
}

export const Button = ({
  type,
  text = '',
  onClick,
  isLoading,
  height,
  theme,
  disable = false,
  url,
}: IButtonProps) => {
  if (url) {
    return (
      <a className={`button theme-${theme}`} style={{ height: `${height}px` }} href={url}>
        {text}
      </a>
    )
  }

  return (
    <button
      className={`button theme-${theme}`}
      type={type}
      onClick={onClick}
      disabled={isLoading ? isLoading : disable}
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
