import './card.scss'

import { IMoveCardsParams, ISelectedCard } from '../Board/Board'
import { ICardItem, IDataCards } from '../Board/DataCards'

interface ICardProps {
  item: ICardItem
  moveCardsParams: IMoveCardsParams
  setMoveCardsParams: (moveCardParams: IMoveCardsParams) => void
  setSelectedCard: (moveCardParams: ISelectedCard) => void
  initCol: keyof IDataCards
}

export const Card = ({
  item,
  moveCardsParams,
  setMoveCardsParams,
  setSelectedCard,
  initCol,
}: ICardProps) => {
  const dragStart = () => {
    setSelectedCard({
      cardId: item.id,
      cardText: item.text,
      initCol: initCol,
    })
  }

  const dragEnd = () => {
    setMoveCardsParams({
      ...moveCardsParams,
      cardId: item.id,
      cardText: item.text,
    })
  }

  return (
    <div className="card" draggable onDragStart={dragStart} onDragEnd={dragEnd}>
      {item.text}
    </div>
  )
}
