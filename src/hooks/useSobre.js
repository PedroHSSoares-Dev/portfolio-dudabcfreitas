import { useState, useEffect } from 'react'

export function useSobre() {
  const [sobre, setSobre] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notion?database=sobre')
      .then(r => r.json())
      .then(data => {
        // Convert rows into a key-value map: { 'Bio 1': { pt: '...', en: '...' }, ... }
        const map = {}
        ;(data.results ?? []).forEach(page => {
          const key = page.properties['Campo']?.title?.[0]?.plain_text ?? ''
          if (key) {
            map[key] = {
              pt: page.properties['Valor PT']?.rich_text?.[0]?.plain_text ?? '',
              en: page.properties['Valor EN']?.rich_text?.[0]?.plain_text ?? '',
            }
          }
        })
        setSobre(map)
      })
      .catch(() => setSobre({}))
      .finally(() => setLoading(false))
  }, [])

  return { sobre, loading }
}
