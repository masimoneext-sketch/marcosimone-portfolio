import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0f0e1a' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Logo grande */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ width: '680px', maxWidth: '92vw' }}
      >
        <img src="/logo.svg" alt="Marco Simone Solutions" style={{ width: '100%' }} />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
        style={{
          color: '#7F77DD',
          fontSize: '12px',
          letterSpacing: '4px',
          marginTop: '4px',
          fontFamily: "'Segoe UI', Arial, sans-serif",
        }}
      >
        LEARN · CODE · EVOLVE
      </motion.p>

      {/* Barra di caricamento */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '48px',
          width: '120px',
          height: '2px',
          background: 'rgba(127, 119, 221, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #7F77DD, #5DCAA5)',
            borderRadius: '2px',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
