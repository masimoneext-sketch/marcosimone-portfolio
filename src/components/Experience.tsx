import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface Experience {
  id: number
  role: string
  company: string
  period: string
  duration: string
  description: string
  tech: string[]
  icon: string
  color: 'purple' | 'teal'
  current: boolean
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Team Leader / IT Service Desk',
    company: 'IWS Consulting IT Advisory Company',
    period: 'Dicembre 2020 – Presente',
    duration: '4+ anni',
    description:
      'Gestione team IT, supporto tecnico avanzato, Microsoft Dynamics e troubleshooting su oltre 42 aree tecniche.',
    tech: [
      'Windows Server',
      'Active Directory',
      'Microsoft Dynamics',
      'IT Service Desk',
      'Team Leadership',
    ],
    icon: '🏢',
    color: 'purple',
    current: true,
  },
  {
    id: 2,
    role: 'Sistemista Windows / Tecnico PC',
    company: 'Freelance',
    period: '2008 – Presente',
    duration: '17+ anni',
    description:
      'Consulenza autonoma su sistemi Windows Desktop e Server, DHCP, DNS, Active Directory. Configurazione e ottimizzazione workstation ad alte prestazioni, diagnosi e risoluzione guasti hardware e software.',
    tech: [
      'Windows Server',
      'DHCP',
      'DNS',
      'Active Directory',
      'Hardware',
      'Networking',
    ],
    icon: '💻',
    color: 'teal',
    current: true,
  },
  {
    id: 3,
    role: 'Responsabile Punti Vendita',
    company: 'Pam Panorama S.p.A.',
    period: 'Dicembre 2019 – Dicembre 2020',
    duration: '1 anno',
    description:
      'Gestione operativa punti vendita, software gestionali aziendali e contabilità.',
    tech: ['Gestione Team', 'Software Gestionale', 'Contabilità'],
    icon: '🏪',
    color: 'purple',
    current: false,
  },
  {
    id: 4,
    role: 'Responsabile Funzioni di Servizio',
    company: 'Autogrill',
    period: 'Luglio 2008 – Giugno 2018',
    duration: '10 anni',
    description:
      'Coordinamento team operatori, gestione turni e contabilità in ambienti ad alto traffico. 17 anni totali di esperienza nel customer service e team management.',
    tech: [
      'Team Management',
      'Customer Service',
      'Gestione Turni',
      'Contabilità',
      'High-pressure Environment',
    ],
    icon: '⚡',
    color: 'teal',
    current: false,
  },
]

const colorMap = {
  purple: {
    border: 'border-[#7F77DD]',
    dot: 'bg-[#7F77DD]',
    dotGlow: '0 0 12px rgba(127,119,221,0.8)',
    pill: 'bg-[#7F77DD]/10 text-[#7F77DD] border border-[#7F77DD]/30',
    icon: 'bg-[#7F77DD]/10 border border-[#7F77DD]/30',
  },
  teal: {
    border: 'border-[#5DCAA5]',
    dot: 'bg-[#5DCAA5]',
    dotGlow: '0 0 12px rgba(93,202,165,0.8)',
    pill: 'bg-[#5DCAA5]/10 text-[#5DCAA5] border border-[#5DCAA5]/30',
    icon: 'bg-[#5DCAA5]/10 border border-[#5DCAA5]/30',
  },
}

interface TimelineCardProps {
  exp: Experience
  index: number
}

function TimelineCard({ exp, index }: TimelineCardProps) {
  const isLeft = index % 2 === 0
  const colors = colorMap[exp.color]

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div ref={ref} className="relative flex items-start w-full">
      {/* Left card (even index on desktop) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 items-start">
        {/* Left slot */}
        <div className="hidden md:flex justify-end pr-6">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`card-glass rounded-2xl p-5 border-l-4 ${colors.border} max-w-sm w-full`}
            >
              <CardContent exp={exp} colors={colors} />
            </motion.div>
          )}
        </div>

        {/* Center dot */}
        <div className="hidden md:flex flex-col items-center">
          <motion.div
            className={`w-5 h-5 rounded-full ${colors.dot} z-10 mt-1 flex-shrink-0`}
            style={{ boxShadow: colors.dotGlow }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Right slot */}
        <div className="hidden md:flex justify-start pl-6">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`card-glass rounded-2xl p-5 border-l-4 ${colors.border} max-w-sm w-full`}
            >
              <CardContent exp={exp} colors={colors} />
            </motion.div>
          )}
        </div>

        {/* Mobile: all cards stacked */}
        <div className="flex md:hidden items-start gap-4">
          <motion.div
            className={`w-4 h-4 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`}
            style={{ boxShadow: colors.dotGlow }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`card-glass rounded-2xl p-5 border-l-4 ${colors.border} flex-1`}
          >
            <CardContent exp={exp} colors={colors} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

interface CardContentProps {
  exp: Experience
  colors: (typeof colorMap)[keyof typeof colorMap]
}

function CardContent({ exp, colors }: CardContentProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}
        >
          {exp.icon}
        </span>
        {exp.current && (
          <span className="text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full flex-shrink-0">
            ATTUALE
          </span>
        )}
      </div>

      {/* Role & company */}
      <div>
        <h3 className="text-[#EEEDFE] font-bold text-base leading-snug">
          {exp.role}
        </h3>
        <p className="text-[#AFA9EC] text-sm mt-0.5">{exp.company}</p>
      </div>

      {/* Period */}
      <div className="flex items-center gap-2 text-xs text-[#AFA9EC]">
        <span>📅</span>
        <span>{exp.period}</span>
        <span className="mx-1 opacity-40">·</span>
        <span className="font-semibold text-[#7F77DD]">{exp.duration}</span>
      </div>

      {/* Description */}
      <p className="text-[#AFA9EC] text-sm leading-relaxed">{exp.description}</p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {exp.tech.map((t) => (
          <span key={t} className={`text-xs px-2.5 py-1 rounded-full font-medium ${colors.pill}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 bg-[#1a1830] relative overflow-hidden"
    >
      {/* Background blurs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7F77DD]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#5DCAA5]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
            [ Carriera ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            La mia <span className="text-gradient">Esperienza</span>
          </h2>
          <p className="text-[#AFA9EC] mt-3 text-base max-w-xl mx-auto">
            Oltre 17 anni di carriera — dalla leadership operativa all'innovazione IT.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, #7F77DD, #5DCAA5, #7F77DD)',
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={sectionInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="block md:hidden absolute left-[10px] top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(to bottom, #7F77DD, #5DCAA5, #7F77DD)',
              }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={sectionInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>

          {/* Experience cards */}
          <div className="flex flex-col gap-10 md:gap-12 relative pl-8 md:pl-0">
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
