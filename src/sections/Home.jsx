import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Marquee from '../components/Marquee'
import InteractiveDotGrid from '../components/InteractiveDotGrid'
import useStore from '../store/useStore'

/* 클립 와이프업 리빌 */
function Reveal({ children, delay = 0 }) {
  return (
    <div className="clip-wrapper">
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* Rolling Text — 캐릭터 단위 롤업 (Framer Rolling Text 방식) */
function RollingChar({ char, delay }) {
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.08em' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  )
}

function RollingText({ text, delay = 0 }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {text.split('').map((char, i) => (
        <RollingChar key={i} char={char} delay={delay + i * 0.038} />
      ))}
    </span>
  )
}

/* 스크롤 아이콘 (mouse wheel style) */
function ScrollIcon() {
  return (
    <div className="scroll-icon">
      <div className="scroll-mouse">
        <motion.div
          className="scroll-wheel"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      <span>Scroll</span>
    </div>
  )
}

/* 마그네틱 버튼 */
function MagneticBtn({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22 })
  const sy = useSpring(y, { stiffness: 260, damping: 22 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.32)
    y.set((e.clientY - r.top - r.height / 2) * 0.32)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  const { isDark } = useStore()
  const heroRef = useRef(null)

  return (
    <>
      <section id="home" className="hero" ref={heroRef}>
        <InteractiveDotGrid isDark={isDark} containerRef={heroRef} />
        <div className="container hero-inner">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="hero-badge">
              <span className="avail-dot" />
              Open to Work · Full Stack Developer
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="hero-heading">
            {/* Rolling Text on FULL STACK */}
            <RollingText text="FULL STACK" delay={0.34} />
            <Reveal delay={0.9}>
              <em>DEVELOPER</em>.
            </Reveal>
          </h1>

          {/* CTA */}
          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticBtn className="btn-primary" onClick={() => scrollTo('works')}>
              View Projects →
            </MagneticBtn>
            <MagneticBtn className="btn-ghost" onClick={() => scrollTo('contact')}>
              Contact
            </MagneticBtn>
          </motion.div>
        </div>

        <ScrollIcon />
      </section>

      <Marquee />
    </>
  )
}
