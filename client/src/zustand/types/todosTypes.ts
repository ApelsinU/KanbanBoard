export interface ITodosStore {
  todos: IDataCards
  createTodo: ({ id, text, status }: ICreateTodo) => void
  editTodo: ({ id, text, status }: IEditTodo) => void
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

export type Status = 'todo' | 'progress' | 'done'

export interface ICreateTodo {
  text: string
  id: number
  status: Status
}

export interface IEditTodo {
  id: number
  status: Status
  text: string
}

export interface IDeleteTodo {
  id: number
  status: Status
}
