import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_KEYS = ['home', 'about', 'projects', 'contact']

function Hamburger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] shrink-0"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        className="block w-5 h-px rounded-full"
        style={{ background: '#1a1c1c' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        className="block w-5 h-px rounded-full"
        style={{ background: '#1a1c1c' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22 }}
        className="block w-5 h-px rounded-full"
        style={{ background: '#1a1c1c' }}
      />
    </button>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    NAV_KEYS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled])

  const scrollTo = id => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex justify-center pt-4 px-4">
        <motion.div
          initial={false}
          animate={{
            maxWidth: scrolled ? '860px' : '1152px',
            paddingTop: scrolled ? '10px' : '0px',
            paddingBottom: scrolled ? '10px' : '0px',
            paddingLeft: scrolled ? '24px' : '0px',
            paddingRight: scrolled ? '24px' : '0px',
            borderRadius: scrolled ? '999px' : '0px',
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={`w-full flex items-center justify-between ${scrolled ? 'glass-nav' : ''}`}
        >
          {/* Name / Logo */}
          <span className="font-headline font-bold text-on-surface text-sm whitespace-nowrap overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={scrolled ? 'short' : 'full'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {scrolled ? 'MEF' : 'Maria Eduarda Freitas'}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center gap-5">
            {NAV_KEYS.map(key => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className={`font-body text-[12px] uppercase tracking-[0.04em] pb-0.5 border-b-2 transition-all duration-200 ${
                  activeSection === key
                    ? 'text-primary opacity-100 border-primary-container'
                    : 'text-on-surface opacity-50 border-transparent hover:opacity-80'
                }`}
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>

          {/* Right side: language switcher + mobile hamburger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(o => !o)} />
          </div>
        </motion.div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="sm:hidden mx-4 mt-2 glass-nav overflow-hidden"
            style={{ borderRadius: '16px' }}
          >
            <nav className="flex flex-col py-3">
              {NAV_KEYS.map(key => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className={`font-body text-[13px] uppercase tracking-[0.06em] px-6 py-3 text-left transition-colors duration-150 ${
                    activeSection === key
                      ? 'text-primary bg-primary/5'
                      : 'text-on-surface opacity-60 hover:opacity-100 hover:bg-black/5'
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
