'use client'

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode
} from 'react'
import { cn } from '@/lib/utils'

type MagnetProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  /** Distance (px) from the element's edge where the magnet activates */
  padding?: number
  disabled?: boolean
  /** Higher values dampen the pull (offset = cursor distance / strength) */
  magnetStrength?: number
  activeTransition?: string
  inactiveTransition?: string
  wrapperClassName?: string
  innerClassName?: string
}

/** Cursor-attracted wrapper, ported from the reference portfolio's
 *  ui/Magnet component. */
export function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName,
  innerClassName = 'text-center',
  ...props
}: MagnetProps) {
  const [magnet, setMagnet] = useState<{
    isActive: boolean
    x: number
    y: number
  }>({ isActive: false, x: 0, y: 0 })
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return

      const { left, top, width, height } =
        magnetRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const distX = Math.abs(centerX - e.clientX)
      const distY = Math.abs(centerY - e.clientY)

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setMagnet({
          isActive: true,
          x: (e.clientX - centerX) / magnetStrength,
          y: (e.clientY - centerY) / magnetStrength
        })
      } else {
        setMagnet({ isActive: false, x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, disabled, magnetStrength])

  const position = disabled ? { x: 0, y: 0 } : magnet

  return (
    <div
      ref={magnetRef}
      className={cn('relative inline-block', wrapperClassName)}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: magnet.isActive ? activeTransition : inactiveTransition,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  )
}
