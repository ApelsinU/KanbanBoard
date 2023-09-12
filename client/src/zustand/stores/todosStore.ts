import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import {generateUniqId, generateUniqIdForStore} from '@App/helpers/todosHelper'
import { ICardItem, ITodosStore, Status } from '@App/zustand/types/todosTypes'

export const useTodosStore = create<ITodosStore>()(
  //todo: remove persist when DB will be connected
  persist(
    // immer let us mutate state (like redux-toolkit)
    immer(
      devtools((set) => ({
        // we use 1000, 2000, 3000 for uniq ids in each col
        todos: {
            todo: [],
            progress: [],
            done: [],
        },

        addTodo: ({ id, title, status }) =>
          set((state) => {
            state.todos[status].push({ id, title })
          }),

        editTodo: ({ id, status, title }) =>
          set((state) => {
            state.todos[status] = state.todos[status].map((card: ICardItem) =>
              card.id === id ? { id, title } : card,
            )
          }),

        // Delete card and shift array
        deleteTodo: ({ id }) =>
          set((state) => {
            let deleted = false
            ;(Object.keys(state.todos) as Status[]).forEach((status: Status) => {
              state.todos[status] = state.todos[status].filter((card: ICardItem, index: number) => {
                if (deleted) return (card.id = generateUniqIdForStore(state.todos, status, index))

                if (card.id !== id) {
                  return (card.id = generateUniqIdForStore(state.todos, status, index + 1))
                } else {
                  deleted = true
                  return null
                }
              })
            })
          }),

        // todo: Board use status 'unset', need to solve how to remove it
        refreshTodos: ({ id, title, sourceCol, targetCol }) =>
          set((state) => {
            if (targetCol === 'unset') return null
            if (sourceCol === 'unset') return null
            if (targetCol === sourceCol) return null

            const uId = generateUniqIdForStore(state.todos, targetCol)
            state.addTodo({ id: uId, title, status: targetCol })
            state.deleteTodo({ id })

            return null
          }),
      })),
    ),
    { name: 'todos', version: 1 },
  ),
)
