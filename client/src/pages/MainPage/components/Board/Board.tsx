import React, { DragEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import './board.scss'

import DoneIcon from '@Assets/images/accepted.png'
import ToDoListIcon from '@Assets/images/check-list.png'
import TimeIcon from '@Assets/images/hourglass.png'

import { generateUniqId } from '@App/helpers/todosHelper'
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

  const CardsIcons = {
    todo: ToDoListIcon,
    progress: TimeIcon,
    done: DoneIcon,
  }

  const [dataCards, setDataCards] = useState<IDataCards | null>(null)
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'unset',
    sourceCol: 'unset',
    cardText: '',
  })
  const [selectedCard, setSelectedCard] = useState<ISelectedCard | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<SetStateAction<boolean>>(false)
  const [editModalInfo, setEditModalInfo] = useState<IEditTodo | null>(null)

  //  todo:
  async function asyncGetCards() {
    try {
      const todos = await request('/api/todos/', 'GET')
      setDataCards(todos)
    } catch (e) {}
  }
  useEffect(() => {
    asyncGetCards()
  }, [])

  useEffect(() => {
    console.log('dataCards', dataCards)
  }, [dataCards])
  //

  useEffect(() => {
    setDataCards(todos)
  }, [todos])

  const dragOverCol = useRef<IMoveCardsParams['targetCol']>()

  const dragOver = (e: DragEvent, col: IMoveCardsParams['targetCol']) => {
    dragOverCol.current = col
    setMoveCardsParams({ ...moveCardsParams, targetCol: dragOverCol.current })
  }

  useEffect(() => {
    if (dataCards && moveCardsParams.cardId !== 0) {
      moveTodoAsync()
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

    return await request('api/todos/move', 'PUT', {
      id: moveCardsParams.cardId,
      new_id: generateUniqId(todos, moveCardsParams.targetCol),
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

  return (
    <div className="board">
      {dataCards &&
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
                    <span>{dataCards[cardKey].length}</span>
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
        ))}
      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        modalTitle="Create new Task"
      />
      <EditTodoModal
        isOpen={!!editModalInfo}
        editModalInfo={editModalInfo}
        onClose={() => setEditModalInfo(null)}
        modalTitle="Edit Todo"
      />
    </div>
  )
}
