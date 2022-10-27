import './card.scss'

import { useRef, DragEvent } from 'react'

import { IMoveCardsParams } from '../Board'
import { ICardItem } from '../Board/DataCards'

interface ICardProps {
  item: ICardItem
  moveCardsParams: IMoveCardsParams
  setMoveCardsParams: (moveCardParams: IMoveCardsParams) => void
}

export const Card = ({
  item,
  moveCardsParams,
  setMoveCardsParams,
}: ICardProps) => {
  // const dragCard = useRef(0)

  // const dragStart = (e: DragEvent, id: number) => {
  //   console.log(e)
  //   dragCard.current = id
  // }

  const dragEnd = () => {
    setMoveCardsParams({
      ...moveCardsParams,
      cardId: item.id,
      cardText: item.text,
    })
  }

  return (
    <div
      className="card"
      draggable
      //onDragStart={(e) => dragStart(e, item.id)}
      onDragEnd={dragEnd}
    >
      {item.text}
    </div>
  )
}
