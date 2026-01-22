'use client'

import { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  placeholder?: string | React.ReactNode
  className?: string
  width?: number
  height?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

export default function LazyImage({ 
  src, 
  alt, 
  placeholder = 'Loading...',
  className = '',
  width,
  height,
  objectFit = 'cover'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: load image immediately if IntersectionObserver is not supported
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    )
    
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }
    
    return () => {
      if (imgRef.current) {
        observer.disconnect()
      }
    }
  }, [])
  
  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-wrapper ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        position: 'relative',
        overflow: 'hidden',
        minHeight: height ? `${height}px` : '200px'
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          style={{
            width: '100%',
            height: height ? `${height}px` : 'auto',
            objectFit: objectFit
          }}
        />
      )}
      {!isLoaded && (
        <div className="image-placeholder">
          {placeholder}
        </div>
      )}
    </div>
  )
}
