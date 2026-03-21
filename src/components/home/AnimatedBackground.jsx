import { useEffect, useRef, useContext } from 'react'
import { ThemeContext } from '../../App'

const PARTICLE_COUNT_DESKTOP = 65
const PARTICLE_COUNT_MOBILE = 30
const CONNECTION_DISTANCE = 130
const SPEED = 0.3

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    radius: Math.random() * 1.5 + 1,
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null)
  const { darkMode } = useContext(ThemeContext)
  const darkModeRef = useRef(darkMode)

  useEffect(() => {
    darkModeRef.current = darkMode
  }, [darkMode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const isMobile = window.innerWidth < 768
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    let particles = Array.from({ length: count }, () => createParticle(width, height))
    let animId = null
    let paused = false

    function draw() {
      if (paused) return
      ctx.clearRect(0, 0, width, height)

      const dark = darkModeRef.current
      const dotColor = dark ? 'rgba(68,149,209,' : 'rgba(0,90,160,'
      const lineColor = dark ? 'rgba(68,149,209,' : 'rgba(0,90,160,'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor + '0.6)'
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = lineColor + opacity + ')'
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    function handleVisibility() {
      paused = document.hidden
      if (!paused) draw()
    }

    function handleResize() {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
      particles = Array.from({ length: count }, () => createParticle(width, height))
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('resize', handleResize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
