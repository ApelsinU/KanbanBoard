import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { generateUniqId } from '@App/helpers/todosHelper'
import { ICardItem, ITodosStore, Status } from '@App/zustand/types/todosTypes'

export const useTodosStore = create<ITodosStore>()(
  //todo: remove persist when DB will be connected
  persist(
    // immer let us mutate state (like redux-toolkit)
    immer(
      devtools((set) => ({
        // we use 1000, 2000, 3000 for uniq ids in each col
        todos: {
          todo: [
            { id: 1001, text: 'Do tasks' },
            { id: 1002, text: 'Install' },
            { id: 1003, text: 'Train hard' },
          ],
          progress: [
            { id: 2001, text: 'Delete' },
            { id: 2002, text: 'Learn' },
          ],
          done: [
            { id: 3001, text: 'Lunch' },
            { id: 3002, text: 'Relax' },
          ],
        },

        addTodo: ({ id, text, status }) =>
          set((state) => {
            state.todos[status].push({ id, text })
          }),

        editTodo: ({ id, status, text }) =>
          set((state) => {
            state.todos[status] = state.todos[status].map((card: ICardItem) =>
              card.id === id ? { id, text } : card,
            )
          }),

        // Delete card and shift array
        deleteTodo: ({ id, status }) =>
          set((state) => {
            let deleted = false

            state.todos[status] = state.todos[status].filter((card: ICardItem, index: number) => {
              if (deleted) return (card.id = generateUniqId(state.todos, status, index))

              if (card.id !== id) {
                return (card.id = generateUniqId(state.todos, status, index + 1))
              } else {
                deleted = true
                return null
              }
            })
          }),

        // todo: Board use status 'unset', need to solve how to remove it
        refreshTodos: ({ id, text, sourceCol, targetCol }) =>
          set((state) => {
            if (targetCol === 'unset') return null
            if (sourceCol === 'unset') return null
            if (targetCol === sourceCol) return null

            const uId = generateUniqId(state.todos, targetCol)
            state.addTodo({ id: uId, text, status: targetCol })
            state.deleteTodo({ id, status: sourceCol })

            return null
          }),
      })),
    ),
    { name: 'todos', version: 1 },
  ),
)
