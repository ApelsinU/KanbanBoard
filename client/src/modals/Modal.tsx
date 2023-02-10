import { MouseEventHandler, SetStateAction, useEffect } from 'react'

import './modal.scss'
import crossIcon from '@App/assets/images/cross.png'
import { Button } from '@App/ui/Button/Button'

interface IModal {
  children: JSX.Element
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
}

export const Modal = ({ children, isOpen, onClose }: IModal) => {
  useEffect(() => {
    window.document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <div className={`modal ${isOpen && 'open'}`}>
      <div className={'modal-container'}>
        <div className={'modal-header'}>
          <h2>Modal Title</h2>
          {/*<div className={'modal-close-container'}>*/}
          <Button
            onClick={onClose}
            theme="circle"
            text="close"
            // text={<img src={crossIcon} alt="cross-icon" />}
          />

          {/*</div>*/}
        </div>
        {children}
      </div>
    </div>
  )
}
