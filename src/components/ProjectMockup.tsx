import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// ─── Browser Frame Wrapper ───────────────────────────────────────────────────

const BrowserFrame = ({ children, url = 'marcosimone.tech/portal' }: { children: React.ReactNode; url?: string }) => (
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

const barData = [
  { label: 'Gen', value: 60, amount: 320 },
  { label: 'Feb', value: 85, amount: 455 },
  { label: 'Mar', value: 55, amount: 290 },
  { label: 'Apr', value: 82, amount: 438 },  // ← gives roughly €1503 total but we cap at 1240
]
const TARGET_TOTAL = 1240

function WorkMoneyMockup() {
  const [animating, setAnimating] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const runCycle = () => {
      if (isCancelled) return
      setAnimating(false)
      setCounter(0)
      setTimeout(() => {
        if (isCancelled) return
        setAnimating(true)
        // animate counter
        const steps = 40
        const stepVal = TARGET_TOTAL / steps
        let step = 0
        const tick = () => {
          if (isCancelled) return
          step += 1
          setCounter(Math.min(Math.round(stepVal * step), TARGET_TOTAL))
          if (step < steps) setTimeout(tick, 35)
          else setTimeout(() => { if (!isCancelled) runCycle() }, 2500)
        }
        tick()
      }, 500)
    }

    runCycle()
    return () => { isCancelled = true }
  }, [])

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {/* Total counter */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: '#AFA9EC' }}>Totale spese:</span>
        <span style={{ fontSize: 14, color: '#EEEDFE', fontWeight: 700, letterSpacing: -0.5 }}>€{counter.toLocaleString('it-IT')}</span>
        <span style={{ fontSize: 7, color: '#5DCAA5', marginLeft: 2 }}>2026</span>
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 52, marginBottom: 8 }}>
        {barData.map((bar) => (
          <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <motion.div
              animate={{ height: animating ? `${bar.value}%` : '0%' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, #7F77DD, #5DCAA5)',
                borderRadius: '3px 3px 0 0',
                minHeight: 2,
              }}
            />
            <span style={{ fontSize: 7, color: '#AFA9EC' }}>{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, borderTop: '1px solid rgba(127,119,221,0.15)', paddingTop: 5 }}>
        {[
          { icon: '🍕', label: 'Ristorante', amount: '-€24,50', color: '#ff5f57' },
          { icon: '🛒', label: 'Supermercato', amount: '-€67,30', color: '#ff5f57' },
        ].map((tx) => (
          <div key={tx.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 9 }}>{tx.icon}</span>
            <span style={{ flex: 1, fontSize: 9, color: '#AFA9EC' }}>{tx.label}</span>
            <span style={{ fontSize: 9, color: tx.color, fontWeight: 600 }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mockup 6: Infrastructure VPS ────────────────────────────────────────────

const terminalLines = [
  { text: '$ docker ps', color: '#5DCAA5' },
  { text: '✅ portfolio-nginx    UP 2h',  color: '#EEEDFE' },
  { text: '✅ asset-portal       UP 5d',  color: '#EEEDFE' },
  { text: '✅ sudo-support-it    UP 12d', color: '#EEEDFE' },
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

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectMockupProps {
  projectId: number
}

const urlMap: Record<number, string> = {
  1: 'asset-portal.marcosimone.tech',
  2: 'sudo-support-it.marcosimone.tech',
  3: 'sudo-codingteacher.marcosimone.tech',
  4: 'sudo-tracker-spot.marcosimone.tech',
  5: 'workmoney.marcosimone.tech',
  6: 'vps.marcosimone.tech/infra',
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
      default: return null
    }
  }

  return (
    <BrowserFrame url={url}>
      {renderContent()}
    </BrowserFrame>
  )
}
