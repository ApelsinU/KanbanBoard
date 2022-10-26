import React, { DragEvent, useEffect, useRef, useState } from 'react'

import './board.scss'
import { Card } from '../Card'

// import { DataCards, ICardItem } from './DataCards'

export interface ICardItem {
  text: string
  id: number
}

export interface IDataCards {
  notStarted: ICardItem[]
  inProgress: ICardItem[]
  completed: ICardItem[]
}

export interface IMoveCardsParams {
  cardId: number
  targetCol: 'notStarted' | 'inProgress' | 'completed'
  cardText: string
}

export const Board = () => {
  const DataCards: IDataCards = {
    notStarted: [
      { id: 1, text: 'Do tasks' },
      { id: 2, text: 'Install Bubuntu' },
      { id: 3, text: 'Train hard' },
    ],
    inProgress: [{ id: 4, text: 'Delete Shindows' }],
    completed: [
      { id: 5, text: 'Lunch' },
      { id: 6, text: 'Relax' },
    ],
  }

  const [dataCards, setDataCards] = useState<IDataCards>()
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'notStarted',
    cardText: '',
  })

  useEffect(() => {
    setDataCards(DataCards)
  }, [])

  useEffect(() => {
    console.log(moveCardsParams)
  }, [moveCardsParams])

  const dragOverCol = useRef<IMoveCardsParams['targetCol']>()

  const dragOver = (e: DragEvent, col: IMoveCardsParams['targetCol']) => {
    dragOverCol.current = col
    setMoveCardsParams({ ...moveCardsParams, targetCol: dragOverCol.current })
  }

  useEffect(() => {
    console.log('moveCardsParams', typeof moveCardsParams.targetCol)

    if (dataCards) {
      // const draggedCard: ICardItem = {
      //   id: moveCardsParams.cardId,
      //   text: moveCardsParams.cardText,
      // }
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

      if (sourceType === targetType) return

      const sourceArr = [...sourceCol]
      const targetArr = [...targetCol]

      console.log('sourceType', sourceType)
      console.log('targetType', targetType)

      const updatedCols = {
        ...dataCards,
        [sourceType]: sourceArr,
        [targetType]: targetArr,
      }

      setDataCards(updatedCols)

      sourceArr.splice(sourceArr.indexOf(draggedCard), 1)
      targetArr.push(draggedCard)

      console.log('sourceArr', sourceArr)
      console.log('targetArr', targetArr)
      console.log(draggedCard)
    }

    //    dataCards && draggedCard && Object.values(dataCards).find(draggedCard)
  }, [moveCardsParams.cardId])

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-header">
          <div className="col">
            <div className="col-header-text">Not Started</div>
          </div>
          <div className="col">
            <div className="col-header-text">In Progress</div>
          </div>
          <div className="col">
            <div className="col-header-text">Completed</div>
          </div>
        </div>

        <div className="board-content">
          <div className="col" onDragOver={(e) => dragOver(e, 'notStarted')}>
            {dataCards?.notStarted.map((card: ICardItem, index) => (
              <Card
                key={index}
                item={card}
                moveCardsParams={moveCardsParams}
                setMoveCardsParams={setMoveCardsParams}
              />
            ))}
          </div>

          <div className="col" onDragOver={(e) => dragOver(e, 'inProgress')}>
            {dataCards?.inProgress.map((card: ICardItem, index) => (
              <Card
                key={index}
                item={card}
                moveCardsParams={moveCardsParams}
                setMoveCardsParams={setMoveCardsParams}
              />
            ))}
          </div>

          <div className="col" onDragOver={(e) => dragOver(e, 'completed')}>
            {dataCards?.completed.map((card: ICardItem, index) => (
              <Card
                key={index}
                item={card}
                moveCardsParams={moveCardsParams}
                setMoveCardsParams={setMoveCardsParams}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
