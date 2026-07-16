import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  SiReact, SiTypescript, SiOpenjdk, SiSpring,
  SiMysql, SiDocker, SiTailwindcss, SiGit,
  SiSlack, SiNotion, SiFigma, SiPython, SiOpenai,
} from 'react-icons/si'
import { LuFileText, LuMessagesSquare, LuArrowRight } from 'react-icons/lu'
const toolIcons = [
  { label: 'React',      Icon: SiReact },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Tailwind',   Icon: SiTailwindcss },
  { label: 'Java 21',    Icon: SiOpenjdk },
  { label: 'Spring',     Icon: SiSpring },
  { label: 'MySQL',      Icon: SiMysql },
  { label: 'Python',     Icon: SiPython },
  { label: 'OpenAI',     Icon: SiOpenai },
  { label: 'Docker',     Icon: SiDocker },
  { label: 'Git',        Icon: SiGit },
]

const collaboration = [
  { label: 'Slack',  Icon: SiSlack },
  { label: 'Notion', Icon: SiNotion },
  { label: 'Figma',  Icon: SiFigma },
]

const principles = [
  {
    Icon:  LuFileText,
    title: '문서화의 습관',
    desc:  '결과만큼 과정을 기록하여 팀의 기술 부채를 줄입니다.',
  },
  {
    Icon:  LuMessagesSquare,
    title: '유연한 소통',
    desc:  '디자인과 기획의 의도를 이해하고 최선의 기술적 대안을 제시합니다.',
  },
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

/* Stagger variants — 부모가 자식을 순차 애니메이션 */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const staggerItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div className="section-label" {...fadeUp()}>
          <span className="section-num">02</span>
          <span className="section-line" />
          <span>About</span>
        </motion.div>

        {/* ── 상단 2-col: 텍스트 | 사진+정보 ── */}
        <div className="about-grid">
          <div className="about-text">
            <motion.div {...fadeUp(0.05)}>
              <AnimatedHeading />
            </motion.div>

            <motion.p className="about-desc" {...fadeUp(0.1)}>
              백엔드 설계부터 프론트엔드까지,<br />
              서비스 전체를 직접 구현하는 Full Stack Developer.<br />
              실제 이슈를 끝까지 파고드는 것을 중요하게 생각합니다.
            </motion.p>
            
            <motion.div {...fadeUp(0.15)} style={{ marginTop: '30px' }}>
              <Link to="/resume" className="aurora-btn">
                이력서 보기 <LuArrowRight />
              </Link>
            </motion.div>
          </div>

          <div className="about-side">
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

        {/* ── 하단 2-col: Tech Stack | Collaboration ── */}
        <motion.div
          className="about-panels"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >

          {/* Tech Stack 패널 */}
          <motion.div className="about-panel" variants={staggerItem}>
            <motion.p className="panel-label" variants={staggerItem}>Tech Stack</motion.p>
            <motion.div
              className="tool-grid"
              variants={staggerContainer}
            >
              {toolIcons.map(({ label, Icon }) => (
                <motion.div
                  key={label}
                  className="tool-card"
                  variants={staggerItem}
                >
                  <Icon className="tool-icon" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Collaboration 패널 */}
          <motion.div className="about-panel" variants={staggerItem}>
            <motion.p className="panel-label" variants={staggerItem}>Collaboration</motion.p>

            {/* 툴 pill 행 */}
            <motion.div
              className="collab-tools-row"
              variants={staggerContainer}
            >
              {collaboration.map(({ label, Icon }) => (
                <motion.div
                  key={label}
                  className="collab-pill"
                  variants={staggerItem}
                >
                  <Icon className="collab-pill-icon" />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* 원칙 카드 */}
            <motion.div
              className="principles-list"
              variants={staggerContainer}
            >
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  className="principle-item"
                  variants={staggerItem}
                >
                  <div className="principle-head">
                    <span className="principle-icon-wrap">
                      <p.Icon className="principle-icon" />
                    </span>
                    <span className="principle-title">{p.title}</span>
                  </div>
                  <p className="principle-desc">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
