/**
 * Utility functions for smooth scrolling behavior
 */

export const scrollToElement = (
  elementId: string,
  options: {
    offset?: number
    behavior?: ScrollBehavior
    focus?: boolean
  } = {}
) => {
  const {
    offset = 100, // Default offset for fixed header
    behavior = 'smooth',
    focus = true
  } = options

  const element = document.getElementById(elementId)
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior
  })

  // Update URL without triggering scroll
  window.history.pushState(null, '', `#${elementId}`)

  // Focus the element for accessibility
  if (focus) {
    // Use setTimeout to ensure scroll completes before focusing
    setTimeout(() => {
      element.focus({ preventScroll: true })
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
    }, behavior === 'smooth' ? 500 : 0)
  }
}

export const handleAnchorClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (href.startsWith('#')) {
    e.preventDefault()
    const elementId = href.substring(1)
    scrollToElement(elementId)
  }
}

