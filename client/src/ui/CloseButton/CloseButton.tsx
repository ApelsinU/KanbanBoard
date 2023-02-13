import React from 'react'
import './close-button.scss'

import { CrossIcon } from '@App/assets/icons/CrossIcon'

export interface IButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  width?: number
  height?: number
}

export const CloseButton = ({ onClick, width = 30, height = 30 }: IButtonProps) => {
  return (
    <button
      className={`close-button`}
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <CrossIcon className={`close-icon`} />
    </button>
  )
}
