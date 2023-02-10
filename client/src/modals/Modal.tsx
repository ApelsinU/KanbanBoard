import { MouseEventHandler, SetStateAction, useEffect } from 'react'

import './modal.scss'
import crossIcon from '@App/assets/images/cross.png'
import { Button } from '@App/ui/Button/Button'

interface IModal {
  children: JSX.Element
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
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
          <Button
            onClick={onClose}
            theme="circle"
            text="close"
            // text={<img src={crossIcon} alt="cross-icon" />}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
