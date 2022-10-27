import React, { DragEvent, useEffect, useRef, useState } from 'react'

import './board.scss'
import {
  DataCards,
  ICardItem,
  IDataCards,
} from '@App/pages/MainPage/components/Board/DataCards'

import { BoardHeader } from '../BoardHeader'
import { Card } from '../Card'

export interface IMoveCardsParams {
  cardId: number
  targetCol: keyof IDataCards //'notStarted' | 'inProgress' | 'completed'
  cardText: string
}

export const Board = () => {
  const [dataCards, setDataCards] = useState<IDataCards | null>(null)
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'notStarted',
    cardText: '',
  })

  useEffect(() => {
    setDataCards(DataCards)
  }, [])

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
      const targetCol: ICardItem[] = dataCards[moveCardsParams.targetCol]

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
      targetCol: 'notStarted',
      cardText: '',
    })
  }, [moveCardsParams.cardId])

  return (
    <div className="board-container">
      <div className="board">
        <BoardHeader dataCards={dataCards} />

        <div className="board-content">
          {dataCards &&
            (Object.keys(dataCards) as (keyof IDataCards)[]).map(
              (cardKey: keyof IDataCards) => (
                <div
                  key={cardKey}
                  className="col"
                  onDragOver={(e) => dragOver(e, cardKey)}
                >
                  {dataCards[cardKey].map((card: ICardItem, index) => (
                    <Card
                      key={index}
                      item={card}
                      moveCardsParams={moveCardsParams}
                      setMoveCardsParams={setMoveCardsParams}
                    />
                  ))}
                </div>
              ),
            )}
        </div>
      </div>
    </div>
  )
}
