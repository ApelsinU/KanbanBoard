import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ICardItem, ITodosStore } from '@App/zustand/types/todosTypes'

export const useTodosStore = create<ITodosStore>()(
  // persist(
  // immer let us mutate state (like redux-toolkit)
  immer(
    devtools((set) => ({
      todos: {
        todo: [
          { id: 1, text: 'Do tasks' },
          { id: 2, text: 'Install' },
          { id: 3, text: 'Train hard' },
        ],
        progress: [
          { id: 1, text: 'Delete' },
          { id: 2, text: 'Learn' },
        ],
        done: [
          { id: 1, text: 'Lunch' },
          { id: 2, text: 'Relax' },
        ],
      },

      createTodo: ({ text, status }) =>
        set((state) => {
          state.todos[status].push({ id: state.todos[status].length + 1, text })
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
            if (deleted) return (card.id = index)

            if (card.id !== id) {
              return (card.id = index + 1)
            } else {
              deleted = true
              return null
            }
          })
        }),

      // todo:
      // Refresh state (when dragging between columns or changing order in one column)
      refreshTodos: () => set((state) => {}),
    })),
    // { name: 'todos', version: 1 },),
  ),
)
