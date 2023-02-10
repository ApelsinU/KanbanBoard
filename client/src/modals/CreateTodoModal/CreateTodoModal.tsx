import './create-todo-modal.scss'
import { MouseEventHandler, SetStateAction } from 'react'

import { Modal } from '../Modal'

interface ICreateTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
}

export const CreateTodoModal = ({ isOpen, onClose }: ICreateTodoModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>create todo modal</div>
    </Modal>
  )
}
