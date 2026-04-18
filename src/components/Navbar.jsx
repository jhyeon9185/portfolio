import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuHouse, LuUser, LuBriefcase, LuMail, LuSun, LuMoon } from 'react-icons/lu'
import useStore from '../store/useStore'

const navLinks = [
  { label: 'Home',    id: 'home',    Icon: LuHouse },
  { label: 'About',   id: 'about',   Icon: LuUser },
  { label: 'Works',   id: 'works',   Icon: LuBriefcase },
  { label: 'Contact', id: 'contact', Icon: LuMail },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const { isDark, toggleTheme, activeSection } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  return (
    <>
      {/* 플로팅 pill 내비바 — FM y애니와 CSS translate 충돌 방지용 wrapper */}
      <div className="pill-nav-wrap">
        <motion.nav
          className="pill-nav"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`pill-link${activeSection === link.id ? ' pill-link-active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="pill-active"
                  className="pill-active-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <link.Icon size={13} />
              <span>{link.label}</span>
            </button>
          ))}
        </motion.nav>
      </div>

      {/* 테마 토글 — 우측 고정 */}
      <motion.button
        className="pill-theme"
        onClick={toggleTheme}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.88 }}
        aria-label="테마 전환"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isDark ? 'sun' : 'moon'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'flex' }}
          >
            {isDark ? <LuSun size={16} /> : <LuMoon size={16} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* 모바일 햄버거 */}
      <motion.button
        className={`hamburger-pill${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        aria-label="메뉴"
      >
        <span /><span /><span />
      </motion.button>

      {/* 모바일 메뉴 드롭다운 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                className="mobile-link"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
              >
                <link.Icon size={14} />
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
