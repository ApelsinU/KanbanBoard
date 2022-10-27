import React, { DragEvent, useEffect, useRef, useState } from 'react'

import './board.scss'
import {
  CardsIcons,
  DataCards,
  ICardItem,
  IDataCards,
} from '@App/pages/MainPage/components/Board/DataCards'

import { Card } from '../Card'

export interface IMoveCardsParams {
  cardId: number
  targetCol: keyof IDataCards | 'noStatus'
  cardText: string
}

export interface ISelectedCard {
  cardId: number
  cardText: string
  initCol: keyof IDataCards
}

export const Board = () => {
  const [dataCards, setDataCards] = useState<IDataCards | null>(null)
  const [moveCardsParams, setMoveCardsParams] = useState<IMoveCardsParams>({
    cardId: 0,
    targetCol: 'noStatus',
    cardText: '',
  })
  const [selectedCard, setSelectedCard] = useState<ISelectedCard | null>(null)

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
      const targetCol: ICardItem[] =
        moveCardsParams.targetCol !== 'noStatus'
          ? dataCards[moveCardsParams.targetCol]
          : []

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
    str.split('').map((el, index) => {
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
        (Object.keys(dataCards) as (keyof IDataCards)[]).map(
          (cardKey: keyof IDataCards) => (
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
            </div>
          ),
        )}
    </div>
  )
}
