import { motion } from 'framer-motion'

const sections = [
  { id: 'home',    label: 'Home',    dot: '⌂' },
  { id: 'about',   label: 'About',   dot: '◎' },
  { id: 'works',   label: 'Works',   dot: '◫' },
  { id: 'contact', label: 'Contact', dot: '✉' },
]

export default function StageStrip({ activeSection, onNavigate }) {
  return (
    <motion.aside
      className="stage-strip"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {sections.map((s, i) => (
        <motion.button
          key={s.id}
          className={`strip-item${activeSection === s.id ? ' strip-active' : ''}`}
          onClick={() => onNavigate(s.id)}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="strip-dot">{s.dot}</span>
          <span className="strip-label">{s.label}</span>
          {activeSection === s.id && (
            <motion.div
              layoutId="strip-indicator"
              className="strip-indicator"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
        </motion.button>
      ))}
    </motion.aside>
  )
}
