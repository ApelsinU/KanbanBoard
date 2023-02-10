import {
  IMoveCardsParams,
  ISelectedCard,
} from '@App/pages/MainPage/components/Board/types'
import { ICardItem, IDataCards } from '@App/zustand/types/todosTypes'

export interface ICardProps {
  item: ICardItem
  moveCardsParams: IMoveCardsParams
  setMoveCardsParams: (moveCardParams: IMoveCardsParams) => void
  setSelectedCard: (moveCardParams: ISelectedCard) => void
  initCol: keyof IDataCards
}
