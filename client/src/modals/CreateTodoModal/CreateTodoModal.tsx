import './create-todo-modal.scss'
import React, { ChangeEvent, MouseEventHandler, SetStateAction, useState } from 'react'

import { generateUniqId } from '@App/helpers/todosHelper'
import { useHttp } from '@App/hooks/http'
import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'
import { useTodosStore } from '@App/zustand/stores/todosStore'

import { Modal } from '../Modal'

interface ICreateTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
}

export const CreateTodoModal = ({ isOpen, onClose, modalTitle }: ICreateTodoModal) => {
  const todos = useTodosStore((state) => state.todos)
  const addTodo = useTodosStore((state) => state.addTodo)
  const [createCardValue, setCreateCardValue] = useState<string>('')
  const { request, isLoading } = useHttp()

  function onCreateClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!createCardValue) return

    addTodoAsync().then((res) => {
      const todo = res.todo ? res.todo : res
      addTodo({ id: todo?.id, title: todo.title, status: todo.status })
      setCreateCardValue('')
      !isLoading && onClose(e)
    })
  }

  async function addTodoAsync() {
    return await request('api/todos/add', 'POST', {
      id: generateUniqId(todos, 'todo'),
      title: createCardValue,
      status: 'todo',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <div className={'modal-create-container'}>
        <Input
          name="create_todo"
          type="text"
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCreateCardValue(e.target.value)}
          value={createCardValue}
          autoFocus={true}
        />
        <Button
          text="Create"
          height={45}
          disable={!createCardValue}
          onClick={(e) => onCreateClick(e)}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  )
}
