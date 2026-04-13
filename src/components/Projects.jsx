import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { useProjects } from '../hooks/useProjects'

function ToolPills({ tools }) {
  if (!tools || tools.length === 0) return null
  const visible = tools.slice(0, 3)
  const overflow = tools.length - 3

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
      {visible.map(tool => (
        <span key={tool} style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#7a5900',
          background: 'rgba(235,185,77,0.15)',
          border: '1px solid rgba(235,185,77,0.3)',
          padding: '3px 10px',
          borderRadius: '999px',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          {tool}
        </span>
      ))}
      {overflow > 0 && (
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#807664',
          background: '#f3f3f3',
          border: '1px solid #e8e8e8',
          padding: '3px 10px',
          borderRadius: '999px',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          +{overflow}
        </span>
      )}
    </div>
  )
}

function ProjectCard({ project, index, isInView }) {
  const coverImage = project.images?.[0] ?? project.image ?? null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="group rounded-lg overflow-hidden cursor-pointer"
      style={{ boxShadow: '0 10px 40px rgba(26,28,28,0.04)' }}
    >
      {/* Image area */}
      <div
        className="w-full bg-[#eeeeee] relative overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {coverImage && (
          <img
            src={coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Glassmorphism hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{
            background: 'rgba(249,249,249,0.85)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="font-body text-[13px] text-primary font-medium tracking-wide">
            Ver projeto →
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        className="p-5 bg-white"
        style={{ borderBottom: '3px solid #ebb94d' }}
      >
        {project.category && (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full font-body text-[11px] font-medium mb-3"
            style={{ background: 'rgba(235,185,77,0.18)', color: '#7a5900' }}
          >
            {project.category}
          </span>
        )}
        <h3 className="font-headline font-bold text-on-surface text-base mb-2 tracking-tight">
          {project.title}
        </h3>
        {(project.description || project.desc) && (
          <p className="font-body text-[13px] text-on-surface-variant leading-relaxed">
            {project.description ?? project.desc}
          </p>
        )}
        <ToolPills tools={project.tools} />
      </div>
    </motion.div>
  )
}

function ProjectCardSkeleton({ index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="rounded-lg overflow-hidden"
      style={{ boxShadow: '0 10px 40px rgba(26,28,28,0.04)' }}
    >
      <div className="w-full bg-[#eeeeee] animate-pulse" style={{ aspectRatio: '16/9' }} />
      <div className="p-5 bg-white" style={{ borderBottom: '3px solid #e8e8e8' }}>
        <div className="h-3 w-20 bg-[#e8e8e8] rounded-full mb-3 animate-pulse" />
        <div className="h-5 w-3/4 bg-[#e8e8e8] rounded mb-2 animate-pulse" />
        <div className="h-3 w-full bg-[#e8e8e8] rounded animate-pulse" />
      </div>
    </motion.div>
  )
}

function EmptyState({ isInView, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="py-28 flex flex-col items-center justify-center"
    >
      {/* Architectural crosshair decoration */}
      <div className="relative w-20 h-20 mb-10">
        <div
          className="absolute top-1/2 left-0 right-0"
          style={{ height: '1px', background: '#d2c5b0', transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute left-1/2 top-0 bottom-0"
          style={{ width: '1px', background: '#d2c5b0', transform: 'translateX(-50%)' }}
        />
        {[
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: 0 },
          { bottom: 0, right: 0 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3"
            style={{
              ...pos,
              borderTop: i < 2 ? '1px solid #d2c5b0' : 'none',
              borderBottom: i >= 2 ? '1px solid #d2c5b0' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid #d2c5b0' : 'none',
              borderRight: i % 2 === 1 ? '1px solid #d2c5b0' : 'none',
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
          style={{ background: '#ebb94d', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <h3
        className="font-headline font-bold text-on-surface mb-3 tracking-tight"
        style={{ fontSize: '20px' }}
      >
        {lang === 'pt' ? 'Projetos em Desenvolvimento' : 'Projects in Development'}
      </h3>
      <p className="font-body text-[14px] text-on-surface-variant text-center opacity-60 max-w-xs leading-relaxed">
        {lang === 'pt'
          ? 'Os trabalhos acadêmicos serão publicados em breve, via integração com Notion.'
          : 'Academic work will be published soon, via Notion integration.'}
      </p>
    </motion.div>
  )
}

export default function Projects() {
  const { t, lang } = useLanguage()
  const { projects, loading } = useProjects()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 bg-surface-low" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-primary mb-3">
            {t.projects.sectionLabel}
          </p>
          <h2
            className="font-headline font-bold text-on-surface"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1px' }}
          >
            {t.projects.sectionTitle}
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <ProjectCardSkeleton key={i} index={i} isInView={isInView} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState isInView={isInView} lang={lang} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id ?? i} project={project} index={i} isInView={isInView} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
