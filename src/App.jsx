import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Works from './sections/Works'
import Contact from './sections/Contact'
import useStore from './store/useStore'

const SECTIONS = ['home', 'about', 'works', 'contact']

export default function App() {
  const { isDark, setActiveSection } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

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
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <About />
        <Works />
        <Contact />
      </main>
    </div>
  )
}
