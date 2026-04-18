import { motion } from 'framer-motion'
import {
  SiReact, SiTypescript, SiOpenjdk, SiSpring,
  SiMysql, SiDocker, SiTailwindcss, SiGit,
} from 'react-icons/si'

const toolIcons = [
  // Frontend
  { label: 'React',      Icon: SiReact },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Tailwind',   Icon: SiTailwindcss },
  // Backend
  { label: 'Java 21',    Icon: SiOpenjdk },
  { label: 'Spring',     Icon: SiSpring },
  { label: 'MySQL',      Icon: SiMysql },
  // Infra
  { label: 'Docker',     Icon: SiDocker },
  { label: 'Git',        Icon: SiGit },
]

const experience = [
  { period: '2025.10 — 2026.04', title: '[기업연계형] ChatGPT 활용 및 DevOps 개발자 부트캠프' },
]

const infoLines = [
  { label: 'Role',     value: 'Full Stack Developer' },
  { label: 'Location', value: 'Seoul, Korea' },
  { label: 'Status',   value: 'Open to Work', accent: true },
]

function AnimatedHeading() {
  const lines = ['사용자 경험과', '시스템을 함께', '고민합니다.']
  return (
    <h2 className="about-heading">
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="heading-line"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </h2>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div className="section-label" {...fadeUp()}>
          <span className="section-num">02</span>
          <span className="section-line" />
          <span>About</span>
        </motion.div>

        <div className="about-grid">
          {/* Left */}
          <div className="about-text">
            <motion.div {...fadeUp(0.05)}>
              <AnimatedHeading />
            </motion.div>

            <motion.p className="about-desc" {...fadeUp(0.1)}>
              백엔드 설계부터 프론트엔드까지,<br />
              서비스 전체를 직접 구현하는 Full Stack Developer.<br />
              실제 이슈를 끝까지 파고드는 것을 중요하게 생각합니다.
            </motion.p>

            {/* Experience */}
            <motion.div className="about-exp" {...fadeUp(0.15)}>
              {experience.map((e) => (
                <div key={e.title} className="exp-item">
                  <span className="exp-period">{e.period}</span>
                  <span className="exp-title">{e.title}</span>
                </div>
              ))}
            </motion.div>

            {/* Tech Stack icon grid */}
            <motion.div className="about-skills" {...fadeUp(0.2)}>
              <p className="skills-heading">Tech Stack</p>
              <div className="tool-grid">
                {toolIcons.map(({ label, Icon }, i) => (
                  <motion.div
                    key={label}
                    className="tool-card"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <Icon className="tool-icon" />
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: photo + info */}
          <div className="about-side">
            {/* Photo — 보더 없이, 호버 시 귀여운 흔들림 */}
            <motion.div
              className="about-photo-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              whileHover={{ rotate: [0, -2, 2, -1, 1, 0], transition: { duration: 0.5, ease: 'easeInOut' } }}
              style={{ cursor: 'pointer' }}
            >
              <img src={`${import.meta.env.BASE_URL}profile.png`} alt="Baek Jonghyun" className="about-photo" />
            </motion.div>

            {/* Info card */}
            <div className="about-info">
              {infoLines.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="info-line"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.08 }}
                >
                  <span className="info-label">{item.label}</span>
                  <span className={`info-value${item.accent ? ' info-accent' : ''}`}>
                    {item.accent && <span className="info-dot" />}
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
