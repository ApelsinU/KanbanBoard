import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IUserStore } from '@App/zustand/types/userTypes'

export const useUserStore = create<IUserStore>()(
  persist(
    devtools((set) => ({
      userData: {
        userId: '',
        token: '',
      },

      refreshUserData: ({ userId, token }) =>
        set(() => ({ userData: { userId, token } })),
    })),

    { name: 'userData', version: 1 },
  ),
)
