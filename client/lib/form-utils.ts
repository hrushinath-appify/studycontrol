// Form utilities and helpers

// =============================================================================
// FORM FIELD HANDLERS
// =============================================================================

export function createFieldHandler<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  field: keyof T
) {
  return (value: T[keyof T]) => {
    setState(prev => ({ ...prev, [field]: value }))
  }
}

export function createInputHandler<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  field: keyof T
) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(prev => ({ ...prev, [field]: e.target.value }))
  }
}

export function createCheckboxHandler<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  field: keyof T
) {
  return (checked: boolean) => {
    setState(prev => ({ ...prev, [field]: checked }))
  }
}

// =============================================================================
// FORM VALIDATION HELPERS
// =============================================================================

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(error => error !== undefined && error !== '')
}

export function getFirstError(errors: Record<string, string | undefined>): string | null {
  const firstError = Object.values(errors).find(error => error !== undefined && error !== '')
  return firstError || null
}

export function clearErrors(): Record<string, string | undefined> {
  return {}
}

// =============================================================================
// FORM SUBMISSION HELPERS
// =============================================================================

export async function handleAsyncSubmit<T>(
  submitFn: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  onSuccess?: (result: T) => void,
  onError?: (error: Error) => void
): Promise<void> {
  setLoading(true)
  setError(null)

  try {
    const result = await submitFn()
    onSuccess?.(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred'
    setError(errorMessage)
    onError?.(error instanceof Error ? error : new Error(errorMessage))
  } finally {
    setLoading(false)
  }
}

// =============================================================================
// LOCAL STORAGE HELPERS
// =============================================================================

export function saveFormData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error)
  }
}

export function loadFormData<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error)
  }
  return defaultValue
}

export function clearFormData(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error)
  }
}

// =============================================================================
// FORM FIELD UTILITIES
// =============================================================================

export function trimFormFields<T extends Record<string, unknown>>(data: T): T {
  const trimmed = { ...data } as T
  Object.keys(trimmed).forEach(key => {
    if (typeof trimmed[key] === 'string') {
      (trimmed as Record<string, unknown>)[key] = (trimmed[key] as string).trim()
    }
  })
  return trimmed
}

export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = { ...data } as T
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      // Basic HTML sanitization - remove script tags and potentially dangerous content
      (sanitized as Record<string, unknown>)[key] = (sanitized[key] as string)
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
    }
  })
  return sanitized
}

// =============================================================================
// AUTO-SAVE UTILITIES
// =============================================================================

export function createAutoSave<T>(
  key: string,
  data: T,
  delay: number = 1000
): () => void {
  let timeoutId: NodeJS.Timeout

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      saveFormData(key, data)
    }, delay)
  }
}

// =============================================================================
// FORM RESET UTILITIES
// =============================================================================

export function resetForm<T>(
  initialValues: T,
  setState: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>,
  clearStorage?: string
): void {
  setState(initialValues)
  setErrors({})
  if (clearStorage) {
    clearFormData(clearStorage)
  }
}
