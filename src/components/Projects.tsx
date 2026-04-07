import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Tilt } from 'react-tilt'

interface Project {
  id: number
  name: string
  tagline: string
  description: string
  stack: string[]
  category: string
  marketApp: string
  status: string
  color: 'purple' | 'teal'
  icon: string
  features: string[]
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Asset Management Portal',
    tagline: 'Gestione asset IT enterprise su scala',
    description:
      'Portale completo per la gestione degli asset IT aziendali. Import massivo da XLS legacy, lifecycle tracking, gestione documenti allegati e ruoli avanzati.',
    stack: ['Laravel 11', 'React 18', 'MySQL', 'Docker', 'JWT', 'TypeScript'],
    category: 'Enterprise',
    marketApp:
      'Sostituisce fogli Excel e tool costosi come Snipe-IT per PMI e università',
    status: 'Live',
    color: 'purple',
    icon: '🏗️',
    features: ['Asset aziendali', 'Import CSV/XLS', 'Multi-ruolo', 'Docker deploy'],
  },
  {
    id: 2,
    name: 'Sudo Support IT',
    tagline: 'IT Helpdesk con AI integrata',
    description:
      'Portale IT support con Knowledge Base intelligente (368 voci), AI Assistant basato su Claude, gestione ticket, turni, spostamenti e audit log.',
    stack: ['Node.js', 'Express', 'SQLite', 'Claude AI', 'JWT', 'Vanilla JS'],
    category: 'AI',
    marketApp:
      'Helpdesk AI-powered per PMI senza team IT strutturato — riduce il 60% delle richieste ripetitive',
    status: 'Live',
    color: 'teal',
    icon: '🤖',
    features: ['KB 368 voci', 'AI Claude integrata', 'Gestione ticket', 'Audit log'],
  },
  {
    id: 3,
    name: 'Sudo CodingTeacher',
    tagline: 'Piattaforma educativa coding con AI',
    description:
      'Portale di formazione tecnica con percorsi di apprendimento personalizzati, esercizi interattivi e AI tutor basato su Claude per feedback istantaneo.',
    stack: ['Node.js', 'Express', 'SQLite', 'Anthropic SDK', 'JWT'],
    category: 'AI',
    marketApp:
      'Onboarding tecnico per nuovi sviluppatori in aziende IT e academy private',
    status: 'In sviluppo',
    color: 'purple',
    icon: '📚',
    features: ['Percorsi personalizzati', 'AI Tutor', 'Esercizi interattivi', 'Progress tracking'],
  },
  {
    id: 4,
    name: 'Spot Tracker',
    tagline: 'Tracciamento prestiti device aziendali',
    description:
      'Sistema completo per gestire il pool di laptop aziendali: prestiti, restituzioni, ranking utilizzo, export CSV e gestione utenti multi-ruolo.',
    stack: ['Node.js', 'Express', 'SQLite', 'JWT', 'Docker'],
    category: 'Enterprise',
    marketApp:
      'Ideale per uffici IT con pool hardware condiviso — tracciabilità totale senza Excel',
    status: 'Live',
    color: 'teal',
    icon: '💻',
    features: ['Prestiti/restituzioni', 'Ranking utilizzo', 'Export CSV', 'Multi-ruolo'],
  },
  {
    id: 5,
    name: 'Work Money',
    tagline: 'App mobile gestione finanze personali',
    description:
      'Applicazione mobile nativa per il tracking delle finanze personali con categorie, statistiche, grafici e storico transazioni. Pubblicata su APK.',
    stack: ['React Native', 'Expo SDK 52', 'TypeScript', 'expo-sqlite', 'expo-router'],
    category: 'Mobile',
    marketApp:
      'App standalone per professionisti e PMI — alternativa gratuita a Mint/YNAB',
    status: 'Live v3.3.0',
    color: 'purple',
    icon: '💰',
    features: ['Tracking spese', 'Categorie custom', 'Statistiche', 'Export dati'],
  },
  {
    id: 6,
    name: 'Infrastructure VPS',
    tagline: 'Stack infrastrutturale completo self-hosted',
    description:
      'Gestione completa di un VPS Linux con Docker, Traefik reverse proxy, Apache, PM2, certificati SSL automatici e deploy multi-portale.',
    stack: ['Linux Ubuntu', 'Docker', 'Traefik', 'Apache', 'PM2', 'SSL/TLS'],
    category: 'DevOps',
    marketApp:
      'Blueprint per hosting self-managed multi-applicazione — alternativa a cloud costosi',
    status: 'Live',
    color: 'teal',
    icon: '🖥️',
    features: ['Multi-portale', 'SSL automatico', 'Traefik proxy', 'Docker compose'],
  },
]

const filterTabs = ['Tutti', 'Enterprise', 'AI', 'Mobile', 'DevOps'] as const
type FilterTab = (typeof filterTabs)[number]

const statusConfig: Record<string, { label: string; classes: string }> = {
  Live: {
    label: 'Live',
    classes: 'bg-green-500/20 text-green-400 border border-green-500/30',
  },
  'In sviluppo': {
    label: 'In sviluppo',
    classes: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  },
}

function getStatusConfig(status: string) {
  if (status.startsWith('Live')) {
    return statusConfig['Live']
  }
  return statusConfig[status] ?? statusConfig['Live']
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const isLive = project.status.startsWith('Live')
  const accentColor = project.color === 'purple' ? '#7F77DD' : '#5DCAA5'
  const glowClass = project.color === 'purple' ? 'hover:glow-purple' : 'hover:glow-teal'
  const statusCfg = getStatusConfig(project.status)
  const visibleStack = project.stack.slice(0, 4)
  const extraStack = project.stack.length - 4

  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -8 }}
      className={`group h-full ${glowClass}`}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={1000}
        glareEnable={false}
        style={{ height: '100%' }}
      >
        <div className="card-glass rounded-2xl overflow-hidden flex flex-col h-full transition-shadow duration-300 group-hover:shadow-lg"
          style={{
            '--hover-glow': `0 0 30px ${accentColor}4D`,
          } as React.CSSProperties}
        >
          {/* Card top accent line */}
          <div
            className="h-0.5 w-full"
            style={{
              background: project.color === 'purple'
                ? 'linear-gradient(90deg, #7F77DD, #5DCAA5)'
                : 'linear-gradient(90deg, #5DCAA5, #7F77DD)',
            }}
          />

          <div className="flex flex-col flex-1 p-6">
            {/* Header row: icon + status badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${accentColor}1A`, border: `1px solid ${accentColor}33` }}
              >
                {project.icon}
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${statusCfg.classes}`}
              >
                {isLive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                    style={{ background: '#4ade80' }}
                  />
                )}
                {project.status}
              </span>
            </div>

            {/* Name + tagline */}
            <h3 className="text-[#EEEDFE] font-bold text-lg leading-snug mb-1">
              {project.name}
            </h3>
            <p className="text-sm font-medium mb-3" style={{ color: accentColor }}>
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-[#AFA9EC] text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {visibleStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md font-medium"
                  style={{
                    background: `${accentColor}15`,
                    color: accentColor,
                    border: `1px solid ${accentColor}25`,
                  }}
                >
                  {tech}
                </span>
              ))}
              {extraStack > 0 && (
                <span
                  className="text-xs px-2.5 py-1 rounded-md font-medium text-[#AFA9EC]"
                  style={{ background: 'rgba(175,169,236,0.08)', border: '1px solid rgba(175,169,236,0.15)' }}
                >
                  +{extraStack}
                </span>
              )}
            </div>

            {/* Market app highlight box */}
            <div
              className="rounded-xl p-3 mb-4 flex-1"
              style={{
                background: `${accentColor}0D`,
                border: `1px solid ${accentColor}20`,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: accentColor }}>
                💼 Applicazione di mercato
              </p>
              <p className="text-[#EEEDFE] text-sm leading-snug">{project.marketApp}</p>
            </div>

            {/* Features row */}
            <div className="flex flex-wrap gap-1.5">
              {project.features.map((feat) => (
                <span
                  key={feat}
                  className="text-xs px-2.5 py-1 rounded-full text-[#AFA9EC]"
                  style={{ background: 'rgba(38,33,92,0.4)', border: '1px solid rgba(127,119,221,0.15)' }}
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Footer gradient bar */}
          <div
            className="h-1"
            style={{
              background: project.color === 'purple'
                ? 'linear-gradient(90deg, #7F77DD22, #5DCAA522)'
                : 'linear-gradient(90deg, #5DCAA522, #7F77DD22)',
            }}
          />
        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Tutti')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered =
    activeFilter === 'Tutti'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6 bg-[#0f0e1a] relative overflow-hidden"
    >
      {/* Background decorative blurs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7F77DD]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#5DCAA5]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
            [ Progetti ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            Portali{' '}
            <span className="text-gradient">Enterprise-Ready</span>
          </h2>
          <p className="text-[#AFA9EC] mt-3 text-base">
            Soluzioni reali, deployate, pronte per il mercato IT
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10 mt-8"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none ${
                  isActive ? 'text-[#0f0e1a]' : 'text-[#AFA9EC] hover:text-[#EEEDFE] card-glass'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-bg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
