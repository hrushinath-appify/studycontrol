"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  quality?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

// Optimized image component with lazy loading and error handling
export const OptimizedImage = React.memo<OptimizedImageProps>(({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/placeholder.svg',
  quality = 85,
  priority = false,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setImageSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }, [imageSrc, fallbackSrc])

  const imageProps = {
    ref: imgRef,
    src: imageSrc,
    alt: alt,
    quality,
    priority,
    loading,
    placeholder,
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      hasError && 'grayscale'
    ),
    ...(width && { width }),
    ...(height && { height }),
    ...(blurDataURL && { blurDataURL }),
  } as const

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-gray-400 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

// Utility for preloading critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Utility for preloading multiple images
export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage))
}