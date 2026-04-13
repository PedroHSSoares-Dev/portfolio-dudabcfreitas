import { useLanguage } from './LanguageContext'

function BrazilFlag() {
  return (
    <svg
      viewBox="0 0 30 21"
      width="22"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Português (Brasil)"
    >
      <rect width="30" height="21" fill="#009c3b" />
      <polygon points="15,2.5 27.5,10.5 15,18.5 2.5,10.5" fill="#ffdf00" />
      <circle cx="15" cy="10.5" r="5.8" fill="#002776" />
      <path
        d="M9.5 10.5 Q15 7.8 20.5 10.5"
        stroke="white"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function USFlag() {
  const stripeHeight = 21 / 13
  return (
    <svg
      viewBox="0 0 30 21"
      width="22"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="English (US)"
    >
      <rect width="30" height="21" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map(i => (
        <rect
          key={i}
          y={i * stripeHeight}
          width="30"
          height={stripeHeight}
          fill="white"
        />
      ))}
      <rect width="12" height={stripeHeight * 7} fill="#3C3B6E" />
      {Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: row % 2 === 0 ? 6 : 5 }, (__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={(row % 2 === 0 ? 1 : 2.2) + col * 2 + 0.6}
            cy={1.05 + row * 0.77 + 0.35}
            r="0.42"
            fill="white"
          />
        ))
      )}
    </svg>
  )
}

export default function LanguageSwitcher() {
  const { lang, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-primary-container hover:bg-primary text-on-primary-fixed font-body font-semibold text-[11px] tracking-wide transition-colors duration-200 cursor-pointer"
    >
      {lang === 'pt' ? <BrazilFlag /> : <USFlag />}
      <span>{lang === 'pt' ? 'PT' : 'EN'}</span>
    </button>
  )
}
