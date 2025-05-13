'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    // Initialize
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Simple decorative dots in the background - no animation for better performance
    const drawParticles = () => {
      const particleCount = Math.min(window.innerWidth / 20, 50) // Fewer particles for better performance
      const isDark = resolvedTheme === 'dark'
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 3 + 1
        
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
        
        // Draw some connecting lines for decoration
        if (i > 0 && i % 4 === 0) {
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
    }
  }, [resolvedTheme])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none -z-20 opacity-30"
    />
  )
} 