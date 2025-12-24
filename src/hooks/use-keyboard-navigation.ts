'use client'

import { useEffect, RefObject } from 'react'

/**
 * Hook to enhance keyboard navigation
 * Provides keyboard shortcuts and improved focus management
 */
export function useKeyboardNavigation(containerRef?: RefObject<HTMLElement>) {
  useEffect(() => {
    const handleKeyDown = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent
      // Escape key to close modals/dropdowns
      if (keyboardEvent.key === 'Escape') {
        // Focus the main content when escape is pressed
        const mainContent = document.getElementById('main-content')
        if (mainContent && document.activeElement !== mainContent) {
          mainContent.focus()
        }
      }

      // Keyboard shortcut for search (Ctrl/Cmd + K)
      if ((keyboardEvent.ctrlKey || keyboardEvent.metaKey) && keyboardEvent.key === 'k') {
        keyboardEvent.preventDefault()
        // Future: Could open search modal
      }
    }

    const container = containerRef?.current || document
    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [containerRef])

  return null
}

