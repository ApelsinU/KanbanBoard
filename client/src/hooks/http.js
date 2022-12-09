import {useState} from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = async (url, method = "GET", body = {}, headers = {}) => {
        setIsLoading(true)
        try {
            const res = await fetch(url, {method, body, headers})
            const data = res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Request Error')
            }

            setIsLoading(false)

            return data
        } catch(e) {
            setIsLoading(false)
            setError(e.message)
            throw e
        }
    }

    const clearError = () => setError(null)

    return {request, isLoading, error, clearError}
}