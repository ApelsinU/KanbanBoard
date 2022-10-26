import './card.scss'
import { useRef, DragEvent } from 'react'

import { IMoveCardsParams, ICardItem } from '../Board'

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
  const dragCard = useRef(0)

  const dragStart = (e: DragEvent, id: number) => {
    dragCard.current = id
  }

  const dragEnd = () => {
    setMoveCardsParams({
      ...moveCardsParams,
      cardId: dragCard.current,
      cardText: item.text,
    })
  }

  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => dragStart(e, item.id)}
      onDragEnd={dragEnd}
    >
      {item.text}
    </div>
  )
}
