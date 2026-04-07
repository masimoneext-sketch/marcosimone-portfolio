import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Progetti', href: '#projects' },
  { label: 'Soluzioni', href: '#solutions' },
  { label: 'Contatti', href: '#contact' },
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
  {
    icon: '📧',
    label: 'Email',
    href: 'mailto:ma.simone.ext@gmail.com',
  },
]

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #7F77DD 35%, #5DCAA5 65%, transparent 100%)',
        }}
      />

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[#7F77DD]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Marco Simone Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                }}
              />
              <div>
                <p className="text-[#EEEDFE] font-bold text-base leading-tight">
                  Marco Simone Solutions
                </p>
                <p
                  className="text-xs font-semibold tracking-[0.25em] mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  LEARN · CODE · EVOLVE
                </p>
              </div>
            </div>
            <p className="text-[#AFA9EC] text-sm leading-relaxed">
              IT Solutions Architect — portali enterprise-ready per il mercato IT support
              aziendale.
            </p>
          </motion.div>

          {/* Quick links column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[#7F77DD] text-xs font-semibold uppercase tracking-widest mb-1">
              Link Rapidi
            </p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#AFA9EC] text-sm hover:text-[#7F77DD] transition-colors duration-200 flex items-center gap-1.5 group w-fit"
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-[#7F77DD]/40 group-hover:bg-[#7F77DD] transition-colors"
                  />
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[#7F77DD] text-xs font-semibold uppercase tracking-widest mb-1">
              Contatti & Social
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="text-[#AFA9EC] text-sm hover:text-[#5DCAA5] transition-colors duration-200 flex items-center gap-2 w-fit"
                >
                  <span>{social.icon}</span>
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-[#7F77DD]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#AFA9EC]"
        >
          <p>© {currentYear} Marco Simone. Tutti i diritti riservati.</p>
          <p className="flex items-center gap-1.5">
            Sviluppato con React + Tailwind +{' '}
            <span className="text-red-400">❤️</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
