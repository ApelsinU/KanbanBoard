import React, { SetStateAction, useEffect } from 'react'

import './modal.scss'
import { CloseButton } from '@App/ui/CloseButton/CloseButton'

interface IModal {
  children: JSX.Element
  isOpen: SetStateAction<boolean>
  onClose: React.MouseEventHandler<HTMLButtonElement>
  title?: string
}

export const Modal = ({ children, isOpen, onClose, title }: IModal) => {
  useEffect(() => {
    window.document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <div className={`modal ${isOpen && 'open'}`}>
      <div className={'modal-container'}>
        <div className={'modal-header'}>
          <h2 className={'modal-title'}>{title}</h2>
          <CloseButton onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}
