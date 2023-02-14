import './edit-todo-modal.scss'
import { ChangeEvent, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'

import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'
import { useTodosStore } from '@App/zustand/stores/todosStore'
import { IEditTodo } from '@App/zustand/types/todosTypes'

import { Modal } from '../Modal'

interface IEditTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
  editModalInfo: IEditTodo | null
}

export const EditTodoModal = ({ isOpen, onClose, modalTitle, editModalInfo }: IEditTodoModal) => {
  const editTodo = useTodosStore((state) => state.editTodo)
  const [editCardText, setEditCardText] = useState<string>('')

  function onEditClick(e: any) {
    if (!editCardText) return null
    if (!editModalInfo) return null

    editTodo({ id: editModalInfo.id, status: editModalInfo.status, text: editCardText })
    setEditCardText('')
    onClose(e)
  }

  useEffect(() => {
    editModalInfo && editModalInfo.text && setEditCardText(editModalInfo.text)
  }, [editModalInfo])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <div className={'modal-create-container'}>
        <Input
          name="create_todo"
          type="text"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditCardText(e.target.value)}
          value={editCardText ? editCardText : ''}
        />
        <Button text="Edit" height={45} disable={!editCardText} onClick={(e) => onEditClick(e)} />
      </div>
    </Modal>
  )
}
