import React from 'react'

import './card-control.scss'
import { DeleteBinIcon } from '@Assets/icons/StrokeIcons'
export interface IButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  width?: number
  height?: number
  icon?: JSX.Element
}
export const CardControl = ({
  onClick,
  width = 30,
  height = 30,
  icon = <DeleteBinIcon />,
}: IButtonProps) => {
  return (
    <button
      className={`control-button`}
      onClick={onClick}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className={'control-icon-container'}>{icon}</div>
    </button>
  )
}
