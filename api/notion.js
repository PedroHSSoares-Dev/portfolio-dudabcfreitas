export default async function handler(req, res) {
  const { database } = req.query

  const dbMap = {
    projects: process.env.NOTION_PROJECTS_DB,
    skills: process.env.NOTION_SKILLS_DB,
    sobre: process.env.NOTION_SOBRE_DB,
    experiences: process.env.NOTION_EXPERIENCES_DB,
    education: process.env.NOTION_EDUCATION_DB,
  }

  const databaseId = dbMap[database]
  if (!databaseId) {
    return res.status(400).json({ error: `Unknown database: ${database}` })
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Publicado',
            checkbox: { equals: true },
          },
          sorts: [
            { property: 'Ordem', direction: 'ascending' },
          ],
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return res.status(response.status).json(error)
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
