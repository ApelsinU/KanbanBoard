import { useEffect, useState } from 'react'

import { UserResponseData } from '@App/types/http'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  function login(data: UserResponseData) {
    // todo: add to persist store
    window.localStorage.setItem(
      'user-auth',
      JSON.stringify({ id: data.userId, token: data.token }),
    )
  }

  function logout() {
    // todo: rm from persist store
    window.localStorage.setItem('user-auth', '')
  }

  useEffect(() => {
    const localStorage = window.localStorage.getItem('user-auth')
    setIsAuth(!!localStorage)
  }, [login, logout])

  return {
    login,
    logout,
    isAuth,
  }
}
