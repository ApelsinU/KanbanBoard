import './create-todo-modal.scss'
import React, { ChangeEvent, MouseEventHandler, SetStateAction, useState } from 'react'

import {generateUniqId} from '@App/helpers/todosHelper'
import {useAuth} from "@App/hooks/auth";
import { useHttp } from '@App/hooks/http'
import { Button } from '@App/ui/Button/Button'
import { Input } from '@App/ui/Input/Input'
import {useUserStore} from "@App/zustand/stores/userStore";
import {IDataCards} from "@App/zustand/types/todosTypes";

import { Modal } from '../Modal'

interface ICreateTodoModal {
  isOpen: SetStateAction<boolean>
  onClose: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
  dataCards: IDataCards
}

export const CreateTodoModal = ({ isOpen, onClose, modalTitle, dataCards }: ICreateTodoModal) => {
  const [createCardValue, setCreateCardValue] = useState<string>('')
  const { request, isLoading } = useHttp()
  const { userData } = useAuth()
  const userId = useUserStore((state) => state.userData.userId)

  function onCreateClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!createCardValue) return

    addTodoAsync().then(() => {
      setCreateCardValue('')
      !isLoading && onClose(e)
    })
  }

  async function addTodoAsync() {
    return await request(
        'api/todos/add',
        'POST',
        {
          id: generateUniqId(dataCards, 'todo', userId),
          title: createCardValue,
          status: 'todo',
        },
        {Authorization: `Bearer ${userData.token}`}
    )
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
