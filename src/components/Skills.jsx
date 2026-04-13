import { useRef, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { useSkills } from '../hooks/useSkills'
import FloatingIcons from './background/FloatingIcons'

const SKILL_ICONS = {
  'Iniciação em Revit':  'view_in_ar',
  'Revit Introduction':  'view_in_ar',
  'Estudos em AutoCAD':  'architecture',
  'AutoCAD Studies':     'architecture',
  'SketchUp (Básico)':   'deployed_code',
  'SketchUp (Basic)':    'deployed_code',
  'Pacote Adobe':        'palette',
  'Adobe Suite':         'palette',
}

const ACCENT_COLORS = ['#ebb94d', '#7a5900', '#ebb94d', '#7a5900']

function SkillCard({ item, index, isInView }) {
  const icon = SKILL_ICONS[item.name] || 'auto_awesome'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
      className="bg-white p-6 flex flex-col gap-4"
      style={{
        borderBottom: `3px solid ${ACCENT_COLORS[index % ACCENT_COLORS.length]}`,
        boxShadow: '0 10px 40px rgba(26,28,28,0.04)',
      }}
    >
      <span
        className="material-symbols-outlined text-on-surface-variant"
        style={{ fontSize: '28px', opacity: 0.7 }}
      >
        {icon}
      </span>

      <div>
        <h4 className="font-headline font-bold text-on-surface text-sm mb-1.5 tracking-tight">
          {item.name}
        </h4>
        <span className="font-body text-[10px] uppercase tracking-[0.08em] text-primary">
          {item.level}
        </span>
      </div>

      <div className="mt-auto">
        <div
          className="w-full overflow-hidden"
          style={{ height: '3px', background: '#e8e8e8', borderRadius: '2px' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
            transition={{ duration: 0.9, delay: 0.35 + index * 0.08, ease: 'easeOut' }}
            style={{ height: '100%', background: '#ebb94d', borderRadius: '2px' }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-body text-[10px] text-on-surface-variant opacity-40">0%</span>
          <span className="font-body text-[10px] text-primary font-medium">
            {item.progress}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function SkillCardSkeleton({ index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
      className="bg-white p-6 flex flex-col gap-4"
      style={{
        borderBottom: `3px solid #e8e8e8`,
        boxShadow: '0 10px 40px rgba(26,28,28,0.04)',
      }}
    >
      <div className="w-7 h-7 bg-[#e8e8e8] rounded animate-pulse" />
      <div>
        <div className="h-4 w-3/4 bg-[#e8e8e8] rounded mb-2 animate-pulse" />
        <div className="h-3 w-1/2 bg-[#e8e8e8] rounded animate-pulse" />
      </div>
      <div className="mt-auto">
        <div className="w-full h-[3px] bg-[#e8e8e8] rounded animate-pulse" />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const { skills, loading } = useSkills()
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

        {/* Row 1 — 4 skill cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {loading
            ? Array.from({ length: 4 }, (_, i) => (
                <SkillCardSkeleton key={i} index={i} isInView={isInView} />
              ))
            : items.map((item, i) => (
                <SkillCard key={item.id ?? i} item={item} index={i} isInView={isInView} />
              ))}
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
