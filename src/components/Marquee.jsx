import { motion } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiVite, SiTailwindcss,
  SiOpenjdk, SiSpring, SiMysql, SiDocker, SiGit,
  SiNodedotjs, SiPostgresql,
} from 'react-icons/si'

const stack = [
  { label: 'React',        Icon: SiReact },
  { label: 'TypeScript',   Icon: SiTypescript },
  { label: 'JavaScript',   Icon: SiJavascript },
  { label: 'Vite',         Icon: SiVite },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'Java 21',      Icon: SiOpenjdk },
  { label: 'Spring Boot',  Icon: SiSpring },
  { label: 'MySQL',        Icon: SiMysql },
  { label: 'PostgreSQL',   Icon: SiPostgresql },
  { label: 'Node.js',      Icon: SiNodedotjs },
  { label: 'Docker',       Icon: SiDocker },
  { label: 'Git',          Icon: SiGit },
]

export default function Marquee() {
  const items = [...stack, ...stack]

  return (
    <div className="marquee">
      <div className="marquee-fade marquee-fade-l" />
      <div className="marquee-fade marquee-fade-r" />
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {items.map(({ label, Icon }, i) => (
          <span key={i} className="marquee-item">
            <Icon className="marquee-icon" aria-hidden />
            <span>{label}</span>
            <span className="marquee-sep" aria-hidden>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
