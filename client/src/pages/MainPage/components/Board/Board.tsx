import React, { DragEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import './board.scss'

import DoneIcon from '@Assets/images/accepted.png'
import ToDoListIcon from '@Assets/images/check-list.png'
import TimeIcon from '@Assets/images/hourglass.png'

import { CreateTodoModal } from '@App/modals/CreateTodoModal/CreateTodoModal'
import { IMoveCardsParams, ISelectedCard } from '@App/pages/MainPage/components/Board/types'
import { useTodosStore } from '@App/zustand/stores/todosStore'
import { ICardItem, IDataCards } from '@App/zustand/types/todosTypes'

import { Card } from '../Card/Card'
import { CreateCard } from '../CreateCard/CreateCard'

export const Board = () => {
  const todos = useTodosStore((state) => state.todos)

  const CardsIcons = {
    todo: ToDoListIcon,
    progress: TimeIcon,
    done: DoneIcon,
  }

  const [dataCards, setDataCards] = useState<IDataCards | null>(null)
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'noStatus',
    cardText: '',
  })
  const [selectedCard, setSelectedCard] = useState<ISelectedCard | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<SetStateAction<boolean>>(false)

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
      let draggedCard: ICardItem = {
        id: 0,
        text: '',
      }

      let sourceType = ''
      const targetType = moveCardsParams.targetCol
      let sourceCol: ICardItem[] = []
      const targetCol: ICardItem[] =
        moveCardsParams.targetCol !== 'noStatus' ? dataCards[moveCardsParams.targetCol] : []

      Object.entries(dataCards).map((cards: any) =>
        cards[1].map((card: ICardItem) => {
          if (card.id === moveCardsParams.cardId) {
            draggedCard = card
            sourceType = cards[0]
            sourceCol = cards[1]
          }
        }),
      )

      if (sourceType !== targetType) {
        const sourceArr = [...sourceCol]
        const targetArr = [...targetCol]

        const updatedCols = {
          ...dataCards,
          [sourceType]: sourceArr,
          [targetType]: targetArr,
        }

        setDataCards(updatedCols)

        sourceArr.splice(sourceArr.indexOf(draggedCard), 1)
        targetArr.push(draggedCard)
      }
    }

    setMoveCardsParams({
      cardId: 0,
      targetCol: 'noStatus',
      cardText: '',
    })
  }, [moveCardsParams.cardId])

  function getFormattedText(str: string) {
    let formattedText = ''
    str.split('').map((el) => {
      if (el === el.toUpperCase()) {
        formattedText += ' '
      }
      formattedText += el
    })

    return formattedText
  }

  return (
    <div className="board">
      {dataCards &&
        (Object.keys(dataCards) as (keyof IDataCards)[]).map((cardKey: keyof IDataCards) => (
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
                  {getFormattedText(cardKey)}
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
        title="Create new Task"
      />
    </div>
  )
}
