'use client'

import { useCallback, useEffect, useState } from 'react'

export interface LinkVisit {
  url: string
  title: string
  lastVisited: number
  count: number
}

const STORAGE_KEY = 'link-visits'
const MAX_STORED = 20

function readVisits(): LinkVisit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const legacy = localStorage.getItem('link-clicks')
      if (!legacy) return []
      const parsed = JSON.parse(legacy) as Array<{
        url: string
        title: string
        timestamp: number
      }>
      return parsed.map((item) => ({
        url: item.url,
        title: item.title,
        lastVisited: item.timestamp,
        count: 1
      }))
    }
    return JSON.parse(stored) as LinkVisit[]
  } catch {
    return []
  }
}

export function useLinkTracker() {
  const [visits, setVisits] = useState<LinkVisit[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setVisits(readVisits())
    setReady(true)
  }, [])

  const trackClick = useCallback((url: string, title: string) => {
    setVisits((current) => {
      const existing = current.find((item) => item.url === url)
      const next: LinkVisit[] = existing
        ? [
            {
              ...existing,
              title,
              lastVisited: Date.now(),
              count: existing.count + 1
            },
            ...current.filter((item) => item.url !== url)
          ]
        : [
            { url, title, lastVisited: Date.now(), count: 1 },
            ...current
          ]

      const trimmed = next.slice(0, MAX_STORED)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
      return trimmed
    })
  }, [])

  return {
    visits,
    recentVisits: visits.slice(0, 5),
    trackClick,
    ready
  }
}
