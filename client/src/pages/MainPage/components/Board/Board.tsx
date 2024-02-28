import React, { DragEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import './board.scss'

import DoneIcon from '@Assets/images/accepted.png'
import ToDoListIcon from '@Assets/images/check-list.png'
import TimeIcon from '@Assets/images/hourglass.png'

import {generateUniqId, generateUniqIdForStore, parseToObject, useTodosHelper} from '@App/helpers/todosHelper'
import {useAuth} from "@App/hooks/auth";
import { useHttp } from '@App/hooks/http'
import { CreateTodoModal } from '@App/modals/CreateTodoModal/CreateTodoModal'
import { EditTodoModal } from '@App/modals/EditTodoModal/EditTodoModal'
import { IMoveCardsParams, ISelectedCard } from '@App/pages/MainPage/components/Board/types'
import { useTodosStore } from '@App/zustand/stores/todosStore'
import { ICardItem, IDataCards, IEditTodo, Status } from '@App/zustand/types/todosTypes'

import { Card } from '../Card/Card'
import { CreateCard } from '../CreateCard/CreateCard'

export const Board = () => {
  const todos = useTodosStore((state) => state.todos)
  // const addTodo = useTodosStore((state) => state.addTodo)
  // const deleteTodo = useTodosStore((state) => state.deleteTodo)
  const { request } = useHttp()
  const { userData } = useAuth()

  const CardsIcons = {
    todo: ToDoListIcon,
    progress: TimeIcon,
    done: DoneIcon,
  }

  const [dataCards, setDataCards] = useState<IDataCards>()
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'unset',
    sourceCol: 'unset',
    cardText: '',
  })
  const [selectedCard, setSelectedCard] = useState<ISelectedCard | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<SetStateAction<boolean>>(false)
  const [editModalInfo, setEditModalInfo] = useState<IEditTodo | null>(null)

  async function asyncGetCards() {
    try {
      let todos = await request(
          'api/todos/',
          'GET',
          null,
          {Authorization: `Bearer ${userData.token}`}
      )

      todos = parseToObject(todos)

      setDataCards(todos)
    } catch (e) {}
  }

  useEffect(() => {
    if (isCreateModalOpen === false) {
      asyncGetCards()
    }
  }, [isCreateModalOpen])

  useEffect(() => {
    asyncGetCards()
  }, [])

  const dragOverCol = useRef<IMoveCardsParams['targetCol']>()

  const dragOver = (e: DragEvent, col: IMoveCardsParams['targetCol']) => {
    dragOverCol.current = col
    setMoveCardsParams({ ...moveCardsParams, targetCol: dragOverCol.current })
  }

  useEffect(() => {
    if (dataCards && moveCardsParams.cardId !== 0) {
      moveTodoAsync().then(() => asyncGetCards())
    }

    setMoveCardsParams({
      cardId: 0,
      targetCol: 'unset',
      sourceCol: 'unset',
      cardText: '',
    })
  }, [moveCardsParams.cardId])

  async function moveTodoAsync() {
    if (moveCardsParams.targetCol === 'unset') return null
    if (moveCardsParams.sourceCol === 'unset') return null
    if (moveCardsParams.targetCol === moveCardsParams.sourceCol) return null
    if (!dataCards) return null

    return await request('api/todos/move', 'PUT', {
      id: moveCardsParams.cardId,
      new_id: generateUniqId(dataCards, moveCardsParams.targetCol),
      new_status: moveCardsParams.targetCol,
    })
  }

  function getColTitles(status: Status) {
    switch (status) {
      case 'todo':
        return 'ToDo'
      case 'progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return ''
    }
  }

  function closeEditModal () {
    setEditModalInfo(null)
    asyncGetCards()
  }


  return (
    <div className="board">
      {dataCards ?
        (Object.keys(dataCards) as Status[]).map((cardKey: Status) => (
          <div
            key={cardKey}
            className={`col ${
              moveCardsParams.targetCol === cardKey &&
              moveCardsParams.targetCol !== selectedCard?.initCol &&
              'highlight'
            }`}
            onDragOver={(e) => dragOver(e, cardKey)}
          >
            <div className="header">
              <div className="header-icon">
                <img src={CardsIcons[cardKey]} alt="" />
              </div>
              <div className="header-text">
                <span>
                  {getColTitles(cardKey)}
                  <div className="header-count">
                    <span>{dataCards[cardKey]?.length}</span>
                  </div>
                </span>
              </div>
            </div>

            {dataCards[cardKey].map((card: ICardItem, index) => (
              <Card
                key={index}
                item={card}
                initCol={cardKey}
                moveCardsParams={moveCardsParams}
                setSelectedCard={setSelectedCard}
                setMoveCardsParams={setMoveCardsParams}
                setEditModalInfo={setEditModalInfo}
                updateTodosBoard={asyncGetCards}
              />
            ))}
            <div
              className={`card-placeholder ${
                moveCardsParams.targetCol === cardKey &&
                moveCardsParams.targetCol !== selectedCard?.initCol &&
                'highlight'
              }`}
            >
              {selectedCard?.cardText}
            </div>
            {cardKey === 'todo' && <CreateCard setIsCreateModalOpen={setIsCreateModalOpen} />}
          </div>
        ))
        : null
      }
      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        modalTitle="Create new Task"
      />
      <EditTodoModal
        isOpen={!!editModalInfo}
        editModalInfo={editModalInfo}
        onClose={() => closeEditModal()}
        modalTitle="Edit Todo"
      />
    </div>
  )
}
