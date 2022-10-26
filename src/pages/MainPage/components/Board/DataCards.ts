export interface ICardItem {
  text: string
  id: number
}

export interface IDataCards {
  cards: ICardItem[]
}

export const DataCards: IDataCards = {
  cards: [
    { id: 1, text: 'Do tasks' },
    { id: 2, text: 'Relax' },
    { id: 3, text: 'Train hard' },
  ],
}
