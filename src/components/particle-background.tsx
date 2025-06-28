'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      const container = document.documentElement
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    
    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Simple decorative dots in the background - no animation for better performance
    const drawParticles = () => {
      // Significantly reduce particles on mobile
      const particleCount = isMobile 
        ? Math.min(window.innerWidth / 60, 15) // Much fewer particles for mobile
        : Math.min(window.innerWidth / 20, 50)
      
      const isDark = resolvedTheme === 'dark'
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * (isMobile ? 2 : 3) + 1 // Smaller particles on mobile
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        
        // Safe coloring without TypeScript errors
        if (isDark) {
          ctx.fillStyle = i % 3 === 0 
            ? 'rgba(59, 130, 246, 0.5)'  // blue
            : i % 3 === 1 
              ? 'rgba(139, 92, 246, 0.5)'  // purple
              : 'rgba(16, 185, 129, 0.5)'  // green
        } else {
          ctx.fillStyle = i % 3 === 0 
            ? 'rgba(59, 130, 246, 0.2)'
            : i % 3 === 1 
              ? 'rgba(139, 92, 246, 0.2)'
              : 'rgba(16, 185, 129, 0.2)'
        }
        
        ctx.fill()
        
        // Draw connecting lines only on desktop
        if (!isMobile && i > 0 && i % 4 === 0) {
          const prevX = Math.random() * canvas.width
          const prevY = Math.random() * canvas.height
          
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(prevX, prevY)
          ctx.strokeStyle = isDark ? 'rgba(100, 150, 255, 0.1)' : 'rgba(100, 150, 255, 0.05)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    
    // Draw once - no animation for better performance
    drawParticles()
    
    // Only redraw on resize
    const handleResize = () => {
      resizeCanvas()
      drawParticles()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', checkMobile)
    }
  }, [resolvedTheme, isMobile])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none -z-20 opacity-30 w-full h-full"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  )
} 