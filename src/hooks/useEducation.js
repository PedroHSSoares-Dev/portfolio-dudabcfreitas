import { useState, useEffect } from 'react'

export function useEducation() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/notion?database=education')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch education')
        return r.json()
      })
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => ({
            id: page.id,
            title: page.properties.Titulo?.title?.[0]?.plain_text ?? '',
            institution: page.properties.Instituição?.rich_text?.[0]?.plain_text ?? '',
            startDate: page.properties.DataInicio?.date?.start ?? '',
            endDate: page.properties.DataFim?.date?.start ?? null,
            totalSemesters: page.properties.TotalSemestres?.number ?? null,
            order: page.properties.Ordem?.number ?? 99,
          }))
          .sort((a, b) => a.order - b.order)
        setEducation(parsed)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { education, loading, error }
}
