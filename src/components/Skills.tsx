import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: 'AI & Automazione',
    icon: '🤖',
    skills: [
      { name: 'Claude AI / Anthropic', level: 92 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'AI Integration', level: 88 },
      { name: 'AI-Augmented Development', level: 90 },
      { name: 'Multi-Agent Orchestration', level: 88 },
      { name: 'Knowledge Base Engine', level: 85 },
      { name: 'Workflow Automation', level: 80 },
    ],
  },
  {
    name: 'IT Systems',
    icon: '🖥️',
    skills: [
      { name: 'Windows Server', level: 88 },
      { name: 'Active Directory', level: 85 },
      { name: 'DHCP / DNS', level: 85 },
      { name: 'Microsoft Dynamics', level: 80 },
      { name: 'IT Service Desk', level: 95 },
      { name: 'Hardware Troubleshooting', level: 90 },
    ],
  },
  {
    name: 'DevOps & Infra',
    icon: '🚀',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Linux (Ubuntu)', level: 82 },
      { name: 'Apache / Nginx', level: 78 },
      { name: 'Traefik', level: 75 },
      { name: 'PM2', level: 88 },
      { name: 'VPS Management', level: 85 },
    ],
  },
  {
    name: 'Sviluppo con AI',
    icon: '⚙️',
    skills: [
      { name: 'Node.js + Express', level: 60 },
      { name: 'React / TypeScript', level: 55 },
      { name: 'Laravel / PHP', level: 50 },
      { name: 'React Native / Expo', level: 55 },
      { name: 'MySQL / SQLite', level: 65 },
      { name: 'REST API Design', level: 70 },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

interface SkillBarProps {
  skill: Skill
  inView: boolean
}

function SkillBar({ skill, inView }: SkillBarProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="card-glass rounded-xl p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#EEEDFE] text-sm font-medium">{skill.name}</span>
        <span className="text-[#AFA9EC] text-xs font-semibold tabular-nums">{skill.level}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#1a1830] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #7F77DD 0%, #5DCAA5 100%)',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  const activeCategory = skillCategories[activeTab]

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background decorative blurs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7F77DD]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5DCAA5]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
            [ Competenze ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            Stack Tecnologico &{' '}
            <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skillCategories.map((cat, index) => {
            const isActive = activeTab === index
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-2 focus:outline-none ${
                  isActive
                    ? 'text-[#0f0e1a]'
                    : 'text-[#AFA9EC] hover:text-[#EEEDFE] card-glass'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10">{cat.name}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Skills grid — AnimatePresence for tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeCategory.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
