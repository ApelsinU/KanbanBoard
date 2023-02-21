import './card.scss'

import { DeleteBinIcon, EditIcon } from '@Assets/icons/StrokeIcons'

import { ICardProps } from '@App/pages/MainPage/components/Card/types'
import { CardControl } from '@App/pages/MainPage/components/CardControl/CardControl'
import { useTodosStore } from '@App/zustand/stores/todosStore'

export const Card = ({
  item,
  moveCardsParams,
  setMoveCardsParams,
  setSelectedCard,
  initCol,
  setEditModalInfo,
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
      sourceCol: initCol,
    })
  }

  function handleDeleteClick() {
    deleteTodo({ id: item.id, status: initCol })
  }

  function handleEditClick() {
    setEditModalInfo({ id: item.id, status: initCol, text: item.text })
  }

  return (
    <div className="card" draggable onDragStart={dragStart} onDragEnd={dragEnd}>
      {item.id} {item.text}
      <div className={'controls-block'}>
        <CardControl icon={<EditIcon />} onClick={handleEditClick} />
        <CardControl icon={<DeleteBinIcon />} onClick={handleDeleteClick} />
      </div>
    </div>
  )
}
