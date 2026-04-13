import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { calculateSemesterProgress, formatPeriod } from '../utils/dateUtils'
import { useEducation } from '../hooks/useEducation'

const ProgressPill = ({ current, total }) => {
  if (total == null || total === 0) return null
  const isComplete = current >= total
  const pct = Math.min(100, Math.max(0, (current / total) * 100))

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
      <div style={{
        position: 'relative',
        width: '64px',
        height: '6px',
        borderRadius: '999px',
        overflow: 'hidden',
        background: '#e8e8e8',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${pct}%`,
          background: isComplete ? '#4f7a28' : '#ebb94d',
          borderRadius: '999px',
          transition: 'width 0.5s ease',
        }} />
      </div>
      <span style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#7a5900',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.04em',
      }}>
        {current}/{total} sem
      </span>
    </div>
  )
}

function EducationSkeleton() {
  return (
    <div className="relative mb-8">
      <div
        className="absolute -left-[1.45rem] top-1 w-3 h-3 rounded-full"
        style={{ background: '#e8e8e8' }}
      />
      <div className="h-3 w-24 bg-[#e8e8e8] rounded mb-2 animate-pulse" />
      <div className="h-5 w-52 bg-[#e8e8e8] rounded mb-1 animate-pulse" />
      <div className="h-4 w-40 bg-[#e8e8e8] rounded mb-2 animate-pulse" />
      <div className="h-6 w-36 bg-[#e8e8e8] rounded animate-pulse" />
    </div>
  )
}

export default function About() {
  const { t, lang } = useLanguage()
  const { education, loading: educationLoading } = useEducation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-primary mb-3">
            {t.nav.about}
          </p>
          <h2
            className="font-headline font-bold text-on-surface"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1px' }}
          >
            {t.about.educationTitle} &amp; {t.about.goalsTitle}
          </h2>
        </motion.div>

        {/* Two-column blocks — gap trick creates a hairline divider */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '1px', background: '#e8e8e8' }}
        >
          {/* Left — Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="bg-surface p-10"
          >
            <h3 className="font-headline font-bold text-on-surface text-lg mb-8 tracking-tight">
              {t.about.educationTitle}
            </h3>

            {/* Timeline */}
            <div
              style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #d2c5b0' }}
            >
              {educationLoading ? (
                <EducationSkeleton />
              ) : (
                education.map((item, i) => (
                  <div key={item.id ?? i} style={{ position: 'relative', marginBottom: i < education.length - 1 ? '32px' : 0 }}>
                    {/* Gold dot — centered on the border line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-25px',
                        top: '4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#7a5900',
                        border: '2px solid #f9f9f9',
                        boxShadow: '0 0 0 2px #d2c5b0',
                      }}
                    />
                    <p className="font-body text-[11px] uppercase tracking-[0.1em] text-primary mb-2">
                      {item.startDate
                        ? formatPeriod(item.startDate, item.endDate, lang)
                        : item.date}
                    </p>
                    <h4 className="font-headline font-bold text-on-surface text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-[13px] text-on-surface-variant font-medium mb-2">
                      {item.institution}
                    </p>
                    {item.startDate && item.totalSemesters != null && (() => {
                      const progress = calculateSemesterProgress(
                        item.startDate,
                        item.endDate,
                        item.totalSemesters
                      )
                      if (!progress || progress.total == null) return null
                      return <ProgressPill current={progress.current} total={progress.total} />
                    })()}
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right — Career Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="bg-surface-low p-10"
          >
            <h3 className="font-headline font-bold text-on-surface text-lg mb-8 tracking-tight">
              {t.about.goalsTitle}
            </h3>

            <div className="flex flex-col" style={{ gap: '36px' }}>
              {t.about.goals.map((goal, i) => (
                <div key={i} className="relative pl-5" style={{ borderLeft: '3px solid #ebb94d' }}>
                  <h4 className="font-headline font-bold text-on-surface text-base mb-1 tracking-tight">
                    {goal.title}
                  </h4>
                  {goal.subtitle && (
                    <p className="font-body text-[11px] uppercase tracking-[0.1em] text-primary mb-2">
                      {goal.subtitle}
                    </p>
                  )}
                  <p className="font-body text-[14px] text-on-surface-variant leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
