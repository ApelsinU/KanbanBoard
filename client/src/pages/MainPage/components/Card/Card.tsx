import './card.scss'

import { ICardProps } from '@App/pages/MainPage/components/Card/types'
import { CloseButton } from '@App/ui/CloseButton/CloseButton'
import { useTodosStore } from '@App/zustand/stores/todosStore'

export const Card = ({
  item,
  moveCardsParams,
  setMoveCardsParams,
  setSelectedCard,
  initCol,
}: ICardProps) => {
  const deleteTodo = useTodosStore((state) => state.deleteTodo)

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

  function handleDeleteClick() {
    deleteTodo({ id: item.id, status: initCol })
  }

  return (
    <div className="card" draggable onDragStart={dragStart} onDragEnd={dragEnd}>
      {item.text}
      <CloseButton width={24} height={24} onClick={handleDeleteClick} />
    </div>
  )
}
