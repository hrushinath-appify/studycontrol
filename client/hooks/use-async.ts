// Custom hook for handling async operations with loading and error states

import { useState, useCallback } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAsync<T, Args extends any[] = []>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (asyncFunction: (...args: Args) => Promise<T>, ...args: Args) => {
      setState({ data: null, loading: true, error: null })

      try {
        const result = await asyncFunction(...args)
        setState({ data: result, loading: false, error: null })
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        setState({ data: null, loading: false, error: errorMessage })
        throw error
      }
    },
    []
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  }
}

// Specialized hook for API calls
export function useApi<T, Args extends any[] = []>(
  apiFunction: (...args: Args) => Promise<T>
) {
  const { execute, ...rest } = useAsync<T, Args>()

  const call = useCallback(
    (...args: Args) => execute(apiFunction, ...args),
    [execute, apiFunction]
  )

  return {
    ...rest,
    call,
  }
}
