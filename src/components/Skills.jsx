import { useRef, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { useSkills } from '../hooks/useSkills'
import { useProjects } from '../hooks/useProjects'
import FloatingIcons from './background/FloatingIcons'

const ACCENT_COLORS = ['#ebb94d', '#7a5900', '#ebb94d', '#7a5900']

function SkillCard({ item, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
      className="bg-white p-6 flex flex-col gap-3"
      style={{
        borderBottom: `3px solid ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`,
        boxShadow: '0 10px 40px rgba(26,28,28,0.04)',
      }}
    >
      {/* Level badge */}
      <span className="font-body text-[10px] uppercase tracking-[0.08em] text-primary font-bold">
        {item.level}
      </span>

      {/* Skill name */}
      <h4 className="font-headline font-bold text-on-surface text-sm tracking-tight">
        {item.name}
      </h4>

      {/* Stats row */}
      {(item.yearsOfUse || item.projectCount > 0) && (
        <div className="flex gap-4 flex-wrap mt-auto pt-2">
          {item.yearsOfUse && (
            <div>
              <div style={{ fontSize: '10px', color: '#807664', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                Desde
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#4f4636', fontFamily: 'Inter, sans-serif' }}>
                {item.yearsOfUse}
              </div>
            </div>
          )}
          {item.projectCount > 0 && (
            <div>
              <div style={{ fontSize: '10px', color: '#807664', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                Projetos
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#4f4636', fontFamily: 'Inter, sans-serif' }}>
                {item.projectCount}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

function SkillCardSkeleton({ index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
      className="bg-white p-6 flex flex-col gap-3"
      style={{
        borderBottom: `3px solid #e8e8e8`,
        boxShadow: '0 10px 40px rgba(26,28,28,0.04)',
      }}
    >
      <div className="h-3 w-16 bg-[#e8e8e8] rounded animate-pulse" />
      <div className="h-4 w-3/4 bg-[#e8e8e8] rounded animate-pulse" />
      <div className="flex gap-4 mt-auto pt-2">
        <div className="h-8 w-12 bg-[#e8e8e8] rounded animate-pulse" />
        <div className="h-8 w-12 bg-[#e8e8e8] rounded animate-pulse" />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const { projects } = useProjects()
  const { skills, loading } = useSkills(projects)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Fallback to static translations if Notion returns nothing
  const items = !loading && skills.length === 0 ? t.skills.items : skills

  return (
    <section id="skills" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-primary mb-3">
            {t.skills.sectionLabel}
          </p>
          <h2
            className="font-headline font-bold text-on-surface"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1px' }}
          >
            {t.skills.sectionTitle}
          </h2>
        </motion.div>

        {/* Row 1 — skills carousel */}
        <div className="mb-4">
          <style>{`.skills-carousel::-webkit-scrollbar { display: none; }`}</style>
          <div
            className="skills-carousel"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: '16px',
              paddingBottom: '16px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {loading
              ? Array.from({ length: 4 }, (_, i) => (
                  <div key={i} style={{ flex: '0 0 220px', scrollSnapAlign: 'start' }}>
                    <SkillCardSkeleton index={i} isInView={isInView} />
                  </div>
                ))
              : items.map((item, i) => (
                  <div key={item.id ?? i} style={{ flex: '0 0 220px', scrollSnapAlign: 'start' }}>
                    <SkillCard item={item} index={i} isInView={isInView} />
                  </div>
                ))}
          </div>
        </div>

        {/* Row 2 — dark strip + 3D canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="p-8 flex flex-col gap-5"
            style={{ background: '#1a1c1c', minHeight: '220px' }}
          >
            <p className="font-body text-[11px] uppercase tracking-[0.1em] text-white opacity-35">
              {t.skills.sectionLabel === 'Em Aprendizado' ? 'Interesses' : 'Interests'}
            </p>
            <p className="font-body text-[14px] text-white leading-relaxed" style={{ opacity: 0.65 }}>
              {t.skills.interests}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {t.skills.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-body text-[11px] text-white px-3 py-1"
                  style={{
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    opacity: 0.65,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5 }}
            style={{ height: '220px', background: '#f9f9f9', overflow: 'hidden' }}
          >
            <Suspense
              fallback={
                <div className="w-full h-full" style={{ background: '#f9f9f9' }} />
              }
            >
              <FloatingIcons />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
