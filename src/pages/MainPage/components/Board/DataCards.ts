import DoneIcon from '@Assets/svg/accepted.png'
import ToDoListIcon from '@Assets/svg/check-list.png'
import TimeIcon from '@Assets/svg/hourglass.png' // time

export interface ICardItem {
  text: string
  id: number
}

export interface IDataCards {
  toDo: ICardItem[]
  inProgress: ICardItem[]
  done: ICardItem[]
}

export const CardsIcons = {
  toDo: ToDoListIcon,
  inProgress: TimeIcon,
  done: DoneIcon,
}

export const DataCards: IDataCards = {
  toDo: [
    { id: 1, text: 'Do tasks' },
    { id: 2, text: 'Install Bubuntu' },
    { id: 3, text: 'Train hard' },
  ],
  inProgress: [{ id: 4, text: 'Delete Shindows' }],
  done: [
    { id: 5, text: 'Lunch' },
    { id: 6, text: 'Relax' },
  ],
}
