import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEGMENTS = 8

function TubesCursor({ sectionRef }) {
  const dotRefs  = useRef([])
  const posRef   = useRef(Array.from({ length: SEGMENTS }, () => ({ x: -300, y: -300 })))
  const mouseRef = useRef({ x: -300, y: -300 })
  const activeRef = useRef(false)
  const timeRef  = useRef(0)
  const rafRef   = useRef()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const setOpacity = (active) => {
      dotRefs.current.forEach((d, i) => {
        if (!d) return
        d.style.opacity = active
          ? `${1 - i * 0.1}`
          : `${Math.max(0, 0.13 - i * 0.012)}`
      })
    }

    const onMove  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onEnter = () => { activeRef.current = true;  setOpacity(true)  }
    const onLeave = () => { activeRef.current = false; setOpacity(false) }

    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    setOpacity(false)

    const lerps = Array.from({ length: SEGMENTS }, (_, i) => 0.22 - i * 0.022)

    const tick = () => {
      timeRef.current += 0.007

      let head
      if (activeRef.current) {
        head = mouseRef.current
      } else {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width  * 0.5
        const cy = rect.top  + rect.height * 0.78
        const rx = rect.width  * 0.21
        const ry = rect.height * 0.1
        const t  = timeRef.current
        head = {
          x: cx + rx * Math.sin(t),
          y: cy + ry * Math.sin(t * 2),
        }
      }

      const chain = [head, ...posRef.current.slice(0, SEGMENTS - 1)]
      posRef.current = posRef.current.map((p, i) => ({
        x: p.x + (chain[i].x - p.x) * lerps[i],
        y: p.y + (chain[i].y - p.y) * lerps[i],
      }))

      posRef.current.forEach((pos, i) => {
        const d = dotRefs.current[i]
        if (!d) return
        const prev = i === 0 ? head : posRef.current[i - 1]
        const dx = prev.x - pos.x
        const dy = prev.y - pos.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
        const w = 10 - i * 0.6
        const h = w * 2.2
        d.style.transform = `translate(${pos.x - w / 2}px, ${pos.y - h / 2}px) rotate(${angle}deg)`
        d.style.width  = `${w}px`
        d.style.height = `${h}px`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [sectionRef])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <div
          key={i}
          ref={el => dotRefs.current[i] = el}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            borderRadius: '9999px',
            background: 'var(--accent)',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.5s',
            filter: i === 0 ? 'none' : `blur(${i * 0.3}px)`,
          }}
        />
      ))}
    </div>
  )
}

const projects = [
  {
    num: '01',
    title: '62댕냥이',
    subtitle: '유기동물 입양·임시보호 매칭 플랫폼',
    role: 'Backend · Spring Security · JWT 설계',
    year: '2026.01.26 — 02.13',
    tags: ['Java 21', 'Spring Boot 3.2', 'Spring Security', 'JWT', 'OAuth2', 'JPA', 'MySQL'],
    contributions: [
      'JWT Access / Refresh 이중 토큰 구조 직접 설계 및 구현',
      'Spring Security 필터 체인 커스터마이징',
      'Google · Kakao OAuth2 소셜 로그인 연동',
      '역할 기반 API 접근 제어 (RBAC) 구현',
    ],
    github: 'https://github.com/jhyeon9185/62-daeng-nyang-public',
    demo: null,
    pdf: `${import.meta.env.BASE_URL}portfolio_v2.pdf`,
  },
  {
    num: '02',
    title: 'DAYPOO',
    subtitle: '실시간 공공데이터 기반 건강 관리 서비스',
    role: 'Frontend · UI/UX 설계',
    year: '2026.03.19 — 04.09',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SSE', 'PWA', 'Redis'],
    contributions: [
      'Vite 번들 최적화로 66% 감소 (1.8MB → 620KB)',
      'SSE 인증 구조 설계 및 보안 이슈 직접 해결',
      'Redis 기반 실시간 랭킹 시스템 연동',
      'PWA 적용으로 iOS 크로스 플랫폼 대응',
    ],
    github: 'https://github.com/jhyeon9185/daypoo',
    demo: null,
    pdf: `${import.meta.env.BASE_URL}portfolio_v2.pdf`,
  },
]

/* 모달 */
function Modal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel wrapper — flex로 센터링, FM transform 충돌 방지 */}
          <div className="modal-wrapper">
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
            {/* Header */}
            <div className="modal-header">
              <div>
                <p className="modal-num">{project.num}</p>
                <h2 className="modal-title">{project.title}</h2>
                <p className="modal-subtitle">{project.subtitle}</p>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>
            </div>

            <div className="modal-divider" />

            {/* Meta */}
            <div className="modal-meta">
              <div className="modal-meta-item">
                <span className="modal-meta-label">Role</span>
                <span className="modal-meta-value">{project.role}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Period</span>
                <span className="modal-meta-value">{project.year}</span>
              </div>
            </div>

            <div className="modal-divider" />

            {/* Contributions */}
            <div className="modal-section">
              <p className="modal-section-label">Key Contributions</p>
              <ul className="modal-contributions">
                {project.contributions.map((c, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="modal-bullet">—</span>
                    {c}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="modal-divider" />

            {/* Tags */}
            <div className="modal-section">
              <p className="modal-section-label">Tech Stack</p>
              <div className="modal-tags">
                {project.tags.map((t) => (
                  <span key={t} className="work-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.github || project.demo || project.pdf) && (
              <>
                <div className="modal-divider" />
                <div className="modal-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="modal-link">
                      GitHub ↗
                    </a>
                  )}
                  {project.pdf && (
                    <a href={project.pdf} target="_blank" rel="noreferrer" className="modal-link">
                      Portfolio PDF ↗
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="modal-link modal-link-accent">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Works() {
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)

  return (
    <>
      <TubesCursor sectionRef={sectionRef} />
      <section id="works" className="works" ref={sectionRef}>
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

          <div className="work-list">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="work-divider" />
                <motion.button
                  className="work-row"
                  onClick={() => setSelected(project)}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div
                    className="work-row-bg"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <span className="work-num">{project.num}</span>

                  <div className="work-main">
                    <div className="work-title-row">
                      <motion.h3
                        className="work-title"
                        variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {project.title}
                      </motion.h3>
                      <span className="work-subtitle">{project.subtitle}</span>
                    </div>
                    <span className="work-role">{project.role} · {project.year}</span>
                  </div>

                  <div className="work-tags">
                    {project.tags.slice(0, 3).map((t) => (
                      <span key={t} className="work-tag">{t}</span>
                    ))}
                  </div>

                  <motion.span
                    className="work-arrow"
                    variants={{
                      rest: { x: 0, y: 0, color: 'var(--text-3)' },
                      hover: { x: 3, y: -3, color: 'var(--accent)' },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
            <div className="work-divider" />
          </div>
        </div>
      </section>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
