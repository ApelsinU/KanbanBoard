import { Status } from '@App/zustand/types/todosTypes'

export interface IMoveCardsParams {
  cardId: string
  targetCol: Status | 'unset'
  sourceCol: Status | 'unset'
  cardText: string
}

export interface ISelectedCard {
  cardId: string
  cardText: string
  initCol: Status
}
