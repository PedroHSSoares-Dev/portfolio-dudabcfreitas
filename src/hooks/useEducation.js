import { useState, useEffect } from 'react'

function calcTotalSemesters(startDate, endDate) {
  if (!startDate || !endDate) return null
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  if (months <= 0) return null
  const result = Math.round(months / 6)
  return isNaN(result) ? null : result
}

export function useEducation() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notion?database=education')
      .then(r => r.json())
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => {
            const startDate = page.properties['DataInicio']?.date?.start ?? ''
            const endDate = page.properties['DataFim']?.date?.start ?? null
            return {
              id: page.id,
              title: page.properties['Curso']?.title?.[0]?.plain_text ?? '',
              institution: page.properties['Instituicao']?.rich_text?.[0]?.plain_text ?? '',
              degree: page.properties['Grau']?.select?.name ?? '',
              tags: (page.properties['Tags']?.multi_select ?? []).map(t => t.name),
              startDate,
              endDate,
              totalSemesters: calcTotalSemesters(startDate, endDate),
            }
          })
          // sort by startDate descending — most recent course first
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        setEducation(parsed)
      })
      .catch(() => setEducation([]))
      .finally(() => setLoading(false))
  }, [])

  return { education, loading }
}
