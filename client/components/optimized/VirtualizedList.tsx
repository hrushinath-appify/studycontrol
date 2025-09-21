"use client"

import React, { useState, useCallback, useMemo } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  containerHeight: number
  overscan?: number
  searchQuery?: string
  filterFn?: (item: T, query: string) => boolean
}

// Optimized virtualized list component for large datasets
function VirtualizedListComponent<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 5,
  searchQuery = '',
  filterFn,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  
  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  
  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!debouncedSearchQuery || !filterFn) return items
    return items.filter(item => filterFn(item, debouncedSearchQuery))
  }, [items, debouncedSearchQuery, filterFn])
  
  // Calculate visible range
  const visibleRange = useMemo(() => {
    const totalItems = filteredItems.length
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      totalItems - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    )
    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, containerHeight, overscan, filteredItems.length])
  
  // Get visible items
  const visibleItems = useMemo(() => {
    return filteredItems.slice(visibleRange.startIndex, visibleRange.endIndex + 1)
  }, [filteredItems, visibleRange])
  
  // Handle scroll with throttling
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])
  
  const totalHeight = filteredItems.length * itemHeight
  const offsetY = visibleRange.startIndex * itemHeight
  
  return (
    <div
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) =>
            renderItem(item, visibleRange.startIndex + index)
          )}
        </div>
      </div>
    </div>
  )
}

export const VirtualizedList = React.memo(VirtualizedListComponent) as typeof VirtualizedListComponent

// Optimized list item wrapper
export const OptimizedListItem = React.memo<{
  children: React.ReactNode
  onClick?: () => void
  className?: string
}>(({ children, onClick, className }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
})

OptimizedListItem.displayName = 'OptimizedListItem'