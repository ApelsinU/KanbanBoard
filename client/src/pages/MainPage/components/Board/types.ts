import { Status } from '@App/zustand/types/todosTypes'

export interface IMoveCardsParams {
  cardId: number
  targetCol: Status | 'unset'
  sourceCol: Status | 'unset'
  cardText: string
}

export interface ISelectedCard {
  cardId: number
  cardText: string
  initCol: Status
}
