export interface ITodosStore {
  todos: IDataCards
  addTodo: ({ id, text, status }: IAddTodo) => void
  editTodo: ({ id, text, status }: IEditTodo) => void
  deleteTodo: ({ id }: IDeleteTodo) => void
  refreshTodos: ({ id, text, sourceCol, targetCol }: IRefreshTodos) => void
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

export interface IAddTodo {
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

export interface IRefreshTodos {
  id: number
  text: string
  sourceCol: Status | 'unset'
  targetCol: Status | 'unset'
}
