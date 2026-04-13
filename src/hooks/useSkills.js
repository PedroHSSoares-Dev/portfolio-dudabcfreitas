import { useState, useEffect } from 'react'

function calcYearsOfUse(startDate) {
  if (!startDate) return null
  const start = new Date(startDate)
  const now = new Date()
  if (isNaN(start.getTime())) return null
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  if (months < 1) return null
  const years = months / 12
  if (years < 1) return '< 1 ano'
  return `${Math.floor(years)} ${Math.floor(years) === 1 ? 'ano' : 'anos'}`
}

export function useSkills(projects = []) {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notion?database=skills')
      .then(r => r.json())
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => {
            const name = page.properties['Nome']?.title?.[0]?.plain_text ?? ''
            const startDate = page.properties['Data Inicio']?.date?.start ?? null

            const projectCount = projects.filter(p =>
              p.tools?.some(tool =>
                tool.toLowerCase().includes(name.toLowerCase()) ||
                name.toLowerCase().includes(tool.toLowerCase())
              )
            ).length

            return {
              id: page.id,
              name,
              level: page.properties['Nível']?.select?.name ?? '',
              order: page.properties['Ordem']?.number ?? 99,
              startDate,
              yearsOfUse: calcYearsOfUse(startDate),
              projectCount,
            }
          })
          .sort((a, b) => a.order - b.order)
        setSkills(parsed)
      })
      .catch(() => setSkills([]))
      .finally(() => setLoading(false))
  }, [projects])

  return { skills, loading }
}
