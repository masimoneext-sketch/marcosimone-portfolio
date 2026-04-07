import { motion, AnimatePresence } from 'framer-motion'

interface SplashProps {
  onComplete: () => void
}

export default function Splash({ onComplete }: SplashProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0f0e1a' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ width: '420px', maxWidth: '85vw' }}
        >
          <img src="/logo.svg" alt="Marco Simone Solutions" style={{ width: '100%' }} />
        </motion.div>

        {/* Tagline sotto il logo */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          style={{
            color: '#AFA9EC',
            fontSize: '13px',
            letterSpacing: '3px',
            marginTop: '8px',
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          LEARN · CODE · EVOLVE
        </motion.p>

        {/* Trigger exit dopo 2.4s */}
        <motion.div
          initial={false}
          animate={{}}
          onAnimationComplete={() => {
            setTimeout(onComplete, 2400)
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
