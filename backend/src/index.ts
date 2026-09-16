import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import agentRoutes from './routes/agentRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'Agentarium backend alive' })
})

app.use('/agents', agentRoutes)

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})