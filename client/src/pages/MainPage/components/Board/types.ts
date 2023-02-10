import { IDataCards } from '@App/zustand/types/todosTypes'

export interface IMoveCardsParams {
  cardId: number
  targetCol: keyof IDataCards | 'noStatus'
  cardText: string
}

export interface ISelectedCard {
  cardId: number
  cardText: string
  initCol: keyof IDataCards
}
