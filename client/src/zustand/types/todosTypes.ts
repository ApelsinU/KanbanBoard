export interface ITodosStore {
  todos: IDataCards
  addTodo: ({ id, title, status }: IAddTodo) => void
  editTodo: ({ id, title, status }: IEditTodo) => void
  deleteTodo: ({ id }: IDeleteTodo) => void
  refreshTodos: ({ id, title, sourceCol, targetCol }: IRefreshTodos) => void
}

export interface IDataCards {
  todo: ICardItem[]
  progress: ICardItem[]
  done: ICardItem[]
}

export interface ICardItem {
  title: string
  id: string
  status?: Status
  _id?: string
  __v?: number
}

export type Status = 'todo' | 'progress' | 'done'

export interface IAddTodo {
  title: string
  id: string
  status: Status
}

export interface IEditTodo {
  id: string
  status: Status
  title: string
}

export interface IDeleteTodo {
  id: string
}

export interface IRefreshTodos {
  id: string
  title: string
  sourceCol: Status | 'unset'
  targetCol: Status | 'unset'
}
