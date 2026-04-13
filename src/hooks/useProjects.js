import { useState, useEffect } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notion?database=projects')
      .then(r => r.json())
      .then(data => {
        const parsed = (data.results ?? [])
          .map(page => ({
            id: page.id,
            title: page.properties['Nome']?.title?.[0]?.plain_text ?? '',
            description: page.properties['Descrição']?.rich_text?.[0]?.plain_text ?? '',
            category: page.properties['Categoria']?.select?.name ?? '',
            year: page.properties['Ano']?.number ?? '',
            featured: page.properties['Destaque']?.checkbox ?? false,
            images: (page.properties['Imagens']?.files ?? []).map(f =>
              f.type === 'external' ? f.external.url : f.file?.url ?? ''
            ),
            tools: (page.properties['Ferramentas']?.multi_select ?? []).map(t => t.name),
          }))
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        setProjects(parsed)
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
