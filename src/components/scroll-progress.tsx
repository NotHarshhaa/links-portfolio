'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-hidden
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full bg-foreground transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
