import { useState, useEffect } from 'react'

export function useSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/notion?database=skills')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch skills')
        return r.json()
      })
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => ({
            id: page.id,
            name: page.properties.Nome?.title?.[0]?.plain_text ?? '',
            level: page.properties.Nível?.select?.name ?? '',
            progress: page.properties.Progresso?.number ?? 0,
            order: page.properties.Ordem?.number ?? 99,
          }))
          .sort((a, b) => a.order - b.order)
        setSkills(parsed)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { skills, loading, error }
}
