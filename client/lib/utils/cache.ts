// Simple in-memory cache for diary entries to prevent unnecessary reloads
class DiaryCache {
  private cache = new Map<string, any>()
  private timestamps = new Map<string, number>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, value: any): void {
    this.cache.set(key, value)
    this.timestamps.set(key, Date.now())
  }

  get(key: string): any | null {
    const timestamp = this.timestamps.get(key)
    if (!timestamp || Date.now() - timestamp > this.TTL) {
      // Cache expired
      this.cache.delete(key)
      this.timestamps.delete(key)
      return null
    }
    return this.cache.get(key) || null
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.cache.clear()
    this.timestamps.clear()
  }

  invalidate(key: string): void {
    this.cache.delete(key)
    this.timestamps.delete(key)
  }
}

export const diaryCache = new DiaryCache()

// Cache keys
export const CACHE_KEYS = {
  DIARY_ENTRIES: 'diary_entries',
  STREAK_DATA: 'streak_data',
} as const
