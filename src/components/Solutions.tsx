import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface Solution {
  icon: string
  title: string
  product: string
  problem: string
  solution: string
  targetAudience: string
  roi: string
  tags: string[]
  color: 'teal' | 'purple'
}

const solutions: Solution[] = [
  {
    icon: '🤖',
    title: 'AI-Powered IT Helpdesk',
    product: 'Sudo Support IT',
    problem: 'Il tuo team IT risponde sempre alle stesse domande?',
    solution:
      'Knowledge Base intelligente + AI Claude che risponde autonomamente al 60% dei ticket ripetitivi. Riduce il carico del team IT e migliora i tempi di risposta.',
    targetAudience: 'PMI 50-500 dipendenti senza helpdesk strutturato',
    roi: 'Risparmio stimato: 2-4h/giorno di lavoro IT',
    tags: ['IT Support', 'AI Integration', 'Knowledge Management'],
    color: 'teal',
  },
  {
    icon: '🏗️',
    title: 'Asset Management Enterprise',
    product: 'Asset Management Portal',
    problem: 'Gestite ancora l\'inventario IT su Excel?',
    solution:
      'Portale completo per tracciare il ciclo di vita di migliaia di asset IT: PC, server, periferiche. Import da sistemi legacy, documenti allegati, storico interventi.',
    targetAudience: 'IT Manager di aziende con 100+ device da gestire',
    roi: 'Visibilità totale su tutti gli asset — zero spreadsheet',
    tags: ['Asset Tracking', 'ITSM', 'Compliance'],
    color: 'purple',
  },
  {
    icon: '📚',
    title: 'Technical Onboarding Platform',
    product: 'Sudo CodingTeacher',
    problem: "L'onboarding tecnico dei nuovi assunti è lento e costoso?",
    solution:
      'Piattaforma di formazione con percorsi personalizzati, esercizi pratici e AI tutor che fornisce feedback istantaneo. Riduce il tempo di onboarding del 40%.',
    targetAudience: 'HR Manager e Learning & Development di aziende IT',
    roi: 'Onboarding standardizzato e misurabile',
    tags: ['L&D', 'Technical Training', 'AI Tutor'],
    color: 'teal',
  },
  {
    icon: '💻',
    title: 'Device Pool Management',
    product: 'Spot Tracker',
    problem: 'Chi ha preso quale laptop e quando lo riporta?',
    solution:
      'Sistema web per gestire prestiti di device aziendali con tracciabilità completa, ranking utilizzo, notifiche e export per inventario.',
    targetAudience: 'Uffici IT con pool hardware condiviso',
    roi: 'Zero dispositivi persi — tracciabilità al 100%',
    tags: ['Hardware Tracking', 'IT Operations'],
    color: 'purple',
  },
  {
    icon: '📅',
    title: 'Workforce Shift Management',
    product: 'ShiftFlow',
    problem: 'Gestite ancora i turni del personale su Excel o carta?',
    solution:
      'Portale web self-hosted per pianificare turni settimanali con griglia interattiva, gestione assenze e preferenze turno, approvazione automatica, clienti/sedi configurabili ed export Excel.',
    targetAudience: 'Aziende con personale a turni: service desk, security, sanità, retail',
    roi: 'Pianificazione turni in minuti — zero conflitti, zero spreadsheet',
    tags: ['HR Operations', 'Shift Planning', 'Workforce Management'],
    color: 'teal',
  },
  {
    icon: '🔨',
    title: 'AI Dev Orchestrator',
    product: "Hammerin'Claude",
    problem: 'I tuoi agenti AI sprecano token e producono codice disorganizzato?',
    solution:
      "Skill di orchestrazione per Claude Code che decide automaticamente quando lavorare inline e quando lanciare sub-agenti. Metodo Costruttore: fondamenta → struttura → mura → finiture, con verifica ad ogni strato. Benchmark: -42% token, +33% qualità vs baseline.",
    targetAudience: 'Sviluppatori e team che usano Claude Code per progetti complessi',
    roi: 'Risparmio 42% token AI — codice meglio strutturato con zero coordinamento manuale',
    tags: ['AI Orchestration', 'Multi-Agent', 'Developer Tools'],
    color: 'purple',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

interface SolutionCardProps {
  solution: Solution
  index: number
}

function SolutionCard({ solution }: SolutionCardProps) {
  const accentColor = solution.color === 'teal' ? '#5DCAA5' : '#7F77DD'
  const glowClass = solution.color === 'teal' ? 'glow-teal' : 'glow-purple'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`card-glass rounded-2xl p-6 flex flex-col gap-4 cursor-default hover:${glowClass}`}
      style={{
        borderColor: `${accentColor}33`,
      }}
    >
      {/* Icon + product badge */}
      <div className="flex items-start justify-between gap-3">
        <motion.span
          className="text-4xl select-none"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {solution.icon}
        </motion.span>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
          style={{
            background: `${accentColor}22`,
            color: accentColor,
            border: `1px solid ${accentColor}44`,
          }}
        >
          {solution.product}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#EEEDFE] leading-snug">{solution.title}</h3>

      {/* Problem */}
      <div className="flex items-start gap-2">
        <span className="text-red-400 mt-0.5 flex-shrink-0 text-sm">⚠</span>
        <p className="text-sm font-medium text-red-300/80 italic leading-snug">
          {solution.problem}
        </p>
      </div>

      {/* Solution */}
      <p className="text-[#AFA9EC] text-sm leading-relaxed flex-1">{solution.solution}</p>

      {/* Target + ROI */}
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-sm">
          <span className="flex-shrink-0" style={{ color: accentColor }}>
            🎯
          </span>
          <span className="text-[#AFA9EC]">
            <span className="text-[#EEEDFE] font-medium">Target: </span>
            {solution.targetAudience}
          </span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <span className="flex-shrink-0" style={{ color: accentColor }}>
            📈
          </span>
          <span className="text-[#AFA9EC]">
            <span className="text-[#EEEDFE] font-medium">ROI: </span>
            {solution.roi}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {solution.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(127, 119, 221, 0.12)',
              color: '#AFA9EC',
              border: '1px solid rgba(127, 119, 221, 0.2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Solutions() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="solutions"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background decorative blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#5DCAA5]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#7F77DD]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#5DCAA5] text-sm font-semibold tracking-widest uppercase">
            [ Soluzioni di Mercato ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            Portali Pronti per{' '}
            <span className="text-gradient">l'Impresa</span>
          </h2>
          <p className="mt-4 text-[#AFA9EC] max-w-2xl mx-auto text-base leading-relaxed">
            Non solo proof-of-concept — soluzioni deployabili che risolvono problemi reali nel
            mercato IT support
          </p>
        </motion.div>

        {/* Dual positioning banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div
            className="flex-1 rounded-xl px-5 py-3 text-center text-sm font-semibold"
            style={{
              background: 'rgba(127, 119, 221, 0.12)',
              border: '1px solid rgba(127, 119, 221, 0.3)',
              color: '#7F77DD',
            }}
          >
            🛒 Prodotti Vendibili / Licenziabili
          </div>
          <div
            className="flex-1 rounded-xl px-5 py-3 text-center text-sm font-semibold"
            style={{
              background: 'rgba(93, 202, 165, 0.12)',
              border: '1px solid rgba(93, 202, 165, 0.3)',
              color: '#5DCAA5',
            }}
          >
            🏆 Proof of Concept dell'Expertise
          </div>
        </motion.div>

        {/* Solution cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block rounded-2xl px-10 py-8 card-glass max-w-xl w-full"
          >
            <p className="text-[#EEEDFE] text-lg font-semibold mb-2">
              Stai cercando una soluzione personalizzata per la tua azienda?
            </p>
            <p className="text-[#AFA9EC] text-sm mb-6">
              Ogni azienda ha esigenze uniche. Parliamo di come posso adattare queste soluzioni
              al tuo contesto.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-8 py-3 rounded-lg font-semibold text-sm text-[#0f0e1a] transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
              }}
            >
              Contattami
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
