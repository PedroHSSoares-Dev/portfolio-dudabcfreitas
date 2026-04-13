import { motion } from 'framer-motion'
import { useLanguage } from './LanguageContext'
import { fadeInUp, fadeInRight, staggerContainer } from '../utils/animations'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="min-h-screen flex items-center py-24 pt-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Photo column — col-span-5 */}
          <motion.div
            className="col-span-12 md:col-span-5"
            variants={fadeInUp}
          >
            <div className="relative">
              {/* Decorative ambient blur */}
              <div
                className="absolute -inset-8 -z-10 rounded-full opacity-25"
                style={{ background: '#ebb94d', filter: 'blur(72px)' }}
              />
              {/* Profile photo */}
              <div
                className="w-full rounded-lg bg-[#eeeeee] relative overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/profile.jpeg"
                  alt="Maria Eduarda Freitas"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Text column — col-span-7 */}
          <motion.div
            className="col-span-12 md:col-span-7 flex flex-col"
            variants={staggerContainer}
            style={{ gap: '28px' }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeInRight}
              className="font-body text-[11px] uppercase tracking-[0.15em] text-primary"
            >
              {t.hero.eyebrow}
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeInRight}
              className="font-headline font-extrabold text-on-surface leading-[1.05]"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                letterSpacing: '-2px',
              }}
            >
              {t.hero.name}
            </motion.h1>

            {/* Divider */}
            <motion.div
              variants={fadeInRight}
              className="w-12 h-px"
              style={{ background: '#ebb94d' }}
            />

            {/* Bio paragraphs */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-4">
              <motion.p
                variants={fadeInUp}
                className="font-body leading-[1.8] text-on-surface-variant"
                style={{ fontSize: '15px', maxWidth: '440px' }}
              >
                {t.hero.bio1}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="font-body leading-[1.8] text-on-surface-variant"
                style={{ fontSize: '15px', maxWidth: '440px' }}
              >
                {t.hero.bio2}
              </motion.p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 pt-2"
            >
              <div
                className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5"
                style={{ borderColor: '#d2c5b0' }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full"
                  style={{ background: '#ebb94d' }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                />
              </div>
              <span className="font-body text-[11px] uppercase tracking-[0.1em] text-on-surface-variant opacity-50">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
