import { useCallback, useState } from 'react'

import { useAuth } from '@App/hooks/auth'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuth, userData } = useAuth()

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true)

    try {
      if (body) {
        body = JSON.stringify(body)
        headers = {
          ...headers,
          // Authorization: isAuth ? JSON.stringify(userData) : '', // with that add request (probably others) don't work
          'Content-Type': 'application/json',
        }
      }

      const res = await fetch(url, {
        method,
        headers,
        body,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Request Error')
      }

      setIsLoading(false)

      return data
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
      throw e
    }
  })

  const clearError = () => setError(null)

  return { request, isLoading, error, clearError }
}
