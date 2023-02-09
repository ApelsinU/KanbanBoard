import { useEffect, useState } from 'react'

import { UserResponseData } from '@App/types/http'
import { useUserStore } from '@App/zustand/stores/userStore'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const userData = useUserStore((state) => state.userData)
  const refreshUserData = useUserStore((state) => state.refreshUserData)

  function login(data: UserResponseData) {
    refreshUserData({ userId: data.userId, token: data.token })
  }

  function logout() {
    refreshUserData({ userId: '', token: '' })
  }

  useEffect(() => {
    setIsAuth(!!(userData.userId && userData.token))
  }, [userData])

  return {
    login,
    logout,
    isAuth,
  }
}
