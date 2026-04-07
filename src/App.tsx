import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Splash from './components/Splash'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Solutions from './components/Solutions'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!splashDone && (
          <Splash onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <motion.div
        className="bg-dark-900 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Navbar />
        <main>
          <section id="home"><Hero /></section>
          <section id="about"><About /></section>
          <section id="skills"><Skills /></section>
          <section id="projects"><Projects /></section>
          <section id="solutions"><Solutions /></section>
          <section id="experience"><Experience /></section>
          <section id="contact"><Contact /></section>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default App
