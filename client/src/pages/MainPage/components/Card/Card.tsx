import './card.scss'

import { DeleteBinIcon, EditIcon } from '@Assets/icons/StrokeIcons'

import { useHttp } from '@App/hooks/http'
import { ICardProps } from '@App/pages/MainPage/components/Card/types'
import { CardControl } from '@App/pages/MainPage/components/CardControl/CardControl'

export const Card = ({
  item,
  moveCardsParams,
  setMoveCardsParams,
  setSelectedCard,
  initCol,
  setEditModalInfo,
  updateTodosBoard
}: ICardProps) => {
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
    deleteTodoAsync().then(() => updateTodosBoard())
  }

  function handleEditClick() {
    setEditModalInfo({ id: item.id, status: initCol, title: item.title })
  }
  async function deleteTodoAsync() {
    return await request('api/todos/delete/', 'DELETE', { id: item.id })
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
