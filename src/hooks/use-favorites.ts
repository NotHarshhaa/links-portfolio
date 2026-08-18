'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'link-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as unknown
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((item) => typeof item === 'string'))
        }
      }
    } catch {
      setFavorites([])
    } finally {
      setReady(true)
    }
  }, [])

  const toggleFavorite = useCallback((url: string) => {
    setFavorites((current) => {
      const next = current.includes(url)
        ? current.filter((item) => item !== url)
        : [url, ...current]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (url: string) => favorites.includes(url),
    [favorites]
  )

  return {
    favorites,
    ready,
    toggleFavorite,
    isFavorite
  }
}
