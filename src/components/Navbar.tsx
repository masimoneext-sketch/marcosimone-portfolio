import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Progetti', to: 'projects' },
  { label: 'Soluzioni', to: 'solutions' },
  { label: 'Esperienza', to: 'experience' },
  { label: 'Contatti', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-dark-900/80 border-b border-purple-700/30 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="hero"
              smooth
              duration={600}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <img
                src="/logo.svg"
                alt="Marco Simone logo"
                style={{ height: 56, width: 'auto' }}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-gradient font-bold text-2xl tracking-tight hidden sm:block">
                Marco Simone
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-64}
                    spy
                    activeClass="text-purple-300"
                    className={`
                      relative px-3 py-2 text-sm font-medium text-purple-100/80
                      hover:text-purple-300 cursor-pointer transition-colors duration-200
                      after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                      after:bg-gradient-to-r after:from-purple-400 after:to-teal-400
                      after:origin-left after:scale-x-0 hover:after:scale-x-100
                      after:transition-transform after:duration-300
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-purple-300 hover:text-purple-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            >
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-dark-700 border-l border-purple-700/30 shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-purple-700/20">
                <span className="text-gradient font-bold text-base">Marco Simone</span>
                <button
                  className="p-1 text-purple-300 hover:text-purple-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Chiudi menu"
                >
                  <HiX size={22} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      smooth
                      duration={600}
                      offset={-64}
                      spy
                      activeClass="bg-purple-900/40 text-purple-300"
                      className="block px-4 py-3 rounded-lg text-purple-100/80 hover:bg-purple-900/30 hover:text-purple-300 transition-all duration-200 cursor-pointer font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 pb-8 pt-4 border-t border-purple-700/20">
                <p className="text-purple-300/50 text-xs text-center">
                  © 2025 Marco Simone
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
