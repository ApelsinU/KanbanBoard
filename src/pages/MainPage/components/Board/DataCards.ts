export interface ICardItem {
  text: string
  id: number
}

export interface IDataCards {
  notStarted: ICardItem[]
  inProgress: ICardItem[]
  completed: ICardItem[]
}

export const DataCards: IDataCards = {
  notStarted: [
    { id: 1, text: 'Do tasks' },
    { id: 2, text: 'Install Bubuntu' },
    { id: 3, text: 'Train hard' },
  ],
  inProgress: [{ id: 4, text: 'Delete Shindows' }],
  completed: [
    { id: 5, text: 'Lunch' },
    { id: 6, text: 'Relax' },
  ],
}
