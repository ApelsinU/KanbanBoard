import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)

      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
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
    },
  )

  const clearError = () => setError(null)

  return { request, isLoading, error, clearError }
}
