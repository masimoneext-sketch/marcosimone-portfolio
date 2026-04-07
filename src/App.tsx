import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import Splash from './components/Splash'
import GlobalParticles from './components/GlobalParticles'
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
  const [engineReady, setEngineReady] = useState(false)

  // Inizializza il motore particelle UNA SOLA VOLTA all'avvio
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  return (
    <>
      <AnimatePresence>
        {!splashDone && (
          <Splash onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {/* Sempre montato, visibile solo dopo splash — engine non si reinizializza */}
      {engineReady && (
        <GlobalParticles visible={splashDone} />
      )}

      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="relative z-10">
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
        </div>
      </motion.div>
    </>
  )
}

export default App
