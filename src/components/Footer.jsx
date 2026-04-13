import { useLanguage } from './LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { label: 'LinkedIn', href: t.contact.linkedin },
    { label: 'Email', href: `mailto:${t.contact.email}` },
  ]

  return (
    <footer
      className="py-8 bg-surface-low"
      style={{ borderTop: '1px solid #e8e8e8' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Copyright */}
        <p className="font-body text-[12px] text-on-surface opacity-35 text-center sm:text-left">
          {t.footer.rights}
        </p>

        {/* Social links */}
        <nav className="flex items-center gap-6" aria-label="Social links">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-body text-[11px] uppercase tracking-[0.08em] text-on-surface opacity-45 hover:opacity-100 transition-opacity duration-200 hover:underline decoration-[#ebb94d] underline-offset-4"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
