import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import http from 'http'
import { URL } from 'url'
import handler from '../api/notion.js'

const PORT = 3001

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  // Parse query params into req.query (Vercel-style)
  req.query = Object.fromEntries(url.searchParams)

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // Add Express-like res.status().json() adapter
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  handler(req, res)
})

server.listen(PORT, () => {
  console.log(`Notion proxy running on http://localhost:${PORT}`)
  console.log('Databases: education, skills, projects, experiences, sobre')
})
