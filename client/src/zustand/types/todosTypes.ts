export interface ITodosStore {
  todos: IDataCards
  createTodo: ({ id, text, status }: ICreateTodo) => void
  deleteTodo: ({ id }: IDeleteTodo) => void
}

export interface IDataCards {
  todo: ICardItem[]
  progress: ICardItem[]
  done: ICardItem[]
}

export interface ICardItem {
  text: string
  id: number
}

type Status = 'todo' | 'progress' | 'done'

export interface ICreateTodo {
  text: string
  id: number
  status: Status
}

export interface IDeleteTodo {
  id: number
  status: Status
}
