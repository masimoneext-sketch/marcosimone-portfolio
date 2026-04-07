import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashProps {
  onComplete: () => void
}

// SVG inline per garantire che le animazioni girino
const LogoSVG = () => (
  <svg width="100%" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>{`
        @keyframes pulse {
          0%, 100% { r: 7; opacity: 1; }
          50% { r: 9; opacity: 0.7; }
        }
        @keyframes pulseCenter {
          0%, 100% { r: 9; opacity: 1; }
          50% { r: 11; opacity: 0.6; }
        }
        @keyframes flowLine {
          0% { stroke-dashoffset: 20; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes flowLineGreen {
          0% { stroke-dashoffset: 0; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 20; opacity: 0.3; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); transform-origin: 152px 140px; }
          to { transform: rotate(360deg); transform-origin: 152px 140px; }
        }
        .splash-node-side { animation: pulse 2.4s ease-in-out infinite; }
        .splash-node-s1 { animation-delay: 0s; }
        .splash-node-s2 { animation-delay: 0.4s; }
        .splash-node-s3 { animation-delay: 0.8s; }
        .splash-node-s4 { animation-delay: 1.2s; }
        .splash-node-s5 { animation-delay: 1.6s; }
        .splash-node-mid { animation: pulseCenter 2s ease-in-out infinite; }
        .splash-node-m1 { animation-delay: 0.2s; }
        .splash-node-m2 { animation-delay: 0.7s; }
        .splash-node-m3 { animation-delay: 1.2s; }
        .splash-conn-purple { stroke-dasharray: 6 4; animation: flowLine 2s linear infinite; }
        .splash-conn-green { stroke-dasharray: 6 4; animation: flowLineGreen 2s linear infinite; }
        .splash-d1 { animation-delay: 0s; }
        .splash-d2 { animation-delay: 0.3s; }
        .splash-d3 { animation-delay: 0.6s; }
        .splash-d4 { animation-delay: 0.9s; }
        .splash-d5 { animation-delay: 1.2s; }
        .splash-d6 { animation-delay: 1.5s; }
        .splash-ring { animation: ringRotate 18s linear infinite; }
        .splash-text-1 { animation: fadeInUp 0.8s ease-out 0.2s both; }
        .splash-text-2 { animation: fadeInUp 0.8s ease-out 0.5s both; }
        .splash-text-3 { animation: fadeInUp 0.8s ease-out 0.8s both; }
      `}</style>
    </defs>

    <rect width="680" height="280" rx="16" fill="#0f0e1a"/>

    <circle className="splash-ring" cx="152" cy="140" r="88" stroke="#3C3489" strokeWidth="0.8" fill="none" strokeDasharray="4 3"/>

    <line className="splash-conn-purple splash-d1" x1="101" y1="110" x2="143" y2="97"  stroke="#7F77DD" strokeWidth="1"/>
    <line className="splash-conn-purple splash-d2" x1="101" y1="110" x2="143" y2="128" stroke="#7F77DD" strokeWidth="1"/>
    <line className="splash-conn-purple splash-d3" x1="101" y1="140" x2="143" y2="128" stroke="#7F77DD" strokeWidth="1.5"/>
    <line className="splash-conn-purple splash-d4" x1="101" y1="140" x2="143" y2="161" stroke="#7F77DD" strokeWidth="1"/>
    <line className="splash-conn-purple splash-d5" x1="101" y1="170" x2="143" y2="161" stroke="#7F77DD" strokeWidth="1"/>
    <line className="splash-conn-purple splash-d6" x1="101" y1="170" x2="143" y2="128" stroke="#534AB7" strokeWidth="0.6"/>

    <line className="splash-conn-green splash-d1" x1="161" y1="97"  x2="203" y2="115" stroke="#1D9E75" strokeWidth="1"/>
    <line className="splash-conn-green splash-d2" x1="161" y1="128" x2="203" y2="115" stroke="#1D9E75" strokeWidth="2"/>
    <line className="splash-conn-green splash-d3" x1="161" y1="128" x2="203" y2="165" stroke="#1D9E75" strokeWidth="1"/>
    <line className="splash-conn-green splash-d4" x1="161" y1="161" x2="203" y2="165" stroke="#1D9E75" strokeWidth="1.5"/>
    <line className="splash-conn-green splash-d5" x1="161" y1="97"  x2="203" y2="165" stroke="#534AB7" strokeWidth="0.5"/>

    <circle className="splash-node-side splash-node-s1" cx="94" cy="110" r="7" fill="#26215C" stroke="#7F77DD" strokeWidth="1"/>
    <circle className="splash-node-side splash-node-s2" cx="94" cy="140" r="7" fill="#26215C" stroke="#7F77DD" strokeWidth="1"/>
    <circle className="splash-node-side splash-node-s3" cx="94" cy="170" r="7" fill="#26215C" stroke="#7F77DD" strokeWidth="1"/>
    <circle className="splash-node-mid splash-node-m1" cx="152" cy="97"  r="9" fill="#3C3489" stroke="#7F77DD" strokeWidth="1.5"/>
    <circle className="splash-node-mid splash-node-m2" cx="152" cy="128" r="9" fill="#3C3489" stroke="#7F77DD" strokeWidth="1.5"/>
    <circle className="splash-node-mid splash-node-m3" cx="152" cy="161" r="9" fill="#3C3489" stroke="#7F77DD" strokeWidth="1.5"/>
    <circle className="splash-node-side splash-node-s4" cx="210" cy="115" r="7" fill="#26215C" stroke="#5DCAA5" strokeWidth="1"/>
    <circle className="splash-node-side splash-node-s5" cx="210" cy="165" r="7" fill="#26215C" stroke="#5DCAA5" strokeWidth="1"/>

    <circle cx="94"  cy="110" r="2.5" fill="#AFA9EC"/>
    <circle cx="94"  cy="140" r="2.5" fill="#AFA9EC"/>
    <circle cx="94"  cy="170" r="2.5" fill="#AFA9EC"/>
    <circle cx="152" cy="97"  r="3.5" fill="#EEEDFE"/>
    <circle cx="152" cy="128" r="3.5" fill="#EEEDFE"/>
    <circle cx="152" cy="161" r="3.5" fill="#EEEDFE"/>
    <circle cx="210" cy="115" r="2.5" fill="#5DCAA5"/>
    <circle cx="210" cy="165" r="2.5" fill="#5DCAA5"/>

    <path d="M62 90 L46 120 L46 165 L62 195" stroke="#7F77DD" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M242 90 L258 120 L258 165 L242 195" stroke="#7F77DD" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

    <line x1="300" y1="60" x2="300" y2="220" stroke="#3C3489" strokeWidth="1"/>

    <text className="splash-text-1" x="326" y="118" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="34" fontWeight="600" fill="#EEEDFE" letterSpacing="0.5">Marco Simone</text>
    <text className="splash-text-2" x="326" y="158" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="34" fontWeight="600" fill="#EEEDFE" letterSpacing="0.5">Solutions</text>

    <rect className="splash-text-2" x="535" y="132" width="52" height="30" rx="8" fill="#26215C" stroke="#7F77DD" strokeWidth="1"/>
    <text className="splash-text-2" x="561" y="153" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="16" fontWeight="700" fill="#EEEDFE" textAnchor="middle">AI</text>

    <text className="splash-text-3" x="326" y="192" fontFamily="'Segoe UI', Arial, sans-serif" fontSize="13" fill="#AFA9EC" letterSpacing="2">LEARN · CODE · EVOLVE</text>
  </svg>
)

export default function Splash({ onComplete }: SplashProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'burst'>('enter')

  useEffect(() => {
    // Fase 1: logo appare (1s)
    // Fase 2: animazioni girano (2s)
    // Fase 3: burst + sparisce (0.8s)
    const holdTimer = setTimeout(() => setPhase('hold'), 1000)
    const burstTimer = setTimeout(() => setPhase('burst'), 3000)
    const doneTimer = setTimeout(onComplete, 3700)
    return () => {
      clearTimeout(holdTimer)
      clearTimeout(burstTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'burst' ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0f0e1a' }}
        >
          {/* Glow background radiale che pulsa */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(60,52,137,0.35) 0%, transparent 70%)',
            }}
          />

          {/* Logo SVG inline — animazioni attive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: phase === 'enter' ? 0.85 : 1,
            }}
            transition={{
              duration: phase === 'enter' ? 0.9 : 0.5,
              ease: [0.34, 1.2, 0.64, 1],
            }}
            style={{ width: '90vw', maxWidth: '860px' }}
          >
            <LogoSVG />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="burst"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0f0e1a' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeIn' }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeIn' }}
            style={{ width: '90vw', maxWidth: '860px' }}
          >
            <LogoSVG />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
