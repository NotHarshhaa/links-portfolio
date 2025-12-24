'use client'

import { useState, useEffect } from 'react'

interface LinkClick {
  url: string
  title: string
  timestamp: number
}

const STORAGE_KEY = 'link-clicks'
const MAX_STORED_CLICKS = 50

export function useLinkTracker() {
  const [recentClicks, setRecentClicks] = useState<LinkClick[]>([])

  useEffect(() => {
    // Load recent clicks from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setRecentClicks(JSON.parse(stored))
        } catch (e) {
          console.error('Failed to parse stored link clicks', e)
        }
      }
    }
  }, [])

  const trackClick = (url: string, title: string) => {
    if (typeof window === 'undefined') return

    const newClick: LinkClick = {
      url,
      title,
      timestamp: Date.now()
    }

    const updated = [newClick, ...recentClicks]
      .filter((click, index, self) => 
        index === self.findIndex((c) => c.url === click.url)
      )
      .slice(0, MAX_STORED_CLICKS)

    setRecentClicks(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const getClickCount = (url: string): number => {
    return recentClicks.filter(click => click.url === url).length
  }

  return {
    recentClicks,
    trackClick,
    getClickCount
  }
}

