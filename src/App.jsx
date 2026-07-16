import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Works from './sections/Works'
import Contact from './sections/Contact'
import Resume from './pages/Resume'
import useStore from './store/useStore'

const SECTIONS = ['home', 'about', 'works', 'contact']

function MainPage() {
  const { setActiveSection } = useStore()

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [setActiveSection])

  return (
    <main>
      <Home />
      <About />
      <Works />
      <Contact />
    </main>
  )
}

export default function App() {
  const { isDark } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </div>
  )
}
