import React from 'react'
import { motion } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com/jhyeon9185' },
  { label: 'Portfolio PDF', href: `${import.meta.env.BASE_URL}portfolio_v3.pdf` },
]

function Reveal({ children, delay = 0 }) {
  return (
    <div className="clip-wrapper">
      <motion.div
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const shapes = [
  { type: 'circle',   size: 48,  x: '8%',  y: '15%', duration: 12, delay: 0 },
  { type: 'square',   size: 28,  x: '80%', y: '10%', duration: 16, delay: 1.5 },
  { type: 'ring',     size: 64,  x: '88%', y: '55%', duration: 20, delay: 0.8 },
  { type: 'triangle', size: 36,  x: '15%', y: '70%', duration: 14, delay: 2 },
  { type: 'circle',   size: 18,  x: '50%', y: '20%', duration: 10, delay: 0.5 },
  { type: 'square',   size: 44,  x: '70%', y: '75%', duration: 18, delay: 3 },
  { type: 'ring',     size: 30,  x: '30%', y: '85%', duration: 13, delay: 1 },
  { type: 'diamond',  size: 22,  x: '60%', y: '45%', duration: 15, delay: 2.5 },
  { type: 'circle',   size: 10,  x: '92%', y: '30%', duration: 9,  delay: 0.3 },
  { type: 'triangle', size: 26,  x: '5%',  y: '45%', duration: 17, delay: 1.8 },
]

function Shape({ type, size, x, y, duration, delay }) {
  const floatY = size * 0.6
  const floatX = size * 0.3

  return (
    <motion.div
      className={`bg-shape bg-shape--${type}`}
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -floatY, floatY * 0.5, 0],
        x: [0, floatX, -floatX * 0.6, 0],
        rotate: type === 'circle' || type === 'ring' ? 0 : [0, 15, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      {/* 떠다니는 도형 배경 */}
      <div className="bg-shapes" aria-hidden>
        {shapes.map((s, i) => <Shape key={i} {...s} />)}
      </div>

      <div className="container contact-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-num">04</span>
          <span className="section-line" />
          <span>Contact</span>
        </motion.div>

        <div className="contact-content">
          <h2 className="contact-heading">
            <Reveal delay={0.05}>Ready</Reveal>
            <Reveal delay={0.17}>To</Reveal>
            <Reveal delay={0.29}><em>Connect.</em></Reveal>
          </h2>

          <motion.div
            className="contact-links-right"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="contact-link-group">
              <span className="contact-link-label">Get in touch</span>
              <a href="mailto:uoou9677@gmail.com" className="contact-email-large">
                uoou9677@gmail.com
              </a>
              <a href="tel:010-8722-9185" className="contact-phone">
                010.8722.9185
              </a>
            </div>

            <div className="contact-link-group">
              <span className="contact-link-label">Socials</span>
              <div className="contact-social-vertical">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-link-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label} <span className="arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer-divider" />

      {/* 새로운 프리미엄 푸터 섹션 추가 */}
      <footer className="footer-section">
        <div className="container" style={{ width: '100%', maxWidth: '1400px' }}>
          <div className="footer-main">
            <div className="footer-left">
              <p className="footer-address">
                Based in Seoul, South Korea<br />
                Available for worldwide projects.
              </p>
              <div className="footer-contact-text" style={{ marginTop: '1.5rem' }}>
                <a href="tel:010-8722-9185" style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-2)' }}>
                  010.8722.9185
                </a>
              </div>
              <div className="footer-copy" style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.75rem' }}>
                © 2026 Baek Jong Hyeon. All rights reserved.
              </div>
            </div>

            <div className="footer-right">
              <nav className="footer-nav">
                <a href="#home" className="footer-nav-link">HOME</a>
                <a href="#about" className="footer-nav-link">ABOUT</a>
                <a href="#works" className="footer-nav-link">WORKS</a>
                <a href="#contact" className="footer-nav-link active">CONTACT</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
