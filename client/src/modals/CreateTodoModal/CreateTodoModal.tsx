import './create-todo-modal.scss'
import { ChangeEvent, MouseEventHandler, SetStateAction, useState } from 'react'

import { generateUniqId } from '@App/helpers/todosHelper'
import { useHttp } from '@App/hooks/http'
import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'
import { useTodosStore } from '@App/zustand/stores/todosStore'
import { IAddTodo } from '@App/zustand/types/todosTypes'

import { Modal } from '../Modal'

interface ICreateTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
}

export const CreateTodoModal = ({ isOpen, onClose, modalTitle }: ICreateTodoModal) => {
  const todos = useTodosStore((state) => state.todos)
  const addTodo = useTodosStore((state) => state.addTodo)
  const [createCardData, setCreateCardData] = useState<IAddTodo | null>(null)
  const { request } = useHttp()

  function onCreateClick(e: any) {
    if (!createCardData) return

    addTodoAsync() // DB
    addTodo(createCardData) // Zustand

    setCreateCardData(null)
    onClose(e)
  }

  async function addTodoAsync() {
    await request('api/todos/add', 'POST', {
      id: createCardData?.id,
      title: createCardData?.title,
      status: createCardData?.status,
    })
  }

  function handleCreateChange(e: ChangeEvent<HTMLInputElement>) {
    setCreateCardData({
      id: generateUniqId(todos, 'todo'),
      title: e.target.value,
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleCreateChange(e)}
          value={createCardData ? createCardData.title : ''}
        />
        <Button
          text="Create"
          height={45}
          disable={!createCardData}
          onClick={(e) => onCreateClick(e)}
        />
      </div>
    </Modal>
  )
}
