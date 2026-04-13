import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const contactHref = t.contact.email
    ? `mailto:${t.contact.email}`
    : t.contact.linkedin

  return (
    <section id="contact" className="py-24 bg-surface-low" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="p-7 sm:p-12 lg:p-16"
          style={{
            background: '#f3f3f3',
            borderTop: '6px solid #ebb94d',
            boxShadow: '0 10px 40px rgba(26,28,28,0.04)',
          }}
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-[11px] uppercase tracking-[0.15em] text-primary mb-4"
            >
              {t.nav.contact}
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="font-headline font-bold text-on-surface mb-5 tracking-tight"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-1px' }}
            >
              {t.contact.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="font-body leading-[1.8] text-on-surface-variant mb-10"
              style={{ fontSize: '15px' }}
            >
              {t.contact.subtitle}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="flex flex-wrap gap-4"
            >

              {/* Entrar em Contato */}
              <a
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-[14px] text-on-surface rounded-lg transition-colors duration-200 hover:border-primary"
                style={{ border: '2px solid #d2c5b0' }}
              >
                {t.contact.btnSecondary}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
