import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// ─── Browser Frame Wrapper ───────────────────────────────────────────────────

const BrowserFrame = ({ children, url = 'app.example.com/portal' }: { children: React.ReactNode; url?: string }) => (
  <div
    style={{
      background: '#0a0918',
      borderRadius: '8px',
      border: '1px solid rgba(127,119,221,0.25)',
      overflow: 'hidden',
      height: '160px',
    }}
  >
    {/* Tab bar */}
    <div
      style={{
        background: '#151323',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        borderBottom: '1px solid rgba(127,119,221,0.15)',
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
      <div
        style={{
          flex: 1,
          marginLeft: 8,
          background: '#0f0e1a',
          borderRadius: 4,
          height: 18,
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        <span style={{ fontSize: 9, color: '#534AB7' }}>{url}</span>
      </div>
    </div>
    {/* Content */}
    <div style={{ padding: '10px', height: 'calc(100% - 32px)', overflow: 'hidden' }}>
      {children}
    </div>
  </div>
)

// ─── Helper: Blinking Cursor ─────────────────────────────────────────────────

const Cursor = ({ color = '#7F77DD' }: { color?: string }) => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ repeat: Infinity, duration: 1, ease: 'steps(2)' }}
    style={{ display: 'inline-block', width: 6, height: 11, background: color, marginLeft: 2, verticalAlign: 'text-bottom', borderRadius: 1 }}
  />
)

// ─── Mockup 1: Asset Management Portal ───────────────────────────────────────

const assetRows = [
  { id: 'PC-001', model: 'Dell XPS', status: '● Attivo', statusColor: '#5DCAA5', loc: 'Ufficio A' },
  { id: 'PC-002', model: 'HP Elite',  status: '⚙ Maint.', statusColor: '#ffbd2e', loc: 'Ufficio B' },
  { id: 'SRV-01', model: 'PowerEdge', status: '● Attivo', statusColor: '#5DCAA5', loc: 'Sala Server' },
]

function AssetMockup() {
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    let current = 0
    const showNext = () => {
      current += 1
      setVisibleRows(current)
      if (current < assetRows.length) {
        setTimeout(showNext, 500)
      } else {
        // pause then reset
        setTimeout(() => {
          setVisibleRows(0)
          current = 0
          setTimeout(showNext, 400)
        }, 2200)
      }
    }
    const t = setTimeout(showNext, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {/* Table header */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 4, paddingBottom: 4, borderBottom: '1px solid rgba(127,119,221,0.2)' }}>
        {['ID', 'Modello', 'Status', 'Posizione'].map((h) => (
          <span key={h} style={{ flex: 1, fontSize: 8, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
        ))}
      </div>
      {/* Rows */}
      <AnimatePresence>
        {assetRows.slice(0, visibleRows).map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 5, background: i % 2 === 0 ? 'rgba(127,119,221,0.05)' : 'transparent', borderRadius: 3, padding: '2px 3px' }}
          >
            <span style={{ flex: 1, fontSize: 9, color: '#EEEDFE', fontWeight: 600 }}>{row.id}</span>
            <span style={{ flex: 1, fontSize: 9, color: '#AFA9EC' }}>{row.model}</span>
            <span style={{ flex: 1, fontSize: 8, color: row.statusColor, fontWeight: 600 }}>{row.status}</span>
            <span style={{ flex: 1, fontSize: 8, color: '#AFA9EC' }}>{row.loc}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Mockup 2: Sudo Support IT ────────────────────────────────────────────────

const aiFullText = 'Vai su Impostazioni → Account → Reimposta password…'

function SupportMockup() {
  const [phase, setPhase] = useState<'user' | 'typing' | 'kb' | 'done'>('user')
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setPhase('user')
      setTyped('')
      setTimeout(() => {
        if (isCancelled) return
        setPhase('typing')
        let i = 0
        const typeNext = () => {
          if (isCancelled) return
          i += 1
          setTyped(aiFullText.slice(0, i))
          if (i < aiFullText.length) {
            setTimeout(typeNext, 28)
          } else {
            setTimeout(() => {
              if (isCancelled) return
              setPhase('kb')
              setTimeout(() => {
                if (isCancelled) return
                setPhase('done')
                setTimeout(() => { if (!isCancelled) runCycle() }, 1800)
              }, 700)
            }, 400)
          }
        }
        setTimeout(typeNext, 600)
      }, 800)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* User message */}
      <AnimatePresence>
        {(phase === 'user' || phase === 'typing' || phase === 'kb' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: 8, color: '#5DCAA5', fontWeight: 700, whiteSpace: 'nowrap' }}>User:</span>
            <span style={{ fontSize: 9, color: '#EEEDFE' }}>Come resetto la password di rete?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI typing message */}
      <AnimatePresence>
        {(phase === 'typing' || phase === 'kb' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 5, alignItems: 'flex-start', background: 'rgba(127,119,221,0.08)', borderRadius: 4, padding: '4px 6px' }}
          >
            <span style={{ fontSize: 8, color: '#7F77DD', fontWeight: 700, whiteSpace: 'nowrap' }}>AI 🤖:</span>
            <span style={{ fontSize: 9, color: '#EEEDFE' }}>
              {typed}
              {phase === 'typing' && <Cursor color="#7F77DD" />}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KB result */}
      <AnimatePresence>
        {(phase === 'kb' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', gap: 5, alignItems: 'center', background: 'rgba(93,202,165,0.08)', borderRadius: 4, padding: '3px 6px', border: '1px solid rgba(93,202,165,0.2)' }}
          >
            <span style={{ fontSize: 8, color: '#5DCAA5', fontWeight: 700 }}>KB:</span>
            <span style={{ fontSize: 9, color: '#AFA9EC' }}>Trovati 3 articoli correlati</span>
            <span style={{ fontSize: 9, color: '#5DCAA5', marginLeft: 'auto' }}>✓</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mockup 3: Sudo CodingTeacher ────────────────────────────────────────────

const codeLines = [
  { text: 'function greet(name) {', color: '#7F77DD' },
  { text: '  return `Hello, ${name}!`', color: '#EEEDFE' },
  { text: '}', color: '#7F77DD' },
]

function CodeTeacherMockup() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [cursorLine, setCursorLine] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setVisibleLines(0)
      setShowOutput(false)
      setCursorLine(0)

      const showLine = (i: number) => {
        if (isCancelled) return
        setVisibleLines(i + 1)
        setCursorLine(i)
        if (i < codeLines.length - 1) {
          setTimeout(() => showLine(i + 1), 500)
        } else {
          setTimeout(() => {
            if (isCancelled) return
            setCursorLine(-1)
            setShowOutput(true)
            setTimeout(() => {
              if (!isCancelled) runCycle()
            }, 2400)
          }, 600)
        }
      }

      setTimeout(() => showLine(0), 400)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {/* Code header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, paddingBottom: 4, borderBottom: '1px solid rgba(127,119,221,0.15)' }}>
        <span style={{ fontSize: 8, color: '#7F77DD', background: 'rgba(127,119,221,0.15)', padding: '1px 6px', borderRadius: 3 }}>JS</span>
        <span style={{ fontSize: 8, color: '#AFA9EC' }}>greet.js</span>
      </div>

      {/* Code lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <span style={{ fontSize: 7, color: '#534AB7', width: 10, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 9, color: line.color }}>{line.text}</span>
            {cursorLine === i && <Cursor color="#7F77DD" />}
          </motion.div>
        ))}
      </div>

      {/* Output */}
      <AnimatePresence>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 8, background: 'rgba(93,202,165,0.1)', borderRadius: 4, padding: '4px 8px', border: '1px solid rgba(93,202,165,0.25)' }}
          >
            <span style={{ fontSize: 8, color: '#5DCAA5', fontWeight: 700 }}>✅ Output: </span>
            <span style={{ fontSize: 9, color: '#EEEDFE' }}>Hello, Marco!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mockup 4: Spot Tracker ───────────────────────────────────────────────────

type LaptopStatus = 'Disponibile' | 'In prestito' | 'Restituito'

interface LaptopRow {
  name: string
  user: string
  status: LaptopStatus
  statusColor: string
}

const laptopCycle: LaptopRow[][] = [
  [
    { name: 'MacBook Pro', user: 'Marco S.',  status: 'In prestito',  statusColor: '#ffbd2e' },
    { name: 'ThinkPad X1', user: '—',         status: 'Disponibile',  statusColor: '#5DCAA5' },
    { name: 'Surface Pro', user: 'Anna R.',   status: 'In prestito',  statusColor: '#ffbd2e' },
  ],
  [
    { name: 'MacBook Pro', user: '—',         status: 'Restituito',   statusColor: '#7F77DD' },
    { name: 'ThinkPad X1', user: 'Luca M.',   status: 'In prestito',  statusColor: '#ffbd2e' },
    { name: 'Surface Pro', user: 'Anna R.',   status: 'In prestito',  statusColor: '#ffbd2e' },
  ],
  [
    { name: 'MacBook Pro', user: '—',         status: 'Disponibile',  statusColor: '#5DCAA5' },
    { name: 'ThinkPad X1', user: '—',         status: 'Disponibile',  statusColor: '#5DCAA5' },
    { name: 'Surface Pro', user: '—',         status: 'Restituito',   statusColor: '#7F77DD' },
  ],
]

function SpotMockup() {
  const [cycleIndex, setCycleIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % laptopCycle.length)
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const rows = laptopCycle[cycleIndex]

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5, paddingBottom: 4, borderBottom: '1px solid rgba(127,119,221,0.2)' }}>
        {['Device', 'Utente', 'Stato'].map((h) => (
          <span key={h} style={{ flex: 1, fontSize: 8, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycleIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              style={{ display: 'flex', gap: 4, alignItems: 'center', background: i % 2 === 0 ? 'rgba(127,119,221,0.05)' : 'transparent', borderRadius: 3, padding: '2px 3px' }}
            >
              <span style={{ flex: 1, fontSize: 9, color: '#EEEDFE' }}>💻 {row.name}</span>
              <span style={{ flex: 1, fontSize: 9, color: '#AFA9EC' }}>{row.user}</span>
              <span style={{ flex: 1, fontSize: 8, color: row.statusColor, fontWeight: 600, background: `${row.statusColor}18`, borderRadius: 3, padding: '1px 4px', textAlign: 'center' }}>{row.status}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Mockup 5: Work Money ─────────────────────────────────────────────────────

interface DashCard {
  icon: string
  label: string
  bg: string
  border: string
  value?: string
  valueColor?: string
}

const dashCards: DashCard[] = [
  { icon: '🏠', label: 'Dashboard',       bg: 'rgba(127,119,221,0.15)', border: 'rgba(127,119,221,0.35)', value: 'Home',     valueColor: '#7F77DD' },
  { icon: '📅', label: 'Mensile',          bg: 'rgba(93,202,165,0.12)',  border: 'rgba(93,202,165,0.30)',  value: 'Apr 2026', valueColor: '#5DCAA5' },
  { icon: '📊', label: 'Bilancio',         bg: 'rgba(255,189,46,0.12)',  border: 'rgba(255,189,46,0.30)',  value: '€1.284',   valueColor: '#ffbd2e' },
  { icon: '🏦', label: 'Uscite Fisse',     bg: 'rgba(255,95,87,0.10)',   border: 'rgba(255,95,87,0.28)',   value: '€890',     valueColor: '#ff5f57' },
  { icon: '🛒', label: 'Uscite Variabili', bg: 'rgba(255,95,87,0.10)',   border: 'rgba(255,95,87,0.28)',   value: '€346',     valueColor: '#ff5f57' },
  { icon: '🐷', label: 'Salvadanaio',      bg: 'rgba(93,202,165,0.12)',  border: 'rgba(93,202,165,0.30)',  value: '€520',     valueColor: '#5DCAA5' },
]

const bilancioSteps = [
  { label: 'Stipendio',   value: '€2.100', color: '#5DCAA5', badge: '' },
  { label: 'Residuo',     value: '€1.210', color: '#ffbd2e', badge: '🟡' },
  { label: 'Disponibile', value: '€864',   color: '#5DCAA5', badge: '🟢' },
]

function WorkMoneyMockup() {
  const [phase, setPhase] = useState<'cards' | 'bilancio'>('cards')
  const [visibleCards, setVisibleCards] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setPhase('cards')
      setVisibleCards(0)
      setVisibleSteps(0)

      let cardIdx = 0
      const showNextCard = () => {
        if (isCancelled) return
        cardIdx += 1
        setVisibleCards(cardIdx)
        if (cardIdx < dashCards.length) {
          setTimeout(showNextCard, 280)
        } else {
          setTimeout(() => {
            if (isCancelled) return
            setPhase('bilancio')
            setVisibleSteps(0)
            let stepIdx = 0
            const showNextStep = () => {
              if (isCancelled) return
              stepIdx += 1
              setVisibleSteps(stepIdx)
              if (stepIdx < bilancioSteps.length) {
                setTimeout(showNextStep, 500)
              } else {
                setTimeout(() => { if (!isCancelled) runCycle() }, 2200)
              }
            }
            setTimeout(showNextStep, 400)
          }, 1800)
        }
      }
      setTimeout(showNextCard, 350)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  if (phase === 'bilancio') {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10 }}>📊</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Bilancio Cascata</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <AnimatePresence>
            {bilancioSteps.slice(0, visibleSteps).map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {i > 0 && (
                  <div style={{ textAlign: 'center', marginBottom: 3, fontSize: 8, color: '#534AB7' }}>▼</div>
                )}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: `${step.color}12`,
                  border: `1px solid ${step.color}30`,
                  borderRadius: 5,
                  padding: '4px 8px',
                }}>
                  <span style={{ fontSize: 9, color: '#AFA9EC' }}>{step.badge} {step.label}</span>
                  <span style={{ fontSize: 11, color: step.color, fontWeight: 700 }}>{step.value}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700 }}>💰 Work Money</span>
        <span style={{ fontSize: 7, color: '#5DCAA5' }}>v4.1.0</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <AnimatePresence>
          {dashCards.slice(0, visibleCards).map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.7, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: 5,
                padding: '4px 5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <span style={{ fontSize: 10 }}>{card.icon}</span>
              <span style={{ fontSize: 7, color: '#AFA9EC', fontWeight: 600 }}>{card.label}</span>
              {card.value && (
                <span style={{ fontSize: 8, color: card.valueColor, fontWeight: 700 }}>{card.value}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Mockup 6: Infrastructure VPS ────────────────────────────────────────────

const terminalLines = [
  { text: '$ docker ps', color: '#5DCAA5' },
  { text: '✅ portfolio-nginx    UP 2h',  color: '#EEEDFE' },
  { text: '✅ portal-asset        UP 5d',  color: '#EEEDFE' },
  { text: '✅ portal-support      UP 12d', color: '#EEEDFE' },
  { text: '$ docker stats --no-stream',   color: '#5DCAA5' },
  { text: 'CPU: 2.3%  |  MEM: 412MB',    color: '#7F77DD' },
]

function InfraMockup() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setVisibleLines(0)
      const showLine = (i: number) => {
        if (isCancelled) return
        setVisibleLines(i + 1)
        if (i < terminalLines.length - 1) {
          setTimeout(() => showLine(i + 1), 380)
        } else {
          setTimeout(() => { if (!isCancelled) runCycle() }, 2200)
        }
      }
      setTimeout(() => showLine(0), 300)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  return (
    <div style={{ fontFamily: 'monospace', background: '#060512', borderRadius: 4, padding: 8, height: '100%', boxSizing: 'border-box' }}>
      <AnimatePresence>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 9, color: line.color, marginBottom: 3, lineHeight: 1.4 }}
          >
            {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleLines < terminalLines.length && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Cursor color="#5DCAA5" />
        </div>
      )}
    </div>
  )
}

// ─── Mockup 7: ShiftFlow ──────────────────────────────────────────────────────

type ShiftSlot = { name: string; shift: string; color: string }

const shiftDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven']

const shiftData: ShiftSlot[][] = [
  [
    { name: 'Marco S.',  shift: 'M 08-14', color: '#7F77DD' },
    { name: 'Anna R.',   shift: 'P 14-20', color: '#5DCAA5' },
    { name: 'Luca M.',   shift: '—',       color: '#534AB7' },
  ],
  [
    { name: 'Marco S.',  shift: 'P 14-20', color: '#5DCAA5' },
    { name: 'Anna R.',   shift: 'M 08-14', color: '#7F77DD' },
    { name: 'Luca M.',   shift: 'M 08-14', color: '#7F77DD' },
  ],
]

function ShiftFlowMockup() {
  const [cycleIndex, setCycleIndex] = useState(0)
  const [visibleRows, setVisibleRows] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setVisibleRows(0)
      const rows = shiftData[cycleIndex % shiftData.length]
      let i = 0
      const showNext = () => {
        if (isCancelled) return
        i += 1
        setVisibleRows(i)
        if (i < rows.length) {
          setTimeout(showNext, 420)
        } else {
          setTimeout(() => {
            if (isCancelled) return
            setCycleIndex((prev) => (prev + 1) % shiftData.length)
          }, 2000)
        }
      }
      setTimeout(showNext, 350)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [cycleIndex])

  const rows = shiftData[cycleIndex % shiftData.length]

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {/* Week header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, paddingBottom: 4, borderBottom: '1px solid rgba(127,119,221,0.2)' }}>
        <span style={{ fontSize: 8, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>📅 Settimana corrente</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {shiftDays.map((d) => (
            <span key={d} style={{ fontSize: 7, color: '#534AB7', background: 'rgba(127,119,221,0.12)', borderRadius: 3, padding: '1px 4px' }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Shift rows */}
      <AnimatePresence>
        {rows.slice(0, visibleRows).map((row, i) => (
          <motion.div
            key={`${cycleIndex}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, background: i % 2 === 0 ? 'rgba(127,119,221,0.05)' : 'transparent', borderRadius: 3, padding: '2px 4px' }}
          >
            <span style={{ flex: '0 0 56px', fontSize: 9, color: '#EEEDFE', fontWeight: 600 }}>{row.name}</span>
            <span
              style={{
                fontSize: 8,
                color: row.color,
                fontWeight: 700,
                background: `${row.color}18`,
                border: `1px solid ${row.color}35`,
                borderRadius: 4,
                padding: '1px 6px',
              }}
            >
              {row.shift}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Footer: pending request badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleRows >= rows.length ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,189,46,0.1)', border: '1px solid rgba(255,189,46,0.25)', borderRadius: 4, padding: '3px 7px' }}
      >
        <span style={{ fontSize: 8, color: '#ffbd2e', fontWeight: 700 }}>⏳</span>
        <span style={{ fontSize: 8, color: '#AFA9EC' }}>1 richiesta assenza in attesa</span>
        <span style={{ fontSize: 8, color: '#ffbd2e', marginLeft: 'auto', fontWeight: 700 }}>Approva</span>
      </motion.div>
    </div>
  )
}

// ─── Mockup 8: Hammerin'Claude ────────────────────────────────────────────────

const buildLayers = [
  { label: 'FONDAMENTA', detail: 'Schema DB + tipi', color: '#7F77DD' },
  { label: 'STRUTTURA', detail: 'API routes + logic', color: '#5DCAA5' },
  { label: 'MURA', detail: 'Frontend UI', color: '#7F77DD' },
  { label: 'FINITURE', detail: 'UX polish', color: '#5DCAA5' },
]

function HammerinMockup() {
  const [phase, setPhase] = useState<'survey' | 'decision' | 'build'>('survey')
  const [surveyStep, setSurveyStep] = useState(0)
  const [visibleLayers, setVisibleLayers] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setPhase('survey')
      setSurveyStep(0)
      setVisibleLayers(0)

      // Survey phase
      const surveySteps = ['Sopralluogo...', 'entrypoint + 1 pattern', '~300 righe, 4 domini']
      let si = 0
      const nextSurvey = () => {
        if (isCancelled) return
        si += 1
        setSurveyStep(si)
        if (si < surveySteps.length) {
          setTimeout(nextSurvey, 600)
        } else {
          setTimeout(() => {
            if (isCancelled) return
            setPhase('decision')
            setTimeout(() => {
              if (isCancelled) return
              setPhase('build')
              setVisibleLayers(0)
              let li = 0
              const nextLayer = () => {
                if (isCancelled) return
                li += 1
                setVisibleLayers(li)
                if (li < buildLayers.length) {
                  setTimeout(nextLayer, 550)
                } else {
                  setTimeout(() => { if (!isCancelled) runCycle() }, 2200)
                }
              }
              setTimeout(nextLayer, 400)
            }, 900)
          }, 700)
        }
      }
      setTimeout(nextSurvey, 500)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  const surveyTexts = ['Sopralluogo...', 'entrypoint + 1 pattern', '~300 righe, 4 domini']

  if (phase === 'survey') {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10 }}>🔨</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Hammerin'Claude</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AnimatePresence>
            {surveyTexts.slice(0, surveyStep).map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 9, color: i === 0 ? '#5DCAA5' : '#AFA9EC', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span style={{ color: '#534AB7', fontSize: 8 }}>{i === 0 ? '>' : '  '}</span>
                {text}
                {i === surveyStep - 1 && <Cursor color="#5DCAA5" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (phase === 'decision') {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10 }}>🔨</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Hammerin'Claude</span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'rgba(93,202,165,0.12)', border: '1px solid rgba(93,202,165,0.3)', borderRadius: 5, padding: '6px 8px' }}
        >
          <span style={{ fontSize: 8, color: '#5DCAA5', fontWeight: 700 }}>SQUADRA</span>
          <span style={{ fontSize: 8, color: '#AFA9EC', marginLeft: 6 }}>Opus + 3 Sonnet</span>
        </motion.div>
      </div>
    )
  }

  // Build phase
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10 }}>🔨</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700 }}>Costruzione</span>
        </div>
        <span style={{ fontSize: 7, color: '#5DCAA5', background: 'rgba(93,202,165,0.15)', borderRadius: 3, padding: '1px 5px' }}>
          {visibleLayers}/{buildLayers.length} strati
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <AnimatePresence>
          {buildLayers.slice(0, visibleLayers).map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: `${layer.color}12`,
                border: `1px solid ${layer.color}30`,
                borderRadius: 4,
                padding: '3px 6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 8, color: layer.color, fontWeight: 700 }}>{i + 1}</span>
                <span style={{ fontSize: 8, color: '#EEEDFE', fontWeight: 600 }}>{layer.label}</span>
                <span style={{ fontSize: 7, color: '#AFA9EC' }}>{layer.detail}</span>
              </div>
              <span style={{ fontSize: 9, color: '#5DCAA5' }}>
                {i < visibleLayers - 1 ? '✅' : '⏳'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Mockup 9: itrustyou ──────────────────────────────────────────────────────

const scanFiles = [
  { name: 'package.json', detected: 'Node 20 + Express' },
  { name: 'Dockerfile', detected: 'container-ready' },
  { name: '.github/workflows', detected: 'CI configurato' },
]

const generatedFiles = [
  { name: 'CLAUDE.md', detail: 'stack + deploy + gotcha', color: '#7F77DD' },
  { name: '.claude/settings.json', detail: '6 permessi pre-approvati', color: '#5DCAA5' },
]

function ItrustyouMockup() {
  const [phase, setPhase] = useState<'scan' | 'ask' | 'generate'>('scan')
  const [scanStep, setScanStep] = useState(0)
  const [askTyped, setAskTyped] = useState('')
  const [visibleFiles, setVisibleFiles] = useState(0)

  useEffect(() => {
    let isCancelled = false
    const askText = 'production'

    const runCycle = () => {
      if (isCancelled) return
      setPhase('scan')
      setScanStep(0)
      setAskTyped('')
      setVisibleFiles(0)

      let si = 0
      const nextScan = () => {
        if (isCancelled) return
        si += 1
        setScanStep(si)
        if (si < scanFiles.length) {
          setTimeout(nextScan, 440)
        } else {
          setTimeout(() => {
            if (isCancelled) return
            setPhase('ask')
            let ti = 0
            const typeNext = () => {
              if (isCancelled) return
              ti += 1
              setAskTyped(askText.slice(0, ti))
              if (ti < askText.length) {
                setTimeout(typeNext, 55)
              } else {
                setTimeout(() => {
                  if (isCancelled) return
                  setPhase('generate')
                  let fi = 0
                  const nextFile = () => {
                    if (isCancelled) return
                    fi += 1
                    setVisibleFiles(fi)
                    if (fi < generatedFiles.length) {
                      setTimeout(nextFile, 600)
                    } else {
                      setTimeout(() => { if (!isCancelled) runCycle() }, 2400)
                    }
                  }
                  setTimeout(nextFile, 500)
                }, 700)
              }
            }
            setTimeout(typeNext, 500)
          }, 600)
        }
      }
      setTimeout(nextScan, 400)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  if (phase === 'scan') {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10 }}>🎯</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>itrustyou — sopralluogo</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AnimatePresence>
            {scanFiles.slice(0, scanStep).map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9 }}
              >
                <span style={{ color: '#5DCAA5', fontSize: 8 }}>✓</span>
                <span style={{ color: '#EEEDFE', fontWeight: 600 }}>{f.name}</span>
                <span style={{ color: '#AFA9EC', fontSize: 8 }}>→ {f.detected}</span>
                {i === scanStep - 1 && <Cursor color="#5DCAA5" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (phase === 'ask') {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10 }}>🎯</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>itrustyou — domanda 1/2</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(127,119,221,0.10)', border: '1px solid rgba(127,119,221,0.30)', borderRadius: 5, padding: '6px 8px', marginBottom: 6 }}
        >
          <span style={{ fontSize: 8, color: '#7F77DD', fontWeight: 700 }}>AI 🤖</span>
          <div style={{ fontSize: 9, color: '#EEEDFE', marginTop: 2 }}>
            Ambiente: production, staging o dev?
          </div>
        </motion.div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-start', background: 'rgba(93,202,165,0.08)', borderRadius: 4, padding: '4px 6px' }}>
          <span style={{ fontSize: 8, color: '#5DCAA5', fontWeight: 700 }}>&gt;</span>
          <span style={{ fontSize: 9, color: '#EEEDFE' }}>
            {askTyped}
            <Cursor color="#5DCAA5" />
          </span>
        </div>
      </div>
    )
  }

  // generate phase
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10 }}>🎯</span>
          <span style={{ fontSize: 9, color: '#7F77DD', fontWeight: 700 }}>File generati</span>
        </div>
        <span style={{ fontSize: 7, color: '#5DCAA5', background: 'rgba(93,202,165,0.15)', borderRadius: 3, padding: '1px 5px' }}>
          {visibleFiles}/{generatedFiles.length} ✓
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <AnimatePresence>
          {generatedFiles.slice(0, visibleFiles).map((f) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: `${f.color}12`,
                border: `1px solid ${f.color}30`,
                borderRadius: 4,
                padding: '4px 7px',
              }}
            >
              <span style={{ fontSize: 9, color: '#5DCAA5' }}>📄</span>
              <span style={{ fontSize: 9, color: '#EEEDFE', fontWeight: 600 }}>{f.name}</span>
              <span style={{ fontSize: 8, color: '#AFA9EC', marginLeft: 'auto' }}>{f.detail}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {visibleFiles >= generatedFiles.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: 6, fontSize: 8, color: '#5DCAA5', textAlign: 'center', fontWeight: 700 }}
        >
          ✨ contesto pronto — &lt; 4K token
        </motion.div>
      )}
    </div>
  )
}

// ─── Mockup 10: Event Tracker ────────────────────────────────────────────────

const eventRows = [
  { asset: 'Laptop HP #412', user: 'Rossi M.', date: '14/05', status: 'Consegnato', color: '#5DCAA5' },
  { asset: 'Monitor Dell #89', user: 'Bianchi L.', date: '12/05', status: 'In transito', color: '#ffbd2e' },
  { asset: 'Docking St. #201', user: 'Verdi A.', date: '10/05', status: 'Consegnato', color: '#5DCAA5' },
  { asset: 'Mouse MX #55', user: 'Neri P.', date: '09/05', status: 'Reso', color: '#7F77DD' },
]

function EventTrackerMockup() {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5, paddingBottom: 4, borderBottom: '1px solid rgba(93,202,165,0.2)' }}>
        {['Asset', 'Utente', 'Data', 'Stato'].map((h) => (
          <span key={h} style={{ flex: 1, fontSize: 7.5, color: '#5DCAA5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {eventRows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center', background: i % 2 === 0 ? 'rgba(93,202,165,0.05)' : 'transparent', borderRadius: 3, padding: '2px 3px' }}>
            <span style={{ flex: 1, fontSize: 8.5, color: '#EEEDFE' }}>📦 {row.asset}</span>
            <span style={{ flex: 1, fontSize: 8.5, color: '#AFA9EC' }}>{row.user}</span>
            <span style={{ flex: 1, fontSize: 8.5, color: '#AFA9EC' }}>{row.date}</span>
            <span style={{ flex: 1, fontSize: 7.5, color: row.color, fontWeight: 600, background: `${row.color}18`, borderRadius: 3, padding: '1px 4px', textAlign: 'center' }}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mockup 11: Sudo BugReport ───────────────────────────────────────────────

function BugReportMockup() {
  const [msgIndex, setMsgIndex] = useState(0)
  const messages = [
    { from: 'bot', text: 'Ciao! Descrivi il problema che hai riscontrato.' },
    { from: 'user', text: 'Il portale non carica dopo il login' },
    { from: 'bot', text: 'Capito. Quale browser usi? Si blocca su una pagina specifica?' },
    { from: 'user', text: 'Chrome, resta sulla dashboard vuota' },
    { from: 'bot', text: 'Ticket #247 creato — priorità: Alta. Il team verificherà.' },
  ]

  useEffect(() => {
    if (msgIndex < messages.length - 1) {
      const t = setTimeout(() => setMsgIndex((p) => p + 1), 1600)
      return () => clearTimeout(t)
    }
  }, [msgIndex])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, height: '100%' }}>
      <AnimatePresence>
        {messages.slice(0, msgIndex + 1).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              background: msg.from === 'user' ? 'rgba(127,119,221,0.2)' : 'rgba(93,202,165,0.12)',
              border: `1px solid ${msg.from === 'user' ? 'rgba(127,119,221,0.3)' : 'rgba(93,202,165,0.25)'}`,
              borderRadius: 6,
              padding: '3px 7px',
              maxWidth: '80%',
              fontSize: 8.5,
              color: '#EEEDFE',
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ─── Mockup 12: Claude StatusLine ────────────────────────────────────────────

function StatusLineMockup() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick((p) => (p + 1) % 3), 2200)
    return () => clearInterval(t)
  }, [])

  const usedPct = [34, 52, 78][tick]
  const cost = ['$0.42', '$1.08', '$2.31'][tick]
  const rate5h = [12, 28, 61][tick]

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 8.5, color: '#EEEDFE', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#7F77DD' }}>⚡</span>
        <span>Opus 4.6</span>
        <span style={{ color: '#AFA9EC', marginLeft: 'auto' }}>{cost}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#5DCAA5' }}>📐</span>
        <span>CTX</span>
        <div style={{ flex: 1, height: 4, background: 'rgba(127,119,221,0.2)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div animate={{ width: `${usedPct}%` }} transition={{ duration: 0.6 }} style={{ height: '100%', background: usedPct > 70 ? '#ffbd2e' : '#5DCAA5', borderRadius: 2 }} />
        </div>
        <span style={{ color: usedPct > 70 ? '#ffbd2e' : '#5DCAA5', fontSize: 8 }}>{usedPct}%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: rate5h > 50 ? '#ffbd2e' : '#5DCAA5' }}>⏱</span>
        <span>5h rate</span>
        <span style={{ color: rate5h > 50 ? '#ffbd2e' : '#5DCAA5', marginLeft: 'auto', fontSize: 8 }}>{rate5h}%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>🐛</span>
        <span style={{ color: '#5DCAA5', fontSize: 8 }}>0 BUG</span>
        <span style={{ marginLeft: 6 }}>💡</span>
        <span style={{ color: '#ffbd2e', fontSize: 8 }}>2 REQ</span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectMockupProps {
  projectId: number
}

const urlMap: Record<number, string> = {
  1: 'app.example.com/asset-portal',
  2: 'app.example.com/support',
  3: 'app.example.com/coding',
  4: 'app.example.com/tracker',
  5: 'app.example.com/finance',
  6: 'app.example.com/infra',
  7: 'roster.marcosimone.tech',
  8: 'claude.ai/code/hammerin-claude',
  9: 'claude.ai/code/itrustyou',
  10: 'app.example.com/events',
  11: 'app.example.com/bugreport',
  12: 'github.com/claude-statusline',
}

export default function ProjectMockup({ projectId }: ProjectMockupProps) {
  const url = urlMap[projectId] ?? 'marcosimone.tech'

  const renderContent = () => {
    switch (projectId) {
      case 1: return <AssetMockup />
      case 2: return <SupportMockup />
      case 3: return <CodeTeacherMockup />
      case 4: return <SpotMockup />
      case 5: return <WorkMoneyMockup />
      case 6: return <InfraMockup />
      case 7: return <ShiftFlowMockup />
      case 8: return <HammerinMockup />
      case 9: return <ItrustyouMockup />
      case 10: return <EventTrackerMockup />
      case 11: return <BugReportMockup />
      case 12: return <StatusLineMockup />
      default: return null
    }
  }

  return (
    <BrowserFrame url={url}>
      {renderContent()}
    </BrowserFrame>
  )
}
