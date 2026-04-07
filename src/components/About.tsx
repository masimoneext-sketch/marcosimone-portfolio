import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

interface StatCard {
  value: number
  suffix: string
  label: string
}

const stats: StatCard[] = [
  { value: 5, suffix: '+', label: 'Anni in IT' },
  { value: 6, suffix: '', label: 'Portali Deployati' },
  { value: 45, suffix: '+', label: 'Competenze' },
  { value: 17, suffix: '+', label: 'Anni Leadership' },
]

const highlights = [
  { icon: '🤖', label: 'AI Enthusiast' },
  { icon: '🎯', label: 'Problem Solver' },
  { icon: '🤝', label: 'Team Leader' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
    >

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
            [ Chi Sono ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN — Photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8"
          >
            {/* Avatar container */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
              {/* Rotating gradient ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #7F77DD, #5DCAA5, #7F77DD)',
                  padding: '3px',
                  borderRadius: '50%',
                  animation: 'spin-border 6s linear infinite',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0f0e1a]" />
              </div>

              {/* Foto profilo */}
              <img
                src="/avatar.png"
                alt="Marco Simone"
                className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-top"
              />

              {/* Open to Work badge */}
              <div className="absolute bottom-2 right-2 z-20 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
                Open to Work
              </div>
            </div>

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold text-gradient leading-none">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      />
                    ) : (
                      '0'
                    )}
                    {stat.suffix}
                  </div>
                  <div className="text-[#AFA9EC] text-xs mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
                [ Chi Sono ]
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#EEEDFE] mt-2 leading-snug">
                IT Team Leader con una forte{' '}
                <span className="text-gradient">passione per l'AI</span>
              </h3>
            </div>

            <div className="text-[#AFA9EC] leading-relaxed space-y-4 text-base">
              <p>
                Sono Marco Simone, Team Leader IT Service Desk presso IWS Consulting,
                con gestione del team IT e supporto tecnico avanzato. Con oltre 5 anni nel settore
                IT e 17 anni di esperienza nella gestione di team, ho sviluppato una
                visione pratica e orientata alle soluzioni.
              </p>
              <p>
                La mia vera passione è l'intelligenza artificiale: uso l'AI come strumento
                concreto per automatizzare processi IT, costruire knowledge base intelligenti
                e creare portali che risolvono problemi reali — senza essere uno sviluppatore
                tradizionale, ma sapendo esattamente cosa serve per far funzionare le cose.
              </p>
            </div>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <motion.span
                  key={h.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="card-glass rounded-full px-4 py-2 text-sm font-medium text-[#EEEDFE] flex items-center gap-2"
                >
                  <span>{h.icon}</span>
                  {h.label}
                </motion.span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="/cv-marco-simone.html"
                target="_blank"
                rel="noopener noreferrer"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg border border-[#7F77DD] text-[#7F77DD] font-semibold text-sm hover:bg-[#7F77DD]/10 transition-colors flex items-center gap-2"
              >
                <span>📄</span> Scarica CV
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/marco-simone-it/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg font-semibold text-sm text-[#0f0e1a] flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
                }}
              >
                <span>💼</span> LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spin-border keyframe injected globally */}
      <style>{`
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
