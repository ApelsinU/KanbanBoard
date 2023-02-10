import './card.scss'

import { ICardProps } from '@App/pages/MainPage/components/Card/types'

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
