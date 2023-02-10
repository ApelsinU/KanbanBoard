import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { ITodosStore } from '@App/zustand/types/todosTypes'

export const useTodosStore = create<ITodosStore>()(
  devtools((set) => ({
    todos: {
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
    },
  })),
)
