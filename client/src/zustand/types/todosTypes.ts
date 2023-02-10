export interface ITodosStore {
  todos: IDataCards
}

export interface IDataCards {
  toDo: ICardItem[]
  inProgress: ICardItem[]
  done: ICardItem[]
}

export interface ICardItem {
  text: string
  id: number
}
