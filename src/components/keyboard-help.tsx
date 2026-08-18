'use client'

import { useEffect, useState } from 'react'
import { Frame, FrameBody, FrameHeader } from '@/components/frame'

const shortcuts = [
  { keys: '⌘ K', action: 'Open command palette' },
  { keys: '/', action: 'Jump to a link' },
  { keys: 'F', action: 'Focus search' },
  { keys: '?', action: 'Show this help' },
  { keys: 'Esc', action: 'Close overlays' }
]

export function KeyboardHelp() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if (typing) return

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setOpen((value) => !value)
      }
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
    >
      <Frame className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <FrameHeader label="Shortcuts">
          <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </FrameHeader>
        <FrameBody className="p-0 sm:p-0">
          <ul>
            {shortcuts.map((item, index) => (
              <li
                key={item.action}
                className={
                  index < shortcuts.length - 1
                    ? 'flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6'
                    : 'flex items-center justify-between gap-4 px-4 py-3 sm:px-6'
                }
              >
                <span className="text-sm">{item.action}</span>
                <kbd className="border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {item.keys}
                </kbd>
              </li>
            ))}
          </ul>
        </FrameBody>
      </Frame>
    </div>
  )
}
