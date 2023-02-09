import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type UserStore = {
  userData: UserData
  refreshUserData: ({ userId, token }: UserData) => void
}

type UserData = {
  userId: string
  token: string
}

export const useUserStore = create<UserStore>()(
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
