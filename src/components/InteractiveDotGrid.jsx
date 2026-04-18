import { useEffect, useRef } from 'react'

const DOT_SPACING    = 26
const DOT_SIZE       = 1.5
const REPEL_RADIUS   = 175
const REPEL_STRENGTH = 68
const LERP_SPEED     = 0.11

export default function InteractiveDotGrid({ isDark, containerRef }) {
  const canvasRef   = useRef(null)
  const mousePos    = useRef({ x: -9999, y: -9999 })
  const dotsRef     = useRef([])
  const needsUpdate = useRef(true)
  const rafRef      = useRef()

  const initDots = (w, h) => {
    const cols = Math.ceil(w / DOT_SPACING)
    const rows = Math.ceil(h / DOT_SPACING)
    dotsRef.current = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * DOT_SPACING + DOT_SPACING / 2
        const y = r * DOT_SPACING + DOT_SPACING / 2
        dotsRef.current.push({
          ox: x, oy: y, cx: x, cy: y, col: c, row: r,
          /* fixed per-dot angle bias → organic scatter look */
          bias: (Math.random() - 0.5) * 0.9,
        })
      }
    }
  }

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef?.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const dotColor = isDark
      ? 'rgba(255, 255, 255, 0.22)'
      : 'rgba(0, 0, 0, 0.18)'

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
      initDots(canvas.width, canvas.height)
      needsUpdate.current = true
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const el = container ?? canvas
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      needsUpdate.current = true
    }
    const onMouseLeave = () => {
      mousePos.current = { x: -9999, y: -9999 }
      needsUpdate.current = true
    }
    el.addEventListener('mousemove',  onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    const checkR = Math.ceil(REPEL_RADIUS / DOT_SPACING) + 1

    const animate = () => {
      if (needsUpdate.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const mCol = Math.floor(mousePos.current.x / DOT_SPACING)
        const mRow = Math.floor(mousePos.current.y / DOT_SPACING)

        ctx.fillStyle = dotColor
        ctx.beginPath()

        let moving = false

        dotsRef.current.forEach(dot => {
          let tx = dot.ox
          let ty = dot.oy

          if (Math.abs(dot.col - mCol) <= checkR && Math.abs(dot.row - mRow) <= checkR) {
            const dx   = dot.ox - mousePos.current.x
            const dy   = dot.oy - mousePos.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < REPEL_RADIUS && dist > 0) {
              /* cosine falloff — strong at center, fades at edge */
              const t     = dist / REPEL_RADIUS
              const force = (Math.cos(t * Math.PI) + 1) / 2
              const push  = REPEL_STRENGTH * force

              /* base direction away from cursor + per-dot angle bias */
              const angle = Math.atan2(dy, dx) + dot.bias
              tx = dot.ox + Math.cos(angle) * push
              ty = dot.oy + Math.sin(angle) * push
            }
          }

          dot.cx += (tx - dot.cx) * LERP_SPEED
          dot.cy += (ty - dot.cy) * LERP_SPEED

          if (Math.abs(dot.cx - tx) > 0.08 || Math.abs(dot.cy - ty) > 0.08) moving = true

          ctx.moveTo(dot.cx + DOT_SIZE / 2, dot.cy)
          ctx.arc(dot.cx, dot.cy, DOT_SIZE / 2, 0, Math.PI * 2)
        })

        ctx.fill()
        needsUpdate.current = moving
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      el.removeEventListener('mousemove',  onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isDark, containerRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
