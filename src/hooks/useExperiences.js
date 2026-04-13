import { useState, useEffect } from 'react'

export function useExperiences() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notion?database=experiences')
      .then(r => r.json())
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => ({
            id: page.id,
            role: page.properties['Cargo']?.title?.[0]?.plain_text ?? '',
            company: page.properties['Empresa']?.rich_text?.[0]?.plain_text ?? '',
            startDate: page.properties['DataInicio']?.date?.start ?? '',
            endDate: page.properties['DataFim']?.date?.start ?? null,
            descriptionPT: page.properties['DescricaoPT']?.rich_text?.[0]?.plain_text ?? '',
            descriptionEN: page.properties['DescricaoEN']?.rich_text?.[0]?.plain_text ?? '',
            tags: (page.properties['Tags']?.multi_select ?? []).map(t => t.name),
            order: page.properties['Ordem']?.number ?? 99,
          }))
          .sort((a, b) => a.order - b.order)
        setExperiences(parsed)
      })
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false))
  }, [])

  return { experiences, loading }
}
