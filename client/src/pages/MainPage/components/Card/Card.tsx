import './card.scss'

import { DeleteBinIcon, EditIcon } from '@Assets/icons/StrokeIcons'

import { useHttp } from '@App/hooks/http'
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
  const { request } = useHttp()

  const dragStart = () => {
    setSelectedCard({
      cardId: item.id,
      cardText: item.title,
      initCol: initCol,
    })
  }

  const dragEnd = () => {
    setMoveCardsParams({
      ...moveCardsParams,
      cardId: item.id,
      cardText: item.title,
      sourceCol: initCol,
    })
  }

  function handleDeleteClick() {
    deleteTodoAsync() // DB

    deleteTodo({ id: item.id, status: initCol }) // Zustand
  }

  function handleEditClick() {
    setEditModalInfo({ id: item.id, status: initCol, title: item.title })
  }
  async function deleteTodoAsync() {
    await request('api/todos/delete', 'DELETE', { id: item.id, status: initCol })
  }

  return (
    <div className="card" draggable onDragStart={dragStart} onDragEnd={dragEnd}>
      {item.id} {item.title}
      <div className={'controls-block'}>
        <CardControl icon={<EditIcon />} onClick={handleEditClick} />
        <CardControl icon={<DeleteBinIcon />} onClick={handleDeleteClick} />
      </div>
    </div>
  )
}
