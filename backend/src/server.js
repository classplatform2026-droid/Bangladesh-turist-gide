import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'deshgo-api' }))
app.get('/api/destinations', (_req, res) => res.json({ data: [] }))
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`deshgo API listening on ${port}`))
