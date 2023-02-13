import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { ICardItem, ITodosStore } from '@App/zustand/types/todosTypes'

export const useTodosStore = create<ITodosStore>()(
  // persist(
  devtools((set) => ({
    // todo:
    // - add ids for 3 cols
    // - solve problem, when we delete one card, but other ids didnt changed, so appear bug when we create new card
    // - update card position when drag (ideal: update all ids/positions of affected columns)
    todos: {
      todo: [
        { id: 1, text: 'Do tasks' },
        { id: 2, text: 'Install' },
        { id: 3, text: 'Train hard' },
      ],
      progress: [{ id: 4, text: 'Delete' }],
      done: [
        { id: 5, text: 'Lunch' },
        { id: 6, text: 'Relax' },
      ],
    },

    createTodo: ({ id, text, status }) =>
      set((state) => ({
        todos: {
          ...state.todos,
          [status]: [...state.todos[status], { id, text }],
        },
      })),

    deleteTodo: ({ id, status }) =>
      set((state) => ({
        todos: {
          ...state.todos,
          [status]: state.todos[status].filter((card: ICardItem) => card.id !== id),
        },
        // todos: Object.values(state.todos).map((status) => {
        //     col.id === id
        // }),
      })),
  })),
  // { name: 'todos', version: 1 },),
)
