import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ── Silky Mouse Trail (ported from framer.com/marketplace/components/silky-mouse-trail) ── */
function SilkyMouseTrail({ sectionRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrapper = sectionRef.current
    const canvas  = canvasRef.current
    if (!wrapper || !canvas) return

    const ctx = canvas.getContext('2d')

    const S = {
      length:           60,
      headWidth:        7,
      tailWidth:        0,
      headColor:        [255, 77, 0, 0.92],   // accent orange, opaque
      tailColor:        [255, 77, 0, 0],       // transparent tail
      damping:          0.55,
      inertiaRetention: 0.8,
      inertiaInfluence: 0.3,
      inertiaStrength:  0.025,
      speedInfluence:   0.9,
      speedMax:         600,
      speedSmoothing:   0.2,
    }

    const mk = () => Array.from({ length: S.length }, () => ({ x: 0, y: 0, vx: 0, vy: 0, nx: 0, ny: 0 }))

    const state = {
      points:      mk(),
      leftEdges:   Array.from({ length: S.length }, () => ({ x: 0, y: 0 })),
      rightEdges:  Array.from({ length: S.length }, () => ({ x: 0, y: 0 })),
      mouse:       { x: 0, y: 0 },
      lastMouse:   { x: 0, y: 0 },
      lastTime:    performance.now(),
      speedRatio:  0,
      isActive:    false,
      w: 0, h: 0,
      rect:        new DOMRect(),
    }

    let raf = null
    let visible = false

    const updateRect = () => {
      state.rect = wrapper.getBoundingClientRect()
      state.w = state.rect.width
      state.h = state.rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width  = state.w * dpr
      canvas.height = state.h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (e) => {
      const r = state.rect
      const inside = e.clientX >= r.left && e.clientX <= r.right &&
                     e.clientY >= r.top  && e.clientY <= r.bottom
      if (!inside) { state.isActive = false; return }

      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const now = performance.now()

      if (!state.isActive) {
        state.isActive = true
        state.lastMouse = { x, y }
        state.mouse     = { x, y }
        state.lastTime  = now
        state.points.forEach(p => { p.x = x; p.y = y; p.vx = 0; p.vy = 0 })
        return
      }

      const dt    = Math.max(1, now - state.lastTime) / 1000
      const dist  = Math.hypot(x - state.lastMouse.x, y - state.lastMouse.y)
      const speed = dist / dt
      state.speedRatio += (Math.min(1, speed / S.speedMax) - state.speedRatio) * S.speedSmoothing
      state.lastMouse = { x, y }
      state.lastTime  = now
      state.mouse.x = x
      state.mouse.y = y
    }

    const physics = () => {
      if (!state.isActive) return
      const sm = 1 + S.speedInfluence * state.speedRatio
      const head = state.points[0]
      let rdx = state.mouse.x - head.x
      let rdy = state.mouse.y - head.y

      if (Math.abs(rdx) < 0.1 && Math.abs(rdy) < 0.1 && Math.abs(head.vx) < 0.1 && Math.abs(head.vy) < 0.1) {
        head.x = state.mouse.x; head.y = state.mouse.y
        head.vx = 0; head.vy = 0; rdx = 0; rdy = 0
      }

      const pull = S.damping + 0.1
      const dx = rdx * pull, dy = rdy * pull
      head.vx = head.vx * S.inertiaRetention + dx * S.inertiaInfluence * sm
      head.vy = head.vy * S.inertiaRetention + dy * S.inertiaInfluence * sm
      head.x += dx + head.vx * S.inertiaStrength * sm
      head.y += dy + head.vy * S.inertiaStrength * sm

      for (let i = 1; i < S.length; i++) {
        const prev = state.points[i - 1], curr = state.points[i]
        const ddx = (prev.x - curr.x) * S.damping
        const ddy = (prev.y - curr.y) * S.damping
        curr.vx = curr.vx * S.inertiaRetention + ddx * S.inertiaInfluence * 2
        curr.vy = curr.vy * S.inertiaRetention + ddy * S.inertiaInfluence * 4
        curr.x += ddx + curr.vx * S.inertiaStrength
        curr.y += ddy + curr.vy * S.inertiaStrength
      }
    }

    const edges = () => {
      const sm  = 1 + S.speedInfluence * state.speedRatio
      const p   = state.points
      const len = p.length
      const MIN = 0.5

      for (let i = 0; i < len; i++) {
        const prog = i / (len - 1)
        const w    = (S.headWidth * (1 - prog) + S.tailWidth * prog) * sm
        const curr = p[i], next = p[i + 1] || p[i], prev = p[i - 1] || p[i]
        let nx = curr.nx || 0, ny = curr.ny || 0

        if (i === 0) {
          const dx = next.x - curr.x, dy = next.y - curr.y
          const d2 = dx * dx + dy * dy
          if (d2 > MIN) { const d = 1 / Math.sqrt(d2); nx = -dy * d; ny = dx * d }
        } else if (i === len - 1) {
          const dx = curr.x - prev.x, dy = curr.y - prev.y
          const d2 = dx * dx + dy * dy
          if (d2 > MIN) { const d = 1 / Math.sqrt(d2); nx = -dy * d; ny = dx * d }
          else          { nx = p[i - 1].nx; ny = p[i - 1].ny }
        } else {
          const dx1 = curr.x - prev.x, dy1 = curr.y - prev.y
          const dx2 = next.x - curr.x, dy2 = next.y - curr.y
          const d1 = dx1*dx1 + dy1*dy1, d2 = dx2*dx2 + dy2*dy2
          if (d1 > MIN || d2 > MIN) {
            let nx1 = 0, ny1 = 0, nx2 = 0, ny2 = 0
            if (d1 > 1e-10) { const r = 1/Math.sqrt(d1); nx1 = -dy1*r; ny1 = dx1*r }
            if (d2 > 1e-10) { const r = 1/Math.sqrt(d2); nx2 = -dy2*r; ny2 = dx2*r }
            nx = (nx1 + nx2) / 2; ny = (ny1 + ny2) / 2
            const sq = nx*nx + ny*ny
            if (sq > 1e-10) { const r = 1/Math.sqrt(sq); nx *= r; ny *= r }
          } else { nx = p[i - 1].nx; ny = p[i - 1].ny }
        }

        curr.nx = nx; curr.ny = ny
        const hw = w / 2
        state.leftEdges[i].x  = curr.x + nx * hw; state.leftEdges[i].y  = curr.y + ny * hw
        state.rightEdges[i].x = curr.x - nx * hw; state.rightEdges[i].y = curr.y - ny * hw
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, state.w, state.h)
      if (!state.isActive) return
      const len = S.length
      const [hr, hg, hb, ha] = S.headColor
      const [tr, tg, tb, ta] = S.tailColor

      for (let i = 0; i < len - 1; i++) {
        const p1 = i / (len - 1), p2 = (i + 1) / (len - 1)
        const lerp = (a, b, t) => a + (b - a) * t
        const a1 = ha + (ta - ha) * p1, a2 = ha + (ta - ha) * p2
        const r1 = Math.round(lerp(hr, tr, p1)), g1 = Math.round(lerp(hg, tg, p1)), b1 = Math.round(lerp(hb, tb, p1))
        const r2 = Math.round(lerp(hr, tr, p2)), g2 = Math.round(lerp(hg, tg, p2)), b2 = Math.round(lerp(hb, tb, p2))
        const curr = state.points[i], next = state.points[i + 1]
        const dsq  = (next.x - curr.x) ** 2 + (next.y - curr.y) ** 2

        ctx.beginPath()
        ctx.moveTo(state.leftEdges[i].x,   state.leftEdges[i].y)
        ctx.lineTo(state.leftEdges[i+1].x, state.leftEdges[i+1].y)
        ctx.lineTo(state.rightEdges[i+1].x,state.rightEdges[i+1].y)
        ctx.lineTo(state.rightEdges[i].x,  state.rightEdges[i].y)
        ctx.closePath()

        if (dsq > 0.25) {
          const grad = ctx.createLinearGradient(curr.x, curr.y, next.x, next.y)
          grad.addColorStop(0, `rgba(${r1},${g1},${b1},${a1})`)
          grad.addColorStop(1, `rgba(${r2},${g2},${b2},${a2})`)
          ctx.fillStyle = grad
        } else {
          ctx.fillStyle = `rgba(${r1},${g1},${b1},${a1})`
        }
        ctx.fill()
      }
    }

    const tick = () => {
      if (!visible) return
      physics(); edges(); draw()
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        updateRect()
        if (!raf) { state.lastTime = performance.now(); tick() }
      } else {
        if (raf) { cancelAnimationFrame(raf); raf = null }
      }
    }, { threshold: 0 })
    io.observe(wrapper)

    const ro = new ResizeObserver(updateRect)
    ro.observe(wrapper)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll',      updateRect,    { passive: true })

    return () => {
      io.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll',      updateRect)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

const projects = [
  {
    num: '01',
    title: '62댕냥이',
    tagline: '유기동물 입양·임시보호 매칭 플랫폼',
    description: '전국 유기동물 보호소 데이터를 통합하고 JWT 이중 토큰 + OAuth2 소셜 로그인으로 안전한 인증 시스템을 직접 설계했습니다.',
    role: 'Backend · Spring Security · JWT 설계',
    year: '2026.01',
    tags: ['Java 21', 'Spring Boot 3.2', 'Spring Security', 'JWT', 'OAuth2', 'JPA', 'MySQL'],
    contributions: [
      'JWT Access / Refresh 이중 토큰 구조 직접 설계 및 구현',
      'Spring Security 필터 체인 커스터마이징',
      'Google · Kakao OAuth2 소셜 로그인 연동',
      '역할 기반 API 접근 제어 (RBAC) 구현',
    ],
    github: 'https://github.com/jhyeon9185/62-daeng-nyang-public',
    pdf: `${import.meta.env.BASE_URL}portfolio_v3.pdf`,
  },
  {
    num: '02',
    title: 'DAYPOO',
    tagline: '실시간 공공데이터 기반 건강 관리 서비스',
    description: 'Vite 번들 66% 감소, SSE 인증 보안 이슈 직접 해결, PWA로 iOS 크로스플랫폼 대응까지 — 성능과 안정성을 함께 개선했습니다.',
    role: 'Frontend · UI/UX 설계',
    year: '2026.03',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SSE', 'PWA', 'Redis'],
    contributions: [
      'Vite 번들 최적화로 66% 감소 (1.8MB → 620KB)',
      'SSE 인증 구조 설계 및 보안 이슈 직접 해결',
      'Redis 기반 실시간 랭킹 시스템 연동',
      'PWA 적용으로 iOS 크로스 플랫폼 대응',
    ],
    github: 'https://github.com/jhyeon9185/daypoo',
    pdf: `${import.meta.env.BASE_URL}portfolio_v3.pdf`,
  },
]

function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <article
        className="pcard"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="pcard-ghost"
          style={{ transform: hover ? 'translate(-16px, 10px)' : 'none', transition: 'transform 0.4s cubic-bezier(.2,.9,.3,1.4)' }}
        >
          {project.num}
        </div>

        <div className="pcard-left">
          <div className="pcard-meta">
            <span className="pcard-line" />
            <span>{project.year} · {project.role}</span>
          </div>

          <h3 className="pcard-title">{project.title}</h3>
          <p className="pcard-tagline">{project.tagline}</p>
          <p className="pcard-desc">{project.description}</p>

          <div className="pcard-tags">
            {project.tags.map((t) => (
              <span key={t} className="pcard-tag">{t}</span>
            ))}
          </div>

          <div
            className="pcard-reveal"
            style={{
              maxHeight: hover ? '240px' : '0',
              opacity: hover ? 1 : 0,
              transition: 'max-height 0.5s cubic-bezier(.2,.7,.2,1), opacity 0.4s',
            }}
          >
            <div className="pcard-reveal-inner">
              {project.contributions.map((c, i) => (
                <div key={i} className="pcard-contrib">
                  <span className="pcard-bullet">✦</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="pcard-cta"
            style={{ opacity: hover ? 1 : 0.55, transition: 'opacity 0.3s' }}
          >
            자세히 보기
            <span style={{ display: 'inline-block', transform: hover ? 'translateX(6px)' : 'translateX(0)', transition: 'transform 0.3s' }}>→</span>
          </a>
        </div>

        <div className="pcard-right">
          <div className="pcard-links-panel">
            <p className="pcard-links-label">Links</p>
            <div className="pcard-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="pcard-link">
                  <span className="pcard-link-icon">↗</span>
                  GitHub
                </a>
              )}
              {project.pdf && (
                <a href={project.pdf} target="_blank" rel="noreferrer" className="pcard-link">
                  <span className="pcard-link-icon">↗</span>
                  Portfolio PDF
                </a>
              )}
            </div>
          </div>
          <div className="pcard-num-badge">{project.num}</div>
        </div>
      </article>
    </motion.div>
  )
}

export default function Works() {
  const sectionRef = useRef(null)

  return (
    <section id="works" className="works" ref={sectionRef}>
      <SilkyMouseTrail sectionRef={sectionRef} />
      <div className="container" style={{ width: '100%' }}>
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-num">03</span>
          <span className="section-line" />
          <span>Works</span>
        </motion.div>

        <motion.div
          className="works-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="works-title">Selected Works</h2>
          <span className="works-count">0{projects.length} Projects</span>
        </motion.div>

        <div className="pcard-list">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
