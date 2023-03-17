import './edit-todo-modal.scss'
import { ChangeEvent, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'

import { useHttp } from '@App/hooks/http'
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
  const [editCardTitle, setEditCardTitle] = useState<string>('')
  const { request, isLoading } = useHttp()

  function onEditClick(e: any) {
    if (!editCardTitle) return null
    if (!editModalInfo) return null

    editTodoAsync().then((res) => {
      const todo = res.todo ? res.todo : res
      editTodo({ id: todo?.id, title: todo.title, status: todo.status })
      setEditCardTitle('')
      !isLoading && onClose(e)
    }) // DB
    fetchTodos().then((res: any) => console.log(res)) // DB
  }

  async function editTodoAsync() {
    return await request('api/todos/edit', 'PUT', {
      id: editModalInfo?.id,
      status: editModalInfo?.status,
      title: editCardTitle,
    })
  }

  async function fetchTodos() {
    return await request('api/todos/', 'GET')
  }

  useEffect(() => {
    editModalInfo && editModalInfo.title && setEditCardTitle(editModalInfo.title)
  }, [editModalInfo])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <div className={'modal-create-container'}>
        <Input
          name="create_todo"
          type="text"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditCardTitle(e.target.value)}
          value={editCardTitle ? editCardTitle : ''}
        />
        <Button text="Edit" height={45} disable={!editCardTitle} onClick={(e) => onEditClick(e)} />
      </div>
    </Modal>
  )
}
