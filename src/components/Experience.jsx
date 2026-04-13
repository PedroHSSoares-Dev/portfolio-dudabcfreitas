import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { useExperiences } from '../hooks/useExperiences'
import { formatPeriod, formatDuration } from '../utils/dateUtils'

export default function Experience() {
  const { lang, t } = useLanguage()
  const { experiences, loading } = useExperiences()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (loading) return (
    <section className="py-24" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-3 w-28 bg-[#e8e8e8] rounded mb-3 animate-pulse" />
        <div className="h-8 w-64 bg-[#e8e8e8] rounded mb-14 animate-pulse" />
        <div className="h-28 bg-[#e8e8e8] rounded animate-pulse" />
      </div>
    </section>
  )

  if (experiences.length === 0) return null

  return (
    <section ref={ref} className="py-24" style={{ background: '#f3f3f3' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-primary mb-3">
            {t.experience.sectionLabel}
          </p>
          <h2
            className="font-headline font-bold text-on-surface"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1px' }}
          >
            {t.experience.sectionTitle}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6" style={{ borderLeft: '2px solid #d2c5b0' }}>
          {experiences.map((exp, i) => {
            const period = formatPeriod(exp.startDate, exp.endDate, lang)
            const duration = formatDuration(exp.startDate, exp.endDate)
            const description = lang === 'pt' ? exp.descriptionPT : exp.descriptionEN

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="relative mb-10 last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[1.45rem] top-1.5"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#7a5900',
                    border: '2px solid #f3f3f3',
                    boxShadow: '0 0 0 2px #d2c5b0',
                  }}
                />

                {/* Card */}
                <div
                  className="ml-2 p-6 bg-surface"
                  style={{ boxShadow: '0 10px 40px rgba(26,28,28,0.04)' }}
                >
                  {/* Role + period row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3
                        className="font-headline font-bold text-on-surface"
                        style={{ fontSize: '18px' }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="font-body font-medium text-on-surface-variant mt-0.5"
                        style={{ fontSize: '15px' }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span
                        className="font-body"
                        style={{ fontSize: '12px', color: '#807664' }}
                      >
                        {period}
                      </span>
                      <span
                        className="font-body font-semibold"
                        style={{
                          fontSize: '11px',
                          color: '#7a5900',
                          background: 'rgba(235,185,77,0.15)',
                          padding: '2px 8px',
                          borderRadius: '999px',
                        }}
                      >
                        {duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {description && (
                    <p
                      className="font-body text-on-surface-variant mb-4"
                      style={{ fontSize: '14px', lineHeight: 1.7 }}
                    >
                      {description}
                    </p>
                  )}

                  {/* Tags */}
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-body"
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#7a5900',
                            background: 'rgba(235,185,77,0.15)',
                            padding: '3px 10px',
                            borderRadius: '999px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
