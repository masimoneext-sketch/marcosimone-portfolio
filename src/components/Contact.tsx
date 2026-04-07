import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success'

const initialForm: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const subjectOptions = [
  { value: '', label: 'Seleziona un argomento...' },
  { value: 'Consulenza IT', label: 'Consulenza IT' },
  { value: 'Sviluppo portale', label: 'Sviluppo portale' },
  { value: 'Collaborazione', label: 'Collaborazione' },
  { value: 'Altro', label: 'Altro' },
]

const infoCards = [
  {
    icon: '📧',
    label: 'Email',
    value: 'ma.simone.ext@gmail.com',
    href: 'mailto:ma.simone.ext@gmail.com',
  },
  {
    icon: '📍',
    label: 'Posizione',
    value: 'Roma, Italia',
    href: null,
  },
  {
    icon: '💼',
    label: 'Open to',
    value: 'Consulenze IT, Sviluppo Software, Collaborazioni',
    href: null,
  },
]

const socialLinks = [
  {
    icon: '🔗',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/it-marco-simone/',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    href: 'https://github.com/masimoneext-sketch',
  },
]

interface FloatingInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

function FloatingInput({ id, label, type = 'text', value, onChange, required }: FloatingInputProps) {
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full bg-[#1a1830] border border-[#7F77DD]/25 rounded-xl px-4 pt-6 pb-2 text-[#EEEDFE] text-sm
          focus:outline-none focus:border-[#7F77DD]/70 transition-colors duration-200
          placeholder-transparent"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-[#AFA9EC] transition-all duration-200 pointer-events-none
          ${
            hasValue
              ? 'top-2 text-xs text-[#7F77DD]'
              : 'top-1/2 -translate-y-1/2 text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F77DD] peer-focus:-translate-y-0'
          }`}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
    </div>
  )
}

interface FloatingTextareaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  rows?: number
}

function FloatingTextarea({ id, label, value, onChange, required, rows = 5 }: FloatingTextareaProps) {
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        rows={rows}
        className="peer w-full bg-[#1a1830] border border-[#7F77DD]/25 rounded-xl px-4 pt-6 pb-2 text-[#EEEDFE] text-sm
          focus:outline-none focus:border-[#7F77DD]/70 transition-colors duration-200
          placeholder-transparent resize-none"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-[#AFA9EC] transition-all duration-200 pointer-events-none
          ${
            hasValue
              ? 'top-2 text-xs text-[#7F77DD]'
              : 'top-4 text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#7F77DD]'
          }`}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
    </div>
  )
}

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleField =
    (field: keyof FormData) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const subject = encodeURIComponent(
      form.subject ? `[Portfolio] ${form.subject}` : '[Portfolio] Nuovo messaggio'
    )
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nOggetto: ${form.subject}\n\n${form.message}`
    )

    setTimeout(() => {
      window.open(
        `mailto:ma.simone.ext@gmail.com?subject=${subject}&body=${body}`,
        '_blank'
      )
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setForm(initialForm)
      }, 3500)
    }, 600)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 bg-[#0f0e1a] relative overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ animation: 'mesh-shift 10s ease-in-out infinite alternate' }}
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#7F77DD]/6 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#5DCAA5]/6 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#7F77DD] text-sm font-semibold tracking-widest uppercase">
            [ Contatti ]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#EEEDFE]">
            Parliamo del tuo{' '}
            <span className="text-gradient">Prossimo Progetto</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN — Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-[#AFA9EC] text-base leading-relaxed">
                Sono disponibile per consulenze IT, sviluppo portali enterprise e collaborazioni.
                Rispondo entro 24 ore.
              </p>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="card-glass rounded-xl px-4 py-3 flex items-start gap-3"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{card.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[#7F77DD] text-xs font-semibold uppercase tracking-wide mb-0.5">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="text-[#EEEDFE] text-sm hover:text-[#5DCAA5] transition-colors break-all"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-[#EEEDFE] text-sm">{card.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg card-glass text-sm font-semibold text-[#EEEDFE] transition-colors hover:text-[#7F77DD]"
                >
                  <span>{social.icon}</span>
                  {social.label}
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-2 text-sm text-[#5DCAA5]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Disponibile per nuovi progetti
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="card-glass rounded-2xl p-6 md:p-8 flex flex-col gap-5"
            >
              <FloatingInput
                id="contact-name"
                label="Nome"
                value={form.name}
                onChange={handleField('name')}
                required
              />

              <FloatingInput
                id="contact-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleField('email')}
                required
              />

              {/* Subject select */}
              <div className="relative">
                <select
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => handleField('subject')(e.target.value)}
                  className="w-full bg-[#1a1830] border border-[#7F77DD]/25 rounded-xl px-4 py-3.5 text-sm
                    focus:outline-none focus:border-[#7F77DD]/70 transition-colors duration-200
                    appearance-none cursor-pointer"
                  style={{
                    color: form.subject ? '#EEEDFE' : '#AFA9EC',
                  }}
                >
                  {subjectOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      style={{ background: '#1a1830', color: '#EEEDFE' }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AFA9EC] pointer-events-none text-xs">
                  ▾
                </span>
              </div>

              <FloatingTextarea
                id="contact-message"
                label="Messaggio"
                value={form.message}
                onChange={handleField('message')}
                required
                rows={5}
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={status !== 'idle'}
                whileTap={status === 'idle' ? { scale: 0.95 } : {}}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                className="relative w-full py-3.5 rounded-xl font-semibold text-sm text-[#0f0e1a] overflow-hidden transition-opacity disabled:cursor-not-allowed"
                style={{
                  background:
                    status === 'success'
                      ? 'linear-gradient(135deg, #5DCAA5 0%, #3aaf89 100%)'
                      : 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
                  opacity: status === 'loading' ? 0.8 : 1,
                }}
              >
                {status === 'idle' && (
                  <span className="flex items-center justify-center gap-2">
                    <span>✉️</span> Invia Messaggio
                  </span>
                )}
                {status === 'loading' && (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-[#0f0e1a]/40 border-t-[#0f0e1a] rounded-full animate-spin" />
                    Invio in corso...
                  </span>
                )}
                {status === 'success' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    >
                      ✓
                    </motion.span>
                    Client email aperto — grazie!
                  </motion.span>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs text-[#5DCAA5]"
                >
                  Il tuo client email si apre con il messaggio precompilato.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes mesh-shift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(20px, -15px) scale(1.05); }
          100% { transform: translate(-10px, 10px) scale(0.98); }
        }
      `}</style>
    </section>
  )
}
