import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'
import ReactTyped from 'react-typed'
import { Link } from 'react-scroll'
import { HiChevronDown } from 'react-icons/hi'

// Particles configuration
const particlesOptions: ISourceOptions = {
  background: {
    color: { value: 'transparent' },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: ['#7F77DD', '#5DCAA5'],
    },
    links: {
      color: '#3C3489',
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
}

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const stats = [
  { value: '5+', label: 'anni IT' },
  { value: '6', label: 'portali deployati' },
  { value: '45+', label: 'competenze' },
  { value: 'Roma', label: 'Italia' },
]

export default function Hero() {
  const [engineReady, setEngineReady] = useState(false)

  // Initialize tsparticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setEngineReady(true)
    })
  }, [])

  const particlesLoaded = useCallback(async () => {
    // optional: called when container is loaded
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* tsParticles background */}
      {engineReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-0"
          options={particlesOptions}
          particlesLoaded={particlesLoaded}
        />
      )}

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-radial-gradient pointer-events-none" />

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="text-gradient">Marco Simone</span>
        </motion.h1>

        {/* Typed roles */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 min-h-[2.5rem]"
        >
          <ReactTyped
            strings={[
              'Team Leader IT Service Desk',
              'AI Enthusiast & Builder',
              'IT Problem Solver',
              'AI Integration Expert',
            ]}
            typeSpeed={50}
            backSpeed={30}
            backDelay={2000}
            loop
            showCursor
            cursorChar="|"
            className="text-teal-400"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-purple-300/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          IT Professional con una forte passione per l'AI — costruisco soluzioni concrete che automatizzano e potenziano il supporto IT aziendale
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="projects" smooth duration={600} offset={-64}>
            <button className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500 transition-all duration-300 glow-purple hover:glow-teal shadow-lg cursor-pointer">
              Scopri i Progetti
            </button>
          </Link>

          <Link to="contact" smooth duration={600} offset={-64}>
            <button className="px-8 py-3 rounded-lg font-semibold text-purple-300 border border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 cursor-pointer">
              Contattami
            </button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-purple-300/70">
              {i > 0 && (
                <span className="hidden sm:inline text-purple-700 select-none">·</span>
              )}
              <span className="font-bold text-purple-300">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Link to="about" smooth duration={600} offset={-64}>
            <div className="w-9 h-9 rounded-full border border-purple-400/40 flex items-center justify-center text-purple-400/60 hover:text-purple-400 hover:border-purple-400 transition-colors cursor-pointer">
              <HiChevronDown size={18} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
