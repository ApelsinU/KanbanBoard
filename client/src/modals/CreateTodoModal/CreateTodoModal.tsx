import './create-todo-modal.scss'
import { MouseEventHandler, SetStateAction } from 'react'

import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'

import { Modal } from '../Modal'

interface ICreateTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
  title: string
}

export const CreateTodoModal = ({
  isOpen,
  onClose,
  title,
}: ICreateTodoModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={'modal-create-container'}>
        <Input type="text" />
        <Button text="Create" height={45} />
      </div>
    </Modal>
  )
}
