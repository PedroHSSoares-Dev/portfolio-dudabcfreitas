import { useState, useEffect } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/notion?database=projects')
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch projects')
        return r.json()
      })
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => ({
            id: page.id,
            title: page.properties.Nome?.title?.[0]?.plain_text ?? '',
            description: page.properties.Descrição?.rich_text?.[0]?.plain_text ?? '',
            category: page.properties.Categoria?.select?.name ?? '',
            year: page.properties.Ano?.number ?? '',
            featured: page.properties.Destaque?.checkbox ?? false,
            images: (page.properties.Imagens?.files ?? []).map(f =>
              f.type === 'external' ? f.external.url : f.file?.url ?? ''
            ),
          }))
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        setProjects(parsed)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}
